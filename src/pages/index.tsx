import { Flex, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { Keyboard } from "../components/keyboard";
import { WordleGrid } from "../components/wordle-grid";
import { solutions, wordList } from "../constants/word-list";

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
    solutions[Math.floor(Math.random() * solutions.length)]
  );

  const getNewSolution = () => {
    setSolution(solutions[Math.floor(Math.random() * solutions.length)]);
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
  const toast = useToast();

  const includedLetters = solution
    .split("")
    .filter((letter) =>
      previousTries.some((element) => element.includes(letter))
    );

  const correctLetters = solution
    .split("")
    .filter((letter, i) =>
      previousTries.some((element) => element.split("")[i] == letter)
    );

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
        toast({
          title: `${currentInput.toUpperCase()} is not in the word list.`,
          status: "info",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      setPreviousTries([...previousTries, currentInput]);
      setCurrentInput("");
    }
    if (currentInput == solution) {
      setGameState("won");
      toast({
        title: "Congrats! You have won the game!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (previousTries.length === maxTries) {
      setGameState("lost");
      toast({
        title: "You have lost the game! :(",
        description: `The solution was ${solution}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
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
      <Keyboard
        onInput={onInput}
        onDelete={onDelete}
        onEnter={onEnter}
        includedLetters={includedLetters}
        correctLetters={correctLetters}
        testedLetters={previousTries.flatMap((value) => value.split(""))}
      />
    </Flex>
  );
};

export default App;
