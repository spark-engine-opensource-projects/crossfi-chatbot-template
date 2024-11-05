"use client";
import { useState, useEffect } from 'react';
import { Button, Select, NumberInput, Notification, Flex, Text, Divider } from '@mantine/core';
import { ethers } from 'ethers';
import { abi } from './CreditPurchaseETH.json';

interface PurchaseCreditsProps {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  userAddress: string;
  chainId: number | null;
  fetchCredits: () => Promise<void>;
}

const TARGET_CHAIN_ID = 4158;
const DEPLOYED_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS!;
const XFI_TO_CREDIT_RATE = 0.05;

export default function PurchaseCredits({
  provider,
  signer,
  userAddress,
  chainId,
  fetchCredits,
}: PurchaseCreditsProps) {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [ethAmount, setEthAmount] = useState<number | ''>('');
  const [creditAmount, setCreditAmount] = useState<number | ''>('');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<string>('xfi');
  const [loading, setLoading] = useState<boolean>(false);

  // Load the already deployed contract
  useEffect(() => {
    if (signer && DEPLOYED_CONTRACT_ADDRESS) {
      const contractInstance = new ethers.Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
      setContract(contractInstance);
    }
  }, [signer]);

  const handleEthInputChange = (value: string | number) => {
    if (typeof value === 'number') {
      setEthAmount(value);
      setCreditAmount(Number((value / XFI_TO_CREDIT_RATE).toFixed(2)));
    } else {
      setEthAmount('');
      setCreditAmount('');
    }
  };

  const handleCreditInputChange = (value: string | number) => {
    if (typeof value === 'number') {
      setCreditAmount(value);
      setEthAmount(Number((value * XFI_TO_CREDIT_RATE).toFixed(4)));
    } else {
      setCreditAmount('');
      setEthAmount('');
    }
  };

  const purchaseCredits = async () => {
    if (!contract || !signer || !chainId || chainId !== TARGET_CHAIN_ID) {
      alert('Contract, signer, or chain ID not available. Please connect your wallet and ensure you are on the correct network.');
      return;
    }

    try {
      setLoading(true);
      let amountInWei;

      if (paymentType === 'xfi' && ethAmount !== '') {
        amountInWei = ethers.parseEther(ethAmount.toString());
      } else if (paymentType === 'credits' && creditAmount !== '') {
        const xfiEquivalent = creditAmount * XFI_TO_CREDIT_RATE;
        amountInWei = ethers.parseEther(xfiEquivalent.toString());
      } else {
        alert('Please enter a valid amount.');
        setLoading(false);
        return;
      }

      const tx = await contract.purchaseCredits({ value: amountInWei });
      const receipt = await tx.wait();
      setTxHash(receipt.transactionHash);

      console.log('Transaction successful:', receipt);
      await fetchCredits(); // Refresh credits balance
    } catch (error) {
      console.error('Error purchasing credits:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Purchase Credits</h4>
      <Divider mb={6}/>
      <Flex gap="xs" direction="row" style={{ marginBottom: '1rem' }}>
        <Select
          label="Select Payment Type"
          value={paymentType}
          w="100%"
          onChange={(value) => setPaymentType(value!)}
          data={[
            { value: 'xfi', label: 'Pay in XFI' },
            { value: 'credits', label: 'Specify Credits' },
          ]}
        />
                {ethAmount !== '' && creditAmount !== '' ? (
          <Text mt="xl" w="100%">
            {paymentType === 'xfi'
              ? `${ethAmount} XFI = ${creditAmount} Credits`
              : `${creditAmount} Credits = ${ethAmount} XFI`}
          </Text>
        ) : (
          <Text mt="xl" w="100%">
            Select number of credits
          </Text>    
        )}
    </Flex>
    <Flex gap="xs" direction="row" style={{ marginBottom: '1rem' }}>
        {paymentType === 'xfi' ? (
          <NumberInput
            label="Amount in XFI"
            value={ethAmount}
            w="100%"
            onChange={handleEthInputChange}
            min={0}
            placeholder="Enter amount in XFI"
            decimalScale={4}
            fixedDecimalScale
          />
        ) : (
          <NumberInput
            label="Amount of Credits"
            value={creditAmount}
            w="100%"
            onChange={handleCreditInputChange}
            min={0}
            placeholder="Enter number of credits"
            decimalScale={2}
            fixedDecimalScale
          />
        )}

      <Button
        onClick={purchaseCredits}
        loading={loading}
        mt="3vh"
        styles={{
          root: {
            backgroundColor: '#053747',
            color: '#0cc2fe',
            border: '1px solid #0cc2fe',
            '&:hover': {
              backgroundColor: '#0a9fda',
            },
          },
        }}
        fullWidth
      >
        Purchase Credits
      </Button>
      </Flex>
      {txHash && (
        <Notification color="green" mt="md">
          Transaction successful! Tx Hash:{" "}
          <a
            href={`https://test.xfiscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: 'inherit' }}
          >
            {txHash}
          </a>
        </Notification>
      )}
    </div>
  );
}
