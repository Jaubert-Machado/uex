"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = motion(styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 6px;
`);
