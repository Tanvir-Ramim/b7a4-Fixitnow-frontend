
export interface ICategory {
  id: string;
  name: string;
  sortDescriptoin: string;
  createdAt: string;
  updatedAt: string;
}



export interface IUserProfile {
  id: string;
  profilePhoto?: string | null;
  bio: string | null;
  experience: number;
  skills: string[];
  userId: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  activeStatus: "ACTIVE" | "BANNED";
  role: "TECHNICIAN" | "ADMIN" | "CUSTOMER";
  createdAt: string;
  updatedAt: string;
  profile: IUserProfile;
}