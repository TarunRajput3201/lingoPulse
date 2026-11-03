import * as THREE from 'three';
import { CharacterId, CharacterMood, CHARACTER_PROFILES } from '../Character3DRegistry';
import { ENVIRONMENT_3D } from '../../../constants/theme';

export interface RigInstance {
  root: THREE.Group;
  characterGroup: THREE.Group;
  headGroup: THREE.Group;
  leftArmGroup: THREE.Group;
  rightArmGroup: THREE.Group;
  mouthMesh: THREE.Mesh;
  leftEyeMesh: THREE.Mesh;
  rightEyeMesh: THREE.Mesh;
  eyelids: THREE.Group[];
  accessoryMesh?: THREE.Object3D;
  auraRings?: THREE.Mesh[];
  particles?: THREE.Points;
  pedestal: THREE.Group;
  update: (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => void;
  dispose: () => void;
}

/**
 * Creates the complete real-time 3D Character Rig, Environment Stage, and Lighting.
 */
export function createCharacter3DScene(
  characterId: CharacterId,
  themeMode: 'daylight' | 'evening' | 'celebration' = 'daylight'
): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  rig: RigInstance;
} {
  const scene = new THREE.Scene();

  // Perspective camera with natural portrait focal length (42° FOV)
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0, 0.35, 3.2);
  camera.lookAt(0, 0.25, 0);

  // Lighting Setup
  const envLighting = ENVIRONMENT_3D[themeMode] || ENVIRONMENT_3D.daylight;

  // Key Directional Light (Warm sunlight / studio key)
  const keyLight = new THREE.DirectionalLight(envLighting.keyLight.color, envLighting.keyLight.intensity);
  keyLight.position.set(...envLighting.keyLight.position);
  scene.add(keyLight);

  // Fill Light (Soft cool ambient fill to prevent pitch-black shadows)
  const fillLight = new THREE.DirectionalLight(envLighting.fillLight.color, envLighting.fillLight.intensity);
  fillLight.position.set(...envLighting.fillLight.position);
  scene.add(fillLight);

  // Rim / Back Light (Accents character silhouette against background)
  const rimLight = new THREE.DirectionalLight(envLighting.rimLight.color, envLighting.rimLight.intensity);
  rimLight.position.set(...envLighting.rimLight.position);
  scene.add(rimLight);

  // Ambient / Hemisphere Light (Natural bounce from sky and ground)
  const hemiLight = new THREE.HemisphereLight(envLighting.skyColor, envLighting.groundColor, envLighting.ambientLight.intensity);
  scene.add(hemiLight);

  // Root Scene Group
  const root = new THREE.Group();
  scene.add(root);

  // Pedestal Stage
  const profile = CHARACTER_PROFILES[characterId] || CHARACTER_PROFILES.maya;
  const pedestal = createPedestalStage(profile);
  root.add(pedestal);

  // Ambient Floating Particle Motes
  const particles = createAmbientParticles(profile.accentColor);
  root.add(particles);

  // Construct Character Rig
  const rig = buildCharacterRig(scene, characterId, profile, root, pedestal, particles);

  return { scene, camera, rig };
}

/**
 * Creates the 3D Island Pedestal Platform
 */
