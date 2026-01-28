"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

// Custom TikTok Icon
const TikTok = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        className={className}
    >
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.85.12V9.05a6.33 6.33 0 106.8 6.33V9.35c.82.72 1.9 1.15 3.08 1.15l-.02-3.81z" />
    </svg>
);

const socialLinks = [
    {
        name: "Turkeyandhotels",
        platform: "Instagram",
        url: "https://www.instagram.com/turkeyandhotels/",
        icon: Instagram,
        color: "group-hover:text-pink-500",
        gradient: "from-purple-500 to-pink-500",
        followers: "323.000+ Takipçi"
    },
    {
        name: "@Geceligi.ne.kadar",
        platform: "Instagram",
        url: "https://www.instagram.com/geceligi.ne.kadar/",
        icon: Instagram,
        color: "group-hover:text-orange-500",
        gradient: "from-yellow-500 to-orange-500",
        followers: "303.000+ Takipçi"
    },
    {
        name: "@Geceligi.nekadar",
        platform: "Tiktok",
        url: "https://www.tiktok.com/@geceligi.nekadar?lang=en",
        icon: TikTok,
        color: "group-hover:text-cyan-400",
        gradient: "from-cyan-400 to-blue-500",
        followers: "60.000+ Takipçi"
    },
];

export const Hero = () => {
    return (
        <section className="relative pt-20 pb-12 px-4 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 leading-tight"
                >
                    Türkiye’nin En Prestijli
                    <br />
                    <span className="text-gold-500">Otel Tanıtım Sayfaları</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="grid gap-4 md:grid-cols-3"
                >
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/10"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <social.icon className={`w-5 h-5 text-white/80 transition-colors duration-300 ${social.color}`} />
                                    <span className="text-xs font-bold tracking-widest uppercase text-white/40">{social.platform}</span>
                                </div>
                                <div className="text-white/60 text-sm">{social.name}</div>
                                <div className="text-3xl font-bold text-white mt-1 group-hover:scale-110 transition-transform duration-300">{social.followers}</div>
                            </div>
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
