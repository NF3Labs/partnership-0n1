import {
  Box,
  Flex,
  Text,
  Skeleton,
  Image,
  AspectRatio,
  useColorModeValue
} from "@chakra-ui/react"
import { CheckNFT } from "../Icons/CheckNFT";
import { CHAIN } from "../../constants/chain";
import { useUserContext } from "../../contexts/User";
import { Verified } from "../Icons/Verified";
import { useLoadImage } from "../../hooks/useLoadImage";

import { FlagP2P } from '../Icons/FlagP2P';
import { PolyP2P } from '../Icons/PolyP2P';
import { EthP2P } from '../Icons/EthP2P';
import { Minus } from '../Icons/Minus';
import { ThreeColourBar } from "../Icons/ThreeColourBar";
export const NFT = ({
  item,
  width,
  isEdit,
  type,
  is1155 = false
}) => {
  const bg = useColorModeValue("lightBg.dark", "lightBg.light");
  const userContext = useUserContext();
  const borderColor = useColorModeValue("border.light");
  const selectedBg = useColorModeValue("selectedBg");

  const selectedLength = !item ? item : item.nft.type !== 'ERC721'
    ? (!type ? userContext?.selectedActionsState?.p2p_nfts.filter(
      (i) =>
        i.nft.contract.toLowerCase() === item.nft.contract?.toLowerCase() &&
        i.nft.token === item.nft.token
    ) : userContext?.selectedActionsState?.p2p_my_nfts.filter(
      (i) =>
        i.nft.contract.toLowerCase() === item.nft.contract?.toLowerCase() &&
        i.nft.token === item.nft.token
    ))
    : (!type ? userContext?.selectedActionsState?.p2p_nfts.find(
      (i) =>
        i.nft.contract.toLowerCase() === item.nft.contract?.toLowerCase() &&
        i.nft.token === item.nft.token
    ) : userContext?.selectedActionsState?.p2p_my_nfts.find(
      (i) =>
        i.nft.contract.toLowerCase() === item.nft.contract?.toLowerCase() &&
        i.nft.token === item.nft.token
    ));

  const handleSelectNFT = (item) => {
    let data = type ? userContext?.selectedActionsState?.p2p_my_nfts : userContext?.selectedActionsState?.p2p_nfts;
    const fts = type ? userContext?.selectedActionsState?.p2p_my_fts : userContext?.selectedActionsState?.p2p_fts;
    const isIn = data.filter((i) => {
      return i.nft.contract === item.nft.contract && i.nft.token === item.nft.token && i.nft.name === item.nft.name;
    });
    if (isIn.length > 0) {
      const newData = data.filter(
        (i) => i.nft.contract !== item.nft.contract || i.nft.token !== item.nft.token || i.nft.name !== item.nft.name
      );
      userContext?.dispatchSelectedActions({
        type: type ? "HANDLE_P2P_MY_NFT" : "HANDLE_P2P_NFT",
        payload: newData,
      });
      return;
    }
    if (data.length + 1 + fts.length > 16) {
      infoToast("Max Reached", "16 is the maximum able to be listed.");
      return;
    }
    data.push({
      ...item,
      ["image_url"]: item.nft.image_url,
    });

    userContext?.dispatchSelectedActions({
      type: type ? "HANDLE_P2P_MY_NFT" : "HANDLE_P2P_NFT",
      payload: data,
    });
  };

  const handleQuantityChange = (item, quantity, length) => {
    let data = type ? userContext?.selectedActionsState?.p2p_my_nfts : userContext?.selectedActionsState?.p2p_nfts;

    if (quantity === length) {
      const newData = data.filter(
        (i) => i.nft.contract !== item.nft.contract || i.nft.token !== item.nft.token || i.nft.name !== item.nft.name
      );
      userContext?.dispatchSelectedActions({
        type: type ? "HANDLE_P2P_MY_NFT" : "HANDLE_P2P_NFT",
        payload: newData,
      });
      return;
    }
    let isIn = data.filter((i) => {
      return i.nft.contract === item.nft.contract && i.nft.token === item.nft.token && i.nft.name === item.nft.name;
    });
    if (isIn.length > length) {
      const newData = data.filter(
        (i) => i.nft.contract !== item.nft.contract || i.nft.token !== item.nft.token || i.nft.name !== item.nft.name
      );
      newData.push(isIn[0]);
      userContext?.dispatchSelectedActions({
        type: type ? "HANDLE_P2P_MY_NFT" : "HANDLE_P2P_NFT",
        payload: newData,
      });
    } else {
      data.push({
        ...item,
        ["image_url"]: item.nft.image_url,
      })

      userContext?.dispatchSelectedActions({
        type: type ? "HANDLE_P2P_MY_NFT" : "HANDLE_P2P_NFT",
        payload: data,
      });
    }
  };

  const handleRemoveNft = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let data = type ? userContext?.selectedActionsState?.p2p_my_nfts : userContext?.selectedActionsState?.p2p_nfts;
    const multi = data.filter(
      (i) => i.nft.contract === item.nft.contract && i.nft.token === item.nft.token
    );
    let newData = data.filter(
      (i) => i.nft.contract !== item.nft.contract || i.nft.token !== item.nft.token
    );
    if (multi?.length > 1) {
      for (let i = 0; i < multi?.length - 1; i++)
        newData.push(multi?.[0]);
    }
    userContext?.dispatchSelectedActions({
      type: type ? "HANDLE_P2P_MY_NFT" : "HANDLE_P2P_NFT",
      payload: newData,
    });
  }

  const { isLoaded } = useLoadImage(item ? item.nft.thumbnail_url : '');

  return (
    <>
      {item.nft.type === 'ERC721' ? <Flex
        cursor={isEdit ? 'pointer' : ''}
        border={isEdit && selectedLength ? `2px solid` : ""}
        borderColor={'whiter'}
        bg={bg}
        onClick={() => {
          if (!isEdit) return;

          if (item.nft.type === 'ERC721') {
            handleSelectNFT(item);
          } else {
            handleQuantityChange(item, item.quantity);
          }
        }}
      >
        <Box
          m='auto'
          minW={width}
          w='full'
          position='relative'
        >
          <Box>
            <ThreeColourBar />
          </Box>
          <Box>
            <Skeleton isLoaded={isLoaded} w="full">
              <AspectRatio ratio={1}>
                <Box
                  bgImage={item.nft.thumbnail_url}
                  backgroundPosition={"center"}
                  backgroundRepeat={"no-repeat"}
                  backgroundSize={"cover"}
                  style={{ filter: 'blur(1px)' }}
                >
                  <Image
                    src={item.nft.image_url}
                    alt=""
                    onLoad={(event) => {
                      event.target.parentElement.style.filter = 'none';
                      event.target.style.display = 'block';
                    }}
                    loading="lazy"
                    style={{ display: 'none', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </AspectRatio>
            </Skeleton>
          </Box>
          <Flex mt='12px' px="22px" alignItems='center' justifyContent="left">
            <Box fontSize='12px' color="whiter" textAlign='center'>{item ? item.nft.collection_name + " " + item.nft.token : ""}</Box>
          </Flex>
          <Flex mb='12px' px="22px" alignItems='center' justifyContent="left">
            <Box fontSize='12px' textAlign='center' color="whiter">{item ? item.nft.collection_name : ""}</Box>
            {item && (!isEdit ? item.nft.is_whitelisted : item.is_whitelisted) && <>&nbsp;<Verified /></>}
          </Flex>
          {isEdit && selectedLength && <Box position='absolute' top={'14px'} right={'8px'}>
            <CheckNFT />
          </Box>}
          <Box position='absolute' top={'14px'} left={'8px'} w='full' h='full'>
            {(item && item.nft.chain === CHAIN.toString()) ? <EthP2P /> : <PolyP2P />}
            <Box h='3px' />
            {(item && item.nft.is_flagged) && <FlagP2P />}
          </Box>
        </Box>
      </Flex> : <Flex
        cursor={isEdit ? 'pointer' : ''}
        border={isEdit && selectedLength ? `2px solid` : ""}
        borderColor={'whiter'}
        bg={bg}
        onClick={() => {
          if (!isEdit) return;

          if (item.nft.type === 'ERC721') {
            handleSelectNFT(item);
          } else {
            handleQuantityChange(item, item.quantity, selectedLength.length);
          }
        }}
      >
        <Box
          m='auto'
          minW={width}
          w='full'
          position='relative'
        >
          {is1155 && <Box
            position='absolute'
            bottom='14px'
            right='19px'
          >
            <Text color='secondary' fontSize={'10px'} textAlign='right'>max count: {item.quantity}</Text>
            <Text color='secondary' fontSize={'10px'} textAlign='right'>select: {selectedLength.length}</Text>
          </Box>}
          <Box>
            <Skeleton isLoaded={isLoaded} w="full">
              <AspectRatio ratio={1}>
                <Box
                  bgImage={item.nft.thumbnail_url}
                  backgroundPosition={"center"}
                  backgroundRepeat={"no-repeat"}
                  backgroundSize={"cover"}
                  style={{ filter: 'blur(1px)' }}
                >
                  <Image
                    src={item.nft.image_url}
                    alt=""
                    onLoad={(event) => {
                      event.target.parentElement.style.filter = 'none';
                      event.target.style.display = 'block';
                    }}
                    loading="lazy"
                    style={{ display: 'none', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </AspectRatio>
            </Skeleton>
          </Box>
          <Flex mt='12px' px="22px" alignItems='center' justifyContent="center">
            <Box fontSize='12px' color="whiter" textAlign='center'>{item ? item.nft.collection_name + " " + item.nft.token : ""}</Box>
          </Flex>
          <Flex mb='12px' px="22px" alignItems='center' justifyContent="center">
            <Box fontSize='12px' textAlign='center' color="whiter">{item ? item.nft.collection_name : ""}</Box>
            {item && (!isEdit ? item.nft.is_whitelisted : item.is_whitelisted) && <>&nbsp;<Verified /></>}
          </Flex>
          {isEdit && selectedLength && <Box position='absolute' top={'14px'} right={'8px'}>
            <CheckNFT />
          </Box>}
          {isEdit && selectedLength.length !== 0 &&
            <Box
              position='absolute'
              top={'11px'}
              left={'16px'}
              zIndex={2}
              borderRadius='full'
              onClick={(e) => handleRemoveNft(e)}
            >
              <Minus width="30px" height="30px" />
            </Box>}
          <Box position='absolute' top={'14px'} left={'8px'} w='full' h='full'>
            {(item && item.nft.chain === CHAIN.toString()) ? <EthP2P /> : <PolyP2P />}
            <Box h='3px' />
            {(item && item.nft.is_flagged) && <FlagP2P />}
          </Box>
        </Box>
      </Flex>}
    </>
  )
}