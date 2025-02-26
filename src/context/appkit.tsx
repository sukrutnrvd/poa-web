"use client";

import * as chains from "@reown/appkit/networks";

import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { createAppKit } from "@reown/appkit/react";

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "";

const allowedChains = process.env.NEXT_PUBLIC_ALLOWED_CHAINS?.split(",") || [];

const customNetwork = chains.defineChain({
  id: 10143,
  caipNetworkId: "eip155:10143",
  chainNamespace: "eip155",
  name: "Monad Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.monad.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: "https://testnet.monadexplorer.com",
    },
  },
});

// 2. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

const networks = allowedChains.map((chain) => {
  if (chain === "monad") return customNetwork;
  if (chain === "hardhat") return chains.hardhat;
  if (chain === "sepolia") return chains.sepolia;
});
// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: networks as any,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKit({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
