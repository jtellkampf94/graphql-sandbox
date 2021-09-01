import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/users", async (req, res, next) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/signup", async (req, res, next) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
});

app.get("/posts", async (req, res, next) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.post("/post", async (req, res, next) => {
  const { title, content, published, authorId } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
    },
    include: {
      author: true,
    },
  });
  res.json(post);
});

app.put("/post/:id/views", async (req, res, next) => {
  const { id } = req.params;
  const result = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
  res.json(result);
});

app.get("/user/:id/drafts", async (req, res, next) => {
  const { id } = req.params;
  const unpublishedPosts = await prisma.user
    .findUnique({
      where: { id: Number(id) },
    })
    .posts({
      where: {
        published: false,
      },
    });
  res.json(unpublishedPosts);
});

app.get("/post/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});

// Prisma middleware to validate input

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
