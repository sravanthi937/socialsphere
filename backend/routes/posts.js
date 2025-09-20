const express = require('express')
const router = express.Router()
const { createPost, getFeed, getPostById, updatePost, deletePost, toggleLike } = require('../controllers/postController')
const { protect } = require('../middleware/auth')

router.get('/', protect, getFeed)
router.post('/', protect, createPost)
router.get('/:id', protect, getPostById)
router.put('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)
router.post('/:id/like', protect, toggleLike)

module.exports = router
