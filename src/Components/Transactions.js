import { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction";
const API = process.env.REACT_APP_API_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios.get(`${API}/transactions`).then((res) => {
      setTransactions(res.data);
    });
  }, []);

  let total = 0;

  const accountTotal = (total) => {
    if (total >= 1000) {
      return "green";
    } else if (total >= 0) {
      return "yellow";
    }
    return "red";
  };

  return (
    <div className="Transactions">
      <section>
        <table>
          <tbody>
            {transactions.map((transaction, index) => {
              total += parseInt(transaction.amount);
              return (
                <Transaction
                  key={index}
                  transaction={transaction}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
        <strong className="total">Bank Account Total: $</strong>{" "}
        <span className={accountTotal(total)}>{total}</span>
      </section>
    </div>
  );
}

export default Transactions;
