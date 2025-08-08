import { CognitoIdentityProviderClient, ConfirmSignUpCommand, ConfirmSignUpCommandOutput, InitiateAuthCommand, InitiateAuthCommandOutput, SignUpCommand, SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { AppError } from "../utils/error";
import { ConfirmSignUpDto, SignInDto, UserSignUpDto } from "../dtos/user";
import logger from "../utils/logger";
import multer from "multer";
import { PutObjectCommand, PutObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";
import { connect } from "mongoose";
export class AwsService {
    public signUp = async (user: UserSignUpDto): Promise<SignUpCommandOutput> => {
        const cognitoClient = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
        })
        const command = new SignUpCommand({
            ClientId: process.env.CLIENT_ID,
            Username: user.username,
            Password: user.password,
            UserAttributes: [
                {
                    Name: "email",
                    Value: user.email,
                },
                {
                    Name: "username",
                    Value: user.username,
                }

            ]
        })
        try {
            const response = await cognitoClient.send(command);
            return response;
        }
        catch (error) {
            logger.error("ERROR: ", error)
            throw new AppError("Failed to sign up user", 500);
        }

    }

    public confirmSignUp = async (user: ConfirmSignUpDto): Promise<ConfirmSignUpCommandOutput> => {
        const cognitoClient = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
        })
        const command = new ConfirmSignUpCommand({
            ClientId: process.env.CLIENT_ID,
            Username: user.username,
            ConfirmationCode: user.code,



        })
        try {
            const result = cognitoClient.send(command);
            return result;
        }
        catch (err) {
            logger.error("ERROR: ", err)
            throw new AppError("Failed to confirm Sign up code", 500);
        }
    }

    public signIn = async(user:SignInDto):Promise<InitiateAuthCommandOutput> => {
        const cognitoClient = new CognitoIdentityProviderClient({
            region: process.env.region!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_KEY!,
            }
        })
        const command = new InitiateAuthCommand({
            ClientId: process.env.CLIENT_ID!,
            AuthFlow: "USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: user.username,
                PASSWORD: user.password,
            }
        })
        try{
            const result = cognitoClient.send(command)
            return result;
        }
        catch(err){
            logger.error("Error: ",err);
            throw new AppError("Problem Signing User In", 500);
        }
    }

    public uploadToS3Bucket = async(file:Express.Multer.File, key:string):Promise<PutObjectCommandOutput> => {
        const bucketName = process.env.AWS_BUCKET_NAME;
        const s3 = new S3Client({
            region: process.env.AWS_REGION!,
            credentials :{
                accessKeyId: process.env.ACESSS_KEY_ID!,
                secretAccessKey: process.env.SECRET_ACESS_KEY!
            }
        })
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        try{
        const putCommand = new PutObjectCommand(params)
        const result = await s3.send(putCommand)
        return result;
        }
        catch(error){
            logger.error("Error: ",error)
            throw new AppError("Error while uploading file", 500);
        }

    }
    public refreshUserToken = async(refreshToken:string):Promise<InitiateAuthCommandOutput> => {
try{
        const clientId = process.env.AWS_CLIENT_ID
        const cognitoClient = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.SECRET_ACCESS_KEY!
            }
        })
        const command = new InitiateAuthCommand({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
            },
            ClientId: clientId
        })
        const newToken = await cognitoClient.send(command);
        if(!newToken){
            throw new AppError("Error Refreshing User Token", 500);
        }
        return newToken;
    }
    catch(err){
        logger.error("ERROR refreshing user token :",err)
        throw new AppError("Internal Server Error", 500);
    }

    }
}