import React, { ComponentProps } from "react";
import * as S from "./styles";
import IconButton from "@components/IconButton";

type Props = {
  onClear: () => void;
  onSort: () => void;
} & ComponentProps<"input">;

const ContactFilter = ({ onClear, onSort, value, ...props }: Props) => {
  return (
    <S.Container>
      <S.SearchIcon size={25} />
      <S.SearchField {...props} value={value} />
      {value && (
        <IconButton whileHover={undefined} onClick={onClear}>
          <S.ClearIcon size={25} />
        </IconButton>
      )}
      {!value && (
        <IconButton whileHover={undefined} onClick={onSort}>
          <S.SortIcon size={25} />
        </IconButton>
      )}
    </S.Container>
  );
};

export default ContactFilter;
