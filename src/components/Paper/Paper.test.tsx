import { render, screen } from "@testing-library/react";

import Paper from ".";

describe("Test Paper component", () => {
  test("the container is correctly rendered", () => {
    const { asFragment } = render(
      <Paper>
        <span>Paper content</span>
      </Paper>
    );

    const paperContent = screen.getByText("Paper content");

    expect(paperContent).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
