const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const PetSentiment = await hre.ethers.getContractFactory("PetSentiment");
  const petsentiment = await PetSentiment.deploy();

  await petsentiment.deployed();

  console.log("PetSentiment deployed to:", petsentiment.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
