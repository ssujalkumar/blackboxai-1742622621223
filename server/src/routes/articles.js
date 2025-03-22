const express = require('express');
const Article = require('../models/Article');
const { auth, isWriter } = require('../middleware/auth');

const router = express.Router();

// Get all articles with search and filtering
router.get('/', async (req, res) => {
  try {
    const { search, tag, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Tag filtering
    if (tag) {
      query.tags = tag;
    }

    const articles = await Article.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Article.countDocuments(query);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching articles',
      error: error.message
    });
  }
});

// Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username');
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching article',
      error: error.message
    });
  }
});

// Create new article (writers only)
router.post('/', auth, isWriter, async (req, res) => {
  try {
    const { title, content, summary, tags, readTime } = req.body;

    const article = new Article({
      title,
      content,
      summary,
      tags,
      readTime,
      author: req.user._id
    });

    await article.save();
    await article.populate('author', 'username');

    res.status(201).json({
      message: 'Article created successfully',
      article
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating article',
      error: error.message
    });
  }
});

// Update article (writers only, own articles)
router.put('/:id', auth, isWriter, async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      author: req.user._id
    });

    if (!article) {
      return res.status(404).json({ 
        message: 'Article not found or you are not authorized to edit it' 
      });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      article[key] = updates[key];
    });

    await article.save();
    await article.populate('author', 'username');

    res.json({
      message: 'Article updated successfully',
      article
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating article',
      error: error.message
    });
  }
});

// Delete article (writers only, own articles)
router.delete('/:id', auth, isWriter, async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });

    if (!article) {
      return res.status(404).json({ 
        message: 'Article not found or you are not authorized to delete it' 
      });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting article',
      error: error.message
    });
  }
});

// Like/Unlike article
router.post('/:id/like', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.likes += 1;
    await article.save();

    res.json({
      message: 'Article liked successfully',
      likes: article.likes
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error liking article',
      error: error.message
    });
  }
});

module.exports = router;