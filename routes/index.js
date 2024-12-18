const express = require('express');
const router = express.Router();

const BlogsController = require('../controllers/BlogsController');
const { validateBlog } = require('../utils/validators');
router.get('/blogs', BlogsController.findBlogs);
router.post("/blogs", validateBlog, BlogsController.createBlog);
module.exports = router;