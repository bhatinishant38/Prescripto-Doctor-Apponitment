import jwt from 'jsonwebtoken'


export const authUser = async (req, res,next) =>{
    try {            
        const {token} = req.headers
        if(!token){
            res.json({success : false , message: "Not Authorized login again "})
        }
        const decode_token = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.body = req.body || {}
        req.body.userId = decode_token.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false , message : error.message})   
    } 
}