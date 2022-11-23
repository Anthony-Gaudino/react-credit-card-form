import clsx from "clsx";
import { FormEventHandler } from "react";

import InputLabel from "../InputLabel";
import styles from "./TextField.module.scss";

interface TextFieldProps {
  /**
   * Type of input field.
   */
  type: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  /**
   * Input field label.
   */
  label: string;
  /**
   * If `true` hides the label. Defaults to false;
   */
  hideLabel?: boolean;
  /**
   * Input field value.
   */
  value?: string;
  /**
   * Input field pattern regex.
   */
  pattern?: string;
  /**
   * Input field max string length.
   */
  maxLength?: number;
  /**
   * Input field max string length.
   */
  minLength?: number;
  /**
   * Type of input mode.
   */
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  /**
   * Input field max string length.
   */
  required?: boolean;
  /**
   * If `true` highlits the input if it's invalid.
   */
  highlightInvalid?: boolean;
  /**
   * onChange function callback.
   */
  onChange?: FormEventHandler;
  /**
   * onFocus function callback.
   */
  onFocus?: FormEventHandler;
}

/**
 * A HTML input with a label.
 */
export const TextField = (props: TextFieldProps): JSX.Element => {
  const {
    label,
    hideLabel = false,
    highlightInvalid = false,
    ...others
  } = props;

  const classes = clsx({
    [styles.textField]: true,
    [styles["textField--highlight-invalid"]]: highlightInvalid,
  });

  return (
    <InputLabel label={label} hidden={hideLabel}>
      <input className={classes} {...others}></input>
    </InputLabel>
  );
};
