import clsx from "clsx";

import Paper from "../../components/Paper";
import smartChip from "../../img/smart_chip.svg";
import styles from "./CreditCard.module.scss";

const getIssuer = (cardNumber: string): string => {
  const firstDigit = +cardNumber.substring(0, 1);
  const first2Digits = +cardNumber.substring(0, 2);
  const first3Digits = +cardNumber.substring(0, 3);
  const first4Digits = +cardNumber.substring(0, 4);
  const first6Digits = +cardNumber.substring(0, 6);

  // 6 Digits
  //=========================================================================
  if (
    (first6Digits >= 506099 && first6Digits <= 506198) ||
    (first6Digits >= 650002 && first6Digits <= 650027) ||
    (first6Digits >= 507865 && first6Digits <= 507964)
  ) {
    return "verve";
  }

  if ([676770, 676774].includes(first6Digits)) {
    return "maestro";
  }

  if (first6Digits === 417500) {
    return "visaelectron";
  }

  if (first6Digits >= 622126 && first6Digits <= 622925) {
    return "unionpay";
  }

  // 4 Digits
  //=========================================================================

  if (
    [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763].includes(
      first4Digits
    )
  ) {
    return "maestro";
  }

  if ([4026, 4508, 4844, 4913, 4917].includes(first4Digits)) {
    return "visaelectron";
  }

  if (first4Digits >= 3528 && first4Digits <= 3589) {
    return "jcb";
  }

  if (first4Digits === 6011) {
    return "discover";
  }

  if (first4Digits >= 2221 && first4Digits <= 2720) {
    return "mastercard";
  }

  if (first4Digits === 9792) {
    return "troy";
  }

  // 3 Digits
  //=========================================================================

  if (first3Digits >= 644 && first3Digits <= 649) {
    return "discover";
  }

  // 2 Digits
  //=========================================================================

  if ([34, 37].includes(first2Digits)) {
    return "amex";
  }

  if ([31, 62].includes(first2Digits)) {
    return "unionpay";
  }

  if ([36, 54].includes(first2Digits)) {
    return "diners";
  }

  if (first2Digits === 65) {
    return "discover";
  }

  if (first2Digits >= 51 && first2Digits <= 55) {
    return "mastercard";
  }

  if (first2Digits === 65) {
    return "troy";
  }

  // 1 Digit
  //=========================================================================
  if (firstDigit === 4) {
    return "visa";
  }

  // Unknown
  //=========================================================================
  return "other";
};

interface CreditCardProps {
  /**
   * Card owner name as it's printed on card.
   */
  name: string;
  /**
   * The card number without any spaces between numbers.
   */
  cardNumber: string;
  /**
   * The card number as it's printed on card.
   */
  printedCardNumber: string;
  /**
   * The card's expiration month.
   */
  month: string;
  /**
   * The card's expiration year.
   */
  year: string;
  /**
   * The card's CVV code.
   */
  cvv: string;
  /**
   * If `true` shows the back of the card.
   */
  showBack?: boolean;
  /**
   * Callback for card click or keypress.
   */
  cardClickHandler: () => void;
}

/**
 * A credit card widged that can be flipped.
 */
export const CreditCard = (props: CreditCardProps): JSX.Element => {
  const {
    name,
    cardNumber,
    printedCardNumber,
    month,
    year,
    cvv,
    showBack = false,
    cardClickHandler,
  } = props;

  const issuer = getIssuer(cardNumber);
  const issuerLogo = require(`../../img/logos/${issuer}.svg`);
  const cardMonth = month ? month : "MM";
  const cardYear = year ? year.slice(2) : "YY";

  const classes = clsx({
    [styles.creditCard__paper]: true,
    [styles["creditCard__paper--flipped"]]: showBack,
  });

  const onCardClickHandler = () => cardClickHandler();

  const cardKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") cardClickHandler();
  };

  return (
    <div
      className={styles.creditCard}
      onClick={onCardClickHandler}
      role="button"
      tabIndex={-1}
      onKeyPress={cardKeyPressHandler}
    >
      <Paper elevation={6} className={classes}>
        <div
          className={`${styles.creditCard__surface} ${styles["creditCard__surface--front"]}`}
        >
          <div className={styles.creditCard__contentWrapper}>
            <div className={styles.creditCard__row}>
              <img className={styles.creditCard__chip} src={smartChip} alt="" />
              <img
                className={styles.creditCard__issuer}
                src={issuerLogo}
                alt=""
              />
            </div>
            <div className={styles.creditCard__row}>
              <span className={styles.creditCard__number}>
                {printedCardNumber}
              </span>
            </div>
            <div className={styles.creditCard__row}>
              <div className={styles.creditCard__info}>
                <div className={styles.creditCard__infoTitle}>Card Holder</div>
                <div className={styles.creditCard__infoContent}>{name}</div>
              </div>
              <div className={styles.creditCard__info}>
                <div className={styles.creditCard__infoTitle}>Expires</div>
                <div className={styles.creditCard__infoContent}>
                  {cardMonth}/{cardYear}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.creditCard__surface} ${styles["creditCard__surface--back"]}`}
        >
          <div className={styles.creditCard__contentWrapper}>
            <div className={styles.creditCard__magneticTape} />
            <div className={styles.creditCard__signatureAndCVVWrapper}>
              <div className={styles.creditCard__CVVTitle}>CVV</div>
              <div className={styles.creditCard__CVVField}>
                <span>{cvv}</span>
              </div>
            </div>
            <div
              className={`${styles.creditCard__row} ${styles["creditCard__row--right"]}`}
            >
              <img
                className={styles.creditCard__issuer}
                src={issuerLogo}
                alt=""
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};
