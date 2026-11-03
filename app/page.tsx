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
  const [showLevelsGuide, setShowLevelsGuide] = useState(false);

  const currentLevel = Math.min(500, Math.floor(walletBalance / 10)); 
  const miningRatePerHour = 0.25 + currentLevel * 0.05; 

  useEffect(() => {
    const interval = setInterval(() => {
      setMinedAmount((prev) => prev + (miningRatePerHour / 36000));
    }, 100);
    return () => clearInterval(interval);
  }, [miningRatePerHour]);

  useEffect(() => {
    setRefCode("123456");
  }, []);

  const handleClaimMining = () => {
    if (minedAmount <= 0) return;
    setTotalBalance(prev => prev + minedAmount);
    setMinedAmount(0);
    alert("Success Claim!");
  };

  const inviteLink = `https://t.me{refCode}`;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0d0a", color: "#ffffff", display: "flex", justifyContent: "center", fontFamily: "sans-serif", direction: "rtl" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#111411", minHeight: "100vh", paddingBottom: "90px", position: "relative", boxSizing: "border-box" }}>
        
        <div style={{ padding: "16px", background: "#161b16", borderBottom: "2px solid #d4af37", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <b style={{ color: "#d4af37", fontSize: "16px" }}>ANKH MINING</b>
            <p style={{ margin: 0, fontSize: "11px", color: "#8a9a8a" }}>LVL: {currentLevel}</p>
          </div>
          <div style={{ background: "#222a22", padding: "6px 12px", borderRadius: "12px", border: "1px solid #d4af37" }}>
            <span style={{ color: "#d4af37", fontWeight: "bold" }}>{totalBalance.toFixed(4)} ☥</span>
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          {tab === "mining" && (
            <div style={{ marginTop: "10px", position: "relative" }}>
              
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                <button 
                  onClick={() => setShowLevelsGuide(true)} 
                  style={{ background: "#161b16", color: "#d4af37", border: "1px solid #d4af37", width: "32px", height: "32px", borderRadius: "50%", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
                >
                  ?
                </button>
              </div>

              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <p style={{ color: "#8a9a8a", fontSize: "14px", margin: "0" }}>Mined Amount</p>
                <h1 style={{ fontSize: "44px", color: "#d4af37", margin: "10px 0", letterSpacing: "1px" }}>{minedAmount.toFixed(5)}</h1>
                <p style={{ color: "#8a9a8a", fontSize: "13px", margin: "0" }}>Speed: <span style={{ color: "#d4af37", fontWeight: "bold" }}>{miningRatePerHour.toFixed(2)} / H</span></p>
              </div>

              <button 
                onClick={handleClaimMining}
                style={{ width: "100%", background: "#d4af37", color: "#000000", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "bold", fontSize: "16px", cursor: "pointer", margin: "20px 0" }}
              >
                Claim
              </button>

              <div style={{ background: "#221111", border: "1px solid #ff4444", borderRadius: "12px", padding: "12px", margin: "15px 0" }}>
                <p style={{ color: "#ff4444", fontWeight: "bold", margin: "0 0 6px 0", fontSize: "13px" }}>Warning:</p>
                <p style={{ color: "#ff8888", fontSize: "12px", margin: 0, lineHeight: "1.5" }}>
                  Please claim every 24 hours. If not, the amount will decrease.
                </p>
              </div>

              <div style={{ marginTop: "30px", padding: "12px", background: "#161b16", borderRadius: "8px", border: "1px solid #333", fontSize: "12px", textAlign: "center" }}>
                <button onClick={() => setWalletBalance(b => b + 20)} style={{ background: "#d4af37", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", color: "#000" }}>Test Upgrade +20</button>
              </div>

              {showLevelsGuide && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000, padding: "20px" }}>
                  <div style={{ background: "#161b16", border: "2px solid #d4af37", borderRadius: "16px", padding: "20px", maxWidth: "360px", width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
                    <h3 style={{ color: "#d4af37", marginTop: 0, textAlign: "center" }}>Levels Guide (0 - 500)</h3>
                    
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontSize: "13px", textAlign: "center" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #d4af37", color: "#d4af37" }}>
                          <th style={{ padding: "8px" }}>LVL</th>
                          <th style={{ padding: "8px" }}>On-chain</th>
                          <th style={{ padding: "8px" }}>Speed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #222" }}>
                          <td style={{ padding: "8px" }}>0</td>
                          <td style={{ padding: "8px", color: "#22c55e" }}>Free</td>
                          <td style={{ padding: "8px" }}>0.25</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #222" }}>
                          <td style={{ padding: "8px" }}>1</td>
                          <td style={{ padding: "8px" }}>10 TON</td>
                          <td style={{ padding: "8px" }}>0.30</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #222" }}>
                          <td style={{ padding: "8px" }}>2</td>
                          <td style={{ padding: "8px" }}>20 TON</td>
                          <td style={{ padding: "8px" }}>0.35</td>
                        </tr>
                      </tbody>
                    </table>

                    <button 
                      onClick={() => setShowLevelsGuide(false)} 
                      style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "10px", borderRadius: "8px", marginTop: "20px", fontWeight: "bold", cursor: "pointer" }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {tab === "friends" && (
            <div>
              <h3>Friends</h3>
              <p style={{ fontSize: "12px" }}>{inviteLink}</p>
              <button onClick={() => { navigator.clipboard.writeText(inviteLink); alert("Copied"); }} style={{ background: "#d4af37", border: "none", padding: "6px 12px" }}>Copy</button>
            </div>
          )}

          {tab === "staking" && (
            <div>
              <h3>Staking</h3>
              <input type="number" placeholder="Amount" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} style={{ background: "#000", color: "#fff", padding: "8px", border: "1px solid #333" }} />
              <button onClick={() => { setTotalBalance(b => b - Number(stakeAmount)); alert("Done"); }} style={{ background: "#d4af37", border: "none", padding: "8px", marginLeft: "10px" }}>Stake</button>
            </div>
          )}

          {tab === "wallet" && (
            <div>
              <h3>Wallet</h3>
              {!connected ? (
                <button onClick={() => setConnected(true)} style={{ background: "#0098ea", color: "#fff", border: "none", padding: "10px", width: "100%" }}>Connect</button>
              ) : (
                <p style={{ color: "#00ffcc" }}>Connected</p>
              )}
              {connected && !verified && (
                <button onClick={() => setVerified(true)} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "10px", width: "100%", marginTop: "10px" }}>Verify (0.05 GRAM)</button>
              )}
              <div style={{ marginTop: "20px", padding: "2px", background: (withdrawAmount !== "" && Number(withdrawAmount) < 10000) ? "#ff4444" : "transparent" }}>
                <input type="number" placeholder="Amount" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} style={{ width: "100%", padding: "10px", background: "#000", color: "#fff", border: "1px solid #333", boxSizing: "border-box" }} />
              </div>
            </div>
          )}

          {tab === "tasks" && (
            <div>
              <h3>Tasks</h3>
              <p>Daily check-in tasks.</p>
            </div>
          )}
        </div>

        <div style={{ position: "fixed", bottom: 0, maxWidth: "420px", width: "100%", height: "70px", background: "#161b16", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "2px solid #d4af37", zIndex: 1000 }}>
          <button onClick={() => setTab("mining")} style={{ background: "none", border: "none", color: tab === "mining" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>Mining</button>
<button onClick={() => setTab("friends")} style={{ background: "none", border: "none", color: tab === "friends" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>Friends
<button onClick={() => setTab("staking")} style={{ background: "none", border: "none", color: tab === "staking" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>Staking
<button onClick={() => setTab("wallet")} style={{ background: "none", border: "none", color: tab === "wallet" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>Wallet
<button onClick={() => setTab("tasks")} style={{ background: "none", border: "none", color: tab === "tasks" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>Tasks
);
}
