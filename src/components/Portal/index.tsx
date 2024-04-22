"use client";

import React from "react";
import * as S from "./styles";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
  show?: boolean;
  selector: string;
};

const Portal = ({ children, onClose, selector = "modal", show }: Props) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const path = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  if (!ref.current) return null;

  function onOverlayClick(e: React.MouseEvent) {
    if (!(e.target === overlayRef.current)) return;

    router.push(path);
    onClose?.();
  }

  return (
    <>
      {show && (
        <S.Overlay ref={overlayRef} onClick={onOverlayClick}>
          {children}
        </S.Overlay>
      )}
    </>
  );
};

export default Portal;
