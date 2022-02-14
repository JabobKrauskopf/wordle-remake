import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { Keyboard } from "./keyboard";
import { WordleGrid } from "./wordle-grid";

export const compareToResult = (
  letters: string[],
  comparisonLetters: string[]
) => {
  return letters.map((letter, i) => {
    if (letter == comparisonLetters[i]) {
      return "correct";
    } else if (comparisonLetters.includes(letter)) {
      return "includes";
    } else {
      return "mismatch";
    }
  });
};

const App: NextPage = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [maxWordLength, _] = useState(5);
  const [maxTries, setMaxTires] = useState(6);
  const [previousTries, setPreviousTries] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"unknown" | "lost" | "won">(
    "unknown"
  );

  const testWord = "ROBIN";

  const onInput = (value: string) => {
    currentInput.length < maxWordLength &&
      setCurrentInput(`${currentInput}${value}`);
  };

  const onDelete = () => {
    setCurrentInput(currentInput.slice(0, -1));
  };

  const onEnter = () => {
    if (currentInput == testWord) {
      setGameState("won");
      alert("You have won.");
    } else if (
      gameState == "unknown" &&
      currentInput.length === maxWordLength
    ) {
      setPreviousTries([...previousTries, currentInput]);
      setCurrentInput("");
      if (previousTries.length === maxTries) {
        setGameState("lost");
        alert("You have lost.");
      }
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <WordleGrid
        currentInput={currentInput}
        maxWordLength={maxWordLength}
        previousTries={previousTries}
        maxTries={maxTries}
        solution={testWord}
      />
      <Keyboard onInput={onInput} onDelete={onDelete} onEnter={onEnter} />
    </Flex>
  );
};

export default App;
