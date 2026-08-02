import React from "react";
import { getTechBooking } from "../_actions/getTechBooking";
import { getMe } from "@/shared/service/getMe";
import { IBooking } from "../_types/bookingType";
import BookingTableClient from "./BookingTableClient";



const BookingTable = async () => {
  const user = await getMe();
  const bookings: IBooking[] = (await getTechBooking(user.data.user.id)) ?? [];

  return <BookingTableClient bookings={bookings} />;
};

export default BookingTable;