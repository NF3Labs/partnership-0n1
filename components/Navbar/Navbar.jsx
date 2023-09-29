import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Tooltip,
  Image,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Plus } from "../Icons/Plus";
import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "../Icons/Logo";
import { Connect } from "../Connect/Connect";
import { useAccount, useDisconnect } from "wagmi";
import { useUserContext } from "../../contexts/User";
import { NavNotification } from "../Notifications/NavNotification";
import { OverLord } from "../Icons/OverLord";
import { ThreeColourIcon } from "../Icons/ThreeColourIcon";
import { On1Logo } from "../Icons/On1Logo";
export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();
  const [data, setData] = useState({});

  const bg = useColorModeValue("bg.dark", "bg.light");
  const headerBottom = useColorModeValue("border.dark");
  const lightBg = useColorModeValue("lightBg.dark", "lightBg.light");

  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const userContext = useUserContext();

  useEffect(() => {
    onList()
  }, [])

  const onList = async () => {
    let temp = await userContext.getNotifications();
    if (temp) {
      setData(temp);
    }
  };

  return (
    <>
      <Flex
        bg={bg}
        fontSize="14px"
        top="0"
        width="100%"
        pos="fixed"
        className="z-index2"
        borderBottom="1px solid"
        borderColor={headerBottom}
      >
        <Box>
          <ThreeColourIcon />
        </Box>
        <Flex ml="20px" alignItems={"center"}>
          <On1Logo />
        </Flex>
        <Spacer />
        <Flex gap="31px" alignItems={"center"} pt="44px">
          <Link href="/p2p">
            <Box
              bg="reder"
              px="16px"
              pt="14px"
              pb="15px"
              borderTopRadius="8px"
              cursor={"pointer"}
              position={"relative"}
            >
              <Plus width="24px" height="24px" color="whiter"/>
            </Box>
          </Link>
          {/* <Flex alignItems="center" h="full">
              {<NavNotification data={data} disable={true} />}
            </Flex> */}
          <Flex align="center" h="full" mr="32px">
            {isConnected ? (
              <Box
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                sx={{ display: "contents" }}
              >
                <Menu isOpen={isOpen}>
                  <MenuButton>
                    <Connect />
                  </MenuButton>
                  <MenuList
                    zIndex="11"
                    onMouseLeave={onClose}
                    minW="250px"
                    bg={lightBg}
                  >
                    <MenuItem
                      onClick={() => {
                        disconnect();
                        onClose();
                        window.localStorage.setItem("wallet-address", "");
                        window.localStorage.setItem(
                          "nf3marketplace-connector-choice",
                          null
                        );
                      }}
                      fontWeight="bold"
                      pr="2"
                      color="whiter"
                      bg={lightBg}
                    >
                      Disconnect
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            ) : (
              <Connect />
            )}
          </Flex>


        </Flex>

      </Flex>
    </>
  );
};

const NavLink = ({
  link,
  text,
  currentPath,
  color,
  border,
  borderColor,
  disable = false,
  notCurrentPageColor,
}) => {
  const bg = useColorModeValue("bg.light", "bg.dark");
  const bgTool = useColorModeValue("bg.light", "bg.dark");
  const colorTool = useColorModeValue("title.dark", "title.light");
  const borderTool = useColorModeValue(
    "placeholder.light",
    "placeholder.dark"
  );
  const borderColorTool = useColorModeValue("placeholder.light", "placeholder.dark");

  if (disable)
    return (
      <Tooltip
        hasArrow
        placement="top"
        label={
          <Box display="flex" gap={1}>
            <Box>Coming Soon!!</Box>
            <Image
              alt="no logo"
              src={"/images/eyes.png"}
              h="12px"
              w="13px"
              m={"auto"}
            />
          </Box>
        }
        bg={bgTool}
        color={colorTool}
        border={"2px solid"}
        borderColor={borderColor}
        borderRadius="8px"
        fontSize="12px"
        p="8px 10px"
        sx={{
          "--popper-arrow-shadow-color": borderColorTool,
        }}
      >
        <Box>
          <Box
            cursor={"not-allowed"}
            border={
              currentPath === link.split("/")[1].replace(/^/, "/") ? border : ""
            }
            color={
              currentPath === link.split("/")[1].replace(/^/, "/")
                ? color
                : notCurrentPageColor
            }
            borderBottom={
              currentPath === link.split("/")[1].replace(/^/, "/")
                ? "0px"
                : border
            }
            pt={
              currentPath === link.split("/")[1].replace(/^/, "/")
                ? "14px"
                : "16px"
            }
            pb={
              currentPath === link.split("/")[1].replace(/^/, "/")
                ? "14px"
                : "12px"
            }
            bg={bg}
            borderTopRadius="8px"
            px={
              currentPath === link.split("/")[1].replace(/^/, "/")
                ? "12px"
                : "14px"
            }
            opacity=".6"
            mb={"-2px"}
            fontWeight="bold"
            className="border-fix"
          >
            <Text opacity=".5">{text}</Text>
          </Box>
        </Box>
      </Tooltip>
    );
  else
    return (
      <Link href={link} passHref>
        <Box
          cursor={"pointer"}
          border={
            currentPath === link.split("/")[1].replace(/^/, "/") ? border : ""
          }
          borderColor={borderColor}
          color={
            currentPath === link.split("/")[1].replace(/^/, "/")
              ? color
              : notCurrentPageColor
          }
          borderBottom={
            currentPath === link.split("/")[1].replace(/^/, "/")
              ? "0px"
              : border
          }
          pt={
            currentPath === link.split("/")[1].replace(/^/, "/")
              ? "14px"
              : "16px"
          }
          pb={
            currentPath === link.split("/")[1].replace(/^/, "/")
              ? "14px"
              : "12px"
          }
          bg={bg}
          borderTopRadius="8px"
          px={
            currentPath === link.split("/")[1].replace(/^/, "/")
              ? "12px"
              : "14px"
          }
          mb={"-2px"}
          fontWeight="bold"
          className="border-fix"
        >
          {text}
        </Box>
      </Link>
    );
};
