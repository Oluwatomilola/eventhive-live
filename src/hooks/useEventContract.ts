import { useReadContract, useReadContracts } from 'wagmi';
import { EventTicketABI } from '@/contracts/abis/EventTicketABI';
import { EventFactoryABI } from '@/contracts/abis/EventFactoryABI';
import { formatEther } from 'viem';

// Placeholder addresses - replace with deployed contract addresses
export const FACTORY_ADDRESS = '0x0000000000000000000000000000000000000000' as const;

export interface EventDetails {
  name: string;
  description: string;
  date: Date;
  location: string;
  price: string;
  priceWei: bigint;
  maxSupply: number;
  sold: number;
  remaining: number;
}

/**
 * Hook to read event details from an EventTicket contract
 */
export function useEventDetails(eventAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'getEventDetails',
    query: {
      enabled: !!eventAddress && eventAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  const eventDetails: EventDetails | null = data ? {
    name: data[0],
    description: data[1],
    date: new Date(Number(data[2]) * 1000),
    location: data[3],
    price: formatEther(data[4]),
    priceWei: data[4],
    maxSupply: Number(data[5]),
    sold: Number(data[6]),
    remaining: Number(data[7]),
  } : null;

  return {
    eventDetails,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to read ticket price from an EventTicket contract
 */
export function useTicketPrice(eventAddress: `0x${string}` | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'ticketPrice',
    query: {
      enabled: !!eventAddress && eventAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    price: data ? formatEther(data) : null,
    priceWei: data ?? null,
    isLoading,
    error,
  };
}

/**
 * Hook to check if a ticket has been used
 */
export function useTicketUsed(eventAddress: `0x${string}` | undefined, tokenId: bigint | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'ticketUsed',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: !!eventAddress && tokenId !== undefined,
    },
  });

  return {
    isUsed: data ?? false,
    isLoading,
    error,
  };
}

/**
 * Hook to get tickets remaining
 */
export function useTicketsRemaining(eventAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'ticketsRemaining',
    query: {
      enabled: !!eventAddress && eventAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    remaining: data !== undefined ? Number(data) : null,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get all events from the factory
 */
export function useAllEvents(factoryAddress: `0x${string}` = FACTORY_ADDRESS) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: factoryAddress,
    abi: EventFactoryABI,
    functionName: 'getAllEvents',
    query: {
      enabled: factoryAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    events: data ?? [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get events by organizer
 */
export function useOrganizerEvents(
  organizerAddress: `0x${string}` | undefined,
  factoryAddress: `0x${string}` = FACTORY_ADDRESS
) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: factoryAddress,
    abi: EventFactoryABI,
    functionName: 'getOrganizerEvents',
    args: organizerAddress ? [organizerAddress] : undefined,
    query: {
      enabled: !!organizerAddress && factoryAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    events: data ?? [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get event owner
 */
export function useEventOwner(eventAddress: `0x${string}` | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'owner',
    query: {
      enabled: !!eventAddress && eventAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    owner: data ?? null,
    isLoading,
    error,
  };
}
