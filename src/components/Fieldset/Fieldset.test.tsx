import { render, screen } from "@testing-library/react";

import TextField from "../TextField";
import Fieldset from ".";

describe("Test fieldset component", () => {
  test("the fieldset is correctly rendered", () => {
    const { asFragment } = render(
      <Fieldset legend="A legend">
        <TextField type="text" label="A label" />
      </Fieldset>
    );

    const fieldsetLegend = screen.getByText("A legend");
    const textFieldLabel = screen.getByText("A label");

    expect(fieldsetLegend).toBeInTheDocument();
    expect(textFieldLabel).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
