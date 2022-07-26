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

  const sumOfTransactions = () => {
    let sum = 0;

    for (let i = 0; i < transactions.length; i++) {
      Number(transactions[i].amount);
      sum += transactions[i].amount;
    }

    return <p>${Number.parseFloat(sum).toFixed(2)}</p>;
  };

  return (
    <div className="Transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Bank Account Total:{sumOfTransactions()}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
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
      </section>
    </div>
  );
}

export default Transactions;
