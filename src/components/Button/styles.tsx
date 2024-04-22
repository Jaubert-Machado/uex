"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = motion(styled.button<{ $fill: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${({ theme, $fill }) =>
    $fill ? theme.colors.container.primary : "transparent"};
  color: ${({ theme, $fill }) =>
    $fill ? theme.colors.text.onPrimary : theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.container.primary};
  border-radius: 50px;
  padding: 5px 14px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  backface-visibility: hidden;
`);

export const IconContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
`;
