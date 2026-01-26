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

    const slug = `${slugBase}-teklif`;

    await prisma.offer.create({
        data: {
            hotelName,
            price, // e.g. "50.000 TL"
            slug
        }
    });

    revalidatePath("/admin");
    // return { success: true }; // Return void to satisfy form action type
}

export async function deleteOffer(id: string) {
    await prisma.offer.delete({
        where: { id }
    });
    revalidatePath("/admin");
}
