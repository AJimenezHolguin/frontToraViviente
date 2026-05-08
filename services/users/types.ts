
export interface ChangePasswordParams {
    newPassword: string;
}

export interface ReactiveAndInactiveUserResponse {
    message: string;
}

export interface ResetPasswordForAdmin {
    email: string;
    newPassword: string;
  }
  
  export interface ResetPasswordForAdminResponse {
    message: string;
  }

  export enum UserRole {
    ADMIN = "admin",
    MUSICIAN = "musician",
    USER = "user",
  }
  
  export interface registerUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    mustChangePassword: boolean;
    playlists: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RegisterPublicPayload {
    name: string;
    email: string;
    password: string;
  }
  
  export interface RegisterAdminPayload
    extends RegisterPublicPayload {
    role: UserRole;
  }
  
  export interface RegisterPublicResponse {
    user: registerUser;
    token: string;
  }
  
  export interface RegisterAdminResponse {
    user: registerUser;
  }
  