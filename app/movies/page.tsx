"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Write() {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Journal");
  const [content, setContent] = useState(""); // <--- NEW: The Story
  const [image, setImage] = useState<string | null>(null);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Publish
  const handlePublish = () => {
    if (!title || !image || !content) return alert("Please fill in all fields.");

    const newBlog = {
      id: Date.now().toString(), // Unique ID based on time
      title: title,
      date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
      category: category,
      image: image,
      content: content, // Saving the story
    };

    // Save to Local Storage
    const existingBlogs = JSON.parse(localStorage.getItem("myBlogs") || "[]");
    localStorage.setItem("myBlogs", JSON.stringify([newBlog, ...existingBlogs]));

    // Go Home
    router.push("/");
  };

  return (
    <main className="min-h-screen w-full bg-[#050505] text-[#F0F0F0] font-serif p-6 md:p-12 flex flex-col items-center">
      
      <div className="w-full max-w-3xl animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
            <h1 className="italic text-2xl opacity-50">New Entry</h1>
            <Link href="/" className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100">Cancel</Link>
        </div>

        <div className="flex flex-col gap-8">
            
            {/* 1. Title */}
            <input 
                type="text" 
                placeholder="TITLE OF ENTRY..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-4xl md:text-5xl uppercase font-serif placeholder:opacity-20 outline-none border-none"
            />

            {/* 2. Category */}
            <div className="flex gap-4 items-center">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Category:</span>
                <input 
                    type="text" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-transparent text-[10px] uppercase tracking-widest border-b border-white/20 pb-1 outline-none w-32 focus:border-white"
                />
            </div>

            {/* 3. Image Upload */}
            <div className="w-full relative group cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
                <div className={`w-full aspect-[2/1] border border-dashed border-white/20 rounded-sm flex items-center justify-center transition-all ${image ? 'border-solid border-white/0' : 'hover:border-white/50'}`}>
                    {image ? (
                        <img src={image} alt="Preview" className="w-full h-full object-cover opacity-80" />
                    ) : (
                        <div className="text-center opacity-40 group-hover:opacity-80 transition-opacity">
                            <span className="block text-2xl mb-2">+</span>
                            <span className="text-[9px] uppercase tracking-widest">Upload Cover Image</span>
                        </div>
                    )}
                </div>
            </div>

            {/* 4. The Content (Story) - NEW */}
            <textarea 
                placeholder="Start writing your story here..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 bg-transparent text-lg font-serif placeholder:opacity-20 outline-none border border-white/10 p-4 resize-none focus:border-white/40"
            />

            {/* 5. Publish Button */}
            <button 
                onClick={handlePublish}
                className="mt-4 w-full py-4 bg-white text-black font-sans text-[10px] uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
                Publish to Archive
            </button>

        </div>
      </div>
    </main>
  );
}