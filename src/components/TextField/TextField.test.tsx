import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextField from ".";

describe("Test TextField component", () => {
  test("the text field is correctly rendered", () => {
    const { asFragment } = render(<TextField type="text" label="A label" />);

    const label = screen.getByText("A label");

    expect(label).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("can enter text into field", () => {
    const input = "Hello World";

    render(<TextField type="text" label="A label" />);

    const field = screen.getByRole("textbox") as HTMLInputElement;

    userEvent.type(field, input);

    expect(field.value).toBe(input);
  });
});
