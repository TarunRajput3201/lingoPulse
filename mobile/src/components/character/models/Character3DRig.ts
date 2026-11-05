import * as THREE from 'three';
import { CharacterId, CharacterMood, CHARACTER_PROFILES } from '../Character3DRegistry';
import { ENVIRONMENT_3D } from '../../../constants/theme';

export interface RigInstance {
  root: THREE.Group;
  characterGroup: THREE.Group;
  headGroup: THREE.Group;
  leftArmGroup: THREE.Group;
  rightArmGroup: THREE.Group;
  mouthMesh: THREE.Mesh | THREE.Group;
  leftEyeMesh: THREE.Mesh | THREE.Group;
  rightEyeMesh: THREE.Mesh | THREE.Group;
  leftEyebrow?: THREE.Mesh;
  rightEyebrow?: THREE.Mesh;
  eyelids: (THREE.Group | THREE.Mesh)[];
  accessoryMesh?: THREE.Object3D;
  auraRings?: THREE.Mesh[];
  particles?: THREE.Points;
  pedestal: THREE.Group;
  update: (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => void;
  dispose: () => void;
}

/**
 * Creates the complete real-time 3D Character Rig, Environment Stage, and Studio Lighting.
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

  // Perspective camera with natural portrait focal length (40° FOV)
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 0.32, 3.1);
  camera.lookAt(0, 0.22, 0);

  // Lighting Setup
  const envLighting = ENVIRONMENT_3D[themeMode] || ENVIRONMENT_3D.daylight;

  // Key Directional Light (Warm studio key)
  const keyLight = new THREE.DirectionalLight(envLighting.keyLight.color, envLighting.keyLight.intensity * 1.15);
  keyLight.position.set(...envLighting.keyLight.position);
  scene.add(keyLight);

  // Fill Light (Soft cool ambient fill to prevent harsh shadows)
  const fillLight = new THREE.DirectionalLight(envLighting.fillLight.color, envLighting.fillLight.intensity);
  fillLight.position.set(...envLighting.fillLight.position);
  scene.add(fillLight);

  // Rim / Silhouette Light (Accents character silhouette against background)
  const rimLight = new THREE.DirectionalLight(envLighting.rimLight.color, envLighting.rimLight.intensity * 1.35);
  rimLight.position.set(...envLighting.rimLight.position);
  scene.add(rimLight);

  // Bounce / Hemisphere Light (Natural sky/ground ambient gradient)
  const hemiLight = new THREE.HemisphereLight(envLighting.skyColor, envLighting.groundColor, envLighting.ambientLight.intensity * 1.1);
  scene.add(hemiLight);

  // Root Scene Group
  const root = new THREE.Group();
  scene.add(root);

  // Multi-tier Pedestal Stage
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
 * Creates the 3D Island Pedestal Platform with soft contact shadow
 */
function createPedestalStage(profile: typeof CHARACTER_PROFILES[CharacterId]): THREE.Group {
  const stage = new THREE.Group();
  stage.position.set(0, -0.66, 0);

  const topColor = new THREE.Color(profile.pedestalColor);
  const borderColor = new THREE.Color(profile.pedestalBorder);
  const bottomColor = new THREE.Color(profile.pedestalBottom);

  // Upper Platform Disc with beveled edge
  const topGeo = new THREE.CylinderGeometry(0.96, 0.99, 0.12, 36);
  const topMat = new THREE.MeshStandardMaterial({
    color: topColor,
    roughness: 0.35,
    metalness: 0.1,
  });
  const topMesh = new THREE.Mesh(topGeo, topMat);
  topMesh.position.y = 0.06;
  stage.add(topMesh);

  // Glowing Inlaid Accent Ring
  const rimGeo = new THREE.TorusGeometry(0.98, 0.032, 16, 40);
  const rimMat = new THREE.MeshStandardMaterial({
    color: borderColor,
    emissive: borderColor,
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.4,
  });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.position.y = 0.12;
  stage.add(rimMesh);

  // Lower Beveled Base
  const baseGeo = new THREE.CylinderGeometry(1.02, 1.06, 0.1, 36);
  const baseMat = new THREE.MeshStandardMaterial({
    color: bottomColor,
    roughness: 0.45,
    metalness: 0.2,
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
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.38)');
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
      opacity: 0.25,
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

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.55 + Math.random() * 0.95;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = -0.4 + Math.random() * 1.5;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
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
 * Builds high-fidelity lifelike eyes with Sclera, Iris, Pupil, and Specular Catchlights.
 */
function createDetailedEye(
  irisColorHex: number,
  isLeft: boolean
): {
  eyeGroup: THREE.Group;
  scleraMesh: THREE.Mesh;
  irisMesh: THREE.Mesh;
  eyelidMesh: THREE.Mesh;
} {
  const eyeGroup = new THREE.Group();

  // 1. Sclera (White with soft gloss)
  const scleraGeo = new THREE.SphereGeometry(0.068, 20, 20);
  const scleraMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.15,
    metalness: 0.05,
  });
  const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
  eyeGroup.add(scleraMesh);

  // 2. Iris Ring & Center (Rich Depth)
  const irisGroup = new THREE.Group();
  irisGroup.position.set(0, 0, 0.045);
  eyeGroup.add(irisGroup);

  const irisOuterMat = new THREE.MeshBasicMaterial({ color: irisColorHex });
  const irisMesh = new THREE.Mesh(new THREE.RingGeometry(0.018, 0.045, 20), irisOuterMat);
  irisGroup.add(irisMesh);

  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0F172A });
  const pupilMesh = new THREE.Mesh(new THREE.CircleGeometry(0.022, 18), pupilMat);
  pupilMesh.position.set(0, 0, 0.002);
  irisGroup.add(pupilMesh);

  // 3. Dual Specular Catchlights (The hallmark of lifelike eyes!)
  const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const mainCatchlight = new THREE.Mesh(new THREE.CircleGeometry(0.012, 12), catchlightMat);
  mainCatchlight.position.set(isLeft ? 0.014 : -0.014, 0.014, 0.004);
  irisGroup.add(mainCatchlight);

  const secCatchlight = new THREE.Mesh(new THREE.CircleGeometry(0.006, 10), catchlightMat);
  secCatchlight.position.set(isLeft ? -0.012 : 0.012, -0.012, 0.004);
  irisGroup.add(secCatchlight);

  // 4. Eyelid for Natural Blinking
  const eyelidGeo = new THREE.SphereGeometry(0.072, 18, 18, 0, Math.PI * 2, 0, Math.PI * 0.52);
  const eyelidMat = new THREE.MeshStandardMaterial({ color: 0xFAD0B0, roughness: 0.45 });
  const eyelidMesh = new THREE.Mesh(eyelidGeo, eyelidMat);
  eyelidMesh.rotation.x = -Math.PI / 2;
  eyelidMesh.visible = false;
  eyeGroup.add(eyelidMesh);

  return { eyeGroup, scleraMesh, irisMesh, eyelidMesh };
}

