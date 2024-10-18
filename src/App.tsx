import "./App.scss";
import patternDividerMobile from "./assets/pattern-divider-mobile.svg";
import patternDividerDesktop from "./assets/pattern-divider-desktop.svg";
import diceIcon from "./assets/icon-dice.svg";
import { useEffect, useState } from "react";

const API_URL = "https://api.adviceslip.com/advice";

function App() {
  const [quote, setQuote] = useState<string>("Waiting for advice...");
  const [adviceCount, setAdviceCount] = useState<number>(0);

  const fetchQuote = () => {
    fetch(API_URL).then((response) => {
      response.json().then((data) => {
        setQuote(data.slip.advice);
        setAdviceCount(data.slip.id);
      });
    });
  };

  useEffect(fetchQuote, []);

  return (
    <>
      <div className="advice-container">
        <p className="advice-number">{`ADVICE #${adviceCount}`}</p>
        <p className="advice-text">
          {quote == "Waiting for advice..." ? `${quote}` : `"${quote}"`}
        </p>

        <img src={patternDividerMobile} className="divider-icon mobile" />
        <img src={patternDividerDesktop} className="divider-icon desktop" />
        <button
          onClick={() => {
            setQuote("Waiting for advice...");
            fetchQuote();
          }}
        >
          <img src={diceIcon} alt="Dice" />
        </button>
      </div>
    </>
  );
}

export default App;
