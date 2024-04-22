"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

export const Page = styled.section`
  h1 {
    font-weight: 400;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  background-color: ${({ theme }) => theme.colors.surface.neutral};
  padding: ${({ theme }) => theme.paddings.medium};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 60%;
  min-width: 300px;
  max-height: 500px;
`;

export const Form = motion(styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`);

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

export const BackButton = motion(styled(Link)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: background-color 0.2s;
`);

export const RegisterSuccess = motion(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 20px;
  text-align: center;
`);