function createPedestalStage(profile: typeof CHARACTER_PROFILES[CharacterId]): THREE.Group {
  const stage = new THREE.Group();
  stage.position.set(0, -0.65, 0);

  const topColor = new THREE.Color(profile.pedestalColor);
  const borderColor = new THREE.Color(profile.pedestalBorder);
  const bottomColor = new THREE.Color(profile.pedestalBottom);

  // Upper Platform Disc
  const topGeo = new THREE.CylinderGeometry(0.95, 0.98, 0.12, 36);
  const topMat = new THREE.MeshStandardMaterial({
    color: topColor,
    roughness: 0.35,
    metalness: 0.1,
  });
  const topMesh = new THREE.Mesh(topGeo, topMat);
  topMesh.position.y = 0.06;
  stage.add(topMesh);

  // Glowing Outer Rim
  const rimGeo = new THREE.TorusGeometry(0.98, 0.035, 16, 40);
  const rimMat = new THREE.MeshStandardMaterial({
    color: borderColor,
    emissive: borderColor,
    emissiveIntensity: 0.4,
    roughness: 0.2,
    metalness: 0.3,
  });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.position.y = 0.12;
  stage.add(rimMesh);

  // Lower Bevel Base
  const baseGeo = new THREE.CylinderGeometry(1.02, 1.05, 0.1, 36);
  const baseMat = new THREE.MeshStandardMaterial({
    color: bottomColor,
    roughness: 0.45,
    metalness: 0.15,
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.y = -0.05;
  stage.add(baseMesh);

  // Ground Contact Shadow Disc
  const hasDocument = typeof document !== 'undefined';
  const shadowCanvas = hasDocument ? document.createElement('canvas') : null;
  let shadowMat: THREE.Material;
  if (shadowCanvas) {
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
      grad.addColorStop(0.5, 'rgba(15, 23, 42, 0.18)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const texture = new THREE.CanvasTexture(shadowCanvas);
    shadowMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
    });
  } else {
    shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
  }

  const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -0.11;
  stage.add(shadowMesh);

  return stage;
}

/**
 * Creates ambient floating particle motes drifting in 3D
 */
function createAmbientParticles(accentHex: string): THREE.Points {
  const particleCount = 28;
  const positions = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.6 + Math.random() * 0.9;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = -0.4 + Math.random() * 1.5;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
    scales[i] = 0.02 + Math.random() * 0.04;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: new THREE.Color(accentHex),
    size: 0.045,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

/**
 * Master Rig Builder dispatching to individual characters
 */
function buildCharacterRig(
  scene: THREE.Scene,
  characterId: CharacterId,
  profile: typeof CHARACTER_PROFILES[CharacterId],
  root: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  const characterGroup = new THREE.Group();
  root.add(characterGroup);

  if (characterId === 'maya') {
    return buildMayaRig(scene, profile, root, characterGroup, pedestal, particles);
  } else if (characterId === 'leo') {
    return buildLeoRig(scene, profile, root, characterGroup, pedestal, particles);
  } else if (characterId === 'elena') {
    return buildElenaRig(scene, profile, root, characterGroup, pedestal, particles);
  } else if (characterId === 'kael') {
    return buildKaelRig(scene, profile, root, characterGroup, pedestal, particles);
  } else {
    return buildPipRig(scene, profile, root, characterGroup, pedestal, particles);
  }
}

// ============================================================================
// 1. MAYA (TEACHER & GRAMMAR GUIDE) RIG
// ============================================================================
function buildMayaRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['maya'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  // Materials
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xFAD0B0,
    roughness: 0.45,
    metalness: 0.05,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x3E2723,
    roughness: 0.35,
    metalness: 0.08,
  });
  const blazerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(profile.accentColor), // Emerald Green
    roughness: 0.55,
    metalness: 0.1,
  });
  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.3,
  });
  const wandMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    roughness: 0.2,
    metalness: 0.8,
  });
  const starMat = new THREE.MeshStandardMaterial({
    color: 0xF59E0B,
    emissive: 0xF59E0B,
    emissiveIntensity: 0.8,
    roughness: 0.15,
  });

  // Torso / Blazer
  const torsoGeo = new THREE.CylinderGeometry(0.32, 0.26, 0.65, 24);
  const torsoMesh = new THREE.Mesh(torsoGeo, blazerMat);
  torsoMesh.position.y = -0.05;
  characterGroup.add(torsoMesh);

  // Shirt Collar
  const collarGeo = new THREE.ConeGeometry(0.18, 0.22, 3);
  const collarMesh = new THREE.Mesh(collarGeo, shirtMat);
  collarMesh.position.set(0, 0.22, 0.18);
  collarMesh.rotation.x = Math.PI;
  characterGroup.add(collarMesh);

  // Head Group (Articulated for tilts and nodding)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.45, 0);
  characterGroup.add(headGroup);

  // Head Sphere
  const headGeo = new THREE.SphereGeometry(0.32, 28, 28);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headGroup.add(headMesh);

  // Hair Base & Bun
  const hairBaseGeo = new THREE.SphereGeometry(0.33, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.58);
  const hairBaseMesh = new THREE.Mesh(hairBaseGeo, hairMat);
  hairBaseMesh.position.set(0, 0.05, -0.02);
  headGroup.add(hairBaseMesh);

  // Hair Top-Knot Bun
  const bunGeo = new THREE.SphereGeometry(0.14, 20, 20);
  const bunMesh = new THREE.Mesh(bunGeo, hairMat);
  bunMesh.position.set(0, 0.36, -0.08);
  headGroup.add(bunMesh);

  // Eyes (White Sclera + Dark Pupils)
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x1E293B });

  const leftEyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), eyeWhiteMat);
  leftEyeMesh.position.set(-0.11, 0.03, 0.27);
  headGroup.add(leftEyeMesh);

  const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), pupilMat);
  leftPupil.position.set(-0.11, 0.03, 0.32);
  headGroup.add(leftPupil);

  const rightEyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), eyeWhiteMat);
  rightEyeMesh.position.set(0.11, 0.03, 0.27);
  headGroup.add(rightEyeMesh);

  const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), pupilMat);
  rightPupil.position.set(0.11, 0.03, 0.32);
  headGroup.add(rightPupil);

  // Eyelids (Blink articulation)
  const eyelidGeo = new THREE.SphereGeometry(0.07, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const eyelidMat = skinMat;

  const leftEyelid = new THREE.Group();
  leftEyelid.position.copy(leftEyeMesh.position);
  const leftEyelidMesh = new THREE.Mesh(eyelidGeo, eyelidMat);
  leftEyelidMesh.rotation.x = -Math.PI / 2;
  leftEyelidMesh.visible = false;
  leftEyelid.add(leftEyelidMesh);
  headGroup.add(leftEyelid);

  const rightEyelid = new THREE.Group();
  rightEyelid.position.copy(rightEyeMesh.position);
  const rightEyelidMesh = new THREE.Mesh(eyelidGeo, eyelidMat);
  rightEyelidMesh.rotation.x = -Math.PI / 2;
  rightEyelidMesh.visible = false;
  rightEyelid.add(rightEyelidMesh);
  headGroup.add(rightEyelid);

  // Speech Mouth Mesh (Lip-sync animated)
  const mouthGeo = new THREE.TorusGeometry(0.05, 0.018, 12, 24, Math.PI);
  const mouthMat = new THREE.MeshStandardMaterial({
    color: 0xBE123C,
    roughness: 0.3,
  });
  const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
  mouthMesh.position.set(0, -0.12, 0.28);
  mouthMesh.rotation.x = Math.PI;
  headGroup.add(mouthMesh);

  // Left Arm holding Teaching Wand
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.35, 0.18, 0);
  characterGroup.add(leftArmGroup);

  const armGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.42, 16);
  const leftArmMesh = new THREE.Mesh(armGeo, blazerMat);
  leftArmMesh.position.set(-0.1, -0.16, 0.08);
  leftArmMesh.rotation.z = 0.45;
  leftArmMesh.rotation.x = -0.3;
  leftArmGroup.add(leftArmMesh);

  // Wand Handle + Glowing Star Gem
  const wandGroup = new THREE.Group();
  wandGroup.position.set(-0.25, -0.12, 0.25);
  leftArmGroup.add(wandGroup);

  const wandRod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.015, 0.55, 12), wandMat);
  wandRod.rotation.z = -0.6;
  wandGroup.add(wandRod);

  const starGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.08), starMat);
  starGem.position.set(-0.16, 0.22, 0);
  wandGroup.add(starGem);

  // Right Arm (Welcoming gesture)
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.35, 0.18, 0);
  characterGroup.add(rightArmGroup);

  const rightArmMesh = new THREE.Mesh(armGeo, blazerMat);
  rightArmMesh.position.set(0.1, -0.16, 0.08);
  rightArmMesh.rotation.z = -0.45;
  rightArmMesh.rotation.x = -0.2;
  rightArmGroup.add(rightArmMesh);

  // Animation Update Loop
  let blinkTimer = 0;
  let isBlinking = false;

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    // 1. Natural idle breathing
    const breath = Math.sin(time * 2.2) * 0.025;
    characterGroup.position.y = breath;
    headGroup.position.y = 0.45 + breath * 0.4;

    // 2. Head tilt / sway
    headGroup.rotation.y = Math.sin(time * 1.1) * 0.08;
    headGroup.rotation.z = Math.sin(time * 0.8) * 0.04;

    // 3. Wand gem rotation & sparkle
    starGem.rotation.y += delta * 2.5;
    starGem.rotation.x += delta * 1.2;

    // 4. Natural blinking
    blinkTimer += delta;
    if (!isBlinking && blinkTimer > 3.2 + Math.random() * 2) {
      isBlinking = true;
      blinkTimer = 0;
      leftEyelidMesh.visible = true;
      rightEyelidMesh.visible = true;
    } else if (isBlinking && blinkTimer > 0.12) {
      isBlinking = false;
      blinkTimer = 0;
      leftEyelidMesh.visible = false;
      rightEyelidMesh.visible = false;
    }

    // 5. Lip-sync mouth animation
    if (isSpeaking) {
      const speechFreq = Math.sin(time * 22) * 0.5 + 0.5;
      mouthMesh.scale.y = 1 + speechFreq * 1.8;
      mouthMesh.scale.x = 1 - speechFreq * 0.2;
      mouthMesh.position.y = -0.12 - speechFreq * 0.02;
    } else {
      mouthMesh.scale.set(1, 1, 1);
      mouthMesh.position.y = -0.12;
    }

    // 6. Mood reactivity
    if (mood === 'celebrate' || mood === 'correct') {
      rightArmGroup.rotation.z = -0.9 + Math.sin(time * 6) * 0.3;
      leftArmGroup.rotation.z = 0.7 + Math.sin(time * 6) * 0.2;
      characterGroup.position.y = breath + Math.abs(Math.sin(time * 4)) * 0.12;
    } else if (mood === 'thinking') {
      headGroup.rotation.z = 0.18;
      rightArmGroup.rotation.z = -0.2;
    } else {
      rightArmGroup.rotation.z = Math.sin(time * 1.5) * 0.08;
      leftArmGroup.rotation.z = -Math.sin(time * 1.5) * 0.06;
    }

    // 7. Ambient particles ascent
    const pos = particles.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] += delta * 0.25;
      if (pos[i] > 1.4) pos[i] = -0.4;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += delta * 0.15;
  };

  const dispose = () => {
    scene.clear();
  };

  return {
    root,
    characterGroup,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    mouthMesh,
    leftEyeMesh,
    rightEyeMesh,
    eyelids: [leftEyelid, rightEyelid],
    accessoryMesh: wandGroup,
    particles,
    pedestal,
    update,
    dispose,
  };
}

