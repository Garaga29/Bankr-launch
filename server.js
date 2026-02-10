import express from "express";
import cors from "cors";
import { ethers } from "ethers";

const app = express();
app.use(cors());
app.use(express.static("public"));

const provider = new ethers.WebSocketProvider(
  "wss://base-mainnet.g.alchemy.com/v2/YOUR_KEY"
);

let tokens = [];

provider.on("pending", async (txHash) => {
  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx) return;

    if (!tx.to && tx.data.length > 2000) {
      const address = ethers.getCreateAddress(tx);

      tokens.unshift({
        name: "New Token",
        symbol: "???",
        address,
        deployer: tx.from,
        time: Date.now()
      });

      tokens = tokens.slice(0, 50);
    }
  } catch {}
});

app.get("/api/tokens", (req, res) => {
  res.json(tokens);
});

app.listen(3000, () => {
  console.log("terminal running");
});
