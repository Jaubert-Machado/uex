"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  &:focus-within {
    outline-color: ${({ theme }) => theme.colors.container.primary};
  }

  display: flex;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.container.primary};
  outline: solid 1px transparent;
  position: relative;
  isolation: isolate;
  flex: 1;
`;

export const FieldContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`;

export const TextField = styled.input`
  &:focus {
    outline: none;
  }

  flex: 1;
  padding: 16px 14px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  font-size: 12px;
`;

export const Label = motion(styled.label`
  color: ${({ theme }) => theme.colors.text.neutral};
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  pointer-events: none;
  background-color: ${({ theme }) => theme.colors.surface.neutral};
  z-index: 2;
`);

export const AdditionalInfo = motion(styled.span<{ $color?: string }>`
  font-size: 12px;
  left: 14px;
  bottom: -20px;
  color: ${({ $color }) => $color || "inherit"};
  position: absolute;
`);

export const IconButton = motion(styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
`);
