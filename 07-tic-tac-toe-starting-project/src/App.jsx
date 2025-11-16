import { useState } from "react";
import Player from "./components/Player";
import Log from "./components/Log";
import GameBoard from "./components/GameBoard";
function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectFunction(rowIndex, colIndex) {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );

    setGameTurn((pervTurn) => {
      let currentPlayer = "X";
      if (!!pervTurn.length && pervTurn[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
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
        <Log />
      </div>
    </main>
  );
}

export default App;
