import React, { useState, useEffect } from 'react';
import { OverlayConfig } from '../../types';
import { Youtube, Monitor, MessageSquare, Skull, Instagram } from 'lucide-react';

interface Props {
  config: OverlayConfig;
}

export const RdrTheme: React.FC<Props> = ({ config }) => {
  const [socialIndex, setSocialIndex] = useState(0);
  const [isSocialVisible, setIsSocialVisible] = useState(true);

  // Custom TikTok Icon
  const TikTokIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );

  const socials = [
    { type: 'Youtube', icon: Youtube, label: 'Follow The Trail', value: config.youtubeName },
    { type: 'Instagram', icon: Instagram, label: 'Wanted Dead/Alive', value: config.instagramName },
    { type: 'TikTok', icon: TikTokIcon, label: 'Camp Stories', value: config.tiktokName }
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
    <div className="w-full h-full relative font-rdr text-white overflow-hidden">
      
      {/* Cinematic Gradient Bottom - Membantu keterbacaan teks di bawah tapi tetap transparan */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
      
      {/* Ticker / Bounty Feed (Bottom Center - CS2 Style) */}
      {config.showTicker && (
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] z-20"
          style={{ transform: `translateX(-50%) scale(${config.elementsScale})`, transformOrigin: 'bottom center' }}
        >
          {/* Removed backdrop-blur-sm */}
          <div className="flex h-10 border-b-2 border-rdrRed bg-black/95 shadow-[0_0_15px_rgba(204,0,0,0.3)]">
            {/* Label Section */}
            <div className="bg-rdrRed text-white px-4 flex items-center justify-center font-bold tracking-widest skew-x-[-10deg] ml-[-10px] pl-6 border-r-2 border-black/30 shadow-lg">
              <span className="skew-x-[10deg] text-sm flex items-center gap-2">
                <Skull size={16} /> BOUNTY
              </span>
            </div>
            
            {/* Marquee Section */}
            <div className="flex-1 relative overflow-hidden flex items-center px-4">
              <div 
                className="whitespace-nowrap absolute"
                style={{ 
                  animation: `marquee ${35 - config.tickerSpeed}s linear infinite`,
                  fontFamily: 'Rye', 
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                  color: '#e3e3e3'
                }}
              >
               {config.tickerText}
              </div>
            </div>
            
            {/* Right Decorative End */}
            <div className="w-4 bg-rdrRed skew-x-[-10deg] mr-[-10px] opacity-90 border-l border-black/30"></div>
          </div>
        </div>
      )}

      {/* Webcam Frame - Outlaw HUD (CS2 Position) */}
      {config.showWebcam && (
        <div 
          className="absolute bottom-32 left-8"
          style={{ 
            transform: `scale(${config.webcamScale})`, 
            transformOrigin: 'bottom left' 
          }}
        >
          <div className="relative p-1">
             {/* Decorative Borders (Western Style Interpretation of Tech Lines) */}
             <div className="absolute top-0 left-0 w-full h-full border-t border-l border-rdrRed/50 opacity-80 rounded-tl-lg"></div>
             <div className="absolute bottom-0 right-0 w-full h-full border-b border-r border-rdrRed/50 opacity-80 rounded-br-lg"></div>

            <div className="relative border-l-4 border-rdrRed bg-[#1a1a1a] p-1 w-[320px] h-[180px] shadow-2xl">
                <div className="w-full h-full bg-black/40 flex items-center justify-center text-[#8a8a8a] border border-white/5 relative overflow-hidden">
                   {/* Grunge Overlay on Cam */}
                   <div className="absolute inset-0 opacity-10" 
                        style={{ backgroundImage: 'radial-gradient(#cc0000 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                   
                   <Monitor size={18} className="mr-2 text-rdrRed" />
                   <span className="text-sm tracking-widest font-rdr text-rdrPaper opacity-80">DEAD EYE CAM</span>
                </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute -bottom-5 left-0 flex items-center gap-2 bg-rdrRed px-3 py-0.5 skew-x-[-10deg]">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse skew-x-[10deg]"></div>
                <span className="text-xs text-white font-bold tracking-widest skew-x-[10deg] font-sans">LIVE FEED</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Box (Empty Container - Top Right CS2 Position) */}
      {config.showChat && (
        <div 
          className="absolute top-[20%] right-0 w-[300px]"
          style={{ transform: `scale(${config.chatScale})`, transformOrigin: 'top right' }}
        >
          {/* Solid Gradient, no blur */}
          <div className="bg-gradient-to-l from-black via-black/80 to-transparent p-4 h-[300px] flex flex-col items-end">
             <div className="flex items-center gap-2 text-rdrRed mb-2 border-b-2 border-rdrRed/50 pb-1 w-full justify-end">
                <span className="font-rdr text-sm tracking-widest text-rdrPaper">SALOON GOSSIP</span>
                <MessageSquare size={14} />
             </div>
             {/* Empty Container */}
             <div className="w-full h-full border-r border-white/10 bg-gradient-to-b from-rdrRed/5 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Rotating Social Pill (Top Right CS2 Position) */}
      <div 
        className="absolute top-8 right-8 flex items-center"
        style={{ transform: `scale(${config.elementsScale})`, transformOrigin: 'top right' }}
      >
        <div className={`flex items-center bg-black/95 border border-rdrRed/30 rounded-sm shadow-xl overflow-hidden group transition-all duration-500 ${isSocialVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <div className="bg-gradient-to-b from-[#cc0000] to-[#800000] p-3 w-12 flex justify-center border-r border-white/10">
             <SocialIcon size={24} className="text-white drop-shadow-md" />
          </div>
          <div className="px-5 py-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">{currentSocial.label}</p>
            <p className="text-xl font-rdr leading-none text-rdrPaper tracking-wide mt-0.5">{currentSocial.value}</p>
          </div>
          {/* Decorative Right Edge */}
          <div className="h-full w-1.5 bg-rdrRed"></div>
        </div>
      </div>
    </div>
  );
};