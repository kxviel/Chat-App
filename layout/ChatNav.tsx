import { Text, Flex, IconButton, useColorMode, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { myFireauth } from "../services/Firebase";

const ChatNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
      <Text textAlign={["center", "start"]} w={["100%", "44%", "42%"]}>
        Cynefin
      </Text>
      <Flex
        w={["100%", "56%", "49%"]}
        pt={[4, 0]}
        align="center"
        justify="end"
        className="nav__items"
      >
        <Button
          variant="secondary"
          w={["33%", "20%"]}
          onClick={() => myFireauth.signOut()}
        >
          Logout
        </Button>
        <IconButton
          w={["33%", "20%"]}
          variant="primary"
          ml="2.4rem"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label="Theme Switcher"
        />
      </Flex>
    </Flex>
  );
};

export default ChatNav;
