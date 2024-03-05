const express = require('express');
const router = express.Router();

const { removeFriend } = require('../controllers/removeFriend');

// get middleware
const { authenticate } = require('../middleware/auth');

const { searchFriends } = require('../controllers/searchFriends');

router.post('/remove', authenticate);
router.post('/remove', removeFriend);
router.post('/search', authenticate);
router.post('/search', searchFriends);

module.exports = router;