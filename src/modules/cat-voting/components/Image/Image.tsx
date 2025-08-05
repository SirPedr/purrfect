import type React from "react";

type Props =  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image = (props: Props) => <img {...props} />;
