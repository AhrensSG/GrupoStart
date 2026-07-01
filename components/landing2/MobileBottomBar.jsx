"use client"

export default function MobileBottomBar({ onSubscribe }) {
  return (
    <>
      <div className="h-20 md:hidden" />
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#050807] border-t border-[#00F74C]/30 shadow-lg shadow-[#00F74C]/10 z-40">
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <div className="flex-1">
            <div className="text-[#B0B5BB] text-xs line-through" style={{ fontFamily: "'Lato', sans-serif" }}>
              $15000/mes
            </div>
            <div className="text-[#00F74C] font-black text-2xl drop-shadow-[0_0_4px_#00F74C]" style={{ fontFamily: "'Schibsted Grotesk', sans-serif" }}>
              $2500<span className="text-sm font-semibold text-[#B0B5BB] drop-shadow-none">/mes</span>
            </div>
          </div>
          <button
            onClick={onSubscribe}
            className="btn-neon px-6 py-3 text-sm whitespace-nowrap"
            style={{
              fontFamily: "'Schibsted Grotesk', sans-serif",
              fontWeight: 800,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Comenzar Ahora
          </button>
        </div>
      </div>
    </>
  )
}
