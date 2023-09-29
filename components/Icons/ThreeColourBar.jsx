import { Grid, GridItem } from "@chakra-ui/react";

export const ThreeColourBar = (props) => (
  <Grid templateColumns="repeat(3, 1fr)" w="full" h="4px">
    <GridItem
      bg="reder"
    />
    <GridItem
      bg="yellower"
    />
    <GridItem
      bg="cyaner"
    />
  </Grid>
);
