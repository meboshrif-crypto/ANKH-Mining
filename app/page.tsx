"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [totalBalance, setTotalBalance] = useState(0);
  const [minedAmount, setMinedAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [refCode, setRefCode] = useState("000000");
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

  useEffect(() => {
    setRefCode("ANKH77");
  }, []);

  const handleClaim = () => {
    if (minedAmount <= 0) return;
    setTotalBalance((prev) => prev + minedAmount);
    setMinedAmount(0);
    alert("Tokens Claimed Successfully!");
  };

  const inviteLink = `https://t.me{refCode}`;
  const isWithdrawInvalid = withdrawAmount !== "" && Number(withdrawAmount) < 10000;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0d0a", color: "#ffffff", display: "flex", justifyContent: "center", fontFamily: "sans-serif", position: "relative", overflowX: "hidden" }}>
      
      {/* خلفية مفتاح الحياة الثابتة الممتدة في كل الخانات */}
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "260px", color: "rgba(212, 175, 55, 0.04)", userSelect: "none", pointerEvents: "none", zIndex: 1, fontFamily: "serif" }}>
        ☥
      </div>

      <div style={{ width: "100%", maxWidth: "420px", background: "#111411", minHeight: "100vh", paddingBottom: "90px", position: "relative", boxSizing: "border-box", zIndex: 2, display: "flex", flexDirection: "column" }}>
        
        {/* الشريط العلوي الملكي المستمر */}
        <div style={{ padding: "16px", background: "#161b16", borderBottom: "2px solid #d4af37", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
          <div>
            <b style={{ color: "#d4af37", fontSize: "17px", letterSpacing: "0.5px" }}>ANKH MINING</b>
            <p style={{ margin: 0, fontSize: "11px", color: "#8a9a8a", fontWeight: "bold" }}>LEVEL: {currentLevel} / 500</p>
          </div>
          <div style={{ background: "#222a22", padding: "8px 14px", borderRadius: "14px", border: "1px solid #d4af37", boxShadow: "inset 0 0 8px rgba(212,175,55,0.2)" }}>
            <span style={{ color: "#d4af37", fontWeight: "bold", fontSize: "15px" }}>{totalBalance.toFixed(4)} ☥</span>
          </div>
        </div>

        {/* محتوى الخانات الديناميكي */}
        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
          
          {/* === 1. واجهة التعدين === */}
          {tab === "mining" && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setShowGuide(true)} style={{ background: "#161b16", color: "#d4af37", border: "1px solid #d4af37", width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}>?</button>
              </div>
              <p style={{ color: "#8a9a8a", margin: "10px 0 0 0", fontSize: "14px" }}>Mined Balance</p>
              <h1 style={{ fontSize: "46px", color: "#d4af37", margin: "5px 0 15px 0", fontWeight: "bold", letterSpacing: "1px" }}>{minedAmount.toFixed(5)}</h1>
              
              {/* حلقة التعدين المركزية الفرعونية */}
              <div style={{ margin: "25px auto", width: "150px", height: "150px", borderRadius: "50%", border: "3px dashed #d4af37", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(22, 27, 22, 0.6)", boxShadow: "0 0 25px rgba(212,175,55,0.15)" }}>
                <span style={{ fontSize: "55px" }}>⛏️</span>
              </div>

              <div style={{ background: "#161b16", borderRadius: "12px", padding: "12px 16px", border: "1px solid #222a22", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "15px 0" }}>
                <span style={{ fontSize: "13px", color: "#8a9a8a" }}>Mining Speed:</span>
                <span style={{ color: "#d4af37", fontWeight: "bold", fontSize: "14px" }}>+{miningRate.toFixed(2)} ANKH / H</span>
              </div>
              
              <button onClick={handleClaim} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "bold", fontSize: "16px", marginTop: "10px", cursor: "pointer", boxShadow: "0 4px 15px rgba(212,175,55,0.3)" }}>Claim Tokens</button>
              
              <div style={{ background: "rgba(34, 17, 17, 0.7)", border: "1px solid #ff4444", borderRadius: "10px", padding: "12px", marginTop: "25px", textAlign: "left" }}>
                <p style={{ color: "#ff4444", margin: "0 0 4px 0", fontWeight: "bold", fontSize: "13px" }}>⚠️ Warning:</p>
                <p style={{ color: "#ff8888", fontSize: "12px", margin: 0, lineHeight: "1.4" }}>Claim at least once every 24 hours. If missed, your unclaimed tokens will decrease progressively at your current mining speed!</p>
              </div>

              <div style={{ marginTop: "25px" }}>
                <button onClick={() => setWalletBalance((b) => b + 20)} style={{ background: "#161b16", color: "#d4af37", border: "1px solid #333", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>Test Wallet Update (+20 TON)</button>
              </div>
            </div>
          )}

          {/* === 2. واجهة الأصدقاء === */}
          {tab === "friends" && (
            <div>
              <h3 style={{ color: "#d4af37", margin: "10px 0 5px 0" }}>Referral Program</h3>
              <p style={{ fontSize: "13px", color: "#8a9a8a", lineHeight: "1.5" }}>Invite your friends to join ANKH mining. You will permanently receive a <b style={{ color: "#d4af37" }}>5% bonus</b> from their total mining rewards directly to your balance!</p>
              
              <div style={{ background: "#161b16", padding: "14px", borderRadius: "10px", marginTop: "20px", border: "1px solid #222a22" }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "11px", color: "#8a9a8a" }}>Your unique referral link:</p>
                <div style={{ background: "#0a0d0a", padding: "10px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #333" }}>
                  <code style={{ fontSize: "12px", color: "#d4af37", overflowX: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "240px" }}>{inviteLink}</code>
                  <button onClick={() => { navigator.clipboard.writeText(inviteLink); alert("Copied!"); }} style={{ background: "#d4af37", color: "#000", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>Copy</button>
                </div>
              </div>

              <div style={{ background: "#161b16", padding: "14px", borderRadius: "10px", marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #222a22" }}>
                <span style={{ fontSize: "13px" }}>Qualified Invited Friends:</span>
                <span style={{ color: "#d4af37", fontWeight: "bold", fontSize: "16px" }}>0 Users</span>
              </div>
            </div>
          )}

          {/* === 3. واجهة الستيكنج === */}
          {tab === "staking" && (
            <div>
              <h3 style={{ color: "#d4af37", margin: "10px 0 5px 0" }}>Staking Pool</h3>
              <p style={{ fontSize: "13px", color: "#8a9a8a" }}>Lock your ANKH tokens to generate safe, high-yield passive returns. Minimum staking lock is 100 tokens.</p>
              
              <div style={{ background: "#161b16", padding: "16px", borderRadius: "12px", marginTop: "15px", border: "1px solid #222a22" }}>
                <input type="number" placeholder="Enter amount (Min 100 ANKH)" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} style={{ width: "100%", padding: "12px", background: "#0a0d0a", border: "1px solid #333", color: "#fff", borderRadius: "8px", boxSizing: "border-box", outline: "none", fontSize: "14px" }} />
                
                <div style={{ display: "flex", gap: "6px", margin: "15px 0" }}>
                  <div style={{ flex: 1, background: "#0a0d0a", border: "1px solid #d4af37", padding: "8px", borderRadius: "6px", textAlign: "center", fontSize: "11px" }}><b style={{ color: "#d4af37" }}>1 Month</b><br/>25% ROI</div>
                  <div style={{ flex: 1, background: "#0a0d0a", border: "1px solid #d4af37", padding: "8px", borderRadius: "6px", textAlign: "center", fontSize: "11px" }}><b style={{ color: "#d4af37" }}>3 Months</b><br/>60% ROI</div>
                  <div style={{ flex: 1, background: "#0a0d0a", border: "1px solid #d4af37", padding: "8px", borderRadius: "6px", textAlign: "center", fontSize: "11px" }}><b style={{ color: "#d4af37" }}>9 Months</b><br/>105% ROI</div>
                </div>
<button onClick={() => { if(Number(stakeAmount) >= 100){ setTotalBalance(b => b - Number(stakeAmount)); setStakeAmount(""); alert("Staking Activated Successfully!"); } else { alert("Minimum staking amount is 100 ANKH"); } }} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}>Start Staking lock


)}
{/* === 4. واجهة المحفظة والسحب === */}
{tab === "wallet" && (

<h3 style={{ color: "#d4af37", margin: "10px 0 5px 0" }}>Wallet & Withdraw
{!connected ? (
<button onClick={() => setConnected(true)} style={{ width: "100%", background: "#0098ea", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "15px", marginBottom: "20px" }}>🔗 Connect TON Wallet
) : (
<div style={{ background: "#161b16", padding: "14px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", border: "1px solid #d4af37" }}>
<span style={{ color: "#00ffcc", fontSize: "13px" }}>● Connected Securely
<button onClick={() => { setConnected(false); setVerified(false); }} style={{ background: "none", border: "none", color: "#ff4444", cursor: "pointer", fontSize: "13px" }}>Disconnect

)}
{connected && !verified && (
<div style={{ background: "rgba(30,36,30,0.6)", padding: "14px", borderRadius: "10px", border: "1px solid #22c55e", marginBottom: "20px" }}>
<p style={{ fontSize: "12px", color: "#8a9a8a", margin: "0 0 10px 0" }}>Prove you are not a bot by completing a one-time verification transaction on-chain.
<button onClick={() => setVerified(true)} style={{ width: "100%", background: "#22c55e", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>Verify Account (0.05 GRAM)

)}
<div style={{ background: "#161b16", padding: "16px", borderRadius: "12px", border: "1px solid #222a22" }}>
<h4 style={{ margin: "0 0 5px 0" }}>Withdrawal Request
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8a9a8a", marginBottom: "12px" }}>
Fee: 5%
Min limit: 10,000 ANKH
{/* تفعيل التنبيه باللون الأحمر الكامل والشفاف للمربع عند إدخال قيمة أقل من 10 آلاف */}
<div style={{ padding: "3px", borderRadius: "8px", background: isWithdrawInvalid ? "rgba(255, 68, 68, 0.4)" : "transparent", transition: "background 0.3s ease" }}>
<input type="number" placeholder="Enter amount to withdraw" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} style={{ width: "100%", padding: "12px", background: "#0a0d0a", color: "#fff", border: isWithdrawInvalid ? "1px solid #ff4444" : "1px solid #333", borderRadius: "6px", boxSizing: "border-box", outline: "none" }} />
{isWithdrawInvalid && (
<p style={{ color: "#ff4444", fontSize: "11px", margin: "5px 0 0 0" }}>Error: Amount is below the 10,000 minimum limit.
)}
<button onClick={() => { if (!verified) { alert("Please verify your account first!"); return; } if (Number(withdrawAmount) >= 10000) { alert("Withdrawal request submitted!"); setWithdrawAmount(""); } else { alert("Amount is below minimum limit!"); } }} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "12px", borderRadius: "8px", marginTop: "15px", fontWeight: "bold", cursor: "pointer" }}>Confirm Withdrawal


)}
{/* === 5. واجهة المهمات === */}
{tab === "tasks" && (

<h3 style={{ color: "#d4af37", margin: "10px 0 5px 0" }}>Tasks Center
<p style={{ fontSize: "13px", color: "#8a9a8a" }}>Earn extra immediate ANKH rewards by completing daily simple activities.
<div style={{ background: "#161b16", padding: "14px", borderRadius: "10px", marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #222a22" }}>

<b style={{ fontSize: "14px" }}>Daily Reward Check-in
<p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#d4af37" }}>+7 ANKH tokens

<button onClick={() => { setTotalBalance(b => b + 7); alert("Daily Claim Success!"); }} style={{ background: "#d4af37", color: "#000", border: "none", padding: "8px 14px", borderRadius: "6px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>Claim


)}
{/* نافذة دليل مستويات التعدين المنبثقة */}
{showGuide && (
<div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
<div style={{ background: "#161b16", border: "1px solid #d4af37", padding: "20px", borderRadius: "12px", maxWidth: "300px", width: "100%", textAlign: "center" }}>
<h4 style={{ color: "#d4af37", marginTop: 0 }}>Mining Guide
<p style={{ fontSize: "12px", color: "#8a9a8a", lineHeight: "1.5" }}>Level 0: Free - 0.25/H
Levels 1-500 require On-chain balance to upgrade velocity.
<button onClick={() => setShowGuide(false)} style={{ background: "#d4af37", border: "none", padding: "8px 12px", borderRadius: "4px", width: "100%", fontWeight: "bold", cursor: "pointer", marginTop: "10px" }}>Close Guide


)}
{/* شريط التنقل السفلي الثابت بخمس خانات متناسقة */}
<div style={{ position: "fixed", bottom: 0, maxWidth: "420px", width: "100%", height: "72px", background: "#161b16", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "2px solid #d4af37", zIndex: 1000, boxSizing: "border-box" }}>
<button onClick={() => setTab("mining")} style={{ background: "none", border: "none", color: tab === "mining" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>⛏️Mining
<button onClick={() => setTab("friends")} style={{ background: "none", border: "none", color: tab === "friends" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>👥Friends
<button onClick={() => setTab("staking")} style={{ background: "none", border: "none", color: tab === "staking" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>📈Staking
<button onClick={() => setTab("wallet")} style={{ background: "none", border: "none", color: tab === "wallet" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>💼Wallet
<button onClick={() => setTab("tasks")} style={{ background: "none", border: "none", color: tab === "tasks" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "11px", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>📋Tasks
);
}
