"use client";
import "./globals.css";
import { useState, useEffect } from "react";

const TASKS = [
  { id: "tg1", title: "Join Main Channel", link: "https://t.me/AnkhCommunity", reward: 5000 },
  { id: "tg2", title: "Join News Channel", link: "https://t.me/AnkhNews", reward: 5000 },
  { id: "tg3", title: "Join Chat", link: "https://t.me/AnkhChat", reward: 3000 },
  { id: "x", title: "Follow on X", link: "https://x.com", reward: 3000 },
];

export default function Page() {
  const [balance, setBalance] = useState(0);
  const [mining, setMining] = useState(false);
  const [wallet, setWallet] = useState("");
  const [level, setLevel] = useState(1);
  const [claimed, setClaimed] = useState<string[]>([]);
  const [price, setPrice] = useState("0.00012");
  const [fluts, setFluts] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("ankh_bal");
    if (saved) setBalance(Number(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("ankh_bal", String(balance));
    setLevel(Math.floor(balance / 10000) + 1);
  }, [balance]);

  const mine = () => {
    if (mining) return;
    setMining(true);
    setTimeout(() => {
      const earn = level * 10;
      setBalance(b => b + earn);
      setFluts(f => f + 1);
      setMining(false);
    }, 2000);
  };

  const connectWallet = () => {
    const addr = prompt("حط عنوان محفظة TON بتاعتك:");
    if (addr) setWallet(addr);
  };

  const doTask = (t: any) => {
    window.open(t.link, "_blank");
    setTimeout(() => {
      if (!claimed.includes(t.id)) {
        setBalance(b => b + t.reward);
        setClaimed([...claimed, t.id]);
        alert(`تم! +${t.reward} ANKH`);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-2xl font-bold text-yellow-400">𓂀 ANKH Mining</h1>
          <button onClick={connectWallet} className="bg-white text-black px-3 py-1
