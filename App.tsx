import React, { useState, useEffect, useRef } from 'react';
import { Dashboard } from './components/Dashboard';
import { StreamOverlay } from './components/StreamOverlay';
import { OverlayConfig, DEFAULT_CONFIG, STORAGE_KEY } from './types';

// Simple hash router implementation
const useHashLocation = () => {
  const [loc, setLoc] = useState(window.location.hash);
  useEffect(() => {
    const handler = () => setLoc(window.location.hash);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return loc;
};

// Helper to decode config from URL
const getConfigFromUrl = (): OverlayConfig | null => {
  try {
    const hash = window.location.hash;
    // Look for ?cfg=... in the hash
    const parts = hash.split('?cfg=');
    if (parts.length > 1) {
      const decoded = atob(parts[1]);
      return JSON.parse(decoded);
    }
  } catch (e) {
    console.warn("Failed to decode config from URL", e);
  }
  return null;
};

const App: React.FC = () => {
  const hash = useHashLocation();
  // Check if hash STARTS with #/overlay (to accommodate query params)
  const isOverlayMode = hash.startsWith('#/overlay');
  
  const [config, setConfig] = useState<OverlayConfig>(DEFAULT_CONFIG);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use a ref to prevent update loops
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  // Initialize
  useEffect(() => {
    // Priority 1: Config from URL (The "Stateful URL" fix)
    const urlConfig = getConfigFromUrl();
    
    if (urlConfig) {
      setConfig(urlConfig);
    } else {
      // Priority 2: Config from LocalStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setConfig(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse config", e);
        }
      }
    }

    // Setup Broadcast Channel for Real-time Tab-to-Tab sync
    broadcastChannelRef.current = new BroadcastChannel('stream_overlay_channel');
    broadcastChannelRef.current.onmessage = (event) => {
      if (event.data && event.data.type === 'UPDATE_CONFIG') {
        setConfig(event.data.payload);
      }
    };

    setIsInitialized(true);

    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
    };
  }, []);

  // Sync Logic
  useEffect(() => {
    if (!isInitialized) return;

    if (!isOverlayMode) {
      // --- DASHBOARD MODE (WRITE) ---
      // Save to Storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      
      // Broadcast to other tabs/windows
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({
          type: 'UPDATE_CONFIG',
          payload: config
        });
      }
    } else {
      // --- OVERLAY MODE (READ AGGRESSIVELY) ---
      
      // CRITICAL FIX: If the URL contains a config (?cfg=...), 
      // we assume the URL is the Source of Truth and DISABLE polling.
      // This prevents stale LocalStorage (e.g., default Valorant theme) 
      // from overwriting the specific settings passed in the URL.
      if (getConfigFromUrl()) {
        return; 
      }

      // Polling fallback: Check localStorage every second
      // Only runs if NO config was found in the URL.
      const intervalId = setInterval(() => {
        const currentSaved = localStorage.getItem(STORAGE_KEY);
        if (currentSaved) {
          try {
            const parsed = JSON.parse(currentSaved);
            if (JSON.stringify(parsed) !== JSON.stringify(config)) {
              // Only update if the storage is drastically different and looks valid
              if (Object.keys(parsed).length > 0) {
                 setConfig(parsed);
              }
            }
          } catch (e) {
            // ignore
          }
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [config, isInitialized, isOverlayMode]);

  // Listen for storage events (Standard cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setConfig(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Sync error", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update helper
  const updateConfig = (key: keyof OverlayConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  if (!isInitialized) return null;

  return (
    <div className={isOverlayMode ? "bg-transparent h-screen w-screen overflow-hidden" : "bg-slate-900 min-h-screen overflow-y-auto"}>
      {isOverlayMode ? (
        <StreamOverlay config={config} />
      ) : (
        <Dashboard config={config} updateConfig={updateConfig} />
      )}
    </div>
  );
};

export default App;