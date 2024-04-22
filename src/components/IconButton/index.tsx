import React, { ComponentProps } from "react";
import * as S from "./styles";
import { useTheme } from "styled-components";
import { MotionProps } from "framer-motion";

type Props = {
  children: React.ReactNode;
} & ComponentProps<"button"> &
  MotionProps;

const IconButton = ({ children, ...props }: Props) => {
  const theme = useTheme();

  return (
    <S.Container
      whileHover={{
        backgroundColor: theme.colors.container.primaryLight,
      }}
      type="button"
      {...props}
    >
      {children}
    </S.Container>
  );
};

export default IconButton;
