import { Box, Flex } from "@chakra-ui/react";
import { compareToResult } from "../pages";

interface CellProps {
  value?: string;
  diff?: "correct" | "includes" | "mismatch";
}

const Cell = ({ value, diff }: CellProps) => {
  const color =
    diff === "correct" ? "green" : diff === "includes" ? "yellow" : "";

  return (
    <Flex
      borderWidth="2px"
      borderColor="#3a3a3c"
      boxSize="50px"
      marginX="5px"
      textAlign="center"
      justifyContent="center"
      alignContent="center"
      flexDirection="column"
      backgroundColor={color}
    >
      {value}
    </Flex>
  );
};

interface RowProps {
  value: string;
  maxWordLength: number;
  solution?: string;
}

const Row = ({ value, maxWordLength, solution }: RowProps) => {
  const letters = value.split("");

  const diff = solution
    ? compareToResult(letters, solution.split(""))
    : undefined;

  return (
    <Flex marginY="5px">
      {letters.map((value: string, i: number) => (
        <Cell key={i} value={value} diff={diff ? diff[i] : undefined} />
      ))}
      {Array.from(Array(maxWordLength - letters.length)).map((_, i) => (
        <Cell key={i} />
      ))}
    </Flex>
  );
};

interface WordleGridProps {
  currentInput: string;
  maxWordLength: number;
  maxTries: number;
  previousTries: string[];
  solution: string;
}

export const WordleGrid = ({
  currentInput,
  maxWordLength,
  maxTries,
  previousTries,
  solution,
}: WordleGridProps) => {
  return (
    <Box>
      {previousTries.map((value, i) => (
        <Row
          key={i}
          value={value}
          maxWordLength={maxWordLength}
          solution={solution}
        />
      ))}
      <Row value={currentInput} maxWordLength={maxWordLength} />
      {maxTries - previousTries.length > 0
        ? Array.from(Array(maxTries - previousTries.length)).map((_, i) => (
            <Row key={i} value="" maxWordLength={maxWordLength} />
          ))
        : undefined}
    </Box>
  );
};
