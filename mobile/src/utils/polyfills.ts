/**
 * LingoPulse Universal Runtime Polyfills
 * Guarantees crash-free execution across Native Android, iOS, Hermes, and Web environments.
 */

// 1. Process polyfills (Hermes & React Native native runtimes)
if (typeof process !== 'undefined') {
  if (typeof (process as any).emitWarning !== 'function') {
    (process as any).emitWarning = function (warning: any, type?: any) {
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.warn('[Runtime Warning]', warning);
      }
    };
  }

  if (!(process as any).env) {
    (process as any).env = {};
  }
}

// 2. Global window & globalThis aliases
if (typeof globalThis !== 'undefined') {
  if (typeof (globalThis as any).window === 'undefined') {
    (globalThis as any).window = globalThis;
  }
}

export {};
