import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Body from "../Body";
import Header from "../Header";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import MOCK_DATA from "../mocks/resListData.json";
import { act } from "react-dom/test-utils";
import React from "react";
import UserContext from "../../utils/UserContext";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should test the searchbar", async () => {
  const setCity = jest.fn();
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce((city) => [city, setCity]);

  await act(async () =>
    render(
      <UserContext.Provider
        value={{ city_name: "Vadodara", user: "Jack", setCity }}
      >
        <Provider store={appStore}>
          <BrowserRouter>
            <Header />
            <Body />
          </BrowserRouter>
        </Provider>
      </UserContext.Provider>
    )
  );

  let searchBar = screen.getByTestId("searchInput");
  let searchBtn = screen.getByRole("button", { name: "Search" });

  fireEvent.change(searchBar, { target: { value: "Anand" } });

  act(() => fireEvent.click(searchBtn));

  const cards = screen.getAllByTestId("ResCard");

  expect(cards.length).toBe(9);
});
