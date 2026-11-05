"use client";
import { useState, useEffect } from "react";
export const dynamic = "force-dynamic";

export default function Page() {
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(1);
  const [view, setView] = useState<"main" | "tiers" | "levels">("main");
  const [mining, setMining] = useState(false);
  const [lastMine, setLastMine] = useState(0);

  // نفس أرقام Rifty بالظبط بس باسم ANKH
  const LEVELS = [
    { lvl: 1, req: 0, daily: 600, hourly: 25.0 },
    { lvl: 2, req: 116, daily: 690, hourly: 28.8 },
    { lvl: 3, req: 533, daily: 854, hourly: 35.6 },
    { lvl: 4, req: 1300, daily: 1066, hourly: 44.4 },
    { lvl: 5, req: 2447, daily: 1317, hourly: 54.9 },
    { lvl: 6, req: 3999, daily: 1602, hourly: 66.8 },
    { lvl: 7, req: 5972, daily: 1918, hourly: 79.9 },
  ];
  const getReq = (lvl: number) => LEVELS.find(l=>l.lvl===lvl)?.req || Math.floor(5972 * Math.pow(1.4, lvl-7));
  const getDaily = (lvl: number) => LEVELS.find(l=>l.lvl===lvl)?.daily || Math.floor(1918 * Math.pow(1.2, lvl-7));
  const getHourly = (lvl: number) => LEVELS.find(l=>l.lvl===lvl)?.hourly || +(getDaily(lvl)/24).toFixed(1);

  useEffect(() => {
    const b = localStorage.getItem("ankh_bal"); if(b) setBalance(Number(b));
    const wb = localStorage.getItem("ankh_wallet"); if(wb) setWalletBalance(Number(wb));
    const lv = localStorage.getItem("ankh_level"); if(lv) setLevel(Number(lv));
  }, []);
  useEffect(() => { localStorage.setItem("ankh_bal", String(balance)); }, [balance]);
  useEffect(() => { localStorage.setItem("ankh_wallet", String(walletBalance)); }, [walletBalance]);
  useEffect(() => { localStorage.setItem("ankh_level", String(level)); }, [level]);

  const canMine = Date.now() - lastMine >= 3600000 || lastMine===0;
  const startMine = () => {
    if(!canMine || mining) return;
    setMining(true);
    setTimeout(()=>{
      setBalance(p=>p+getHourly(level));
      setLastMine(Date.now());
      setMining(false);
    }, 1200);
  };
  const claim = () => {
    if(balance<=0) return;
    const newW = walletBalance + balance;
    setWalletBalance(newW);
    setBalance(0);
    let nl = level;
    while(newW >= getReq(nl+1) && nl<500) nl++;
    setLevel(nl);
  };

  const daily = getDaily(level);
  const hourly = getHourly(level);
  const nextReq = getReq(level+1);
  const progress = Math.min(100, (walletBalance / (nextReq||1))*100);

  if(view==="main"){
    return (
      <div style={{minHeight:"100vh", background:"radial-gradient(ellipse at top, #1A1A0A 0%, #050505 60%)", color:"#fff", paddingBottom:80, direction:"rtl", fontFamily:"sans-serif"}}>
        {/* Header ANKH */}
        <div style={{padding:14, display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #222"}}>
          <div style={{display:"flex", gap:10, alignItems:"center"}}>
            <div style={{width:38, height:38, borderRadius:10, background:"linear-gradient(180deg, #FACC15, #854D0E)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, border:"1px solid #FACC15"}}>☥</div>
            <div><div style={{fontWeight:900, letterSpacing:1}}>ANKH MINING</div><div style={{fontSize:10, color:"#FACC15"}}>شبكة TON • عملة عنخ</div></div>
          </div>
          <div style={{display:"flex", gap:8}}><div style={{background:"#111", border:"1px solid #333", padding:"6px 10px", borderRadius:8, fontSize:11}}>AR 🇪🇬</div><div style={{background:"#111", border:"1px solid #FACC15", padding:"6px 10px", borderRadius:20, fontSize:11, color:"#FACC15"}}>🏅 لفل {level}</div></div>
        </div>

        {/* Balance */}
        <div style={{margin:12, background:"linear-gradient(135deg, #111 0%, #1A1A0A 100%)", borderRadius:16, padding:14, border:"1px solid #2A2A2A"}}>
          <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:"#888"}}><span>💰 الرصيد المعدن</span><span style={{color:"#FACC15"}}>في المحفظة: {walletBalance.toFixed(2)} ANKH</span></div>
          <div style={{fontSize:28, fontWeight:900, marginTop:6}}>{balance.toFixed(4)} <span style={{fontSize:14, color:"#FACC15"}}>ANKH</span></div>
        </div>

        {/* Mining Card - ألوان أحلى */}
        <div style={{margin:"0 12px", background:"linear-gradient(135deg, #1A1A0A 0%, #0F0F0F 50%, #1A1500 100%)", borderRadius:20, padding:16, border:"1px solid #3A2E10", boxShadow:"0 0 30px rgba(250,204,21,0.1)"}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{background:"#FACC15", color:"#000", padding:"4px 10px", borderRadius:20, fontSize:10, fontWeight:900}}>⚡ x{(1+level*0.1).toFixed(2)}</div>
            <div style={{textAlign:"left"}}><div style={{fontSize:13, fontWeight:800}}>التعدين النشط</div><div style={{fontSize:10, color:"#22c55e"}}>● يعمل الآن - ANKH</div></div>
          </div>
          <div style={{fontSize:36, fontWeight:900, marginTop:12, color:"#FACC15", textShadow:"0 0 20px rgba(250,204,21,0.3)"}}>+{balance.toFixed(4)} <span style={{fontSize:16, color:"#fff"}}>ANKH</span></div>
          <button onClick={startMine} disabled={!canMine} style={{marginTop:14, width:"100%", background: canMine ? "linear-gradient(90deg, #FACC15, #EAB308)" : "#222", color: canMine?"#000":"#666", padding:14, borderRadius:14, border:"none", fontWeight:900, fontSize:14}}>
            {mining ? "يعدن..." : canMine ? "⛏️ استلم ANKH الآن" : "انتظر ساعة"}
          </button>
          <button onClick={claim} style={{marginTop:8, width:"100%", background:"#000", border:"1px solid #333", padding:10, borderRadius:10, color: balance>0?"#FACC15":"#555", fontSize:12}}>نقل للمحفظة ({balance.toFixed(2)})</button>
        </div>

        {/* Stats */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:6, margin:"12px 12px 0"}}>
          <div style={{background:"#111", borderRadius:12, padding:10, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>في الساعة</div><div style={{fontWeight:900, color:"#FACC15"}}>{hourly}</div><div style={{fontSize:8, color:"#555"}}>ANKH/h</div></div>
          <div style={{background:"#111", borderRadius:12, padding:10, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>يوميا</div><div style={{fontWeight:900, color:"#22c55e"}}>{daily}~</div><div style={{fontSize:8, color:"#555"}}>ANKH/day</div></div>
          <div style={{background:"#111", borderRadius:12, padding:10, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>تعزيز</div><div style={{fontWeight:900, color:"#FACC15"}}>{(1+level*0.1).toFixed(2)}x</div><div style={{fontSize:8, color:"#555"}}>المضاعف</div></div>
          <div style={{background:"linear-gradient(135deg, #2A2210, #1A1500)", borderRadius:12, padding:10, textAlign:"center", border:"1px solid #FACC15"}}><div style={{fontSize:9, color:"#FACC15"}}>الدوري</div><div style={{fontWeight:900, color:"#FACC15"}}>برونزي</div><div style={{fontSize:8, color:"#888"}}>Lv.{level}</div></div>
        </div>

        {/* Progress - الخط الأخضر */}
        <div onClick={()=>setView("tiers")} style={{margin:"12px 12px 0", background:"#111", borderRadius:14, padding:12, border:"1px solid #222", cursor:"pointer"}}>
          <div style={{display:"flex", justifyContent:"space-between", fontSize:11}}><span style={{color:"#888"}}>ANKH {walletBalance.toFixed(0)} / {nextReq}</span><span style={{color:"#FACC15"}}>المستوى التالي: {level+1} ›</span></div>
          <div style={{height:6, background:"#222", borderRadius:10, marginTop:6, overflow:"hidden"}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg, #FACC15, #22c55e)"}}></div></div>
          <div style={{fontSize:10, color:"#aaa", marginTop:6}}>احتفظ بـ {nextReq} ANKH في محفظتك للوصول الى المستوى {level+1}</div>
        </div>

        <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0A0A0A", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"10px 0"}}>
          <span style={{color:"#FACC15"}}>⛏️<div style={{fontSize:9}}>التعدين</div></span><span style={{color:"#555"}}>🏠<div style={{fontSize:9}}>الرئيسية</div></span><span style={{color:"#555"}}>🗄️<div style={{fontSize:9}}>المحفظة</div></span>
        </div>
      </div>
    )
  }

  if(view==="tiers"){
    return (
      <div style={{minHeight:"100vh", background:"#050505", color:"#fff", direction:"rtl", paddingBottom:80}}>
        <div style={{padding:16, display:"flex", justifyContent:"space-between"}}><button onClick={()=>setView("main")} style={{background:"#111", width:32, height:32, borderRadius:20, border:"1px solid #333"}}>‹</button><div style={{fontWeight:900}}>الدوريات والمستويات</div><div>⋯</div></div>
        <div style={{textAlign:"center", color:"#888", fontSize:11}}>احتفظ بـ ANKH , افتح الفصل التالي</div>
        <div style={{margin:16, background:"#111", borderRadius:16, padding:14, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
          <div style={{width:64, height:64, background:"linear-gradient(180deg, #FACC15, #854D0E)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:28, border:"2px solid #FACC15"}}>1</div>
          <div style={{textAlign:"left"}}><div style={{fontSize:11, color:"#888"}}>دوريك</div><div style={{fontWeight:900, color:"#FACC15"}}>البرونزي</div><div style={{fontSize:11, color:"#888", marginTop:8}}>الرصيد في المحفظة</div><div style={{fontWeight:900}}>ANKH {walletBalance.toFixed(0)}</div></div>
        </div>
        <button onClick={()=>setView("levels")} style={{margin:"0 16px", width:"calc(100% - 32px)", background:"linear-gradient(90deg, #FACC15, #EAB308)", color:"#000", padding:12, borderRadius:12, border:"none", fontWeight:900}}>🔍 تصفح المستويات</button>
        <div style={{margin:16, display:"flex", flexDirection:"column", gap:8}}>
          {[
            {n:"البرونزي", r:"100-1"}, {n:"الفضي", r:"200-101"}, {n:"الذهبي", r:"300-201"}, {n:"البلاتيني", r:"400-301"}, {n:"أسطوري", r:"500-401"}
          ].map((d,i)=>(
            <div key={i} style={{background:"#111", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}><div><div style={{fontWeight:800}}>{d.n}</div><div style={{fontSize:10, color:"#888"}}>المستويات {d.r}</div></div><span style={{color:"#FACC15"}}>›</span></div>
          ))}
        </div>
      </div>
    )
  }

  // Levels List
  return (
    <div style={{minHeight:"100vh", background:"#050505", color:"#fff", direction:"rtl", paddingBottom:80}}>
      <div style={{padding:16, display:"flex", justifyContent:"space-between"}}><button onClick={()=>setView("tiers")} style={{background:"#111", width:32, height:32, borderRadius:20, border:"1px solid #333"}}>‹</button><div style={{fontWeight:900}}>مستويات التعدين - ANKH</div><div>⋯</div></div>
      <div style={{textAlign:"center", fontSize:11, color:"#FACC15"}}>استكشف 500 مستوى • عملة عنخ</div>
      <div style={{margin:12, background:"#111", borderRadius:12, overflow:"hidden", border:"1px solid #222"}}>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#888", padding:10, borderBottom:"1px solid #222", background:"#0A0A0A"}}><span>مستوى الصغير</span><span>الرصيد في المحفظة</span><span>ANKH / اليوم</span></div>
        {Array.from({length:7}, (_,i)=>{
          const lvl = i+1;
          return (
            <div key={lvl} style={{display:"flex", justifyContent:"space-between", padding:"12px 10px", borderBottom:"1px solid #222", background: lvl===level?"rgba(250,204,21,0.1)":"transparent"}}>
              <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:28, height:28, background:"linear-gradient(180deg, #FACC15, #854D0E)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:"#000"}}>{lvl}</div><span>{lvl}</span></div>
              <div style={{fontSize:13}}>{getReq(lvl)} <span style={{fontSize:9, color:"#888"}}>ANKH</span></div>
              <div style={{fontSize:13, color:"#FACC15"}}>{getDaily(lvl)}<div style={{fontSize:10, color:"#888"}}>{getHourly(lvl)}/h</div></div>
            </div>
          )
        })}
      </div>
      <div style={{textAlign:"center", fontSize:10, color:"#666"}}>باقي المستويات لحد 500 بنفس الرتم • ANKH</div>
    </div>
  )
}
