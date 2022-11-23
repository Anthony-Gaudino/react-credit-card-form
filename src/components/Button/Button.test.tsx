import { fireEvent, render, screen } from "@testing-library/react";

import Button from "../Button";

let clicked = false;
const clickHandler = () => (clicked = true);

describe("Test Button component", () => {
  test("the button is correctly rendered", () => {
    const { asFragment } = render(<Button>Submit</Button>);

    const buttonText = screen.getByText("Submit");

    expect(buttonText).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("handles click events", async () => {
    render(<Button onClick={clickHandler}>Submit</Button>);
    const button = screen.getByRole("button");

    await fireEvent.click(button);

    expect(clicked).toEqual(true);
  });
});
