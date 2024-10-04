import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  const mockToggleContent = jest.fn(); // Mock function for toggling content

  test("renders the User Card Form title and burger icon when not on Menu page", () => {
    render(<Header isMenu={false} toggleContent={mockToggleContent} />);

    // Expect to see the title "User Card Form"
    expect(screen.getByText("User Card Form")).toBeInTheDocument();

    // Expect the burger icon to be present (Menu icon)
    const burgerIcon = screen.getByTestId("burger-icon");
    expect(burgerIcon).toBeInTheDocument();

    // Simulate a click on the burger icon
    fireEvent.click(burgerIcon);

    // Ensure the toggleContent function is called when the burger icon is clicked
    expect(mockToggleContent).toHaveBeenCalled();
  });

  test("renders the Menu title and back icon when on Menu page", () => {
    render(<Header isMenu={true} toggleContent={mockToggleContent} />);

    // Expect to see the title "Menu"
    expect(screen.getByText("Menu")).toBeInTheDocument();

    // Expect the back icon to be present
    const backIcon = screen.getByTestId("back-icon");
    expect(backIcon).toBeInTheDocument();

    // Simulate a click on the back icon
    fireEvent.click(backIcon);

    // Ensure the toggleContent function is called when the back icon is clicked
    expect(mockToggleContent).toHaveBeenCalled();
  });
});
