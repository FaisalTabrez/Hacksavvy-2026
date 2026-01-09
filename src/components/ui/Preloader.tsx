'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for the Preloader
interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [phase, setPhase] = useState<'charging' | 'awake' | 'dash'>('charging');

  // Charging Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setBatteryLevel((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase('awake');
          return 100;
        }
        return prev + 2; // Reaches 100 in roughly 2-3 seconds depending on interval
      });
    }, 40); // 50 steps * 40ms = 2000ms (2s)

    return () => clearInterval(timer);
  }, []);

  // Sequence Logic
  useEffect(() => {
    if (phase === 'awake') {
      // Hold awake state briefly then dash
      const timeout = setTimeout(() => {
        setPhase('dash');
      }, 500); // 0.5s awake time
      return () => clearTimeout(timeout);
    }

    if (phase === 'dash') {
      // Wait for dash anim to finish before unmounting/callback
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 600); 
      return () => clearTimeout(timeout);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'dash' || (phase === 'dash' && batteryLevel >= 100) ? (
        <motion.div
           key="preloader-overlay"
           className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
           initial={{ opacity: 1 }}
           animate={
             phase === 'dash' 
               ? { opacity: 0, transition: { delay: 0.4, duration: 0.2 } } 
               : { opacity: 1 }
           }
           exit={{ opacity: 0 }}
        >
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,rgba(5,5,5,1)_60%)] pointer-events-none" />

            {/* --- Battery Indicator --- */}
            <motion.div 
               className="relative w-32 h-12 mb-8 border-2 border-white/20 rounded-lg p-1"
               animate={phase === 'dash' ? { y: -50, opacity: 0 } : {}}
            >
                {/* Battery Nub */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-6 bg-white/20 rounded-r-md" />
                
                {/* Liquid Fill */}
                <motion.div 
                   className="h-full rounded bg-gradient-to-r from-red-500 via-purple-500 to-[#00f0ff]"
                   style={{ width: `${batteryLevel}%` }}
                   animate={{
                     filter: batteryLevel > 80 ? "drop-shadow(0 0 10px #00f0ff)" : "none"
                   }}
                />
                
                {/* Text Percentage */}
                <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-white z-10 mix-blend-difference">
                    {batteryLevel}%
                </div>
            </motion.div>

            {/* --- The Rabbit Robot --- */}
            <motion.div
               className="relative w-64 h-64 md:w-80 md:h-80"
               animate={
                 phase === 'dash' 
                   ? { x: '120vw', skewX: -20, transition: { duration: 0.5, ease: "backIn" } } 
                   : { x: 0, transition: { type: 'spring', stiffness: 100 } }
               }
            >
                {/* Rabbit Body Image Placeholder */}
                {/* To use your asset, replace the src below. Using a CSS placeholder for now. */}
                <div className="w-full h-full relative">
                    <img 
                        src="/assets/rabbit-body.png" 
                        alt="Rabbit Robot" 
                        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                        onError={(e) => {
                            // Fallback if image missing: A white silhouette shape
                            e.currentTarget.style.display = 'none';
                            const fallback = document.getElementById('rabbit-fallback');
                            if(fallback) fallback.style.display = 'flex';
                        }}
                    />
                    
                    {/* Fallback Shape (White Body) */}
                    <div id="rabbit-fallback" className="hidden absolute inset-0 bg-white items-center justify-center rounded-[3rem] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                       <span className="text-black font-mono text-xs opacity-50">NO IMAGE</span>
                    </div>

                    {/* --- Digital Face (The Eyes) --- */}
                    <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-24 h-12 flex items-center justify-between px-2 bg-black/80 rounded-lg backdrop-blur-sm border border-white/10 shadow-[0_0_10px_rgba(0,0,0,1)_inset]">
                        
                        {/* Eye Left */}
                        <motion.div 
                           className="w-8 h-8 flex items-center justify-center"
                        >
                           {phase === 'charging' ? (
                               <motion.div 
                                 className="w-6 h-1 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"
                                 animate={{ opacity: [0.5, 1, 0.5] }}
                                 transition={{ repeat: Infinity, duration: 1.5 }}
                               />
                           ) : (
                               <motion.div 
                                 className="w-6 h-6 border-4 border-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]"
                                 initial={{ scale: 0 }}
                                 animate={{ scale: 1 }}
                               />
                           )}
                        </motion.div>

                         {/* Eye Right */}
                        <motion.div 
                           className="w-8 h-8 flex items-center justify-center"
                        >
                           {phase === 'charging' ? (
                               <motion.div 
                                 className="w-6 h-1 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"
                                 animate={{ opacity: [0.5, 1, 0.5] }}
                                 transition={{ repeat: Infinity, duration: 1.5 }}
                               />
                           ) : (
                               <motion.div 
                                 className="w-6 h-6 border-4 border-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]"
                                 initial={{ scale: 0 }}
                                 animate={{ scale: 1 }}
                               />
                           )}
                        </motion.div>
                    </div>
                </div>

                {/* --- Shockwave Effect (Phase 2) --- */}
                {phase === 'awake' && (
                    <motion.div
                       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-[#00f0ff]"
                       initial={{ scale: 0.5, opacity: 1 }}
                       animate={{ scale: 2, opacity: 0 }}
                       transition={{ duration: 0.5 }}
                    />
                )}
            </motion.div>
            
            {/* Loading Text */}
            <motion.p
              className="mt-8 font-mono text-[#00f0ff]/50 text-sm tracking-[0.2em] animate-pulse"
              animate={phase === 'dash' ? { opacity: 0 } : {}}
            >
                SYSTEM_BOOT_SEQUENCE<span className="text-white">_INIT</span>
            </motion.p>

        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
