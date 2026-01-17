"use client";

import Link from "next/link";

// Placeholder Books - High End Classics
const BOOKS = [
  { title: "The Stranger", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400" },
  { title: "Nausea", author: "Jean-Paul Sartre", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400" },
  { title: "Metamorphosis", author: "Franz Kafka", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400" },
  { title: "Notes Underground", author: "Dostoevsky", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400" },
  { title: "1984", author: "George Orwell", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" },
  { title: "Steppenwolf", author: "Hermann Hesse", cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400" },
  { title: "The Trial", author: "Franz Kafka", cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400" },
  { title: "Siddhartha", author: "Hermann Hesse", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400" },
  { title: "Dune", author: "Frank Herbert", cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400" },
];

export default function Library() {
  return (
    <main className="min-h-screen w-full relative z-10 pb-32">
      <div className="bg-noise"></div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-12 mb-20">
        <Link href="/" className="inline-block mb-12 opacity-50 hover:opacity-100 transition-opacity">
            <span className="font-sans text-[9px] uppercase tracking-widest border-b border-white/20 pb-1">← Return</span>
        </Link>
        <h1 className="font-serif text-5xl md:text-7xl italic text-[var(--text)]">The Library.</h1>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-50 mt-4">Selected Readings / Digital Shelf</p>
      </div>

      {/* THE BOOKSHELF GRID */}
      <div className="max-w-6xl mx-auto px-6">
        {/* On Mobile: grid-cols-3 (Small packed grid). Desktop: grid-cols-6 */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-12">
            {BOOKS.map((book, i) => (
                <div key={i} className="group flex flex-col gap-3">
                    {/* Book Cover */}
                    <div className="book-cover aspect-[2/3] w-full bg-white/5 relative overflow-hidden rounded-[2px] shadow-lg border border-white/5 cursor-pointer">
                        <img src={book.cover} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                        
                        {/* Spine Reflection */}
                        <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 z-10"></div>
                    </div>
                    
                    {/* Meta */}
                    <div className="text-center md:text-left">
                        <h3 className="font-serif text-[10px] md:text-xs leading-tight text-[var(--text)] mb-1 truncate">{book.title}</h3>
                        <p className="font-sans text-[8px] uppercase tracking-wider opacity-40">{book.author}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </main>
  );
}