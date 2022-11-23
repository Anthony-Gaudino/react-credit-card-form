import { useState } from "react";

import Button from "../../components/Button";
import Fieldset from "../../components/Fieldset";
import Paper from "../../components/Paper";
import Select from "../../components/Select";
import TextField from "../../components/TextField";
import CreditCard from "../CreditCard";
import styles from "./CreditCardForm.module.scss";

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Builds a list of select options.
 *
 * @param n - The option index number.
 * @param val - The option value.
 * @param defaultText - The default select text (first item).
 *
 * @returns A select option.
 */
const buildList = (n: number, val: string, defaultText: string) => (
  <option key={n} value={n === 0 ? "" : val} disabled={n === 0}>
    {n === 0 ? defaultText : val}
  </option>
);

/**
 * Month picker options (1 to 12).
 */
const monthOptions = [...Array(13).keys()].map((n) =>
  buildList(n, n.toString().padStart(2, "0"), "Month")
);

/**
 * Year picker options, from current year to current +10 years.
 */
const yearOptions = (() =>
  [...Array(11).keys()].map((n) =>
    buildList(n, (CURRENT_YEAR + n - 1).toString(), "Year")
  ))();

/**
 * A form to enter credit card details.
 */
export const CreditCardForm = (): JSX.Element => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberMasked, setCardNumberMasked] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [triedSubmmitForm, setTriedSubmmitForm] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const onNameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onCardNumberChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const plainNumber = e.currentTarget.value.replace(/[^0-9]/g, "");

    setCardNumber(plainNumber);
    setCardNumberMasked(plainNumber.replace(/\d{4}(?=.)/g, "$& "));
  };

  const onCvvChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCvv(e.currentTarget.value.replace(/[^0-9]/g, ""));
  };

  const onMonthChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.currentTarget.value);
  };

  const onYearChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedYear(e.currentTarget.value);
  };

  const onFrontCardFieldFocus = () => setShowBack(false);

  const onBackCardFieldFocus = () => setShowBack(true);

  const onCardClickHandler = () => setShowBack(!showBack);

  const onSubmitButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!triedSubmmitForm) setTriedSubmmitForm(true);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const values = {
      name,
      cardNumber,
      cvv,
      month: selectedMonth,
      year: selectedYear,
    };

    // Do something with `values`...
  };

  return (
    <div className={styles.creditCardForm}>
      <CreditCard
        name={name}
        cardNumber={cardNumber}
        printedCardNumber={cardNumberMasked}
        month={selectedMonth}
        year={selectedYear}
        cvv={cvv}
        showBack={showBack}
        cardClickHandler={onCardClickHandler}
      />
      <Paper elevation={6}>
        <form className={styles.creditCardForm__form} onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="Card Number"
            value={cardNumberMasked}
            required
            minLength={16}
            maxLength={23}
            inputMode="numeric"
            pattern="[0-9 ]+"
            highlightInvalid={triedSubmmitForm}
            onChange={onCardNumberChangeHandler}
            onFocus={onFrontCardFieldFocus}
          />
          <TextField
            type="text"
            label="Card Name"
            value={name}
            required
            minLength={3}
            maxLength={22}
            highlightInvalid={triedSubmmitForm}
            onChange={onNameChangeHandler}
            onFocus={onFrontCardFieldFocus}
          />
          <div
            className={`${styles.creditCardForm__inline} ${styles["creditCardForm__inline--large"]}`}
          >
            <div className={styles["creditCardForm__expiration-date-wrapper"]}>
              <Fieldset legend="Expiration Date">
                <div className={styles.creditCardForm__inline}>
                  <Select
                    label="Month"
                    hideLabel={true}
                    value={selectedMonth}
                    required
                    highlightInvalid={triedSubmmitForm}
                    onChange={onMonthChangeHandler}
                    onFocus={onFrontCardFieldFocus}
                  >
                    {monthOptions}
                  </Select>
                  <Select
                    label="Year"
                    hideLabel={true}
                    value={selectedYear}
                    required
                    highlightInvalid={triedSubmmitForm}
                    onChange={onYearChangeHandler}
                    onFocus={onFrontCardFieldFocus}
                  >
                    {yearOptions}
                  </Select>
                </div>
              </Fieldset>
            </div>
            <div className={styles["creditCardForm__cvv-wrapper"]}>
              <TextField
                type="text"
                label="CVV"
                value={cvv}
                required
                minLength={3}
                maxLength={4}
                inputMode="numeric"
                pattern="[0-9]+"
                highlightInvalid={triedSubmmitForm}
                onChange={onCvvChangeHandler}
                onFocus={onBackCardFieldFocus}
              />
            </div>
          </div>
          <div className={styles["creditCardForm__submit-button-wrapper"]}>
            <Button fullWidth onClick={onSubmitButtonClickHandler}>
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};
