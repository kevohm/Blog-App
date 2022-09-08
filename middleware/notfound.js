const notFound = (req,res,next) => {
    return res.status(404).json({msg:"Error:404",errorPage:true})
}
module.exports = notFound