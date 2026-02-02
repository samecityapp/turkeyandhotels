"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const offers = [
    {
        title: "Standart Paket",
        price: "30.000 TL",
        features: [
            "Geceliği Ne Kadar Instagram: 1 Reel + 3 Hikaye",
            "Geceliği Ne Kadar Tiktok: 1 Reel + 1 Hikaye",
            "Turkeyandhotels Instagram: 1 Hikaye",
            "Youtube Kanalı: Short Video",
            "Instagram Hesap Analizi",
            "1 Adet Otel Tanıtım Videosu"
        ],
        highlight: true,
        delay: 0
    },
    {
        title: "Premium Paket",
        price: "70.000 TL",
        features: [
            "Geceliği Ne Kadar Instagram: 1 Reel + 2 Hikaye",
            "Geceliği Ne Kadar Tiktok: 1 Reel + 2 Hikaye",
            "Turkeyandhotels Instagram: 1 Reel + 2 Hikaye",
            "Youtube Kanalı: Short Video",
            "Instagram Hesap Analizi",
            "3 Adet Otel Tanıtım Videosu"
        ],
        highlight: false,
        delay: 0.2
    }
];


interface PricingProps {
    hotelName?: string;
    customPrice?: string;
    showPrice?: boolean;
}

export const Pricing = ({ hotelName, customPrice, showPrice = false }: PricingProps) => {
    // Clone offers to avoid mutating the original array reference if reused
    const currentOffers = offers.map(offer => ({ ...offer }));

    // Override Standard Package (Index 0) Price if provided
    if (customPrice) {
        currentOffers[0].price = customPrice;
    }

    return (
        <section className="pt-10 pb-20 px-4 bg-gradient-to-b from-transparent to-black/50">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        {hotelName ? `${hotelName} İçin Tanıtım Paketleri` : "Tanıtım Paketleri"}
                    </h2>
                    <p className="text-white/60">İşletmeniz için en uygun tanıtım paketini seçin</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {currentOffers.map((offer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: offer.delay, duration: 0.5 }}
                            className={`relative p-8 md:p-10 rounded-3xl border transition-all duration-300 ${offer.highlight
                                ? "bg-gold-500/10 border-gold-500/50 shadow-2xl shadow-gold-500/10 hover:shadow-gold-500/20"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}
                        >
                            {offer.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg z-10">
                                    <Star className="w-3 h-3 fill-current" />
                                    EN POPÜLER
                                </div>
                            )}

                            <h3 className={`text-2xl font-bold mb-2 ${offer.highlight ? "text-gold-500" : "text-white"}`}>
                                {offer.title}
                            </h3>

                            <div className={`transition-all duration-500 ${!showPrice ? "blur-md select-none opacity-50 grayscale" : ""}`}>
                                <div className={`text-4xl md:text-5xl font-bold mb-8 ${offer.title === "Premium Paket" ? "blur-md select-none opacity-70" : ""}`}>{offer.price}</div>

                                <ul className="space-y-4 mb-8">
                                    {offer.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className={`mt-1 p-0.5 rounded-full ${offer.highlight ? "bg-gold-500 text-black" : "bg-white/20"}`}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-white/80 text-sm md:text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {!showPrice && (
                                <div className="absolute inset-0 flex items-center justify-center z-20">

                                </div>
                            )}

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
