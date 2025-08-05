import clsx from "clsx";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const Text = ({ children, ...props }: Props) => (
  <p {...props} className={clsx(props.className, "font-bold text-center")}>{children}</p>
);
