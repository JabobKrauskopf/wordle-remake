import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { Keyboard } from "../components/keyboard";
import { WordleGrid } from "../components/wordle-grid";
import { wordList } from "../constants/word-list";

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

const useSolutionGenerator = (): [string, () => void] => {
  const [solution, setSolution] = useState(
    wordList[Math.floor(Math.random() * wordList.length)]
  );

  const getNewSolution = () => {
    setSolution(wordList[Math.floor(Math.random() * wordList.length)]);
  };

  return [solution, getNewSolution];
};

const App: NextPage = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [maxWordLength, _] = useState(5);
  const [maxTries, setMaxTires] = useState(5);
  const [previousTries, setPreviousTries] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"unknown" | "lost" | "won">(
    "unknown"
  );
  const [solution, _getNewSolution] = useSolutionGenerator();

  console.log(solution);

  const onInput = (value: string) => {
    currentInput.length < maxWordLength &&
      gameState == "unknown" &&
      setCurrentInput(`${currentInput}${value}`);
  };

  const onDelete = () => {
    setCurrentInput(currentInput.slice(0, -1));
  };

  const onEnter = () => {
    if (gameState == "unknown" && currentInput.length === maxWordLength) {
      if (!wordList.includes(currentInput)) {
        alert(`${currentInput} is not in the wordlist.`);
        return;
      }
      setPreviousTries([...previousTries, currentInput]);
      setCurrentInput("");
      if (previousTries.length === maxTries) {
        setGameState("lost");
        alert("You have lost.");
      }
    }
    if (currentInput == solution) {
      setGameState("won");
      alert("You have won.");
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <WordleGrid
        currentInput={currentInput}
        maxWordLength={maxWordLength}
        previousTries={previousTries}
        maxTries={maxTries}
        solution={solution}
      />
      <Keyboard onInput={onInput} onDelete={onDelete} onEnter={onEnter} />
    </Flex>
  );
};

export default App;
