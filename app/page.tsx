"use client";
import { useState, useEffect } from "react";
import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const TREASURY_WALLET = "UQBpa_tNmxOcfzdVWQm_9oJVvhZ673Y9rVbpDHi8WPXj4r3Y";

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
  const [inviteCode, setInviteCode] = useState("7956189802");
  const [friends, setFriends] = useState<any[]>([]);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [walletView, setWalletView] = useState<"main"|"withdraw">("main");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [walletCreatedAt, setWalletCreatedAt] = useState<number>(Date.now());
  const [onChainAnkh, setOnChainAnkh] = useState(0);
  const [isVerifiedHuman, setIsVerifiedHuman] = useState(false);

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
    const code = localStorage.getItem("ankh_invite_code");
    if(code){ setInviteCode(code); } else { const newCode = Math.floor(1000000000 + Math.random()*9000000000).toString(); localStorage.setItem("ankh_invite_code", newCode); setInviteCode(newCode); }
    const savedFriends = localStorage.getItem("ankh_friends");
    if(savedFriends){ try{ setFriends(JSON.parse(savedFriends)); }catch{} }
    const refEarn = localStorage.getItem("ankh_ref_earn");
    if(refEarn) setReferralEarnings(Number(refEarn));
    const wc = localStorage.getItem("ankh_wallet_created");
    if(wc){ setWalletCreatedAt(Number(wc)); } else { localStorage.setItem("ankh_wallet_created", String(now)); setWalletCreatedAt(now); }
    const wds = localStorage.getItem("ankh_withdrawals"); if(wds){ try{ setWithdrawals(JSON.parse(wds)); }catch{} }
    const oc = localStorage.getItem("ankh_onchain"); if(oc) setOnChainAnkh(Number(oc));
    const vh = localStorage.getItem("ankh_verified"); if(vh==="1") setIsVerifiedHuman(true);
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
  const walletAgeDays = Math.floor((Date.now() - walletCreatedAt) / (1000*60*60*24));
  const requiredReserve = withdrawAmount ? Number(withdrawAmount) * 0.25 : 0;
  const withdrawFee = withdrawAmount ? Number(withdrawAmount) * 0.05 : 0;
  const willReceive = withdrawAmount ? Number(withdrawAmount) - withdrawFee : 0;
  const hasMinAmount = Number(withdrawAmount) >= 10000;
  const hasAppBalance = walletBalance >= Number(withdrawAmount);
  const hasOnChainReserve = onChainAnkh >= requiredReserve;
  const isAgeOk = walletAgeDays >= 30;

  const handlePayHumanCheck = async () => {
    if(!isConnected){ tonConnectUI.openModal(); return; }
    try{
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now()/1000)+600,
        messages: [{ address: TREASURY_WALLET, amount: "50000000" }]
      });
      setIsVerifiedHuman(true);
      localStorage.setItem("ankh_verified","1");
      alert("✅ تم التحقق - 0.05 TON وصلت للخزينة");
    }catch(e){ alert("فشل الدفع - لازم تدفع 0.05 TON للتحقق"); }
  };

  const handleWithdraw = async () => {
    if(!isConnected) return alert("اربط المحفظة الاول!");
    if(!hasMinAmount) return alert("الحد الأدنى للسحب 10,000 ANKH");
    if(!hasAppBalance) return alert("رصيد التطبيق غير كافي");
    if(!hasOnChainReserve) return alert(`لازم يكون في محفظتك المربوطة ${requiredReserve.toLocaleString()} ANKH على البلوكتشين (25%). رصيدك الحالي على البلوكتشين: ${onChainAnkh}`);
    if(!isAgeOk) return alert(`المحفظة عمرها ${walletAgeDays} يوم - لازم 30 يوم او يكون معاك Telegram Premium او عملية على STON.fi`);
    if(!isVerifiedHuman){
      if(!confirm("لازم تدفع 0.05 TON رسوم إثبات بشري للخزينة. موافق؟")) return;
      try{
        await tonConnectUI.sendTransaction({
          validUntil: Math.floor(Date.now()/1000)+600,
          messages: [{ address: TREASURY_WALLET, amount: "50000000" }]
        });
        setIsVerifiedHuman(true); localStorage.setItem("ankh_verified","1");
      }catch{ return alert("لم يتم دفع 0.05 TON"); }
    }
    const newW = { id: Date.now(), amount: Number(withdrawAmount), fee: withdrawFee, receive: willReceive, date: new Date().toLocaleDateString("ar-EG"), status: "يعالج" };
    const updated = [newW, ...withdrawals];
    setWithdrawals(updated); localStorage.setItem("ankh_withdrawals", JSON.stringify(updated));
    const newBal = walletBalance - Number(withdrawAmount);
    setWalletBalance(newBal); localStorage.setItem("ankh_wallet", String(newBal));
    setWithdrawAmount("");
    alert(`تم تقديم الطلب! سيصلك ${willReceive.toFixed(0)} ANKH خلال 1-24 ساعة`);
    setWalletView("main");
    setTimeout(()=>{
      const done = updated.map(w=> w.id===newW.id ? {...w, status:"تم"}: w);
      setWithdrawals(done); localStorage.setItem("ankh_withdrawals", JSON.stringify(done));
    }, 15000);
  };
  
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

      {view==="main" && tab==="wallet" && walletView==="main" && (
        <div style={{padding:"0 0 20px"}}>
          <div style={{margin:"8px 12px", borderRadius:16, overflow:"hidden", position:"relative", background:"linear-gradient(180deg,#1a0a3a,#0a0a1a)", border:"1px solid #222", minHeight:140}}>
            <div style={{position:"absolute", inset:0, background:"radial-gradient(circle at 30% 50%, #a855f7 0%, transparent 50%), radial-gradient(circle at 70% 50%, #38bdf8 0%, transparent 50%)", opacity:0.5}}/>
            <div style={{position:"relative", padding:14}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{fontSize:18, fontWeight:900}}>المحفظة</div>
                <div style={{fontSize:10, color:"#888"}}>جميع اصولك في مكان واحد</div>
              </div>
              <div style={{marginTop:14, background:"rgba(0,0,0,0.6)", borderRadius:12, padding:10, border:"1px solid #333", display:"flex", justifyContent:"space-between"}}>
                <div><div style={{fontSize:10, color:"#888"}}>الرصيد على البلوكتشين</div><div style={{fontSize:20, fontWeight:900}}>{onChainAnkh.toFixed(2)} <span style={{fontSize:11, color:"#FACC15"}}>ANKH</span></div></div>
                <div style={{background:"#111", borderRadius:20, padding:"6px 12px", border:"1px solid #333", fontSize:11, alignSelf:"center"}}>🔷 {isConnected ? wallet?.account.address.slice(0,6)+"..." : "غير متصلة"}</div>
              </div>
              {!isConnected ? (
                <button onClick={()=>tonConnectUI.openModal()} style={{marginTop:10, width:"100%", background:"linear-gradient(90deg,#a855f7,#38bdf8)", padding:12, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>ربط المحفظة</button>
              ):(
                <div style={{marginTop:10, fontSize:10, background:"rgba(34,197,94,0.1)", border:"1px solid #22c55e", borderRadius:8, padding:6, textAlign:"center", color:"#22c55e"}}>✅ متصلة - عمرها {walletAgeDays} يوم {isVerifiedHuman ? " - موثقة ✅" : " - غير موثقة"}</div>
              )}
              <div style={{marginTop:8, display:"flex", gap:6}}>
                <input type="number" placeholder="محاكاة رصيد البلوكتشين ANKH للتجربة" value={onChainAnkh} onChange={e=>{ setOnChainAnkh(Number(e.target.value)); localStorage.setItem("ankh_onchain", e.target.value); }} style={{flex:1, background:"#0a0a0a", border:"1px solid #333", borderRadius:8, padding:6, color:"#fff", fontSize:10}}/>
              </div>
            </div>
          </div>

          <div style={{margin:"8px 12px", background:"#12121a", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
            <div><div style={{fontSize:10, color:"#888"}}>الرصيد المعدن (في التطبيق)</div><div style={{fontWeight:900, fontSize:18}}>{walletBalance.toFixed(4)} ANKH</div></div>
            <div style={{fontSize:18}}>💾</div>
          </div>

          <div style={{margin:"8px 12px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
            <button onClick={()=>{ setTab("market"); setView("market"); }} style={{background:"linear-gradient(90deg,#a855f7,#d946ef)", padding:14, borderRadius:12, border:"none", color:"#fff", fontWeight:800}}>+ شراء</button>
            <button onClick={()=>setWalletView("withdraw")} style={{background:"#1e293b", padding:14, borderRadius:12, border:"1px solid #334155", color:"#fff", fontWeight:800}}>سحب ANKH ⬆️</button>
          </div>

          <div style={{margin:"12px 12px", background:"#12121a", borderRadius:14, border:"1px solid #222"}}>
            <div style={{padding:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{fontWeight:800, fontSize:13}}>النشاط الأخير</div>
            </div>
            {withdrawals.length===0 ? (
              <div style={{textAlign:"center", padding:30, color:"#666"}}>
                <div style={{fontSize:30}}>🕒</div><div style={{fontSize:12, marginTop:8}}>ستظهر معاملاتك هنا<br/>يعالج = قيد المعالجة 1-24 ساعة<br/>تم = وصلت</div>
              </div>
            ): withdrawals.map((w,i)=>(
              <div key={i} style={{padding:12, borderTop:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
                <div><div style={{fontSize:12, fontWeight:800}}>سحب {w.amount} ANKH → {w.receive} </div><div style={{fontSize:10, color:"#888"}}>{w.date} - رسم 5% = {w.fee}</div></div>
                <div style={{fontSize:11, padding:"4px 10px", borderRadius:20, background: w.status==="يعالج"?"rgba(250,204,21,0.15)":"rgba(34,197,94,0.15)", color: w.status==="يعالج"?"#FACC15":"#22c55e", border:`1px solid ${w.status==="يعالج"?"#FACC15":"#22c55e"}`, height:"fit-content"}}>{w.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view==="main" && tab==="wallet" && walletView==="withdraw" && (
        <div style={{padding:"0 0 20px"}}>
          <div style={{padding:12, display:"flex", alignItems:"center", gap:10}}>
            <button onClick={()=>setWalletView("main")} style={{width:32, height:32, borderRadius:20, background:"#1a1a1a", border:"1px solid #333", color:"#fff"}}>←</button>
            <div><div style={{fontWeight:900}}>سحب ANKH</div><div style={{fontSize:10, color:"#888"}}>انقل مكافآتك الى محفظتك - على البلوكتشين</div></div>
          </div>

          <div style={{margin:"8px 12px", background:"#12121a", borderRadius:12, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
            <span style={{fontSize:11, color:"#888"}}>حالة المحفظة</span>
            <span style={{fontSize:11, color: isConnected ? "#22c55e" : "#ef4444"}}>{isConnected ? `✅ ${wallet?.account.address.slice(0,6)}... - ${walletAgeDays} يوم` : "❌ غير متصلة"}</span>
          </div>

          <div style={{margin:"8px 12px", background:"#12121a", borderRadius:14, padding:14, border:"1px solid #333"}}>
            <div style={{fontSize:11, color:"#888"}}>رصيدك في التطبيق المتاح للسحب</div>
            <div style={{fontSize:28, fontWeight:900, marginTop:4}}>{walletBalance.toFixed(2)} <span style={{fontSize:14, color:"#FACC15"}}>ANKH</span></div>
            <div style={{marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <span style={{fontSize:11, color:"#888"}}>المبلغ</span>
              <div style={{display:"flex", gap:6, alignItems:"center"}}>
                <input type="number" value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} placeholder="10000" style={{background:"#0a0a0a", border:"1px solid #333", borderRadius:8, padding:8, width:120, color:"#fff", textAlign:"center"}}/>
                <button onClick={()=>setWithdrawAmount(String(Math.floor(walletBalance)))} style={{background:"#a855f7", border:"none", borderRadius:6, padding:"6px 10px", color:"#fff", fontSize:11, fontWeight:800}}>MAX</button>
              </div>
            </div>
            <div style={{fontSize:10, color:"#888", marginTop:6}}>الحد الادنى 10,000 ANKH</div>
          </div>

          <div style={{margin:"8px 12px", background:"linear-gradient(180deg,#1a1500,#12121a)", borderRadius:14, padding:12, border:"1px solid #FACC15"}}>
            <div style={{fontSize:11, color:"#888"}}>الرصيد المطلوب الاحتفاظ به في محفظتك المربوطة (على البلوكتشين)</div>
            <div style={{fontSize:16, fontWeight:900, color:"#a855f7", marginTop:4}}>{requiredReserve.toLocaleString()} ANKH</div>
            <div style={{fontSize:10, color: hasOnChainReserve ? "#22c55e" : "#ef4444", marginTop:6, background: hasOnChainReserve ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", padding:6, borderRadius:6, border:`1px solid ${hasOnChainReserve ? "#22c55e" : "#ef4444"}`}}>
              {hasOnChainReserve ? `✅ عندك ${onChainAnkh} ANKH على البلوكتشين - كافي` : `⚠️ رصيدك على البلوكتشين ${onChainAnkh} - محتاج ${requiredReserve.toLocaleString()} - اشتري من السوق`}
            </div>
          </div>

          <div style={{margin:"8px 12px", display:"grid", gap:8}}>
            <div style={{background:"#12121a", borderRadius:12, padding:12, border:`1px solid ${isVerifiedHuman ? "#22c55e" : "#a855f7"}`, display:"flex", gap:10, alignItems:"center"}}>
              <div style={{width:28, height:28, borderRadius:20, background:"#1a1a1a", border:"1px solid #333", display:"flex", alignItems:"center", justifyContent:"center"}}>ℹ️</div>
              <div style={{flex:1}}><div style={{fontSize:11, color:"#ccc"}}>تحقق بشري - 0.05 TON للخزينة</div><div style={{fontSize:9, color:"#888"}}>{TREASURY_WALLET.slice(0,12)}...</div></div>
              <button onClick={handlePayHumanCheck} style={{background: isVerifiedHuman ? "#22c55e" : "#a855f7", border:"none", borderRadius:8, padding:"6px 10px", color:"#fff", fontSize:10, fontWeight:800}}>{isVerifiedHuman ? "تم" : "ادفع 0.05"}</button>
            </div>
            <div style={{background:"#12121a", borderRadius:12, padding:12, border:`1px solid ${isAgeOk ? "#22c55e" : "#ef4444"}`, display:"flex", gap:10, alignItems:"center"}}>
              <div style={{width:28, height:28, borderRadius:20, background:"#1a1a1a", border:"1px solid #333", display:"flex", alignItems:"center", justifyContent:"center"}}>⏱️</div>
              <div style={{fontSize:11, color: isAgeOk ? "#22c55e" : "#ef4444"}}>عمر المحفظة {walletAgeDays} يوم - {isAgeOk ? "✅ مؤهل" : "❌ يلزم 30 يوم او Premium او تداول STON.fi"}</div>
            </div>
          </div>

          <div style={{margin:"8px 12px", background:"#12121a", borderRadius:14, padding:12, border:"1px solid #333"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span style={{color:"#888"}}>المبلغ المطلوب</span><span>{withdrawAmount || 0} ANKH</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginTop:8}}><span style={{color:"#888"}}>رسوم الخدمة - 5%</span><span style={{color:"#ef4444"}}>-{withdrawFee.toFixed(0)} ANKH</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:14, fontWeight:900, marginTop:10, paddingTop:10, borderTop:"1px solid #333"}}><span>ستستلم</span><span style={{color:"#a855f7"}}>{willReceive.toFixed(0)} ANKH</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11, marginTop:12, color:"#888"}}><span>وقت المعالجة</span><span>1-24 ساعة ⏱️</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:10, marginTop:6, color:"#666"}}><span>رسوم الشبكة</span><span>0.05 TON → خزينة السيولة</span></div>
          </div>

          <div style={{margin:"12px"}}>
            <button onClick={handleWithdraw} style={{width:"100%", background: "linear-gradient(90deg,#a855f7,#38bdf8)", padding:14, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>⚡ تأكيد السحب</button>
            <div style={{fontSize:10, color:"#888", textAlign:"center", marginTop:8}}>راجع جميع التفاصيل قبل التأكيد. الـ 0.05 TON ستذهب الى {TREASURY_WALLET.slice(0,8)}... خزينة السيولة</div>
          </div>
        </div>
      )}

      {view==="main" && tab==="friends" && (
        <div style={{padding:"0 0 20px", background:"#0A0A12"}}>
          <div style={{position:"relative", height:220, overflow:"hidden", background:"linear-gradient(180deg,#1a1033 0%, #0f0a1a 100%)", borderBottom:"1px solid #222"}}>
            <div style={{position:"absolute", inset:0, background:"radial-gradient(ellipse at center top, rgba(168,85,247,0.3), transparent 60%), radial-gradient(ellipse at bottom, rgba(56,189,248,0.2), transparent)"}}></div>
            <div style={{position:"absolute", top:20, left:"50%", transform:"translateX(-50%)", width:140, height:140, borderRadius:"50%", background:"radial-gradient(circle, #a855f7 0%, #1a1033 70%)", boxShadow:"0 0 60px rgba(168,85,247,0.6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:60}}>☥</div>
            <div style={{position:"absolute", bottom:16, left:16, right:16, display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:24, fontWeight:900, lineHeight:1.1}}>ادعُ<br/>واكسب</div>
                <div style={{fontSize:10, color:"#a0a0c0", marginTop:4}}>كون فريقك، تقدموا معاً.</div>
              </div>
              <div style={{textAlign:"left"}}>
                <div style={{display:"flex", gap:6, alignItems:"center"}}><span style={{fontSize:11, color:"#c0c0e0"}}>من تعدين أصدقائك النشطين</span><span style={{fontSize:38, fontWeight:900, color:"#FACC15", lineHeight:1}}>5%</span></div>
              </div>
            </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8, padding:"12px 12px 0"}}>
            <div style={{background:"linear-gradient(180deg,#151525,#0f0f1a)", borderRadius:12, padding:10, border:"1px solid #222", textAlign:"center"}}>
              <div style={{fontSize:10, color:"#888", display:"flex", gap:4, justifyContent:"center"}}>الأصدقاء المدعوون <span>👥</span></div>
              <div style={{fontSize:20, fontWeight:900, color:"#FACC15", marginTop:4}}>{friends.length}</div>
            </div>
            <div style={{background:"linear-gradient(180deg,#151525,#0f0f1a)", borderRadius:12, padding:10, border:"1px solid #222", textAlign:"center"}}>
              <div style={{fontSize:10, color:"#888", display:"flex", gap:4, justifyContent:"center"}}>يعدنون الآن <span>👤</span></div>
              <div style={{fontSize:20, fontWeight:900, color:"#22c55e", marginTop:4}}>0</div>
            </div>
            <div style={{background:"linear-gradient(180deg,#151525,#0f0f1a)", borderRadius:12, padding:10, border:"1px solid #222", textAlign:"center"}}>
              <div style={{fontSize:10, color:"#888", display:"flex", gap:4, justifyContent:"center"}}>المكتسب <span>🗄️</span></div>
              <div style={{fontSize:18, fontWeight:900, color:"#A855F7", marginTop:2}}>{referralEarnings.toFixed(2)}<div style={{fontSize:9, color:"#666"}}>ANKH</div></div>
            </div>
          </div>
          <div style={{margin:"12px 12px 0", background:"#151525", borderRadius:12, padding:12, border:"1px solid #222", display:"flex", justifyContent:"center", gap:6, fontSize:12, color:"#888"}}>
            سجل العمولات <span style={{width:18, height:18, borderRadius:10, background:"#222", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10}}>🕒</span>
          </div>
          <div style={{margin:"12px 12px 0", background:"linear-gradient(180deg,#1a1a2e,#12121f)", borderRadius:16, padding:14, border:"1px solid #2a2a4a"}}>
            <div style={{fontSize:13, fontWeight:900, textAlign:"right", marginBottom:10}}>رابط دعوتك</div>
            <div style={{background:"#0A0A14", borderRadius:10, padding:12, border:"1px solid #2a2a4a", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{fontSize:11, color:"#8a8ab0", direction:"ltr", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>https://t.me/ankhcoinbot?startapp=ref_{inviteCode}</div>
              <div style={{minWidth:28, height:28, background:"#1a1a2e", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #333", marginLeft:8}}>📋</div>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:12}}>
              <button onClick={()=>{const link=`https://t.me/ankhcoinbot?startapp=ref_${inviteCode}`; navigator.clipboard.writeText(link); alert("تم نسخ الرابط!");}} style={{background:"#151525", border:"1px solid #2a2a4a", borderRadius:12, padding:12, color:"#c0c0e0", fontWeight:700, fontSize:12, display:"flex", gap:6, justifyContent:"center"}}>انسخ الرابط <span>📋</span></button>
              <button onClick={()=>{const link=`https://t.me/ankhcoinbot?startapp=ref_${inviteCode}`; if(navigator.share){navigator.share({title:"ANKH Mining", text:`تعال عدن معايا! كودي ${inviteCode}`, url:link})} else {window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent("تعال عدن ANKH معايا!")}`,"_blank")}}} style={{background:"linear-gradient(90deg,#A855F7,#38BDF8)", border:"none", borderRadius:12, padding:12, color:"#fff", fontWeight:900, fontSize:12, display:"flex", gap:6, justifyContent:"center"}}>ادعُ أصدقاءك <span>✈️</span></button>
            </div>
          </div>
        </div>
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
          </div>
          <div onClick={()=>setView("tiers")} style={{margin:"10px 12px 0", background:"#12121A", borderRadius:12, padding:10, border:"1px solid #222", cursor:"pointer"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11}}><span>ANKH {walletBalance.toFixed(0)} / {nextReq}</span><span>{t.nextLevel} {level+1}</span></div>
            <div style={{height:4, background:"#222", borderRadius:10, marginTop:8}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#FACC15,#22c55e)"}}></div></div>
          </div>
        </>
      )}

      {view==="market" && (
        <div style={{padding:"12px 16px"}}>
          <div style={{borderRadius:16, background:"linear-gradient(180deg, #1A0A2E, #0F0F1A)", border:"1px solid #333", padding:12}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{fontSize:22, fontWeight:900}}>السوق</div>
              <div style={{fontSize:11, color:"#FACC15", background:"rgba(250,204,21,0.1)", border:"1px solid #FACC15", padding:"4px 10px", borderRadius:20}}>ANKH / TON ⇄</div>
            </div>
            <div style={{marginTop:12, background:"rgba(0,0,0,0.5)", borderRadius:12, padding:12, border:"1px solid #222"}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}>
                <span style={{color:"#FACC15"}}>↗ STON.fi</span>
                <span style={{color:"#888"}}>{isConnected ? wallet?.account.address.slice(0,6)+"..."+wallet?.account.address.slice(-4) : "TON Price"}</span>
              </div>
              <div style={{fontSize:26, fontWeight:900, marginTop:8}}>TON {ankhPrice.toFixed(6)}</div>
            </div>
          </div>
          <div style={{display:"flex", gap:8, marginTop:12}}>
            <button onClick={()=>setMarketTab("history")} style={{flex:1, background: marketTab==="history" ? "linear-gradient(90deg,#A855F7,#38BDF8)" : "#12121A", border:"1px solid #222", borderRadius:12, padding:12, color: marketTab==="history" ? "#fff" : "#666", fontWeight:900}}>السجل</button>
            <button onClick={()=>setMarketTab("buy")} style={{flex:1, background: marketTab==="buy" ? "linear-gradient(90deg,#A855F7,#38BDF8)" : "#12121A", border:"1px solid #222", borderRadius:12, padding:12, color: marketTab==="buy" ? "#fff" : "#666", fontWeight:900}}>شراء</button>
          </div>
          {marketTab==="buy" && (
            <div style={{marginTop:10, background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0A0A0A", borderRadius:12, padding:12, border:"1px solid #333", marginTop:6}}>
                <input type="number" min="1" value={tonAmount} onChange={(e)=>{if(Number(e.target.value)>=1 || e.target.value==="") setTonAmount(e.target.value)}} style={{background:"none", border:"none", color:"#fff", fontSize:22, fontWeight:900, width:120, outline:"none"}} />
                <span style={{color:"#FACC15", fontWeight:800}}>TON</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0A0A0A", borderRadius:12, padding:12, border:"1px solid #333", marginTop:12}}>
                <div style={{fontSize:20, fontWeight:900, color:"#5EE9FF"}}>{tonAmount==="" ? "0.00000000" : ankhAmount.toFixed(8)}</div>
                <div style={{color:"#A855F7", fontWeight:900}}>ANKH</div>
              </div>
              <button onClick={()=>tonConnectUI.openModal()} style={{marginTop:14, width:"100%", background:"linear-gradient(90deg,#A855F7,#38BDF8)", padding:14, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>📋 ربط المحفظة</button>
            </div>
          )}
        </div>
      )}

      {view==="tiers" && (
        <>
          <div style={{padding:16, display:"flex", gap:10, alignItems:"center"}}>
            <button onClick={()=>setView("main")} style={{background:"#1A1A1A", width:36, height:36, borderRadius:20, border:"1px solid #333", color:"#fff"}}>‹</button>
            <div style={{textAlign:"center", flex:1}}><div style={{fontSize:20, fontWeight:900}}>{t.tiersTitle}</div></div>
            <div style={{width:36}}></div>
          </div>
          <div style={{margin:"16px 12px 0", display:"flex", flexDirection:"column", gap:8}}>
            {TIERS.map(d=>(
              <div key={d.id} onClick={()=>{setSelectedTier(d); setView("levels")}} style={{background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between", cursor:"pointer"}}>
                <div style={{display:"flex", gap:10}}><div style={{width:40, height:40, background:`linear-gradient(180deg,${d.color},#000)`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", border:`1px solid ${d.color}`}}>{d.startId}</div><div><div style={{fontWeight:800}}>{d.n}</div><div style={{fontSize:10, color:"#888"}}>المستويات {d.r}</div></div></div><span>›</span>
              </div>
            ))}
          </div>
        </>
      )}

      {view==="levels" && (
        <div style={{margin:"0 12px", background:"#12121A", borderRadius:12, overflow:"hidden", border:"1px solid #222"}}>
          <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#888", padding:10, borderBottom:"1px solid #222", background:"#0A0A0A"}}><span>{t.small}</span><span>{t.reqWallet}</span><span>{t.perDay}</span></div>
          {Array.from({length: 20}, (_,i)=>{
            const lvl = selectedTier.start + i; const data = getLevelData(lvl);
            return (
              <div key={lvl} style={{display:"flex", justifyContent:"space-between", padding:"10px", borderBottom:"1px solid #222"}}>
                <span>{lvl}</span><span>{data.req.toLocaleString()} ANKH</span><span style={{color:selectedTier.color}}>{data.daily.toLocaleString()}</span>
              </div>
            )
          })}
        </div>
      )}

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0F0F14", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
        {[
          {id:"home", view:"main", n:t.main, ic:"🏠"},
          {id:"mining", view:"mining", n:t.miningTab, ic:"⛏️"},
          {id:"market", view:"market", n:t.market, ic:"⇄"},
          {id:"friends", view:"main", n:t.friends, ic:"👥"},
          {id:"wallet", view:"main", n:t.wallet, ic:"🗄️"},
        ].map(d=>(
          <button key={d.id} onClick={()=>{ setTab(d.id); setView(d.view as any); if(d.id!=="wallet") setWalletView("main"); }} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: (tab===d.id) ? "#FACC15" : "#666"}}>
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