// ============================================================================
// 2. LEO (PRONUNCIATION COACH) RIG
// ============================================================================
function buildLeoRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['leo'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xE8B594,
    roughness: 0.45,
  });
  const jacketMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(profile.accentColor), // Azure Sky
    roughness: 0.5,
  });
  const headphoneMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    roughness: 0.2,
    metalness: 0.7,
  });
  const earcupMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x0284C7,
    emissiveIntensity: 0.6,
    roughness: 0.2,
  });
  const auraMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x38BDF8,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
  });

  // Torso
  const torsoGeo = new THREE.CylinderGeometry(0.34, 0.28, 0.68, 24);
  const torsoMesh = new THREE.Mesh(torsoGeo, jacketMat);
  torsoMesh.position.y = -0.05;
  characterGroup.add(torsoMesh);

  // Head Group
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.46, 0);
  characterGroup.add(headGroup);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 28, 28), skinMat);
  headGroup.add(headMesh);

  // Headset Band
  const bandGeo = new THREE.TorusGeometry(0.34, 0.04, 16, 32, Math.PI);
  const bandMesh = new THREE.Mesh(bandGeo, headphoneMat);
  bandMesh.rotation.z = Math.PI;
  bandMesh.position.set(0, 0.08, 0);
  headGroup.add(bandMesh);

  // Dual Earcups
  const leftCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 20), earcupMat);
  leftCup.rotation.z = Math.PI / 2;
  leftCup.position.set(-0.33, 0.05, 0);
  headGroup.add(leftCup);

  const rightCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 20), earcupMat);
  rightCup.rotation.z = Math.PI / 2;
  rightCup.position.set(0.33, 0.05, 0);
  headGroup.add(rightCup);

  // Microphone Boom
  const micBoomGroup = new THREE.Group();
  micBoomGroup.position.set(-0.33, 0.05, 0);
  headGroup.add(micBoomGroup);

  const boomArm = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.28, 12), headphoneMat);
  boomArm.rotation.x = 1.1;
  boomArm.rotation.z = -0.3;
  boomArm.position.set(0.08, -0.12, 0.14);
  micBoomGroup.add(boomArm);

  const micTip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), earcupMat);
  micTip.position.set(0.14, -0.22, 0.24);
  micBoomGroup.add(micTip);

  // Eyes
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0F172A });

  const leftEyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.062, 16, 16), eyeWhiteMat);
  leftEyeMesh.position.set(-0.11, 0.03, 0.28);
  headGroup.add(leftEyeMesh);

  const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), pupilMat);
  leftPupil.position.set(-0.11, 0.03, 0.33);
  headGroup.add(leftPupil);

  const rightEyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.062, 16, 16), eyeWhiteMat);
  rightEyeMesh.position.set(0.11, 0.03, 0.28);
  headGroup.add(rightEyeMesh);

  const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), pupilMat);
  rightPupil.position.set(0.11, 0.03, 0.33);
  headGroup.add(rightPupil);

  // Phonetic Articulation Mouth
  const mouthGeo = new THREE.TorusGeometry(0.055, 0.02, 12, 24, Math.PI);
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x991B1B, roughness: 0.3 });
  const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
  mouthMesh.position.set(0, -0.12, 0.28);
  mouthMesh.rotation.x = Math.PI;
  headGroup.add(mouthMesh);

  // Soundwave Aura Rings (Radiate when speaking)
  const auraRings: THREE.Mesh[] = [];
  for (let r = 0; r < 3; r++) {
    const ringGeo = new THREE.TorusGeometry(0.45 + r * 0.15, 0.02, 12, 32);
    const ringMesh = new THREE.Mesh(ringGeo, auraMat.clone());
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 0.05, 0);
    ringMesh.visible = false;
    headGroup.add(ringMesh);
    auraRings.push(ringMesh);
  }

  // Arms
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.36, 0.2, 0);
  characterGroup.add(leftArmGroup);

  const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.44, 16);
  const leftArm = new THREE.Mesh(armGeo, jacketMat);
  leftArm.position.set(-0.06, -0.18, 0.06);
  leftArm.rotation.z = 0.3;
  leftArmGroup.add(leftArm);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.36, 0.2, 0);
  characterGroup.add(rightArmGroup);

  const rightArm = new THREE.Mesh(armGeo, jacketMat);
  rightArm.position.set(0.06, -0.18, 0.06);
  rightArm.rotation.z = -0.3;
  rightArmGroup.add(rightArm);

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    const breath = Math.sin(time * 2.4) * 0.02;
    characterGroup.position.y = breath;

    // Speaking Phonetic Lip Sync + Soundwave Aura
    if (isSpeaking) {
      const speechVal = Math.sin(time * 26) * 0.5 + 0.5;
      mouthMesh.scale.y = 1 + speechVal * 2.2;
      mouthMesh.scale.x = 1 + speechVal * 0.4;
      micTip.scale.setScalar(1 + speechVal * 0.3);

      auraRings.forEach((ring, idx) => {
        ring.visible = true;
        const progress = (time * 3 + idx * 0.33) % 1;
        ring.scale.setScalar(0.9 + progress * 0.7);
        (ring.material as THREE.MeshStandardMaterial).opacity = (1 - progress) * 0.5;
      });
    } else {
      mouthMesh.scale.set(1, 1, 1);
      auraRings.forEach((ring) => (ring.visible = false));
      micTip.scale.set(1, 1, 1);
    }

    if (mood === 'celebrate' || mood === 'correct') {
      rightArmGroup.rotation.z = -1.1 + Math.sin(time * 5) * 0.2;
      headGroup.rotation.y = Math.sin(time * 3) * 0.15;
    } else {
      headGroup.rotation.y = Math.sin(time * 1.2) * 0.06;
      rightArmGroup.rotation.z = -Math.sin(time * 1.4) * 0.05;
    }

    // Particle field
    const pos = particles.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] += delta * 0.25;
      if (pos[i] > 1.4) pos[i] = -0.4;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += delta * 0.15;
  };

  const dispose = () => scene.clear();

  return {
    root,
    characterGroup,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    mouthMesh,
    leftEyeMesh,
    rightEyeMesh,
    eyelids: [],
    auraRings,
    particles,
    pedestal,
    update,
    dispose,
  };
}

