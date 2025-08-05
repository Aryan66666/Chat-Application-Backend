import { CognitoIdentityProviderClient, ConfirmSignUpCommand, ConfirmSignUpCommandOutput, InitiateAuthCommand, InitiateAuthCommandOutput, SignUpCommand, SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { AppError } from "../utils/error";
import { ConfirmSignUpDto, SignInDto, UserSignUpDto } from "../dtos/user";
import logger from "../utils/logger";

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
}