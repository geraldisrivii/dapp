import { assert } from "chai";
import { loadFixture, ethers, expect } from "./setup";

describe("Demo", () => {
  async function deploy() {
    const [user1, user2] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("Demo");
    const demo = await Factory.deploy();
    await demo.waitForDeployment();

    return { demo, user1, user2 };
  }

  it("shold be paid", async () => {
    const { demo, user1, user2 } = await loadFixture(deploy);

    const value = ethers.parseEther("1");

    const tx = await user1.sendTransaction({
      value,
      to: demo.target,
    });

    const receipt = await tx.wait();

    expect(tx).to.be.changeEtherBalance(demo.target, value);

    const timestamp = (await ethers.provider.getBlock(receipt?.blockNumber!))
      ?.timestamp;

    expect(tx).to.be.emit(demo, "Paid").withArgs(user1.address, value, timestamp);
  });
});