/**
 * Creates 3D Expressive Eyebrow
 */
function createEyebrow(colorHex: number): THREE.Mesh {
  const browGeo = new THREE.BoxGeometry(0.08, 0.016, 0.02);
  const browMat = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.4,
  });
  return new THREE.Mesh(browGeo, browMat);
}

/**
 * Creates Phonetic Responsive Lip-Sync Mouth Rig
 */
function createLipSyncMouth(colorHex = 0xBE123C): THREE.Group {
  const mouthGroup = new THREE.Group();

  // Resting curved upper lip
  const upperLipGeo = new THREE.TorusGeometry(0.048, 0.014, 12, 24, Math.PI * 0.85);
  const mouthMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.25 });
  const upperLip = new THREE.Mesh(upperLipGeo, mouthMat);
  upperLip.rotation.x = Math.PI;
  mouthGroup.add(upperLip);

  // Interior oral cavity / teeth hint
  const oralCavityGeo = new THREE.CircleGeometry(0.038, 16);
  const oralCavityMat = new THREE.MeshBasicMaterial({ color: 0x4C0519 });
  const oralCavity = new THREE.Mesh(oralCavityGeo, oralCavityMat);
  oralCavity.position.set(0, -0.01, -0.01);
  oralCavity.scale.set(1, 0.1, 1); // Starts closed
  mouthGroup.add(oralCavity);

  return mouthGroup;
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
// 1. MAYA (TEACHER & GRAMMAR GUIDE) - REDESIGNED 3D RIG
// ============================================================================
function buildMayaRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['maya'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  // Premium PBR Materials
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xFAD0B0,
    roughness: 0.42,
    metalness: 0.04,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x3E2723,
    roughness: 0.32,
    metalness: 0.08,
  });
  const blazerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(profile.accentColor), // Emerald Green
    roughness: 0.45,
    metalness: 0.12,
  });
  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.3,
  });
  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xF59E0B,
    roughness: 0.2,
    metalness: 0.85,
  });
  const starMat = new THREE.MeshStandardMaterial({
    color: 0xFDE047,
    emissive: 0xF59E0B,
    emissiveIntensity: 0.85,
    roughness: 0.15,
    metalness: 0.5,
  });

  // Torso / Tailored Emerald Blazer
  const torsoGeo = new THREE.CylinderGeometry(0.32, 0.25, 0.68, 28);
  const torsoMesh = new THREE.Mesh(torsoGeo, blazerMat);
  torsoMesh.position.y = -0.04;
  characterGroup.add(torsoMesh);

  // Shirt Collar & Golden Lapel Accent
  const collarGeo = new THREE.ConeGeometry(0.18, 0.22, 3);
  const collarMesh = new THREE.Mesh(collarGeo, shirtMat);
  collarMesh.position.set(0, 0.24, 0.19);
  collarMesh.rotation.x = Math.PI;
  characterGroup.add(collarMesh);

  const lapelLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.03), goldTrimMat);
  lapelLeft.position.set(-0.12, 0.12, 0.22);
  lapelLeft.rotation.z = -0.22;
  characterGroup.add(lapelLeft);

  const lapelRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.03), goldTrimMat);
  lapelRight.position.set(0.12, 0.12, 0.22);
  lapelRight.rotation.z = 0.22;
  characterGroup.add(lapelRight);

  // Sculpted Neck & Head Group
  const neckGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.16, 20);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neckMesh.position.set(0, 0.32, 0);
  characterGroup.add(neckMesh);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.48, 0);
  characterGroup.add(headGroup);

  // Head Contour (Sculpted with chin taper)
  const headGeo = new THREE.SphereGeometry(0.31, 32, 32);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headGroup.add(headMesh);

  // Volumetric Styled Hairstyle (Layered buns & sweeping bangs)
  const hairBaseGeo = new THREE.SphereGeometry(0.33, 28, 28, 0, Math.PI * 2, 0, Math.PI * 0.58);
  const hairBaseMesh = new THREE.Mesh(hairBaseGeo, hairMat);
  hairBaseMesh.position.set(0, 0.05, -0.02);
  headGroup.add(hairBaseMesh);

  const hairBunGeo = new THREE.SphereGeometry(0.15, 24, 24);
  const hairBun = new THREE.Mesh(hairBunGeo, hairMat);
  hairBun.position.set(0, 0.36, -0.08);
  headGroup.add(hairBun);

  const hairpinGeo = new THREE.TorusGeometry(0.08, 0.015, 12, 24);
  const hairpin = new THREE.Mesh(hairpinGeo, goldTrimMat);
  hairpin.position.set(0, 0.36, -0.08);
  hairpin.rotation.x = Math.PI / 2;
  headGroup.add(hairpin);

  // Lifelike Eyes with Depth & Catchlights
  const leftEye = createDetailedEye(0x059669, true);
  leftEye.eyeGroup.position.set(-0.11, 0.04, 0.27);
  headGroup.add(leftEye.eyeGroup);

  const rightEye = createDetailedEye(0x059669, false);
  rightEye.eyeGroup.position.set(0.11, 0.04, 0.27);
  headGroup.add(rightEye.eyeGroup);

  // Expressive 3D Eyebrows
  const leftBrow = createEyebrow(0x271B15);
  leftBrow.position.set(-0.11, 0.13, 0.28);
  leftBrow.rotation.z = 0.08;
  headGroup.add(leftBrow);

  const rightBrow = createEyebrow(0x271B15);
  rightBrow.position.set(0.11, 0.13, 0.28);
  rightBrow.rotation.z = -0.08;
  headGroup.add(rightBrow);

  // Phonetic Responsive Mouth
  const mouthRig = createLipSyncMouth(0xBE123C);
  mouthRig.position.set(0, -0.12, 0.28);
  headGroup.add(mouthRig);

  // Left Arm holding Magic Teaching Wand
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.35, 0.2, 0);
  characterGroup.add(leftArmGroup);

  const armGeo = new THREE.CylinderGeometry(0.072, 0.062, 0.44, 20);
  const leftArmMesh = new THREE.Mesh(armGeo, blazerMat);
  leftArmMesh.position.set(-0.08, -0.17, 0.08);
  leftArmMesh.rotation.z = 0.4;
  leftArmMesh.rotation.x = -0.3;
  leftArmGroup.add(leftArmMesh);

  // Teaching Wand with Floating Gyroscopic Orbital Rings
  const wandGroup = new THREE.Group();
  wandGroup.position.set(-0.25, -0.12, 0.26);
  leftArmGroup.add(wandGroup);

  const wandRod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.014, 0.58, 16), goldTrimMat);
  wandRod.rotation.z = -0.6;
  wandGroup.add(wandRod);

  const starGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.09), starMat);
  starGem.position.set(-0.18, 0.24, 0);
  wandGroup.add(starGem);

  const wandRingGeo = new THREE.TorusGeometry(0.14, 0.012, 12, 28);
  const wandRing = new THREE.Mesh(wandRingGeo, goldTrimMat);
  wandRing.position.copy(starGem.position);
  wandGroup.add(wandRing);

  // Right Arm (Articulated for welcoming/cheering)
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.35, 0.2, 0);
  characterGroup.add(rightArmGroup);

  const rightArmMesh = new THREE.Mesh(armGeo, blazerMat);
  rightArmMesh.position.set(0.08, -0.17, 0.08);
  rightArmMesh.rotation.z = -0.4;
  rightArmMesh.rotation.x = -0.2;
  rightArmGroup.add(rightArmMesh);

  // Animation Update
  let blinkTimer = 0;
  let isBlinking = false;

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    // 1. Natural idle breathing
    const breath = Math.sin(time * 2.2) * 0.024;
    characterGroup.position.y = breath;
    headGroup.position.y = 0.48 + breath * 0.35;

    // 2. Subtle head sway & look-at
    headGroup.rotation.y = Math.sin(time * 1.1) * 0.07;
    headGroup.rotation.z = Math.sin(time * 0.8) * 0.03;

    // 3. Wand gem rotation & gyroscopic spin
    starGem.rotation.y += delta * 2.4;
    starGem.rotation.x += delta * 1.2;
    wandRing.rotation.x += delta * 1.8;
    wandRing.rotation.y += delta * 2.2;

    // 4. Natural blinking
    blinkTimer += delta;
    if (!isBlinking && blinkTimer > 3.0 + Math.random() * 2) {
      isBlinking = true;
      blinkTimer = 0;
      leftEye.eyelidMesh.visible = true;
      rightEye.eyelidMesh.visible = true;
    } else if (isBlinking && blinkTimer > 0.12) {
      isBlinking = false;
      blinkTimer = 0;
      leftEye.eyelidMesh.visible = false;
      rightEye.eyelidMesh.visible = false;
    }

    // 5. Lip-sync mouth animation
    if (isSpeaking) {
      const speechFreq = Math.sin(time * 24) * 0.5 + 0.5;
      mouthRig.scale.y = 1 + speechFreq * 1.8;
      mouthRig.scale.x = 1 - speechFreq * 0.25;
      mouthRig.position.y = -0.12 - speechFreq * 0.02;
    } else {
      mouthRig.scale.set(1, 1, 1);
      mouthRig.position.y = -0.12;
    }

    // 6. Mood reactivity & eyebrow expressions
    if (mood === 'celebrate' || mood === 'correct') {
      rightArmGroup.rotation.z = -0.95 + Math.sin(time * 6) * 0.3;
      leftArmGroup.rotation.z = 0.75 + Math.sin(time * 6) * 0.2;
      characterGroup.position.y = breath + Math.abs(Math.sin(time * 4)) * 0.12;
      leftBrow.rotation.z = 0.2;
      rightBrow.rotation.z = -0.2;
    } else if (mood === 'thinking') {
      headGroup.rotation.z = 0.18;
      leftBrow.rotation.z = -0.15;
      rightBrow.rotation.z = 0.25; // Raised inquiring brow
      rightArmGroup.rotation.z = -0.2;
    } else {
      rightArmGroup.rotation.z = Math.sin(time * 1.5) * 0.08 - 0.4;
      leftArmGroup.rotation.z = -Math.sin(time * 1.5) * 0.06 + 0.4;
      leftBrow.rotation.z = 0.08;
      rightBrow.rotation.z = -0.08;
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

  const dispose = () => scene.clear();

  return {
    root,
    characterGroup,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    mouthMesh: mouthRig as unknown as THREE.Mesh,
    leftEyeMesh: leftEye.eyeGroup as unknown as THREE.Mesh,
    rightEyeMesh: rightEye.eyeGroup as unknown as THREE.Mesh,
    leftEyebrow: leftBrow,
    rightEyebrow: rightBrow,
    eyelids: [leftEye.eyelidMesh, rightEye.eyelidMesh],
    accessoryMesh: wandGroup,
    particles,
    pedestal,
    update,
    dispose,
  };
}

