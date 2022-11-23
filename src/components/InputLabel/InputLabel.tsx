import clsx from "clsx";

import styles from "./InputLabel.module.scss";

interface InputLabelProps {
  /**
   * Label text.
   */
  label: string;
  /**
   * If `true` the label is hidden.
   */
  hidden?: boolean;
  /**
   * Label children.
   */
  children?: React.ReactNode;
}

/**
 * A HTML label that can have an input element as children.
 */
export const InputLabel = (props: InputLabelProps): JSX.Element => {
  const { label, children, hidden = false } = props;

  const classes = clsx({
    [styles.inputLabel]: true,
    [styles["inputLabel--hidden"]]: hidden,
  });

  return (
    <label className={classes}>
      {label}
      {children}
    </label>
  );
};
