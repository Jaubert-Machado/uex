"use client";

import styled from "styled-components";

export const DeleteAccModal = styled.div`
  h1 {
    font-weight: 400;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
  margin-top: 20px;
`;
