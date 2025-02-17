import{ useContext } from "react";
import { BookingPlacement } from "../context/BookingContext"; // Import with consistent naming

export const useBookingPlacement = () => {
  const context = useContext(BookingPlacement); // Use consistent naming

  if (!context) {
    throw Error("useBookingPlacement must be used inside an BookingPlacement provider");
  }

  return context;
};