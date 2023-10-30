const express = require("express");
const { PostModel } = require("../models/post.model");
const { auth } = require("../middleware/auth.middleware");
const postRoute = express.Router();
postRoute.use(auth);

postRoute.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


postRoute.post("/add", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).json({ message: "A new post has been added" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

postRoute.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
      const post = await PostModel.findById(id);
  
      if (!post) {
        return res.status(400).send({ "message": "Post not found" });
      }
  
      if (post.userId.toString() === req.body.userId) {
        await PostModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Post updated successfully" });
      } else {
        res.status(400).json({ message: "You are not authorized to update this post" });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

postRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    if (post.userId.toString() === req.body.userId) {
      await PostModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(400).json({ message: "You are not authorized to delete this post" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = {postRoute};
