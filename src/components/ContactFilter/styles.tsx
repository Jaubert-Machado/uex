"use client";

import { MdClose, MdSearch, MdSortByAlpha } from "react-icons/md";
import styled from "styled-components";

export const Container = styled.div`
  &:focus-within {
    outline: solid 1px ${({ theme }) => theme.colors.container.primary};
  }

  flex: 1;
  background-color: ${({ theme }) => theme.colors.container.primaryLight};
  align-items: center;
  display: flex;
  border-radius: 100px;
`;

export const SearchIcon = styled(MdSearch).attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.text.primary,
}))`
  margin-left: 15px;
`;

export const ClearIcon = styled(MdClose).attrs(({ theme }) => ({
  size: 18,
  color: theme.colors.text.primary,
}))``;

export const SortIcon = styled(MdSortByAlpha).attrs(({ theme }) => ({
  size: 18,
  color: theme.colors.text.primary,
}))``;

export const SearchField = styled.input`
  &:focus {
    outline: none;
  }

  flex: 1;
  background-color: transparent;
  border: none;
  padding: 10px;
`;
