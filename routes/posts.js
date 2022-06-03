const express = require('express');
const router = express.Router();

const handleErrorAsync = require('../service/handleErrorAsync');
const PostController = require('../controllers/PostController');

router.get('/', handleErrorAsync(PostController.getPosts));
router.post('/', handleErrorAsync(PostController.insertPost));
router.delete('/', handleErrorAsync(PostController.delAllPosts));
router.delete('/:id', handleErrorAsync(PostController.delSinglePost));

module.exports = router;