const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();

    // Create Authors
    const jkRowling = await prisma.author.create({
        data: {
            name: 'J.K. Rowling',
            email: 'jk@example.com',
        },
    });

    const georgeOrwell = await prisma.author.create({
        data: {
            name: 'George Orwell',
            email: 'george@example.com',
        },
    });

    console.log('✅ Created 2 authors');

    // Create Books
    await prisma.book.create({
        data: {
            title: "Harry Potter and the Philosopher's Stone",
            price: 19.99,
            stock: 100,
            authorId: jkRowling.id,
        },
    });

    await prisma.book.create({
        data: {
            title: '1984',
            price: 15.99,
            stock: 75,
            authorId: georgeOrwell.id,
        },
    });

    await prisma.book.create({
        data: {
            title: 'Animal Farm',
            price: 12.99,
            stock: 80,
            authorId: georgeOrwell.id,
        },
    });

    console.log('✅ Created 3 books');

    // Display summary
    const authorsCount = await prisma.author.count();
    const booksCount = await prisma.book.count();

    console.log('\n📊 Database Summary:');
    console.log(`   Authors: ${authorsCount}`);
    console.log(`   Books: ${booksCount}`);
    console.log('\n✨ Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
