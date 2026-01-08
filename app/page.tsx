import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";
import { Pricing } from "@/components/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-gold-500 selection:text-black">
      <Hero />
      <ValueProps />
      <Pricing />

      <footer className="py-8 text-center text-white/40 text-sm border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Türkiye’nin En Prestijli Otel Tanıtım Sayfaları. Tüm hakları saklıdır.</p>
      </footer>
    </main>
  );
}
