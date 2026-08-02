export interface PaymentTechnician {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentBooking {
  id: string;
  bookingTimeId: string;
  customerNotes: string;
  technicianNotes: string | null;
  address: string;
  technicianAccept: string;
  isComplete: boolean;
  isPayment: boolean;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  technician: PaymentTechnician;
}

export type PaymentStatus =
  | "SUCCEEDED"
  | "PENDING"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export interface IPayment {
  id: string;
  transactionId: string;
  paymentIntentId: string;
  stripeCustomerId: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  receiptUrl: string | null;
  refundId: string | null;
  paidAt: string | null;
  refundedAt: string | null;
  createdAt: string;
  updatedAt: string;
  bookingId: string;
  userId: string;
  booking: PaymentBooking;
}