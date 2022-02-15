import { Box, Flex } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      height="64px"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      fontSize="35px"
      fontWeight="bold"
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      WORDLE-REMAKE
    </Flex>
  );
};
