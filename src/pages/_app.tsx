import { Box, ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Header } from "../components/header";

const theme = extendTheme({
  colors: {
    gray: {
      500: "#818384",
      600: "#565758",
      700: "#3a3a3c",
      900: "#121213",
    },
    green: {
      500: "#538d4e",
    },
    yellow: {
      800: "#b59f3b",
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "white",
      },
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column">
        <Header />
        <Box marginTop="40px">
          <Component {...pageProps} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default MyApp;
