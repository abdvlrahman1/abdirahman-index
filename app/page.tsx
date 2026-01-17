"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createClient } from '@supabase/supabase-js';

// --- CONFIG ---
const supabaseUrl = 'https://zoayaxippcxlutgldhsv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvYXlheGlwcGN4bHV0Z2xkaHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTA2MjMsImV4cCI6MjA4NDEyNjYyM30.DGdWT6nyME76JlBtsbZhCChDs7ALGx4lKL-YbeaADGI';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- ISLAMIC HIKAM & WISDOM DATA ---
const INSIGHTS = [
    { text: "To get what you love, you must first be patient with what you hate.", author: "Imam Al-Ghazali" },
    { text: "Your desire for isolation, while God has put you in the world, is a hidden passion. Your desire for the world, while God has isolated you, is a downfall.", author: "Ibn Ata Allah Al-Iskandari" },
    { text: "A sin that produces humility is better than an act of worship that produces arrogance.", author: "Ibn Ata Allah Al-Iskandari" },
    { text: "The heart becomes restless, and nothing can bring it peace except the remembrance of Allah.", author: "Ibn Qayyim Al-Jawziyya" },
    { text: "Detachment is not that you should own nothing, but that nothing should own you.", author: "Ali ibn Abi Talib (RA)" },
    { text: "I saw the 70 veterans of Badr, and if you had seen them, you would have thought they were madmen. And if they had seen the best of you, they would have said: 'These people have no character.'", author: "Hasan Al-Basri" },
    { text: "He is with you wherever you are.", author: "Quran 57:4" },
    { text: "Sell this life for the next and you win both of them. Sell the next life for this and you lose both of them.", author: "Hasan Al-Basri" },
    { text: "Be in this world as if you were a stranger or a traveler along a path.", author: "Prophet Muhammad (ﷺ)" },
    { text: "Worrying about the world is darkness in the heart, while worrying about the Hereafter is light in the heart.", author: "Uthman ibn Affan (RA)" },
    { text: "He who knows himself knows his Lord.", author: "Islamic Saying" },
    { text: "Do not let your obedience make you self-righteous, for you do not know whose seal will be good.", author: "Ibn Qayyim Al-Jawziyya" },
    { text: "Indeed, good deeds do away with misdeeds.", author: "Quran 11:114" }
];

const movies = [
  { title: "Good Will Hunting", year: "1997", image: "/movies/good-will-hunting.jpg", audio: "/audio/good-will-hunting.mp3" },
  { title: "Beautiful Boy", year: "2018", image: "/movies/boy.jpg", audio: "/audio/beautiful-boy.mp3" },
  { title: "Dead Poets Society", year: "1989", image: "/movies/dead-poets-society.jpg", audio: "/audio/dead-poets-society.mp3" },
  { title: "Southpaw", year: "2015", image: "/movies/southpaw.jpg", audio: "/audio/southpaw.mp3" },
  { title: "The Pursuit of Happyness", year: "2006", image: "/movies/pursuit-of-happyness.jpg", audio: "/audio/pursuit-of-happyness.mp3" },
  { title: "Paid in Full", year: "2002", image: "/movies/paid-in-full.jpg", audio: "/audio/paid-in-full.mp3" },
  { title: "About Time", year: "2013", image: "/movies/about-time.jpg", audio: "/audio/about-time.mp3" },
];

