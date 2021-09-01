import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@example.com",
    posts: {
      create: [
        {
          title: "Prisma 101",
          content: "This is a prisma tutorial.",
          published: true,
        },
      ],
    },
  },
  {
    name: "William",
    email: "william@example.com",
    posts: {
      create: [
        {
          title: "Prisma 201",
          content: "Advanced prisma tutorial.",
          published: true,
        },
      ],
    },
  },
  {
    name: "Daniel",
    email: "daniel@example.com",
    posts: {
      create: [
        {
          title: "Prisma 301",
          content: "Understanding prisma even more",
          published: true,
        },
        {
          title: "Prisma 401",
          content: "Another prisma lesson",
          published: true,
        },
      ],
    },
  },
];

const main = async () => {
  console.log("Start seeding...");
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });

    console.log(`Created user with ID ${user.id}`);
  }
  console.log("Seeding finished");
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
