// add middlewares here related to projects
// add middlewares here related to projects
const Project = require('./projects-model')

 async function validateProject (req,res,next) {
    try {
    const project = await Project.get(req.params.id)
    if(!project){
        res.status(404).res.json({
            message: "not found"
        })
    } else {
        req.project = project
        next()
    }
    } catch(err) {
        res.json({
            message: "not found"
        })
    }
}


function checkPost (req,res,next) {
    const {name, description, completed} = req.body
    if(!name || !description){
        res.status(400).json({
            message: "provide the credentials pussy"
        })
    } 
    else {
        req.user = {name, description, completed}
        next()
    }
}

function checkPutRequest (req,res,next) {
    const {name, description, completed} = req.body
    if(!name || !description || !req.body.hasOwnProperty('completed')){
        res.status(400).json({
            message: "provide the credentials pussy"
        })
    } 
    else {
        req.user = {name, description, completed}
        next()
    }
}





module.exports = {
    validateProject,
    checkPost, 
    checkPutRequest
}