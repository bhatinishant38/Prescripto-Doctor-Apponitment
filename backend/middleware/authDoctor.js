import jwt from "jsonwebtoken";

// doctor authentication middleware

export const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      res.json({ success: false, message: "Not Authorized login again " });
    }
    const decode_token = jwt.verify(dtoken, process.env.JWT_SECRET_KEY);
    req.doctorId = decode_token.id;
    console.log("Authenticated doctorId:", req.doctorId);
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
