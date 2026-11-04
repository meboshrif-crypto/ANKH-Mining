"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [mining, setMining] = useState(false);
  const [miningRate] = useState(0.25);
  const [refCode, setRefCode] = useState("ANKH-000000");
  const [lastMine, setLastMine] = useState<number>(0);
  const [countdown, setCountdown] = useState("");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // معادلة الليفل بتاعتك 160, 470, 920...
  const getRequiredForLevel = (targetLevel: number) => {
    if (targetLevel <= 1) return 0;
    return 70 * targetLevel * targetLevel - 40 * targetLevel - 40;
  };

  useEffect(() => {
    const code = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
    setRefCode(code);
    const savedBal = localStorage.getItem("ankh_bal");
    const savedLevel = localStorage.getItem("ankh_level");
    const savedLast = localStorage.getItem("ankh_last");
    if(savedBal) { setBalance(Number(savedBal)); setWalletBalance(Number(savedBal)); }
    if(savedLevel) setLevel(Number(savedLevel));
    if(savedLast) setLastMine(Number(savedLast));
  }, []);

  useEffect(() => { localStorage.setItem("ankh_bal", String(balance)); }, [balance]);
  useEffect(() => { localStorage.setItem("ankh_level", String(level)); }, [level]);

  // عداد 24 ساعة
  useEffect(() => {
    const interval = setInterval(() => {
      if(lastMine === 0) { setCountdown(""); return; }
      const diff = lastMine + 24*60*60*1000 - Date.now();
      if(diff <= 0) setCountdown("");
      else {
        const h = Math.floor(diff/3600000);
        const m = Math.floor((diff%3600000)/60000);
        const s = Math.floor((diff%60000)/1000);
        setCountdown(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastMine]);

  const canMine = Date.now() - lastMine >= 24*60*60*1000 || lastMine === 0;

  const startMining = () => {
    if(!canMine || mining) return;
    setMining(true);
    setTimeout(() => {
      const newBal = balance + miningRate;
      setBalance(newBal);
      setWalletBalance(newBal);
      const now = Date.now();
      setLastMine(now);
      localStorage.setItem("ankh_last", String(now));
      setMining(false);
      let newLvl = level;
      while(newLvl < 500 && newBal >= getRequiredForLevel(newLvl+1)) newLvl++;
      if(newLvl !== level) setLevel(newLvl);
    }, 2000);
  };

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
            <div style={{fontSize:52, fontWeight:900, marginTop:6}}>{balance.toFixed(2)}</div>
            <div style={{display:"flex", gap:12, marginTop:8, fontSize:12, color:"#666"}}>
              <span>Level {level}/500</span>
              <span style={{color:"#FACC15"}}>{miningRate}/h</span>
            </div>
            <div style={{marginTop:6, fontSize:11, color:"#555"}}>Next Level: {getRequiredForLevel(level+1).toLocaleString()} ANKH</div>
            <div style={{marginTop:10, width:"100%", maxWidth:320, height:6, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}>
              <div style={{width:`${Math.min(100, (balance / (getRequiredForLevel(level+1)||160))*100)}%`, height:"100%", background:"#FACC15"}}></div>
            </div>
            <div style={{marginTop:6, fontSize:10, color:"#444"}}>{balance.toFixed(2)} / {getRequiredForLevel(level+1).toLocaleString()} ANKH</div>

            <button onClick={startMining} disabled={!canMine || mining} style={{marginTop:28, width:"100%", maxWidth:360, background: !canMine ? "#222" : mining ? "#333" : "#FACC15", color: !canMine ? "#666" : mining ? "#888" : "#000", fontWeight:900, padding:18, borderRadius:16, fontSize:16, border:"none"}}>
              {!canMine ? `Next in ${countdown}` : mining ? `Mining... ${miningRate}/h` : `START MINING ${miningRate}/h (24h)`}
            </button>
            <div style={{marginTop:10, fontSize:10, color:"#333", textAlign:"center"}}>Level 1-2: 160 • 2-3: 470 • 3-4: 920 • كل ليفل +140</div>
          </>
        )}

        {tab==="store" && (
          <div style={{width:"100%", maxWidth:380}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>Store</h2>
            <div style={{marginTop:12, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between"}}><span>1.5x Boost - 50 ANKH</span><button onClick={()=>{if(balance>=50){setBalance(b=>b-50)}} } style={{background:"#FACC15", border:"none", padding:"6px 12px", borderRadius:8, fontWeight:800}}>Buy</button></div>
            <div style={{marginTop:10, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between"}}><span>2x Boost - 120 ANKH</span><button style={{background:"#FACC15", border:"none", padding:"6px 12px", borderRadius:8, fontWeight:800}}>Buy</button></div>
          </div>
        )}

        {tab==="list" && (
          <div style={{width:"100%", maxWidth:380}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>Staking List</h2>
            <div style={{marginTop:12, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between"}}><span>30 Days</span><span style={{color:"#FACC15"}}>15% APR</span></div>
            <div style={{marginTop:10, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between"}}><span>90 Days</span><span style={{color:"#FACC15"}}>25% APR</span></div>
            <div style={{marginTop:10, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between"}}><span>120 Days</span><span style={{color:"#FACC15"}}>35% APR</span></div>
          </div>
        )}

        {tab==="friends" && (
          <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}>
            <h2 style={{fontSize:20, fontWeight:900, color:"#FACC15"}}>Referral</h2>
            <p style={{fontSize:12, color:"#888", marginTop:6}}>Invite and earn 5% forever. Friends keep 100%.</p>
            <button onClick={()=>navigator.clipboard.writeText(`https://t.me/ANKH_Mining_bot?start=${refCode}`)} style={{marginTop:14, width:"100%", background:"#FACC15", color:"#000", fontWeight:800, padding:12, borderRadius:12, border:"none"}}>Copy: {refCode}</button>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:12}}>
              <div style={{background:"#000", borderRadius:12, padding:12, border:"1px solid #222"}}><div style={{fontSize:11, color:"#666"}}>Invited</div><div style={{fontWeight:900, fontSize:20}}>0</div></div>
              <div style={{background:"#000", borderRadius:12, padding:12, border:"1px solid #222"}}><div style={{fontSize:11, color:"#666"}}>Earnings</div><div style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>+0.00</div></div>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}>
            <h2 style={{fontWeight:900}}>Wallet</h2>
            {!connected ? <button onClick={()=>setConnected(true)} style={{marginTop:16, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>Connect Wallet</button> : <>
              <div style={{marginTop:12, fontFamily:"monospace", fontSize:12, color:"#FACC15"}}>UQ...{refCode.slice(-4)} ✓</div>
              {!verified ? <button onClick={()=>setVerified(true)} style={{marginTop:12, width:"100%", border:"1px solid #FACC15", color:"#FACC15", background:"transparent", padding:12, borderRadius:12}}>Verify 0.05 GRAM</button> : <div style={{marginTop:10, color:"#22c55e", fontSize:12}}>✓ Verified</div>}
              <input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} placeholder="0.00" style={{marginTop:16, width:"100%", background:"#000", border:"1px solid #222", borderRadius:12, padding:12, color:"#fff", boxSizing:"border-box"}} />
              <div style={{display:"flex", gap:6, marginTop:8}}>{["25%","50%","75%","100%"].map(p=><button key={p} onClick={()=>setWithdrawAmount(String((walletBalance*parseInt(p)/100).toFixed(2)))} style={{flex:1, background:"#222", border:"none", color:"#aaa", padding:6, borderRadius:6, fontSize:11}}>{p}</button>)}</div>
              <div style={{fontSize:10, color:"#666", marginTop:8}}>Min 10,000 • Fee 5%</div>
              <button style={{marginTop:8, width:"100%", background:"rgba(250,204,21,0.15)", color:"#FACC15", border:"1px solid rgba(250,204,21,0.3)", padding:14, borderRadius:12, fontWeight:900}}>Withdraw</button>
            </>}
          </div>
        )}
      </div>

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0A0A0A", borderTop:"1px solid rgba(250,204,21,0.2)", display:"flex", justifyContent:"space-around", padding:"10px 0 22px"}}>
        {[{id:"mining",t:"Mining",ic:"⛏️"},{id:"store",t:"Store",ic:"🛒"},{id:"list",t:"List",ic:"📋"},{id:"friends",t:"Friends",ic:"👥"},{id:"wallet",t:"Wallet",ic:"💼"}].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: tab===m.id ? "#FACC15" : "#666"}}>
            <span style={{fontSize:18}}>{m.ic}</span><span style={{fontSize:10, fontWeight:800}}>{m.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
