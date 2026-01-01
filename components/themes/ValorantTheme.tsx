import React, { useState, useEffect } from 'react';
import { OverlayConfig } from '../../types';
import { Youtube, Monitor, MessageSquare, Instagram } from 'lucide-react';

interface Props {
  config: OverlayConfig;
}

export const ValorantTheme: React.FC<Props> = ({ config }) => {
  const [socialIndex, setSocialIndex] = useState(0);
  const [isSocialVisible, setIsSocialVisible] = useState(true);

  // TikTok Icon Component (since Lucide might use Music2, we use a custom SVG for accuracy)
  const TikTokIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );

  const socials = [
    { type: 'Youtube', icon: Youtube, label: 'SUBSCRIBE', value: config.youtubeName, color: 'text-white' },
    { type: 'Instagram', icon: Instagram, label: 'FOLLOW', value: config.instagramName, color: 'text-pink-400' },
    { type: 'TikTok', icon: TikTokIcon, label: 'FOLLOW', value: config.tiktokName, color: 'text-cyan-400' }
  ].filter(s => s.value && s.value.length > 0);

  useEffect(() => {
    if (socials.length <= 1) return;

    const interval = setInterval(() => {
      setIsSocialVisible(false);
      setTimeout(() => {
        setSocialIndex((prev) => (prev + 1) % socials.length);
        setIsSocialVisible(true);
      }, 500); // Wait for exit animation
    }, 5000); // Show for 5 seconds

    return () => clearInterval(interval);
  }, [socials.length]);

  const currentSocial = socials[socialIndex] || socials[0];
  const SocialIcon = currentSocial.icon;

  return (
    <div className="w-full h-full relative font-valorant text-white uppercase tracking-wider overflow-hidden">
      
      {/* Background/Border Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-valRed opacity-80" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-valRed opacity-50" />

      {/* Ticker / Running Text */}
      {config.showTicker && (
        <div 
          className="absolute top-8 left-0 w-full bg-valDark/90 border-b border-valRed/30 h-10 flex items-center overflow-hidden backdrop-blur-sm"
          style={{ transform: `scale(${config.elementsScale})`, transformOrigin: 'top left' }}
        >
          <div className="bg-valRed px-4 h-full flex items-center justify-center font-bold z-10 shrink-0">
            <span className="animate-pulse">LIVE</span>
          </div>
          <div className="overflow-hidden w-full relative h-full flex items-center">
            <div 
              className="whitespace-nowrap absolute will-change-transform"
              style={{ 
                animation: `marquee ${30 - config.tickerSpeed}s linear infinite` 
              }}
            >
             {config.tickerText}
            </div>
          </div>
        </div>
      )}

      {/* Webcam Frame */}
      {config.showWebcam && (
        <div 
          className="absolute bottom-10 left-10 p-1"
          style={{ 
            transform: `scale(${config.webcamScale})`, 
            transformOrigin: 'bottom left' 
          }}
        >
          <div className="relative border-2 border-valRed/50 bg-valDark/80 p-1 w-[320px] h-[180px]">
             {/* Decorative Corners */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-valRed bg-transparent"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-valRed bg-transparent"></div>
            
            <div className="w-full h-full bg-black/50 flex items-center justify-center text-gray-500 text-xs tracking-widest border border-white/10">
              <Monitor size={16} className="mr-2" />
              CAMERA SOURCE
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-valRed text-black text-xs font-bold px-2 py-0.5 text-center">
              AGENT DETECTED
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Box (Empty Container) */}
      {config.showChat && (
        <div 
          className="absolute top-[25%] right-0 w-[300px]"
          style={{ transform: `scale(${config.chatScale})`, transformOrigin: 'top right' }}
        >
          <div className="bg-valDark/80 backdrop-blur-sm border-l-2 border-valRed p-3 relative h-[250px]">
            <div className="absolute -left-[2px] top-0 h-4 w-4 bg-valRed/50"></div>
            
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10 text-xs text-gray-400">
               <MessageSquare size={12} />
               <span>COMMS LINK</span>
            </div>

            {/* Empty area for chat overlay */}
            <div className="w-full h-full"></div>
          </div>
        </div>
      )}

      {/* Rotating Social Pill */}
      <div 
        className="absolute bottom-10 right-10 flex items-center"
        style={{ transform: `scale(${config.elementsScale})`, transformOrigin: 'bottom right' }}
      >
        <div 
          className={`relative group transition-all duration-500 ${isSocialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="absolute inset-0 bg-valRed blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative flex items-center bg-valDark border border-valRed/30 px-6 py-2 shadow-xl"
               style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}>
            <div className="mr-3 bg-red-600 p-1 rounded-sm">
               <SocialIcon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 leading-none mb-0.5">{currentSocial.label}</p>
              <p className="text-xl font-bold leading-none">{currentSocial.value}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};