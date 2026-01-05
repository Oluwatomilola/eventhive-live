import { useWriteContract, useWaitForTransactionReceipt, useAccount, useConfig } from 'wagmi';
import { parseEther } from 'viem';
import { EventTicketABI } from '@/contracts/abis/EventTicketABI';
import { EventFactoryABI } from '@/contracts/abis/EventFactoryABI';
import { FACTORY_ADDRESS } from './useEventContract';
import { useCallback, useMemo } from 'react';

/**
 * Hook to mint a single ticket
 */
export function useMintTicket(eventAddress: `0x${string}` | undefined) {
  const { address, chain } = useAccount();
  
  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const mintTicket = useCallback(
    async (priceInEth: string) => {
      if (!eventAddress || !address || !chain) {
        throw new Error('Event address or wallet not connected');
      }

      writeContract({
        address: eventAddress,
        abi: EventTicketABI,
        functionName: 'mintTicket',
        value: parseEther(priceInEth),
        account: address,
        chain,
      });
    },
    [eventAddress, address, chain, writeContract]
  );

  return {
    mintTicket,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: writeError || receiptError,
    reset,
  };
}

/**
 * Hook to mint multiple tickets at once
 */
export function useMintMultipleTickets(eventAddress: `0x${string}` | undefined) {
  const { address, chain } = useAccount();
  
  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const mintTickets = useCallback(
    async (quantity: number, pricePerTicketInEth: string) => {
      if (!eventAddress || !address || !chain) {
        throw new Error('Event address or wallet not connected');
      }

      const totalPrice = parseFloat(pricePerTicketInEth) * quantity;

      writeContract({
        address: eventAddress,
        abi: EventTicketABI,
        functionName: 'mintTickets',
        args: [BigInt(quantity)],
        value: parseEther(totalPrice.toString()),
        account: address,
        chain,
      });
    },
    [eventAddress, address, chain, writeContract]
  );

  return {
    mintTickets,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: writeError || receiptError,
    reset,
  };
}

/**
 * Hook to create a new event
 */
export function useCreateEvent(factoryAddress: `0x${string}` = FACTORY_ADDRESS) {
  const { address, chain } = useAccount();
  
  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const createEvent = useCallback(
    async (params: {
      name: string;
      symbol: string;
      eventName: string;
      eventDescription: string;
      eventDate: Date;
      eventLocation: string;
      ticketPriceInEth: string;
      maxTickets: number;
      baseTokenURI: string;
    }) => {
      if (!address || !chain) {
        throw new Error('Wallet not connected');
      }

      if (factoryAddress === '0x0000000000000000000000000000000000000000') {
        throw new Error('Factory contract not deployed');
      }

      const eventTimestamp = BigInt(Math.floor(params.eventDate.getTime() / 1000));
      const ticketPriceWei = parseEther(params.ticketPriceInEth);

      writeContract({
        address: factoryAddress,
        abi: EventFactoryABI,
        functionName: 'createEvent',
        args: [
          params.name,
          params.symbol,
          params.eventName,
          params.eventDescription,
          eventTimestamp,
          params.eventLocation,
          ticketPriceWei,
          BigInt(params.maxTickets),
          params.baseTokenURI,
        ],
        account: address,
        chain,
      });
    },
    [address, factoryAddress, chain, writeContract]
  );

  return {
    createEvent,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: writeError || receiptError,
    reset,
  };
}

/**
 * Hook to use (check-in) a ticket - only for event organizers
 */
export function useUseTicket(eventAddress: `0x${string}` | undefined) {
  const { address, chain } = useAccount();
  
  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const useTicket = useCallback(
    async (tokenId: bigint) => {
      if (!eventAddress || !address || !chain) {
        throw new Error('Event address not provided');
      }

      writeContract({
        address: eventAddress,
        abi: EventTicketABI,
        functionName: 'useTicket',
        args: [tokenId],
        account: address,
        chain,
      });
    },
    [eventAddress, address, chain, writeContract]
  );

  return {
    useTicket,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: writeError || receiptError,
    reset,
  };
}

/**
 * Hook to withdraw funds - only for event organizers
 */
export function useWithdrawFunds(eventAddress: `0x${string}` | undefined) {
  const { address, chain } = useAccount();
  
  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const withdraw = useCallback(async () => {
    if (!eventAddress || !address || !chain) {
      throw new Error('Event address not provided');
    }

    writeContract({
      address: eventAddress,
      abi: EventTicketABI,
      functionName: 'withdraw',
      account: address,
      chain,
    });
  }, [eventAddress, address, chain, writeContract]);

  return {
    withdraw,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: writeError || receiptError,
    reset,
  };
}
