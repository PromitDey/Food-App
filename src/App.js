import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/Header"; //named import
//import About from "./components/About";
import Body from "./components/Body";
import Error from "./components/Error";
import Cart from "./components/Cart.js";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext.js";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import ContactUs from "./components/ContactUs.js";

//optimizing - code splitting/lazy loading
const About = lazy(() => {
  return import("./components/About");
});

const AppLayout = () => {
  //Authentication Code
  const [userName, setUserName] = useState();

  useEffect(() => {
    //some API call to get user name
    const data = {
      name: "Promit Dey",
    };
    setUserName(data.name);
  }, []);
  //console.log(userName);

  return (
    //Redux Store
    <Provider store={appStore}>
      {/* default user */}
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        {/* Promit Dey */}
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

//react router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading .... About page</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
