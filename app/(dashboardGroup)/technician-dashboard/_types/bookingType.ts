export type ITechnicianAcceptStatus =
  | "CANCEL"
  | "INPROGRESS"
  | "ACCPECT"

export interface IBookingTime {
  id: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  isSlotActive: boolean;
  createdAt: string;
  updatedAt: string;
  profileId: string;
}

export interface IBookingService {
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
}

export interface IBookingUser {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBooking {
  id: string;
  bookingTimeId: string;
  customerNotes: string;
  technicianNotes: string | null;
  address: string;
  technicianAccept: ITechnicianAcceptStatus;
  isComplete: boolean;
  isPayment: boolean;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingTime: IBookingTime;
  service: IBookingService;
  customer: IBookingUser;
  technician: IBookingUser;
}