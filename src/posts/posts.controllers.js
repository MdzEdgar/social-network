const uuid = require('uuid')
const Posts = require('../models/posts.models')
const Users = require('../models/users.models')

const findAllPosts = async () => {
    const posts = await Posts.findAndCountAll({
        limit,
        offset
    })
    return posts
}

const findPostById = async (id) => {
    const post = await Posts.findOne({
        where: {
            id: id
        }
    })
    return post
}

const findPostsByUserId = async (userId) => {
    const posts = await Posts.findAll({
        where: {
            userId: userId
        },
        include: {
            model: Users,
            attributes: ["id", "firstName", "lastName"]
        }
    })
}

const createPost = async (postObj) => {
    const newPost = await Posts.create({
        id: uuid.v4(),
        content: postObj.content,
        userId: postObj.userId
    })
    return newPost
}

const updatePost = async (postId, postObj) => {
    const selectedPost = await Posts.findOne({
        where: {
            id: postId
        }
    })

    if(!selectedPost) return null

    const updatedPost = await selectedPost.update(postObj)

    return updatedPost
}

const deletePost = async (postId) => {
    const selectedPost = await Posts.findOne({
        where: {
            id: postId
        }
    })

    if(!selectedPost) return null

    const updatedPost = await selectedPost.update({
        status: 'deleted'
    })

    return updatedPost
}

module.exports = {
    findAllPosts,
    findPostById,
    findPostsByUserId,
    createPost,
    updatePost,
    deletePost
}