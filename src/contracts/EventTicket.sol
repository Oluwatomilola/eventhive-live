// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title EventTicket
 * @dev ERC-721 NFT ticket contract for a single event
 */
contract EventTicket is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Event details
    string public eventName;
    string public eventDescription;
    uint256 public eventDate;
    string public eventLocation;
    uint256 public ticketPrice;
    uint256 public maxTickets;
    string public baseTokenURI;

    // Ticket tracking
    mapping(uint256 => bool) public ticketUsed;
    mapping(address => uint256[]) private _userTickets;

    // Events
    event TicketMinted(address indexed buyer, uint256 indexed tokenId, uint256 price);
    event TicketUsed(uint256 indexed tokenId, address indexed holder);
    event TicketTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _eventName,
        string memory _eventDescription,
        uint256 _eventDate,
        string memory _eventLocation,
        uint256 _ticketPrice,
        uint256 _maxTickets,
        string memory _baseTokenURI,
        address _organizer
    ) ERC721(_name, _symbol) Ownable(_organizer) {
        eventName = _eventName;
        eventDescription = _eventDescription;
        eventDate = _eventDate;
        eventLocation = _eventLocation;
        ticketPrice = _ticketPrice;
        maxTickets = _maxTickets;
        baseTokenURI = _baseTokenURI;
    }

    /**
     * @dev Mint a new ticket NFT
     */
    function mintTicket() external payable returns (uint256) {
        require(msg.value >= ticketPrice, "Insufficient payment");
        require(_tokenIdCounter.current() < maxTickets, "Event sold out");
        require(block.timestamp < eventDate, "Event has passed");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked(baseTokenURI, "/", Strings.toString(tokenId))));

        _userTickets[msg.sender].push(tokenId);

        // Refund excess payment
        if (msg.value > ticketPrice) {
            payable(msg.sender).transfer(msg.value - ticketPrice);
        }

        emit TicketMinted(msg.sender, tokenId, ticketPrice);
        return tokenId;
    }

    /**
     * @dev Mint multiple tickets at once
     */
    function mintTickets(uint256 quantity) external payable returns (uint256[] memory) {
        require(msg.value >= ticketPrice * quantity, "Insufficient payment");
        require(_tokenIdCounter.current() + quantity <= maxTickets, "Not enough tickets available");
        require(block.timestamp < eventDate, "Event has passed");

        uint256[] memory tokenIds = new uint256[](quantity);

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();

            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, string(abi.encodePacked(baseTokenURI, "/", Strings.toString(tokenId))));

            _userTickets[msg.sender].push(tokenId);
            tokenIds[i] = tokenId;

            emit TicketMinted(msg.sender, tokenId, ticketPrice);
        }

        // Refund excess payment
        uint256 totalCost = ticketPrice * quantity;
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }

        return tokenIds;
    }

    /**
     * @dev Mark ticket as used (only organizer)
     */
    function useTicket(uint256 tokenId) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Ticket does not exist");
        require(!ticketUsed[tokenId], "Ticket already used");

        ticketUsed[tokenId] = true;
        emit TicketUsed(tokenId, ownerOf(tokenId));
    }

    /**
     * @dev Get tickets owned by a user
     */
    function getUserTickets(address user) external view returns (uint256[] memory) {
        return _userTickets[user];
    }

    /**
     * @dev Get total tickets sold
     */
    function ticketsSold() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Get remaining tickets
     */
    function ticketsRemaining() external view returns (uint256) {
        return maxTickets - _tokenIdCounter.current();
    }

    /**
     * @dev Withdraw funds (only organizer)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Get event details
     */
    function getEventDetails() external view returns (
        string memory name,
        string memory description,
        uint256 date,
        string memory location,
        uint256 price,
        uint256 maxSupply,
        uint256 sold,
        uint256 remaining
    ) {
        return (
            eventName,
            eventDescription,
            eventDate,
            eventLocation,
            ticketPrice,
            maxTickets,
            _tokenIdCounter.current(),
            maxTickets - _tokenIdCounter.current()
        );
    }

    // Required overrides
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        address from = _ownerOf(tokenId);
        
        // Update user tickets mapping on transfer
        if (from != address(0) && to != address(0) && from != to) {
            emit TicketTransferred(tokenId, from, to);
            _userTickets[to].push(tokenId);
        }

        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
