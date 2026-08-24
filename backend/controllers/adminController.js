
// Api for adding Doctor
export const addDoctor = (req,res)=>{
    
    try {
        const { name , email,password ,speciality ,degree, experience,about ,address ,fees}  = req.body
        // const imageFile = req.file
        console.log( name , email,password ,speciality ,degree, experience,about ,address ,fees)
    } catch (error) {
        
    }

}