import { ReactNode } from "react";
import WalletFooter from '../layout/WalletFooter';
import WalletHeader from "../layout/WalletHeader";

interface WalletRightContainerProps {
  children?: ReactNode;
}

const WalletRightContainer = ({ children }: WalletRightContainerProps) => {
  return (
    <div className="h-screen flex flex-col w-full">
      <WalletHeader />
      <main className="flex-1 overflow-y-auto"> 
        {children}
      </main>
      <WalletFooter />
    </div>
  );
};

export default WalletRightContainer;