import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./button";

describe("Button Component", () => {
  test("renders children correctly", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  test("calls onClick handler when clicked and not disabled", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick handler when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("has the correct styles when disabled", () => {
    render(
      <Button onClick={() => {}} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "disabled:opacity-50 disabled:cursor-not-allowed"
    );
    expect(button).toBeDisabled();
  });
});
