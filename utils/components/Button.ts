import { Theme } from "../../node_modules/@chakra-ui/theme/dist/types";
import { mode, darken, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  variants: {
    primary: (props: Theme) => ({
      bg: "alpha",
      color: "#222",
      _hover: {
        bg: mode(whiten("beta", 20), darken("alpha", 20))(props),
        boxShadow: "md",
      },
    }),
  },
};
