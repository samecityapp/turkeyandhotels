import prisma from "@/lib/prisma";
import { deleteOffer } from "../actions";
import { CreateOfferForm } from "@/components/CreateOfferForm";

export default async function AdminPage() {
    const offers = await prisma.offer.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <main className="min-h-screen bg-slate-950 text-white p-8">
            <h1 className="text-3xl font-bold mb-8 text-gold-500">Admin Paneli - Teklif Yönetimi</h1>

            {/* Create Form */}
            <CreateOfferForm />

            {/* List */}
            <div className="max-w-4xl">
                <h2 className="text-xl font-bold mb-6">Mevcut Teklifler ({offers.length})</h2>
                <div className="space-y-4">
                    {offers.map((offer: { id: string; hotelName: string; price: string; slug: string }) => (
                        <div key={offer.id} className="flex flex-col md:flex-row items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl gap-4">
                            <div>
                                <h3 className="font-bold text-lg">{offer.hotelName}</h3>
                                <div className="flex gap-4 text-sm text-slate-400 mt-1">
                                    <span>{offer.price}</span>
                                    <span className="text-slate-600">|</span>
                                    <a href={`/${offer.slug}`} target="_blank" className="text-blue-400 hover:underline">
                                        /{offer.slug}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <form action={deleteOffer.bind(null, offer.id)}>
                                    <button className="text-red-400 hover:text-red-300 text-sm px-3 py-1 bg-red-500/10 rounded-lg transition-colors">
                                        Sil
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                    {offers.length === 0 && (
                        <p className="text-slate-600 italic">Henüz teklif oluşturulmadı.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
