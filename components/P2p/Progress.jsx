import {
  Box,
  Grid,
  GridItem,
  Avatar,
  Flex,
  Text
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step2Me } from "./Step2Me";
import { useUserContext } from "../../contexts/User";
import { useAccount } from "wagmi";

const steps = [
  { label: "1", description: "Find A User" },
  { label: "2", description: "I'm Looking For" },
  { label: "3", description: "I'm Offering" },
  { label: "4", description: "Preview And Submit" },
];

export const Progress = ({ callback, tab, setTab }) => {
  const bg = useColorModeValue("bg.dark", "bg.light");
  const lightBg = useColorModeValue("lightBg.dark", "lightBg.light");
  const selecter = useColorModeValue("selecter.dark", "header.dark");
  const label = useColorModeValue("labelColor");
  const title = useColorModeValue("title.dark", "title.light");

  const { address } = useAccount();
  const userContext = useUserContext();

  useEffect(() => {
    if (address === undefined) {
      userContext?.dispatchSelectedActions({
        type: "RESET",
      });

      callback();
    } else {
      if (address !== userContext?.selectedActionsState?.p2p_me?.address) {
        userContext?.dispatchSelectedActions({
          type: "HANDLE_P2P_ME",
          payload: {
            ...userContext?.selectedActionsState?.p2p_me,
            ["address"]: address,
          },
        });

        userContext?.dispatchSelectedActions({
          type: "HANDLE_P2P_MY_NFT",
          payload: [],
        });
        userContext?.dispatchSelectedActions({
          type: "HANDLE_P2P_MY_FT",
          payload: [],
        });
      } else if (
        address !== userContext?.selectedActionsState?.p2p_trader?.address
      ) {
        setTab(0);
        userContext?.dispatchSelectedActions({
          type: "RESET",
        });
      }
    }
  }, [address]);

  const handleStep = (index, isEdit = false) => {
    if (index === -1) {
      userContext?.dispatchSelectedActions({
        type: "RESET",
      });

      callback();
    } else {
      setTab(index);
    }
  };

  return (
    <>
      <Box
        w="full"
        bg={bg}
      >
        <Box display={"flex"} flexDirection="column">
          {/* <Text
            textAlign={"center"}
            mt='15px'
            mb="40px"
            fontWeight="700"
            fontStyle={"normal"}
            fontSize={"30px"}
            lineHeight={"100%"}
          >
            SECURELY SWAP YOUR PIXELMON NFT(S) PEER TO PEER WITH 0% FEES
          </Text> */}
          <Grid mx="30vh" mt="70px" templateColumns="repeat(3, 1fr)">
            {new Array(3).fill(0).map((item, index) => {
              return (
                <GridItem key={index} h="4px" bg={selecter} position="relative" bg={lightBg}>
                  <Box
                    w={tab <= index ? "0px" : "full"}
                    h="full"
                    bg="reder"
                    sx={{ transition: "width 0.5s ease-in" }}
                  />
                  <Box
                    position="absolute"
                    top="-17px"
                    left="-100px"
                    textAlign="center"
                  >
                    <Flex
                      display="inline-block"
                      bg={index <= tab ? "reder" : lightBg}
                      sx={{ transition: "all 0.5s ease-in" }}
                    >
                      <Avatar
                        m="auto"
                        fontSize="24px"
                        fontWeight="bold"
                        name={steps[index].label}
                        color={
                          index <= tab ? "whiter" : label
                        }
                        bg={index <= tab ? "reder" : lightBg}
                        border="none"
                        sx={{ transition: "all 0.5s ease-in" }}
                        w="37px"
                        h="37px"
                        borderRadius="0px"
                      />
                    </Flex>
                    <Box
                      mt="16px"
                      fontSize="16px"
                      fontWeight="500"
                      px="40px"
                      py="8px"
                      color={tab >= index ? "reder" : title}
                    >
                      {steps[index].description}
                    </Box>
                  </Box>
                  {index === 2 && (
                    <Box
                      key={4}
                      position="absolute"
                      top="-17px"
                      right="-120px"
                      textAlign="center"
                    >
                      <Flex
                        display="inline-block"
                        bg={tab >= index + 1 ? "reder" : lightBg}
                        sx={{ transition: "all 0.5s ease-in" }}
                      >
                        <Avatar
                          m="auto"
                          fontSize="24px"
                          fontWeight="bold"
                          name={steps[index + 1].label}
                          color={
                            index <= tab ? "whiter" : label
                          }
                          bg={tab >= index + 1 ? "reder" : lightBg}
                          border="none"
                          sx={{ transition: "all 0.5s ease-in" }}
                          w="37px"
                          h="37px"
                          borderRadius="0px"
                        />
                      </Flex>
                      <Box
                        mt="16px"
                        fontSize="16px"
                        fontWeight="500"
                        px="38px"
                        py="7px"
                        borderRadius="8px"
                        color={tab > index ? "reder" : title}
                      >
                        {steps[index + 1].description}
                      </Box>
                    </Box>
                  )}
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        {tab === 0 ? (
          <Step1 callback={handleStep} />
        ) : tab === 2 ? (
          <Step2Me callback={handleStep} />
        ) : tab === 1 ? (
          <Step2 callback={handleStep} />
        ) : tab === 3 ? (
          <Step3 callback={handleStep} />
        ) : tab === 4 ? (
          <Step4 callback={handleStep} />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};
