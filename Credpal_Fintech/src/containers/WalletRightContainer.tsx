import { ReactNode } from "react";
import WalletFooter from '../layout/WalletFooter';
import WalletHeader from "../layout/WalletHeader";

interface WalletRightContainerProps {
  children?: ReactNode;
}

const WalletRightContainer = ({ children }: WalletRightContainerProps) => {
  return (
    <div className="h-screen flex flex-col">
      <WalletHeader />
      <main className="flex-1 overflow-y-auto text-sm md:text-base"> 
        {children}
      </main>
      <WalletFooter />
    </div>
  );
};

export default WalletRightContainer;