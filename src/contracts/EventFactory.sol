// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./EventTicket.sol";

/**
 * @title EventFactory
 * @dev Factory contract to deploy EventTicket contracts
 */
contract EventFactory {
    // Events
    event EventCreated(
        address indexed eventContract,
        address indexed organizer,
        string eventName,
        uint256 eventDate,
        uint256 ticketPrice,
        uint256 maxTickets
    );

    // Storage
    address[] public allEvents;
    mapping(address => address[]) public organizerEvents;
    mapping(address => bool) public isEventContract;

    // Platform fee (in basis points, e.g., 250 = 2.5%)
    uint256 public platformFeeBps = 250;
    address public platformWallet;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _platformWallet) {
        owner = msg.sender;
        platformWallet = _platformWallet;
    }

    /**
     * @dev Create a new event with NFT tickets
     */
    function createEvent(
        string memory name,
        string memory symbol,
        string memory eventName,
        string memory eventDescription,
        uint256 eventDate,
        string memory eventLocation,
        uint256 ticketPrice,
        uint256 maxTickets,
        string memory baseTokenURI
    ) external returns (address) {
        require(bytes(eventName).length > 0, "Event name required");
        require(eventDate > block.timestamp, "Event date must be in future");
        require(maxTickets > 0, "Must have at least 1 ticket");

        EventTicket eventContract = new EventTicket(
            name,
            symbol,
            eventName,
            eventDescription,
            eventDate,
            eventLocation,
            ticketPrice,
            maxTickets,
            baseTokenURI,
            msg.sender
        );

        address eventAddress = address(eventContract);
        
        allEvents.push(eventAddress);
        organizerEvents[msg.sender].push(eventAddress);
        isEventContract[eventAddress] = true;

        emit EventCreated(
            eventAddress,
            msg.sender,
            eventName,
            eventDate,
            ticketPrice,
            maxTickets
        );

        return eventAddress;
    }

    /**
     * @dev Get all events
     */
    function getAllEvents() external view returns (address[] memory) {
        return allEvents;
    }

    /**
     * @dev Get events by organizer
     */
    function getOrganizerEvents(address organizer) external view returns (address[] memory) {
        return organizerEvents[organizer];
    }

    /**
     * @dev Get total number of events
     */
    function totalEvents() external view returns (uint256) {
        return allEvents.length;
    }

    /**
     * @dev Get paginated events
     */
    function getEventsPaginated(uint256 offset, uint256 limit) 
        external 
        view 
        returns (address[] memory) 
    {
        uint256 total = allEvents.length;
        
        if (offset >= total) {
            return new address[](0);
        }

        uint256 end = offset + limit;
        if (end > total) {
            end = total;
        }

        address[] memory result = new address[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = allEvents[i];
        }

        return result;
    }

    /**
     * @dev Update platform fee (only owner)
     */
    function setPlatformFee(uint256 _feeBps) external onlyOwner {
        require(_feeBps <= 1000, "Fee too high"); // Max 10%
        platformFeeBps = _feeBps;
    }

    /**
     * @dev Update platform wallet (only owner)
     */
    function setPlatformWallet(address _wallet) external onlyOwner {
        require(_wallet != address(0), "Invalid address");
        platformWallet = _wallet;
    }

    /**
     * @dev Transfer ownership (only owner)
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
