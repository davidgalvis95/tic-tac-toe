import logo from "./logo.svg";
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Container from "./container/Container";
import Header from "./header/Header";
import { PlayerTurnProvider } from "./context/playerContext";
import Timer from "./timer/Timer"

function App() {
  const { playing } = useSelector((state) => state?.gameReducer);
  const [playerTurn, setPlayerTurn] = useState(1);
  function changePlayerTurn() {
    setPlayerTurn((prevPlayerTurn) => prevPlayerTurn === 1 ? 2 : 1);
  }

  const winningCombinations = [
    [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
  ];

  useEffect(() => {
    if (!playing) {
      setPlayerTurn(1);
    }
  }, [playing])

  return (
    <div className="App">
      <Header/>
      {playing?<h3>{`Player ${playerTurn} turn`}</h3>:null}
      <PlayerTurnProvider value={{ playerTurn, changePlayerTurn, winningCombinations}}>
        <Container />
        <Timer/>
      </PlayerTurnProvider>
    </div>
  );
}

export default App;
