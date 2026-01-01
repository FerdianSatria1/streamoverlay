import React, { useState, useEffect } from 'react';
import { OverlayConfig } from '../../types';
import { Youtube, Monitor, MessageSquare, Heart, Coffee, Instagram } from 'lucide-react';

interface Props {
  config: OverlayConfig;
}

export const ChattingTheme: React.FC<Props> = ({ config }) => {
  const [socialIndex, setSocialIndex] = useState(0);
  const [isSocialVisible, setIsSocialVisible] = useState(true);

  // Custom TikTok Icon
  const TikTokIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );

  const socials = [
    { type: 'Youtube', icon: Youtube, label: 'Follow Me', value: config.youtubeName, bg: 'bg-red-50', text: 'text-red-600' },
    { type: 'Instagram', icon: Instagram, label: 'Insta', value: config.instagramName, bg: 'bg-pink-50', text: 'text-pink-600' },
    { type: 'TikTok', icon: TikTokIcon, label: 'TikTok', value: config.tiktokName, bg: 'bg-slate-50', text: 'text-slate-800' }
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
    <div className="w-full h-full relative font-sans text-slate-800 overflow-hidden">
      
      {/* Aesthetic Blobs Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[100px] animate-float opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-pink-400/30 rounded-full blur-[100px] opacity-60"></div>

      {/* Ticker / Running Text (Floating Capsule) */}
      {config.showTicker && (
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[50%] max-w-2xl"
          style={{ transform: `translateX(-50%) scale(${config.elementsScale})`, transformOrigin: 'bottom center' }}
        >
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-full py-3 px-6 shadow-lg flex items-center gap-4">
             <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1.5 rounded-full shadow-md">
               <Heart size={16} fill="currentColor" />
             </div>
             <div className="overflow-hidden w-full relative h-6 flex items-center">
               <div 
                 className="whitespace-nowrap absolute text-slate-700 font-semibold"
                 style={{ 
                   animation: `marquee ${35 - config.tickerSpeed}s linear infinite`,
                 }}
               >
                {config.tickerText}
               </div>
             </div>
          </div>
        </div>
      )}

      {/* Webcam Frame - Glassmorphism */}
      {config.showWebcam && (
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            transform: `translate(-50%, -50%) scale(${config.webcamScale})`, 
            transformOrigin: 'center center' 
          }}
        >
          {/* For Just Chatting, usually the cam is big, but since it's an overlay, we provide a big nice frame */}
          <div className="p-4 bg-white/10 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl w-[600px] h-[340px] relative">
            <div className="w-full h-full bg-black/10 rounded-2xl flex items-center justify-center text-white/50 border border-white/10 overflow-hidden">
                <Monitor size={40} className="mb-2" />
                <span className="absolute bottom-4 font-light tracking-widest text-sm uppercase">Main Camera</span>
            </div>
            
            {/* Decoration Dots */}
            <div className="absolute top-6 right-6 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
          </div>
        </div>
      )}

      {/* Live Chat Box (Empty Container - Floating Side Panel) */}
      {config.showChat && (
        <div 
          className="absolute top-[15%] right-10 w-[350px]"
          style={{ transform: `scale(${config.chatScale})`, transformOrigin: 'top right' }}
        >
          <div className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-xl h-[500px] flex flex-col">
             <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/20">
                <div className="bg-white p-2 rounded-xl text-purple-500 shadow-sm">
                   <MessageSquare size={18} />
                </div>
                <span className="font-bold text-slate-800 text-lg">Stream Chat</span>
             </div>
             
             {/* Empty Container */}
             <div className="flex-1 rounded-xl bg-white/5 border border-white/10"></div>
          </div>
        </div>
      )}

      {/* Rotating Social Pill - Minimalist */}
      <div 
        className="absolute bottom-10 right-10 flex items-center"
        style={{ transform: `scale(${config.elementsScale})`, transformOrigin: 'bottom right' }}
      >
         <div className={`flex items-center gap-3 bg-white rounded-2xl p-2 pr-6 shadow-xl border border-gray-100 transition-all duration-500 ${isSocialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`${currentSocial.bg} p-3 rounded-xl ${currentSocial.text}`}>
               <SocialIcon size={24} />
            </div>
            <div className="flex flex-col">
               <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{currentSocial.label}</span>
               <span className="text-lg font-bold text-gray-800 leading-none">{currentSocial.value}</span>
            </div>
         </div>
      </div>
      
      {/* Decorative Coffee Icon Top Left */}
      <div className="absolute top-10 left-10 opacity-80 bg-white/30 p-3 rounded-full backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}>
         <Coffee size={24} className="text-slate-700" />
      </div>

    </div>
  );
};