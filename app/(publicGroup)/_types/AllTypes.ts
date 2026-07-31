export interface CategoryType {
  id: number;
  icon: string;
  title: string;
  total: string;
}

export interface ITechnician {
  id: string;
  name: string;
  email: string;
  activeStatus: "ACTIVE" | "BANNED";
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  createdAt: string;
  updatedAt: string;
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

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// export interface ApiResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: Service[];
//   meta: Meta;
// }
