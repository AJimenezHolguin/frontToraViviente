import { RoleProps } from "@/types/roles.enum";

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

  export interface registerUser {
    _id: string;
    name: string;
    email: string;
    role: RoleProps;
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
    role: RoleProps;
  }
  
  export interface RegisterPublicResponse {
    user: registerUser;
    token: string;
  }
  
  export interface RegisterAdminResponse {
    message?:string;
    user: registerUser;
  }

export interface ChangeUserRole {
  userId: string;
  newRole: RoleProps;
}

export interface ChangeUserRoleResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: RoleProps;
  };
}
  