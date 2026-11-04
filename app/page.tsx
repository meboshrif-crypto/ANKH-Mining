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
  const [miningRate] = useState(0.25);
  const [refCode, setRefCode] = useState("ANKH-000000");
  const [lastMine, setLastMine] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // --- جديد للمتجر ---
  const [selectedGram, setSelectedGram] = useState(1);
  const [gramTx, setGramTx] = useState("");
  const [gramPrice, setGramPrice] = useState<number | null>(null);
  const [ankhPriceGram] = useState(0.006666); // لما تحط سيولة ANKH/GRAM هيتغير السعر اوتوماتيك
  const FALLBACK_RATE = 150;

  const getRequiredForLevel = (targetLevel: number) => {
    if (targetLevel <= 1) return 0;
    return 70 * targetLevel * targetLevel - 40 * targetLevel - 40;
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://api.dexscreener.com/latest/dex/search/?q=GRAM");
        const data = await res.json();
        const pair = data?.pairs?.find((p:any)=> p.chainId==="ton" && p.baseToken?.symbol==="GRAM") || data?.pairs?.[0];
        if(pair?.priceUsd) setGramPrice(Number(pair.priceUsd));
      } catch {}
    };
    fetchPrices();
    const i = setInterval(fetchPrices, 60000);
    return () => clearInterval(i);
  }, []);

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
  const calculatedAnkh = selectedGram / ankhPriceGram;
  const displayRate = gramPrice ? (1/ankhPriceGram).toFixed(0) : FALLBACK_RATE.toString();

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
            <div style={{display:"flex", gap:10, width:"100%", maxWidth:360, marginTop:20}}>
              <button onClick={startMining} disabled={!canMine || mining} style={{flex:1, background: !canMine ? "#222" : mining ? "#333" : "#FACC15", color: !canMine ? "#666" : mining ? "#888" : "#000", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"none"}}>
                {!canMine ? `Next ${countdown}` : mining ? `Mining...` : `ابدأ التعدين`}
              </button>
              <button onClick={handleClaim} disabled={balance===0} style={{flex:1, background: balance>0 ? "#fff" : "#111", color: balance>0 ? "#000" : "#444", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"1px solid #222"}}>استلام CLAIM</button>
            </div>
            <div style={{marginTop:20, width:"100%", maxWidth:360, background:"#111", border:"1px solid rgba(250,204,21,0.25)", borderRadius:16, padding:14}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span style={{color:"#888"}}>عملات المحفظة (تحسب لليفل):</span><span style={{color:"#FACC15", fontWeight:900}}>{walletBalance.toFixed(2)} ANKH</span></div>
              <div style={{display:"flex", gap:12, marginTop:8, fontSize:12, color:"#666"}}><span>Level {level}/500</span><span style={{color:"#555"}}>Next: {getRequiredForLevel(level+1).toLocaleString()}</span></div>
              <div style={{marginTop:8, width:"100%", height:6, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}><div style={{width:`${Math.min(100, (walletBalance / (getRequiredForLevel(level+1)||160))*100)}%`, height:"100%", background:"#FACC15"}}></div></div>
              <div style={{marginTop:8, fontSize:12, color:"#FACC15", fontWeight:800, textAlign:"center"}}>باقي {needForNext.toFixed(2)} ANKH لليفل {level+1}</div>
            </div>
            <div style={{marginTop:12, width:"100%", maxWidth:360, background:"rgba(250,204,21,0.08)", border:"1px dashed rgba(250,204,21,0.3)", borderRadius:10, padding:10, fontSize:10, color:"#aaa", textAlign:"center", lineHeight:1.6}}>⚠️ ملاحظة: العملات الموجودة في البوت لا تؤثر على المستوى<br/>فقط العملات الموجودة في المحفظة بعد الضغط على استلام هي التي يتم احتسابها لرفع المستوى</div>
          </>
        )}

        {tab==="store" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:14}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>🛒 المتجر - شراء بـ GRAM</h2>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.35)", borderRadius:20, padding:16}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{fontSize:13, fontWeight:800}}>اختر كمية GRAM (اقل شراء 1 جرام)</div>
                <div style={{fontSize:9, background: gramPrice ? "#22c55e" : "#333", color: gramPrice ? "#000" : "#888", padding:"3px 8px", borderRadius:20, fontWeight:800}}>{gramPrice ? `LIVE $${gramPrice.toFixed(4)}` : "FALLBACK"}</div>
              </div>
              <div style={{fontSize:11, color:"#666", marginTop:6}}>1 GRAM = {displayRate} ANKH • السعر يحسب من السيولة</div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, marginTop:14}}>
                {[1,3,5,10].map(g=>(
                  <button key={g} onClick={()=>setSelectedGram(g)} style={{padding:14, borderRadius:12, fontWeight:900, fontSize:14, border: selectedGram===g ? "2px solid #FACC15" : "1px solid #222", background: selectedGram===g ? "#FACC15" : "#1A1A1A", color: selectedGram===g ? "#000" : "#888"}}>{g} GRAM</button>
                ))}
              </div>
              <div style={{marginTop:14, background:"#000", border:"1px solid #222", borderRadius:12, padding:12, textAlign:"center"}}>
                <div style={{fontSize:11, color:"#888"}}>هتستلم</div>
                <div style={{fontSize:24, fontWeight:900, color:"#FACC15", marginTop:2}}>{Math.floor(calculatedAnkh).toLocaleString()} ANKH</div>
                <div style={{fontSize:10, color:"#555", marginTop:2}}>مقابل {selectedGram} GRAM</div>
              </div>
              <div style={{marginTop:14}}>
                <div style={{fontSize:11, color:"#aaa", marginBottom:6}}>عنوان الدفع (StonFi / TonKeeper)</div>
                <input value={gramTx} onChange={e=>setGramTx(e.target.value)} placeholder="UQ... TonKeeper / StonFi / Tx Hash" style={{width:"100%", background:"#0A0A0A", border:"1px solid #222", borderRadius:10, padding:12, color:"#fff", fontSize:12, outline:"none"}}/>
              </div>
              <div style={{display:"flex", gap:8, marginTop:12}}>
                <a href="https://app.ston.fi" target="_blank" style={{flex:1, background:"#1A1A1A", border:"1px solid #333", color:"#fff", textAlign:"center", padding:12, borderRadius:10, fontSize:11, fontWeight:700, textDecoration:"none"}}>💎 StonFi</a>
                <a href="https://tonkeeper.com" target="_blank" style={{flex:1, background:"#1A1A1A", border:"1px solid #333", color:"#fff", textAlign:"center", padding:12, borderRadius:10, fontSize:11, fontWeight:700, textDecoration:"none"}}>👛 TonKeeper</a>
              </div>
              <button onClick={()=>{ if(!gramTx) return alert("ادخل بيانات الدفع الاول"); alert(`طلب شراء ${selectedGram} GRAM = ${Math.floor(calculatedAnkh).toLocaleString()} ANKH`); }} style={{marginTop:12, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>تأكيد شراء {selectedGram} GRAM</button>
              <div style={{marginTop:10, fontSize:9, color:"#666", textAlign:"center"}}>اقل شراء 1 GRAM • السعر يحسب اوتوماتيك من بول ANKH/GRAM</div>
            </div>
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
                const dayIndex = Number(typeof window!=="undefined" ? window.localStorage.getItem("ankh_daily_day") || "0" : "0");
                const reward = rewards[dayIndex] || 9;
                setBalance(b=>b+reward);
                if(typeof window!=="undefined"){
                  window.localStorage.setItem("ankh_daily_day", String((dayIndex+1)%30));
                  window.localStorage.setItem("ankh_daily_last", String(Date.now()));
                }
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
            <div style={{marginTop:8, fontSize:12, color:"#888"}}>محفظة الليفل: {walletBalance.toFixed(2)} ANKH</div>
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
