import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function TransactionEditForm() {
  let { index } = useParams();
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

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => {
        setTransaction(res.data);
      })
      .catch();
  }, [index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then(() => {
        navigate(`/transactions/${index}`);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          value={transaction.date}
          type="text"
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
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          onChange={handleTextChange}
          value={transaction.from}
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
        <input type="submit" className="button-33" value="Update" />
      </form>
      <Link to={`/transactions/${index}`}>
        <button className="button-33">Go Back</button>
      </Link>
    </div>
  );
}

export default TransactionEditForm;
