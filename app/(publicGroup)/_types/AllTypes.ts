export interface CategoryType {
  id: number;
  icon: string;
  title: string;
  total: string;
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

export interface ITechnicianProfile {
  id: string;
  bio: string | null;
  experience: number;
  profilePhoto:string;
  skills: string[];
  userId: string;
  availabilities: IAvailability[];
}

export interface ITechnician {
  id: string;
  name: string;
  email: string;
  activeStatus: "ACTIVE" | "BANNED";
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  profile?: ITechnicianProfile;
}

export interface ICategory {
  id: string;
  name: string;
  sortDescriptoin: string;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
  categoryId: string;
  technician: ITechnician;
  category: ICategory;
}

export interface ISingleServiceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IService;
}