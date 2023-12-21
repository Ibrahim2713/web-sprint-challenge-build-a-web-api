// Write your "actions" router here!
// Write your "actions" router here!
const express = require('express')

const router = express.Router()
const Action = require('./actions-model')

const {
validateAction,
validateUserAction



} = require('./actions-middlware')

router.get('/', (req,res) => {
    Action.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(() => {
        res.json([])
    })
})

router.get('/:id', validateAction, (req,res,next) => {
    
    res.json(req.action)
    
})

router.post('/',validateUserAction, (req,res,next) => {
    Action.insert(req.user)
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(next)
})

router.put('/:id', validateAction, validateUserAction, (req,res,next) => {
    Action.update(req.params.id, req.body)
    .then(update => {
        res.json(update)
    })
    .catch(next)
})

router.delete('/:id',  async (req, res, next) => {
    try {
        const result = await Action.remove(req.params.id)
        res.json(result)
       } catch(err) {
         next(err)
       }
    
})












module.exports = router