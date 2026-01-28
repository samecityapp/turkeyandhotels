
export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center text-white">
            <div className="relative">
                {/* Logo or Spinner */}
                <div className="w-16 h-16 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gold-500/20 rounded-full"></div>
                </div>
            </div>
            <div className="mt-8 text-center space-y-2">
                <h2 className="text-xl font-bold tracking-tight animate-pulse text-gold-500">TurkeyAndHotels</h2>
                <p className="text-sm text-gray-500">Özel Fırsat Yükleniyor...</p>
            </div>
        </div>
    );
}
