
export default function Loading() {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-gold-500 selection:text-black">
            {/* Hero Skeleton */}
            <div className="relative pt-20 pb-12 px-4 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="h-16 w-3/4 max-w-lg mx-auto bg-white/5 rounded-lg animate-pulse mb-12" />

                    <div className="grid gap-4 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-40 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Value Props Skeleton */}
            <div className="pt-20 pb-10 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
                    ))}
                </div>
            </div>

            {/* Pricing Skeleton */}
            <div className="pt-10 pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="h-12 w-1/2 max-w-sm mx-auto bg-white/5 rounded-lg animate-pulse mb-16" />
                    <div className="grid md:grid-cols-2 gap-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-[500px] bg-white/5 rounded-3xl animate-pulse border border-white/5" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
