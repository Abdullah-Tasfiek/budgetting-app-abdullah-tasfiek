import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function TransactionDetails() {
  const [transaction, setTransaction] = useState([]);
  let { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((res) => {
        setTransaction(res.data);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, [index, navigate]);

  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => {
        navigate("/transactions");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article>
      <strong>Date of Transaction:</strong> {transaction.date}
      <p>
        <strong>Item:</strong> {transaction.item}
      </p>
      <p>
        <strong>Amount: </strong>${transaction.amount}
      </p>
      <p>
        <strong>From: </strong>
        {transaction.from}
      </p>
      <p>
        <strong>Category:</strong> {transaction.category}
      </p>
      <div>
        <Link to={`/transactions`}>
          <button className="button-33">Back</button>
        </Link>
      </div>
      <div>
        <Link to={`/transactions/${index}/edit`}>
          <button className="button-33">Edit</button>
        </Link>
      </div>
      <div>
        <button className="button-34" onClick={handleDelete}>Delete</button>
      </div>
    </article>
  );
}

export default TransactionDetails;