// ============================================================================
// 2. LEO (PRONUNCIATION COACH) - REDESIGNED 3D RIG
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
    roughness: 0.42,
    metalness: 0.04,
  });
  const jacketMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(profile.accentColor), // Azure Sky Blue
    roughness: 0.45,
    metalness: 0.15,
  });
  const darkTrimMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    roughness: 0.2,
    metalness: 0.8,
  });
  const cyanLedMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x0284C7,
    emissiveIntensity: 0.9,
    roughness: 0.15,
  });

  // Torso / Sporty Coach Vest
  const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.27, 0.7, 24), jacketMat);
  torsoMesh.position.y = -0.04;
  characterGroup.add(torsoMesh);

  // Athletic Stripe Accents
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.68, 0.32), cyanLedMat);
  stripe.position.set(0, -0.04, 0.16);
  characterGroup.add(stripe);

  // Head Group
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.48, 0);
  characterGroup.add(headGroup);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.31, 30, 30), skinMat);
  headGroup.add(headMesh);

  // Textured Modern Hairstyle
  const hairGeo = new THREE.SphereGeometry(0.33, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.35 });
  const hairMesh = new THREE.Mesh(hairGeo, hairMat);
  hairMesh.position.set(0, 0.06, -0.02);
  headGroup.add(hairMesh);

  // High-Tech Studio Broadcast Headphones
  const bandGeo = new THREE.TorusGeometry(0.33, 0.038, 16, 32, Math.PI);
  const bandMesh = new THREE.Mesh(bandGeo, darkTrimMat);
  bandMesh.rotation.z = Math.PI;
  bandMesh.position.set(0, 0.08, 0);
  headGroup.add(bandMesh);

  // Glowing Frequency Equalizer Ear-Cups
  const leftCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24), darkTrimMat);
  leftCup.rotation.z = Math.PI / 2;
  leftCup.position.set(-0.33, 0.05, 0);
  headGroup.add(leftCup);

  const leftEqRing = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 12, 24), cyanLedMat);
  leftEqRing.rotation.y = Math.PI / 2;
  leftEqRing.position.set(-0.375, 0.05, 0);
  headGroup.add(leftEqRing);

  const rightCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24), darkTrimMat);
  rightCup.rotation.z = Math.PI / 2;
  rightCup.position.set(0.33, 0.05, 0);
  headGroup.add(rightCup);

  const rightEqRing = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 12, 24), cyanLedMat);
  rightEqRing.rotation.y = Math.PI / 2;
  rightEqRing.position.set(0.375, 0.05, 0);
  headGroup.add(rightEqRing);

  // Flexible Broadcast Microphone Boom
  const micBoomGroup = new THREE.Group();
  micBoomGroup.position.set(-0.33, 0.05, 0);
  headGroup.add(micBoomGroup);

  const boomArm = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.28, 12), darkTrimMat);
  boomArm.rotation.x = 1.1;
  boomArm.rotation.z = -0.3;
  boomArm.position.set(0.08, -0.12, 0.14);
  micBoomGroup.add(boomArm);

  const micTip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 14, 14), cyanLedMat);
  micTip.position.set(0.14, -0.22, 0.25);
  micBoomGroup.add(micTip);

  // Lifelike Eyes with Catchlights
  const leftEye = createDetailedEye(0x0284C7, true);
  leftEye.eyeGroup.position.set(-0.11, 0.04, 0.28);
  headGroup.add(leftEye.eyeGroup);

  const rightEye = createDetailedEye(0x0284C7, false);
  rightEye.eyeGroup.position.set(0.11, 0.04, 0.28);
  headGroup.add(rightEye.eyeGroup);

  const leftBrow = createEyebrow(0x0F172A);
  leftBrow.position.set(-0.11, 0.13, 0.29);
  headGroup.add(leftBrow);

  const rightBrow = createEyebrow(0x0F172A);
  rightBrow.position.set(0.11, 0.13, 0.29);
  headGroup.add(rightBrow);

  // Phonetic Speech Articulation Mouth
  const mouthRig = createLipSyncMouth(0x991B1B);
  mouthRig.position.set(0, -0.12, 0.28);
  headGroup.add(mouthRig);

  // Soundwave Aura Rings (Radiate dynamically during speech)
  const auraRings: THREE.Mesh[] = [];
  const auraMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x38BDF8,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.35,
  });
  for (let r = 0; r < 3; r++) {
    const ringGeo = new THREE.TorusGeometry(0.42 + r * 0.14, 0.018, 12, 32);
    const ringMesh = new THREE.Mesh(ringGeo, auraMat.clone());
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 0.05, 0);
    ringMesh.visible = false;
    headGroup.add(ringMesh);
    auraRings.push(ringMesh);
  }

  // Articulated Arms
  const armGeo = new THREE.CylinderGeometry(0.076, 0.065, 0.44, 20);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.36, 0.2, 0);
  characterGroup.add(leftArmGroup);
  const leftArm = new THREE.Mesh(armGeo, jacketMat);
  leftArm.position.set(-0.06, -0.18, 0.06);
  leftArm.rotation.z = 0.35;
  leftArmGroup.add(leftArm);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.36, 0.2, 0);
  characterGroup.add(rightArmGroup);
  const rightArm = new THREE.Mesh(armGeo, jacketMat);
  rightArm.position.set(0.06, -0.18, 0.06);
  rightArm.rotation.z = -0.35;
  rightArmGroup.add(rightArm);

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    const breath = Math.sin(time * 2.4) * 0.022;
    characterGroup.position.y = breath;

    // Head tilt during speech demonstration
    headGroup.rotation.y = Math.sin(time * 1.3) * 0.07;

    // Speaking Lip-Sync + Soundwave Visualizer Pulses
    if (isSpeaking) {
      const speechVal = Math.sin(time * 26) * 0.5 + 0.5;
      mouthRig.scale.y = 1 + speechVal * 2.2;
      mouthRig.scale.x = 1 + speechVal * 0.35;
      micTip.scale.setScalar(1 + speechVal * 0.35);

      auraRings.forEach((ring, idx) => {
        ring.visible = true;
        const progress = (time * 3 + idx * 0.33) % 1;
        ring.scale.setScalar(0.9 + progress * 0.7);
        (ring.material as THREE.MeshStandardMaterial).opacity = (1 - progress) * 0.5;
      });
    } else {
      mouthRig.scale.set(1, 1, 1);
      auraRings.forEach((ring) => (ring.visible = false));
      micTip.scale.set(1, 1, 1);
    }

    if (mood === 'celebrate' || mood === 'correct') {
      rightArmGroup.rotation.z = -1.1 + Math.sin(time * 5) * 0.2;
      leftArmGroup.rotation.z = 1.1 - Math.sin(time * 5) * 0.2;
    } else {
      rightArmGroup.rotation.z = -0.35 + Math.sin(time * 1.5) * 0.05;
      leftArmGroup.rotation.z = 0.35 - Math.sin(time * 1.5) * 0.05;
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
    mouthMesh: mouthRig as unknown as THREE.Mesh,
    leftEyeMesh: leftEye.eyeGroup as unknown as THREE.Mesh,
    rightEyeMesh: rightEye.eyeGroup as unknown as THREE.Mesh,
    eyelids: [leftEye.eyelidMesh, rightEye.eyelidMesh],
    auraRings,
    particles,
    pedestal,
    update,
    dispose,
  };
}

