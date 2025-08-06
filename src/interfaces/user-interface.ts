export interface userSignup {
    username: string;
    password: string;
    lastSeen?: Date;
    isOnline: boolean;
    email: string;
    profilePhoto: string | null;
    isVerified: boolean;
    
}