// ============================================================================
// 3. ELENA (CONVERSATION PARTNER) RIG
// ============================================================================
function buildElenaRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['elena'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xF7D0B4, roughness: 0.45 });
  const sweaterMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(profile.accentColor), // Amber / Warm Orange
    roughness: 0.65,
  });
  const scarfMat = new THREE.MeshStandardMaterial({
    color: 0xFBBF24,
    roughness: 0.6,
  });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x4A2E18, roughness: 0.4 });

  // Torso
  const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.26, 0.65, 24), sweaterMat);
  torsoMesh.position.y = -0.05;
  characterGroup.add(torsoMesh);

  // Scarf Wrap
  const scarfGeo = new THREE.TorusGeometry(0.24, 0.07, 16, 28);
  const scarfMesh = new THREE.Mesh(scarfGeo, scarfMat);
  scarfMesh.rotation.x = Math.PI / 2.2;
  scarfMesh.position.set(0, 0.25, 0.04);
  characterGroup.add(scarfMesh);

  // Dangling Scarf Tail
  const scarfTail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.04), scarfMat);
  scarfTail.position.set(0.12, 0.08, 0.22);
  scarfTail.rotation.z = -0.15;
  characterGroup.add(scarfTail);

  // Head
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.46, 0);
  headGroup.rotation.z = 0.08; // Signature conversational curious head tilt
  characterGroup.add(headGroup);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 28, 28), skinMat);
  headGroup.add(headMesh);

  // Flowing Wavy Hair
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6), hairMat);
  hairMesh.position.set(0, 0.04, -0.02);
  headGroup.add(hairMesh);

  // Eyes
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x1E293B });

  const leftEyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), eyeWhiteMat);
  leftEyeMesh.position.set(-0.11, 0.03, 0.28);
  headGroup.add(leftEyeMesh);

  const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), pupilMat);
  leftPupil.position.set(-0.11, 0.03, 0.33);
  headGroup.add(leftPupil);

  const rightEyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), eyeWhiteMat);
  rightEyeMesh.position.set(0.11, 0.03, 0.28);
  headGroup.add(rightEyeMesh);

  const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), pupilMat);
  rightPupil.position.set(0.11, 0.03, 0.33);
  headGroup.add(rightPupil);

  // Mouth
  const mouthGeo = new THREE.TorusGeometry(0.052, 0.018, 12, 24, Math.PI);
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.3 });
  const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
  mouthMesh.position.set(0, -0.12, 0.28);
  mouthMesh.rotation.x = Math.PI;
  headGroup.add(mouthMesh);

  // Gesturing Conversational Arms
  const armGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.42, 16);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.35, 0.18, 0);
  characterGroup.add(leftArmGroup);
  const leftArmMesh = new THREE.Mesh(armGeo, sweaterMat);
  leftArmMesh.position.set(-0.08, -0.16, 0.1);
  leftArmMesh.rotation.z = 0.5;
  leftArmMesh.rotation.x = -0.4;
  leftArmGroup.add(leftArmMesh);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.35, 0.18, 0);
  characterGroup.add(rightArmGroup);
  const rightArmMesh = new THREE.Mesh(armGeo, sweaterMat);
  rightArmMesh.position.set(0.08, -0.16, 0.1);
  rightArmMesh.rotation.z = -0.5;
  rightArmMesh.rotation.x = -0.4;
  rightArmGroup.add(rightArmMesh);

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    const breath = Math.sin(time * 2.2) * 0.025;
    characterGroup.position.y = breath;

    // Conversational Nods & Gestures
    headGroup.rotation.x = Math.sin(time * 1.8) * 0.06;
    headGroup.rotation.y = Math.sin(time * 1.2) * 0.08;
    rightArmGroup.rotation.x = -0.4 + Math.sin(time * 2.5) * 0.12;
    leftArmGroup.rotation.x = -0.4 - Math.sin(time * 2.5) * 0.12;

    if (isSpeaking) {
      const speech = Math.sin(time * 24) * 0.5 + 0.5;
      mouthMesh.scale.y = 1 + speech * 2.0;
    } else {
      mouthMesh.scale.set(1, 1, 1);
    }

    if (mood === 'celebrate' || mood === 'correct') {
      headGroup.rotation.z = Math.sin(time * 4) * 0.15;
      characterGroup.position.y = breath + Math.abs(Math.sin(time * 4)) * 0.1;
    }

    // Particles
    const pos = particles.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] += delta * 0.25;
      if (pos[i] > 1.4) pos[i] = -0.4;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += delta * 0.15;
  };

  const dispose = () => scene.clear();

  return {
    root,
    characterGroup,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    mouthMesh,
    leftEyeMesh,
    rightEyeMesh,
    eyelids: [],
    particles,
    pedestal,
    update,
    dispose,
  };
}

