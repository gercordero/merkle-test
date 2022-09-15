import { FC, ReactNode } from "react";
// Components
import Navbar from "@/components/Layout/components/Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
