// add middlewares here related to actions
// add middlewares here related to actions
const Action = require('./actions-model')

 async function validateAction  (req,res,next) {
    try {
    const action = await Action.get(req.params.id)
    if(!action) {
        res.status(404).json({
            message: "not found"
        })
    } else {
        req.action = action
        next()
    }
    } catch(err){
        res.json({
            message: "not found"
        })
    }

}

function validateUserAction (req,res,next) {
    const { notes, description, project_id} = req.body
    if(!notes || !description || !project_id){
        res.status(400).json({
            message: 'please provide a complete action'
        })
    } else if(description.length > 128){
        res.status(400).json({
            message: 'description is to long'
        })
    } else {
        req.user = {notes, description, project_id}
        next()
    }
    
} 




module.exports = {
    validateAction,
    validateUserAction,




}