// ============================================================================
// 3. ELENA (CONVERSATION PARTNER) - REDESIGNED 3D RIG
// ============================================================================
function buildElenaRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['elena'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xF7D0B4, roughness: 0.42 });
  const sweaterMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(profile.accentColor), // Amber / Warm Orange
    roughness: 0.6,
  });
  const scarfMat = new THREE.MeshStandardMaterial({
    color: 0xFBBF24,
    roughness: 0.55,
  });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x4A2E18, roughness: 0.38 });
  const tabletMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    roughness: 0.2,
    metalness: 0.8,
  });
  const screenGlowMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x0284C7,
    emissiveIntensity: 0.85,
    roughness: 0.15,
  });

  // Torso / Knit Sweater
  const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.25, 0.66, 24), sweaterMat);
  torsoMesh.position.y = -0.04;
  characterGroup.add(torsoMesh);

  // Layered Knitted Scarf
  const scarfGeo = new THREE.TorusGeometry(0.24, 0.07, 16, 28);
  const scarfMesh = new THREE.Mesh(scarfGeo, scarfMat);
  scarfMesh.rotation.x = Math.PI / 2.2;
  scarfMesh.position.set(0, 0.26, 0.04);
  characterGroup.add(scarfMesh);

  const scarfTail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.04), scarfMat);
  scarfTail.position.set(0.12, 0.08, 0.23);
  scarfTail.rotation.z = -0.15;
  characterGroup.add(scarfTail);

  // Head Group (Natural conversational inquisitive tilt)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.48, 0);
  headGroup.rotation.z = 0.06;
  characterGroup.add(headGroup);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.31, 30, 30), skinMat);
  headGroup.add(headMesh);

  // Flowing Wavy Hair Locks
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.34, 26, 26, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat);
  hairMesh.position.set(0, 0.04, -0.02);
  headGroup.add(hairMesh);

  // Warm Amber Eyes
  const leftEye = createDetailedEye(0xD97706, true);
  leftEye.eyeGroup.position.set(-0.11, 0.04, 0.28);
  headGroup.add(leftEye.eyeGroup);

  const rightEye = createDetailedEye(0xD97706, false);
  rightEye.eyeGroup.position.set(0.11, 0.04, 0.28);
  headGroup.add(rightEye.eyeGroup);

  const leftBrow = createEyebrow(0x2E1809);
  leftBrow.position.set(-0.11, 0.13, 0.29);
  headGroup.add(leftBrow);

  const rightBrow = createEyebrow(0x2E1809);
  rightBrow.position.set(0.11, 0.13, 0.29);
  headGroup.add(rightBrow);

  // Conversational Mouth
  const mouthRig = createLipSyncMouth(0xDC2626);
  mouthRig.position.set(0, -0.12, 0.28);
  headGroup.add(mouthRig);

  // Digital Holographic Dialogue Tablet
  const tabletGroup = new THREE.Group();
  tabletGroup.position.set(-0.28, 0.08, 0.26);
  tabletGroup.rotation.y = 0.35;
  tabletGroup.rotation.x = -0.3;
  characterGroup.add(tabletGroup);

  const tabletBase = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 0.02), tabletMat);
  tabletGroup.add(tabletBase);

  const tabletScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.3), screenGlowMat);
  tabletScreen.position.set(0, 0, 0.012);
  tabletGroup.add(tabletScreen);

  // Gesturing Conversational Arms
  const armGeo = new THREE.CylinderGeometry(0.074, 0.064, 0.44, 20);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.35, 0.18, 0);
  characterGroup.add(leftArmGroup);
  const leftArmMesh = new THREE.Mesh(armGeo, sweaterMat);
  leftArmMesh.position.set(-0.06, -0.16, 0.1);
  leftArmMesh.rotation.z = 0.45;
  leftArmMesh.rotation.x = -0.35;
  leftArmGroup.add(leftArmMesh);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.35, 0.18, 0);
  characterGroup.add(rightArmGroup);
  const rightArmMesh = new THREE.Mesh(armGeo, sweaterMat);
  rightArmMesh.position.set(0.06, -0.16, 0.1);
  rightArmMesh.rotation.z = -0.45;
  rightArmMesh.rotation.x = -0.35;
  rightArmGroup.add(rightArmMesh);

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    const breath = Math.sin(time * 2.2) * 0.024;
    characterGroup.position.y = breath;

    // Expressive conversational gestures
    headGroup.rotation.x = Math.sin(time * 1.8) * 0.05;
    headGroup.rotation.y = Math.sin(time * 1.2) * 0.08;
    rightArmGroup.rotation.x = -0.35 + Math.sin(time * 2.5) * 0.12;

    if (isSpeaking) {
      const speech = Math.sin(time * 24) * 0.5 + 0.5;
      mouthRig.scale.y = 1 + speech * 2.0;
    } else {
      mouthRig.scale.set(1, 1, 1);
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
    mouthMesh: mouthRig as unknown as THREE.Mesh,
    leftEyeMesh: leftEye.eyeGroup as unknown as THREE.Mesh,
    rightEyeMesh: rightEye.eyeGroup as unknown as THREE.Mesh,
    eyelids: [leftEye.eyelidMesh, rightEye.eyelidMesh],
    accessoryMesh: tabletGroup,
    particles,
    pedestal,
    update,
    dispose,
  };
}

