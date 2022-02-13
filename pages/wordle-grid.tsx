import { Box, Flex } from "@chakra-ui/react";

interface CellProps {
  value?: string;
}

const Cell = ({ value }: CellProps) => {
  return (
    <Flex
      borderWidth="2px"
      borderColor="#3a3a3c"
      width="100%"
      height="100%"
      maxWidth="50px"
      maxHeight="50px"
      marginX="5px"
      textAlign="center"
      justifyContent="center"
      alignContent="center"
      flexDirection="column"
    >
      {value}
    </Flex>
  );
};

interface RowProps {
  value: string;
  maxWordLength: number;
}

const Row = ({ value, maxWordLength }: RowProps) => {
  const letters = value.split("");

  return (
    <Flex marginY="5px">
      {letters.map((value: string, i: number) => (
        <Cell key={i} value={value} />
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
}

export const WordleGrid = ({
  currentInput,
  maxWordLength,
  maxTries,
  previousTries,
}: WordleGridProps) => {
  return (
    <Box>
      {previousTries.map((value, i) => (
        <Row key={i} value={value} maxWordLength={maxWordLength} />
      ))}
      <Row value={currentInput} maxWordLength={maxWordLength} />
      {Array.from(Array(maxTries - previousTries.length)).map((_, i) => (
        <Row key={i} value="" maxWordLength={maxWordLength} />
      ))}
    </Box>
  );
};
