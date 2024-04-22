"use client";

import IconButton from "@components/IconButton";
import Link from "next/link";
import { MdAdd, MdPersonOff } from "react-icons/md";
import styled from "styled-components";

export const Page = styled.section`
  background-color: ${({ theme }) => theme.colors.surface.neutral};
  padding: ${({ theme }) => theme.paddings.medium};
  height: 100%;
  display: flex;
  gap: 20px;
`;

export const LeftContainer = styled.div`
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1.2;
`;

export const RightContainer = styled.div`
  flex: 3;
  position: relative;
`;

export const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex: 1;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.colors.container.primaryLight};
`;

export const AddContactIcon = styled(MdAdd).attrs(({ theme }) => ({
  size: 25,
  color: theme.colors.text.primary,
}))``;

export const DeleteAccIcon = styled(MdPersonOff).attrs(({ theme }) => ({
  size: 25,
  color: theme.colors.text.error,
}))``;
