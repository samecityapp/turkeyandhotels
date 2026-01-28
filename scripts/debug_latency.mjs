
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function measure() {
    console.log("Starting latency test (JS Mode)...");
    const start = performance.now();

    const slug = "test-latency-" + Date.now();

    // 1. Create
    console.log("Creating offer...");
    const createStart = performance.now();
    try {
        await prisma.offer.create({
            data: {
                hotelName: "Latency Test Hotel",
                price: "100 TL",
                slug: slug
            }
        });
        console.log(`✅ Create took: ${(performance.now() - createStart).toFixed(2)}ms`);
    } catch (e) {
        console.error("Create failed", e);
        return;
    }

    // 2. Fetch
    console.log("Fetching offer...");
    const fetchStart = performance.now();
    const offer = await prisma.offer.findUnique({
        where: { slug }
    });

    console.log(`✅ Fetch took: ${(performance.now() - fetchStart).toFixed(2)}ms`);
    console.log(`⏱️ Total Execution: ${(performance.now() - start).toFixed(2)}ms`);

    if (offer) {
        // Cleanup
        await prisma.offer.delete({ where: { id: offer.id } });
    }
}

measure()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
