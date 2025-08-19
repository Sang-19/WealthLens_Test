import { useEffect } from 'react';
import { Platform } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    // Only run on web platform
    if (Platform.OS === 'web') {
      window.frameworkReady?.();
    }
  });
}
