import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const result = await prisma.user.update({
    where: {
      email: "pat@example.com",
    },
    data: {
      name: "patrick",
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
