const asyncHandler = require('express-async-handler')
const Comment = require('../models/Comment')
const Post = require('../models/Post')

exports.addComment = asyncHandler(async (req, res) => {
  const { content } = req.body
  const post = await Post.findById(req.params.postId)
  if (!post) { res.status(404); throw new Error('Post not found') }
  const comment = await Comment.create({ author: req.user._id, post: post._id, content })
  res.status(201).json(comment)
})

exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('post')
  if (!comment) { res.status(404); throw new Error('Comment not found') }
  // allow comment owner or post owner
  if (!comment.author.equals(req.user._id) && !comment.post.author.equals(req.user._id)) {
    res.status(403); throw new Error('Not allowed')
  }
  await comment.remove()
  res.json({ message: 'Comment removed' })
})

exports.getCommentsForPost = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('author', 'name username avatar').sort({ createdAt: 1 })
  res.json(comments)
})
