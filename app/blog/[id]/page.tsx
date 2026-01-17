"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import Image from "next/image"; // IMPORTED IMAGE COMPONENT
import { createClient } from '@supabase/supabase-js';

// --- CONFIG ---
const supabaseUrl = 'https://zoayaxippcxlutgldhsv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvYXlheGlwcGN4bHV0Z2xkaHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTA2MjMsImV4cCI6MjA4NDEyNjYyM30.DGdWT6nyME76JlBtsbZhCChDs7ALGx4lKL-YbeaADGI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // DEFAULT TO LIGHT MODE (TRUE)
  const [isLightMode, setIsLightMode] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Sync with LocalStorage preference
    const savedTheme = localStorage.getItem("site-theme");
    if (savedTheme === 'onyx') {
        setIsLightMode(false);
    } else {
        setIsLightMode(true);
    }

    if (!id) return;
    async function loadData() {
      const { data } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();
      if (data) setPost(data);
      setIsLoading(false);
    }
    loadData();
  }, [id]);

  const toggleTheme = () => {
      const newMode = !isLightMode;
      setIsLightMode(newMode);
      localStorage.setItem("site-theme", newMode ? 'light' : 'onyx');
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleShare = () => {
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " - " + url)}`, '_blank');
  };

  if (isLoading) return (
    <div className={`min-h-screen flex items-center justify-center font-mono-tech text-[10px] uppercase tracking-widest ${isLightMode ? 'bg-[#FCFCFA] text-black/30' : 'bg-[#050505] text-white/30'}`}>
      Loading...
    </div>
  );

  if (!post) return null;

  return (
    <main className={`min-h-screen transition-colors duration-700 ease-in-out relative selection:bg-[#D4AF37] selection:text-black
      ${isLightMode 
        ? 'bg-[#FCFCFA] text-[#1A1A1A]'  // Light Mode (Default)
        : 'bg-[#050505] text-[#E0E0E0]'  // Dark Mode
      }`}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Crimson+Pro:wght@300;400;500&family=Geist+Mono:wght@100..900&display=swap');
        
        .font-title { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Crimson Pro', serif; }
        .font-mono-tech { font-family: 'Geist Mono', monospace; }

        @keyframes fadeInSlow { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeInSlow 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        
        @keyframes equalizer { 0%, 100% { height: 3px; } 50% { height: 10px; } }
        .eq-bar { animation: equalizer 0.8s ease-in-out infinite; }
        .paused .eq-bar { animation-play-state: paused; height: 2px; }
      `}</style>

      {/* --- FLOATING CONTROL DECK --- */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-1000 w-auto">
        <div className={`
            flex items-center gap-1.5 p-1.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-500
            ${isLightMode 
               ? 'bg-white/80 border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-black/5' 
               : 'bg-[#111]/80 border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)]'
            }
        `}>
            
            <Link href="/" prefetch={true} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors group ${isLightMode ? 'hover:bg-black/5' : 'hover:bg-white/5'}`}>
                 <span className="font-mono-tech text-[10px] group-hover:-translate-x-0.5 transition-transform">←</span>
            </Link>

            <div className={`w-[1px] h-4 ${isLightMode ? 'bg-black/10' : 'bg-white/10'}`}></div>

            <button 
                onClick={toggleAudio}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative overflow-hidden
                  ${isPlaying ? 'bg-[#D4AF37] text-black' : isLightMode ? 'text-black hover:bg-black/5' : 'text-white hover:bg-white/5'}`}
            >
                <div className={`flex items-end gap-[2px] h-3 ${isPlaying ? '' : 'paused'}`}>
                    <div className="w-[1.5px] bg-current eq-bar" style={{ animationDelay: '0s' }}></div>
                    <div className="w-[1.5px] bg-current eq-bar" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-[1.5px] bg-current eq-bar" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </button>
            <audio ref={audioRef} src="/audio/finally home.mp3" loop />

            <button 
                onClick={toggleTheme}
                className={`h-10 px-4 rounded-full flex flex-col justify-center items-start gap-0.5 transition-colors ${isLightMode ? 'hover:bg-black/5' : 'hover:bg-white/5'}`}
            >
                <span className="font-mono-tech text-[7px] uppercase tracking-wider opacity-40">Style</span>
                <span className="font-mono-tech text-[9px] font-medium tracking-widest uppercase">
                    {isLightMode ? 'Editorial' : 'Midnight'}
                </span>
            </button>

            <button 
                onClick={handleShare}
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${isLightMode ? 'hover:bg-black/5' : 'hover:bg-white/5'}`}
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-2xl mx-auto pt-48 px-6 pb-40 animate-fade-in">
        
        <header className="flex flex-col items-center gap-6 mb-16 text-center">
            <span className="font-mono-tech text-[9px] uppercase tracking-[0.4em] opacity-40">
              Entry No. {post.id} — {new Date(post.created_at).toLocaleDateString()}
            </span>
            
            <h1 className={`font-title text-4xl md:text-5xl leading-[1.05] tracking-tight font-semibold transition-all duration-700
                ${isLightMode ? 'text-[#111]' : 'text-white'}`}
            >
              {post.title}
            </h1>

            <div className={`w-8 h-[1px] mt-4 ${isLightMode ? 'bg-black/20' : 'bg-white/20'}`}></div>
        </header>

        {post.image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden mb-16 shadow-lg rounded-sm group">
             <div className={`absolute inset-0 z-10 border pointer-events-none ${isLightMode ? 'border-black/5' : 'border-white/5'}`}></div>
             {/* OPTIMIZED MAIN IMAGE WITH PRIORITY */}
             <Image 
               src={post.image} 
               alt="Visual"
               fill
               priority
               sizes="(max-width: 768px) 100vw, 800px"
               className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-105 opacity-100" 
             />
          </div>
        )}

        <article className="prose prose-lg max-w-none">
           <div className={`font-body text-[17px] md:text-[20px] leading-[1.75] md:leading-[1.85] tracking-wide whitespace-pre-line transition-all duration-700
             ${isLightMode ? 'text-[#2A2A2A]' : 'text-[#CFCFCF]'}`}
           >
              <span className={`float-left mr-2.5 mt-[-4px] text-5xl font-title font-bold
                  ${isLightMode ? 'text-[#111]' : 'text-[#D4AF37]'}`}
              >
                {post.content.charAt(0)}
              </span>
              {post.content.slice(1)}
           </div>
        </article>

        <div className="mt-32 border-t border-dashed border-current opacity-20 pt-8 flex justify-between font-mono-tech text-[9px] uppercase tracking-widest">
            <span>Abdirahman's Diary</span>
            <span>End of File</span>
        </div>
      </div>
    </main>
  );
}