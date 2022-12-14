const express = require('express');
const router = express.Router();

const BlogModel = require('../models/blogModel');

router.post("/createBlogPost", async (req, res) => {
    const Blog = new BlogModel(req.body);

    let out = [];

    try {
        await Blog.save();
        
        out[0] = {"msg": "Success"};
        out[1] = {"output": Blog};
        out[2] = {"error": ""};

        res.json(out);
    } catch (err) {

        out[0] = {"msg": ""};
        out[1] = {"output": ""};

        allErrors = [];

        for(temp in err.errors) {
            console.log(temp);
            singleError = {};
            singleError.field = temp;
            singleError.message = err.errors[temp].message;
            allErrors.push(singleError);
        }
        out[2] = {"error": allErrors};

        res.json(out);
    }
});

router.post("/updateBlogPost", (req, res) => {

    let out = [];

    const { author, title, description } = req.body;

    BlogModel.updateOne(
        { author: author },
        { $set: { title: title, description: description } },
        (err, res1) => {
            if(err) throw err;
        out[0] = {"msg": "Success"};
        out[1] = {"output": res1};
        out[2] = {"error": ""};

        res.json(out);
    });

});

router.post("/deleteBlogPost", (req, res) => {

    let out = [];

    const { author } = req.body;

    BlogModel.deleteOne(
        { author: author },
        (err, res1) => {
            if(err) throw err;
        out[0] = {"msg": "Success"};
        out[1] = {"output": res1};
        out[2] = {"error": ""};

        res.json(out);
    });

});

router.post("/getAllBlogPosts", (req, res) => {

    let out = [];

    const { author } = req.body;

    let qry = {};
    if(author!="" && author!=undefined) qry.author = author;
    console.log(qry);

    BlogModel.find(qry, (err, res1) => {
            if(err) throw err;
        out[0] = {"msg": "Success"};
        out[1] = {"output": res1};
        out[2] = {"error": ""};

        res.json(out);
    });

});

module.exports = router;