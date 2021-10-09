import { useEffect, useState } from "react";
import { Text, Flex, useColorMode, Avatar, VStack } from "@chakra-ui/react";
import { myFireauth, myFirestore } from "../../services/Firebase";
import Image from "next/image";

interface FriendProps {
  onFriendClick: any;
}

const Friends = (props: FriendProps) => {
  const [list, setList] = useState<any>([]);
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    const { uid, photoURL, displayName, email }: any = myFireauth.currentUser;
    myFirestore.collection("users").onSnapshot((snapShot) => {
      setList(
        snapShot.docs.map((x) => x.data()).filter((y) => y.email != email)
      );
    });
  }, []);

  return (
    <VStack overflowY="scroll" w="25vw" direction="column" spacing={2}>
      {list.map((x: any, i: number) => (
        <Flex
          opacity="0.89"
          p="1"
          onClick={() => props.onFriendClick(x)}
          key={i}
          width="98%"
          bg={colorMode === "light" ? "white" : "blackAlpha.500"}
          borderBottom="1px"
          borderColor="gray.200"
          align="center"
          justify="space-between"
          _hover={{
            cursor: "pointer",
            bg: colorMode === "light" ? "beta" : "blackAlpha.700",
          }}
        >
          <Avatar size="md" name="Dan Abrahmov" src={x.photoURL} />
          <Text
            color={colorMode === "light" ? "black" : "white"}
            w="70%"
            fontSize="xl"
            fontWeight="400"
            textAlign="center"
          >
            {x.name}
          </Text>
        </Flex>
      ))}
    </VStack>
  );
};

export default Friends;
