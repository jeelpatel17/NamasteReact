import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import Shimmer from "./components/Shimmer";
import ResMenu from "./components/ResMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import About from "./components/About";
// const ResMenu = lazy(() => import("./components/ResMenu"));

const AppLayout = () => {
  let { city_name, user } = useContext(UserContext);
  const [city, setCity] = React.useState(city_name);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ city_name: city, user: "Jack", setCity }}>
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restaurants/:resCity",
        children: [
          {
            path: ":resName",
            children: [
              {
                path: ":entity",
                element: (
                  <Suspense fallback={<Shimmer />}>
                    <ResMenu />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/About",
        element: <About />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
