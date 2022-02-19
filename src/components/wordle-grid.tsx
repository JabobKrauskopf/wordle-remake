import { Box, Flex } from "@chakra-ui/react";
import { compareToResult } from "../pages";

interface CellProps {
  value?: string;
  diff?: "correct" | "includes" | "mismatch";
  current?: boolean;
}

const Cell = ({ value, diff, current }: CellProps) => {
  const color =
    diff === "correct"
      ? "green.500"
      : diff === "includes"
      ? "yellow.800"
      : diff === "mismatch"
      ? "gray.700"
      : undefined;

  return (
    <Flex
      borderWidth="2px"
      borderColor={color ? color : current ? "gray.600" : "gray.700"}
      boxSize="60px"
      marginX="2px"
      textAlign="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor={color}
      fontWeight="bold"
      fontSize="32px"
      textTransform="uppercase"
    >
      {value}
    </Flex>
  );
};

interface RowProps {
  value: string;
  maxWordLength: number;
  solution?: string;
  current?: boolean;
}

const Row = ({ value, maxWordLength, solution, current }: RowProps) => {
  const letters = value.split("");

  const diff = solution
    ? compareToResult(letters, solution.split(""))
    : undefined;

  return (
    <Flex marginY="5px">
      {letters.map((value: string, i: number) => (
        <Cell
          key={i}
          value={value}
          diff={diff ? diff[i] : undefined}
          current={current}
        />
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
    <Box marginBottom="50px">
      {previousTries.map((value, i) => (
        <Row
          key={i}
          value={value}
          maxWordLength={maxWordLength}
          solution={solution}
        />
      ))}
      {maxTries - previousTries.length > 0 ? (
        <Row
          value={currentInput}
          maxWordLength={maxWordLength}
          current={true}
        />
      ) : undefined}
      {maxTries - previousTries.length - 1 > 0
        ? Array.from(Array(maxTries - previousTries.length - 1)).map((_, i) => (
            <Row key={i} value="" maxWordLength={maxWordLength} />
          ))
        : undefined}
    </Box>
  );
};
