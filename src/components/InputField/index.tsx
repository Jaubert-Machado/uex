import React, { useMemo } from "react";
import * as S from "./styles";
import { UseFormRegisterReturn } from "react-hook-form";
import { AnimatePresence, Variants } from "framer-motion";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type InfoType = "error" | "warning" | "info";

type Props = {
  label: string;
  register: UseFormRegisterReturn;
  secureTextEntry?: boolean;
  additionalInfo?: {
    message?: string;
    type: InfoType;
  };
};

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

const InputField = ({
  label,
  register,
  secureTextEntry,
  additionalInfo,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = React.useState(
    secureTextEntry || false
  );

  const { onChange, ...rest } = register;

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);

    if (e.target.value) return setIsFilled(true);
    setIsFilled(false);
  }

  const iconNode = useMemo(() => {
    const ICON_COLOR = "hsl(180, 29%, 31%)";
    const ICON_SIZE = 22;

    return isSecureTextEntry ? (
      <MdVisibility size={ICON_SIZE} color={ICON_COLOR} />
    ) : (
      <MdVisibilityOff size={ICON_SIZE} color={ICON_COLOR} />
    );
  }, [isSecureTextEntry]);

  return (
    <S.Container>
      <S.Label
        variants={LABEL_VARIANTS}
        animate={isFocused ? "focused" : undefined}
      >
        {label}
      </S.Label>
      <S.FieldContainer>
        <S.TextField
          type={isSecureTextEntry ? "password" : "text"}
          onChange={onChangeHandler}
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => (isFilled ? setIsFocused(true) : setIsFocused(false))}
        />
        {secureTextEntry && (
          <S.IconButton
            type="button"
            onClick={() => setIsSecureTextEntry((prev) => !prev)}
          >
            {iconNode}
          </S.IconButton>
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
};

export default InputField;
