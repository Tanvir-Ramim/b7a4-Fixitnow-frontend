

import { getMe } from "@/shared/service/getMe";


import CustomerBookingTableClient from "./CustomerBookingTableClient";
import { IBooking } from "../../technician-dashboard/_types/bookingType";
import { getTechBooking } from "../../technician-dashboard/_actions/getTechBooking";



const TableCustomerTable = async () => {
  const user = await getMe();
  const bookings: IBooking[] = (await getTechBooking(user.data.user.id)) ?? [];

  return <CustomerBookingTableClient bookings={bookings} />;
};

export default TableCustomerTable;