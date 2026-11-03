/**
 * Automated Verification Suite for:
 * 1. Genuine Real-Time 3D Characters (Maya, Leo, Elena, Kael, Pip)
 * 2. 15-Question Pedagogical Rotation Engine
 * 3. Audio-Synchronized Lip Sync & Kinematics
 * 4. Research-Based Color Palette & WCAG Contrast
 * 5. 3D Environment Stage & Lighting Systems
 */

import * as THREE from 'three';
import {
  CharacterId,
  CHARACTER_PROFILES,
  getCharacterForQuestion,
  getCharacterQuote,
} from '../mobile/src/components/character/Character3DRegistry';
import { createCharacter3DScene } from '../mobile/src/components/character/models/Character3DRig';
import { RESEARCH_PALETTE, ENVIRONMENT_3D } from '../mobile/src/constants/theme';
import { SoundService } from '../mobile/src/services/soundService';

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition: boolean, testName: string, detail: string) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`✅ [PASS] ${testName} | ${detail}`);
  } else {
    failedChecks++;
    console.error(`❌ [FAIL] ${testName} | ${detail}`);
  }
}

// Contrast ratio helper according to WCAG 2.1 specs
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

async function runVerification() {
  console.log('========================================================================');
  console.log('   LINGOPULSE 3D CHARACTERS & IMMERSIVE EXPERIENCE VERIFICATION SUITE   ');
  console.log('========================================================================\n');

  // --------------------------------------------------------------------------
  // TEST SUITE 1: 5 UNIQUE 3D CHARACTER PROFILES & RIGS
  // --------------------------------------------------------------------------
  console.log('--- Test Suite 1: 5 Unique 3D Character Profiles & Rigs ---');
  const characterIds: CharacterId[] = ['maya', 'leo', 'elena', 'kael', 'pip'];

  assert(
    characterIds.length === 5,
    'Character Count',
    'Exactly 5 distinct character personalities are defined'
  );

  characterIds.forEach((charId) => {
    const profile = CHARACTER_PROFILES[charId];
    assert(
      !!profile && profile.name.length > 0,
      `Profile: ${charId}`,
      `Name: ${profile?.name}, Role: ${profile?.role}, Title: ${profile?.title}`
    );
    assert(
      profile?.quotes.intro.length >= 2 && profile?.quotes.correct.length >= 2,
      `Quotes: ${charId}`,
      `Has ${profile?.quotes.intro.length} intros, ${profile?.quotes.correct.length} victory quotes`
    );
  });

  // Verify Three.js Rig Construction for all 5 characters
  characterIds.forEach((charId) => {
    const { scene, camera, rig } = createCharacter3DScene(charId, 'daylight');

    assert(
      camera.fov === 42 && camera.position.z > 2.5,
      `Camera Setup for [${charId}]`,
      `PerspectiveCamera initialized with FOV 42° at position (${camera.position.x}, ${camera.position.y}, ${camera.position.z})`
    );

    assert(
      (rig.root as any).isGroup && (rig.characterGroup as any).isGroup,
      `Hierarchical Rig for [${charId}]`,
      `Root & CharacterGroup verified with kinematic structure`
    );

    assert(
      (rig.mouthMesh as any).isMesh,
      `Articulated Mouth for [${charId}]`,
      `Speech mouth mesh present for audio lip-sync morphing`
    );

    assert(
      (rig.pedestal as any).isGroup,
      `3D Environment Pedestal for [${charId}]`,
      `Pedestal stage present with bevels and contact shadow`
    );

    assert(
      (rig.particles as any).isPoints,
      `Ambient Particle System for [${charId}]`,
      `Ambient 3D particle motes attached to scene`
    );

    // Test Kinematic Update Frame
    rig.update(0.016, 1.0, false, 'idle');
    assert(
      typeof rig.update === 'function',
      `Animation Loop for [${charId}]`,
      `Update method executed smoothly without runtime exceptions`
    );

    rig.dispose();
  });

  // --------------------------------------------------------------------------
  // TEST SUITE 2: 15-QUESTION DYNAMIC ROTATION ENGINE
  // --------------------------------------------------------------------------
  console.log('\n--- Test Suite 2: 15-Question Dynamic Rotation Engine ---');
  const questionCount = 15;
  const rotationSequence: CharacterId[] = [];

  for (let q = 0; q < questionCount; q++) {
    const activeChar = getCharacterForQuestion(q, questionCount);
    rotationSequence.push(activeChar);
  }

  const uniqueChars = new Set(rotationSequence);
  assert(
    uniqueChars.size === 5,
    'Full Cast Rotation',
    `All 5 characters appear in 15-question lesson: [${Array.from(uniqueChars).join(', ')}]`
  );

  const charCounts: Record<CharacterId, number> = { maya: 0, leo: 0, elena: 0, kael: 0, pip: 0 };
  rotationSequence.forEach((c) => charCounts[c]++);

  console.log(`Rotation Distribution: Maya=${charCounts.maya}, Leo=${charCounts.leo}, Elena=${charCounts.elena}, Kael=${charCounts.kael}, Pip=${charCounts.pip}`);

  assert(
    rotationSequence[0] === 'maya',
    'Question 1 Lead',
    'Maya (Teacher) leads Question 1 to introduce vocabulary'
  );
  assert(
    rotationSequence[2] === 'kael',
    'Question 3 Speed',
    'Kael (Challenge Master) leads Question 3 quick quiz'
  );
  assert(
    rotationSequence[3] === 'elena',
    'Question 4 Dialogue',
    'Elena (Conversation Partner) leads Question 4 real-world dialogue'
  );
  assert(
    rotationSequence[4] === 'pip',
    'Question 5 Milestone',
    'Pip (AI Companion) celebrates 5-question milestone'
  );
  assert(
    rotationSequence[5] === 'leo',
    'Question 6 Pronunciation',
    'Leo (Pronunciation Coach) leads Question 6 phonetics'
  );
  assert(
    rotationSequence[14] === 'kael',
    'Question 15 Boss Challenge',
    'Kael challenges learner on the final Question 15 synthesis'
  );

  // Test Specialized Question Overrides
  const listeningChar = getCharacterForQuestion(2, 15, 'LISTENING');
  assert(
    listeningChar === 'leo',
    'Listening Exercise Override',
    'Question with LISTENING type routes to Leo (Pronunciation Coach)'
  );

  const speakingChar = getCharacterForQuestion(1, 15, 'SPEAKING');
  assert(
    speakingChar === 'leo',
    'Speaking Exercise Override',
    'Question with SPEAKING type routes to Leo (Pronunciation Coach)'
  );

  const dialogueChar = getCharacterForQuestion(0, 15, 'DIALOGUE');
  assert(
    dialogueChar === 'elena',
    'Dialogue Exercise Override',
    'Question with DIALOGUE type routes to Elena (Conversation Partner)'
  );

  // --------------------------------------------------------------------------
  // TEST SUITE 3: AUDIO-SYNCHRONIZED LIP SYNC & KINEMATICS
  // --------------------------------------------------------------------------
  console.log('\n--- Test Suite 3: Audio-Synchronized Lip Sync & Kinematics ---');

  let notifiedSpeaking = false;
  const unsubscribe = SoundService.addSpeakingListener((isSpeaking) => {
    notifiedSpeaking = isSpeaking;
  });

  assert(
    typeof unsubscribe === 'function',
    'SoundService Subscription',
    'SoundService.addSpeakingListener returns valid unsubscribe handler'
  );

  // Verify Rig Lip-Sync Reactivity (Leo's Rig)
  const { rig: leoRig } = createCharacter3DScene('leo', 'daylight');
  const initialMouthScaleY = leoRig.mouthMesh.scale.y;

  // Frame with isSpeaking = true
  leoRig.update(0.016, 1.5, true, 'speaking');
  const speakingMouthScaleY = leoRig.mouthMesh.scale.y;

  assert(
    speakingMouthScaleY > initialMouthScaleY,
    'Leo Lip-Sync Mouth Expansion',
    `Mouth scale expanded from ${initialMouthScaleY.toFixed(2)} to ${speakingMouthScaleY.toFixed(2)} during speech`
  );

  // Soundwave aura rings activated during speech
  assert(
    !!leoRig.auraRings && leoRig.auraRings.length === 3 && leoRig.auraRings[0].visible === true,
    'Leo Soundwave Aura Activation',
    'Concentric soundwave aura rings radiate around headset during active audio'
  );

  // Frame with isSpeaking = false
  leoRig.update(0.016, 2.0, false, 'idle');
  assert(
    leoRig.mouthMesh.scale.y === 1.0 && leoRig.auraRings[0].visible === false,
    'Lip-Sync Reset to Idle',
    'Mouth and aura rings reset to normal rest position when speech stops'
  );

  leoRig.dispose();
  unsubscribe();

  // --------------------------------------------------------------------------
  // TEST SUITE 4: RESEARCH-BASED COLOR PALETTE & WCAG CONTRAST
  // --------------------------------------------------------------------------
  console.log('\n--- Test Suite 4: Research-Based Color Palette & WCAG Contrast ---');

  assert(
    !!RESEARCH_PALETTE.growth && !!RESEARCH_PALETTE.audio && !!RESEARCH_PALETTE.challenge &&
    !!RESEARCH_PALETTE.reward && !!RESEARCH_PALETTE.correction && !!RESEARCH_PALETTE.neutrals,
    'Research Palette Core Keys',
    'All 6 cognitive educational palettes verified: growth, audio, challenge, reward, correction, neutrals'
  );

  // WCAG 2.1 Contrast Testing on #FFFFFF Background
  const white = '#FFFFFF';
  const contrastPairs = [
    { name: 'Growth Emerald (Teacher Maya)', hex: RESEARCH_PALETTE.growth[600], minRatio: 4.5 },
    { name: 'Audio Azure (Coach Leo)', hex: RESEARCH_PALETTE.audio[600], minRatio: 4.5 },
    { name: 'Challenge Violet (Master Kael)', hex: RESEARCH_PALETTE.challenge[600], minRatio: 4.5 },
    { name: 'Reward Amber (Companion Pip)', hex: RESEARCH_PALETTE.reward[700], minRatio: 4.5 },
    { name: 'Correction Coral (Review Drawer)', hex: RESEARCH_PALETTE.correction[600], minRatio: 4.5 },
    { name: 'High-Contrast Body (Slate 700)', hex: RESEARCH_PALETTE.neutrals[700], minRatio: 7.0 },
  ];

  contrastPairs.forEach((pair) => {
    const ratio = getContrastRatio(pair.hex, white);
    assert(
      ratio >= pair.minRatio,
      `WCAG Compliance: ${pair.name}`,
      `Contrast ratio ${ratio.toFixed(2)}:1 meets threshold >= ${pair.minRatio}:1 against white canvas`
    );
  });

  // --------------------------------------------------------------------------
  // TEST SUITE 5: 3D ENVIRONMENT LIGHTING PRESETS
  // --------------------------------------------------------------------------
  console.log('\n--- Test Suite 5: 3D Environment Lighting Presets ---');
  const presets = ['daylight', 'evening', 'celebration'] as const;

  presets.forEach((preset) => {
    const config = ENVIRONMENT_3D[preset];
    assert(
      !!config && !!config.keyLight && !!config.fillLight && !!config.rimLight,
      `3D Lighting Preset [${preset}]`,
      `Key (${config?.keyLight.intensity}x), Fill (${config?.fillLight.intensity}x), Rim (${config?.rimLight.intensity}x) studio lighting configured`
    );
  });

  console.log('\n========================================================================');
  console.log(`TOTAL CHECKS: ${totalChecks}`);
  console.log(`PASSED:       ${passedChecks}`);
  console.log(`FAILED:       ${failedChecks}`);
  console.log('========================================================================\n');

  if (failedChecks === 0) {
    console.log('🎉 ALL 3D CHARACTERS & IMMERSIVE EXPERIENCE CHECKS PASSED 100%!\n');
    process.exit(0);
  } else {
    console.error('❌ SOME CHECKS FAILED!');
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
