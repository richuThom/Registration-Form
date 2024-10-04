import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import store from "../utils/store";
import App from "../app";

describe("App Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("initially renders the 'User Card Form' and the burger icon", () => {
    // Expect "User Card Form" to be in the document
    expect(screen.getByText("User Card Form")).toBeInTheDocument();

    // Check if the burger icon is present
    const burgerIcon = screen.getByTestId("burger-icon");
    expect(burgerIcon).toBeInTheDocument();
  });

  test("toggles to 'Menu' when the burger icon is clicked", () => {
    // Simulate a click on the burger icon
    const burgerIcon = screen.getByTestId("burger-icon");
    fireEvent.click(burgerIcon);

    // Expect the "Menu" title to be present after clicking the burger icon
    expect(screen.getByText("Menu")).toBeInTheDocument();

    // Expect the "Menu" content to be present
    expect(screen.getByText("This is menu content")).toBeInTheDocument();
  });

  test("toggles back to 'User Card Form' when the back icon is clicked", () => {
    // First, click the burger icon to switch to "Menu"
    const burgerIcon = screen.getByTestId("burger-icon");
    fireEvent.click(burgerIcon);

    // Now, click the back icon to go back to "User Card Form"
    const backIcon = screen.getByTestId("back-icon");
    fireEvent.click(backIcon);

    // Expect the "User Card Form" title to be back in the document
    expect(screen.getByText("User Card Form")).toBeInTheDocument();

    // Expect the form content to be present
    expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiry Date/i)).toBeInTheDocument();
  });
});
