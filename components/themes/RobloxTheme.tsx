import React, { useState, useEffect } from 'react';
import { OverlayConfig } from '../../types';
import { Youtube, Monitor, MessageSquare, Blocks, Instagram } from 'lucide-react';

interface Props {
  config: OverlayConfig;
}

export const RobloxTheme: React.FC<Props> = ({ config }) => {
  const [socialIndex, setSocialIndex] = useState(0);
  const [isSocialVisible, setIsSocialVisible] = useState(true);

  // Custom TikTok Icon
  const TikTokIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );

  const socials = [
    { type: 'Youtube', icon: Youtube, label: 'SUB', value: config.youtubeName, bg: 'bg-red-600' },
    { type: 'Instagram', icon: Instagram, label: 'IG', value: config.instagramName, bg: 'bg-pink-600' },
    { type: 'TikTok', icon: TikTokIcon, label: 'TOK', value: config.tiktokName, bg: 'bg-black' }
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
    <div className="w-full h-full relative font-roblox text-white overflow-hidden">
      
      {/* Top Bar Background */}
      <div className="absolute top-0 left-0 w-full h-16 bg-slate-900/50 backdrop-blur-sm border-b-4 border-white/20 z-0"></div>

      {/* Ticker / Running Text */}
      {config.showTicker && (
        <div 
          className="absolute top-3 left-4 right-[250px] h-10 overflow-hidden rounded-lg border-2 border-white/30 bg-black/40"
          style={{ transform: `scale(${config.elementsScale})`, transformOrigin: 'top left' }}
        >
          <div className="flex h-full items-center">
             <div className="h-full bg-robloxBlue px-3 flex items-center border-r-2 border-white/30">
               <Blocks size={20} className="animate-spin-slow" />
             </div>
             <div className="relative overflow-hidden w-full h-full flex items-center px-4">
               <div 
                 className="whitespace-nowrap absolute"
                 style={{ 
                   animation: `marquee ${30 - config.tickerSpeed}s linear infinite`,
                   fontSize: '1.1rem',
                   fontWeight: 600
                 }}
               >
                {config.tickerText}
               </div>
             </div>
          </div>
        </div>
      )}

      {/* Webcam Frame - Blocky Style */}
      {config.showWebcam && (
        <div 
          className="absolute bottom-10 left-10"
          style={{ 
            transform: `scale(${config.webcamScale})`, 
            transformOrigin: 'bottom left' 
          }}
        >
          {/* Lego-like Studs decoration */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-4">
             <div className="w-6 h-3 bg-slate-700 rounded-t-md border-t border-l border-r border-white/20"></div>
             <div className="w-6 h-3 bg-slate-700 rounded-t-md border-t border-l border-r border-white/20"></div>
          </div>

          <div className="bg-slate-800 p-3 rounded-xl border-b-8 border-r-8 border-slate-900 shadow-xl w-[340px]">
            <div className="w-full h-[190px] bg-black/50 rounded-lg flex flex-col items-center justify-center text-gray-400 border-4 border-slate-700/50">
               <Monitor size={32} className="mb-2 text-robloxBlue" />
               <span className="font-bold">PLAYER CAM</span>
            </div>
            <div className="mt-2 text-center">
               <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm border-b-4 border-green-700">
                 ACTIVE
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Box (Empty Container) */}
      {config.showChat && (
        <div 
          className="absolute top-[25%] right-8 w-[300px]"
          style={{ transform: `scale(${config.chatScale})`, transformOrigin: 'top right' }}
        >
          <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border-2 border-white/10 h-[300px] flex flex-col shadow-2xl">
             <div className="flex items-center justify-between mb-2 border-b-2 border-white/10 pb-2">
                <span className="font-bold text-lg text-robloxBlue">Chat</span>
                <div className="bg-white/10 p-1 rounded-md">
                  <MessageSquare size={16} />
                </div>
             </div>
             {/* Empty Area */}
             <div className="flex-1 bg-black/20 rounded-lg inner-shadow"></div>
          </div>
        </div>
      )}

      {/* Rotating Social Pill */}
      <div 
        className="absolute top-3 right-4 flex items-center z-10"
        style={{ transform: `scale(${config.elementsScale})`, transformOrigin: 'top right' }}
      >
        <div className={`flex items-center bg-white text-slate-900 rounded-full pl-1 pr-6 py-1 shadow-[0_4px_0_rgb(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-none transition-all duration-500 ${isSocialVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className={`${currentSocial.bg} text-white p-2 rounded-full mr-3 shadow-inner`}>
             <SocialIcon size={20} />
          </div>
          <div>
            <p className="text-sm font-black uppercase">{currentSocial.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};