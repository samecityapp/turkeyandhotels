import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Pricing } from "@/components/Pricing";
import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";

import { unstable_cache } from 'next/cache';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// 1. Define Static Params to pre-build pages
export async function generateStaticParams() {
    const offers = await prisma.offer.findMany({
        select: { slug: true },
    });

    return offers.map((offer) => ({
        slug: offer.slug,
    }));
}

// 2. Cache DB results for Incremental Static Regeneration (ISR)
const getOffer = unstable_cache(
    async (slug: string) => prisma.offer.findUnique({
        where: { slug }
    }),
    ['offer-by-slug'],
    { revalidate: 3600 } // Cache for 1 hour
);

export const dynamicParams = true; // Allow new pages to be generated on demand
export const revalidate = 3600; // Revalidate every hour
export const fetchCache = 'force-cache'; // Cache all fetches by default

export default async function OfferPage({ params }: PageProps) {
    const { slug } = await params;

    const offer = await getOffer(slug);

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
                <p className="text-[10px] mt-2 opacity-50">
                    Oluşturulma: {new Date().toLocaleTimeString("tr-TR")} (Cache Debug)
                </p>
            </footer>
        </main>
    );
}
