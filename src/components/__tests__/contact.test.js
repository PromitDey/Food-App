import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactUs from "../ContactUs";

test("should load contactUs component", () => {
    //at firrst need to render it onto the jsdom
    render(<ContactUs />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
});

test("should load button inside contactUs component", () => {
    //at firrst need to render it onto the jsdom
    render(<ContactUs />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
});

test("should load text inside contactUs component", () => {
    //at firrst need to render it onto the jsdom
    render(<ContactUs />);

    const text = screen.getByText("submit"); //fails as submit2 text is not there 
    expect(text).toBeInTheDocument();
});

test("should load placeholder inside contactUs component", () => {
    render(<ContactUs />);

    const name = screen.getByPlaceholderText("name");
    expect(name).toBeInTheDocument();
});

test("should load 2 input boxes on the contactUs component", () => {
    render(<ContactUs />);

    //we use getAllByRole when there are multiple things
    const inputBoxes = screen.getAllByRole("textbox");

    //returns jsx element
    //console.log(inputBoxes);

    expect(inputBoxes.length).toBe(2);
});