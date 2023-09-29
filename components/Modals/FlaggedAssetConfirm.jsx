import {
  Box,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Fragment } from "react";
import { cleanImageUrl } from "../../utils/formatters"
import { ThreeColourIcon } from "../Icons/ThreeColourIcon";

export const FlaggedAssetConfirm = ({
  handleGoBack,
  handleContinue,
  data,
  isOpen,
  onClose,
}) => {
  const input = useColorModeValue("lightBg.dark", "lightBg.light");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW="594px"
        bgColor={"blacker"}
      >
        <Box p="25px" pos="relative">
          <Flex>
            <Spacer />
            <Box onClick={onClose}>
              <CloseIcon />
            </Box>
          </Flex>
          <Text mt="10px" fontSize="24px" fontWeight="bold" textAlign="center" color="whiter">
            Flagged Assets Detected
          </Text>
          <Text
            fontSize="16px"
            pt="20px"
            textAlign="center"
            color={input}
          >
            This swap involves flagged assets.
          </Text>
          <Text
            fontSize="16px"
            textAlign="center"
            color={input}
          >
            Are you sure you would like to proceed with this swap?
          </Text>
          <Box mt="40px">
            <ThreeColourIcon />
          </Box>
          <Box
            h="250px"
            mt="12px"
            overflowX="hidden"
            overflowY="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "3px",
                borderRadius: "2px",
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: input,
                borderRadius: "2px",
              },
            }}
          >
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <Flex p="8px" alignItems={"center"}>
                    <Box
                      bgImage={cleanImageUrl(item.nft.image_url)}
                      h="90px"
                      w="90px"
                      backgroundPosition={"center"}
                      backgroundRepeat={"no-repeat"}
                      backgroundSize={"contain"}
                    />
                    <Box ml="24px">
                      <Text fontSize="16px">{item.nft.name}</Text>
                      <Text fontSize="12px">{item.nft.collection_name}</Text>
                    </Box>
                  </Flex>
                </Fragment>
              );
            })}
          </Box>
          <Box mt="12px">
            <ThreeColourIcon />
          </Box>
          <Flex justify="center" align="center" pt="8" gap="6">
            <Box
              px="24px"
              py="13px"
              fontSize="14px"
              fontWeight="bold"
              onClick={handleGoBack}
              cursor="pointer"
              bg="whiter"
              color="blacker"
            >
              DISMISS
            </Box>
            <Box
              bg="reder"
              color="whiter"
              px="24px"
              py="13px"
              fontSize="14px"
              fontWeight="bold"
              cursor="pointer"
              onClick={handleContinue}
            >
              CONFIRM
            </Box>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};
