"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [mining, setMining] = useState(false);
  const [miningRate, setMiningRate] = useState(0.25);
  const [refCode, setRefCode] = useState("000000");
  const [invited, setInvited] = useState(0);
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    const code = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
    setRefCode(code);
  }, []);

  const startMining = () => {
    if(mining) return;
    setMining(true);
    setTimeout(() => {
      setBalance(b => b + miningRate);
      setWalletBalance(w => w + miningRate);
      setMining(false);
      // كل 15 عملة ليفل
      if((walletBalance + miningRate) >= (level + 1) * 15) {
        setLevel(l => Math.min(l+1, 500));
      }
    }, 2000);
  }

  const LANG = {
    en: { coin:"ANKH COIN", level:"Level", bal:"Balance", start:`START MINING ${miningRate}/h`, mining:`Mining... ${miningRate}/h` },
    ar: { coin:"عملة عنخ", level:"المستوى", bal:"الرصيد", start:`ابدأ التعدين ${miningRate}/س`, mining:`جاري التعدين... ${miningRate}/س` },
    ru: { coin:"ANKH КОИН", level:"Уровень", bal:"Баланс", start:`НАЧАТЬ ${miningRate}/ч`, mining:`Майнинг... ${miningRate}/ч` }
  }[lang as "en"];

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
            <div style={{width:190, height:190, borderRadius:"50%", background:"linear-gradient(180deg, #FACC15 0%, #854D0E 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:80, boxShadow:"0 0 70px rgba(250,204,21,0.35)"}}>☥</div>
            <div style={{marginTop:24, color:"#FACC15", letterSpacing:5, fontSize:11, fontWeight:800}}>{LANG.coin}</div>
            <div style={{fontSize:52, fontWeight:900, marginTop:6}}>{balance.toFixed(2)}</div>
            <div style={{display:"flex", gap:16, marginTop:8, color:"#666", fontSize:13}}>
              <span>{LANG.level}: {level}/500</span>
              <span style={{color:"#FACC15"}}>{miningRate}/h</span>
              <span>{LANG.bal}: {walletBalance.toFixed(2)}</span>
            </div>
            <div style={{marginTop:8, width:"100%", maxWidth:320, height:6, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}>
              <div style={{width:`${(level/500)*100}%`, height:"100%", background:"#FACC15"}}></div>
            </div>
            <button onClick={startMining} disabled={mining} style={{marginTop:28, width:"100%", maxWidth:360, background: mining ? "#333" : "#FACC15", color: mining ? "#888" : "#000", fontWeight:900, padding:18, borderRadius:16, fontSize:18, border:"none"}}>
              {mining ? LANG.mining : LANG.start}
            </button>
            <div style={{marginTop:12, fontSize:11, color:"#444"}}>Level 0 = 0.25/h • كل 15 عملة = ليفل جديد</div>
          </>
        )}

        {tab==="store" && (
          <div style={{width:"100%", maxWidth:380}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>Store - Boosters</h2>
            {[
              {name:"Bronze Boost", rate:"1.5x", price:"50 ANKH"},
              {name:"Silver Boost", rate:"2.0x", price:"120 ANKH"},
              {name:"Gold Boost", rate:"3.0x", price:"250 ANKH"},
            ].map(b=>(
              <div key={b.name} style={{marginTop:12, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div><div style={{fontWeight:800}}>{b.name}</div><div style={{fontSize:12, color:"#FACC15"}}>{b.rate}</div></div>
                <button onClick={()=>{ if(balance>=50) { setBalance(b=>b-50); setMiningRate(r=>r+0.25); alert("تم الشراء!"); } else alert("رصيد غير كافي")}} style={{background:"#FACC15", color:"#000", border:"none", padding:"8px 16px", borderRadius:10, fontWeight:800}}>{b.price}</button>
              </div>
            ))}
          </div>
        )}

        {tab==="list" && (
          <div style={{width:"100%", maxWidth:380}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>Staking</h2>
            {[
              {d:"30 Days", apr:"15%"},
              {d:"90 Days", apr:"25%"},
              {d:"120 Days", apr:"35%"},
            ].map(s=>(
              <div key={s.d} style={{marginTop:12, background:"#111", border:"1px solid #222", borderRadius:16, padding:16, display:"flex", justifyContent:"space-between"}}>
                <span>{s.d}</span><span style={{color:"#FACC15", fontWeight:800}}>{s.apr} APR</span>
              </div>
            ))}
          </div>
        )}

        {tab==="friends" && (
          <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}>
            <h2 style={{fontSize:20, fontWeight:900, color:"#FACC15"}}>Referral Program</h2>
            <p style={{fontSize:13, color:"#999", marginTop:8, lineHeight:1.5}}>Invite friends and earn 5% from their mining forever! Your friends keep 100% - You get bonus from system.</p>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:14}}>
              <button onClick={()=>navigator.clipboard.writeText(`https://t.me/ANKH_Mining_bot?start=${refCode}`)} style={{background:"#FACC15", color:"#000", fontWeight:800, padding:12, borderRadius:12, border:"none", fontSize:13}}>📋 Copy Link</button>
              <button style={{background:"#1A1A1A", color:"#FACC15", fontWeight:800, padding:12, borderRadius:12, border:"1px solid #333", fontSize:13}}>✈️ Share TG</button>
            </div>
            <div style={{marginTop:14, background:"#000", borderRadius:12, padding:12, border:"1px solid #222"}}>
              <div style={{fontSize:10, color:"#666"}}>Your Code</div>
              <div style={{fontFamily:"monospace", color:"#FACC15", fontWeight:900, marginTop:4, letterSpacing:2}}>{refCode}</div>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:12}}>
              <div style={{background:"#000", borderRadius:12, padding:14, border:"1px solid #222"}}><div style={{fontSize:11, color:"#666"}}>Invited</div><div style={{fontSize:22, fontWeight:900}}>{invited}</div></div>
              <div style={{background:"#000", borderRadius:12, padding:14, border:"1px solid #222"}}><div style={{fontSize:11, color:"#666"}}>Earnings</div><div style={{fontSize:22, fontWeight:900, color:"#FACC15"}}>+0.00</div></div>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}>
            <h2 style={{fontWeight:900, fontSize:18}}>Wallet</h2>
            {!connected ? (
              <button onClick={()=>setConnected(true)} style={{marginTop:20, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>Connect Wallet</button>
            ) : (
              <>
                <div style={{marginTop:14, fontFamily:"monospace", fontSize:12, color:"#FACC15"}}>UQDl...{refCode.slice(-4)} Connected ✓</div>
                {!verified ? <button onClick={()=>setVerified(true)} style={{marginTop:14, width:"100%", border:"1px solid #FACC15", color:"#FACC15", background:"transparent", padding:12, borderRadius:12, fontWeight:700}}>Verify 0.05 GRAM (TON)</button> : <div style={{marginTop:12, color:"#22c55e", fontWeight:800, fontSize:13}}>✓ Verified - You can withdraw</div>}
                <input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} placeholder="0.00 ANKH" style={{marginTop:18, width:"100%", background:"#000", border:"1px solid #222", borderRadius:12, padding:14, color:"#fff", boxSizing:"border-box"}} />
                <div style={{display:"flex", gap:6, marginTop:10}}>{["25%","50%","75%","100%"].map(p=><button key={p} onClick={()=>setWithdrawAmount(String((walletBalance*parseInt(p)/100).toFixed(2)))} style={{flex:1, background:"#222", border:"none", color:"#aaa", padding:8, borderRadius:8, fontSize:12}}>{p}</button>)}</div>
                <div style={{fontSize:11, color:"#666", marginTop:10}}>Min 10,000 ANKH • Fee 5%</div>
                <button style={{marginTop:10, width:"100%", background:"rgba(250,204,21,0.15)", color:"#FACC15", border:"1px solid rgba(250,204,21,0.3)", padding:14, borderRadius:12, fontWeight:900}}>Withdraw</button>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0A0A0A", borderTop:"1px solid rgba(250,204,21,0.2)", display:"flex", justifyContent:"space-around", padding:"10px 0 22px"}}>
        {[
          {id:"mining", t:"Mining", ic:"⛏️"},
          {id:"store", t:"Store", ic:"🛒"},
          {id:"list", t:"List", ic:"📋"},
          {id:"friends", t:"Friends", ic:"👥"},
          {id:"wallet", t:"Wallet", ic:"💼"},
        ].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: tab===m.id ? "#FACC15" : "#666"}}>
            <span style={{fontSize:18}}>{m.ic}</span><span style={{fontSize:10, fontWeight:800, marginTop:2}}>{m.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
