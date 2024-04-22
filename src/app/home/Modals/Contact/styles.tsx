"use client";

import Link from "next/link";
import styled from "styled-components";

export const NewContactButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.container.primary};
  border-radius: 5px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NewContactModal = styled.div`
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 35%;
`;

export const NewContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const SideBySideInput = styled.div`
  display: flex;
  gap: 10px;
`;

export const AddressSearchContainer = styled.div``;

export const AddressSugestionsContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 5px;
  max-height: 150px;
  overflow-y: auto;
`;

export const AddressSugestion = styled.li`
  &:hover {
    background-color: #c9c9c9;
  }

  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid #c9c9c9;
  cursor: pointer;
  transition: background-color 0.2s;
`;
