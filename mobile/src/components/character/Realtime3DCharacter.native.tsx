import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PanResponder,
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
 * Powered by Three.js & expo-gl (OpenGL ES 3.0).
 * Renders real 3D volumetric humanoid rigs, articulated skeletal kinematics,
 * PBR materials with directional key/fill/rim lighting, pedestal contact shadows,
 * audio lip-sync mouth articulation, and 3D environment stages.
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
  const [glFailed, setGlFailed] = useState<boolean>(false);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rigRef = useRef<RigInstance | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isSpeakingRef = useRef<boolean>(false);
  const isDestroyedRef = useRef<boolean>(false);

  // Dynamic prop refs so animation loop responds instantly without recreating WebGL context
  const moodRef = useRef<CharacterMood>(mood);
  moodRef.current = mood;

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

        // gl.drawingBufferWidth/Height are ALREADY physical device pixels on Android/iOS.
        // Calling setPixelRatio(>1) AFTER setSize(drawingBufferWidth) would scale the viewport 2x offscreen!
        const bufferWidth = Math.max(1, gl.drawingBufferWidth || size);
        const bufferHeight = Math.max(1, gl.drawingBufferHeight || size);

        // Clean up any previous renderer/rig if context was recreated
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
          antialias: false,
          powerPreference: 'high-performance',
        });

        renderer.setPixelRatio(1);
        renderer.setSize(bufferWidth, bufferHeight, false);
        renderer.setClearColor(0x000000, 0);
        // Disable offscreen shadow FBO pass on expo-gl (rely on 3-point lighting + pedestal contact shadow)
        // because WebGLRenderTarget depth textures fail silently on several Android GLES drivers.
        renderer.shadowMap.enabled = false;
        renderer.toneMapping = THREE.NoToneMapping;
        rendererRef.current = renderer;

        // Construct Genuine 3D Scene, Camera & Articulated Humanoid Rig
        const { scene, camera, rig } = createCharacter3DScene(character, themeMode, environmentType);
        camera.aspect = bufferWidth / bufferHeight;
        camera.updateProjectionMatrix();
        rigRef.current = rig;

        if (!showStage && rig.pedestal) {
          rig.pedestal.visible = false;
        }

        const startMs = Date.now();
        let lastMs = startMs;
        let firstFrameShown = false;

        // 60 FPS Native OpenGL Animation Render Loop
        const renderLoop = () => {
          if (isDestroyedRef.current) return;

          try {
            const nowMs = Date.now();
            const delta = Math.min((nowMs - lastMs) / 1000, 0.1);
            const elapsedTime = (nowMs - startMs) / 1000;
            lastMs = nowMs;

            // Smooth Parallax Rig Tilt
            curRotX.current += (targetRotX.current - curRotX.current) * 0.1;
            curRotY.current += (targetRotY.current - curRotY.current) * 0.1;
            rig.root.rotation.x = curRotX.current;
            rig.root.rotation.y = curRotY.current;

            // Update rig kinematics, breathing, eye-blink & phoneme mouth sync
            rig.update(delta, elapsedTime, isSpeakingRef.current, moodRef.current);

            renderer.render(scene, camera);
            gl.endFrameEXP();

            if (!firstFrameShown) {
              firstFrameShown = true;
              setGlReady(true);
            }

            animFrameRef.current = requestAnimationFrame(renderLoop);
          } catch (frameErr) {
            console.warn('[Realtime3DCharacter.native] Frame render error, switching to fallback:', frameErr);
            setGlFailed(true);
          }
        };

        animFrameRef.current = requestAnimationFrame(renderLoop);
      } catch (err) {
        console.warn('[Realtime3DCharacter.native] GL initialization error:', err);
        setGlFailed(true);
      }
    },
    [character, themeMode, showStage, environmentType, size]
  );

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
        accessibilityRole="image"
        accessibilityLabel={`3D companion ${character}, ${mood} expression`}
      >
        {!glFailed && (
          <GLView
            key={`${character}-${themeMode}-${environmentType}`}
            style={{ width: size, height: size }}
            onContextCreate={onContextCreate}
          />
        )}

        {(!glReady || glFailed) && (
          <View
            pointerEvents="none"
            style={[styles.fallbackOverlay, { width: size, height: size }]}
          >
            <View
              style={[
                styles.fallbackAura,
                {
                  width: size * 0.84,
                  height: size * 0.84,
                  borderRadius: size,
                  backgroundColor: profile.haloColor,
                },
              ]}
            />
            <View
              style={[
                styles.fallbackAvatarCircle,
                {
                  width: size * 0.64,
                  height: size * 0.64,
                  borderRadius: size,
                  borderColor: profile.accentColor,
                },
              ]}
            >
              <Text style={[styles.fallbackEmoji, { fontSize: Math.round(size * 0.34) }]}>
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
                    width: size * 0.78,
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
    position: 'relative',
  },
  pressableArea: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fallbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
    zIndex: 10,
  },
  fallbackEmoji: {
    textAlign: 'center',
  },
  fallbackPedestal: {
    height: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 4,
    marginTop: -6,
    zIndex: 5,
  },
});
