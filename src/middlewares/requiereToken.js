import jwt from "jsonwebtoken"

export const requiereToken=(req,res, next)=>{
    //aqui requerimos el token para saber si es valido de aquellos usurios 
    try {
        const token=req.headers.authorization;
        console.log("revisar token");
        console.log(token);
        if (!token) throw new Error('No existe el token en el header')
        //VERIFICAR SI EL FRONTEND ME ENVIA AL HEADER BEAR TOKEN PARA ESO SI
        //SE USARIA SPLIT( TOKEN)

        const token2=token.split(" ");
        const payload= jwt.verify(token2[1],process.env.JWT_SECRET);
        const {uuid}= jwt.verify(token2[1],process.env.JWT_SECRET);
      
         console.log(token);
         console.log(payload);
       
        req.id=uuid
        next();
    } catch (error) {
        console.log(error);
       const TokenVerificationError={
           ["invalid signature"]:"la firma del jwt no es valida",
           ["jwt expired"]:"jwt expirado",
           ["invalid token"]:"token no valido",
           ["No Bearer"]:"utiliza formato Bearer",
           ["jwt malformed"]:"jwt mal formado",
       };
        return res.status(401).json({error:TokenVerificationError[error.message]});
    }
}
