"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  isolation: isolate;
`;

export const FieldContainer = styled.div`
  position: relative;
  display: flex;
`;

export const TextField = styled.input`
  &:hover {
    border-color: ${({ theme }) => theme.colors.container.primaryLight};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.container.primaryLight};
  }

  z-index: 1;
  width: 100%;
  padding: 16px 14px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  font-size: 12px;
  border: 2px solid ${({ theme }) => theme.colors.container.primary};
`;

export const Label = motion(styled.label`
  color: ${({ theme }) => theme.colors.text.secondary};
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

export const IconButton = styled.button`
  &:hover {
    background-color: ${({ theme }) => theme.colors.container.primaryLight};
  }

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
`;
