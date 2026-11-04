import React from 'react';
import { Platform } from 'react-native';
import { Realtime3DCharacterProps } from './Realtime3DCharacter.native';
import { Realtime3DCharacter as NativeCharacter } from './Realtime3DCharacter.native';

export { Realtime3DCharacterProps };

/**
 * Universal Realtime3DCharacter export
 * Automatically delegates to Realtime3DCharacter.native for mobile and Realtime3DCharacter.web for web.
 */
export const Realtime3DCharacter: React.FC<Realtime3DCharacterProps> = (props) => {
  if (Platform.OS === 'web') {
    try {
      const WebCharacter = require('./Realtime3DCharacter.web').Realtime3DCharacter;
      return <WebCharacter {...props} />;
    } catch {
      return <NativeCharacter {...props} />;
    }
  }

  return <NativeCharacter {...props} />;
};
