import React from "react";

export interface KeyboardProps {
  onEnter: any;
  onDelete: any;
  onInput: (value: string) => void;
}

export const Keyboard = ({ onEnter, onDelete, onInput }: KeyboardProps) => {
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const pressedKey = e.key.toUpperCase();

        if (pressedKey.length === 1 && pressedKey >= "A" && pressedKey <= "Z") {
          onInput(pressedKey);
        }
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [onDelete, onEnter, onInput]);
  return <div></div>;
};
