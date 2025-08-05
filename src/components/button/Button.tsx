import { Button as HUIButton } from "@headlessui/react";
import clsx from "clsx";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ children, ...props }: Props) => (
  <HUIButton
    {...props}
    className={clsx(
      props.className,
      "flex h-9 items-center justify-center gap-1 border-2 border-black font-bold shadow-button"
    )}
  >
    {children}
  </HUIButton>
);
