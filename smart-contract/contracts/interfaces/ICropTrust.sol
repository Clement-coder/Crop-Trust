// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICropTrust {
    struct Crop {
        uint256 id;
        string name;
        string description;
        uint256 price;
        uint256 quantity;
        string imageUrl;
        address seller;
        bool isListed;
    }

    struct Order {
        uint256 id;
        uint256 cropId;
        uint256 quantity;
        uint256 totalPrice;
        address buyer;
        address seller;
        Status status;
    }

    enum Status {
        Pending,
        Delivered,
        Confirmed,
        Cancelled
    }

    event CropListed(
        uint256 id,
        string name,
        uint256 price,
        uint256 quantity,
        address indexed seller
    );

    event CropPurchased(
        uint256 orderId,
        uint256 cropId,
        uint256 quantity,
        uint256 totalPrice,
        address indexed buyer
    );

    event OrderConfirmed(uint256 orderId, address indexed seller, uint256 amount);

    function listCrop(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _quantity,
        string memory _imageUrl
    ) external;

    function purchaseCrop(uint256 _cropId, uint256 _quantity) external;

    function confirmOrder(uint256 _orderId) external;

    function getCrop(uint256 _cropId) external view returns (Crop memory);

    function getOrder(uint256 _orderId) external view returns (Order memory);
}
