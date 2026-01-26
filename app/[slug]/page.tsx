import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Pricing } from "@/components/Pricing";
import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function OfferPage({ params }: PageProps) {
    const { slug } = await params;

    const offer = await prisma.offer.findUnique({
        where: { slug },
    });

    if (!offer) {
        notFound();
    }

    // Optional: Pass hotelName to Hero if we decide to customize it too.
    // For now, only Pricing is required custom.

    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-gold-500 selection:text-black">
            <Hero />
            <ValueProps />
            <Pricing
                hotelName={offer.hotelName}
                customPrice={offer.price}
            />

            <footer className="py-8 text-center text-white/40 text-sm border-t border-white/5">
                <p>&copy; {new Date().getFullYear()} Türkiye’nin En Prestijli Otel Tanıtım Sayfaları. Tüm hakları saklıdır.</p>
            </footer>
        </main>
    );
}
