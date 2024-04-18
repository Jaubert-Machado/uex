"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

type Props = {
  children: React.ReactNode;
};

const StyledThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyledThemeProvider;
