"use client";
import { useState, useEffect } from "react";
export const dynamic = "force-dynamic";
import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const TRANSLATIONS: any = {
  ar: { mining: "ANKH Mining", subtitle: "عدن لتصنع المجد بنفسك", balance: "الرصيد المعدن", active: "التعدين النشط", working: "يعمل الآن", ready: "جاهز للجمع!", claim: "استلم ANKH", perHour: "في الساعة", daily: "يوميا", boost: "تعزيز", tier: "الدوري", nextLevel: "المستوى التالي:", keep: "احتفظ بـ", toReach: "في محفظتك للوصول الى المستوي", profile: "الملف الشخصي", smallLevel: "مستوي الصغير", tiersTitle: "الدوريات والمستويات", tiersSub: "احتفظ بـ ANKH , افتح الفصل التالي", yourTier: "دوريك", walletBal: "الرصيد في المحفظة", browse: "تصفح المستويات", progress: "تقدم الدوريات", levelsTitle: "مستويات التعدين", levelsSub: "استكشف 500 مستوى عبر خمس دوريات - ANKH", small: "مستوى الصغير", reqWallet: "الرصيد في المحفظة", perDay: "ANKH / اليوم", main: "الرئيسية", miningTab: "التعدين", market: "السوق", friends: "الأصدقاء", wallet: "المحفظة", chartTitle: "إنتاج التعدين", chartSub: "الإنتاج يزيد مع احتفاظك بـ ANKH ويقل مع البيع" },
  en: { mining: "ANKH Mining", subtitle: "Mine to build your own glory", balance: "Mined Balance", active: "Active Mining", working: "Working Now", ready: "Ready to Claim!", claim: "Claim ANKH", perHour: "Per Hour", daily: "Daily", boost: "Boost", tier: "Tier", nextLevel: "Next Level:", keep: "Keep", toReach: "in wallet to reach level", profile: "Profile", smallLevel: "Small Level", tiersTitle: "Tiers & Levels", tiersSub: "Hold ANKH, unlock next chapter", yourTier: "Your Tier", walletBal: "Wallet Balance", browse: "Browse Levels", progress: "Tiers Progress", levelsTitle: "Mining Levels", levelsSub: "Explore 500 levels - ANKH", small: "Level", reqWallet: "Wallet Required", perDay: "ANKH / Day", main: "Home", miningTab: "Mining", market: "Market", friends: "Friends", wallet: "Wallet", chartTitle: "Mining Production", chartSub: "Production rises with holding" },
  ru: { mining: "ANKH Mining", subtitle: "Майни, чтобы создать славу", balance: "Добытый баланс", active: "Активный майнинг", working: "Работает", ready: "Готово!", claim: "Получить ANKH", perHour: "В час", daily: "В день", boost: "Буст", tier: "Лига", nextLevel: "След. уровень:", keep: "Держи", toReach: "в кошельке для уровня", profile: "Профиль", smallLevel: "Мал. уровень", tiersTitle: "Лиги и уровни", tiersSub: "Держи ANKH, открой главу", yourTier: "Твоя лига", walletBal: "Баланс", browse: "Уровни", progress: "Прогресс", levelsTitle: "Уровни майнинга", levelsSub: "500 уровней - ANKH", small: "Ур.", reqWallet: "Нужно", perDay: "ANKH / День", main: "Главная", miningTab: "Майнинг", market: "Рынок", friends: "Друзья", wallet: "Кошелек", chartTitle: "Производство", chartSub: "Растет с холдом" },
};

const TIERS = [
  { id: "bronze", n: "البرونزي", r: "1-100", start: 1, end: 100, startId: 1, color: "#FACC15" },
  { id: "silver", n: "الفضي", r: "101-200", start: 101, end: 200, startId: 101, color: "#C0C0C0" },
  { id: "gold", n: "الذهبي", r: "201-300", start: 201, end: 300, startId: 201, color: "#F59E0B" },
  { id: "platinum", n: "البلاتيني", r: "301-400", start: 301, end: 400, startId: 301, color: "#38BDF8" },
  { id: "legendary", n: "أسطوري", r: "401-500", start: 401, end: 500, startId: 401, color: "#A855F7" },
];

