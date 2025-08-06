import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import { AwsService } from "../services/aws.service";
import { plainToInstance } from "class-transformer";
import { ConfirmSignUpDto, SignInDto, UserSignUpDto } from "../dtos/user";
import validateDto from "../utils/validate";
import sendResponse from "../utils/response";

export class UserController {
    constructor(private readonly authService:AuthService, 
        private readonly awsService: AwsService
    ){
        this.authService = authService;
        this.awsService = awsService;
    }
    signUp = async(req:Request, res:Response, next:NextFunction): Promise<Response> => {

        const model = plainToInstance(UserSignUpDto, req.body);
        await validateDto(model,next)
        model.profilePhoto = req?.file??null;
        const result = this.authService.signUp(model)
        return sendResponse(res,201,result,"User Signed In Successfully");
    }
    confirmSignUp = async(req:Request, res:Response, next: NextFunction): Promise<Response> => {
        const model = plainToInstance(ConfirmSignUpDto, req.body);
        await validateDto(model,next)
        const result = this.authService.confirmSignUp(model);
        return sendResponse(res,200,result,"SignUp Up Confirmed Successfully");
    }
    signIn = async(req:Request, res:Response, next: NextFunction): Promise<Response> => {
        const model = plainToInstance(SignInDto, req.body)
        await validateDto(model,next)
        const result = this.awsService.signIn(model);
        return sendResponse(res, 200, result, "User Signed In Successfully")

    }

}