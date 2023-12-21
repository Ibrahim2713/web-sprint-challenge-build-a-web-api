// Write your "projects" router here!
// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')

const router = express.Router()

const {
validateProject,
checkPost,
checkPutRequest
} = require('./projects-middleware')

router.get('/', (req,res) => {
    Project.get()
    .then(proj => {
        res.json(proj)
    })
    .catch(err => {
        res.json([])
    })
})

router.get('/:id', validateProject, (req,res,next) => {
    res.json(req.project)
})

router.post('/', checkPost, (req,res,next) => {
    Project.insert(req.user)
    .then(newPost => {
        res.json(newPost)
    })
    .catch(next)
})

router.put('/:id', checkPutRequest, (req,res,next) => {
    Project.update(req.params.id, req.user)
    .then(update => {
        res.json(update)
    })
    .catch(next)

})

router.delete('/:id',validateProject ,async(req,res,next) => {
    try {
        const result = await Project.remove(req.params.id)
        res.json(result)
    } catch(next) {
        next()
    }
})

router.get('/:id/actions', (req,res,next) => {
    Project.getProjectActions(req.params.id)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.json([])
    })
})

 








module.exports = router

