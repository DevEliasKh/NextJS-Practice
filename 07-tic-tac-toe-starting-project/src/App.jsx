import { useState } from "react";
import Player from "./components/Player";
import Log from "./components/Log";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GmaeOver";
import { WINNING_COMBINATIONS } from "./winnig-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function driveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (!!gameTurn.length && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurn] = useState([]);

  const activePlayer = driveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = undefined;

  for (let combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = firstSquare;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRestart} />
        )}
        <GameBoard
          handleSelectFunction={handleSelectFunction}
          boards={gameBoard}
        />
      </div>
      <Log logs={gameTurns} />
    </main>
  );
}

export default App;
