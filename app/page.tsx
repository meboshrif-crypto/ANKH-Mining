"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [mining, setMining] = useState(false);
  const [miningRate] = useState(0.25);
  const [refCode, setRefCode] = useState("ANKH-000000");
  const [lastMine, setLastMine] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const getRequiredForLevel = (targetLevel: number) => {
    if (targetLevel <= 1) return 0;
    return 70 * targetLevel * targetLevel - 40 * targetLevel - 40;
  };

  useEffect(() => {
    const code = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
    setRefCode(code);
    const b = localStorage.getItem("ankh_bal");
    const l = localStorage.getItem("ankh_level");
    const last = localStorage.getItem("ankh_last");
    if(b) setBalance(Number(b));
    if(l) setLevel(Number(l));
    if(last) setLastMine(Number(last));
  }, []);

  useEffect(() => { localStorage.setItem("ankh_bal", String(balance)); }, [balance]);
  useEffect(() => { localStorage.setItem("ankh_level", String(level)); }, [level]);

  useEffect(() => {
    const int = setInterval(() => {
      if(!lastMine) return;
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

  const canMine = Date.now() - lastMine >= 86400000 || lastMine === 0;

  const startMining = () => {
    if(!canMine || mining) return;
    setMining(true);
    setTimeout(() => {
      const newBal = balance + miningRate;
      setBalance(newBal);
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
            <div style={{marginTop:6, fontSize:11, color:"#555"}}>Next: {getRequiredForLevel(level+1).toLocaleString()} ANKH</div>
            <div style={{marginTop:10, width:"100%", maxWidth:320, height:6, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}>
              <div style={{width:`${Math.min(100, (balance / (getRequiredForLevel(level+1)||160))*100)}%`, height:"100%", background:"#FACC15"}}></div>
            </div>
            <button onClick={startMining} disabled={!canMine || mining} style={{marginTop:28, width:"100%", maxWidth:360, background: !canMine ? "#222" : mining ? "#333" : "#FACC15", color: !canMine ? "#666" : mining ? "#888" : "#000", fontWeight:900, padding:18, borderRadius:16, fontSize:16, border:"none"}}>
              {!canMine ? `Next in ${countdown}` : mining ? `Mining...` : `START MINING ${miningRate}/h (24h)`}
            </button>
          </>
        )}

        {tab==="store" && (
          <div style={{width:"100%", maxWidth:380}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>Store</h2>
            <div style={{marginTop:12, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between"}}><span>1.5x Boost - 50 ANKH</span><button style={{background:"#FACC15", border:"none", padding:"6px 12px", borderRadius:8, fontWeight:800}}>Buy</button></div>
          </div>
        )}

        {tab==="list" && (
          <div style={{width:"100%", maxWidth:410, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.3)", borderRadius:20, padding:16}}>
              <h2 style={{fontWeight:900, fontSize:16, color:"#FACC15"}}>📅 تسجيل دخول يومي - 30 يوم</h2>
              <p style={{fontSize:10, color:"#666", marginTop:4}}>لو فوت يوم ترجع من الاول!</p>
              <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:6, marginTop:12}}>
                {[9,14,23,31,42,55,68,77,89,102,115,130,145,162,180,199,219,240,262,285,309,334,360,387,415,444,474,505,537,600].map((reward, i)=>{
                  const day = i+1;
                  return (
                    <div key={day} style={{background:"#000", border:"1px solid #222", borderRadius:10, padding:"8px 0", textAlign:"center"}}>
                      <div style={{fontSize:9, color:"#666"}}>يوم {day}</div>
                      <div style={{fontSize:12, fontWeight:900, color:"#fff", marginTop:2}}>{reward}</div>
                    </div>
                  )
                })}
              </div>
              <button onClick={()=>{
                const rewards = [9,14,23,31,42,55,68,77,89,102,115,130,145,162,180,199,219,240,262,285,309,334,360,387,415,444,474,505,537,600];
                const dayIndex = Number(localStorage.getItem("ankh_daily_day") || "0");
                const reward = rewards[dayIndex] || 9;
                setBalance(b=>b+reward);
                localStorage.setItem("ankh_daily_day", String((dayIndex+1)%30));
                localStorage.setItem("ankh_daily_last", String(Date.now()));
                alert(`يوم ${dayIndex+1} - ربحت ${reward} ANKH`);
              }} style={{marginTop:12, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:12, borderRadius:12, border:"none"}}>تسجيل اليوم</button>
            </div>

            <h2 style={{fontWeight:900, fontSize:16, color:"#FACC15"}}>📋 المهام</h2>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div><div style={{fontSize:13, fontWeight:800}}>قناة الاخبار</div><div style={{fontSize:11, color:"#FACC15"}}>77 ANKH</div></div>
              <div style={{display:"flex", gap:6}}>
                <a href="https://t.me/ANKH_News" target="_blank" style={{background:"#1A1A1A", border:"1px solid #333", color:"#aaa", padding:"8px 10px", borderRadius:8, fontSize:11, textDecoration:"none"}}>اشتراك</a>
                <button onClick={()=>setBalance(b=>b+77)} style={{background:"#FACC15", color:"#000", border:"none", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>تحقق</button>
              </div>
            </div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div><div style={{fontSize:13, fontWeight:800}}>قناة السحب</div><div style={{fontSize:11, color:"#FACC15"}}>77 ANKH</div></div>
              <div style={{display:"flex", gap:6}}>
                <a href="https://t.me/ANKH_withdraws" target="_blank" style={{background:"#1A1A1A", border:"1px solid #333", color:"#aaa", padding:"8px 10px", borderRadius:8, fontSize:11, textDecoration:"none"}}>اشتراك</a>
                <button onClick={()=>setBalance(b=>b+77)} style={{background:"#FACC15", color:"#000", border:"none", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>تحقق</button>
              </div>
            </div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}><div><div style={{fontSize:13, fontWeight:800}}>ادع 3 اشخاص ليفل 2</div><div style={{fontSize:11, color:"#FACC15"}}>150 ANKH</div></div><button style={{background:"#222", color:"#888", border:"none", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>0/3</button></div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}><div><div style={{fontSize:13, fontWeight:800}}>ادع 15 شخص ليفل 2</div><div style={{fontSize:11, color:"#FACC15"}}>1250 ANKH</div></div><button style={{background:"#222", color:"#888", border:"none", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>0/15</button></div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}><div><div style={{fontSize:13, fontWeight:800}}>ادع 30 شخص ليفل 2</div><div style={{fontSize:11, color:"#FACC15"}}>2750 ANKH</div></div><button style={{background:"#222", color:"#888", border:"none", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>0/30</button></div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}><div><div style={{fontSize:13, fontWeight:800}}>ادع 50 شخص ليفل 2</div><div style={{fontSize:11, color:"#FACC15"}}>4650 ANKH</div></div><button style={{background:"#222", color:"#888", border:"none", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>0/50</button></div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}><div><div style={{fontSize:13, fontWeight:800}}>ادع 100 شخص ليفل 2</div><div style={{fontSize:11, color:"#FACC15"}}>7490 ANKH</div></div><button style={{background:"#222", color:"#888", border:"none", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>0/100</button></div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}><div><div style={{fontSize:13, fontWeight:800}}>ادع 250 شخص ليفل 2</div><div style={{fontSize:11, color:"#FACC15"}}>9850 ANKH</div></div><button style={{background:"#222", color:"#888", border:"none", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>0/250</button></div>
          </div>
        )}

        {tab==="friends" && (
          <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}>
            <h2 style={{fontSize:20, fontWeight:900, color:"#FACC15"}}>Referral 5%</h2>
            <button onClick={()=>navigator.clipboard.writeText(`https://t.me/ANKH_Mining_bot?start=${refCode}`)} style={{marginTop:12, width:"100%", background:"#FACC15", color:"#000", fontWeight:800, padding:12, borderRadius:12, border:"none"}}>Copy: {refCode}</button>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}>
            <h2 style={{fontWeight:900}}>Wallet</h2>
            {!connected ? <button onClick={()=>setConnected(true)} style={{marginTop:16, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>Connect</button> : <div style={{marginTop:12, color:"#22c55e"}}>✓ Connected {refCode.slice(-4)}</div>}
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
