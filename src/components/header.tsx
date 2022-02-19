import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

export const Header = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Test</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      <Flex
        height="64px"
        // flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        fontSize="35px"
        fontWeight="bold"
        borderBottom="1px solid"
        borderColor="gray.700"
      >
        <Box />
        <Box>WORDLE-REMAKE</Box>
        <SettingsIcon
          boxSize="20px"
          marginRight="20px"
          // onClick={onOpen}
          cursor="pointer"
        />
      </Flex>
    </>
  );
};
