import { PropsWithChildren } from "react";
import { Container } from "./Container";

export const Layout = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};
