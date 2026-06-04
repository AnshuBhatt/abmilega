const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.vendor.createMany({
    data: [
      {
        name: "Royal Mahal Banquet",
        slug: "royal-mahal-banquet",
        category: "Venue",
        city: "Bhilwara",
        description: "Premium wedding venue",
        rating: 4.9,
        isElite: true,
      },

      {
        name: "Dr Sharma Dental Clinic",
        slug: "dr-sharma-dental-clinic",
        category: "Dentist",
        city: "Bhilwara",
        description: "Experienced dentist",
        rating: 4.8,
      },
    ],
  });
}

main();