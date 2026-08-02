"use client";

import React from "react";
import { IPayment } from "../_type/paymentType";

const statusStyles: Record<string, { dot: string; text: string }> = {
  SUCCEEDED: { dot: "bg-green-500", text: "text-green-700" },
  PENDING: { dot: "bg-yellow-500", text: "text-yellow-700" },
  FAILED: { dot: "bg-red-500", text: "text-red-700" },
  REFUNDED: { dot: "bg-blue-500", text: "text-blue-700" },
  CANCELLED: { dot: "bg-gray-400", text: "text-gray-600" },
};

const formatAmount = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "BDT",
    currencyDisplay: "narrowSymbol",
  }).format(amount);

const PaymentTableClient = ({ payments }: { payments: IPayment[] }) => {
  return (
    <div className="w-full min-h-[54vh] mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm customescroll">
      <table className="w-full min-w-275 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-4">Booking</th>
            <th className="p-4">Technician</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Payment Method</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4">Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => {
              const status =
                statusStyles[payment.status] ?? statusStyles.PENDING;

              return (
                <tr
                  key={payment.id}
                  className="border-t border-gray-200 transition hover:bg-gray-50 text-sm"
                >
                  <td className="p-4">
                    <div
                      className="font-medium text-gray-900 max-w-[180px] truncate"
                      title={payment.booking.address}
                    >
                      {payment.booking.address}
                    </div>
                    <div
                      className="text-gray-500 text-xs max-w-[180px] truncate"
                      title={payment.booking.customerNotes}
                    >
                      {payment.booking.customerNotes || "—"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {payment.booking.technician.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {payment.booking.technician.email}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {formatAmount(payment.amount, payment.currency)}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${status.dot}`}
                      />
                      <span className={`text-xs font-medium ${status.text}`}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className="font-mono text-xs text-gray-600 truncate block max-w-[220px]"
                      title={payment.transactionId}
                    >
                      {payment.transactionId}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="py-10 text-center text-gray-500">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTableClient;
