import { checkGuess } from "../../game-helpers";
import { range } from "../../utils";

/** Individual cell with styling based on result status. */
function Cell({ letter, status }) {
  const className = status ? `cell ${status}` : "cell";
  return <span className={className}>{letter}</span>;
}

/** Display a 5-letter guess. */
function Guess({ value, answer }) {
  const result = checkGuess(value, answer);

  return (
    <p className="guess">
      {range(5).map((num) => (
        <Cell
          key={num}
          letter={result ? result[num].letter : undefined}
          status={result ? result[num].status : undefined}
        />
      ))}
    </p>
  );
}

export default Guess;
