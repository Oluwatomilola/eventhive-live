// Contract ABIs
export { EventTicketABI } from './abis/EventTicketABI';
export { EventFactoryABI } from './abis/EventFactoryABI';

// Contract addresses - Replace with deployed addresses
export const CONTRACT_ADDRESSES = {
  // Ethereum Mainnet
  mainnet: {
    factory: '0x0000000000000000000000000000000000000000' as const,
  },
  // Polygon
  polygon: {
    factory: '0x0000000000000000000000000000000000000000' as const,
  },
  // Arbitrum
  arbitrum: {
    factory: '0x0000000000000000000000000000000000000000' as const,
  },
  // Base
  base: {
    factory: '0x0000000000000000000000000000000000000000' as const,
  },
  // Sepolia Testnet
  sepolia: {
    factory: '0x0000000000000000000000000000000000000000' as const,
  },
} as const;

// Helper to get factory address by chain ID
export function getFactoryAddress(chainId: number): `0x${string}` | null {
  switch (chainId) {
    case 1:
      return CONTRACT_ADDRESSES.mainnet.factory;
    case 137:
      return CONTRACT_ADDRESSES.polygon.factory;
    case 42161:
      return CONTRACT_ADDRESSES.arbitrum.factory;
    case 8453:
      return CONTRACT_ADDRESSES.base.factory;
    case 11155111:
      return CONTRACT_ADDRESSES.sepolia.factory;
    default:
      return null;
  }
}
