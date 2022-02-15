import { Flex } from "@chakra-ui/react";
import React from "react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

interface KeyProps {
  value: string | React.ReactElement;
  handler: (value: string) => void;
  state?: "correct" | "included" | "mismatch";
}

const Key = ({ value, handler, state }: KeyProps) => {
  const color =
    state == "correct"
      ? "green.500"
      : state == "included"
      ? "yellow.800"
      : state == "mismatch"
      ? "gray.700"
      : "gray.500";

  return (
    <Flex
      height="58px"
      marginX="3px"
      paddingX="15px"
      cursor="pointer"
      textAlign="center"
      justifyContent="center"
      flexDirection="column"
      backgroundColor={color}
      fontWeight="bold"
      fontSize="16px"
      textTransform="uppercase"
      borderRadius="4px"
      onClick={() => {
        handler(value as string);
      }}
    >
      {value}
    </Flex>
  );
};

interface KeyboardProps {
  onEnter: () => void;
  onDelete: () => void;
  onInput: (value: string) => void;
  correctLetters: string[];
  includedLetters: string[];
  testedLetters: string[];
}

export const Keyboard = ({
  onEnter,
  onDelete,
  onInput,
  correctLetters,
  includedLetters,
  testedLetters,
}: KeyboardProps) => {
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const pressedKey = e.key.toLowerCase();

        if (pressedKey.length === 1 && pressedKey >= "a" && pressedKey <= "z") {
          onInput(pressedKey);
        }
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onDelete, onEnter, onInput]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex marginBottom="6px">
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
          <Key
            key={key}
            value={key}
            handler={onInput}
            state={
              correctLetters.includes(key)
                ? "correct"
                : includedLetters.includes(key)
                ? "included"
                : testedLetters.includes(key)
                ? "mismatch"
                : undefined
            }
          />
        ))}
      </Flex>
      <Flex marginBottom="6px">
        {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
          <Key
            key={key}
            value={key}
            handler={onInput}
            state={
              correctLetters.includes(key)
                ? "correct"
                : includedLetters.includes(key)
                ? "included"
                : testedLetters.includes(key)
                ? "mismatch"
                : undefined
            }
          />
        ))}
      </Flex>
      <Flex>
        <Key value="enter" handler={onEnter} />
        {["z", "x", "c", "v", "b", "n", "m"].map((key) => (
          <Key
            key={key}
            value={key}
            handler={onInput}
            state={
              correctLetters.includes(key)
                ? "correct"
                : includedLetters.includes(key)
                ? "included"
                : testedLetters.includes(key)
                ? "mismatch"
                : undefined
            }
          />
        ))}
        <Key value={<ArrowLeftIcon />} handler={onDelete} />
      </Flex>
    </Flex>
  );
};
