import jwt from "jsonwebtoken"

export const requiereToken=(req,res, next)=>{

  

    //aqui requerimos el token para saber si es valido de aquellos usurios 
    try {
        
        const token=req.headers.authorization;

        if (!token) throw new Error('No existe el token en el header')
        //VERIFICAR SI EL FRONTEND ME ENVIA AL HEADER BEAR TOKEN PARA ESO SI
        //SE USARIA SPLIT( TOKEN)
        //token=token.split(" ")[1];
        //const payload= jwt.verify(token,process.env.JWT_SECRET);
        const {uuid}= jwt.verify(token,process.env.JWT_SECRET);
        // console.log('aqui:');
        // console.log(token);
        // console.log(payload);
        // console.log(req.headers);

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
