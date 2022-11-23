import { render, screen } from "@testing-library/react";

import InputLabel from ".";

describe("Test InputLabel component", () => {
  test("the label is correctly rendered", () => {
    const { asFragment } = render(<InputLabel label="A label" />);

    const label = screen.getByText("A label");

    expect(label).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
