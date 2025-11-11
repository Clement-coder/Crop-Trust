import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CropTrustModule = buildModule("CropTrustModule", (m) => {
  const mockToken = m.contract("MockERC20");
  const cropTrust = m.contract("CropTrust", [mockToken.address]);

  return { cropTrust, mockToken };
});

export default CropTrustModule;