import { Router } from "express";
import { wrap } from "../utils/error";
import { UserController } from "../controllers/user-controller";
import { AuthService } from "../services/auth-service";
import { AwsService } from "../services/aws.service";
import { UserRepository } from "../repositories/user-repository";
import upload from "../middlewares/mutler-middleware";

const repository:UserRepository = new UserRepository();
const awsService:AwsService = new AwsService()
const authService:AuthService = new AuthService(awsService,repository)
const controller:UserController = new UserController(authService, awsService);
const router = Router();
router
    .post('/sign-up', upload.single('profilePhoto') ,wrap(controller.signUp))
    .post('/confirm-sign-up',wrap(controller.confirmSignUp))
    .post('/sign-in',wrap(controller.signIn))
    .post('/refresh-token',wrap(controller.refreshToken));