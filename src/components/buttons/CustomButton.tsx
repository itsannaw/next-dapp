import React from "react";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  disabled,
  size,
  ...rest
}) => {
  return (
    <Button
      style={{
        backgroundColor: "white",
        color: "black",
        fontSize: size === "large" ? 14 : 12,
        fontWeight: 600,
        borderRadius: 50,
      }}
      variant="contained"
      size={size}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
