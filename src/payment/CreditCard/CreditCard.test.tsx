import { render, screen } from "@testing-library/react";

import CreditCard from ".";

describe("Test CreditCard component", () => {
  test("the widget is correctly rendered", () => {
    const { asFragment } = render(
      <CreditCard
        name="John Doe"
        cardNumber="4000000000000000"
        printedCardNumber="4000 0000 0000 0000"
        month="01"
        year="2025"
        cvv="123"
        cardClickHandler={() => {}}
      />
    );

    const name = screen.getByText("John Doe");
    const cardNumber = screen.getByText("4000 0000 0000 0000");
    const expireDate = screen.getByText("01/25");
    const cvv = screen.getByText("123");

    expect(name).toBeInTheDocument();
    expect(cardNumber).toBeInTheDocument();
    expect(expireDate).toBeInTheDocument();
    expect(cvv).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
