export const chainIdToNetworkName = (chainId?: number | string): string => {
  if (!chainId) return "";
  if (typeof chainId === "string") {
    chainId = parseInt(chainId);
  }
  if (chainId === 10143) return "Monad";
  if (chainId === 1337) return "Hardhat";
  if (chainId === 11155111) return "Sepolia";
  return "";
};
