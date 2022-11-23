import styles from "./Fieldset.module.scss";

interface FieldsetProps {
  /**
   * The fieldset legend text.
   */
  legend: string;
  /**
   * The fieldset children.
   */
  children: React.ReactNode;
}

/**
 * A HTML fieldset container with a legend.
 */
export const Fieldset = (props: FieldsetProps): JSX.Element => {
  const { legend, children } = props;

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.fieldset__legend}>{legend}</legend>
      {children}
    </fieldset>
  );
};
