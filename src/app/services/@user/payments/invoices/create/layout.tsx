import React from "react";
import { CreateInvoiceProvider } from "./context";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <CreateInvoiceProvider>{children}</CreateInvoiceProvider>;
};

export default Layout;
