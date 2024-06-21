import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "../Header.js";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("should render header component with a login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //usefull if there are multiple buttons on the component
  const loginButton = screen.getByRole("button", { name: "Login" });

  //const loginButton = screen.getByText("Login");

  expect(loginButton).toBeInTheDocument();
});

it("should render header component with cart items as 0", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //usefull if there are multiple buttons on the component
  const cartItems = screen.getByText("Cart (0 Items)");

  //const loginButton = screen.getByText("Login");

  expect(cartItems).toBeInTheDocument();
});

it("should render header component with a cart", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  //here we can see that we can pass regex, that means it needn't to be the exact string
  const cart = screen.getByText(/Cart/);

  //const loginButton = screen.getByText("Login");

  expect(cart).toBeInTheDocument();
});

it("should change login to logout on click", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: "Login" });

  //with this we can see how to interact with buttons using fireevent in test cases to simulate
  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole("button", { name: "Logout" });

  expect(logoutButton).toBeInTheDocument();
});
