let posts = [
  { id: 0, title: "Node js" },
  { id: 1, title: "Express" },
  { id: 2, title: "Middleware" },
  { id: 3, title: "MongoDB" },
];

// @desc get all Posts
// @route GET /api/posts
export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc get single Posts
// @route GET /api/posts/:id
export const getSinglePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id of ${id} not found.`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
};

// @desc Create new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
  console.log("BODY:", req.body);
  const title = req.body?.title;
  if (!title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }
  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

// @desc Update Post
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post with id of ${id} not found.`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body?.title;
  res.status(200).json(posts);
};

// @desc Delete post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post with id of ${id} not found.`);
    error.status = 400;
    return next(error);
  }
  posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};