const BASE_LEVELS = [
  { lvl: 1, req: 0, daily: 120, hourly: 5.0 },
  { lvl: 2, req: 200, daily: 150, hourly: 6.3 },
  { lvl: 3, req: 600, daily: 190, hourly: 7.9 },
  { lvl: 4, req: 1500, daily: 240, hourly: 10.0 },
  { lvl: 5, req: 3200, daily: 300, hourly: 12.5 },
  { lvl: 6, req: 6000, daily: 370, hourly: 15.4 },
  { lvl: 7, req: 10000, daily: 450, hourly: 18.8 },
];

const getLevelData = (lvl: number) => {
  const base = BASE_LEVELS.find(x=>x.lvl===lvl);
  if(base) return base;
  let lastReq = 10000; let lastDaily = 450;
  for(let i=8; i<=lvl; i++){
    let reqMult = 1.12; if(i>100) reqMult = 1.15; if(i>200) reqMult = 1.18; if(i>300) reqMult = 1.20;
    lastReq = Math.floor(lastReq * reqMult);
    let dailyMult = 1.03; if(i>100) dailyMult = 1.025; if(i>200) dailyMult = 1.02; if(i>300) dailyMult = 1.015;
    lastDaily = Math.floor(lastDaily * dailyMult);
  }
  return { lvl, req: lastReq, daily: lastDaily, hourly: +(lastDaily/24).toFixed(1) };
};

