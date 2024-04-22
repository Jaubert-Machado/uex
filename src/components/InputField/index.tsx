import React, { ComponentProps, useMemo } from "react";
import * as S from "./styles";
import { UseFormRegisterReturn } from "react-hook-form";
import { AnimatePresence, Variants } from "framer-motion";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useTheme } from "styled-components";
import IconButton from "@components/IconButton";

type InfoType = "error" | "warning" | "info";

type Props = {
  label: {
    mode?: "onTop" | "onFocus";
    value: string;
  };
  secureTextEntry?: boolean;
  mask?: (value: string) => string;
  additionalInfo?: {
    message?: string;
    type: InfoType;
  };
} & ComponentProps<"input">;

const LABEL_VARIANTS: Variants = {
  focused: {
    top: "0px",
    fontSize: "12px",
  },
};

const ADDITIONAL_INFO_VARIANTS: Variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: -10,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const COLORS: Record<InfoType, string> = {
  error: "hsl(0, 75%, 42%)",
  warning: "hsl(49.875, 74%, 41%)",
  info: "hsl(0, 2%, 38%)",
};

const InputField = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label: { mode = "onFocus", value },
      secureTextEntry,
      additionalInfo,
      mask,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = React.useState(mode === "onTop");
    const [isSecureTextEntry, setIsSecureTextEntry] = React.useState(
      secureTextEntry || false
    );

    const iconNode = useMemo(() => {
      const ICON_COLOR = theme.colors.text.primary;
      const ICON_SIZE = 22;

      return isSecureTextEntry ? (
        <MdVisibility size={ICON_SIZE} color={ICON_COLOR} />
      ) : (
        <MdVisibilityOff size={ICON_SIZE} color={ICON_COLOR} />
      );
    }, [isSecureTextEntry, theme]);

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
      if (mask) e.target.value = mask(e.target.value);
      onChange?.(e);
    }

    function onFocusHandler() {
      setIsFocused(true);
    }

    function onBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
      if (!e.target.value && mode === "onFocus") setIsFocused(false);
      onBlur?.(e);
    }

    return (
      <S.Container>
        <S.Label
          variants={LABEL_VARIANTS}
          animate={isFocused ? "focused" : undefined}
        >
          {value}
        </S.Label>
        <S.FieldContainer>
          <S.TextField
            type={isSecureTextEntry ? "password" : "text"}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            ref={ref}
            {...props}
          />
          {secureTextEntry && (
            <IconButton onClick={() => setIsSecureTextEntry((prev) => !prev)}>
              {iconNode}
            </IconButton>
          )}
        </S.FieldContainer>
        <AnimatePresence>
          {additionalInfo?.message && (
            <S.AdditionalInfo
              variants={ADDITIONAL_INFO_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              $color={additionalInfo?.type && COLORS[additionalInfo?.type]}
            >
              {additionalInfo?.message}
            </S.AdditionalInfo>
          )}
        </AnimatePresence>
      </S.Container>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
