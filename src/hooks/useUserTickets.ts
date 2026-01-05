import { useReadContract, useAccount } from 'wagmi';
import { EventTicketABI } from '@/contracts/abis/EventTicketABI';
import { useCallback, useMemo } from 'react';

export interface UserTicket {
  tokenId: bigint;
  eventAddress: `0x${string}`;
  isUsed: boolean;
}

/**
 * Hook to get user's tickets for a specific event
 */
export function useUserEventTickets(eventAddress: `0x${string}` | undefined) {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'getUserTickets',
    args: address ? [address] : undefined,
    query: {
      enabled: !!eventAddress && !!address && eventAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    ticketIds: data ?? [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to get user's balance (number of tickets) for an event
 */
export function useUserTicketBalance(eventAddress: `0x${string}` | undefined) {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!eventAddress && !!address && eventAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    balance: data !== undefined ? Number(data) : 0,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook to check ticket ownership
 */
export function useTicketOwnership(
  eventAddress: `0x${string}` | undefined,
  tokenId: bigint | undefined
) {
  const { address } = useAccount();

  const { data: owner, isLoading, error } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'ownerOf',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: !!eventAddress && tokenId !== undefined,
    },
  });

  const isOwner = useMemo(() => {
    if (!owner || !address) return false;
    return owner.toLowerCase() === address.toLowerCase();
  }, [owner, address]);

  return {
    owner,
    isOwner,
    isLoading,
    error,
  };
}

/**
 * Hook to get token URI (NFT metadata)
 */
export function useTokenURI(
  eventAddress: `0x${string}` | undefined,
  tokenId: bigint | undefined
) {
  const { data, isLoading, error } = useReadContract({
    address: eventAddress,
    abi: EventTicketABI,
    functionName: 'tokenURI',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: !!eventAddress && tokenId !== undefined,
    },
  });

  return {
    tokenURI: data ?? null,
    isLoading,
    error,
  };
}

/**
 * Hook to check if a specific ticket is used
 */
export function useIsTicketUsed(
  eventAddress: `0x${string}` | undefined,
  tokenId: bigint | undefined
) {
  const { data, isLoading, error, refetch } = useReadContract({
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
    refetch,
  };
}

/**
 * Custom hook to fetch tickets across multiple events
 * Note: This requires the list of event addresses to be known
 */
export function useAllUserTickets(eventAddresses: `0x${string}`[]) {
  const { address } = useAccount();

  // This is a simplified version - in production you'd want to batch these calls
  // or use a subgraph/indexer for better performance
  const results = eventAddresses.map((eventAddress) => {
    const { data, isLoading, error } = useReadContract({
      address: eventAddress,
      abi: EventTicketABI,
      functionName: 'getUserTickets',
      args: address ? [address] : undefined,
      query: {
        enabled: !!address && eventAddress !== '0x0000000000000000000000000000000000000000',
      },
    });

    return {
      eventAddress,
      ticketIds: data ?? [],
      isLoading,
      error,
    };
  });

  const allTickets = useMemo(() => {
    const tickets: UserTicket[] = [];
    
    results.forEach((result) => {
      if (result.ticketIds) {
        result.ticketIds.forEach((tokenId) => {
          tickets.push({
            tokenId,
            eventAddress: result.eventAddress,
            isUsed: false, // Would need separate calls to check
          });
        });
      }
    });

    return tickets;
  }, [results]);

  const isLoading = results.some((r) => r.isLoading);
  const hasError = results.some((r) => r.error);

  const refetchAll = useCallback(() => {
    // In production, you'd want to implement proper refetch logic
    window.location.reload();
  }, []);

  return {
    tickets: allTickets,
    isLoading,
    hasError,
    refetchAll,
  };
}
