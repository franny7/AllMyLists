const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const List = require('../models/List');

// @route   GET api/lists
// @desc    Get all users lists
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id }).sort({ date: -1 });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/lists
// @desc    Add new list
// @access    Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    try {
      const newList = new List({
        name,
        email,
        user: req.user.id,
      });

      const list = await newList.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/lists/:id
// @desc    Update list
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update list');
});

// @route   DELETE api/lists/:id
// @desc    Delete list
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete list');
});

module.exports = router;
