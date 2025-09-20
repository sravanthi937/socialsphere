const asyncHandler = require('express-async-handler')
const Post = require('../models/Post')
const User = require('../models/User')

exports.createPost = asyncHandler(async (req, res) => {
  const { content, image } = req.body
  const post = await Post.create({ author: req.user._id, content, image })
  res.status(201).json(post)
})

exports.getFeed = asyncHandler(async (req, res) => {
  const me = await User.findById(req.user._id)
  const ids = [me._id, ...me.following]
  const posts = await Post.find({ author: { $in: ids } })
    .populate('author', 'name username avatar').sort({ createdAt: -1 })
  res.json(posts)
})

exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'name username avatar')
  if (!post) { res.status(404); throw new Error('Post not found') }
  res.json(post)
})

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) { res.status(404); throw new Error('Post not found') }
  if (!post.author.equals(req.user._id)) { res.status(403); throw new Error('Not allowed') }
  post.content = req.body.content || post.content
  post.image = req.body.image || post.image
  await post.save()
  res.json(post)
})

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) { res.status(404); throw new Error('Post not found') }
  if (!post.author.equals(req.user._id)) { res.status(403); throw new Error('Not allowed') }
  await post.remove()
  res.json({ message: 'Post removed' })
})

exports.toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) { res.status(404); throw new Error('Post not found') }
  if (post.likes.includes(req.user._id)) { post.likes.pull(req.user._id) }
  else { post.likes.push(req.user._id) }
  await post.save()
  res.json(post)
})
