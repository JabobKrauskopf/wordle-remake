import { Box, Flex } from "@chakra-ui/react";
import { compareToResult } from "../pages";

interface CellProps {
  value?: string;
  diff?: "correct" | "includes" | "mismatch";
  borderColor?: string;
}

const Cell = ({ value, diff, borderColor }: CellProps) => {
  const color =
    diff === "correct"
      ? "#538d4e"
      : diff === "includes"
      ? "#b59f3b"
      : diff === "mismatch"
      ? "#3a3a3c"
      : "";

  return (
    <Flex
      borderWidth="2px"
      borderColor={borderColor ?? "#3a3a3c"}
      boxSize="65px"
      marginX="2px"
      textAlign="center"
      justifyContent="center"
      alignContent="center"
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
          borderColor={current ? "#565758" : undefined}
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
      {maxTries - previousTries.length + 1 > 0 ? (
        <Row
          value={currentInput}
          maxWordLength={maxWordLength}
          current={true}
        />
      ) : undefined}
      {maxTries - previousTries.length > 0
        ? Array.from(Array(maxTries - previousTries.length)).map((_, i) => (
            <Row key={i} value="" maxWordLength={maxWordLength} />
          ))
        : undefined}
    </Box>
  );
};
