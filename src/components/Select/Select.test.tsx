import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from ".";

describe("Test Select component", () => {
  test("the select input is correctly rendered", () => {
    const { asFragment } = render(
      <Select label="My select">
        <option value="" disabled>
          Pick one
        </option>
        <option value="1">Option one</option>
        <option value="2">Option two</option>
      </Select>
    );

    const select = screen.getByText("Pick one");
    const option1 = screen.getByText("Option one");

    expect(select).toBeInTheDocument();
    expect(option1).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("handles click events", async () => {
    render(
      <Select label="My select">
        <option value="" disabled>
          Pick one
        </option>
        <option value="1">Option one</option>
        <option value="2">Option two</option>
      </Select>
    );

    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "Option one" })
    );

    const selectedOption = screen.getByRole("option", {
      name: "Option one",
    }) as HTMLOptionElement;

    expect(selectedOption.selected).toBe(true);
  });
});
