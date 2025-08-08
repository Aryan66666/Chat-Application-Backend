import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { AppError } from "../utils/error";
import axios from "axios";
import jwktopem from 'jwk-to-pem';
export async function userAuthentication(req:Request, res:Response, next:NextFunction){
    try{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        throw new AppError("No authentication provided", 400);
    }
    const decodedToken = jwt.decode(token,{complete:true});
    if(!decodedToken){
        throw new AppError("Error while authenticating user", 500);
    }
    const kid = decodedToken.header.kid;
    const jwks = process.env.AWS_JWKS;
    if(!jwks){
        throw new AppError("Internal Server Error", 500);
    }
    const jwksData = await axios.get(jwks);
    let jwksJson = jwksData.data.keys;
    const jwk = jwksJson.find((data:any) => data.kid === kid)
    const pemJwk = jwktopem(jwk);
    const userInfo = jwt.verify(token,pemJwk, {
        algorithms:['RS256'],
        issuer:process.env.AWS_JWKS,
        audience: process.env.AWS_CLIENT_ID
    });
    if(typeof userInfo === 'string'){
        throw new AppError("Malinformed jwt payload", 500)
    }
    return userInfo;
}
catch(error){
    next(error);
}

    




}