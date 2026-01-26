import prisma from "@/lib/prisma";

async function verifyFlow() {
    console.log("🧪 TESTING OFFER FLOW...");

    // 1. Clean up potential old test
    const slug = "test-hotel-teklif";
    await prisma.offer.deleteMany({ where: { slug } });

    // 2. Create Offer
    const hotelName = "Test Hotel";
    const price = "100.000 TL";

    console.log(`Creating offer: ${hotelName} - ${price}`);
    const offer = await prisma.offer.create({
        data: {
            hotelName,
            price,
            slug
        }
    });
    console.log(`✅ Created Offer ID: ${offer.id} Slug: ${offer.slug}`);

    // 3. Read it back
    const fetched = await prisma.offer.findUnique({ where: { slug } });
    if (fetched && fetched.price === price) {
        console.log("✅ DB Persistence Confirmed.");
        console.log(`Test URL: http://localhost:3000/${slug}`);
    } else {
        console.error("❌ DB Read Failed!");
    }
}

verifyFlow();
