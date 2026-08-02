import React from "react";
import { getPaymentHistory } from "../_actions/getPaymentHistory";
import { getMe } from "@/shared/service/getMe";
import PaymentTableClient from "./PaymentTableClient";

const PaymentTable = async () => {
  const user = await getMe();
  const payments = await getPaymentHistory(user.data.user.id);
   console.log(payments)
  return <PaymentTableClient payments={payments} />;
};

export default PaymentTable;
