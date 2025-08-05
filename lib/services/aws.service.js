"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const error_1 = require("../utils/error");
const logger_1 = __importDefault(require("../utils/logger"));
class AwsService {
    signUp = async (user) => {
        const cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        });
        const command = new client_cognito_identity_provider_1.SignUpCommand({
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
        });
        try {
            const response = await cognitoClient.send(command);
            return response;
        }
        catch (error) {
            logger_1.default.error("ERROR: ", error);
            throw new error_1.AppError("Failed to sign up user", 500);
        }
    };
    confirmSignUp = async (user) => {
        const cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        });
        const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand({
            ClientId: process.env.CLIENT_ID,
            Username: user.username,
            ConfirmationCode: user.code,
        });
        try {
            const result = cognitoClient.send(command);
            return result;
        }
        catch (err) {
            logger_1.default.error("ERROR: ", err);
            throw new error_1.AppError("Failed to confirm Sign up code", 500);
        }
    };
    signIn = async (user) => {
        const cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: process.env.region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }
        });
        const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
            ClientId: process.env.CLIENT_ID,
            AuthFlow: "USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: user.username,
                PASSWORD: user.password,
            }
        });
        try {
            const result = cognitoClient.send(command);
            return result;
        }
        catch (err) {
            logger_1.default.error("Error: ", err);
            throw new error_1.AppError("Problem Signing User In", 500);
        }
    };
}
exports.AwsService = AwsService;
//# sourceMappingURL=aws.service.js.map