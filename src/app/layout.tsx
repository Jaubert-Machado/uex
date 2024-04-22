import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@providers/StyledComponentsRegistry";
import StyledThemeProvider from "@providers/StyledThemeProvider";

type Props = {
  children: React.ReactNode;
};

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "uex Location",
  description: "Front-end application for uex Location",
};

export const RootLayout = ({ children }: Readonly<Props>) => {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StyledComponentsRegistry>
          <StyledThemeProvider>{children}</StyledThemeProvider>
        </StyledComponentsRegistry>
        <div id="modal" />
      </body>
    </html>
  );
};

export default RootLayout;
