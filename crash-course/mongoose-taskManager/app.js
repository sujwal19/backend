import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/blogAdvanced")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    age: { type: Number, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Instance Method
userSchema.methods.greet = function () {
  return `Hi, my name is ${this.name}`;
};

// Static Method
userSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

// Virtual
userSchema.virtual("nameEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// Index
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
      validate: {
        validator: (arr) => arr.length <= 5,
        message: "Max 5 tags allowed",
      },
    },
    comments: [
      {
        text: String,
        commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true },
);

// Pre Save Hook
postSchema.pre("save", function (next) {
  console.log("About to save this post:", this.title);
});

// Post Save Hook
postSchema.post("save", function (doc) {
  console.log("Saved post:", doc.title);
});

const Post = mongoose.model("Post", postSchema);

async function run() {
  try {
    // Create Users
    const alice = await User.create({
      name: "Alice",
      email: "alice@example.com",
      age: 25,
    });
    const bob = await User.create({
      name: "Bob",
      email: "bob@example.com",
      age: 29,
    });

    //
    console.log(alice.greet()); // Methods
    const activeUsers = await User.findActive(); // Statics
    console.log(
      "Active Users:",
      activeUsers.map((u) => u.nameEmail),
    ); // Virtuals

    // Create Post
    const post = await Post.create({
      title: "My First Post",
      content: "Hello World",
      author: alice._id,
      tags: ["intro", "hello"],
    });
    //

    const populatedPost = await Post.findById(post._id)
      .populate("author", "name email")
      .lean();
    console.log("Populated Post:", populatedPost);

    // Update Post
    await Post.findByIdAndDelete(
      post._id,
      { $push: { tags: "updated" } },
      { runValidators: true },
    );

    // Delete Post
    await Post.deleteOne({ _id: post._id });
    console.log("Deleted post");
    //
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

run();
