export declare class UserSignUpDto {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePhoto?: string;
    lastSeen?: Date;
    isOnline?: boolean;
}
export declare class ConfirmSignUpDto {
    username: string;
    code: string;
}
export declare class SignInDto {
    username: string;
    password: string;
}
//# sourceMappingURL=user.d.ts.map