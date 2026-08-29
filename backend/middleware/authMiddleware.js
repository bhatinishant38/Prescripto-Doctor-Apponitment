import jwt from 'jsonwebtoken'

export const authAdmin =(req,res,next)=>{
    try {
        const {atoken} = req.headers
        
        if(!atoken){
            res.json({success : false , message : "Not Authorized login again "})
        }
         
        const token_decode = jwt.verify( atoken , process.env.JWT_SECRET_KEY)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
              res.json({success : false , message : "Not Authorized login again and again"})
        }
        next()
        
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }

}