// ============================================================================
// 4. KAEL (CHALLENGE MASTER) RIG
// ============================================================================
function buildKaelRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['kael'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xF3C9AC, roughness: 0.45 });
  const armorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(profile.accentColor), // Amethyst Violet
    roughness: 0.3,
    metalness: 0.4,
  });
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0x1E1B4B,
    roughness: 0.25,
    metalness: 0.7,
  });
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0xA78BFA,
    emissive: 0x8B5CF6,
    emissiveIntensity: 1.2,
    roughness: 0.1,
  });
  const cubeWireMat = new THREE.MeshBasicMaterial({
    color: 0xC084FC,
    wireframe: true,
  });

  // Torso / High-tech Vest
  const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.28, 0.68, 20), armorMat);
  torsoMesh.position.y = -0.05;
  characterGroup.add(torsoMesh);

  // Chest Plate Accent
  const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.08), plateMat);
  chestPlate.position.set(0, 0.1, 0.18);
  characterGroup.add(chestPlate);

  // Head
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.46, 0);
  characterGroup.add(headGroup);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), skinMat);
  headGroup.add(headMesh);

  // Illuminated Cyber Visor
  const visorGeo = new THREE.BoxGeometry(0.44, 0.12, 0.16);
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  visorMesh.position.set(0, 0.04, 0.24);
  headGroup.add(visorMesh);

  // Mouth
  const mouthGeo = new THREE.TorusGeometry(0.048, 0.016, 12, 24, Math.PI);
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x701A75, roughness: 0.4 });
  const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
  mouthMesh.position.set(0, -0.12, 0.28);
  mouthMesh.rotation.x = Math.PI;
  headGroup.add(mouthMesh);

  // Orbiting Holographic Challenge Polyhedra
  const cubeGroup = new THREE.Group();
  characterGroup.add(cubeGroup);

  const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(0.12), cubeWireMat);
  icosahedron.position.set(-0.48, 0.12, 0.3);
  cubeGroup.add(icosahedron);

  const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(0.11), cubeWireMat);
  octahedron.position.set(0.48, 0.12, 0.3);
  cubeGroup.add(octahedron);

  // Arms
  const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.44, 16);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.36, 0.2, 0);
  characterGroup.add(leftArmGroup);
  const leftArmMesh = new THREE.Mesh(armGeo, armorMat);
  leftArmMesh.position.set(-0.08, -0.16, 0.12);
  leftArmMesh.rotation.z = 0.4;
  leftArmGroup.add(leftArmMesh);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.36, 0.2, 0);
  characterGroup.add(rightArmGroup);
  const rightArmMesh = new THREE.Mesh(armGeo, armorMat);
  rightArmMesh.position.set(0.08, -0.16, 0.12);
  rightArmMesh.rotation.z = -0.4;
  rightArmGroup.add(rightArmMesh);

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    characterGroup.position.y = Math.sin(time * 2.8) * 0.03;

    // Orbiting challenge cubes spinning
    icosahedron.rotation.x += delta * 2.2;
    icosahedron.rotation.y += delta * 1.8;
    octahedron.rotation.y += delta * 2.5;
    octahedron.rotation.z += delta * 1.6;

    // Visor pulse
    visorMat.emissiveIntensity = 1.0 + Math.sin(time * 4) * 0.35;

    if (isSpeaking) {
      mouthMesh.scale.y = 1 + (Math.sin(time * 22) * 0.5 + 0.5) * 1.8;
    } else {
      mouthMesh.scale.set(1, 1, 1);
    }

    if (mood === 'celebrate' || mood === 'correct') {
      leftArmGroup.rotation.z = 1.0 + Math.sin(time * 6) * 0.2;
      rightArmGroup.rotation.z = -1.0 - Math.sin(time * 6) * 0.2;
      characterGroup.position.y += Math.abs(Math.sin(time * 5)) * 0.15;
    }

    // Particles
    const pos = particles.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] += delta * 0.25;
      if (pos[i] > 1.4) pos[i] = -0.4;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += delta * 0.15;
  };

  const dispose = () => scene.clear();

  return {
    root,
    characterGroup,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    mouthMesh,
    leftEyeMesh: visorMesh,
    rightEyeMesh: visorMesh,
    eyelids: [],
    accessoryMesh: cubeGroup,
    particles,
    pedestal,
    update,
    dispose,
  };
}