export default function Home() {
  // CHANGED: Default is now 'light'
  const [theme, setTheme] = useState<'onyx' | 'light'>('light');
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  
  // --- INSIGHT DECK STATES ---
  const [insight, setInsight] = useState<{text: string, author: string} | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  
  // Audio States
  const [playingIndex, setPlayingIndex] = useState<number | null>(null); 
  const movieAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMovieAudio = (index: number, audioSrc: string) => {
    if (playingIndex === index) {
      movieAudioRef.current?.pause();
      setPlayingIndex(null);
      return;
    }
    if (movieAudioRef.current) movieAudioRef.current.pause();
    
    const newAudio = new Audio(audioSrc);
    newAudio.volume = 0.5;
    newAudio.onended = () => setPlayingIndex(null);
    newAudio.play().catch(e => console.log("Audio err:", e));
    
    movieAudioRef.current = newAudio;
    setPlayingIndex(index);
  };

  // --- INSIGHT LOGIC ---
  const dispenseInsight = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    
    let shuffles = 0;
    const interval = setInterval(() => {
        setInsight(INSIGHTS[Math.floor(Math.random() * INSIGHTS.length)]);
        shuffles++;
        if (shuffles > 6) {
            clearInterval(interval);
            setIsShuffling(false);
        }
    }, 80);
  };

  useEffect(() => {
    // CHANGED: Logic now prioritizes Light unless Onyx is saved
    const savedTheme = localStorage.getItem("site-theme");
    if (savedTheme === 'onyx') setTheme('onyx');
    else setTheme('light');

    const fetchBlogs = async () => {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (data) setAllBlogs(data);
    };
    fetchBlogs();
    
    // Set initial insight on load
    setInsight(INSIGHTS[0]);

    return () => { 
        if (movieAudioRef.current) movieAudioRef.current.pause(); 
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'onyx' ? 'light' : 'onyx';
    setTheme(newTheme);
    localStorage.setItem("site-theme", newTheme);
  };

  const themeClasses = theme === 'onyx' 
    ? 'bg-[#080808] text-[#E0E0E0] selection:bg-[#D4AF37] selection:text-black' 
    : 'bg-[#FCFCFA] text-[#1A1A1A] selection:bg-[#D4AF37] selection:text-black'; 
  
  const accentColor = theme === 'onyx' ? 'border-white/10' : 'border-black/10';

  return (
    <main className={`min-h-screen w-full relative transition-colors duration-1000 ${themeClasses}`}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Crimson+Pro:wght@300;400;500&family=Geist+Mono:wght@100..900&display=swap');
        
        .font-title { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Crimson Pro', serif; }
        .font-mono-tech { font-family: 'Geist Mono', monospace; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes music-bar { 0%, 100% { height: 3px; } 50% { height: 12px; } }
        .animate-music-bar-1 { animation: music-bar 0.8s infinite ease-in-out; }
        .animate-music-bar-2 { animation: music-bar 0.8s infinite ease-in-out 0.2s; }
        .animate-music-bar-3 { animation: music-bar 0.8s infinite ease-in-out 0.4s; }
      `}</style>

      {/* Noise Overlay - Works in Light & Dark */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-50 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* Grid Lines */}
      <div className="fixed inset-0 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 pointer-events-none z-0">
         <div className={`border-r ${accentColor} opacity-[0.05] col-span-3 h-full hidden md:block`}></div>
         <div className={`border-r ${accentColor} opacity-[0.05] col-span-9 h-full hidden md:block`}></div>
      </div>

      <div className="max-w-[1600px] mx-auto min-h-screen grid grid-cols-1 md:grid-cols-12 relative z-10">
        
        {/* SIDEBAR */}
        <aside className={`md:col-span-3 md:h-screen md:sticky md:top-0 px-6 py-10 md:px-8 md:py-12 flex flex-col justify-between border-b md:border-b-0 md:border-r ${accentColor} bg-[inherit] z-20`}>
            <div className="flex flex-col gap-6 md:gap-10">
                <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
                
                <h1 className="font-title text-5xl md:text-6xl leading-[0.9] tracking-tight font-medium">
                  The<br/>Abdirahman<br/><span className="italic font-normal text-[#D4AF37] opacity-90">Index.</span>
                </h1>

                <div className="flex justify-between md:block items-end">
                    <p className="font-mono-tech text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-50 leading-loose">
                      Vol. 1 — 2026<br/>Nairobi, KE
                    </p>
                    <button onClick={toggleTheme} className={`md:hidden font-mono-tech text-[9px] uppercase tracking-widest opacity-60 border ${accentColor} px-3 py-1 rounded-full`}>
                      {theme === 'onyx' ? 'Light' : 'Onyx'}
                    </button>
                </div>
            </div>
            
            <nav className="hidden md:flex flex-col gap-4 font-mono-tech text-[10px] uppercase tracking-[0.2em] mt-12 md:mt-0">
                <button onClick={toggleTheme} className="flex items-center gap-3 opacity-50 hover:opacity-100 hover:text-[#D4AF37] transition-all text-left group">
                    <span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>{theme === 'onyx' ? 'Switch to Light' : 'Switch to Onyx'}
                </button>
            </nav>

            <div className="hidden md:flex flex-col justify-end gap-10">
                <div className="flex flex-col gap-3 opacity-80">
                    <span className="font-mono-tech text-[9px] uppercase tracking-widest opacity-30 mb-2">Connect</span>
                    <a href="#" className="hover:text-[#D4AF37] transition-colors font-title italic text-xl hover:pl-2 duration-300">Substack</a>
                    <a href="#" className="hover:text-[#D4AF37] transition-colors font-title italic text-xl hover:pl-2 duration-300">Instagram</a>
                </div>
            </div>
        </aside>

        {/* CONTENT */}
        <div className="md:col-span-9 flex flex-col">
            <div className={`h-12 md:h-16 border-b ${accentColor} flex items-center px-6 md:px-12 font-mono-tech text-[9px] uppercase tracking-[0.2em] opacity-30 justify-between`}>
                <span>Reference_2026</span><span>Scroll ↓</span>
            </div>

            {/* CINEMA LOG */}
            <div className={`border-b ${accentColor} py-10 md:py-16 bg-current/5 overflow-hidden`}>
                <div className="px-6 md:px-12 mb-6 md:mb-10 flex items-center justify-between opacity-50">
                     <div className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                        <h3 className="font-mono-tech text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Cinema Log</h3>
                     </div>
                     <span className="font-mono-tech text-[8px] md:text-[9px] uppercase tracking-widest">Swipe →</span>
                </div>
                
                <div className="flex overflow-x-auto gap-4 md:gap-8 px-6 md:px-12 pb-4 scrollbar-hide snap-x">
                    {movies.map((movie, i) => (
                        <div key={i} className="group flex-shrink-0 w-[110px] md:w-[180px] snap-start flex flex-col relative cursor-pointer">
                             <div className="aspect-[2/3] overflow-hidden relative mb-4 bg-[#1a1a1a] rounded-[2px] shadow-2xl">
                                <Image 
                                  src={movie.image} 
                                  alt={movie.title} 
                                  fill
                                  sizes="(max-width: 768px) 110px, 180px"
                                  className={`object-cover transition-all duration-700 ${playingIndex === i ? 'grayscale-0 opacity-100 scale-105' : 'opacity-80 grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100'}`}
                                />
                                <button onClick={() => toggleMovieAudio(i, movie.audio)} className={`absolute bottom-2 right-2 md:bottom-3 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95 z-10 ${playingIndex === i ? 'bg-[#D4AF37]/90 text-black border border-[#D4AF37]' : 'bg-black/20 border border-white/20 text-white hover:bg-black/40'}`}>
                                    {playingIndex === i ? (<div className="flex gap-[2px] items-end h-3"><div className="w-[1.5px] bg-black animate-music-bar-1"></div><div className="w-[1.5px] bg-black animate-music-bar-2"></div><div className="w-[1.5px] bg-black animate-music-bar-3"></div></div>) : (<svg width="10" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z" /></svg>)}
                                </button>
                             </div>
                             
                             <span className="font-mono-tech font-medium text-[11px] md:text-[13px] uppercase tracking-wide leading-tight block opacity-90 pr-2 truncate group-hover:text-[#D4AF37] transition-colors duration-300">
                                {movie.title}
                             </span>
                             <span className="font-mono-tech text-[9px] opacity-40 md:hidden mt-1">{movie.year}</span>
                        </div>
                    ))}
                    <div className="w-6 flex-shrink-0"></div>
                </div>
            </div>

            {/* BLOG GRID */}
            <div className={`p-6 md:p-12 border-b ${accentColor}`}>
                <div className="mb-10 md:mb-16 flex items-center gap-4 opacity-40">
                    <span className="font-mono-tech text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Archive Entries</span>
                    <div className="h-[1px] flex-1 bg-current opacity-20"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {allBlogs.length > 0 ? allBlogs.map((blog: any, index: number) => (
                        <Link href={`/blog/${blog.id}`} key={index} className="group block cursor-pointer">
                            <article className="flex flex-col h-full">
                                <div className={`w-full aspect-[16/10] overflow-hidden relative mb-5 md:mb-6 bg-[#1a1a1a] border-t border-b ${accentColor}`}>
                                    <div className="absolute inset-0 bg-black/10 md:group-hover:bg-transparent transition-all duration-700 z-10"></div>
                                    <Image 
                                      src={blog.image} 
                                      alt={blog.title} 
                                      fill
                                      sizes="(max-width: 768px) 100vw, 50vw"
                                      className="object-cover opacity-90 transition-all duration-1000 transform group-hover:scale-105" 
                                    />
                                    <div className="absolute top-0 left-0 p-4 z-20"><span className="font-mono-tech text-[9px] text-white bg-black/60 backdrop-blur-md px-2.5 py-1 uppercase tracking-widest border border-white/10">No. 0{index + 1}</span></div>
                                </div>

                                <div className="flex flex-col gap-3 px-1">
                                    <div className="flex justify-between items-center font-mono-tech text-[9px] uppercase tracking-[0.2em] opacity-50">
                                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                        <span>{blog.category || 'Journal'}</span>
                                    </div>
                                    
                                    <h2 className="font-title font-medium text-2xl md:text-3xl leading-[1.1] tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                                        {blog.title}
                                    </h2>
                                    
                                    <p className="font-body text-[14px] md:text-[16px] opacity-60 line-clamp-2 leading-relaxed max-w-[95%]">
                                        {blog.content}
                                    </p>

                                    <div className="mt-2 pt-3 border-t border-current/10 flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <span className="font-mono-tech text-[9px] uppercase tracking-widest">Read Entry</span>
                                        <span className="text-[10px] group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    )) : (
                        <div className={`col-span-1 md:col-span-2 py-20 flex flex-col items-center justify-center opacity-20 border border-dashed ${accentColor}`}>
                            <span className="font-title text-3xl italic mb-2">Archive Empty</span>
                        </div>
                    )}
                </div>
            </div>

            {/* --- SIGNAL / DAILY WISDOM (POLISHED) --- */}
            <div className={`border-b ${accentColor} flex flex-col md:flex-row min-h-[300px]`}>
                {/* Left Side: Technical Controls */}
                <div className={`p-8 md:p-12 md:w-[35%] md:border-r ${accentColor} flex flex-col justify-between bg-current/5`}>
                     <div>
                        <span className="font-mono-tech text-[9px] uppercase tracking-[0.25em] opacity-40 block mb-3">Signal</span>
                        <h3 className="font-title text-3xl italic">Daily Wisdom.</h3>
                     </div>

                     <div className="mt-10 md:mt-0">
                         <button 
                             onClick={dispenseInsight}
                             disabled={isShuffling}
                             className={`px-5 py-3 border border-current/20 font-mono-tech text-[8px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed`}
                         >
                             {isShuffling ? "Receiving Signal..." : "Reflect Again"}
                         </button>
                     </div>
                </div>

                {/* Right Side: The Content (Editorial Style) */}
                <div className="p-8 md:p-16 md:w-[65%] flex flex-col justify-center relative">
                    <div className="absolute top-8 right-8 opacity-10 font-title text-8xl leading-none font-bold select-none">”</div>
                    
                    {insight ? (
                        <div className={`max-w-xl transition-all duration-700 ${isShuffling ? 'opacity-0 blur-sm translate-y-2' : 'opacity-100 blur-0 translate-y-0'}`}>
                            <p className="font-title text-lg md:text-2xl leading-[1.6] tracking-wide mb-8">
                                {insight.text}
                            </p>
                            
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-[1px] bg-[#D4AF37] opacity-60"></div>
                                <span className="font-mono-tech text-[8px] uppercase tracking-[0.2em] opacity-40">
                                    {insight.author}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="font-mono-tech text-[9px] uppercase tracking-widest opacity-30">Waiting for signal...</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className={`p-8 md:p-12 mt-auto bg-[#050505] text-[#E0E0E0]`}>
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="max-w-xs">
                        <span className="font-title italic text-2xl md:text-3xl mb-2 block text-[#D4AF37] opacity-80">The Index.</span>
                        <p className="opacity-40 font-mono-tech text-[9px] uppercase tracking-widest leading-relaxed">Visual diary updated weekly.<br/>Nairobi, Kenya.</p>
                    </div>
                </div>

                <div className={`mt-16 pt-6 border-t border-white/10 flex justify-between items-center opacity-30`}>
                    <div className="font-mono-tech text-[8px] uppercase tracking-[0.25em]">
                        <span>© 2026 Abdirahman Index</span>
                    </div>
                    <div className="font-mono-tech text-[8px] uppercase tracking-[0.25em]">
                        <span>System Stable</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}