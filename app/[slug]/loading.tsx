
export default function Loading() {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white selection:bg-gold-500 selection:text-black">
            <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-6 shadow-lg shadow-gold-500/20" />
            <h2 className="text-xl md:text-2xl font-bold animate-pulse text-gold-500">
                TEKLİF HAZIRLANIYOR...
            </h2>
            <p className="text-white/40 text-sm mt-3 animate-fade-in">
                Sizin için özel fiyatlar hesaplanıyor
            </p>
        </div>
    );
}
