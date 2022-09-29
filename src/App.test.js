import { render, screen } from "@testing-library/react";

import App from "./App";

test("Is input value a string", () => {
  render(<App />);

  const amountInput = screen.getByRole("spinbutton");

  expect(amountInput.value).toBe("1");
});

test("Are number input and select in the document", () => {
  render(<App />);

  expect(screen.getByRole("combobox")).toBeInTheDocument;
  expect(screen.getByRole("spinbutton")).toBeInTheDocument;
});

test("should display the correct number of options", () => {
  render(<App />);

  expect(screen.getAllByRole("option").length).toBe(3);
});
