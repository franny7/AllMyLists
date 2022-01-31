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
router.put('/:id', auth, async (req, res) => {
  const { name, email } = req.body;

  // Build a list object
  const listFields = {};
  if (name) listFields.name = name;
  if (email) listFields.email = email;

  try {
    let list = await List.findById(req.params.id);

    if (!list) return res.status(404).json({ msg: 'List not found' });

    // Make sure user owns list
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    list = await List.findByIdAndUpdate(
      req.params.id,
      { $set: listFields },
      { new: true }
    );

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/lists/:id
// @desc    Delete list
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let list = await List.findById(req.params.id);

    if (!list) return res.status(404).json({ msg: 'List not found' });

    // Make sure user owns list
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await List.findByIdAndRemove(req.params.id);

    res.json({ msg: 'List removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
