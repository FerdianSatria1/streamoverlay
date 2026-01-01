import React, { useState, useEffect } from 'react';
import { OverlayConfig } from '../../types';
import { Youtube, Monitor, MessageSquare, Shield, Instagram } from 'lucide-react';

interface Props {
  config: OverlayConfig;
}

export const Cs2Theme: React.FC<Props> = ({ config }) => {
  const [socialIndex, setSocialIndex] = useState(0);
  const [isSocialVisible, setIsSocialVisible] = useState(true);

  // Custom TikTok Icon
  const TikTokIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );

  const socials = [
    { type: 'Youtube', icon: Youtube, label: 'Subscribe', value: config.youtubeName },
    { type: 'Instagram', icon: Instagram, label: 'Follow', value: config.instagramName },
    { type: 'TikTok', icon: TikTokIcon, label: 'Follow', value: config.tiktokName }
  ].filter(s => s.value && s.value.length > 0);

  useEffect(() => {
    if (socials.length <= 1) return;
    const interval = setInterval(() => {
      setIsSocialVisible(false);
      setTimeout(() => {
        setSocialIndex((prev) => (prev + 1) % socials.length);
        setIsSocialVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [socials.length]);

  const currentSocial = socials[socialIndex] || socials[0];
  const SocialIcon = currentSocial.icon;

  return (
    <div className="w-full h-full relative font-cs text-white overflow-hidden">
      
      {/* Tactical Gradient Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Ticker / News Feed Style (Bottom Centered like Tournament HUD) */}
      {config.showTicker && (
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] z-20"
          style={{ transform: `translateX(-50%) scale(${config.elementsScale})`, transformOrigin: 'bottom center' }}
        >
          <div className="flex h-10 border-b-2 border-csYellow bg-csBlue/90 backdrop-blur-md">
            <div className="bg-csYellow text-black px-4 flex items-center justify-center font-bold tracking-tighter skew-x-[-10deg] ml-[-10px] pl-6 border-r-2 border-white/20">
              <span className="skew-x-[10deg] text-sm flex items-center gap-1">
                <Shield size={14} /> INTEL
              </span>
            </div>
            <div className="flex-1 relative overflow-hidden flex items-center px-4">
              <div 
                className="whitespace-nowrap absolute"
                style={{ 
                  animation: `marquee ${35 - config.tickerSpeed}s linear infinite`,
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
               {config.tickerText}
              </div>
            </div>
            <div className="w-4 bg-csYellow skew-x-[-10deg] mr-[-10px] opacity-80"></div>
          </div>
        </div>
      )}

      {/* Webcam Frame - Tactical HUD */}
      {config.showWebcam && (
        <div 
          className="absolute bottom-32 left-8"
          style={{ 
            transform: `scale(${config.webcamScale})`, 
            transformOrigin: 'bottom left' 
          }}
        >
          <div className="relative p-1">
             {/* Tech Borders */}
             <svg className="absolute top-0 left-0 w-full h-full text-csYellow opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0,0 L20,0 L25,5 L100,5" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
               <path d="M0,0 L0,50 L5,55" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
             </svg>

            <div className="relative border-l-4 border-csYellow bg-csBlue/80 p-0.5 w-[320px] h-[180px] shadow-lg">
                <div className="w-full h-full bg-black/40 flex items-center justify-center text-gray-400 border border-white/5 relative overflow-hidden">
                   {/* Grid Overlay */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                   
                   <Monitor size={16} className="mr-2" />
                   <span className="text-xs tracking-widest font-sans font-bold">OPERATOR CAM</span>
                </div>
            </div>

            <div className="absolute -bottom-6 left-0 flex items-center gap-2 bg-black/60 px-2 py-1 border-l-2 border-white/30 backdrop-blur">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-white/80 font-bold tracking-widest">LIVE SIGNAL</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Box (Empty Container) */}
      {config.showChat && (
        <div 
          className="absolute top-[20%] right-0 w-[300px]"
          style={{ transform: `scale(${config.chatScale})`, transformOrigin: 'top right' }}
        >
          <div className="bg-gradient-to-l from-csBlue/90 to-transparent p-4 h-[300px] flex flex-col items-end">
             <div className="flex items-center gap-2 text-csYellow mb-2 border-b border-csYellow/30 pb-1 w-full justify-end">
                <span className="font-bold text-sm tracking-widest">RADIO COMMS</span>
                <MessageSquare size={14} />
             </div>
             {/* Empty Container */}
             <div className="w-full h-full border-r border-white/10 bg-white/5"></div>
          </div>
        </div>
      )}

      {/* Rotating Social Pill - CS2 Style */}
      <div 
        className="absolute top-8 right-8 flex items-center"
        style={{ transform: `scale(${config.elementsScale})`, transformOrigin: 'top right' }}
      >
        <div className={`flex items-center bg-csBlue/90 border border-white/10 rounded-sm shadow-xl backdrop-blur-md overflow-hidden group transition-all duration-500 ${isSocialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="bg-gradient-to-b from-[#ff0000] to-[#990000] p-3 group-hover:w-14 transition-all w-12 flex justify-center">
             <SocialIcon size={24} className="text-white drop-shadow-md" />
          </div>
          <div className="px-5 py-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{currentSocial.label}</p>
            <p className="text-xl font-bold leading-none text-white tracking-tight">{currentSocial.value}</p>
          </div>
          <div className="h-full w-1 bg-csYellow"></div>
        </div>
      </div>
    </div>
  );
};