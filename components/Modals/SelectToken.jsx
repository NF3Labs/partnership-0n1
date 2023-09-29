import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  Image,
  Button,
  Wrap,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { X } from "../Icons/X";
import { useState, useEffect } from "react";
import { TokenItem } from "../Items/Items";

export const SelectToken = ({
  isOpen,
  onClose,
  handleConfirm,
  tokenOptions,
  selectedTokens,
  handleRemove,
  erc20Balance,
  isUser,
}) => {
  const bg = useColorModeValue("bg.dark", "bg.light");
  const input = useColorModeValue("input.light", "input.dark");
  const lightBg = useColorModeValue("lightBg.dark", "lightBg.light");
  const color = useColorModeValue("border.light");
  const menuBg = useColorModeValue("bg.light", "bg.dark");
  const selected = useColorModeValue("lightBg.light", "lightBg.dark");
  const [amount, setAmount] = useState("");
  const [contract, setContract] = useState("");
  const [validation, setValidation] = useState(false);
  const selectedToken =
    contract !== "" && erc20Balance?.filter((i) => i.contract === contract)[0];

  useEffect(() => {
    if (!isOpen && amount !== "" && contract !== "") {
      setAmount("");
      setContract("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, amount, contract]);

  const confirm = () => {
    handleConfirm(contract, amount);
    onClose();
  };

  const chakraStyles = {
    control: () => ({
      display: "flex",
      width: "full",
      pt: "1.5",
      color: "whiter",
      cursor: "pointer",
    }),
    menuList: () => ({
      bg: lightBg,
      color: 'whiter'
    }),
    option: (provided, state) => ({
      py: "2",
      px: "3",
    }),
  };

  const options = tokenOptions?.map((i, idx) => ({
    label: (
      <Flex gap="1">
        <Box>{i.symbol}</Box>
        {i.thumbnail && <Image alt="" src={i.thumbnail} w="20px" h="20px" color={"whiter"} />}
      </Flex>
    ),
    value: i.contract,
  }));

  const handleChange = (e) => {
    const regex =
      /^(([1-9]\d{0,5})|([1-9]\d{0,5})((?:\.([1-9]{1,4}))|(?:\.(0[1-9]{1,3}))|(?:\.([0-9]{1}0[1-9]{1,2}))|(?:\.([0-9]{2}0[1-9]{1})))|(0((?:\.([1-9]{1,4}))|(?:\.(0[1-9]{1,3}))|(?:\.([0-9]{1}0[1-9]{1,2}))|(?:\.([0-9]{2}0[1-9]{1})))))?$/gm;

    setAmount(e.target.value);
    if (regex.exec(e.target.value)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent bgColor={bg}>
        <Box py="5" px="20" pos="relative">
          <Box
            pos="absolute"
            top="7"
            right="7"
            color={"whiter"}
            onClick={onClose}
            cursor="pointer"
          >
            <X width="20px" />
          </Box>
          <Text fontSize="24px" fontWeight="bold" textAlign="center" color="whiter" mt="48px">
            Select fungible token
          </Text>
          <Text
            fontSize="16px"
            textAlign="center"
            mt="12px"
            color={input}
          >
            {" "}
            Select token and amount of token to include in your swap
          </Text>
          <Flex
            border={"1px solid"}
            borderColor={input}
            borderRadius="4px"
            w="185px"
            h="40px"
            mx="auto"
            mt="24px"
            mb="40px"
            bg={lightBg}
          >
            <Input
              variant="unstyled"
              borderRight={"1px solid"}
              borderColor={input}
              borderRightRadius="0px"
              pl="12px"
              color="whiter"
              placeholder="0"
              value={amount}
              w="90px"
              onChange={handleChange}
              type="number"
            />
            <Select
              isSearchable={false}
              color="whiter"
              openMenuOnFocus={false}
              onChange={(e) => setContract(e.value)}
              value={options?.find((item) => item.value === contract) ?? null}
              options={options}
              placeholder={"ERC20"}
              border="none"
              borderLeftRadius="0px"
              chakraStyles={chakraStyles}
              useBasicStyles
            />
          </Flex>
          {contract !== "" && selectedToken && isUser ? (
            <Flex
              pb="2"
              gap="1"
              overflow={'hidden'}
              justifyContent={"center"}
              whiteSpace={"nowrap"}
              color={"whiter"}
            >
              <Box>{selectedToken?.symbol} Balance: </Box>
              <Box>{selectedToken?.balanceFormatted}</Box>
            </Flex>
          ) : null}
          {validation ? (
            <Box
              textColor={"red"}
              display={"flex"}
              alignItems={"center"}
            >
              Max digit of token value is 6 and decimal is 4.
            </Box>
          ) : (
            <Box
              textColor={"red"}
              display={"flex"}
              alignItems={"center"}
            ></Box>
          )}
          <Wrap pt="2" mx="auto" justify="center" maxW="lg" spacing="4">
            {selectedTokens?.map((i, idx) => (
              <TokenItem
                key={idx}
                contractAddress={i.contract}
                amount={i.amount}
                hasRemoveOption={true}
                handleRemove={() => handleRemove(i.contract, i.amount)}
              />
            ))}
          </Wrap>

          <Flex pb="32px" gap="12px" justify="center" mt="40px">
            <Button
              textAlign="center"
              w="150px"
              py="12px"
              px="24px"
              fontWeight="bold"
              color="blacker"
              onClick={onClose}
              cursor="pointer"
              bg="whiter"
              fontSize="14px"
              borderRadius="0"
              _hover={{ opacity: 0.6 }}
            >
              Cancel
            </Button>
            <Button
              cursor="pointer"
              bg="reder"
              _hover={{ opacity: 0.6 }}
              _focus={{ opacity: 1 }}
              color="whiter"
              textAlign="center"
              w="150px"
              py="12px"
              px="24px"
              isDisabled={
                isUser
                  ? contract === "" ||
                  amount === "" ||
                  validation ||
                  Number(selectedToken?.balanceFormatted) < Number(amount)
                  : contract === "" || amount === "" || validation
              }
              onClick={confirm}
              fontWeight="bold"
              borderRadius="0"
            >
              Confirm
            </Button>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};
