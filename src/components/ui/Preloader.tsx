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

            {/* --- The Generic Robot --- */}
            <motion.div
               className="relative flex flex-col items-center justify-center transform scale-75 md:scale-100"
               animate={
                 phase === 'dash' 
                   ? { x: '120vw', skewX: -20, transition: { duration: 0.5, ease: "backIn" } } 
                   : { x: 0, transition: { type: 'spring', stiffness: 100 } }
               }
            >
                {/* Antenna */}
                <div className="w-2 h-10 bg-gray-600 mb-[-5px] relative z-0 flex justify-center">
                    <motion.div 
                        className={`absolute -top-3 w-6 h-6 rounded-full shadow-[0_0_15px] ${
                            phase === 'charging' 
                                ? 'bg-red-500 shadow-red-500' 
                                : 'bg-[#00f0ff] shadow-[#00f0ff]'
                        }`}
                        animate={phase === 'charging' ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    />
                </div>

                {/* Head */}
                <div className="w-56 h-44 bg-[#0a0a0a] border-2 border-[#00f0ff] rounded-3xl relative z-20 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.15)] overflow-hidden">
                    {/* Screen Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50" />
                    
                    {/* Face Container */}
                    <div className="w-40 h-20 flex items-center justify-between px-4 bg-transparent z-20">
                        {/* Eye Left */}
                        <motion.div className="w-10 h-10 flex items-center justify-center">
                           {phase === 'charging' ? (
                               <motion.div 
                                 className="w-8 h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"
                                 animate={{ opacity: [0.5, 1, 0.5] }}
                                 transition={{ repeat: Infinity, duration: 1.5 }}
                               />
                           ) : (
                               <motion.div 
                                 className="w-8 h-8 border-4 border-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]"
                                 initial={{ scale: 0 }}
                                 animate={{ scale: 1 }}
                               />
                           )}
                        </motion.div>

                         {/* Eye Right */}
                        <motion.div className="w-10 h-10 flex items-center justify-center">
                           {phase === 'charging' ? (
                               <motion.div 
                                 className="w-8 h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"
                                 animate={{ opacity: [0.5, 1, 0.5] }}
                                 transition={{ repeat: Infinity, duration: 1.5 }}
                               />
                           ) : (
                               <motion.div 
                                 className="w-8 h-8 border-4 border-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]"
                                 initial={{ scale: 0 }}
                                 animate={{ scale: 1 }}
                               />
                           )}
                        </motion.div>
                    </div>

                    {/* Mouth Line (Optional visual detail) */}
                    <div className="absolute bottom-8 w-16 h-1 bg-[#00f0ff]/20 rounded-full" />
                </div>

                {/* Neck */}
                <div className="w-32 h-6 bg-gray-800 z-10 mt-[-2px] border-x border-gray-700" />

                {/* Body */}
                <div className="w-48 h-32 bg-gray-900 rounded-b-[3rem] rounded-t-xl z-10 border border-white/5 relative flex justify-center pt-6 shadow-lg">
                     {/* Chest Piece */}
                     <div className="w-24 h-16 border border-[#00f0ff]/30 rounded-lg bg-black/50 flex flex-col items-center justify-center gap-1">
                        <div className="w-16 h-1 bg-[#00f0ff]/20 rounded-full" />
                        <div className="w-16 h-1 bg-[#00f0ff]/20 rounded-full" />
                        <div className="w-16 h-1 bg-[#00f0ff]/20 rounded-full" />
                     </div>
                </div>

                {/* --- Shockwave Effect (Phase 2) --- */}
                {phase === 'awake' && (
                    <motion.div
                       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-2 border-[#00f0ff]"
                       initial={{ scale: 0.5, opacity: 1 }}
                       animate={{ scale: 2.5, opacity: 0 }}
                       transition={{ duration: 0.6, ease: "easeOut" }}
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
