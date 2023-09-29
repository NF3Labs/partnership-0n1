import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { CheckGreen } from "../Icons/CheckGreen";
import { Logo } from "../Icons/Logo";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useUserContext } from "../../contexts/User";

export const Step4 = () => {
  const bg = useColorModeValue("lightBg.dark", "lightBg.light");
  const title = useColorModeValue("whiter", "title.dark");

  const router = useRouter();
  const { address } = useAccount();
  const userContext = useUserContext();

  const handleContinue = () => {
    userContext?.dispatchSelectedActions({
      type: "HANDLE_P2P_TRADER",
      payload: undefined,
    });
    router.push({
      pathname: `/`,
    });
  };

  return (
    <>
      <Box w="full" mt="84px">
        <Flex>
          <Box m="auto" mt="120px">
            <Flex justify="center">
              <CheckGreen width="120px" height="120px" />
            </Flex>
            <Flex mt="20px">
              <Text m="auto" fontSize="14px" fontWeight="bold" color="whiter">
                Swap offer submitted to
              </Text>
            </Flex>
            <Flex
              bg={bg}
              px="10px"
              py="11px"
              mt="12px"
            >
              <Avatar
                name={
                  userContext?.selectedActionsState?.p2p_trader
                    ? userContext?.selectedActionsState?.p2p_trader.name
                    : ""
                }
                borderRadius="0px"
              />
              <Box flex="1" ml="12px" w="5%" alignSelf="center">
                <Text
                  fontWeight="bold"
                  fontSize="16px"
                  color={"whiter"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userContext?.selectedActionsState?.p2p_trader
                    ? userContext?.selectedActionsState?.p2p_trader.name
                    : ""}
                </Text>
                <Text
                  mt="10px"
                  fontSize="12px"
                  fontWeight="700"
                  color="whiter"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userContext?.selectedActionsState?.p2p_trader
                    ? userContext?.selectedActionsState?.p2p_trader.address
                    : ""}
                </Text>
              </Box>
            </Flex>
            <Flex mt="40px" >
              <Text m="auto" textAlign="center" fontSize="12px" color="whiter">
                As we are in beta, we are working on getting notifications set
                up.
                <br />
                Until then, please use the P2P dashboard to check if your offer
                has been accepted.
              </Text>
            </Flex>
            <Flex>
              <Box
                m="auto"
                mt="40px"
                bg="reder"
                _hover={{ opacity: "0.6" }}
                color={"whiter"}
                cursor="pointer"
                textAlign="center"
                w="336px"
                py="12px"
                fontSize="14px"
                fontWeight="bold"
                onClick={handleContinue}
              >
                Go To P2p Dashboard
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          mt="32px"
          mb="150px"
        >
          <Logo />
          <Text fontSize="12px" color="whiter" ml="20px" fontFamily={"Roboto"}>
            Copyright NF3 2023, All rights reserved
          </Text>
        </Flex>
      </Box>
    </>
  );
};
