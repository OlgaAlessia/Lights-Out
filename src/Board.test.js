import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";


// smoke test
test("renders without crashing", function () {
  render(<Board />);
});

// snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<Board chanceLightStartsOn={2} />);
  expect(asFragment()).toMatchSnapshot();
});

test("handles clicks of Cell", function() {
const { getByText } = render(<App />);
const heading = getByText(""); //cell

  // click on the button
  //fireEvent.click(getByText("Add"));

  // is the count different?
  expect(heading).toHaveTextContent("1");
  expect(heading).not.toHaveTextContent("0");
});


