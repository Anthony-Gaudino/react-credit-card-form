import clsx from "clsx";
import { MouseEventHandler } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  /**
   * If `true` the button will take the full width fo it's parent.
   */
  fullWidth?: boolean;
  /**
   * Button children.
   */
  children: React.ReactNode;
  /**
   * Button onClick callback.
   */
  onClick?: MouseEventHandler;
}

/**
 * A HTML button.
 */
export const Button = (props: ButtonProps): JSX.Element => {
  const { fullWidth = false, children, ...others } = props;

  const classes = clsx({
    [styles.button]: true,
    [styles["button--full-width"]]: fullWidth,
  });

  return (
    <button className={classes} {...others}>
      {children}
    </button>
  );
};
