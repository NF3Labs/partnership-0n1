import { extendTheme, useColorModeValue } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  /* fonts: {
    body: `'Grandis', sans-serif`,
  }, */
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#FFFFFF", "#1A1429")(props),
        color: mode("#000000", "#FFFFFF")(props),
      },
    }),
  },
  colors: {
    bg: {
      dark: "#000000",
      light: "#FFFFFF"
    },
    border: {
      dark: "#333",
      light: "#5D6681",
    },
    lightBg: {
      dark: "#1E1E1E",
      light: "#F1F1F1",
    },
    title: {
      dark: "#424242",
      light: "#424242"
    },
    outBg: {
      dark: "#060B2D",
      light: "#060B2D",
    },
    content: {
      dark: "#C4C4D4",
      light: "#6E7186"
    },
    header: {
      dark: "#403462",
      light: "#BCBCBC"
    },
    input: {
      dark: "#575757",
      light: "#696869"
    },
    selecter: {
      dark: "#ffffff",
      light: "#000000"
    },
    tabColor: {
      dark: "#07E779",
      light: "#FF1734",
    },
    reder: "#FF494E",
    yellower: "#F1F105",
    cyaner: "#03BDB8",
    whiter: "#FFFFFF",
    blacker: "#000000",
    grayer: "#F1F1F1",
    pinker: "#FF0083",
    whitePinker: "#FF80C1",
    greener: "#4ACB53",
    oranger: "#FF2E00",
    pinkerHover: "#FF008350",
    whiteHover: "#ffffffb0",
    bluer: "#1197E2",
    special: "#9EA3B3",
    transparentColor: "rgba(255, 255, 255, 0.12)",
    labelColor: "rgba(255, 255, 255, 0.20)",
    titleHover: {
      dark: "#ffffff50",
      light: "#00000050"
    },
    placeholder: {
      dark: "#C4C4D4",
      light: "#BCBCBC"
    }
  },
  components: {
    Alert: {
      variants: {
        // define own toast variant
        toast: (props) => ({
          container: {
            border: mode("2px solid black", "2px solid white")(props),
            bg: mode("#FFFFFF", "#1A1429")(props),
          },
        }),
      },
    },
  },
});

export default theme;
