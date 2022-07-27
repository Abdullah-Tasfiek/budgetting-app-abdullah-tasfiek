import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function TransactionNewForm() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    item: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${API}/transactions`, transaction)
      .then((res) => {
        navigate(`/transactions`);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="text"
          value={transaction.date}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="item">Item:</label>
        <input
          id="item"
          type="text"
          value={transaction.item}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={transaction.amount}
          onChange={handleTextChange}
        />
        <label htmlFor="from">From: </label>
        <input
          id="from"
          type="text"
          value={transaction.from}
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          name="category"
          type="text"
          value={transaction.category}
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" value="Create New Item" />
      </form>
    </div>
  );
}

export default TransactionNewForm;
