import { Text, Flex, Button } from "@chakra-ui/react";
import Navbar from "../layout/Navbar";
import Image from "next/image";

interface LandingProps {
  signIn: any;
}

const Landing = (props: LandingProps) => {
  return (
    <>
      <Navbar />
      <Flex h={["76vh", "88vh"]} w="100vw" p="1.4rem" className="landing">
        <Flex
          w={["100%", "65%"]}
          direction="column"
          align="start"
          justify="center"
          className="landing__title"
        >
          <Text w="100%">Pharmacopoeia You Can Trust.</Text>
          <Text w="100%">Safe and accurate using the openFDA API</Text>
          <Button
            variant="primary"
            mt="0.7rem"
            h="7vh"
            size="md"
            onClick={props.signIn}
          >
            Sign In Google
          </Button>
        </Flex>
        <Flex display={["none", "flex"]} w="35%" className="landing__logo">
          <Image src="/illustration.svg" height={350} width={350} alt="logo" />
        </Flex>
      </Flex>
    </>
  );
};

export default Landing;
