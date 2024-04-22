import React from "react";
import * as S from "./styles";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdDelete,
  MdEditSquare,
  MdPersonPin,
} from "react-icons/md";
import Button from "@components/Button";
import { ContactData } from "../../types/contacts";
import { useTheme } from "styled-components";

type Props = {
  data: ContactData;
  onFocusClick?: () => void;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
};

const Contact = ({
  data: { name, address, addOnAddress, cep, cpf, phone },
  onFocusClick,
  onDeleteClick,
  onEditClick,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <S.Container>
      <S.ContactHeader>
        <S.ContactName>{name}</S.ContactName>
        <S.ContactAddressContainer>
          <S.ContactAddress>{phone}</S.ContactAddress>
          <S.CardExpandButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
          </S.CardExpandButton>
        </S.ContactAddressContainer>
      </S.ContactHeader>
      {open && (
        <S.ContactBody>
          <S.Info>
            <span>CPF: </span>
            {cpf}
          </S.Info>
          <S.Info>
            <span>Endereço: </span>
            {address}
          </S.Info>
          <S.Info>
            <span>Complemento: </span>
            {addOnAddress}
          </S.Info>
          <S.Info>
            <span>CEP: </span>
            {cep}
          </S.Info>
          <S.ButtonsContainer>
            <Button
              onClick={onDeleteClick}
              icon={<S.DeleteIcon />}
              style={{
                color: theme.colors.text.error,
              }}
            >
              Deletar
            </Button>
            <Button onClick={onEditClick} icon={<S.EditIcon />}>
              Editar
            </Button>
            <Button onClick={onFocusClick} icon={<S.FindIcon />}>
              Localizar
            </Button>
          </S.ButtonsContainer>
        </S.ContactBody>
      )}
    </S.Container>
  );
};

export default Contact;