function AnkhInner() {
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(1);
  const [view, setView] = useState<"main" | "tiers" | "levels" | "mining" | "market">("main");
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState("ar");
  const [showLang, setShowLang] = useState(false);
  const [lastMine, setLastMine] = useState(0);
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [tonAmount, setTonAmount] = useState("1");
  const [ankhPrice] = useState(0.01815);
  const [marketTab, setMarketTab] = useState<"buy" | "history">("buy");
  const [txHistory, setTxHistory] = useState<any[]>([]);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const isConnected = !!wallet;
  const t = TRANSLATIONS[lang];

  const getReq = (l: number) => getLevelData(l).req;
  const getDaily = (l: number) => getLevelData(l).daily;
  const getHourly = (l: number) => getLevelData(l).hourly;
  const ankhAmount = tonAmount ? (Number(tonAmount) / ankhPrice) : 0;

  useEffect(()=>{
    const wb = localStorage.getItem("ankh_wallet"); if(wb) setWalletBalance(Number(wb));
    const lv = localStorage.getItem("ankh_level"); if(lv) setLevel(Number(lv));
    const lm = localStorage.getItem("ankh_last_mine"); const lb = localStorage.getItem("ankh_bal"); const now = Date.now();
    if(lm){
      const last = Number(lm); setLastMine(last);
      const elapsedHours = (now - last) / 3600000;
      const currentHourly = getHourly(Number(lv)||1);
      const offlineEarned = Math.min(currentHourly * 2, currentHourly * (elapsedHours<24 ? elapsedHours : 2));
      setBalance(Number(lb||0) + offlineEarned);
    } else { setBalance(0); setLastMine(now); localStorage.setItem("ankh_last_mine", String(now)); }
    const savedLang = localStorage.getItem("ankh_lang"); if(savedLang) setLang(savedLang);
  },[]);

  useEffect(()=>{
    const interval = setInterval(()=>{ if(Date.now() - lastMine < 86400000){ setBalance(b=>{ const newB = b + (getHourly(level)/3600); localStorage.setItem("ankh_bal", String(newB)); return newB; }); } },1000);
    return ()=>clearInterval(interval);
  },[lastMine, level]);

  const daily = getDaily(level); const hourly = getHourly(level); const nextReq = getReq(level+1); const progress = Math.min(100, (walletBalance / (nextReq||1))*100);
  const handleClaim = () => {
    if(balance<=0) return;
    const newW = walletBalance + balance;
    setWalletBalance(newW); localStorage.setItem("ankh_wallet", String(newW));
    setBalance(0); const now = Date.now(); setLastMine(now);
    localStorage.setItem("ankh_last_mine", String(now)); localStorage.setItem("ankh_bal", "0");
    let nl=level; while(newW>=getReq(nl+1) && nl<500) nl++; setLevel(nl); localStorage.setItem("ankh_level", String(nl));
  };
  const changeLang = (l:string)=>{ setLang(l); localStorage.setItem("ankh_lang", l); setShowLang(false); }
  const chartPoints = [0, 15, 30, 25, 45, 60, 55, 80, 95, 85, 100];
  
  return (
    <div style={{minHeight:"100vh", background:"#08080C", color:"#fff", paddingBottom:90, direction: lang==="ar" ? "rtl" : "ltr", fontFamily:"sans-serif"}}>
      <div style={{padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0F0F14"}}>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <div style={{width:38, height:38, borderRadius:10, background:"linear-gradient(180deg,#FACC15,#854D0E)", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #FACC15", color:"#000", fontWeight:900}}>☥</div>
          <span style={{fontWeight:900}}>ANKH</span>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowLang(!showLang)} style={{background:"#1A1A1A", border:"1px solid #333", borderRadius:20, padding:"6px 12px", fontSize:11, color:"#fff"}}>{lang.toUpperCase()} ▾</button>
            {showLang && (
              <div style={{position:"absolute", top:35, left:0, background:"#1A1A1A", border:"1px solid #333", borderRadius:10, zIndex:50, overflow:"hidden"}}>
                <div onClick={()=>changeLang("ar")} style={{padding:"8px 16px", fontSize:12, cursor:"pointer"}}>AR 🇪🇬</div>
                <div onClick={()=>changeLang("en")} style={{padding:"8px 16px", fontSize:12, cursor:"pointer"}}>EN 🇺🇸</div>
                <div onClick={()=>changeLang("ru")} style={{padding:"8px 16px", fontSize:12, cursor:"pointer"}}>RU 🇷🇺</div>
              </div>
            )}
          </div>
        </div>
        <div style={{background:"#1A1A1A", border:"1px solid #333", borderRadius:20, padding:"6px 12px", fontSize:11, display:"flex", gap:6}}><span>{t.profile}</span><span style={{color:"#FACC15"}}>{t.smallLevel} {level}</span></div>
      </div>

      {view==="main" && tab==="home" && (
        <>
          <div style={{margin:"0 12px", height:90, borderRadius:16, background:"linear-gradient(90deg, #1A1500, #1A1A2A)", border:"1px solid #2A2A1A", padding:12}}>
            <div style={{fontSize:20, fontWeight:900}}>{t.mining}</div><div style={{fontSize:11, color:"#FACC15", marginTop:2}}>{t.subtitle}</div>
          </div>
          <div style={{margin:"10px 12px 0", background:"#14141A", borderRadius:14, padding:10, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
            <div style={{fontSize:11, color:"#888"}}>{t.balance}</div>
            <div style={{fontWeight:900, fontSize:18}}>ANKH {walletBalance.toFixed(4)}</div>
          </div>
          <div style={{margin:"10px 12px 0", background:"linear-gradient(180deg, #1E1A2E 0%, #0F0F1A 100%)", borderRadius:18, padding:12, border:"1px solid #2A2A4A"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{background:"rgba(250,204,21,0.15)", border:"1px solid #FACC15", padding:"4px 10px", borderRadius:12, fontSize:11, color:"#FACC15"}}>⚡ x1.00</div>
              <div style={{textAlign:"left"}}><div style={{fontSize:12, fontWeight:800}}>{t.active}</div><div style={{fontSize:10, color:"#22c55e"}}>{t.working} ●</div></div>
            </div>
            <div style={{fontSize:32, fontWeight:900, color:"#5EE9FF", marginTop:14}}>+{balance.toFixed(4)} ANKH</div>
            <button onClick={handleClaim} style={{marginTop:10, width:"100%", background: balance>0 ? "linear-gradient(90deg, #A855F7, #38BDF8)" : "#222", padding:12, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>{t.claim} {balance>0 ? `(${balance.toFixed(2)})` : ""}</button>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:6, margin:"10px 12px 0"}}>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>{t.perHour}</div><div style={{fontWeight:900, color:"#FACC15"}}>{hourly}</div></div>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>{t.daily}</div><div style={{fontWeight:900, color:"#22c55e"}}>{daily}~</div></div>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>{t.boost}</div><div style={{fontWeight:900, color:"#FACC15"}}>1.00x</div></div>
            <div style={{background:"#1A1500", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #FACC15"}}><div style={{fontSize:9, color:"#888"}}>{t.tier}</div><div style={{fontWeight:900, color:"#FACC15"}}>Lv.{level}</div></div>
          </div>
          <div onClick={()=>setView("tiers")} style={{margin:"10px 12px 0", background:"#12121A", borderRadius:12, padding:10, border:"1px solid #222", cursor:"pointer"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11}}><span>ANKH {walletBalance.toFixed(0)} / {nextReq}</span><span>{t.nextLevel} {level+1}</span></div>
            <div style={{height:4, background:"#222", borderRadius:10, marginTop:8}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#FACC15,#22c55e)"}}></div></div>
          </div>
        </>
      )}

      {view==="mining" && (
        <>
          <div style={{padding:"12px 16px", display:"flex", gap:10, alignItems:"center"}}>
            <button onClick={()=>{setView("main"); setTab("home")}} style={{background:"#1A1A1A", width:36, height:36, borderRadius:20, border:"1px solid #333", color:"#fff"}}>‹</button>
            <div style={{fontWeight:900}}>التعدين - ANKH</div>
          </div>
          <div style={{margin:"0 12px", background:"linear-gradient(180deg, #1E1A2E 0%, #0F0F1A 100%)", borderRadius:18, padding:12, border:"1px solid #2A2A4A"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{background:"rgba(250,204,21,0.15)", border:"1px solid #FACC15", padding:"4px 10px", borderRadius:12, fontSize:11, color:"#FACC15"}}>⚡ x1.00</div>
              <div style={{textAlign:"left"}}><div style={{fontSize:12, fontWeight:800}}>{t.active}</div><div style={{fontSize:10, color:"#22c55e"}}>{t.working} ●</div></div>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:12}}>
              <div style={{background:"#0A0A0A", borderRadius:10, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:10, color:"#888"}}>المعدن</div><div style={{fontWeight:900, color:"#5EE9FF", fontSize:18}}>{balance.toFixed(2)}</div><div style={{fontSize:9, color:"#666"}}>ANKH</div></div>
              <div style={{background:"#0A0A0A", borderRadius:10, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:10, color:"#888"}}>في الساعة</div><div style={{fontWeight:900, color:"#FACC15", fontSize:18}}>{hourly}</div><div style={{fontSize:9, color:"#666"}}>ANKH/h</div></div>
            </div>
            <button onClick={handleClaim} style={{marginTop:10, width:"100%", background: balance>0 ? "linear-gradient(90deg, #FACC15, #EAB308)" : "#222", padding:12, borderRadius:12, border:"none", color: balance>0 ? "#000" : "#666", fontWeight:900}}>{t.claim} ⚡</button>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:6, margin:"10px 12px 0"}}>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>يوميا</div><div style={{fontWeight:900, color:"#22c55e"}}>{daily}~</div></div>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>المحفظة</div><div style={{fontWeight:900, color:"#fff"}}>{walletBalance.toFixed(0)}</div></div>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>المستوى</div><div style={{fontWeight:900, color:"#FACC15"}}>Lv.{level}</div></div>
          </div>
          <div style={{margin:"10px 12px 0", background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}><div><div style={{fontWeight:800, fontSize:13}}>{t.chartTitle} 📈</div><div style={{fontSize:10, color:"#888", marginTop:2}}>{t.chartSub}</div></div><div style={{fontSize:10, color:"#FACC15", background:"rgba(250,204,21,0.1)", border:"1px solid #FACC15", padding:"4px 8px", borderRadius:20}}>Lv.{level} • {hourly}/h</div></div>
            <div style={{marginTop:12, height:80, display:"flex", alignItems:"flex-end", gap:4, padding:"0 4px"}}>
              {chartPoints.map((h,i)=>{
                const isCurrent = i===Math.min(10, Math.floor(level/5));
                return <div key={i} style={{flex:1, height:`${h}%`, background: isCurrent ? "linear-gradient(180deg,#FACC15,#EAB308)" : "linear-gradient(180deg,#333,#222)", borderRadius:"4px 4px 0 0", border: isCurrent ? "1px solid #FACC15" : "none"}}></div>
              })}
            </div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:9, color:"#666", marginTop:6}}><span>0 ANKH</span><span>احتفاظ ↑ إنتاج ↑</span><span>{nextReq} ANKH</span></div>
            <div style={{marginTop:8, background:"#0A0A0A", borderRadius:8, padding:8, border:"1px solid #222", display:"flex", justifyContent:"space-between", fontSize:10}}><span style={{color:"#888"}}>لو بعت ANKH، الإنتاج يقل</span><span style={{color:"#22c55e"}}>لو احتفظت، الإنتاج يزيد +{(level*0.5).toFixed(1)}%</span></div>
          </div>
          <div onClick={()=>setView("tiers")} style={{margin:"10px 12px 0", background:"#12121A", borderRadius:12, padding:10, border:"1px solid #222", cursor:"pointer"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11}}><span>ANKH {walletBalance.toFixed(0)} / {nextReq}</span><span style={{display:"flex", gap:6, alignItems:"center"}}><span>{t.nextLevel} {level+1}</span><span style={{width:28, height:28, background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#000"}}>{level}</span></span></div>
            <div style={{height:4, background:"#222", borderRadius:10, marginTop:8}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#FACC15,#22c55e)"}}></div></div>
            <div style={{fontSize:10, color:"#888", marginTop:6}}>{t.keep} {nextReq} ANKH {t.toReach} {level+1}</div>
          </div>
        </>
      )}

      {view==="market" && (
        <>
          <div style={{padding:"12px 16px"}}>
            <div style={{borderRadius:16, background:"linear-gradient(180deg, #1A0A2E, #0F0F1A)", border:"1px solid #333", padding:12}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{fontSize:22, fontWeight:900}}>السوق</div>
                <div style={{fontSize:11, color:"#FACC15", background:"rgba(250,204,21,0.1)", border:"1px solid #FACC15", padding:"4px 10px", borderRadius:20}}>ANKH / TON ⇄</div>
              </div>
              <div style={{marginTop:12, background:"rgba(0,0,0,0.5)", borderRadius:12, padding:12, border:"1px solid #222"}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}>
                  <span onClick={()=>window.open("https://app.ston.fi","_blank")} style={{color:"#FACC15", cursor:"pointer", fontWeight:700}}>↗ STON.fi</span>
                  <span style={{color:"#888"}}>{isConnected ? wallet?.account.address.slice(0,6)+"..."+wallet?.account.address.slice(-4) : "TON Price"}</span>
                </div>
                <div style={{fontSize:26, fontWeight:900, marginTop:8}}>TON {ankhPrice.toFixed(6)}</div>
              </div>
            </div>

            <div style={{display:"flex", gap:8, marginTop:12}}>
              <button onClick={()=>setMarketTab("history")} style={{flex:1, background: marketTab==="history" ? "linear-gradient(90deg,#A855F7,#38BDF8)" : "#12121A", border:"1px solid #222", borderRadius:12, padding:12, color: marketTab==="history" ? "#fff" : "#666", fontWeight:900}}>السجل</button>
              <button onClick={()=>setMarketTab("buy")} style={{flex:1, background: marketTab==="buy" ? "linear-gradient(90deg,#A855F7,#38BDF8)" : "#12121A", border: marketTab==="buy" ? "none" : "1px solid #222", borderRadius:12, padding:12, color: marketTab==="buy" ? "#fff" : "#666", fontWeight:900}}>شراء</button>
            </div>

            {marketTab==="history" && (
              <div style={{marginTop:10, background:"#12121A", borderRadius:14, padding:20, border:"1px solid #222", textAlign:"center"}}>
                <div style={{fontSize:40}}>📋</div>
                <div style={{fontWeight:800, marginTop:10}}>لا يوجد سجل بعد</div>
                <div style={{fontSize:11, color:"#888", marginTop:6, lineHeight:1.5}}>لما تشتري أو تبيع ANKH هيظهر هنا السجل بتاعك<br/>البيع والشراء متاح على STON.fi</div>
                {txHistory.map((tx,i)=>(
                  <div key={i} style={{marginTop:10, background:"#0A0A0A", borderRadius:10, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
                    <span style={{color:"#22c55e", fontWeight:700}}>+{tx.amount} ANKH</span><span style={{fontSize:11, color:"#888"}}>{tx.date}</span>
                  </div>
                ))}
              </div>
            )}

            {marketTab==="buy" && (
              <div style={{marginTop:10, background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222"}}>
                <div style={{fontSize:11, color:"#888", textAlign:"right"}}>تدفع</div>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0A0A0A", borderRadius:12, padding:12, border:"1px solid #333", marginTop:6}}>
                  <input type="number" min="1" value={tonAmount} onChange={(e)=>{if(Number(e.target.value)>=1 || e.target.value==="") setTonAmount(e.target.value)}} style={{background:"none", border:"none", color:"#fff", fontSize:22, fontWeight:900, width:120, outline:"none"}} />
                  <div style={{display:"flex", gap:8, alignItems:"center"}}>
                    <span style={{color:"#FACC15", fontWeight:800, fontSize:14}}>TON</span>
                    <button onClick={()=>setTonAmount("1")} style={{background:"rgba(250,204,21,0.15)", border:"1px solid #FACC15", color:"#FACC15", borderRadius:8, padding:"5px 10px", fontSize:11, fontWeight:800}}>MAX</button>
                  </div>
                </div>
                <div style={{fontSize:11, color:"#666", marginTop:8, textAlign:"right"}}>المتاح: {isConnected ? "مربوط ✓ "+wallet?.account.address.slice(0,4) : "TON 0.0000"} {Number(tonAmount)<1 && tonAmount!=="" && <span style={{color:"#ef4444"}}> • اقل كمية 1 TON</span>}</div>
                <div style={{display:"flex", justifyContent:"center", margin:"14px 0"}}><div style={{width:36, height:36, background:"#1A1A1A", borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #333", fontSize:16}}>↕</div></div>
                <div style={{fontSize:11, color:"#888", textAlign:"right"}}>تستلم ≈</div>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0A0A0A", borderRadius:12, padding:12, border:"1px solid #333", marginTop:6}}>
                  <div style={{fontSize:20, fontWeight:900, color:"#5EE9FF"}}>{tonAmount==="" ? "0.00000000" : ankhAmount.toFixed(8)}</div>
                  <div style={{color:"#A855F7", fontWeight:900, fontSize:14}}>ANKH</div>
                </div>
                <div style={{marginTop:12, background:"#0A0A0A", borderRadius:12, padding:12, border:"1px solid #222"}}>
                  <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span style={{color:"#888"}}>رسوم الخدمة</span><span>TON 0.05</span></div>
                  <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginTop:8}}><span style={{color:"#888"}}>الإنزلاق السعري</span><span>0.5%</span></div>
                  <div style={{display:"flex", justifyContent:"space-between", fontSize:13, marginTop:10, fontWeight:900}}><span style={{color:"#FACC15"}}>المبادلة ورسوم التطبيق</span><span style={{color:"#FACC15"}}>TON {(Number(tonAmount||0)+0.05).toFixed(2)}</span></div>
                </div>
                <button onClick={()=>{if(Number(tonAmount)>=1){const newTx={amount:ankhAmount.toFixed(2), date:"الآن - "+new Date().toLocaleTimeString()}; setTxHistory([newTx, ...txHistory]);}}} disabled={Number(tonAmount)<1} style={{marginTop:14, width:"100%", background: Number(tonAmount)>=1 ? "linear-gradient(90deg,#A855F7,#38BDF8)" : "#222", padding:14, borderRadius:12, border:"none", color:"#fff", fontWeight:900, fontSize:14}}>↗ راجع الشراء</button>
                {isConnected ? (
                  <button onClick={()=>tonConnectUI.disconnect()} style={{marginTop:10, width:"100%", background:"#1A1A1A", padding:13, borderRadius:12, border:"1px solid #ef4444", color:"#ef4444", fontWeight:700}}>✕ قطع {wallet?.account.address.slice(0,6)}...</button>
                ) : (
                  <button onClick={()=>tonConnectUI.openModal()} style={{marginTop:10, width:"100%", background:"linear-gradient(90deg,#0098EA,#A855F7)", padding:13, borderRadius:12, border:"none", color:"#fff", fontWeight:800}}>📋 ربط المحفظة</button>
                )}
                <button onClick={()=>window.open("https://app.ston.fi","_blank")} style={{marginTop:10, width:"100%", background:"#1A1A1A", padding:13, borderRadius:12, border:"1px solid #333", color:"#fff", fontWeight:700}}>↗ افتح STON.fi</button>
              </div>
            )}
          </div>
        </>
      )}

      {view==="tiers" && (
        <>
          <div style={{padding:16, display:"flex", gap:10, alignItems:"center"}}>
            <button onClick={()=>{setView(tab==="home"?"main":"mining");}} style={{background:"#1A1A1A", width:36, height:36, borderRadius:20, border:"1px solid #333", color:"#fff"}}>‹</button>
            <div style={{textAlign:"center", flex:1}}><div style={{fontSize:20, fontWeight:900}}>{t.tiersTitle}</div><div style={{fontSize:11, color:"#888"}}>{t.tiersSub}</div></div>
            <div style={{width:36}}></div>
          </div>
          <div style={{margin:"0 12px", background:"#12121A", borderRadius:16, padding:14, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
            <div style={{width:70, height:70, background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:32, border:"2px solid #FACC15", color:"#000"}}>{level}</div>
            <div style={{textAlign:"left"}}><div style={{fontSize:11, color:"#888"}}>{t.yourTier}</div><div style={{fontWeight:900, color:"#FACC15"}}>البرونزي</div><div style={{fontSize:11, color:"#888", marginTop:8}}>{t.walletBal}</div><div style={{fontWeight:900}}>ANKH {walletBalance.toFixed(0)}</div></div>
          </div>
          <div style={{margin:"16px 12px 0", display:"flex", flexDirection:"column", gap:8}}>
            <div style={{fontWeight:800, textAlign:"right"}}>{t.progress}</div>
            {TIERS.map(d=>(
              <div key={d.id} onClick={()=>{setSelectedTier(d); setView("levels")}} style={{background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between", cursor:"pointer"}}>
                <div style={{display:"flex", gap:10}}><div style={{width:40, height:40, background:`linear-gradient(180deg,${d.color},#000)`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:d.id==="silver"?"#000":"#fff", border:`1px solid ${d.color}`}}>{d.startId}</div><div><div style={{fontWeight:800}}>{d.n}</div><div style={{fontSize:10, color:"#888"}}>المستويات {d.r}</div></div></div><span>›</span>
              </div>
            ))}
          </div>
        </>
      )}

      {view==="levels" && (
        <>
          <div style={{padding:16, display:"flex", gap:10, alignItems:"center"}}>
            <button onClick={()=>setView("tiers")} style={{background:"#1A1A1A", width:36, height:36, borderRadius:20, border:"1px solid #333", color:"#fff"}}>‹</button>
            <div style={{textAlign:"center", flex:1}}><div style={{fontWeight:900}}>{selectedTier.n} - {selectedTier.r}</div><div style={{fontSize:11, color:selectedTier.color}}>استكشف {selectedTier.r} - ANKH</div></div>
            <div style={{width:36}}></div>
          </div>
          <div style={{display:"flex", gap:8, overflowX:"auto", padding:"0 12px 10px"}}>
            {TIERS.map(tier=>(
              <button key={tier.id} onClick={()=>setSelectedTier(tier)} style={{minWidth:75, background: selectedTier.id===tier.id ? tier.color : "#12121A", borderRadius:10, padding:8, border:`1px solid ${tier.color}`, color: selectedTier.id===tier.id ? (tier.id==="silver"?"#000":"#fff") : "#fff", fontSize:11, fontWeight:800}}>{tier.n}<div style={{fontSize:9}}>{tier.r}</div></button>
            ))}
          </div>
          <div style={{margin:"0 12px", background:"#12121A", borderRadius:12, overflow:"hidden", border:"1px solid #222", maxHeight:600, overflowY:"auto"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#888", padding:10, borderBottom:"1px solid #222", background:"#0A0A0A", position:"sticky", top:0}}><span>{t.small}</span><span>{t.reqWallet}</span><span>{t.perDay}</span></div>
            {Array.from({length: selectedTier.end - selectedTier.start + 1}, (_,i)=>{
              const lvl = selectedTier.start + i; const data = getLevelData(lvl);
              return (
                <div key={lvl} style={{display:"flex", justifyContent:"space-between", padding:"10px", borderBottom:"1px solid #222", background: lvl===level?"rgba(250,204,21,0.1)":"transparent"}}>
                  <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:26, height:26, background:`linear-gradient(180deg,${selectedTier.color},#000)`, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:selectedTier.id==="silver"?"#000":"#fff"}}>{lvl}</div><span style={{fontSize:12}}>{lvl}</span></div>
                  <div style={{fontSize:12}}>{data.req.toLocaleString()} ANKH</div>
                  <div style={{fontSize:12, color:selectedTier.color, textAlign:"center"}}>{data.daily.toLocaleString()}<div style={{fontSize:9, color:"#888"}}>{data.hourly}/h</div></div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0F0F14", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
        {[
          {id:"home", view:"main", n:t.main, ic:"🏠"},
          {id:"mining", view:"mining", n:t.miningTab, ic:"⛏️"},
          {id:"market", view:"market", n:t.market, ic:"⇄"},
          {id:"friends", view:"main", n:t.friends, ic:"👥"},
          {id:"wallet", view:"main", n:t.wallet, ic:"🗄️"},
        ].map(d=>(
          <button key={d.id} onClick={()=>{ setTab(d.id); setView(d.view as any); }} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: (tab===d.id) ? "#FACC15" : "#666"}}>
            <span style={{fontSize:18}}>{d.ic}</span><span style={{fontSize:9, marginTop:2}}>{d.n}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Page(){
  return (
    <TonConnectUIProvider manifestUrl="https://ankh-mining.vercel.app/tonconnect-manifest.json">
      <AnkhInner />
    </TonConnectUIProvider>
  )
}
