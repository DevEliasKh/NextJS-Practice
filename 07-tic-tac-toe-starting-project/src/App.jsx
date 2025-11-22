import { useState } from "react";
import Player from "./components/Player";
import Log from "./components/Log";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winnig-combinations";

const PLAYERS = {
  X: "player 1",
  O: "player 1",
};

const INITIAL_GAME_BOARD = [
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

function driveWinner(gameBoard, playerName) {
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
      winner = playerName[firstSquare];
    }
  }

  return winner;
}

function driveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);
  const activePlayer = driveActivePlayer(gameTurns);
  const gameBoard = driveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard, playerName);
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

  function handlePlayerChangName(symbol, newName) {
    setPlayerName((pervPlayerName) => {
      return {
        ...pervPlayerName,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol={PLAYERS.X}
            isActive={activePlayer === PLAYERS.X}
            onNameChange={handlePlayerChangName}
          />
          <Player
            name="Player 2"
            symbol={PLAYERS.O}
            isActive={activePlayer === PLAYERS.O}
            onNameChange={handlePlayerChangName}
          />
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
