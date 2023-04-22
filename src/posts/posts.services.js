const postControllers = require('./posts.controllers')

const getAllPosts = (req, res) => {
    postControllers.findAllPosts()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({err})
        })
}

const getPostById = (req, res) => {
    const id = req.params.id
    postControllers.findPostById(id)
        .then(data => {
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'User not found'})
            }
        })
        .catch(err => {
            res.status(400).json({err})
        })

}