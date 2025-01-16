"use client";

import React, { useEffect } from "react";

import { Eip1193Provider } from "ethers";
import { useAppKitProvider } from "@reown/appkit/react";
import { usePoaContractStore } from "@/store/poa-contract.store";

const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  const { walletProvider } = useAppKitProvider<Eip1193Provider | undefined>(
    "eip155"
  );

  const { initContract } = usePoaContractStore();

  useEffect(() => {
    if (walletProvider) {
      initContract(walletProvider);
    }
  }, [walletProvider, initContract]);

  return <>{children}</>;
};

export default ContractProvider;
