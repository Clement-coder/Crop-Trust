import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("CropTrust", function () {
  async function deployCropTrustFixture() {
    const [owner, seller, buyer] = await hre.ethers.getSigners();

    const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
    const mockToken = await MockERC20.deploy();
    await mockToken.waitForDeployment();

    const CropTrust = await hre.ethers.getContractFactory("CropTrust");
    const cropTrust = await CropTrust.deploy(await mockToken.getAddress());
    await cropTrust.waitForDeployment();

    // Mint some tokens for the buyer
    await mockToken.mint(buyer.address, hre.ethers.parseEther("1000"));

    return { cropTrust, mockToken, owner, seller, buyer };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { cropTrust, owner } = await loadFixture(deployCropTrustFixture);
      expect(await cropTrust.owner()).to.equal(owner.address);
    });

    it("Should set the right payment token", async function () {
      const { cropTrust, mockToken } = await loadFixture(deployCropTrustFixture);
      expect(await cropTrust.paymentToken()).to.equal(await mockToken.getAddress());
    });
  });

  describe("Crop Listing", function () {
    it("Should allow a seller to list a crop", async function () {
      const { cropTrust, seller } = await loadFixture(deployCropTrustFixture);
      const cropName = "Test Crop";
      const cropPrice = hre.ethers.parseEther("1");
      const cropQuantity = 10;

      await expect(
        cropTrust
          .connect(seller)
          .listCrop(
            cropName,
            "A test crop",
            cropPrice,
            cropQuantity,
            "image_url"
          )
      )
        .to.emit(cropTrust, "CropListed")
        .withArgs(1, cropName, cropPrice, cropQuantity, seller.address);

      const crop = await cropTrust.getCrop(1);
      expect(crop.name).to.equal(cropName);
      expect(crop.seller).to.equal(seller.address);
    });

    it("Should revert if price is zero", async function () {
        const { cropTrust, seller } = await loadFixture(deployCropTrustFixture);
        await expect(
            cropTrust.connect(seller).listCrop("Test Crop", "A test crop", 0, 10, "image_url")
        ).to.be.revertedWithCustomError(cropTrust, "PriceMustBeGreaterThanZero");
    });
  });

  describe("Crop Purchasing", function () {
    it("Should allow a buyer to purchase a crop", async function () {
      const { cropTrust, mockToken, seller, buyer } = await loadFixture(
        deployCropTrustFixture
      );
      const cropPrice = hre.ethers.parseEther("1");
      await cropTrust
        .connect(seller)
        .listCrop("Test Crop", "A test crop", cropPrice, 10, "image_url");

      const purchaseQuantity = 2;
      const totalPrice = cropPrice * BigInt(purchaseQuantity);

      // Approve the contract to spend tokens
      await mockToken.connect(buyer).approve(await cropTrust.getAddress(), totalPrice);

      await expect(
        cropTrust
          .connect(buyer)
          .purchaseCrop(1, purchaseQuantity)
      )
        .to.emit(cropTrust, "CropPurchased")
        .withArgs(1, 1, purchaseQuantity, totalPrice, buyer.address);

      const crop = await cropTrust.getCrop(1);
      expect(crop.quantity).to.equal(8);
      expect(await mockToken.balanceOf(await cropTrust.getAddress())).to.equal(totalPrice);
    });

    it("Should fail if insufficient allowance", async function () {
        const { cropTrust, seller, buyer } = await loadFixture(
            deployCropTrustFixture
        );
        const cropPrice = hre.ethers.parseEther("1");
        await cropTrust
            .connect(seller)
            .listCrop("Test Crop", "A test crop", cropPrice, 10, "image_url");

        const purchaseQuantity = 2;

        await expect(
            cropTrust.connect(buyer).purchaseCrop(1, purchaseQuantity)
        ).to.be.revertedWithCustomError(cropTrust, "InsufficientAllowance");
    });
  });

  describe("Order Confirmation", function () {
    it("Should allow a buyer to confirm an order and transfer funds to seller", async function () {
      const { cropTrust, mockToken, seller, buyer } = await loadFixture(
        deployCropTrustFixture
      );
      const cropPrice = hre.ethers.parseEther("1");
      await cropTrust
        .connect(seller)
        .listCrop("Test Crop", "A test crop", cropPrice, 10, "image_url");

      const purchaseQuantity = 2;
      const totalPrice = cropPrice * BigInt(purchaseQuantity);
      await mockToken.connect(buyer).approve(await cropTrust.getAddress(), totalPrice);
      await cropTrust.connect(buyer).purchaseCrop(1, purchaseQuantity);

      const sellerBalanceBefore = await mockToken.balanceOf(seller.address);

      await expect(cropTrust.connect(buyer).confirmOrder(1))
        .to.emit(cropTrust, "OrderConfirmed")
        .withArgs(1, seller.address, totalPrice);

      const sellerBalanceAfter = await mockToken.balanceOf(seller.address);
      expect(sellerBalanceAfter).to.equal(sellerBalanceBefore + totalPrice);
    });
  });
});