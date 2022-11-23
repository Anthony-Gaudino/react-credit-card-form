import styles from "./App.module.scss";
import CreditCardForm from "./payment/CreditCardForm";

function App() {
  return (
    <div className={styles.app}>
      <CreditCardForm />
    </div>
  );
}

export default App;
