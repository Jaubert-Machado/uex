"use client";

import Card from "@components/Card";
import Link from "next/link";
import styled from "styled-components";

export const Page = styled.section`
  h1 {
    font-weight: 400;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 30px;
  }

  background-color: ${({ theme }) => theme.colors.surface.neutral};
  padding: ${({ theme }) => theme.paddings.medium};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 50%;
  min-width: 300px;
  max-height: 400px;
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;

export const RegisterCallout = styled.span`
  text-align: center;
  text-decoration: none;
  font-size: 14px;
`;

export const RegisterLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
`;
