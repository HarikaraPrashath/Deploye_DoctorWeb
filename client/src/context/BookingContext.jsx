import { createContext, useReducer } from "react";

// Context
export const BookingPlacement = createContext(); // Renamed for clarity

// Reducer
export const Booking = (state, action) => {
  switch (action.type) {
    case "SET_ORDER":
      return {
        ...state, // Spread the existing state to avoid overwriting other keys
        BookingPlacement: action.payload, // Ensure consistent state property naming
      };

    case "CREATE_ORDER":
      return {
        ...state,
        BookingPlacement: [action.payload, ...(state.BookingPlacement || [])], // Handle null initial state
      };

    case "DELETE_ORDER": // Renamed from CREATE_ORDER to DELETE_ORDER
      return {
        ...state,
        BookingPlacement: state.BookingPlacement.filter((w) => w._id !== action.payload._id),
      };

    default:
      return state;
  }
};

// Context Provider
export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Booking, {
    BookingPlacement: null, // Ensure consistent naming
  });

  return (
    <BookingPlacement.Provider value={{ ...state, dispatch }}>
      {children}
    </BookingPlacement.Provider>
  );
};