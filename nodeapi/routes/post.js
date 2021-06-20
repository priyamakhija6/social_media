const express = require('express');
const postController = require('../controllers/post');
const validator = require('../validators');

const router = express.Router();

router.get('/', postController.getPosts);
router.post('/post', validator.createPostValidators, postController.createPost);

module.exports = router;

// const getPosts = (req,res) => {
//     res.send('Hello World from NodeJS');
// }
//
// module.exports = {
//     getPosts
// };
