import { Text, Flex } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      h={["24vh", "12vh"]}
      w="100vw"
      p="2.1rem"
      direction={["column", "row", "row"]}
      align="center"
      justify={["center", "space-between"]}
      className="nav"
    >
      <Text textAlign={["center", "start"]} w={["100%", "50%", "35%"]}>
        Cynefin
      </Text>
      <Flex
        w={["100%", "50%", "35%"]}
        pt={[4, 0]}
        align="center"
        justify="end"
        className="nav__items"
      >
        <Text w={["50%", "28%"]} textAlign="center" mr="2.1rem">
          <a href="mailto:kevkanae777@gmail.com">Contact</a>
        </Text>
        <Text w={["50%", "28%"]} textAlign="center">
          <a href="https://github.com/kevkanae/Chat-App">Contribute</a>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
