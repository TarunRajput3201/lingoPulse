import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  PanResponder,
  PixelRatio,
  Platform,
} from 'react-native';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
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
 * Native Android & iOS Genuine Hardware-Accelerated 3D Character Experience.
 * Powered by Three.js & expo-gl (OpenGL ES).
 * Renders real 3D volumetric humanoid rigs, articulated skeletal kinematics,
 * PBR materials with directional key/fill/rim lighting, soft contact shadows (PCFSoftShadowMap),
 * audio lip-sync mouth articulation, and 3D environment stages.
 * Zero flat 2D SVGs, zero static images.
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
  const [glReady, setGlReady] = useState<boolean>(false);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rigRef = useRef<RigInstance | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isSpeakingRef = useRef<boolean>(false);
  const isDestroyedRef = useRef<boolean>(false);

  // Dynamic prop refs so animation loop responds instantly without recreating WebGL context
  const moodRef = useRef<CharacterMood>(mood);
  moodRef.current = mood;
  const characterRef = useRef<CharacterId>(character);
  characterRef.current = character;

  // Parallax Tilt Values
  const targetRotX = useRef<number>(0);
  const targetRotY = useRef<number>(0);
  const curRotX = useRef<number>(0);
  const curRotY = useRef<number>(0);

  // Pan / Parallax Responder for real-time 3D camera rotation
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

  // Listen to SoundService for real-time lip-sync mouth morphing
  useEffect(() => {
    const unsubscribe = SoundService.addSpeakingListener((speaking) => {
      isSpeakingRef.current = speaking;
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Unmount lifecycle cleanup: strictly dispose WebGL resources and stop animation frame
  useEffect(() => {
    isDestroyedRef.current = false;
    return () => {
      isDestroyedRef.current = true;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (rigRef.current) {
        try {
          rigRef.current.dispose();
        } catch {}
        rigRef.current = null;
      }
      if (rendererRef.current) {
        try {
          rendererRef.current.dispose();
        } catch {}
        rendererRef.current = null;
      }
    };
  }, []);

  const handlePress = useCallback(() => {
    if (!interactive) return;
    if (onPress) onPress();
  }, [interactive, onPress]);

  /**
   * Initialize Three.js on Android & iOS via expo-gl context
   */
  const onContextCreate = useCallback(
    async (gl: ExpoWebGLRenderingContext) => {
      try {
        if (isDestroyedRef.current) return;

        const pixelRatio = Math.min(PixelRatio.get() || 1, 2);
        const bufferWidth = gl.drawingBufferWidth > 0 ? gl.drawingBufferWidth : Math.round(size * pixelRatio);
        const bufferHeight = gl.drawingBufferHeight > 0 ? gl.drawingBufferHeight : Math.round(size * pixelRatio);

        // Custom WebGLRenderer wrapper binding Three.js to expo-gl context
        const renderer = new THREE.WebGLRenderer({
          canvas: {
            width: bufferWidth,
            height: bufferHeight,
            style: {},
            addEventListener: () => {},
            removeEventListener: () => {},
            clientHeight: bufferHeight,
            clientWidth: bufferWidth,
          } as any,
          context: gl,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });

        renderer.setSize(bufferWidth, bufferHeight, false);
        renderer.setPixelRatio(pixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        rendererRef.current = renderer;

        // Construct Genuine 3D Scene, Camera & Articulated Humanoid Rig
        const { scene, camera, rig } = createCharacter3DScene(character, themeMode, environmentType);
        rigRef.current = rig;

        if (!showStage && rig.pedestal) {
          rig.pedestal.visible = false;
        }

        const clock = new THREE.Clock();

        // 60 FPS Native OpenGL Animation Render Loop
        const renderLoop = () => {
          if (isDestroyedRef.current) return;
          animFrameRef.current = requestAnimationFrame(renderLoop);

          const delta = Math.min(clock.getDelta(), 0.1);
          const elapsedTime = clock.getElapsedTime();

          // Smooth Parallax Camera Orbit
          curRotX.current += (targetRotX.current - curRotX.current) * 0.1;
          curRotY.current += (targetRotY.current - curRotY.current) * 0.1;

          camera.position.x = curRotY.current * 0.45;
          camera.position.y = 0.32 + curRotX.current * 0.35;
          camera.lookAt(0, 0.22, 0);

          // Update rig kinematics, breathing, eye-blink & phoneme mouth sync
          rig.update(delta, elapsedTime, isSpeakingRef.current, moodRef.current);

          renderer.render(scene, camera);

          // Flush GPU frame buffer to native surface on Android/iOS
          gl.endFrameEXP();
        };

        animFrameRef.current = requestAnimationFrame(renderLoop);
        setGlReady(true);
      } catch (err) {
        console.warn('[Realtime3DCharacter.native] GL initialization error:', err);
      }
    },
    [character, themeMode, showStage, environmentType, size]
  );

  return (
    <View
      style={[styles.container, { width: size, height: size }]}
      {...panResponder.panHandlers}
    >
      <Pressable
        onPress={handlePress}
        disabled={!interactive}
        style={[styles.pressableArea, { width: size, height: size }]}
        accessibilityRole="image"
        accessibilityLabel={`3D companion ${character}, ${mood} expression`}
      >
        <GLView
          style={{ width: size, height: size }}
          onContextCreate={onContextCreate}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    position: 'relative',
  },
  pressableArea: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
