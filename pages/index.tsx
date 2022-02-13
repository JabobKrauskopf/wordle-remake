import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { Keyboard } from "./keyboard";
import { WordleGrid } from "./wordle-grid";

const App: NextPage = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [maxWordLength, _] = useState(5);
  const [maxTries, setMaxTires] = useState(6);
  const [previousTries, setPreviousTries] = useState<string[]>([]);

  const onInput = (value: string) => {
    currentInput.length < maxWordLength &&
      setCurrentInput(`${currentInput}${value}`);
  };

  const onDelete = () => {
    setCurrentInput(currentInput.slice(0, -1));
  };

  const onEnter = () => {
    if (currentInput.length === maxWordLength) {
      setPreviousTries([...previousTries, currentInput]);
      setCurrentInput("");
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <WordleGrid
        currentInput={currentInput}
        maxWordLength={maxWordLength}
        previousTries={previousTries}
        maxTries={maxTries}
      />
      <Keyboard onInput={onInput} onDelete={onDelete} onEnter={onEnter} />
    </Flex>
  );
};

export default App;
