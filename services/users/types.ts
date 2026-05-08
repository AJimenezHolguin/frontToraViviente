
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
  