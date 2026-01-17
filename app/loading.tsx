export default function Loading() {
  return (
    <div className="h-screen w-full bg-[#080808] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-[1px] bg-[#D4AF37] animate-pulse"></div>
        <span className="font-archivo text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] animate-pulse">
          Loading Index...
        </span>
      </div>
    </div>
  );
}