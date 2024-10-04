import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterCardForm from "../components/RegisterCardForm";
import "@testing-library/jest-dom";  // This makes toBeInTheDocument available
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { selectUserFirstName, setUserFirstName } from "../utils/userSlice";
// Set up a mock store for testing
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// A helper function to wrap the component with Redux provider
const renderWithProvider = (ui: React.ReactNode) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("RegisterCardForm Component", () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    // Set a mock first name in the Redux store
    store.dispatch(setUserFirstName('John')); 
    
    renderWithProvider(<RegisterCardForm onSubmit={mockSubmit} />);
  });

  test("renders the register form and welcome message with user's first name", () => {
    expect(screen.getByText(/Welcome John/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiry Date/i)).toBeInTheDocument();
  });

  test("accepts input for card number, cvv, and expiry date", () => {
    const cardNumberInput = screen.getByPlaceholderText("1234 5678 1234 5678") as HTMLInputElement;
    const cvvInput = screen.getByPlaceholderText("123") as HTMLInputElement;
    const expiryInput = screen.getByPlaceholderText("MM/YY") as HTMLInputElement;

    fireEvent.change(cardNumberInput, { target: { value: "4111111111111111" } });
    fireEvent.change(cvvInput, { target: { value: "123" } });
    fireEvent.change(expiryInput, { target: { value: "12/25" } });

    expect(cardNumberInput.value).toBe("4111 1111 1111 1111"); // Card number is formatted
    expect(cvvInput.value).toBe("123");
    expect(expiryInput.value).toBe("12/25");
  });

  test("calls onSubmit with the card number, cvv, and expiry date on form submission", () => {
    const cardNumberInput = screen.getByPlaceholderText("1234 5678 1234 5678") as HTMLInputElement;
    const cvvInput = screen.getByPlaceholderText("123") as HTMLInputElement;
    const expiryInput = screen.getByPlaceholderText("MM/YY") as HTMLInputElement;
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(cardNumberInput, { target: { value: "4111111111111111" } });
    fireEvent.change(cvvInput, { target: { value: "123" } });
    fireEvent.change(expiryInput, { target: { value: "12/25" } });

    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      cardNumber: "4111 1111 1111 1111", // Formatted card number
      cvv: "123",
      expiry: "12/25",
    });
  });
});