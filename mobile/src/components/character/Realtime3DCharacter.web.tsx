import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  PanResponder,
  Text,
} from 'react-native';
import * as THREE from 'three';
import { CharacterId, CharacterMood, CHARACTER_PROFILES } from './Character3DRegistry';
import { createCharacter3DScene, RigInstance, EnvironmentType } from './models/Character3DRig';
import { SoundService } from '../../services/soundService';

export interface Realtime3DCharacterProps {
  character?: CharacterId;
  mood?: CharacterMood;
  size?: number;
  interactive?: boolean;
  onPress?: () => void;
  themeMode?: 'daylight' | 'evening' | 'celebration';
  showStage?: boolean;
  environmentType?: EnvironmentType;
}

/**
 * Web Platform Real-time 3D Character
 * Uses HTML5 WebGL Canvas + Three.js Scene, Directional Lighting, and Rig Animation.
 */
export const Realtime3DCharacter: React.FC<Realtime3DCharacterProps> = ({
  character = 'maya',
  mood = 'idle',
  size = 140,
  interactive = true,
  onPress,
  themeMode = 'daylight',
  showStage = true,
  environmentType = 'auto',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rigRef = useRef<RigInstance | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isSpeakingRef = useRef<boolean>(false);
  const [webGLFailed, setWebGLFailed] = useState<boolean>(false);

  // Parallax Tilt Values
  const targetRotX = useRef<number>(0);
  const targetRotY = useRef<number>(0);
  const curRotX = useRef<number>(0);
  const curRotY = useRef<number>(0);

  // Pan / Parallax Responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => interactive,
      onMoveShouldSetPanResponder: () => interactive,
      onPanResponderMove: (_, gestureState) => {
        targetRotY.current = Math.max(-0.45, Math.min(0.45, gestureState.dx * 0.005));
        targetRotX.current = Math.max(-0.25, Math.min(0.25, -gestureState.dy * 0.005));
      },
      onPanResponderRelease: () => {
        targetRotX.current = 0;
        targetRotY.current = 0;
      },
    })
  ).current;

  // Listen to SoundService for real-time lip-sync
  useEffect(() => {
    const unsubscribe = SoundService.addSpeakingListener((speaking) => {
      isSpeakingRef.current = speaking;
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Initialize Three.js WebGL Scene (Web Platform)
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    let destroyed = false;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('[Realtime3DCharacter.web] WebGL initialization failed, using high-fidelity fallback', err);
      setWebGLFailed(true);
      return;
    }

    // Build Character Scene & Rig
    const { scene, camera, rig } = createCharacter3DScene(character, themeMode, environmentType);
    rigRef.current = rig;

    if (!showStage && rig.pedestal) {
      rig.pedestal.visible = false;
    }

    const clock = new THREE.Clock();

    // 60 FPS Animation Render Loop
    const renderLoop = () => {
      if (destroyed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Parallax Lerp
      curRotX.current += (targetRotX.current - curRotX.current) * 0.1;
      curRotY.current += (targetRotY.current - curRotY.current) * 0.1;
      rig.root.rotation.x = curRotX.current;
      rig.root.rotation.y = curRotY.current;

      // Update Character Kinematics & Lip-Sync
      rig.update(delta, elapsedTime, isSpeakingRef.current, mood);

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      destroyed = true;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      rig.dispose();
      renderer.dispose();
      rendererRef.current = null;
      rigRef.current = null;
    };
  }, [character, themeMode, size, showStage, mood, environmentType]);

  const handlePress = useCallback(() => {
    if (!interactive) return;
    if (onPress) onPress();
  }, [interactive, onPress]);

  const profile = CHARACTER_PROFILES[character] || CHARACTER_PROFILES.maya;

  return (
    <View
      style={[styles.container, { width: size, height: size }]}
      {...panResponder.panHandlers}
    >
      <Pressable
        onPress={handlePress}
        disabled={!interactive}
        style={[styles.pressableArea, { width: size, height: size }]}
      >
        {!webGLFailed ? (
          <canvas
            ref={canvasRef}
            width={size}
            height={size}
            style={{
              width: size,
              height: size,
              outline: 'none',
              pointerEvents: 'none',
              display: 'block',
            }}
          />
        ) : (
          <View style={[styles.fallbackStage, { width: size, height: size }]}>
            <View
              style={[
                styles.fallbackAura,
                {
                  width: size * 0.85,
                  height: size * 0.85,
                  borderRadius: size,
                  backgroundColor: profile.haloColor,
                },
              ]}
            />
            <View
              style={[
                styles.fallbackAvatarCircle,
                {
                  width: size * 0.65,
                  height: size * 0.65,
                  borderRadius: size,
                  borderColor: profile.accentColor,
                },
              ]}
            >
              <Text style={styles.fallbackEmoji}>
                {character === 'maya'
                  ? '👩‍🏫'
                  : character === 'leo'
                  ? '🎧'
                  : character === 'elena'
                  ? '🧣'
                  : character === 'kael'
                  ? '⚡'
                  : '🤖'}
              </Text>
            </View>
            {showStage && (
              <View
                style={[
                  styles.fallbackPedestal,
                  {
                    width: size * 0.82,
                    backgroundColor: profile.pedestalColor,
                    borderColor: profile.pedestalBorder,
                    borderBottomColor: profile.pedestalBottom,
                  },
                ]}
              />
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  pressableArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackStage: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fallbackAura: {
    position: 'absolute',
    top: 6,
    zIndex: 1,
  },
  fallbackAvatarCircle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderBottomWidth: 4.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    zIndex: 10,
  },
  fallbackEmoji: {
    fontSize: 44,
    textAlign: 'center',
  },
  fallbackPedestal: {
    height: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderBottomWidth: 4,
    marginTop: -6,
    zIndex: 5,
  },
});
