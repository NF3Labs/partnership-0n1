import {
  Box,
  Flex,
  useColorModeValue,
  Spacer,
  Text,
  GridItem,
  Grid,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import { Exchange } from "../Icons/Exchange";
import { getBeautifulAddress } from "../../utils/formatters";
import { useCountDown } from "../../hooks/useCountDown";
import {
  getTimeInSecondsFromTimeString,
  getTimeSlash,
} from "../../utils/formatters";
import { useAppContext } from "../../contexts/App";

export const P2PItem = ({ index, tabIndex, item, onCheck }) => {
  const borderColor = useColorModeValue("border.dark", "border.light");
  const tabColor = useColorModeValue("tabColor.light");
  const selectedColor = useColorModeValue("tabColor.dark");
  const appContext = useAppContext();
  const { minutes, hours, days } = useCountDown({
    endTime: getTimeInSecondsFromTimeString(item.end_time),
  });

  const date = getTimeSlash(item.end_time);

  const leftOwner = item.is_sent ? item.rightOwner : item.leftOwner;
  const rightOwner = item.is_sent ? item.leftOwner : item.rightOwner;

  const leftNFT = item.is_sent ? item.rightNFT : item.leftNFT;
  const leftFT = item.is_sent ? item.rightFT : item.leftFT;

  const rightNFT = item.is_sent ? item.leftNFT : item.rightNFT;
  const rightFT = item.is_sent ? item.leftFT : item.rightFT;

  return (
    <>
      <Box
        px="34px"
        mb="32px"
      >
        <Flex>
          <Text
            fontSize="16px"
            fontWeight="bold"
            color={
              tabIndex === 0
                ? "yellower"
                : tabIndex === 1
                  ? "cyaner"
                  : "reder"
            }
            sx={{ textTransform: "uppercase" }}
          >
            {tabIndex === 0
              ? item.is_sent
                ? "SWAP OFFER SENT"
                : "SWAP OFFER RECEIVED"
              : tabIndex === 1
                ? "COMPLETED"
                : item.status}
          </Text>
          <Spacer />
          {tabIndex !== 0 ? (
            <Text fontSize="16px" fontWeight="bold" color="whiter">
              DATE :&nbsp;{date}
            </Text>
          ) : (
            <Text fontSize="16px" fontWeight="bold" color="whiter">
              Expiry :&nbsp;
              {(days !== 0 ? days + (days === 1 ? " day" : " days") : "") +
                " " +
                (hours !== 0 ? hours + (hours === 1 ? " hr" : " hrs") : "") +
                " " +
                (minutes !== 0
                  ? minutes + (minutes === 1 ? " min" : " mins")
                  : "")}
              &nbsp;left
            </Text>
          )}
        </Flex>
        <Grid mt="12px" templateColumns="repeat(2, 1fr)">
          <GridItem colSpan={1}>
            <Flex alignItems="center">
              <Flex>
                <Avatar
                  name={item.is_sent ? "You" : leftOwner.name}
                  src={leftOwner.image}
                  width="60px"
                  height="60px"
                  borderRadius="0px"
                />
                <Box ml="12px">
                  <Text
                    fontWeight="bold"
                    fontSize="14px"
                    color="whiter"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Created by
                  </Text>
                  <Text
                    fontSize="14px"
                    color="whiter"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.is_sent ? "You" : leftOwner.name}
                  </Text>
                  <Text
                    fontSize="14px"
                    color="whiter"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {getBeautifulAddress(leftOwner.address)}
                  </Text>
                </Box>
              </Flex>
              <Box m="auto" mx="24px">
                <Exchange />
              </Box>
              <Flex>
                <Avatar
                  name={!item.is_sent ? "You" : rightOwner.name}
                  src={rightOwner.image}
                  width="60px"
                  height="60px"
                  borderRadius="0px"
                />
                <Box flex="1" ml="12px">
                  <Text
                    fontWeight="bold"
                    fontSize="14px"
                    color="whiter"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Offered to
                  </Text>
                  <Text
                    fontSize="14px"
                    color="whiter"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {!item.is_sent ? "You" : rightOwner.name}
                  </Text>
                  <Text
                    fontSize="14px"
                    color="whiter"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {getBeautifulAddress(rightOwner.address)}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Flex>
              <Flex flex="1">
                <Flex m="auto">
                  <AvatarGroup size="md" max={2}>
                    {leftNFT.map((item, index) => {
                      return (
                        <Avatar
                          key={index}
                          name={item.nft.name}
                          src={item.nft.image_url}
                          width="60px"
                          height="60px"
                        />
                      );
                    })}
                    {leftFT.map((item, index) => {
                      return (
                        <Avatar
                          key={leftNFT.length + index}
                          name={item.ft.logo ? item.ft.logo : item.ft.name}
                          src={item.ft.logo}
                          width="60px"
                          height="60px"
                        />
                      );
                    })}
                  </AvatarGroup>
                  <Box m="auto" mx="24px">
                    <Exchange />
                  </Box>
                  <AvatarGroup size="md" max={2}>
                    {rightNFT.map((item, index) => {
                      return (
                        <Avatar
                          key={index}
                          name={item.nft.name}
                          src={item.nft.image_url}
                          width="60px"
                          height="60px"
                        />
                      );
                    })}
                    {rightFT.map((item, index) => {
                      return (
                        <Avatar
                          key={rightFT.length + index}
                          name={item.ft.logo ? item.ft.logo : item.ft.name}
                          src={item.ft.logo}
                          width="60px"
                          height="60px"
                        />
                      );
                    })}
                  </AvatarGroup>
                </Flex>
              </Flex>
              <Box my="auto" ml="12px">
                <Box
                  px="25px"
                  py="18px"
                  fontSize="10px"
                  fontWeight="bold"
                  w="117px"
                  bg="reder"
                  _hover={{ opacity: "0.6" }}
                  color="whiter"
                  cursor="pointer"
                  onClick={() => {
                    onCheck(index);
                  }}
                  textAlign="center"
                >
                  Check Deal
                </Box>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
        <Box w="100%" h="2px" mt="32px" bg={borderColor}/>
      </Box>
    </>
  );
};
