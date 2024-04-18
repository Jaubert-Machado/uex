"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = motion(styled.button`
  background-color: ${({ theme }) => theme.colors.container.primary};
  color: ${({ theme }) => theme.colors.text.tertiary};
  border: none;
  border-radius: 50px;
  padding: 8px 24px;
  font-weight: 500;
  cursor: pointer;
`);
