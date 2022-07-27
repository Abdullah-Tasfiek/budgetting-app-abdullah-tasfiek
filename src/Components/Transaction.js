import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  return (
    <tr>
      <td>
        <p>{transaction.date}</p>
      </td>
      <td>
        <Link to={`/transactions/${index}`}>
          <p>{transaction.item}</p>
        </Link>
      </td>
      <td>
        <p>${transaction.amount}</p>
      </td>
    </tr>
  );
}

export default Transaction;
