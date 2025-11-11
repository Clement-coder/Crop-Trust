// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/ICropTrust.sol";

contract CropTrust is ICropTrust, ReentrancyGuard {
    uint256 private _cropIds;
    uint256 private _orderIds;

    address public owner;
    IERC20 public paymentToken;

    mapping(uint256 => Crop) public crops;
    mapping(uint256 => Order) public orders;
    mapping(address => uint256) public sellerFunds;

    error PriceMustBeGreaterThanZero();
    error QuantityMustBeGreaterThanZero();
    error CropNotListed();
    error NotEnoughQuantity();
    error InsufficientAllowance();
    error TransferFailed();
    error OnlyBuyer();
    error OrderNotPending();

    modifier onlyOwner() {
        if (msg.sender != owner) revert();
        _;
    }

    constructor(address _paymentTokenAddress) {
        owner = msg.sender;
        paymentToken = IERC20(_paymentTokenAddress);
    }

    function listCrop(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _quantity,
        string memory _imageUrl
    ) external override nonReentrant {
        if (_price == 0) revert PriceMustBeGreaterThanZero();
        if (_quantity == 0) revert QuantityMustBeGreaterThanZero();

        _cropIds++;
        uint256 newCropId = _cropIds;

        crops[newCropId] = Crop({
            id: newCropId,
            name: _name,
            description: _description,
            price: _price,
            quantity: _quantity,
            imageUrl: _imageUrl,
            seller: msg.sender,
            isListed: true
        });

        emit CropListed(newCropId, _name, _price, _quantity, msg.sender);
    }

    function purchaseCrop(uint256 _cropId, uint256 _quantity)
        external
        override
        nonReentrant
    {
        Crop storage crop = crops[_cropId];
        if (!crop.isListed) revert CropNotListed();
        if (crop.quantity < _quantity) revert NotEnoughQuantity();

        uint256 totalPrice = crop.price * _quantity;
        if (paymentToken.allowance(msg.sender, address(this)) < totalPrice) {
            revert InsufficientAllowance();
        }

        bool success = paymentToken.transferFrom(
            msg.sender,
            address(this),
            totalPrice
        );
        if (!success) revert TransferFailed();

        _orderIds++;
        uint256 newOrderId = _orderIds;

        orders[newOrderId] = Order({
            id: newOrderId,
            cropId: _cropId,
            quantity: _quantity,
            totalPrice: totalPrice,
            buyer: msg.sender,
            seller: crop.seller,
            status: Status.Pending
        });

        crop.quantity -= _quantity;
        if (crop.quantity == 0) {
            crop.isListed = false;
        }

        emit CropPurchased(newOrderId, _cropId, _quantity, totalPrice, msg.sender);
    }

    function confirmOrder(uint256 _orderId) external override nonReentrant {
        Order storage order = orders[_orderId];
        if (order.buyer != msg.sender) revert OnlyBuyer();
        if (order.status != Status.Pending) revert OrderNotPending();

        order.status = Status.Confirmed;
        
        bool success = paymentToken.transfer(order.seller, order.totalPrice);
        if (!success) revert TransferFailed();

        emit OrderConfirmed(_orderId, order.seller, order.totalPrice);
    }

    function getCrop(uint256 _cropId)
        external
        view
        override
        returns (Crop memory)
    {
        return crops[_cropId];
    }

    function getOrder(uint256 _orderId)
        external
        view
        override
        returns (Order memory)
    {
        return orders[_orderId];
    }
}