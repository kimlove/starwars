import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchInput } from "./search-input";

describe("SearchInput Component", () => {
  const mockSearchQueryHandler = jest.fn();

  const defaultProps = {
    searchQuery: "Luke",
    searchQueryQueryHandler: mockSearchQueryHandler,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with correct placeholder text", () => {
    render(<SearchInput {...defaultProps} />);
    const input = screen.getByPlaceholderText(
      "Search for Star Wars characters!"
    );
    expect(input).toBeInTheDocument();
  });

  test("displays initial search query value", () => {
    render(<SearchInput {...defaultProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Luke");
  });

  test("calls searchQueryQueryHandler on input change", () => {
    render(<SearchInput {...defaultProps} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Yoda" } });

    expect(mockSearchQueryHandler).toHaveBeenCalledTimes(1);
    expect(mockSearchQueryHandler).toHaveBeenCalledWith("Yoda");
  });
});
