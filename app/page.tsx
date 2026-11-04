"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [totalBalance, setTotalBalance] = useState(1245.5);
  const [minedAmount, setMinedAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [refCode, setRefCode] = useState("ANKH77");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeDuration, setStakeDuration] = useState(1);
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
    alert("Tokens Claimed Successfully!");
  };

  const inviteLink = `https://t.me{refCode}`;

  return (
    <div style={{ minHeight: "100vh", background: "#060907", color: "#ffffff", display: "flex", justifyContent: "center", fontFamily: "sans-serif", position: "relative", overflowX: "hidden" }}>
      
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "320px", color: "rgba(212, 175, 55, 0.02)", zIndex: 1, pointerEvents: "none", userSelect: "none" }}>
        ☥
      </div>

      <div style={{ width: "100%", maxWidth: "420px", background: "#0d110e", minHeight: "100vh", paddingBottom: "100px", position: "relative", zIndex: 2, boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        
        <div style={{ padding: "20px 16px", background: "#111612", borderBottom: "2px solid #d4af37", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#d4af37", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "22px" }}>☥</div>
            <div>
              <b style={{ color: "#d4af37", fontSize: "18px" }}>ANKH MINING</b>
              <p style={{ margin: 0, fontSize: "11px", color: "#8a9a8a", fontWeight: "bold" }}>LEVEL: {currentLevel} / 500</p>
            </div>
          </div>
          <div style={{ background: "rgba(22, 42, 28, 0.4)", padding: "8px 14px", borderRadius: "16px", border: "1px solid #d4af37" }}>
            <span style={{ color: "#d4af37", fontWeight: "bold", fontSize: "15px" }}>{totalBalance.toFixed(4)} ☥</span>
          </div>
        </div>

        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
          
          {tab === "mining" && (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={() => setShowGuide(true)} style={{ background: "none", color: "#d4af37", border: "1px solid #d4af37", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "bold" }}>?</button>
                </div>
                
                <p style={{ color: "#8a9a8a", margin: "15px 0 0 0", fontSize: "14px" }}>Mined Balance</p>
                <h1 style={{ fontSize: "52px", color: "#d4af37", margin: "5px 0 20px 0", fontWeight: "bold" }}>{minedAmount.toFixed(5)}</h1>
                
                <div style={{ margin: "20px auto", width: "180px", height: "180px", borderRadius: "50%", border: "3px dashed #d4af37", display: "flex", alignItems: "center", justifyContent: "center", background: "#111612" }}>
                  <span style={{ fontSize: "65px" }}>⛏️</span>
                </div>

                <div style={{ background: "#111612", borderRadius: "16px", padding: "14px 20px", border: "1px solid #1a221c", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0" }}>
                  <span style={{ fontSize: "14px", color: "#8a9a8a" }}>Mining Velocity:</span>
                  <b style={{ color: "#22c55e", fontSize: "15px" }}>+{miningRate.toFixed(2)} ANKH / H</b>
                </div>
              </div>

              <div>
                <button onClick={handleClaim} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "16px", borderRadius: "14px", fontWeight: "bold", fontSize: "17px", cursor: "pointer" }}>📥 Claim Tokens</button>
                
                <div style={{ background: "rgba(40, 16, 16, 0.6)", border: "1px solid #ef4444", borderRadius: "14px", padding: "14px", marginTop: "20px", textAlign: "left" }}>
                  <b style={{ color: "#ef4444", display: "block", marginBottom: "4px", fontSize: "13px" }}>⚠️ Active Rule Restriction:</b>
                  <p style={{ color: "#fca5a5", fontSize: "12px", margin: 0, lineHeight: "1.5" }}>You must claim at least once every 24 hours. Failure to interact will result in automated token decay.</p>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <button onClick={() => setWalletBalance((b) => b + 20)} style={{ background: "rgba(255,255,255,0.03)", color: "#8a9a8a", border: "1px solid #222", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>Mock On-Chain Deposit (+20 TON)</button>
                </div>
              </div>
            </div>
          )}

          {tab === "friends" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ color: "#d4af37", margin: "10px 0 8px 0", fontSize: "20px" }}>Referral Matrix</h3>
                <p style={{ fontSize: "14px", color: "#8a9a8a", lineHeight: "1.6" }}>Expand the ANKH ecosystem. Secure a permanent <b style={{ color: "#d4af37" }}>5% royalty</b> tracking all mining assets.</p>
                
                <div style={{ background: "#111612", padding: "16px", borderRadius: "16px", marginTop: "25px", border: "1px solid #1a221c" }}>
                  <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#8a9a8a" }}>Your unique referral link:</p>
                  <div style={{ background: "#060907", padding: "12px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <code style={{ fontSize: "12px", color: "#d4af37" }}>{inviteLink}</code>
                    <button onClick={() => { navigator.clipboard.writeText(inviteLink); alert("Copied!"); }} style={{ background: "#d4af37", color: "#000", border: "none", padding: "8px 14px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>Copy</button>
                  </div>
                </div>
              </div>

              <div style={{ background: "#111612", padding: "18px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontSize: "14px", color: "#8a9a8a" }}>Total Qualified Referrals:</span>
                <b style={{ color: "#d4af37", fontSize: "18px" }}>0 Members</b>
              </div>
            </div>
          )}

          {tab === "staking" && (
            <div>
              <h3 style={{ color: "#d4af37", margin: "10px 0 8px 0", fontSize: "20px" }}>Staking Escrow</h3>
              <p style={{ fontSize: "14px", color: "#8a9a8a" }}>Lock up surplus tokens into highly secure liquidity pools. Minimum is 100 ANKH.</p>
              
              <div style={{ background: "#111612", padding: "20px", borderRadius: "18px", marginTop: "25px", border: "1px solid #1a221c" }}>
                <input type="number" placeholder="Amount (Min 100 ANKH)" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} style={{ width: "100%", padding: "14px", background: "#060907", border: "1px solid #1a221c", color: "#fff", borderRadius: "10px", boxSizing: "border-box", outline: "none" }} />
                
                <div style={{ display: "flex", gap: "8px", marginTop: "15px" }}>
                  <button onClick={() => setStakeDuration(1)} style={{ flex: 1, padding: "12px 6px", borderRadius: "10px", background: stakeDuration === 1 ? "#d4af37" : "#060907", color: stakeDuration === 1 ? "#000" : "#fff", fontWeight: "bold", border: "1px solid #d4af37", cursor: "pointer", fontSize: "12px" }}><b>1 Month</b><br/>25% ROI</button>
                  <button onClick={() => setStakeDuration(3)} style={{ flex: 1, padding: "12px 6px", borderRadius: "10px", background: stakeDuration === 3 ? "#d4af37" : "#060907", color: stakeDuration === 3 ? "#000" : "#fff", fontWeight: "bold", border: "1px solid #d4af37", cursor: "pointer" }}><b>3 Months</b><br/>60% ROI</button>
                  <button onClick={() => setStakeDuration(9)} style={{ flex: 1, padding: "12px 6px", borderRadius: "10px", background: stakeDuration === 9 ? "#d4af37" : "#060907", color: stakeDuration === 9 ? "#000" : "#fff", fontWeight: "bold", border: "1px solid #d4af37", cursor: "pointer" }}><b>9 Months</b><br/>105% ROI</button>
                </div>

<button onClick={() => { if(Number(stakeAmount) >= 100){ setTotalBalance(b => b - Number(stakeAmount)); setStakeAmount(""); alert("Staking Order Executed!"); } }} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", marginTop: "25px" }}>Execute Staking Contract


)}
{tab === "wallet" && (

<h3 style={{ color: "#d4af37", margin: "10px 0 8px 0", fontSize: "20px" }}>Clearing & Settlement
{!connected ? (
<button onClick={() => setConnected(true)} style={{ width: "100%", background: "#0098ea", color: "#fff", border: "none", padding: "15px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", fontSize: "16px", marginBottom: "20px" }}>🔗 Connect Open TON Wallet
) : (
<div style={{ background: "#111612", padding: "14px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", border: "1px solid #22c55e" }}>
<span style={{ color: "#22c55e", fontSize: "14px", fontWeight: "bold" }}>● Mainnet Link Established
<button onClick={() => { setConnected(false); setVerified(false); }} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>Disconnect

)}
{connected && !verified && (
<div style={{ background: "rgba(22,34,25,0.5)", padding: "16px", borderRadius: "14px", border: "1px solid #22c55e", marginBottom: "20px" }}>
<p style={{ fontSize: "13px", color: "#8a9a8a", margin: "0 0 12px 0" }}>Execute a one-time validation payload of 0.05 GRAM on-chain.
<button onClick={() => setVerified(true)} style={{ width: "100%", background: "#22c55e", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>Authorize Verification (0.05 GRAM)

)}
<div style={{ background: "#111612", padding: "20px", borderRadius: "18px", border: "1px solid #1a221c" }}>
<h4 style={{ margin: "0 0 6px 0", color: "#fff" }}>Withdraw Assets
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#8a9a8a", marginBottom: "15px" }}>
Network Fee: 5%
Minimum Threshold: 10,000 ANKH
<div style={{ padding: "3px", borderRadius: "10px", background: (withdrawAmount !== "" && Number(withdrawAmount) < 10000) ? "rgba(239, 68, 68, 0.25)" : "transparent", transition: "background 0.3s" }}>
<input type="number" placeholder="Enter amount to withdraw" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} style={{ width: "100%", padding: "14px", background: "#060907", color: "#fff", border: "1px solid #1a221c", borderRadius: "8px", boxSizing: "border-box", outline: "none" }} />
{withdrawAmount !== "" && Number(withdrawAmount) < 10000 && (
<p style={{ color: "#ef4444", fontSize: "12px", margin: "6px 0 0 0", fontWeight: "bold" }}>Alert: Amount resides below the 10,000 baseline requirement.
)}
<button onClick={() => { if (!verified) { alert("Account verification required!"); return; } if (Number(withdrawAmount) >= 10000) { alert("Processing settlement claim!"); setWithdrawAmount(""); } }} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "14px", borderRadius: "12px", marginTop: "20px", fontWeight: "bold", cursor: "pointer" }}>Dispatch Withdrawal


)}
{tab === "tasks" && (

<h3 style={{ color: "#d4af37", margin: "10px 0 8px 0", fontSize: "20px" }}>Campaign Hub
<p style={{ fontSize: "14px", color: "#8a9a8a" }}>Claim immediate auxiliary allocation grants by completing ecosystem verification actions.
<div style={{ background: "#111612", padding: "16px", borderRadius: "16px", marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

<b style={{ fontSize: "15px", color: "#fff" }}>Daily System Check-in
<p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#d4af37", fontWeight: "bold" }}>+7 ANKH Grant

<button onClick={() => { setTotalBalance(b => b + 7); alert("Ecosystem reward claimed!"); }} style={{ background: "#d4af37", color: "#000", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>Claim


)}
{showGuide && (
<div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000, padding: "20px" }}>
<div style={{ background: "#111612", border: "2px solid #d4af37", padding: "24px", borderRadius: "20px", maxWidth: "320px", width: "100%", textAlign: "center" }}>
<h4 style={{ color: "#d4af37", marginTop: 0 }}>Ecosystem Operation Rules
<p style={{ fontSize: "13px", color: "#8a9a8a", lineHeight: "1.6" }}>• Tier 0 is entirely free providing 0.25 ANKH/H.• Tiers 1 through 500 adapt dynamic velocities calculated against your active connected On-chain balance.
<button onClick={() => setShowGuide(false)} style={{ background: "#d4af37", border: "none", padding: "10px 20px", borderRadius: "10px", width: "100%", fontWeight: "bold", cursor: "pointer", marginTop: "15px" }}>Close Portal


)}
<div style={{ position: "fixed", bottom: 0, maxWidth: "420px", width: "100%", height: "76px", background: "#111612", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "2px solid #d4af37", zIndex: 1000, boxSizing: "border-box" }}>
<button onClick={() => setTab("mining")} style={{ background: "none", border: "none", color: tab === "mining" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><span style={{ fontSize: "20px" }}>⛏️Mining
<button onClick={() => setTab("friends")} style={{ background: "none", border: "none", color: tab === "friends" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><span style={{ fontSize: "20px" }}>👥Friends
<button onClick={() => setTab("staking")} style={{ background: "none", border: "none", color: tab === "staking" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><span style={{ fontSize: "20px" }}>📈Staking
<button onClick={() => setTab("wallet")} style={{ background: "none", border: "none", color: tab === "wallet" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><span style={{ fontSize: "20px" }}>💼Wallet
<button onClick={() => setTab("tasks")} style={{ background: "none", border: "none", color: tab === "tasks" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}><span style={{ fontSize: "20px" }}>📋Tasks
);
}
