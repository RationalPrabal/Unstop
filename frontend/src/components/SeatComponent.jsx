import React from "react";

export default function SeatComponent({
  seatNumber,
  rowNumber,
  _id,
  isBooked,
}) {
  return (
    <div
      className={`w-[40px] h-[40px] text-white font-bold items-center flex justify-center ${
        isBooked ? "bg-red-600" : "bg-green-600"
      }  mt-4`}
    >
      {seatNumber + (rowNumber - 1) * 7}
    </div>
  );
}
