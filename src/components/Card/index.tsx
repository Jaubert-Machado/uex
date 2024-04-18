import React, { ComponentProps } from "react";
import * as S from "./styles";

type Props = {
  children: React.ReactNode;
} & ComponentProps<"div">;

const Card = ({ children, ...props }: Props) => {
  return <S.Container {...props}>{children}</S.Container>;
};

export default Card;
