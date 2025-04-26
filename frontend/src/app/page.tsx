"use client";

import { useEffect, useState } from "react";

import { createWalletClient, createPublicClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { abi } from "../abis/PostBoard.json";

const private_1 =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const private_2 =
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

// Create two wallets from private keys
const account1 = privateKeyToAccount(private_1);
const account2 = privateKeyToAccount(private_2);
const transport = http("http://127.0.0.1:8545");

const wallet1 = createWalletClient({
  account: account1,
  transport,
});

const wallet2 = createWalletClient({
  account: account2,
  transport,
});

const client = createPublicClient({
  chain: hardhat,
  transport: http("http://127.0.0.1:8545"),
});

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function fetchPosts(): Promise<string[]> {
  const posts = await client.readContract({
    address: contractAddress,
    abi,
    functionName: "getPosts",
  });

  console.log("Posts:", posts);

  return posts;
}

async function send1() {
  const text = "hello from 1";

  const txHash = await wallet1.writeContract({
    address: contractAddress,
    abi,
    functionName: "addPost",
    args: [text],
  });

  console.log("Transaction Hash:", txHash);
}

async function send2() {
  const posts = await wallet2.writeContract({
    address: contractAddress,
    abi,
    functionName: "addPost",
    args: ["hello from 2"],
  });

  return posts;
}

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    }
    loadPosts();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Posts</h1>
          <ul className="list-disc pl-5">
            {posts.map((post, index) => (
              <li key={index} className="text-lg text-gray-200">
                {post}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={send1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Send 1
          </button>
          <button
            onClick={send2}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Send 2
          </button>
        </div>
      </main>
    </div>
  );
}
