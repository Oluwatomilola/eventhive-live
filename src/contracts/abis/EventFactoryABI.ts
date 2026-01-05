export const EventFactoryABI = [
  {
    inputs: [{ internalType: "address", name: "_platformWallet", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "eventContract", type: "address" },
      { indexed: true, internalType: "address", name: "organizer", type: "address" },
      { indexed: false, internalType: "string", name: "eventName", type: "string" },
      { indexed: false, internalType: "uint256", name: "eventDate", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "ticketPrice", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "maxTickets", type: "uint256" }
    ],
    name: "EventCreated",
    type: "event"
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "string", name: "eventName", type: "string" },
      { internalType: "string", name: "eventDescription", type: "string" },
      { internalType: "uint256", name: "eventDate", type: "uint256" },
      { internalType: "string", name: "eventLocation", type: "string" },
      { internalType: "uint256", name: "ticketPrice", type: "uint256" },
      { internalType: "uint256", name: "maxTickets", type: "uint256" },
      { internalType: "string", name: "baseTokenURI", type: "string" }
    ],
    name: "createEvent",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllEvents",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "organizer", type: "address" }],
    name: "getOrganizerEvents",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalEvents",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "offset", type: "uint256" },
      { internalType: "uint256", name: "limit", type: "uint256" }
    ],
    name: "getEventsPaginated",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "allEvents",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isEventContract",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "platformFeeBps",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "platformWallet",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_feeBps", type: "uint256" }],
    name: "setPlatformFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_wallet", type: "address" }],
    name: "setPlatformWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;
