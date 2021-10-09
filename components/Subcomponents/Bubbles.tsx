import { useEffect, useRef, useState } from "react";
import { myFireauth } from "../../services/Firebase";
import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Avatar,
  Input,
} from "@chakra-ui/react";
interface BubbleProps {
  data: any;
}

const Bubbles = (props: BubbleProps) => {
  const { email }: any = myFireauth.currentUser;
  const [sorted, setSorted] = useState<any>([]);
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current.addEventListener(
      "DOMNodeInserted",
      (event: { currentTarget: any }) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      }
    );
  };
  useEffect(() => {
    props.data.sort(
      (a: { timeStamp: number }, b: { timeStamp: number }) =>
        b.timeStamp - a.timeStamp
    );
    setSorted(props.data);
    scrollToBottom();
  }, [props.data]);

  return (
    <>
      <Flex direction="column-reverse" h="70vh" ref={messagesEndRef} p="7">
        {sorted.map((x: any, i: any) => (
          <Flex
            key={i}
            bg="#f4f4f4"
            alignSelf={x.from === email ? "flex-end" : "flex-start"}
            borderRadius={
              x.from === email ? "20px 20px 3px 20px" : "20px 20px 20px 3px"
            }
            p="4"
            mt="2"
            mb="2"
          >
            {x.text}
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default Bubbles;
