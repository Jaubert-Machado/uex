import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    text: {
      primary: "hsl(0, 0%, 13%)",
      secondary: "hsl(0, 0%, 46%)",
      tertiary: "hsl(183, 40%, 27%)",
      error: "hsl(0, 75%, 42%)",
    },
    container: {
      primary: "hsl(189, 58%, 53%)",
      primaryLight: "hsl(187, 66%, 72%)",
      secondary: "hsl(9, 58%, 53%)",
      tertiary: "hsl(219, 58%, 53%)",
      error: "hsl(0, 75%, 42%)",
    },
    surface: {
      neutral: "hsl(72, 50%, 96%)",
      dim: "hsl(72, 12%, 84%)",
      bright: "hsl(72, 50%, 96%)",
    },
  },
  paddings: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
};
