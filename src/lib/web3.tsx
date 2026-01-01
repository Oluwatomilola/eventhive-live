import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, arbitrum, base } from '@reown/appkit/networks'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

// Get projectId from Reown Cloud
const projectId = 'a5e1cd1176e882ddecae8ead3c0adcab'

// Define networks
const networks = [mainnet, polygon, arbitrum, base]

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, polygon, arbitrum, base],
  projectId,
  metadata: {
    name: 'EventHive',
    description: 'Decentralized Event Ticketing Platform',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://eventhive.app',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#f97316',
    '--w3m-border-radius-master': '2px'
  }
})

// Create query client
const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export { wagmiAdapter, projectId }
