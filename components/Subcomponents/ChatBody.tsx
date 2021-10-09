import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { myFireauth, myFirestore } from "../../services/Firebase";
import Bubbles from "./Bubbles";
import Image from "next/image";
import {
  Text,
  Flex,
  FormControl,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/react";

interface ChatBodyProps {
  selectedFriend: any;
}
type Inputs = {
  text: string | any;
};

const ChatBody = (props: ChatBodyProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [allMessages, setMessages] = useState<any>([]);

  useEffect(() => {
    const { email }: any = myFireauth.currentUser;
    if (props.selectedFriend[1] !== undefined) {
      myFirestore
        .collection("messages")
        .limit(1000)
        .onSnapshot((snapShot) => {
          setMessages([
            //To Me<=>From Them
            ...snapShot.docs
              .map((x) => x.data())
              .filter(
                (x) => x.to === email && x.from === props.selectedFriend[1]
              ),
            //To Them<=>From Me
            ...snapShot.docs
              .map((x) => x.data())
              .filter(
                (x) => x.to === props.selectedFriend[1] && x.from === email
              ),
          ]);
        });
    }
  }, [props.selectedFriend]);

  const onSubmit = async (data: any) => {
    const { email }: any = myFireauth.currentUser;
    if (data.text.length) {
      const messageToSend = {
        from: `${email}`,
        to: `${props.selectedFriend[1]}`,
        text: data.text,
        timeStamp: new Date().getTime(),
      };
      reset(
        { text: "" },
        {
          keepValues: false,
        }
      );
      await myFirestore.collection("messages").add(messageToSend);
    } else {
      alert("Enter a Valid Message");
    }
  };
  return (
    <>
      <Flex h="100%" w="77vw" direction="column">
        {props.selectedFriend[0] == null ? (
          <>
            <Flex
              align="center"
              justify="center"
              h="8vh"
              w="100%"
              bg="betaT"
              p="0.7rem"
            >
              <Text fontSize="2xl" fontWeight="500">
                Start a Chat
              </Text>
            </Flex>
            <Flex align="center" justify="center" h="77vh" w="100%" p="0.7rem">
              <Image src="/begin.svg" height={350} width={350} alt="logo" />
            </Flex>
          </>
        ) : (
          <>
            <Flex
              align="center"
              justify="center"
              h="8vh"
              w="100%"
              bg="betaT"
              p="0.7rem"
            >
              <Text fontSize="2xl" fontWeight="500">
                {props.selectedFriend[0]}
              </Text>
            </Flex>

            <Bubbles data={allMessages} />

            <form
              // style={{ height: "7vh", backgroundColor: "red" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Flex direction="row" w="100%">
                <FormControl isInvalid={errors.text}>
                  <Input
                    id="text"
                    placeholder="Enter Text..."
                    {...register("text", {
                      required: "This is required",
                      minLength: {
                        value: 1,
                        message: "Send Valid Text",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.text && errors.text.message}
                  </FormErrorMessage>
                </FormControl>
                <Button variant="secondary" type="submit">
                  Send
                </Button>
              </Flex>
            </form>
          </>
        )}
      </Flex>
    </>
  );
};

export default ChatBody;
