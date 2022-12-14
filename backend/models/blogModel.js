const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const connBlog = require('../db');

connBlog.connectThroughMongoose();

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter Blog Title"]
        },
        description: {
            type: String,
            required: [true, "Please enter Blog Description. Description field is required."]
        },
        author: {
            type: String,
            required: [true, "Please enter Author Name"]
        },
        createdDate: {
            type: Date,
            default: Date.now
        }
    }
);

const Blog = mongoose.model("blogPostsCollection", blogSchema);

module.exports = Blog;