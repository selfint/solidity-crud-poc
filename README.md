# CRUD poc

1. Install:

- node
- npx
- npm
- solidity

2. Setup backend:

```shel
$ cd backend
$ npm i
$ npx hardhat node

Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

```

3. Copy two wallet private keys to `frontend/src/app/page.tsx`:

```ts
const private_1 =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const private_2 =
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
```

4. Now compile and deploy contract:

```sh
$ npx hardhat compile
$ npx hardhat ignition deploy ./ignition/modules/PostBoard.ts --network localhost
```

5. Copy `backend/artifacts/contracts/PostBoard.sol/PostBoard.json` to `frontend/src/abis/PostBoard.json`.

6. Setup frontend:

```sh
$ cd frontend
$ npm i
$ npm run dev
```
