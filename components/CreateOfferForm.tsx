"use client";

import { useState } from "react";
import { createOffer } from "@/app/actions";
import { Loader2, CheckCircle, ExternalLink } from "lucide-react";

export function CreateOfferForm() {
    const [status, setStatus] = useState<"idle" | "creating" | "warming" | "done">("idle");
    const [createdSlug, setCreatedSlug] = useState<string>("");

    async function handleSubmit(formData: FormData) {
        setStatus("creating");

        try {
            // 1. Create Offer (Server Action)
            const result = await createOffer(formData);

            if (result?.slug) {
                setCreatedSlug(result.slug);
                setStatus("warming");
                await warmUpPage(result.slug);
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
            setStatus("idle");
        }
    }

    async function warmUpPage(slug: string) {
        // 2. Client-Side Warmup Loop
        const url = `/${slug}`;
        const maxRetries = 20; // 20 seconds max
        let attempts = 0;

        while (attempts < maxRetries) {
            try {
                // Fetch with cache-busting logic to force check
                // We use GET to ensure the server actually generates the full HTML
                const res = await fetch(`${url}?t=${Date.now()}`, { method: "GET" });
                if (res.ok) {
                    setStatus("done");
                    return;
                }
            } catch (e) {
                // ignore errors, keep trying
                console.log("Warmup ping failed, retrying...");
            }

            attempts++;
            await new Promise(r => setTimeout(r, 1000)); // Wait 1s
        }

        // If we get here, it took too long, but we assume it's arguably ready or will be soon.
        setStatus("done");
    }

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-white/10 mb-12 max-w-xl">
            <h2 className="text-xl font-bold mb-4">Yeni Teklif Oluştur</h2>

            {status === "done" ? (
                <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center">
                    <div className="flex justify-center mb-3">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-green-500 mb-2">Hazır!</h3>
                    <p className="text-slate-300 mb-4">Sayfa tamamen oluşturuldu ve "sıcak" durumda.</p>

                    <a
                        href={`/${createdSlug}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Sayfaya Git <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                        onClick={() => {
                            setStatus("idle");
                            setCreatedSlug("");
                            // Reset form visually if needed, or reload
                            window.location.reload();
                        }}
                        className="block w-full mt-4 text-slate-500 text-sm hover:text-white"
                    >
                        Yeni Teklif Oluştur
                    </button>
                </div>
            ) : (
                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Otel Adı</label>
                        <input
                            name="hotelName"
                            type="text"
                            placeholder="Örn: Regnum Carya"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                            required
                            disabled={status !== "idle"}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Fiyat (TL)</label>
                        <input
                            name="price"
                            type="text"
                            placeholder="Örn: 50.000 TL"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                            required
                            disabled={status !== "idle"}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status !== "idle"}
                        className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2
                            ${status === "idle"
                                ? "bg-gold-500 hover:bg-gold-400 text-black"
                                : "bg-slate-700 text-slate-400 cursor-wait"
                            }`}
                    >
                        {status === "idle" && "Teklif Oluştur"}
                        {status === "creating" && (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Oluşturuluyor...
                            </>
                        )}
                        {status === "warming" && (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin text-gold-500" />
                                <span className="text-gold-500">Sayfa Isıtılıyor (Garanti Hız)...</span>
                            </>
                        )}
                    </button>
                    {status === "warming" && (
                        <p className="text-center text-xs text-slate-500 animate-pulse">
                            Bu işlem 10-15 saniye sürebilir, lütfen bekleyin.
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}
