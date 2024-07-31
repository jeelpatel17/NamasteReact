import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import ResMenu from "../ResMenu";
import MOCK_DATA from "../mocks/ResMenuMock.json";
import { act } from "react-dom/test-utils";
import appStore from "../../utils/appStore";
import { Provider } from "react-redux";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import Cart from "../Cart";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

it("Should test the Add-to-Cart functionality", async () => {
  await act(async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Header />
          <ResMenu />
          <Cart />
        </BrowserRouter>
      </Provider>
    );
  });
  let category = screen.getAllByTestId("menuCategory");

  fireEvent.click(category[0]);

  let addBtn = screen.getAllByRole("button", { name: "Add +" });

  fireEvent.click(addBtn[0]);

  expect(screen.getByText("Cart(1)")).toBeInTheDocument();

  fireEvent.click(addBtn[1]);

  expect(screen.getByText("Cart(2)")).toBeInTheDocument();

  fireEvent.click(addBtn[2]);

  expect(screen.getByText("Cart(3)")).toBeInTheDocument();

  let cartItems = screen.getAllByTestId("cart-item");

  expect(cartItems.length).toBe(3);

  let removeBtn = screen.getAllByRole("button", { name: "Remove -" });

  fireEvent.click(removeBtn[0]);

  expect(screen.getAllByTestId("cart-item").length).toBe(2);

  let clearCartBtn = screen.getByRole("button", { name: "Clear Cart" });

  fireEvent.click(clearCartBtn);

  expect(screen.getByText("No Items Found! :(")).toBeInTheDocument();
});
