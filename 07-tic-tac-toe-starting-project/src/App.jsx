import { useState } from "react";
import Player from "./components/Player";
import Log from "./components/Log";
import GameBoard from "./components/GameBoard";

function driveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (!!gameTurn.length && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = driveActivePlayer(gameTurn);

  function handleSelectFunction(rowIndex, colIndex) {
    setGameTurn((pervTurn) => {
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: activePlayer,
        },
        ...pervTurn,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard
          handleSelectFunction={handleSelectFunction}
          turns={gameTurn}
        />
      </div>
      <Log logs={gameTurn} />
    </main>
  );
}

export default App;
