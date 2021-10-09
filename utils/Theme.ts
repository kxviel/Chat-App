import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/Button";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors: {
    alpha: "#F9F3F6",
    beta: "#FFEAF0",
    betaT: "#FFEAF015",
    gamma: "#c7c4f8",
  },
  components: {
    Button,
  },
  config,
});
