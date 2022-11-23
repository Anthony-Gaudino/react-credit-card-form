import { render, screen } from "@testing-library/react";

import CreditCardForm from ".";

describe("Test CreditCardForm component", () => {
  test("the form is correctly rendered", () => {
    const { asFragment } = render(<CreditCardForm />);

    const nameField = screen.getByLabelText("Card Name");
    const cardNumberField = screen.getByLabelText("Card Number");
    const monthField = screen.getByLabelText("Month");
    const yearField = screen.getByLabelText("Year");
    const cvvField = screen.getByLabelText("CVV");

    expect(nameField).toBeInTheDocument();
    expect(cardNumberField).toBeInTheDocument();
    expect(monthField).toBeInTheDocument();
    expect(yearField).toBeInTheDocument();
    expect(cvvField).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
