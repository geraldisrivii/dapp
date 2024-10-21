import { assert } from "chai";
import { loadFixture, ethers, expect } from "./setup";

describe("Payments", () => {
  async function deploy() {
    const [user1, user2] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("Payments");
    const payments = await Factory.deploy();
    await payments.waitForDeployment();

    return { payments, user1, user2 };
  }

  it("shold be deployed", async () => {
    const { payments, user1, user2 } = await loadFixture(deploy);

    expect(await payments.getAddress()).to.be.properAddress;
  });

  it("shold be 0 ethers by default", async () => {
    const { payments, user1, user2 } = await loadFixture(deploy);

    expect(await payments.currentBalance()).to.eq(0);
  });

  it("should be payable", async () => {
    const { payments, user1, user2 } = await loadFixture(deploy);

    const tx = payments.connect(user2).pay("Hello", { value: ethers.parseEther("1") });

    (await tx).wait(1);

    expect(await payments.currentBalance()).to.eq(ethers.parseEther("1"));
  });
});
