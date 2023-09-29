import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export const On1Logo = () => (
  <Link href="/p2p">
    <Box cursor={"pointer"}>
      <Image
        src={useColorModeValue("/images/0n1-logo-white.png", "/images/0n1-logo-white.png")}
        alt=""
        width="107px"
        height="60px"
      />
    </Box>
  </Link>
);
