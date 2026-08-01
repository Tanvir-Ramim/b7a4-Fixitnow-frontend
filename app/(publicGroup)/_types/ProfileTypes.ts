export interface IUserResponse {
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  activeStatus: "ACTIVE" | "INACTIVE";
  role: "TECHNICIAN" | "CUSTOMER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  profile: IProfile;
}

export interface IProfile {
  id: string;
  profilePhoto: string;
  bio: string;
  experience: number;
  skills: string[];
  userId: string;
  availabilities: IAvailability[];
}

export interface IAvailability {
  id: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  isSlotActive: boolean;
  createdAt: string;
  updatedAt: string;
  profileId: string;
}