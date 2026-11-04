"use client";
import { useState, useEffect } from "react";
export const dynamic = "force-dynamic";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [mining, setMining] = useState(false);
  const [refCode, setRefCode] = useState("ANKH-000000");
  const [lastMine, setLastMine] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [connected, setConnected] = useState(false);
  const [showLevels, setShowLevels] = useState(false);

  const getRequiredForLevel = (targetLevel: number) => {
    if (targetLevel <= 1) return 0;
    return 70 * targetLevel * targetLevel - 40 * targetLevel - 40;
  };
  const getMiningRate = (lvl: number) => 0.25 + lvl * 0.05;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const code = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
    setRefCode(code);
    try {
      const b = window.localStorage.getItem("ankh_bal");
      const wb = window.localStorage.getItem("ankh_wallet");
      const l = window.localStorage.getItem("ankh_level");
      const last = window.localStorage.getItem("ankh_last");
      if(b) setBalance(Number(b));
      if(wb) setWalletBalance(Number(wb));
      if(l) setLevel(Number(l));
      if(last) setLastMine(Number(last));
    } catch {}
  }, []);

  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_bal", String(balance)); }, [balance]);
  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_wallet", String(walletBalance)); }, [walletBalance]);
  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_level", String(level)); }, [level]);

  useEffect(() => {
    const int = setInterval(() => {
      if(!lastMine) { setCountdown(""); return; }
      const diff = lastMine + 86400000 - Date.now();
      if(diff <= 0) setCountdown("");
      else {
        const h = Math.floor(diff/3600000);
        const m = Math.floor((diff%3600000)/60000);
        const s = Math.floor((diff%60000)/1000);
        setCountdown(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(int);
  }, [lastMine]);

  const canMine = lastMine === 0 || Date.now() - lastMine >= 86400000;

  const startMining = () => {
    if(mining) return;
    if(!canMine) return;
    setMining(true);
    const currentRate = getMiningRate(level);
    setTimeout(() => {
      setBalance(b => b + currentRate);
      const now = Date.now();
      setLastMine(now);
      if(typeof window!=="undefined") window.localStorage.setItem("ankh_last", String(now));
      setMining(false);
    }, 2000);
  };

  const handleClaim = () => {
    if(balance <= 0) return;
    const newWallet = walletBalance + balance;
    setWalletBalance(newWallet);
    setBalance(0);
    let newLvl = level;
    while(newLvl < 500 && newWallet >= getRequiredForLevel(newLvl+1)) newLvl++;
    if(newLvl !== level) setLevel(newLvl);
  };

  const needForNext = Math.max(0, getRequiredForLevel(level+1) - walletBalance);
  const currentRate = getMiningRate(level);

  return (
    <div style={{minHeight:"100vh", background:"#050505", color:"#fff", paddingBottom:90, fontFamily:"sans-serif"}}>
      <div style={{display:"flex", gap:8, padding:16}}>
        {["en","ar","ru"].map(l=>(
          <button key={l} onClick={()=>setLang(l)} style={{padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:900, border:"1px solid #222", background: lang===l ? "#FACC15" : "#1A1A1A", color: lang===l ? "#000" : "#888"}}>{l.toUpperCase()}</button>
        ))}
      </div>

      <div style={{padding:20, display:"flex", flexDirection:"column", alignItems:"center"}}>
        {tab==="mining" && (
          <>
            <div style={{width:190, height:190, borderRadius:"50%", background:"linear-gradient(180deg, #FACC15, #854D0E)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:80, boxShadow:"0 0 70px rgba(250,204,21,0.35)"}}>☥</div>
            <div style={{marginTop:20, color:"#FACC15", letterSpacing:5, fontSize:11, fontWeight:800}}>ANKH COIN</div>
            <div style={{fontSize:42, fontWeight:900, marginTop:6}}>{balance.toFixed(2)} ANKH</div>
            <div style={{fontSize:11, color:"#666"}}>رصيد البوت - قابل للاستلام</div>

            <div style={{marginTop:12, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:20, padding:"8px 14px", display:"flex", gap:8, fontSize:12, alignItems:"center"}}>
              <span style={{color:"#888"}}>سرعة التعدين:</span>
              <span style={{color:"#FACC15", fontWeight:900, fontSize:14}}>{currentRate.toFixed(2)}/h</span>
              <span style={{background:"#222", padding:"2px 8px", borderRadius:10, fontSize:10, color:"#aaa"}}>Level {level}</span>
            </div>

            <div style={{display:"flex", gap:10, width:"100%", maxWidth:360, marginTop:18}}>
              <button onClick={startMining} style={{flex:1, background: !canMine ? "#222" : mining ? "#333" : "#FACC15", color: !canMine ? "#666" : mining ? "#888" : "#000", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"none", cursor: canMine ? "pointer" : "not-allowed"}}>
                {!canMine ? countdown : mining ? "Mining..." : `START ${currentRate.toFixed(2)}/h`}
              </button>
              <button onClick={handleClaim} disabled={balance===0} style={{flex:1, background: balance>0 ? "#fff" : "#111", color: balance>0 ? "#000" : "#444", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"1px solid #222"}}>
                CLAIM
              </button>
            </div>

            <div style={{marginTop:18, width:"100%", maxWidth:360, background:"#111", border:"1px solid rgba(250,204,21,0.25)", borderRadius:16, padding:14}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span style={{color:"#888"}}>المحفظة (تحسب لليفل):</span><span style={{color:"#FACC15", fontWeight:900}}>{walletBalance.toFixed(2)} ANKH</span></div>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:11, marginTop:8}}><span style={{color:"#666"}}>Level {level}/500</span><span style={{color:"#666"}}>Next: {getRequiredForLevel(level+1).toLocaleString()}</span></div>
              <div style={{marginTop:8, width:"100%", height:6, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}><div style={{width:`${Math.min(100, (walletBalance / (getRequiredForLevel(level+1)||160))*100)}%`, height:"100%", background:"#FACC15"}}></div></div>
              <div style={{marginTop:8, fontSize:12, color:"#FACC15", fontWeight:800, textAlign:"center"}}>باقي {needForNext.toFixed(2)} ANKH لليفل {level+1}</div>
            </div>

            <div style={{marginTop:10, width:"100%", maxWidth:360, background:"rgba(250,204,21,0.08)", border:"1px dashed rgba(250,204,21,0.3)", borderRadius:10, padding:10, fontSize:10, color:"#aaa", textAlign:"center", lineHeight:1.6}}>
              ⚠️ العملات في البوت لا تؤثر على المستوى<br/>فقط المحفظة بعد CLAIM هي اللي ترفع الليفل
            </div>

            <button onClick={()=>setShowLevels(!showLevels)} style={{marginTop:18, width:"100%", maxWidth:360, background:"#111", border:"1px solid #222", color:"#FACC15", fontWeight:800, padding:12, borderRadius:12, fontSize:13}}>
              {showLevels ? "اخفاء المستويات ▲" : "عرض كل المستويات 1-500 + السرعة ▼"}
            </button>

            {showLevels && (
              <div style={{marginTop:12, width:"100%", maxWidth:380, background:"#111", border:"1px solid #222", borderRadius:16, padding:12, maxHeight:400, overflowY:"auto"}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#666", padding:"4px 8px", borderBottom:"1px solid #222", marginBottom:6}}>
                  <span>LEVEL</span><span>المطلوب</span><span>السرعة</span>
                </div>
                {Array.from({length:500}, (_,i)=>{
                  const lvl = i+1;
                  const req = getRequiredForLevel(lvl);
                  const rate = getMiningRate(lvl-1).toFixed(2);
                  const isCurrent = lvl === level+1;
                  const passed = lvl <= level;
                  return (
                    <div key={lvl} style={{display:"flex", justifyContent:"space-between", fontSize:11, padding:"6px 8px", borderRadius:8, background: isCurrent ? "rgba(250,204,21,0.15)" : "transparent", border: isCurrent ? "1px solid #FACC15" : "1px solid transparent", color: passed ? "#888" : isCurrent ? "#fff" : "#555"}}>
                      <span style={{fontWeight:isCurrent?900:400}}>{isCurrent ? "→ " : passed ? "✓ " : ""}Level {lvl}</span>
                      <span style={{color: isCurrent ? "#FACC15" : "#aaa"}}>{req.toLocaleString()}</span>
                      <span style={{color: isCurrent ? "#FACC15" : "#666"}}>{rate}/h</span>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {tab==="store" && <div style={{width:"100%", maxWidth:380}}><h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>Store</h2><div style={{marginTop:12, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between"}}><span>1.5x Boost - 50 ANKH</span><button style={{background:"#FACC15", border:"none", padding:"6px 12px", borderRadius:8, fontWeight:800}}>Buy</button></div></div>}
        {tab==="list" && <div style={{width:"100%", maxWidth:410}}><h2 style={{fontWeight:900, color:"#FACC15"}}>📋 المهام</h2><div style={{marginTop:12, background:"#111", borderRadius:16, padding:16, color:"#666", fontSize:12}}>المهام شغالة زي ما هي</div></div>}
        {tab==="friends" && <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}><h2 style={{fontSize:20, fontWeight:900, color:"#FACC15"}}>Referral 5%</h2><button onClick={()=>navigator.clipboard.writeText(`https://t.me/ANKH_Mining_bot?start=${refCode}`)} style={{marginTop:12, width:"100%", background:"#FACC15", color:"#000", fontWeight:800, padding:12, borderRadius:12, border:"none"}}>Copy: {refCode}</button></div>}
        {tab==="wallet" && <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}><h2>Wallet</h2><div style={{marginTop:8, fontSize:12, color:"#888"}}>محفظة الليفل: {walletBalance.toFixed(2)}</div>{!connected ? <button onClick={()=>setConnected(true)} style={{marginTop:16, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>Connect</button> : <div style={{marginTop:12, color:"#22c55e"}}>✓ Connected</div>}</div>}
      </div>

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0A0A0A", borderTop:"1px solid rgba(250,204,21,0.2)", display:"flex", justifyContent:"space-around", padding:"10px 0 22px"}}>
        {[{id:"mining",t:"Mining",ic:"⛏️"},{id:"store",t:"Store",ic:"🛒"},{id:"list",t:"List",ic:"📋"},{id:"friends",t:"Friends",ic:"👥"},{id:"wallet",t:"Wallet",ic:"💼"}].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: tab===m.id ? "#FACC15" : "#666"}}><span style={{fontSize:18}}>{m.ic}</span><span style={{fontSize:10, fontWeight:800}}>{m.t}</span></button>
        ))}
      </div>
    </div>
  );
}
