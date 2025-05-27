import React from "react";

/**
 * Form for guessing words.
 */
function GuessInput({ gameStatus, onGuess, inputRef: ref }) {
  const [tentativeGuess, setTentativeGuess] = React.useState("");

  /** Handle the form submit. */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call parent handler.
    onGuess(tentativeGuess);

    // Reset.
    setTentativeGuess("");
  };

  /** Handle input changes. */
  const handleChange = (e) => {
    const nextGuess = e.target.value.toUpperCase();
    setTentativeGuess(nextGuess);
  };

  /** Handle keydown event so we can ignore non-letters. */
  const handleKeyDown = (e) => {
    const regex = /^[a-zA-Z]$/;
    if (
      !regex.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Enter" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  return (
    <form className="guess-input-wrapper" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        ref={ref}
        id="guess-input"
        type="text"
        value={tentativeGuess}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleChange(e)}
        disabled={gameStatus !== "running"}
        required
        maxLength={5}
        pattern="[a-zA-Z]{5}"
        title="5-letter word"
        autoComplete="off"
      />
    </form>
  );
}

export default GuessInput;
