"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface.neutral};
  border-radius: 22px;
  padding: ${({ theme }) => theme.paddings.medium};
`;
