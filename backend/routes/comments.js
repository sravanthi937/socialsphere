const express = require('express')
const router = express.Router()
const { addComment, deleteComment, getCommentsForPost } = require('../controllers/commentController')
const { protect } = require('../middleware/auth')

router.post('/:postId', protect, addComment)
router.get('/:postId', protect, getCommentsForPost)
router.delete('/:id', protect, deleteComment)

module.exports = router
