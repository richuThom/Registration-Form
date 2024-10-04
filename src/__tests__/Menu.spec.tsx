import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu from "../components/Menu";

describe("Menu Component", () => {
  beforeEach(() => {
    render(<Menu />);
  });

  test("renders the header with the correct title", () => {
    const headerElement = screen.getByText(/menu/i); // Check for the title "Menu"
    expect(headerElement).toBeInTheDocument();
  });

  test("renders the menu content", () => {
    const menuContent = screen.getByText(/this is menu content/i); // Check for menu content
    expect(menuContent).toBeInTheDocument();
  });
});
