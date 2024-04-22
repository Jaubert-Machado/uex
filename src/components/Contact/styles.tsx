"use client";

import { MdDelete, MdEditSquare, MdPersonPin } from "react-icons/md";
import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.container.primary};
`;

export const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContactName = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

export const ContactAddress = styled.p`
  font-size: 0.8rem;
`;

export const ContactAddonAdress = styled.p``;

export const ContactAddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CardExpandButton = styled.button`
  &:hover {
    background-color: #c9c9c9;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  background-color: transparent;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

export const Info = styled.p`
  span {
    font-weight: 200;
    color: #585858;
  }
`;

export const ContactBody = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const DeleteIcon = styled(MdDelete).attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.text.error,
}))``;

export const EditIcon = styled(MdEditSquare).attrs(({ theme }) => ({
  size: 20,
}))``;

export const FindIcon = styled(MdPersonPin).attrs(({ theme }) => ({
  size: 20,
}))``;
