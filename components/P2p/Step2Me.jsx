import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
  TabList,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { Search } from "../Icons/Search";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { NFT } from "./NFT";
import { getBeautifulAddress } from "../../utils/formatters";
import { SelectToken } from "./SelectToken";
import { AddButtons } from "./AddButtons";
import { useUserContext } from "../../contexts/User";
import { Verified } from "../Icons/Verified";
import { Flag } from "../Icons/Flag";
import { Logo } from "../Icons/Logo";
import { useAccount, useNetwork, useSwitchNetwork, useDisconnect } from "wagmi";
import { POLYGON_CHAIN } from "../../constants/chain";
import { CHAIN } from "../../constants/chain";
import { NF3Spinner } from "../Spinner/NF3Spinner";
import { useRouter } from "next/router";
import axios from 'axios';

export const Step2Me = ({ callback }) => {
  const userContext = useUserContext();

  const { chain } = useNetwork();
  const { switchNetwork, chains } = useSwitchNetwork();
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const bg = useColorModeValue("border.light", "border.dark");
  const lightBg = useColorModeValue("lightBg.dark", "lightBg.light");
  const title = useColorModeValue("whiter", "title.dark");
  const titleHover = useColorModeValue("titleHover.light", "titleHover.dark");
  const input = useColorModeValue("input.light", "input.dark");
  const realBg = useColorModeValue("bg.light", "bg.dark");
  const h = useColorModeValue("placeholder.light", "placeholder.dark");

  const [nftSearch, setNFTSearch] = useState("");
  const [nftSelect, setNFTSelect] = useState(0);
  const { address } = useAccount();

  const [tempTokens, setTempTokens] = useState([]);
  const [tokenHeaders, setTokenHeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [tokens, setTokens] = useState([]);

  const borderColor = useColorModeValue("border.dark", "border.light");
  const inputColor = useColorModeValue("transparentColor");


  const getList = async (address, isEth) => {
    try {
      if (address === "") return;

      setIsLoading(true);
      const response = await axios.get('/api/get/getWalletNfts', {
        params: {
          address: address,
        }
      });

      const returnedData = response.data.data;
      let cleanedERCData = [];
      let cleanedHeaderData = [];

      returnedData?.collections.forEach((i) => {
        let tokensTemp = [];
        i.ownerships.forEach((x) => {
          let temp = { nft: x.nft, quantity: x.quantity };
          tokensTemp.push(temp);
        });
        cleanedERCData.push({
          type: i.type,
          nfts: tokensTemp,
          Amount: i.ownerships.length,
          name: i.name,
          total: i.token_count,
          whitelisted: i.is_whitelisted,
        });
        cleanedHeaderData.push({
          name: i.name,
          type: i.type,
        });
      });

      setTokenHeaders(
        [{ name: "Collections(All)", type: "all" }].concat(cleanedHeaderData)
      );
      setTempTokens(cleanedERCData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (
        error?.response?.status === 401 &&
        window.localStorage.getItem("CSRF")
      ) {
        router.push("/");
        disconnect();
        window.localStorage.setItem("wallet-address", "");
        window.localStorage.setItem("nf3marketplace-connector-choice", null);
        window.localStorage.removeItem("CSRF");
      }
    }
  };

  useEffect(() => {
    if (userContext?.selectedActionsState?.p2p_me) {
      getList(
        userContext?.selectedActionsState?.p2p_me.address,
        userContext?.selectedActionsState?.p2p_me.isEth
      );
    }
  }, [userContext?.selectedActionsState?.p2p_me]);

  useEffect(() => {
    if (tempTokens.length > 0 && tokenHeaders.length > 0) {
      if (nftSelect === 0) {
        let temp = [];
        tempTokens.forEach((i) => {
          let tempList = [];
          tempList =
            nftSearch === ""
              ? i.nfts
              : i.nfts.filter((item) =>
                item.nft.name.toLowerCase().includes(nftSearch.toLowerCase())
              );
          tempList.forEach((j) => {
            temp.push({ ...j, ["is_whitelisted"]: i.whitelisted });
          });
        });

        setTokens(temp);
      } else {
        tempTokens
          .filter((i) => i.name === tokenHeaders[nftSelect].name)
          .forEach((j) => {
            setTokens(
              nftSearch === ""
                ? j.nfts.map((item) => ({
                  ...item,
                  ["is_whitelisted"]: j.whitelisted,
                }))
                : j.nfts
                  .filter((item) =>
                    item.nft.name
                      .toLowerCase()
                      .includes(nftSearch.toLowerCase())
                  )
                  .map((item) => ({
                    ...item,
                    ["is_whitelisted"]: j.whitelisted,
                  }))
            );
          });
      }
    } else {
      setTokens([]);
    }
  }, [nftSelect, nftSearch, tempTokens, tokenHeaders]);

  const emptyData = () => {
    userContext?.dispatchSelectedActions({
      type: "HANDLE_P2P_NFT",
      payload: [],
    });
    userContext?.dispatchSelectedActions({
      type: "HANDLE_P2P_FT",
      payload: [],
    });
    userContext?.dispatchSelectedActions({
      type: "HANDLE_P2P_MY_NFT",
      payload: [],
    });
    userContext?.dispatchSelectedActions({
      type: "HANDLE_P2P_MY_FT",
      payload: [],
    });
  };

  const handleContinue = () => {
    if (
      userContext?.selectedActionsState?.p2p_my_nfts.length === 0 &&
      userContext?.selectedActionsState?.p2p_my_fts.length === 0
    )
      return;

    callback(3);
  };

  const handleBack = () => {
    callback(-1);
  };

  const handlePrev = () => {
    callback(1);
  };

  const handleTabsChange = (index) => {
    userContext?.dispatchSelectedActions({
      type: "HANDLE_P2P_ME",
      payload: {
        ...userContext?.selectedActionsState?.p2p_me,
        ["isEth"]: index,
      },
    });

    emptyData();

    setNFTSelect(0);
  };

  const handleNft = (e) => {
    setNFTSearch(e.target.value);
  };

  const handleFTRemove = (index) => {
    const newData = userContext?.selectedActionsState?.p2p_my_fts.filter(
      (i, idx) => idx !== index
    );
    userContext?.dispatchSelectedActions({
      type: "HANDLE_P2P_MY_FT",
      payload: newData,
    });
  };

  const handleNFTRemove = (index) => {
    const newData = userContext?.selectedActionsState?.p2p_my_nfts.filter(
      (i, idx) => idx !== index
    );
    userContext?.dispatchSelectedActions({
      type: "HANDLE_P2P_MY_NFT",
      payload: newData,
    });
  };

  return (
    <>
      <Box w="full">
        <Grid mx="20vh" mt="120px" templateColumns="repeat(7, 1fr)">
          <GridItem colSpan={2}>
            <Box
              px="21px"
              py="12px"
              bg={lightBg}
            >
              <Flex alignItems="center">
                <Verified />
                <Text fontSize="14px" color="whiter" ml="12px">:&nbsp;&nbsp; Verified Collection</Text>
              </Flex>
              <Flex mt="5px" alignItems="center">
                <Flag />
                <Text ml="12px" fontSize="14px" color="whiter">
                  :&nbsp;&nbsp; Flagged Asset
                </Text>
              </Flex>
            </Box>
            <Box
              mt="12px"
              py="18px"
            >
              <Text fontSize="14px" color={"whiter"} fontWeight="bold">
                Your Wallet
              </Text>
              <Box mt="16px">
                <Flex
                  px="12px"
                  py="11px"
                  bg={lightBg}
                >
                  <Avatar
                    name=""
                    width="48px"
                    height="48px"
                    borderRadius="0px"
                  />
                  <Box flex="1" ml="12px" w="5%" alignSelf="center">
                    <Text
                      fontWeight="bold"
                      fontSize="16px"
                      color="whiter"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {"You"}
                    </Text>
                    <Text
                      fontSize="12px"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      color="whiter"
                    >
                      {getBeautifulAddress(address)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                overflowY="auto"
                h={
                  userContext?.selectedActionsState?.p2p_my_nfts.length === 0 &&
                    userContext?.selectedActionsState?.p2p_my_fts.length === 0
                    ? "140px" : "390px"
                }
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
                <Box mt="20px">
                  <Text fontWeight="bold" fontSize="14px" color="whiter">
                    Tokens (
                    {userContext?.selectedActionsState?.p2p_my_fts.length})
                  </Text>
                  {userContext?.selectedActionsState?.p2p_my_fts.length ===
                    0 ? (
                    <Text fontWeight="bold" fontSize="14px" color="whiter">
                      -
                    </Text>
                  ) : (
                    <SimpleGrid
                      minChildWidth="80px"
                      overflow="hidden"
                      spacing="16px"
                      pt="12px"
                    >
                      {userContext?.selectedActionsState?.p2p_my_fts.map(
                        (item, index) => {
                          return (
                            <SelectToken
                              key={index}
                              isEdit={true}
                              m="auto"
                              type="ft"
                              handleRemove={(i) => {
                                handleFTRemove(i);
                              }}
                              index={index}
                              tokenId={item.symbol}
                              tokenName={item.amount}
                              tokenLogo={item.logo}
                              tokenImage={""}
                            />
                          );
                        }
                      )}
                      <Box height="100%" />
                      <Box height="100%" />
                      <Box height="100%" />
                    </SimpleGrid>
                  )}
                </Box>
                <Box mt="20px">
                  <Text fontWeight="bold" fontSize="14px" color="whiter">
                    NFTs (
                    {userContext?.selectedActionsState?.p2p_my_nfts.length})
                  </Text>
                  {userContext?.selectedActionsState?.p2p_my_nfts.length ===
                    0 ? (
                    <Text fontWeight="bold" fontSize="14px" color={"whiter"} mb="36px">
                      -
                    </Text>
                  ) : (
                    <SimpleGrid
                      minChildWidth="80px"
                      overflow="hidden"
                      spacing="12px"
                      py="12px"
                    >
                      {userContext?.selectedActionsState?.p2p_my_nfts.map(
                        (item, index) => {
                          return (
                            <SelectToken
                              key={index}
                              index={index}
                              isEdit={true}
                              type="nft"
                              handleRemove={(i) => {
                                handleNFTRemove(i);
                              }}
                              tokenId={item?.nft?.token}
                              tokenName={item?.nft?.collection_name}
                              tokenImage={item.image_url}
                              chainId={item?.nft?.chain}
                            />
                          );
                        }
                      )}
                      <Box height="100%" />
                      <Box height="100%" />
                      <Box height="100%" />
                    </SimpleGrid>
                  )}
                </Box>
              </Box>
              <Box
                mt="16px"
                bg={"reder"}
                _hover={{ color: "primary" }}
                color={"whiter"}
                cursor={
                  userContext?.selectedActionsState?.p2p_my_nfts.length === 0 &&
                    userContext?.selectedActionsState?.p2p_my_fts.length === 0
                    ? "not-allowed"
                    : "pointer"
                }
                opacity={
                  userContext?.selectedActionsState?.p2p_my_nfts.length === 0 &&
                    userContext?.selectedActionsState?.p2p_my_fts.length === 0
                    ? "0.4"
                    : "1"
                }
                textAlign="center"
                w="full"
                py="12px"
                fontSize="14px"
                fontWeight="bold"
                onClick={handleContinue}
              >
                CONTINUE
              </Box>
            </Box>
            <Flex>
              <Text
                as="u"
                fontSize="14px"
                cursor="pointer"
                color={"whiter"}
                _hover={{ opacity: "0.6" }}
                m="auto"
                mt="16px"
                onClick={handlePrev}
              >
                Back
              </Text>
            </Flex>
            <Flex
              justifyContent={"center"}
              alignItems="center"
              my="32px"
              mb={
                userContext?.selectedActionsState?.p2p_nfts.length === 0 &&
                  userContext?.selectedActionsState?.p2p_fts.length === 0
                  ? "175px"
                  : "0px"
              }
            >
              <Logo />
              <Text fontSize="12px" color="whiter" ml="20px" fontFamily={"Roboto"}>
                Copyright NF3 2023, All rights reserved
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={5}>
            <Box px="40px" pb="16px">
              <Flex
                p="8px"
                bg={lightBg}
                alignItems="center"
              >
                <Text pl="8px" flex="1" fontSize="14px" fontWeight="bold" color={"whiter"}>
                  Add a Token
                </Text>
                <AddButtons
                  address={userContext?.selectedActionsState?.p2p_me.address}
                  type={true}
                />
              </Flex>
              <Text mt="25px" fontSize="14px" fontWeight="bold" color={"whiter"}>
                {"Select NFTs from your Wallet"}
              </Text>
              <Flex mt="16px">
                <InputGroup
                  bg={lightBg}
                  py="12px"
                  borderRadius="4px"
                  border="1px solid"
                  borderColor={inputColor}
                  mr="10px"
                >
                  <InputLeftElement color={title} pl="16px" my={"12px"} pointerEvents="none">
                    <Search />
                  </InputLeftElement>
                  <Input
                    type="text"
                    color={"whiter"}
                    fontSize="14px"
                    ml="10px"
                    pr="16px"
                    border="none"
                    placeholder="Search collections or assets"
                    _focus={{ boxShadow: "none", border: "none" }}
                    _placeholder={{ color: h }}
                    onChange={handleNft}
                    value={nftSearch}
                  />
                </InputGroup>
                {/* <Menu>
                  <MenuButton
                    bg={borderColor}
                    fontSize="14px"
                    as={Button}
                    _active={{ bg: bg }}
                    _hover={{ bg: bg }}
                    rightIcon={<ChevronDownIcon />}
                  >
                    {tokenHeaders.length > 0
                      ? tokenHeaders[nftSelect].name
                      : "Collections(All)"}
                  </MenuButton>
                  <MenuList bg={realBg}>
                    {tokenHeaders.map((item, idx) => {
                      return (
                        <MenuItem
                          bg={realBg}
                          key={idx}
                          _hover={{ bg: bg }}
                          onClick={() => {
                            setNFTSelect(idx);
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu> */}
              </Flex>
              <Box h="550px">
                {isLoading ? (
                  <Flex>
                    <Box m="auto" mt="200px">
                      <NF3Spinner />
                    </Box>
                  </Flex>
                ) : tokens?.length === 0 && !isLoading ? (
                  <Flex mt="200px" justify="center">
                    <Box textAlign={"center"}>No Items Found</Box>
                  </Flex>
                ) : (
                  <>
                    <SimpleGrid
                      my="15px"
                      maxHeight="550px"
                      overflowY="auto"
                      overflowX="hidden"
                      minChildWidth="187px"
                      columns={3}
                      spacing="10px"
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
                      {isLoading ? (
                        <Flex>
                          <Box m="auto">
                            <NF3Spinner />
                          </Box>
                        </Flex>
                      ) : (
                        tokens.map((item, index) => {
                          return (
                            <NFT
                              type={true}
                              key={index}
                              item={item}
                              isEdit={true}
                              is1155={true}
                            />
                          );
                        })
                      )}
                      <Box height="100%" />
                      <Box height="100%" />
                      <Box height="100%" />
                    </SimpleGrid>
                  </>
                )}
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
