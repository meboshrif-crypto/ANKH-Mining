"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining"); 
  const [balance, setBalance] = useState(0); 
  const [walletBalance, setWalletBalance] = useState(0); 
  const [refCode, setRefCode] = useState("000000");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

  const currentLevel = Math.min(500, Math.floor(walletBalance / 10) + 1);
  const miningRatePerHour = 0.25 + (currentLevel - 1) * 0.05; 

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => prev + (miningRatePerHour / 36000));
    }, 100);
    return () => clearInterval(interval);
  }, [miningRatePerHour]);

  useEffect(() => {
    setRefCode("123456");
  }, []);

  const inviteLink = `https://t.me{refCode}`;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0d0a", color: "#ffffff", display: "flex", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#111411", minHeight: "100vh", paddingBottom: "90px", position: "relative", boxSizing: "border-box" }}>
        
        {/* شريط علوي مبسط */}
        <div style={{ padding: "16px", background: "#161b16", borderBottom: "2px solid #d4af37", display: "flex", justifyContent: "space-between" }}>
          <div>
            <b style={{ color: "#d4af37" }}>ANKH MINING</b>
            <p style={{ margin: 0, fontSize: "11px" }}>LVL: {currentLevel}</p>
          </div>
          <div><span>{balance.toFixed(4)} ☥</span></div>
        </div>

        <div style={{ padding: "16px" }}>
          {/* 1. التعدين */}
          {tab === "mining" && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h1>{balance.toFixed(5)}</h1>
              <p style={{ color: "#d4af37" }}>+{miningRatePerHour.toFixed(2)} / H</p>
              <button onClick={() => setWalletBalance(b => b + 50)} style={{ marginTop: "20px", background: "#d4af37", border: "none", padding: "8px 16px", cursor: "pointer" }}>شحن المحفظة (تجربة لزيادة اللفل)</button>
            </div>
          )}

          {/* 2. الأصدقاء */}
          {tab === "friends" && (
            <div>
              <h3>الاحالة والأصدقاء</h3>
              <p style={{ fontSize: "12px" }}>{inviteLink}</p>
              <button onClick={() => { navigator.clipboard.writeText(inviteLink); alert("تم النسخ"); }} style={{ background: "#d4af37", border: "none", padding: "6px 12px" }}>نسخ الرابط</button>
            </div>
          )}

          {/* 3. الستيكنج */}
          {tab === "staking" && (
            <div>
              <h3>الستيكنج والاستثمار</h3>
              <input type="number" placeholder="المبلغ" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} style={{ background: "#000", color: "#fff", padding: "8px", border: "1px solid #333" }} />
              <button onClick={() => { setBalance(b => b - Number(stakeAmount)); alert("تم بنجاح"); }} style={{ background: "#d4af37", border: "none", padding: "8px", marginLeft: "10px" }}>بدء الاستثمار</button>
            </div>
          )}

          {/* 4. المحفظة */}
          {tab === "wallet" && (
            <div>
              <h3>المحفظة والسحب</h3>
              {!connected ? (
                <button onClick={() => setConnected(true)} style={{ background: "#0098ea", color: "#fff", border: "none", padding: "10px", width: "100%" }}>ربط المحفظة</button>
              ) : (
                <p style={{ color: "#00ffcc" }}>تم الربط بنجاح</p>
              )}
              {connected && !verified && (
                <button onClick={() => setVerified(true)} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "10px", width: "100%", marginTop: "10px" }}>توثيق (0.05 GRAM)</button>
              )}
              <div style={{ marginTop: "20px", padding: "2px", background: (withdrawAmount !== "" && Number(withdrawAmount) < 10000) ? "#ff4444" : "transparent" }}>
                <input type="number" placeholder="مبلغ السحب" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} style={{ width: "100%", padding: "10px", background: "#000", color: "#fff", border: "1px solid #333", boxSizing: "border-box" }} />
              </div>
            </div>
          )}

          {/* 5. المهمات */}
          {tab === "tasks" && (
            <div>
              <h3>المهمات اليومية</h3>
              <p>سجل دخولك اليومي لتحصل على العملات المكافئة مباشرة.</p>
            </div>
          )}
        </div>

        {/* شريط التنقل السفلي */}
        <div style={{ position: "fixed", bottom: 0, maxWidth: "420px", width: "100%", height: "70px", background: "#161b16", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "2px solid #d4af37", zIndex: 1000 }}>
          <button onClick={() => setTab("mining")} style={{ background: "none", border: "none", color: tab === "mining" ? "#d4af37" : "#8a9a8a", cursor: "pointer" }}>التعدين</button>
          <button onClick={() => setTab("friends")} style={{ background: "none", border: "none", color: tab === "friends" ? "#d4af37" : "#8a9a8a", cursor: "pointer" }}>الأصدقاء</button>
          <button onClick={() => setTab("staking")} style={{ background: "none", border: "none", color: tab === "staking" ? "#d4af37" : "#8a9a8a", cursor: "pointer" }}>الستيكنج</button>
          <button onClick={() => setTab("wallet")} style={{ background: "none", border: "none", color: tab === "wallet" ? "#d4af37" : "#8a9a8a", cursor: "pointer" }}>المحفظة</button>
          <button onClick={() => setTab("tasks")} style={{ background: "none", border: "none", color: tab === "tasks" ? "#d4af37" : "#8a9a8a", cursor: "pointer" }}>المهمات</button>
        </div>

      </div>
    </div>
  );
}
