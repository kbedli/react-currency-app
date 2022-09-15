import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./Loading";
import CatchError from "./CatchError";

function App() {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [finalSentence, setFinalSentence] = useState("");
  const [loading, setLoading] = useState(true);
  const [catchError, setCatchError] = useState(false);
  const [rate, setRate] = useState("");

  const calculate = () => {
    const finalOutcome = (amount * rate).toFixed(2);
    setFinalSentence(`${amount} ${currency} to ${finalOutcome} PLN`);
  };

  async function getData() {
    try {
      const res = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/`
      );
      const finalRes = await res.json();

      setRate(finalRes.rates[0].mid);

      setLoading(false);
      setCatchError(false);
    } catch {
      setCatchError(true);
      setFinalSentence("");
    }
  }

  useEffect(() => {
    getData();
  }, [currency]);

  const getAmount = (e) => {
    setAmount(e.target.value);
  };

  const changeCurrency = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="wrapper">
      <div className="top">
        <h1>Przelicznik Walut</h1>
        <p>Przelicz kwotę na PLN!</p>
      </div>

      <div class="bottom">
        <label for="amount">Wprowadź kwotę, którą chcesz przeliczyć</label>
        <input
          type="number"
          className="amount-one"
          value={amount}
          onChange={getAmount}
        />
        <label for="currency">Wybierz walutę</label>

        <select defaultValue={currency} onChange={changeCurrency} id="currency">
          <option selected value="USD">
            USD
          </option>
          <option value="EUR">EUR</option>
          <option value="CHF">CHF</option>
        </select>
        <button onClick={calculate} className="btn">
          OBLICZ
        </button>

        {loading ? <Loading /> : null}
        {catchError ? <CatchError /> : null}

        <div className="end-amount">
          <p className="amount-two">{finalSentence}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
