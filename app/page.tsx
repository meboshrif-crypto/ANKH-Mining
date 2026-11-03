"use client";
import { useState } from "react";

export default function Page() {
  const [balance, setBalance] = useState(1250);
  const [mining, setMining] = useState(false);
  
  const mine = () => {
    if(mining) return;
    setMining(true);
    setTimeout(()=>{
      setBalance(b=>b+10);
      setMining(false);
    }, 1500);
  };

  return (
    <div style={{minHeight:"100vh", background:"radial-gradient(circle at top, #1a1a0a, #000)", color:"white", fontFamily:"sans-serif", display:"flex", justifyContent:"center", padding:"20px"}}>
      <div style={{width:"100%", maxWidth:"380px", textAlign:"center"}}>
        
        <h1 style={{fontSize:"32px", fontWeight:"900", color:"#facc15", marginTop:"20px", letterSpacing:"2px"}}>☥ ANKH</h1>
        <p style={{color:"#888", fontSize:"12px", marginBottom:"25px"}}>THE ETERNAL MINING</p>

        <div style={{background:"linear-gradient(145deg, #1e1e1e, #111)", border:"1px solid #333", borderRadius:"28px", padding:"28px", boxShadow:"0 0 40px rgba(250,204,21,0.15)"}}>
          <p style={{color:"#aaa", fontSize:"13px"}}>Your Balance</p>
          <h2 style={{fontSize:"48px", fontWeight:"800", margin:"8px 0"}}>{balance.toLocaleString()}</h2>
          <p style={{color:"#facc15", fontWeight:"bold"}}>ANKH</p>
          
          <div style={{display:"flex", justifyContent:"center", gap:"10px", margin:"15px 0", fontSize:"12px", color:"#777"}}>
            <span style={{background:"#222", padding:"6px 12px", borderRadius:"20px"}}>Level 1 👑</span>
            <span style={{background:"#222", padding:"6px 12px", borderRadius:"20px"}}>Fluts 0 🔷</span>
          </div>

          <button onClick={mine} style={{width:"100%", background: mining ? "#444" : "#facc15", color: mining ? "#fff" : "#000", border:"none", padding:"18px", borderRadius:"16px", fontSize:"18px", fontWeight:"900", marginTop:"10px", cursor:"pointer", transition:"0.2s"}}>
            {mining ? "⛏️ Mining..." : "⚡ START MINING"}
          </button>
          <p style={{fontSize:"11px", color:"#555", marginTop:"12px"}}>+10 ANKH every tap • 2s cooldown</p>
        </div>

        <div style={{background:"#151515", border:"1px solid #222", borderRadius:"20px", padding:"18px", marginTop:"18px", textAlign:"left"}}>
          <h3 style={{fontWeight:"bold", marginBottom:"12px"}}>🚀 Tasks</h3>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid #222"}}>
            <span>📢 Join Telegram</span>
            <span style={{background:"#222", padding:"6px 12px", borderRadius:"20px", fontSize:"12px", color:"#facc15"}}>+100</span>
          </div>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0"}}>
            <span>🐦 Follow on X</span>
            <span style={{background:"#222", padding:"6px 12px", borderRadius:"20px", fontSize:"12px", color:"#facc15"}}>+150</span>
          </div>
        </div>

        <button style={{width:"100%", marginTop:"18px", background:"#222", color:"white", border:"1px solid #333", padding:"14px", borderRadius:"14px", fontWeight:"bold"}}>🔗 Connect Wallet</button>

      </div>
    </div>
  );
}
