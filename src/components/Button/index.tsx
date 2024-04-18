import React, { ComponentProps } from "react";
import * as S from "./styles";
import { MotionProps, Variants } from "framer-motion";

type Props = {
  children: React.ReactNode;
} & ComponentProps<"button"> &
  MotionProps;

const BUTTON_VARIANTS: Variants = {
  hover: {
    scale: 1.01,
    y: -2,
    boxShadow:
      "0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)",
  },
  tap: {
    scale: 1,
    boxShadow: "none",
  },
};

const Button = ({ children, ...props }: Props) => {
  return (
    <S.Container
      variants={BUTTON_VARIANTS}
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </S.Container>
  );
};

export default Button;
