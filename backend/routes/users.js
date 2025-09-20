const express = require('express')
const router = express.Router()
const { getUserById, updateProfile, follow } = require('../controllers/userController')
const { protect } = require('../middleware/auth')

router.get('/:id', getUserById)
router.put('/', protect, updateProfile)
router.post('/:id/follow', protect, follow)

module.exports = router
