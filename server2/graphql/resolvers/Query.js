const Query = {
  users: (parent, args, { db }, info) => {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts: (parent, args, { db }, info) => {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  me: (parent, args, context, info) => {
    return {
      id: "123456",
      name: "Jonathan",
      email: "jonathan@example.com",
    };
  },
  post: (parent, args, context, info) => {
    return {
      id: "354",
      title: "GraphQL 101",
      body: "",
      published: false,
    };
  },
  comments: (parent, args, { db }, info) => {
    return db.comments;
  },
};

module.exports = Query;
