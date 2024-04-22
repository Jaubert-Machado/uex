import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    text: {
      primary: "hsl(270, 50%, 48%)",
      onPrimary: "hsl(0, 0%, 100%)",
      error: "hsl(0, 75%, 42%)",
      neutral: "hsl(0, 0%, 0%)",
    },
    container: {
      primary: "hsl(270, 50%, 48%)",
      primaryLight: "hsl(270, 47%, 80%)",
      primaryDark: "hsl(270, 50%, 34%)",
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
