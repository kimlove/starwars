import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "./pagination";

describe("Pagination Component", () => {
  const defaultProps = {
    count: 100,
    itemsPerPage: 10,
    next: "next-page-url",
    page: 1,
    previous: null,
    status: "idle",
    updatePageHandler: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders current page and total pages correctly", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText("Page:")).toBeInTheDocument();
    expect(screen.getByText("1 / 10")).toBeInTheDocument(); // totalPages should be 10
  });

  test("calls updatePageHandler with previous page number when previous button is clicked", () => {
    render(<Pagination {...defaultProps} page={2} previous="prev-page-url" />);
    const prevButton = screen.getByRole("button", { name: /previous/i });

    fireEvent.click(prevButton);

    expect(defaultProps.updatePageHandler).toHaveBeenCalledWith(1); // Should navigate to previous page
  });

  test("calls updatePageHandler with next page number when next button is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.click(nextButton);

    expect(defaultProps.updatePageHandler).toHaveBeenCalledWith(2); // Should navigate to next page
  });

  test("disables previous button on the first page", () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByRole("button", { name: /previous/i });

    expect(prevButton).toBeDisabled();
  });

  test("disables next button on the last page", () => {
    render(
      <Pagination
        {...defaultProps}
        page={10}
        next={null} // Last page
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(nextButton).toBeDisabled();
  });

  test("does not call updatePageHandler when status is 'loading'", () => {
    render(<Pagination {...defaultProps} isLoading />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    const prevButton = screen.getByRole("button", { name: /previous/i });

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    expect(defaultProps.updatePageHandler).not.toHaveBeenCalled();
  });
});
