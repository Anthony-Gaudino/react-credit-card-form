import clsx from "clsx";
import { FormEventHandler } from "react";

import InputLabel from "../InputLabel";
import styles from "./Select.module.scss";

interface SelectProps {
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
   * Input field max string length.
   */
  required?: boolean;
  /**
   * If `true` highlits the input if it's invalid.
   */
  highlightInvalid?: boolean;
  /**
   * Select options.
   */
  children: React.ReactNode;
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
 * A HTML select with a label.
 */
export const Select = (props: SelectProps): JSX.Element => {
  const {
    label,
    children,
    hideLabel = false,
    highlightInvalid = false,
    ...others
  } = props;

  const classes = clsx({
    [styles.select]: true,
    [styles["select--highlight-invalid"]]: highlightInvalid,
  });

  return (
    <InputLabel label={label} hidden={hideLabel}>
      <select className={classes} {...others}>
        {children}
      </select>
    </InputLabel>
  );
};