// ============================================================================
// 4. KAEL (CHALLENGE MASTER) - REDESIGNED 3D RIG
// ============================================================================
function buildKaelRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['kael'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xF3C9AC, roughness: 0.42 });
  const armorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(profile.accentColor), // Amethyst Violet
    roughness: 0.3,
    metalness: 0.4,
  });
  const darkPlateMat = new THREE.MeshStandardMaterial({
    color: 0x1E1B4B,
    roughness: 0.2,
    metalness: 0.8,
  });
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0xA78BFA,
    emissive: 0x8B5CF6,
    emissiveIntensity: 1.3,
    roughness: 0.1,
    metalness: 0.5,
  });
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xC084FC, wireframe: true });

  // Torso / Speed Suit
  const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.7, 24), armorMat);
  torsoMesh.position.y = -0.04;
  characterGroup.add(torsoMesh);

  // Chest Challenge Emblem
  const chestPlate = new THREE.Mesh(new THREE.OctahedronGeometry(0.12), darkPlateMat);
  chestPlate.position.set(0, 0.1, 0.19);
  characterGroup.add(chestPlate);

  // Head
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.48, 0);
  characterGroup.add(headGroup);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.31, 28, 28), skinMat);
  headGroup.add(headMesh);

  // High-Tech Cyber Visor with HUD glow
  const visorGeo = new THREE.BoxGeometry(0.42, 0.12, 0.16);
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  visorMesh.position.set(0, 0.05, 0.24);
  headGroup.add(visorMesh);

  // Dynamic Spiked Hair
  const hairGeo = new THREE.ConeGeometry(0.16, 0.35, 4);
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x312E81, roughness: 0.3 });
  for (let s = -2; s <= 2; s++) {
    const spike = new THREE.Mesh(hairGeo, hairMat);
    spike.position.set(s * 0.08, 0.32, -s * 0.03);
    spike.rotation.z = -s * 0.15;
    headGroup.add(spike);
  }

  // Mouth
  const mouthRig = createLipSyncMouth(0x701A75);
  mouthRig.position.set(0, -0.12, 0.28);
  headGroup.add(mouthRig);

  // Orbiting Challenge Polyhedra (Speed quiz power items)
  const challengePolyhedra = new THREE.Group();
  characterGroup.add(challengePolyhedra);

  const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(0.12), wireMat);
  icosahedron.position.set(-0.48, 0.14, 0.3);
  challengePolyhedra.add(icosahedron);

  const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(0.11), wireMat);
  octahedron.position.set(0.48, 0.14, 0.3);
  challengePolyhedra.add(octahedron);

  // Arms
  const armGeo = new THREE.CylinderGeometry(0.078, 0.068, 0.44, 20);

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

    // Orbiting Polyhedra
    icosahedron.rotation.x += delta * 2.2;
    icosahedron.rotation.y += delta * 1.8;
    octahedron.rotation.y += delta * 2.5;

    // Visor HUD pulse
    visorMat.emissiveIntensity = 1.1 + Math.sin(time * 5) * 0.35;

    if (isSpeaking) {
      mouthRig.scale.y = 1 + (Math.sin(time * 24) * 0.5 + 0.5) * 1.8;
    } else {
      mouthRig.scale.set(1, 1, 1);
    }

    if (mood === 'celebrate' || mood === 'correct') {
      leftArmGroup.rotation.z = 1.1 + Math.sin(time * 6) * 0.2;
      rightArmGroup.rotation.z = -1.1 - Math.sin(time * 6) * 0.2;
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
    mouthMesh: mouthRig as unknown as THREE.Mesh,
    leftEyeMesh: visorMesh,
    rightEyeMesh: visorMesh,
    eyelids: [],
    accessoryMesh: challengePolyhedra,
    particles,
    pedestal,
    update,
    dispose,
  };
}

