"use client";
import "./globals.css";
import { useState } from "react";

export default function Page() {
  const [balance, setBalance] = useState(0);
  const [level, setLevel] = useState(1);
  const [fluts, setFluts] = useState(0);
  const [mining, setMining] = useState(false);
  const [wallet, setWallet] = useState("");
  const [claimed, setClaimed] = useState<any[]>([]);

  const tasks = [
    { id: 1, title: "Join Telegram", reward: 100, link: "https://t.me" },
    { id: 2, title: "Follow on X", reward: 150, link: "https://x.com" },
  ];

  const handleMine = () => {
    if (mining) return;
    setMining(true);
    setTimeout(() => {
      const earn = level * 10;
      setBalance((b) => b + earn);
      setFluts((f) => f + 1);
      setMining(false);
    }, 2000);
  };

  const connectWallet = () => {
    const addr = prompt("حط عنوان محفظة TON:");
    if (addr) setWallet(addr);
  };

  const doTask = (t: any) => {
    window.open(t.link, "_blank");
    setTimeout(() => {
      if (!claimed.includes(t.id)) {
        setBalance((b) => b + t.reward);
        setClaimed([...claimed, t.id]);
        alert(`تم! +${t.reward} ANKH`);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-yellow-400">ANKH Mining</h1>
          <button onClick={connectWallet} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
            {wallet ? wallet.slice(0,6)+"..." : "Connect Wallet"}
          </button>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 text-center mb-4">
          <p className="text-zinc-400">Balance</p>
          <h2 className="text-4xl font-bold my-2">{balance} ANKH</h2>
          <p className="text-sm">Level {level} | Fluts {fluts}</p>
          <button onClick={handleMine} disabled={mining} className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold disabled:opacity-50">
            {mining ? "Mining..." : "Start Mining"}
          </button>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4">
          <h3 className="font-bold mb-3">Tasks</h3>
          {tasks.map(t => (
            <div key={t.id} className="flex justify-between items-center py-2 border-b border-zinc-800 last:border-0">
              <span>{t.title}</span>
              <button onClick={()=>doTask(t)} className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                +{t.reward}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
