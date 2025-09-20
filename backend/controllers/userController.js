const asyncHandler = require('express-async-handler')
const User = require('../models/User')

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password').populate('followers following', 'name username avatar')
  if (!user) { res.status(404); throw new Error('User not found') }
  res.json(user)
})

exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) { res.status(404); throw new Error('User not found') }
  const { name, bio, avatar } = req.body
  user.name = name || user.name
  user.bio = bio || user.bio
  user.avatar = avatar || user.avatar
  await user.save()
  res.json(user)
})

exports.follow = asyncHandler(async (req, res) => {
  const target = await User.findById(req.params.id)
  const me = await User.findById(req.user._id)
  if (!target) { res.status(404); throw new Error('User not found') }
  if (target.followers.includes(me._id)) {
    target.followers.pull(me._id)
    me.following.pull(target._id)
    await target.save(); await me.save()
    res.json({ message: 'Unfollowed' })
  } else {
    target.followers.push(me._id)
    me.following.push(target._id)
    await target.save(); await me.save()
    res.json({ message: 'Followed' })
  }
})
