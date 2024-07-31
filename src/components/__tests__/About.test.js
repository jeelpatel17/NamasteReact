import { render, screen } from "@testing-library/react";
import About from "../About";
import "@testing-library/jest-dom";

test("Testing the cart", async () => {
  render(<About />);

  const text = await screen.findAllByText(/Company/);
  // console.log(text);
  expect(text[0]).toBeInTheDocument();
});