// ============================================================================
// 5. PIP (AI COMPANION ROBOT) RIG
// ============================================================================
function buildPipRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['pip'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  const enamelMat = new THREE.MeshStandardMaterial({
    color: 0xF8FAFC,
    roughness: 0.15,
    metalness: 0.3,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    roughness: 0.1,
    metalness: 0.9,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    roughness: 0.1,
    metalness: 0.5,
  });
  const ledEyeMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x0EA5E9,
    emissiveIntensity: 1.4,
  });
  const thrusterMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x0EA5E9,
    emissiveIntensity: 1.2,
    transparent: true,
    opacity: 0.6,
  });

  // Capsule Robot Body
  // In Three.js, CapsuleGeometry(radius, length, capSegments, radialSegments)
  const bodyGeo = new THREE.CapsuleGeometry(0.38, 0.45, 16, 24);
  const bodyMesh = new THREE.Mesh(bodyGeo, enamelMat);
  bodyMesh.position.y = 0.22;
  characterGroup.add(bodyMesh);

  // Digital Visor Screen
  const screenGeo = new THREE.CylinderGeometry(0.385, 0.385, 0.28, 24, 1, false, -Math.PI * 0.35, Math.PI * 0.7);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.y = 0.28;
  characterGroup.add(screenMesh);

  // LED Eyes (Friendly digital curved bars)
  const leftEyeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.045, 0.04), ledEyeMat);
  leftEyeMesh.position.set(-0.13, 0.29, 0.36);
  characterGroup.add(leftEyeMesh);

  const rightEyeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.045, 0.04), ledEyeMat);
  rightEyeMesh.position.set(0.13, 0.29, 0.36);
  characterGroup.add(rightEyeMesh);

  // Top Antenna & Pulsing Orb
  const antennaRod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.22, 12), chromeMat);
  antennaRod.position.set(0, 0.72, 0);
  characterGroup.add(antennaRod);

  const antennaOrb = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), ledEyeMat);
  antennaOrb.position.set(0, 0.84, 0);
  characterGroup.add(antennaOrb);

  // Anti-Gravity Base Thruster Ring
  const thrusterRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 16, 28), chromeMat);
  thrusterRing.rotation.x = Math.PI / 2;
  thrusterRing.position.set(0, -0.05, 0);
  characterGroup.add(thrusterRing);

  const thrusterGlow = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.32, 16), thrusterMat);
  thrusterGlow.position.set(0, -0.22, 0);
  characterGroup.add(thrusterGlow);

  // Floating Magnetic Robot Hands
  const handGeo = new THREE.SphereGeometry(0.075, 16, 16);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.46, 0.22, 0.05);
  characterGroup.add(leftArmGroup);
  const leftHand = new THREE.Mesh(handGeo, enamelMat);
  leftArmGroup.add(leftHand);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.46, 0.22, 0.05);
  characterGroup.add(rightArmGroup);
  const rightHand = new THREE.Mesh(handGeo, enamelMat);
  rightArmGroup.add(rightHand);

  // Dummy head group for look-at tilts
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.3, 0);
  characterGroup.add(headGroup);

  // Speech mouth mesh (digital smile bar)
  const mouthGeo = new THREE.BoxGeometry(0.12, 0.02, 0.03);
  const mouthMesh = new THREE.Mesh(mouthGeo, ledEyeMat);
  mouthMesh.position.set(0, 0.21, 0.36);
  characterGroup.add(mouthMesh);

  let spinAngle = 0;

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    // Floating physics hover bobbing
    const hover = Math.sin(time * 3.0) * 0.06;
    characterGroup.position.y = hover + 0.1;

    // Thruster flame flicker
    thrusterGlow.scale.set(
      1 + Math.sin(time * 16) * 0.15,
      1 + Math.sin(time * 20) * 0.2,
      1 + Math.sin(time * 16) * 0.15
    );
    antennaOrb.scale.setScalar(1 + Math.sin(time * 6) * 0.15);

    // Floating magnetic hands bob independently
    leftArmGroup.position.y = 0.22 + Math.sin(time * 3.5 + 1) * 0.04;
    rightArmGroup.position.y = 0.22 + Math.sin(time * 3.5) * 0.04;

    if (isSpeaking) {
      mouthMesh.scale.x = 1 + (Math.sin(time * 24) * 0.5 + 0.5) * 0.8;
      mouthMesh.scale.y = 1 + (Math.sin(time * 24) * 0.5 + 0.5) * 1.5;
    } else {
      mouthMesh.scale.set(1, 1, 1);
    }

    if (mood === 'celebrate' || mood === 'correct') {
      // 360 Spin Victory!
      spinAngle += delta * 6;
      characterGroup.rotation.y = spinAngle;
      leftArmGroup.position.y = 0.45;
      rightArmGroup.position.y = 0.45;
    } else {
      characterGroup.rotation.y = Math.sin(time * 1.2) * 0.15;
    }

    // Particles
    const pos = particles.geometry.attributes.position.array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] += delta * 0.25;
      if (pos[i] > 1.4) pos[i] = -0.4;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += delta * 0.15;
  };

  const dispose = () => scene.clear();

  return {
    root,
    characterGroup,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    mouthMesh,
    leftEyeMesh,
    rightEyeMesh,
    eyelids: [],
    accessoryMesh: antennaOrb,
    particles,
    pedestal,
    update,
    dispose,
  };
}
