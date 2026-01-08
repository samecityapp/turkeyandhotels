"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Award } from "lucide-react";

const features = [
    {
        icon: TrendingUp,
        title: "Yüksek Dönüşüm",
        description: "Takipçilerimiz otel tercihlerine karar vermek için bizi takip ediyor. Bu yüzden paylaşımlarımız yüksek rezervasyon akışı sağlıyor."
    },
    {
        icon: Users,
        title: "Nitelikli Kitle",
        description: "Sizi, otelinizin ruhunu anlayan ve fiyat yerine deneyimi önemseyen yüksek alım gücüne sahip kişilere ulaştırıyoruz."
    },
    {
        icon: Award,
        title: "11 Yıllık Tecrübe",
        description: "11 yıllık otel tanıtım tecrübemizle, hangi çekim ve paylaşımların doğrudan rezervasyona dönüştüğünü biliyoruz."
    }
];

export const ValueProps = () => {
    return (
        <section className="pt-20 pb-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gold-500/20 flex items-center justify-center mb-6 text-gold-500">
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                            <p className="text-white/70 leading-relaxed text-sm md:text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
