"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [totalBalance, setTotalBalance] = useState(0);
  const [minedAmount, setMinedAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [refCode, setRefCode] = useState("ANKH77");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const currentLevel = Math.min(500, Math.floor(walletBalance / 10));
  const miningRate = 0.25 + currentLevel * 0.05;

  useEffect(() => {
    const interval = setInterval(() => {
      setMinedAmount((prev) => prev + (miningRate / 36000));
    }, 100);
    return () => clearInterval(interval);
  }, [miningRate]);

  const handleClaim = () => {
    if (minedAmount <= 0) return;
    setTotalBalance((prev) => prev + minedAmount);
    setMinedAmount(0);
    alert("Claim Success!");
  };

  const inviteLink = `https://t.me{refCode}`;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0d0a", color: "#ffffff", display: "flex", justifyContent: "center", fontFamily: "sans-serif", position: "relative" }}>
      
      <div style={{ position: "fixed", top: "35%", fontSize: "200px", color: "rgba(212,175,55,0.03)", zIndex: 1, pointerEvents: "none" }}>
        ☥
      </div>

      <div style={{ width: "100%", maxWidth: "420px", background: "#111411", minHeight: "100vh", paddingBottom: "90px", position: "relative", zIndex: 2, boxSizing: "border-box" }}>
        
        <div style={{ padding: "16px", background: "#161b16", borderBottom: "2px solid #d4af37", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <b style={{ color: "#d4af37", fontSize: "16px" }}>ANKH MINING</b>
            <p style={{ margin: 0, fontSize: "11px", color: "#8a9a8a" }}>LEVEL: {currentLevel}</p>
          </div>
          <div style={{ background: "#222a22", padding: "6px 12px", borderRadius: "12px", border: "1px solid #d4af37" }}>
            <span style={{ color: "#d4af37", fontWeight: "bold" }}>{totalBalance.toFixed(4)} ☥</span>
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          {tab === "mining" && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setShowGuide(true)} style={{ background: "#161b16", color: "#d4af37", border: "1px solid #d4af37", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer" }}>?</button>
              </div>
              <p style={{ color: "#8a9a8a", margin: 0 }}>Mined Balance</p>
              <h1 style={{ fontSize: "40px", color: "#d4af37", margin: "10px 0" }}>{minedAmount.toFixed(5)}</h1>
              <p style={{ color: "#8a9a8a", fontSize: "12px" }}>Speed: {miningRate.toFixed(2)} / H</p>
              
              <button onClick={handleClaim} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", marginTop: "20px", cursor: "pointer" }}>Claim Tokens</button>
              
              <div style={{ background: "#221111", border: "1px solid #ff4444", borderRadius: "8px", padding: "10px", marginTop: "20px", textAlign: "left" }}>
                <p style={{ color: "#ff4444", margin: "0 0 4px 0", fontWeight: "bold", fontSize: "12px" }}>Warning:</p>
                <p style={{ color: "#ff8888", fontSize: "11px", margin: 0 }}>Claim at least once every 24 hours.</p>
              </div>

              <div style={{ marginTop: "20px" }}>
                <button onClick={() => setWalletBalance((b) => b + 20)} style={{ background: "#161b16", color: "#d4af37", border: "1px solid #333", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Test Update +20 TON</button>
              </div>
            </div>
          )}

          {tab === "friends" && (
            <div>
              <h3>Referrals</h3>
              <p style={{ fontSize: "13px", color: "#8a9a8a" }}>Invite friends and get 5% permanently.</p>
              <div style={{ background: "#161b16", padding: "12px", borderRadius: "8px", marginTop: "10px" }}>
                <code style={{ fontSize: "12px", color: "#d4af37" }}>{inviteLink}</code>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(inviteLink); alert("Copied!"); }} style={{ background: "#d4af37", color: "#000", border: "none", padding: "8px 16px", borderRadius: "6px", marginTop: "10px", fontWeight: "bold", cursor: "pointer" }}>Copy Link</button>
            </div>
          )}

          {tab === "staking" && (
            <div>
              <h3>Staking Pool</h3>
              <p style={{ fontSize: "13px", color: "#8a9a8a" }}>Lock assets for rewards.</p>
              <input type="number" placeholder="Min 100 ANKH" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} style={{ width: "100%", padding: "10px", background: "#000", border: "1px solid #333", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
              <button onClick={() => { if(Number(stakeAmount) >= 100){ setTotalBalance(b => b - Number(stakeAmount)); setStakeAmount(""); alert("Staked!"); } }} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "10px", borderRadius: "6px", marginTop: "10px", fontWeight: "bold", cursor: "pointer" }}>Start Staking</button>
            </div>
          )}

          {tab === "wallet" && (
            <div>
              <h3>Wallet & Withdraw</h3>
              {!connected ? (
                <button onClick={() => setConnected(true)} style={{ width: "100%", background: "#0098ea", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>Connect Wallet</button>
              ) : (
                <p style={{ color: "#00ffcc" }}>Connected</p>
              )}
              {connected && !verified && (
                <button onClick={() => setVerified(true)} style={{ width: "100%", background: "#22c55e", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", marginTop: "10px", fontWeight: "bold", cursor: "pointer" }}>Verify Account (0.05 GRAM)</button>
              )}
              <input type="number" placeholder="Withdraw Amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} style={{ width: "100%", padding: "10px", background: "#000", color: "#fff", border: "1px solid #333", borderRadius: "5px", marginTop: "15px", boxSizing: "border-box" }} />
            </div>
          )}

          {tab === "tasks" && (
            <div>
              <h3>Tasks Center</h3>
              <p style={{ fontSize: "13px", color: "#8a9a8a" }}>Complete activities.</p>
            </div>
          )}
        </div>

        {showGuide && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
            <div style={{ background: "#161b16", border: "1px solid #d4af37", padding: "20px", borderRadius: "12px", maxWidth: "300px", width: "100%" }}>
              <h4>Mining Guide</h4>
              <p style={{ fontSize: "12px", color: "#8a9a8a" }}>Level 0: Free - 0.25/H</p>
              <button onClick={() => setShowGuide(false)} style={{ background: "#d4af37", border: "none", padding: "6px 12px", borderRadius: "4px", width: "100%", fontWeight: "bold", cursor: "pointer" }}>Close</button>
            </div>
          </div>
        )}

        <div style={{ position: "fixed", bottom: 0, maxWidth: "420px", width: "100%", height: "70px", background: "#161b16", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "2px solid #d4af37", zIndex: 1000, boxSizing: "border-box" }}>
          <button onClick={() => setTab("mining")} style={{ background: "none", border: "none", color: tab === "mining" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>Mining</button>
          <button onClick={() => setTab("friends")} style={{ background: "none", border: "none", color: tab === "friends" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>Friends</button>
          <button onClick={() => setTab("staking")} style={{ background: "none", border: "none", color: tab === "staking" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>Staking</button>
          <button onClick={() => setTab("wallet")} style={{ background: "none", border: "none", color: tab === "wallet" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>Wallet</button>
          <button onClick={() => setTab("tasks")} style={{ background: "none", border: "none", color: tab === "tasks" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>Tasks</button>
        </div>

      </div>
    </div>
  );
}
