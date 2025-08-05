import { ConfirmSignUpCommandOutput, InitiateAuthCommandOutput, SignUpCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { ConfirmSignUpDto, SignInDto, UserSignUpDto } from "../dtos/user";
export declare class AwsService {
    signUp: (user: UserSignUpDto) => Promise<SignUpCommandOutput>;
    confirmSignUp: (user: ConfirmSignUpDto) => Promise<ConfirmSignUpCommandOutput>;
    signIn: (user: SignInDto) => Promise<InitiateAuthCommandOutput>;
}
//# sourceMappingURL=aws.service.d.ts.map