// ============================================================================
// 5. PIP (AI COMPANION ROBOT) - MASTERPIECE REDESIGNED 3D RIG
// ============================================================================
function buildPipRig(
  scene: THREE.Scene,
  profile: typeof CHARACTER_PROFILES['pip'],
  root: THREE.Group,
  characterGroup: THREE.Group,
  pedestal: THREE.Group,
  particles: THREE.Points
): RigInstance {
  // Pearlescent Enamel & Ceramic Chassis
  const enamelMat = new THREE.MeshStandardMaterial({
    color: 0xF8FAFC,
    roughness: 0.12,
    metalness: 0.35,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    roughness: 0.08,
    metalness: 0.92,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x020617,
    roughness: 0.05,
    metalness: 0.85,
  });
  const ledEyeMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x0EA5E9,
    emissiveIntensity: 1.6,
  });
  const starEyeMat = new THREE.MeshStandardMaterial({
    color: 0xFDE047,
    emissive: 0xEAB308,
    emissiveIntensity: 1.8,
  });
  const thrusterMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x0EA5E9,
    emissiveIntensity: 1.3,
    transparent: true,
    opacity: 0.65,
  });

  // Capsule Robot Chassis
  const bodyGeo = new THREE.CapsuleGeometry(0.38, 0.46, 18, 28);
  const bodyMesh = new THREE.Mesh(bodyGeo, enamelMat);
  bodyMesh.position.y = 0.22;
  characterGroup.add(bodyMesh);

  // Curved OLED Visor Screen
  const screenGeo = new THREE.CylinderGeometry(0.388, 0.388, 0.3, 28, 1, false, -Math.PI * 0.36, Math.PI * 0.72);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.y = 0.28;
  characterGroup.add(screenMesh);

  // Digital Normal Eyes (Curved expressive bars)
  const normalEyesGroup = new THREE.Group();
  characterGroup.add(normalEyesGroup);

  const leftEyeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.045, 0.04), ledEyeMat);
  leftEyeMesh.position.set(-0.13, 0.29, 0.365);
  normalEyesGroup.add(leftEyeMesh);

  const rightEyeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.045, 0.04), ledEyeMat);
  rightEyeMesh.position.set(0.13, 0.29, 0.365);
  normalEyesGroup.add(rightEyeMesh);

  // Digital Star Eyes for Celebrations & Level-Up!
  const starEyesGroup = new THREE.Group();
  starEyesGroup.visible = false;
  characterGroup.add(starEyesGroup);

  const leftStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.06), starEyeMat);
  leftStar.position.set(-0.13, 0.29, 0.37);
  starEyesGroup.add(leftStar);

  const rightStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.06), starEyeMat);
  rightStar.position.set(0.13, 0.29, 0.37);
  starEyesGroup.add(rightStar);

  // Glowing Chest Heart Indicator
  const chestHeart = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), ledEyeMat);
  chestHeart.position.set(0, 0.05, 0.38);
  characterGroup.add(chestHeart);

  // Top Antenna & Pulsing Beacon
  const antennaRod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.24, 16), chromeMat);
  antennaRod.position.set(0, 0.74, 0);
  characterGroup.add(antennaRod);

  const antennaOrb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 18, 18), ledEyeMat);
  antennaOrb.position.set(0, 0.86, 0);
  characterGroup.add(antennaOrb);

  // Anti-Gravity Base Thruster Rings
  const thrusterRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 16, 32), chromeMat);
  thrusterRing.rotation.x = Math.PI / 2;
  thrusterRing.position.set(0, -0.05, 0);
  characterGroup.add(thrusterRing);

  const thrusterGlow = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.35, 20), thrusterMat);
  thrusterGlow.position.set(0, -0.24, 0);
  characterGroup.add(thrusterGlow);

  // Floating Magnetic Hands
  const handGeo = new THREE.SphereGeometry(0.08, 18, 18);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.46, 0.22, 0.06);
  characterGroup.add(leftArmGroup);
  const leftHand = new THREE.Mesh(handGeo, enamelMat);
  leftArmGroup.add(leftHand);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.46, 0.22, 0.06);
  characterGroup.add(rightArmGroup);
  const rightHand = new THREE.Mesh(handGeo, enamelMat);
  rightArmGroup.add(rightHand);

  // Digital Visor Mouth Bar
  const mouthGeo = new THREE.BoxGeometry(0.12, 0.022, 0.03);
  const mouthMesh = new THREE.Mesh(mouthGeo, ledEyeMat);
  mouthMesh.position.set(0, 0.2, 0.365);
  characterGroup.add(mouthMesh);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.3, 0);
  characterGroup.add(headGroup);

  let spinAngle = 0;

  const update = (delta: number, time: number, isSpeaking: boolean, mood: CharacterMood) => {
    // Floating physics hover bobbing
    const hover = Math.sin(time * 3.0) * 0.065;
    characterGroup.position.y = hover + 0.1;

    // Thruster flame flicker & heart pulse
    thrusterGlow.scale.set(
      1 + Math.sin(time * 16) * 0.15,
      1 + Math.sin(time * 20) * 0.2,
      1 + Math.sin(time * 16) * 0.15
    );
    antennaOrb.scale.setScalar(1 + Math.sin(time * 6) * 0.15);
    chestHeart.scale.setScalar(1 + Math.sin(time * 3.5) * 0.2);

    // Floating hands bob independently
    leftArmGroup.position.y = 0.22 + Math.sin(time * 3.5 + 1) * 0.04;
    rightArmGroup.position.y = 0.22 + Math.sin(time * 3.5) * 0.04;

    // Lip-sync digital mouth
    if (isSpeaking) {
      mouthMesh.scale.x = 1 + (Math.sin(time * 24) * 0.5 + 0.5) * 0.8;
      mouthMesh.scale.y = 1 + (Math.sin(time * 24) * 0.5 + 0.5) * 1.6;
    } else {
      mouthMesh.scale.set(1, 1, 1);
    }

    // Star eyes during celebration / LevelUp
    if (mood === 'celebrate' || mood === 'correct') {
      normalEyesGroup.visible = false;
      starEyesGroup.visible = true;
      leftStar.rotation.z += delta * 4;
      rightStar.rotation.z += delta * 4;

      // 360 Spin Victory!
      spinAngle += delta * 6.5;
      characterGroup.rotation.y = spinAngle;
      leftArmGroup.position.y = 0.46;
      rightArmGroup.position.y = 0.46;
    } else {
      normalEyesGroup.visible = true;
      starEyesGroup.visible = false;
      characterGroup.rotation.y = Math.sin(time * 1.2) * 0.15;
    }

    // Ambient particles
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
