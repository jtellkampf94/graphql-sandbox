import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Add relational data
  // const result = await prisma.post.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     author: {
  //       connect: {
  //         email: "pat@example.com",
  //       },
  //     },
  //   },
  // });

  // Select desired fields
  // const result = await prisma.user.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //   },
  // });

  // Include relational data
  const result = await prisma.user.findUnique({
    where: { email: "pat@example.com" },
    include: {
      posts: true,
    },
  });

  console.log(result);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
