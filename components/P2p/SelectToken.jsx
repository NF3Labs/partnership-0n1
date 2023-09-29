import {
  Box,
  Flex,
  Image,
  AspectRatio,
  useColorModeValue
} from "@chakra-ui/react";
import { Eliminate } from "../Icons/Eliminate";
import { PolyP2P } from "../Icons/PolyP2P";
import { EthP2P } from "../Icons/EthP2P";
import { CHAIN } from "../../constants/chain";

export const SelectToken = ({
  isEdit,
  type,
  handleRemove,
  index,
  tokenId,
  tokenImage,
  tokenLogo,
  tokenName,
  chainId,
}) => {
  const bg = useColorModeValue("lightBg.dark", "lightBg.light");
  const borderColor = useColorModeValue("border.dark");

  return (
    <Flex
      // border={`1px solid`}
      // borderColor={borderColor}
      position="relative"
    >
      <Box w='full'>
        <>
          {type === "ft" ? (
            <AspectRatio ratio={1}>
              <Box
                bgColor={"whiter"}
              >
                <Image
                  m="auto"
                  h="38px"
                  src={tokenLogo}
                />
              </Box>
            </AspectRatio>
          ) : (
            <AspectRatio ratio={1}>
              <Box
                bgImage={tokenImage}
                backgroundPosition={"center"}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
              />
            </AspectRatio>
          )}
        </>
        <Box fontSize="10px" py="10px" textAlign="center" color="whiter" bg={bg}>
          {type === "ft" ? tokenId + " " + tokenName : tokenName}
        </Box>
        <Box position="absolute" top={"4px"} left={"4px"} w="16px" h="16px">
          {type !== "ft" &&
            (chainId === CHAIN.toString() ? (
              <EthP2P width={"16"} />
            ) : (
              <PolyP2P width={"16"} />
            ))}
        </Box>
      </Box>
      {isEdit && (
        <Box
          zIndex={100}
          cursor='pointer'
          position="absolute"
          top={"-6px"}
          right={"-6px"}
          onClick={() => {
            handleRemove(index);
          }}
        >
          <Eliminate />
        </Box>
      )}
    </Flex>
  );
};
