"use client";
import { useState, useEffect } from "react";
import { Button, Flex, Text, Box } from "@mantine/core";
import { IconWallet, IconBrandGithub } from "@tabler/icons-react";
import { ethers, BrowserProvider, JsonRpcSigner } from "ethers";
import PurchaseCredits from "./PurchaseCredits";

const TARGET_CHAIN_ID = 4158; // Your target network chain ID

interface ConnectWalletProps {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConnectWallet({ setIsConnected }: ConnectWalletProps) {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [chainId, setChainId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [credits, setCredits] = useState<number>(0);

  // Setup provider (MetaMask) when the app loads
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      // Cast window.ethereum as Eip1193Provider
      const providerInstance = new ethers.BrowserProvider(
        window.ethereum as ethers.Eip1193Provider
      );
      setProvider(providerInstance);

      window.ethereum.on("chainChanged", (chainId: string) => {
        setChainId(parseInt(chainId, 16));
      });
    } else {
      console.log("MetaMask is not installed");
    }
  }, []);

  useEffect(() => {
    console.log("userAddress state updated:", userAddress);
    fetchCredits();
  }, [userAddress]);

  // Connect Wallet function
  const connectWallet = async () => {
    if (!provider) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setLoading(true);
      await provider.send("eth_requestAccounts", []);

      const signerInstance = await provider.getSigner();
      const address = await signerInstance.getAddress();
      setSigner(signerInstance);
      await setUserAddress(address);
      console.log("Wallet connected: saved", userAddress);

      // Get the chain ID
      const network = await provider.getNetwork();
      // Convert bigint to number
      setChainId(Number(network.chainId));
      setLoading(false);

      console.log(
        "Wallet connected:",
        address,
        "Chain ID:",
        Number(network.chainId)
      );
      setIsConnected(true);
    } catch (error) {
      setLoading(false);
      console.error("Error connecting wallet:", error);
    }
  };

  // Fetch user credits
  const fetchCredits = async () => {
    console.log("User address => ", userAddress);
    if (!userAddress) return;

    try {
      // Example API call or smart contract call to get user credits

      console.log("getting credits now =>");
      const response = await fetch("/api/getCredits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: userAddress }),
      });
      const data = await response.json();

      console.log("credits are here => ", data.credits);

      const response1 = await fetch("/api/getNonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: userAddress }),
      });
      const data1 = await response1.json();

      console.log("Here is the nonce => ", data1.nonce);
      //@ts-ignore
      const signature = await signer.signMessage(data1!.nonce.toString());
      console.log("Signer ran successfully. ");
      const response2 = await fetch("/api/verifySignature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: userAddress, signature }),
      });
      const data2 = await response.json();

      console.log("credits are here => ", data1.credits);
      if (data.credits !== undefined) {
        setCredits(data.credits);
      } else {
        console.error("Error fetching credits:", data.error);
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  // Disconnect Wallet function
  const disconnectWallet = () => {
    setSigner(null);
    setUserAddress("");
    setChainId(null);
    console.log("Wallet disconnected");
  };

  return (
    <Flex direction="column">
      <Box style={{ position: "absolute", top: 0, left: 15 }}>
        <Text c="dimmed" mt="sm">
          <b>Credits:</b> <span className="font-bold">{credits}</span>
        </Text>
      </Box>
      <Flex gap="xs" align="center" justify="center">
        {!userAddress ? (
          <Button
            onClick={connectWallet}
            variant="filled"
            color="teal"
            styles={{
              root: {
                backgroundColor: "#053747",
                color: "#0cc2fe",
                border: "1px solid #0cc2fe",
                "&:hover": {
                  backgroundColor: "#0a9fda",
                },
              },
            }}
            rightSection={<IconWallet size={18} />}
            loading={loading}
          >
            Connect
          </Button>
        ) : (
          <div>
            <Button
              onClick={disconnectWallet}
              variant="filled"
              color="red"
              styles={{
                root: {
                  backgroundColor: "#990000",
                  color: "#fff",
                  border: "1px solid #ff4d4d",
                  "&:hover": {
                    backgroundColor: "#cc0000",
                  },
                },
              }}
            >
              Disconnect
            </Button>
          </div>
        )}
        <Button
          variant="filled"
          color="dark"
          styles={{
            root: {
              backgroundColor: "#000",
              border: "1px solid #999",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#333",
              },
            },
          }}
          rightSection={<IconBrandGithub size={18} />}
        >
          Github
        </Button>
      </Flex>
      {userAddress && (
        <>
          <Text c="dimmed" mt="sm">
            <b>Wallet:</b> <span className="font-bold">{userAddress}</span>
          </Text>
          {provider && signer && chainId && (
            <PurchaseCredits
              provider={provider}
              signer={signer}
              userAddress={userAddress}
              chainId={chainId}
              fetchCredits={fetchCredits}
            />
          )}
        </>
      )}
    </Flex>
  );
}
