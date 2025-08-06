import { ConfirmSignUpCommandOutput, InitiateAuthCommandInput, InitiateAuthCommandOutput, SignUpCommandInput, SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { ConfirmSignUpDto, SignInDto, UserSignUpDto } from "../dtos/user";
import { AwsService } from "./aws.service";
import { userSignup } from "../interfaces/user-interface";
import argon2d from "argon2";
import { UserRepository } from "../repositories/user-repository";
import logger from "../utils/logger";
import { AppError } from "../utils/error";
export class AuthService {
    constructor(private readonly awsService: AwsService,
        private readonly repository: UserRepository
    ) {
        this.awsService = awsService;
        this.repository = repository;
    }
    public signUp = async (user: UserSignUpDto): Promise<SignUpCommandOutput> => {

        const userPassword = await argon2d.hash(user.password)
        const key = `users/profilePhoto/${user.username}/${user.email}`
        if (user.profilePhoto) {
            const profilePhoto = await this.awsService.uploadToS3Bucket(user.profilePhoto, key)
        }

        const createUser: userSignup = {
            email: user.email,
            username: user.username,
            password: userPassword,
            lastSeen: new Date(),
            profilePhoto: user.profilePhoto ? key : null,
            isOnline: false,
            isVerified: false,
        }

        const result = await this.awsService.signUp(user);
        await this.repository.createUser(createUser);
        return result;

    }
    public confirmSignUp = async (user: ConfirmSignUpDto): Promise<ConfirmSignUpCommandOutput> => {

        try {

            const result = await this.awsService.confirmSignUp(user);
            await this.repository.updateUserVerificationStatus(user.username, true);
            return result;

        }
        catch (error) {
            logger.error("Error: ", error)
            throw new AppError("Error confirming user sign up", 500)
        }

    }
    
}