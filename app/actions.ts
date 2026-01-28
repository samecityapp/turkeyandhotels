'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOffer(formData: FormData) {
    const hotelName = formData.get("hotelName") as string;
    const price = formData.get("price") as string;

    if (!hotelName || !price) {
        throw new Error("Missing fields");
    }

    // Generate slug: "regnum-carya-teklif"
    const slugBase = hotelName
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric with dash
        .replace(/-+/g, "-") // Collapse dashes
        .replace(/^-|-$/g, ""); // Trim dashes

    let slug = `${slugBase}-teklif`;
    let uniqueSlug = slug;
    let counter = 1;

    // Ensure uniqueness
    while (await prisma.offer.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }

    await prisma.offer.create({
        data: {
            hotelName,
            price, // e.g. "50.000 TL"
            slug: uniqueSlug
        }
    });

    // Warm up the cache immediately
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/${uniqueSlug}`;
    console.log(`🔥 Warming up: ${url}`);

    try {
        // Trigger ISR/SSG generation with a real visitor simulation (GET)
        await fetch(url, { method: 'GET' }); // Default cache behavior
        console.log(`✅ Warmup signal sent: ${url}`);
    } catch (e) {
        console.error(`❌ Warmup failed for ${url}:`, e);
    }

    // We still try server-side warmup as a "bonus", but client side is the guarantee.
    // ... (existing warmup code is fine to keep as double-check)

    revalidatePath("/admin");
    return { success: true, slug: uniqueSlug };
}

export async function deleteOffer(id: string) {
    await prisma.offer.delete({
        where: { id }
    });
    revalidatePath("/admin");
}
