import styles from "./Paper.module.scss";

interface PaperProps {
  /**
   * Paper elevation.
   * Higher elevations has larger shadows.
   */
  elevation?: number;
  /**
   * Paper additional classes.
   */
  className?: string;
  /**
   * Paper children.
   */
  children?: React.ReactNode;
}

/**
 * A Google Material style paper container.
 */
export const Paper = (props: PaperProps): JSX.Element => {
  const { elevation = 0, className: classes, children } = props;

  const style = { "--elevation": elevation } as React.CSSProperties;

  return (
    <div className={`${styles.paper} ${classes}`} style={style}>
      {children}
    </div>
  );
};
