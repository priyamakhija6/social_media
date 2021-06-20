const Post = require('../models/post')
exports.getPosts = (req,res) => {
    const posts = Post.find().select("_id title body")
        .then(posts => res.json({posts: posts}))
        .catch(err => console.log(err));
};

exports.createPost = (req,res) => {
    const post = new Post(req.body);
    /** Commented out below code-block after introducing express-validator
     *
    // post.save((err,result) => {
    //     if(err) return res.json({status: 400, error: err});
    //     res.json({status: 200, post: result});
    // });
     */

    post.save()
        .then(result => {
            res.json({ post: result });
        })
}

