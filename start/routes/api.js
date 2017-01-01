var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

function isAuthenticated (req, res, next) {
    if(req.method === "GET") {
        return next();
    }
    if(req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/#login');
}

router.use('/posts', isAuthenticated);

router.route('/posts')
    //gets all posts
    .get(function(req, res) {
        Post.find(function(err, posts) {
            if(err) {
                return res.send(500, err);
            }
            return res.send(posts);
        });
    })
    //create a new post
    .post(function(req, res) {
        var post = new Post();
        post.text = req.body.text;
        post.created_by = req.body.created_by;
        post.save(function(err, post) {
            if(err) {
                return res.send(500, err);
            }
            return res.json(post);
        });
    });

router.route('/posts/:id')
    //gets specified post
    .get(function(req, res) {
        //res.send({message: 'TODO return post with ID ' + req.params.id })
        Post.findById(req.params.id, function(err, post) {
            if(err) {
                res.send(err);
            }
            res.json(post);
        });
    })
    //post specified post
    .put(function(req, res) {
        //res.send({message: 'TODO modify post with ID ' + req.params.id });
        Post.findById(req.params.id, function(err, post) {
            if(err) {
                res.send(err);
            }
            post.created_by = req.body.created_by;
            post.text = req.body.text;
            post.save(function(err, post) {
                if(err) {
                    res.send(err);
                }
                res.json(post);
            });
        });
    })
    //deleate the post
    .delete(function(req, res) {
        //res.send({message: 'TODO delete post with ID' + req.params.id });
        Post.remove({
            _id: req.params.id
        }, function(err) {
            if(err) {
                res.send(err);
            }
            res.json("deleted :(");
        });
    });

module.exports = router;