import React, { useRef } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";
import GuessGrid from "../GuessGrid/GuessGrid";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import WonBanner from "../WonBanner/WonBanner";
import LostBanner from "../LostBanner/LostBanner";

function Game() {
  // running | won | lost
  const [gameStatus, setGameStatus] = React.useState("running");
  const [answer, setAnswer] = React.useState(sample(WORDS));
  const [guesses, setGuesses] = React.useState([]);

  // Used to focus input.
  const inputRef = useRef(null);

  React.useEffect(() => {
    console.info({ answer });
    inputRef.current && inputRef.current.focus();
  }, [answer]);

  /** Handle new guess submission. */
  const handleGuess = (tentativeGuess) => {
    const nextGuess = { id: crypto.randomUUID(), value: tentativeGuess };
    const nextGuesses = [...guesses, nextGuess];
    setGuesses(nextGuesses);

    if (tentativeGuess === answer) {
      setGameStatus("won");
    }

    if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  };

  /** Handle restarting the game. */
  const handleRestart = () => {
    setGuesses([]);
    setAnswer(sample(WORDS));
    setGameStatus("running");
  };

  return (
    <>
      <GuessGrid guesses={guesses} answer={answer} />
      <GuessInput
        gameStatus={gameStatus}
        onGuess={handleGuess}
        inputRef={inputRef}
      />
      {gameStatus === "won" && (
        <WonBanner numOfGuesses={guesses.length} onRestart={handleRestart} />
      )}
      {gameStatus === "lost" && (
        <LostBanner answer={answer} onRestart={handleRestart} />
      )}
    </>
  );
}

export default Game;
