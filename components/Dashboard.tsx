import React, { useRef, useEffect, useState } from 'react';
import { OverlayConfig, GameTheme } from '../types';
import { StreamOverlay } from './StreamOverlay';
import { 
  Gamepad2, 
  Youtube, 
  Camera, 
  Type, 
  Maximize, 
  Monitor, 
  Copy,
  CheckCircle2,
  Eye,
  Settings2,
  MessageSquare,
  Crosshair,
  Blocks,
  Coffee,
  Instagram,
  Music2,
  AlertCircle
} from 'lucide-react';

interface Props {
  config: OverlayConfig;
  updateConfig: (key: keyof OverlayConfig, value: any) => void;
}

export const Dashboard: React.FC<Props> = ({ config, updateConfig }) => {
  const [copied, setCopied] = React.useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.4);

  const copyUrl = () => {
    // Create a base64 string of the config to ensure OBS loads the exact state
    const configString = btoa(JSON.stringify(config));
    const url = `${window.location.origin}${window.location.pathname}#/overlay?cfg=${configString}`;
    
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate the scale for the preview to fit the container width
  useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        // Target width is 1920px (standard stream 1080p)
        setPreviewScale(containerWidth / 1920);
      }
    };

    window.addEventListener('resize', handleResize);
    // Add a small delay to ensure layout is settled
    setTimeout(handleResize, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ThemeButton = ({ id, label, icon: Icon, colorClass, activeClass }: any) => (
    <button 
      onClick={() => updateConfig('game', id)}
      className={`relative overflow-hidden p-4 rounded-lg border-2 transition-all group text-left ${config.game === id ? activeClass : 'border-slate-600 hover:border-slate-500 bg-slate-800'}`}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Icon size={18} className={config.game === id ? 'text-white' : colorClass} />
          <span className={`font-bold uppercase tracking-wider block ${id === 'roblox' ? 'font-roblox' : id === 'cs2' ? 'font-cs' : id === 'rdr2' ? 'font-rdr' : id === 'valorant' ? 'font-valorant' : 'font-sans'}`}>
            {label}
          </span>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${config.game === id ? 'bg-white text-black font-bold' : 'bg-slate-600 text-slate-300'}`}>
          {config.game === id ? 'Active' : 'Select'}
        </span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-[1800px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              StreamPulse
            </h1>
            <p className="text-slate-400 text-sm mt-1">Overlay Control Center</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-end md:items-center gap-3 w-full md:w-auto">
            <div className="bg-blue-900/30 text-blue-200 text-xs px-3 py-2 rounded-lg border border-blue-500/30 flex items-center gap-2 max-w-md">
               <AlertCircle size={16} className="shrink-0" />
               <span>
                 <strong>Note:</strong> If changes don't appear in OBS, click the Copy button again and update the URL in OBS Browser Source.
               </span>
            </div>

            <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-lg border border-slate-700 w-full md:w-auto shadow-sm">
               <div className="bg-slate-700 p-2 rounded">
                 <Monitor size={20} className="text-blue-400" />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Overlay URL (OBS Source)</p>
                 <p className="text-xs text-slate-300 truncate max-w-[150px] md:max-w-[250px] opacity-70 font-mono">
                   .../overlay?cfg=...
                 </p>
               </div>
               <button 
                 onClick={copyUrl}
                 className={`p-2 rounded transition-all duration-200 ${copied ? 'bg-green-600 text-white shadow-[0_0_10px_rgba(22,163,74,0.5)]' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)]'}`}
                 title="Copy OBS URL with Settings"
               >
                 {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
               </button>
            </div>
          </div>
        </div>

        {/* Main Layout: Settings (Left) | Preview (Right) */}
        {/* Changed layout to ensure left panel scrolls while right panel stays sticky on large screens */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 items-start relative">
          
          {/* --- LEFT PANEL: SETTINGS --- */}
          <div className="w-full lg:w-[450px] xl:w-[500px] shrink-0 space-y-6 pb-20">
            
            <div className="flex items-center gap-2 text-slate-300 border-b border-slate-700 pb-2 mb-4">
              <Settings2 size={18} />
              <h2 className="font-bold text-sm uppercase tracking-wider">Configuration</h2>
            </div>

            {/* Game Selector */}
            <section className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Gamepad2 size={20} className="text-purple-400" />
                <h2 className="text-lg font-bold">Game Theme</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <ThemeButton 
                  id="valorant" 
                  label="Valorant" 
                  icon={Crosshair} 
                  colorClass="text-valRed"
                  activeClass="border-valRed bg-slate-700 shadow-[0_0_15px_rgba(255,70,85,0.2)]"
                />
                
                <ThemeButton 
                  id="rdr2" 
                  label="RDR 2 Roleplay" 
                  icon={Youtube} 
                  colorClass="text-red-600"
                  activeClass="border-red-800 bg-[#2c2420] shadow-[0_0_15px_rgba(153,27,27,0.3)]"
                />

                <ThemeButton 
                  id="cs2" 
                  label="Counter Strike 2" 
                  icon={Crosshair} 
                  colorClass="text-yellow-500"
                  activeClass="border-yellow-600 bg-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                />

                <ThemeButton 
                  id="roblox" 
                  label="Roblox" 
                  icon={Blocks} 
                  colorClass="text-blue-400"
                  activeClass="border-blue-500 bg-slate-700 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                />

                <ThemeButton 
                  id="chatting" 
                  label="Just Chatting" 
                  icon={Coffee} 
                  colorClass="text-pink-400"
                  activeClass="border-pink-500 bg-gradient-to-br from-slate-800 to-purple-900 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                />
              </div>
            </section>

            {/* Channel Info */}
            <section className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                  <Youtube size={20} className="text-red-500" />
                  <h2 className="text-lg font-bold">Channel Info</h2>
              </div>
              
              <div className="space-y-3">
                {/* YouTube */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1.5 block">YouTube Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={config.youtubeName}
                      onChange={(e) => updateConfig('youtubeName', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="e.g. ProGamer123"
                    />
                    <Youtube size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1.5 block">Instagram</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={config.instagramName}
                      onChange={(e) => updateConfig('instagramName', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="e.g. @my_insta"
                    />
                    <Instagram size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  </div>
                </div>

                {/* TikTok */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1.5 block">TikTok</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={config.tiktokName}
                      onChange={(e) => updateConfig('tiktokName', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="e.g. @my_tiktok"
                    />
                    <Music2 size={16} className="absolute left-3 top-3.5 text-slate-500" />
                  </div>
                </div>
              </div>
            </section>

            {/* Running Text */}
            <section className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Type size={20} className="text-green-400" />
                    <h2 className="text-lg font-bold">Running Text</h2>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={config.showTicker} onChange={(e) => updateConfig('showTicker', e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
              </div>
              
              <div className="space-y-4">
                <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase mb-1.5 block">Message Content</label>
                    <textarea 
                      value={config.tickerText}
                      onChange={(e) => updateConfig('tickerText', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all h-24 resize-none text-sm leading-relaxed"
                      placeholder="Enter your scrolling message here..."
                    />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Scroll Speed</span>
                      <span className="font-mono bg-slate-700 px-1.5 rounded">{config.tickerSpeed}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="25" 
                    value={config.tickerSpeed}
                    onChange={(e) => updateConfig('tickerSpeed', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Lower is slower, Higher is faster.</p>
                </div>
              </div>
            </section>

             {/* Visual Tweaks */}
            <section className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg">
              <div className="flex items-center gap-2 mb-5">
                  <Maximize size={20} className="text-yellow-400" />
                  <h2 className="text-lg font-bold">Layout & Scale</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                  {/* Webcam Controls */}
                  <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Camera size={16} className="text-slate-400" />
                        <span className="font-semibold text-sm">Webcam Frame</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={config.showWebcam} onChange={(e) => updateConfig('showWebcam', e.target.checked)} className="sr-only peer" />
                         <div className="w-9 h-5 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Size</span>
                          <span className="font-mono">{(config.webcamScale * 100).toFixed(0)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="1.5" 
                        step="0.05"
                        value={config.webcamScale}
                        onChange={(e) => updateConfig('webcamScale', parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                      />
                    </div>
                  </div>

                  {/* Chat Box Controls */}
                  <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-slate-400" />
                        <span className="font-semibold text-sm">Live Chat Box</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={config.showChat} onChange={(e) => updateConfig('showChat', e.target.checked)} className="sr-only peer" />
                         <div className="w-9 h-5 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Size</span>
                          <span className="font-mono">{(config.chatScale * 100).toFixed(0)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="1.5" 
                        step="0.05"
                        value={config.chatScale}
                        onChange={(e) => updateConfig('chatScale', parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>

                  {/* General Elements Controls */}
                  <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-2 mb-3">
                        <Maximize size={16} className="text-slate-400" />
                        <span className="font-semibold text-sm">Global UI Scale</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Size</span>
                          <span className="font-mono">{(config.elementsScale * 100).toFixed(0)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="1.5" 
                        step="0.05"
                        value={config.elementsScale}
                        onChange={(e) => updateConfig('elementsScale', parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>
                  </div>
              </div>
            </section>
          </div>

          {/* --- RIGHT PANEL: LIVE PREVIEW --- */}
          <div className="flex-1 w-full lg:sticky lg:top-6 min-w-0">
            <section className="bg-slate-800 rounded-xl p-1.5 border border-slate-700 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-white/10 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                LIVE PREVIEW
              </div>
              
              <div 
                ref={previewContainerRef}
                className="w-full aspect-video bg-gray-950 relative overflow-hidden rounded-lg border border-slate-900"
              >
                {/* Scaled Container for 1920x1080 Content */}
                <div 
                  style={{ 
                    width: '1920px', 
                    height: '1080px', 
                    transform: `scale(${previewScale})`, 
                    transformOrigin: 'top left',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                >
                  {/* Placeholder Background simulating game feed */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-20" 
                         style={{ backgroundImage: 'linear-gradient(#1e293b 2px, transparent 2px), linear-gradient(90deg, #1e293b 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
                    </div>
                    
                    <div className="text-center opacity-10">
                      <Gamepad2 size={300} className="mx-auto mb-4" />
                      <p className="text-8xl font-black tracking-tighter">GAME FEED</p>
                    </div>
                  </div>
                  
                  {/* The Actual Overlay Component */}
                  <StreamOverlay config={config} />
                </div>
              </div>
              
              <div className="p-3 bg-slate-800 text-center">
                 <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                   <Eye size={12} />
                   This preview simulates a 1080p stream resolution
                 </p>
              </div>
            </section>
          </div>
          
        </div>
      </div>
    </div>
  );
};