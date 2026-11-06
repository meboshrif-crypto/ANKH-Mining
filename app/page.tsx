"use client";
import { useState, useEffect } from "react";
import {
  TonConnectUIProvider,
  useTonConnectUI,
  useTonWallet
} from "@tonconnect/ui-react";

const TREASURY_WALLET = "UQBpa_tNmxOcfzdVWQm_9oJVvhZ673Y9rVbpDHi8WPXj4r3Y";
const MIN_WITHDRAW = 10000;
const MIN_RESERVE = 2500;
const REQUIRED_DAYS = 7;
const STONFI_LINK = "https://app.ston.fi/swap?ft=TON&tt=ANKH";
const BOT_TOKEN = "9221887475:AAGtDhN-xB3pHH6V8zsgzLVtPA_-s9BKro4";
const CHANNELS = {
  news: { username: "@ANKH_News", link: "https://t.me/ANKH_News", reward: 500 },
  withdraw: { username: "@ANKH_withdraws", link: "https://t.me/ANKH_withdraws", reward: 500 },
};
const DAILY_REWARDS = [8, 12, 20, 32, 48, 68, 125];

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

function rawToFriendly(raw: string): string {
  if (!raw) return "";
  if (!raw.includes(":")) return raw;
  try {
    const [wcStr, hex] = raw.split(":");
    const wc = parseInt(wcStr);
    const hash = new Uint8Array((hex.match(/.{1,2}/g) || []).map(b=>parseInt(b,16)));
    const bytes = new Uint8Array(34);
    bytes[0] = 0x11; bytes[1] = wc; bytes.set(hash, 2);
    let crc = 0;
    for (let i=0;i<34;i++){ crc ^= bytes[i] << 8; for(let j=0;j<8;j++){ if(crc & 0x8000) crc = ((crc<<1)^0x1021)&0xFFFF; else crc = (crc<<1)&0xFFFF; } }
    const full = new Uint8Array(36); full.set(bytes,0); full[34]=(crc>>8)&0xFF; full[35]=crc&0xFF;
    let bin=""; for(let i=0;i<full.length;i++) bin+=String.fromCharCode(full[i]);
    return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_');
  } catch { return raw; }
}
function formatAddress(addr: string) {
  if (!addr) return "";
  const f = rawToFriendly(addr);
  return f.slice(0,6) + "..." + f.slice(-6);
}

function AnkhInner() {
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(1);
  const [view, setView] = useState<"main" | "tiers" | "levels" | "mining" | "market" | "tasks">("main");
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState("ar");
  const [showLang, setShowLang] = useState(false);
  const [lastMine, setLastMine] = useState(0);
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [tonAmount, setTonAmount] = useState("1");
  const [ankhPrice] = useState(0.01815);
  const [marketTab, setMarketTab] = useState<"buy" | "history">("buy");
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const isConnected = !!wallet;
  const [inviteCode, setInviteCode] = useState("7956189802");
  const [friends, setFriends] = useState<any[]>([]);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [walletView, setWalletView] = useState<"main"|"withdraw">("main");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [walletConnectedAt, setWalletConnectedAt] = useState<number>(0);
  
  // === TASKS SYSTEM - FIXED TYPES ===
  const [dailyStreak, setDailyStreak] = useState(0);
  const [lastDailyClaim, setLastDailyClaim] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [verifying, setVerifying] = useState<string | null>(null);

  const [onChainAnkh, setOnChainAnkh] = useState(0);
  const [isVerifiedHuman, setIsVerifiedHuman] = useState(false);
  const [nowTick, setNowTick] = useState(Date.now());

  const t = TRANSLATIONS[lang];
  const getReq = (l: number) => getLevelData(l).req;
  const getDaily = (l: number) => getLevelData(l).daily;
  const getHourly = (l: number) => getLevelData(l).hourly;
  const ankhAmount = tonAmount ? (Number(tonAmount) / ankhPrice) : 0;

  // === DAILY CLAIM - يروح للرصيد المعدن تلقائيا + 24 ساعة ===
  const handleDailyClaim = () => {
    const now = Date.now();
    if (lastDailyClaim && now - lastDailyClaim < 86400000) return;
    const isConsecutive = lastDailyClaim && now - lastDailyClaim < 172800000;
    const newStreak = isConsecutive ? dailyStreak + 1 : 1;
    const rewardIndex = Math.min(newStreak - 1, DAILY_REWARDS.length - 1);
    const reward = DAILY_REWARDS[rewardIndex] * 100;
    setDailyStreak(newStreak);
    setLastDailyClaim(now);
    const newBal = walletBalance + reward;
    setWalletBalance(newBal);
    localStorage.setItem("ankh_wallet", String(newBal));
    localStorage.setItem("ankh_daily_streak", String(newStreak));
    localStorage.setItem("ankh_last_daily", String(now));
  };

  const handleVerifyTask = async (taskId: string, link?: string) => {
    if(link) window.open(link, "_blank");
    setVerifying(taskId);
    setTimeout(() => {
      if (!completedTasks.includes(taskId)) {
        const newTasks = [...completedTasks, taskId];
        setCompletedTasks(newTasks);
        localStorage.setItem("ankh_tasks", JSON.stringify(newTasks));
        let reward = 5000;
        if(taskId === "news" || taskId === "withdraw") reward = 500;
        const newBal = walletBalance + reward;
        setWalletBalance(newBal);
        localStorage.setItem("ankh_wallet", String(newBal));
      }
      setVerifying(null);
    }, 1200);
  };

  const isTaskDone = (id: string) => completedTasks.includes(id);
  const canClaimDaily = !lastDailyClaim || Date.now() - lastDailyClaim >= 86400000;

  useEffect(()=>{ const id=setInterval(()=>setNowTick(Date.now()), 60000); return ()=>clearInterval(id); },[]);

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
    const wca = localStorage.getItem("ankh_wallet_connected_at");
    if(wca) setWalletConnectedAt(Number(wca));
    const wds = localStorage.getItem("ankh_withdrawals"); if(wds){ try{ setWithdrawals(JSON.parse(wds)); }catch{} }
    const oc = localStorage.getItem("ankh_onchain"); if(oc) setOnChainAnkh(Number(oc));
    const vh = localStorage.getItem("ankh_verified"); if(vh==="1") setIsVerifiedHuman(true);
    const ds = localStorage.getItem("ankh_daily_streak"); if(ds) setDailyStreak(Number(ds));
    const ldc = localStorage.getItem("ankh_last_daily"); if(ldc) setLastDailyClaim(Number(ldc));
    const ct = localStorage.getItem("ankh_tasks"); if(ct){ try{ setCompletedTasks(JSON.parse(ct)); }catch{} }
  },[]);

  useEffect(()=>{
    if(isConnected && !walletConnectedAt){
      const now = Date.now();
      localStorage.setItem("ankh_wallet_connected_at", String(now));
      setWalletConnectedAt(now);
    }
  },[isConnected, walletConnectedAt]);

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
  
  const connectedDays = walletConnectedAt ? Math.floor((nowTick - walletConnectedAt) / (1000*60*60*24)) : 0;
  const displayDays = Math.min(connectedDays, REQUIRED_DAYS);
  const isAgeOk = displayDays >= REQUIRED_DAYS;
  const requiredReserve = withdrawAmount ? Math.max(MIN_RESERVE, Math.floor(Number(withdrawAmount) * 0.25)) : MIN_RESERVE;
  const withdrawFee = withdrawAmount ? Number(withdrawAmount) * 0.05 : 0;
  const willReceive = withdrawAmount ? Number(withdrawAmount) - withdrawFee : 0;
  const hasMinAmount = Number(withdrawAmount) >= MIN_WITHDRAW;
  const hasAppBalance = walletBalance >= Number(withdrawAmount);
  const hasOnChainReserve = onChainAnkh >= requiredReserve;

  const handlePayHumanCheck = async () => {
    if(!isConnected){ tonConnectUI.openModal(); return; }
    try{
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now()/1000)+600,
        messages: [{ address: TREASURY_WALLET, amount: "50000000" }]
      });
      setIsVerifiedHuman(true);
      localStorage.setItem("ankh_verified","1");
      alert("✅ تم التحقق بنجاح");
    }catch(e){ alert("فشل التحقق - حاول مرة اخرى"); }
  };

  const handleWithdraw = async () => {
    if(!isConnected) return alert("اربط المحفظة الاول!");
    if(!hasMinAmount) return alert(`الحد الأدنى للسحب ${MIN_WITHDRAW.toLocaleString()} ANKH`);
    if(!hasAppBalance) return alert("رصيد التطبيق غير كافي");
    if(!hasOnChainReserve) return alert(`لازم يكون في محفظتك المربوطة ${requiredReserve.toLocaleString()} ANKH على البلوكتشين. رصيدك الحالي: ${onChainAnkh}`);
    if(!isAgeOk) return alert(`عمر الربط ${displayDays} من ${REQUIRED_DAYS} أيام - لازم تكمل 7 أيام`);
    if(!isVerifiedHuman){
      if(!confirm("لازم التحقق من المحفظة أولاً بدفع 0.05 TON. موافق؟")) return;
      try{
        await tonConnectUI.sendTransaction({
          validUntil: Math.floor(Date.now()/1000)+600,
          messages: [{ address: TREASURY_WALLET, amount: "50000000" }]
        });
        setIsVerifiedHuman(true); localStorage.setItem("ankh_verified","1");
      }catch{ return alert("لم يتم التحقق"); }
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
  const handleMarketBuy = async () => {
    if(!isConnected){ tonConnectUI.openModal(); return; }
    if(Number(tonAmount) < 1) return alert("الحد الأدنى 1 TON");
    try{
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now()/1000)+600,
        messages: [{ address: TREASURY_WALLET, amount: (Number(tonAmount)*1e9).toString() }]
      });
      const bought = Number(tonAmount) / ankhPrice;
      const newBal = walletBalance + bought;
      setWalletBalance(newBal); localStorage.setItem("ankh_wallet", String(newBal));
      alert(`تم الشراء ${bought.toFixed(2)} ANKH`);
    }catch{ alert("فشل الشراء"); }
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

          {/* === مركز المهام - يفتح صفحة كاملة بدون ايرور === */}
          <div onClick={()=>setView("tasks")} style={{margin:"10px 12px 0", background:"linear-gradient(90deg, #1A1033, #231A4A)", borderRadius:14, padding:12, border:"1px solid #A855F7", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer"}}>
            <div style={{display:"flex", gap:10, alignItems:"center"}}>
              <div style={{width:38, height:38, borderRadius:10, background:"linear-gradient(180deg,#A855F7,#38BDF8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18}}>🎯</div>
              <div><div style={{fontWeight:900, fontSize:13}}>مركز المهام</div><div style={{fontSize:10, color:"#bbb"}}>اكمل المهام واكسب ANKH - {completedTasks.length}/4</div></div>
            </div>
            <div style={{fontSize:16, color:"#A855F7"}}>‹</div>
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
            <div onClick={()=>setView("tiers")} style={{background:"#1A1500", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #FACC15", cursor:"pointer"}}><div style={{fontSize:9, color:"#888"}}>{t.tier}</div><div style={{fontWeight:900, color:"#FACC15"}}>Lv.{level}</div></div>
          </div>
          <div onClick={()=>setView("tiers")} style={{margin:"10px 12px 0", background:"#12121A", borderRadius:12, padding:10, border:"1px solid #222", cursor:"pointer"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11}}><span>ANKH {walletBalance.toFixed(0)} / {nextReq}</span><span>{t.nextLevel} {level+1}</span></div>
            <div style={{height:4, background:"#222", borderRadius:10, marginTop:8}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#FACC15,#22c55e)"}}></div></div>
          </div>
        </>
      )}

      {view==="tasks" && (
  <div style={{padding:"12px 12px 90px", background:"#0B0B14", minHeight:"100vh"}}>
    {/* هيدر */}
    <div style={{display:"flex", gap:10, alignItems:"center", marginBottom:14}}>
      <button onClick={()=>{setView("main"); setTab("home")}} style={{background:"#1A1A2E", width:36, height:36, borderRadius:12, border:"1px solid #333", color:"#fff"}}>‹</button>
      <div style={{flex:1}}>
        <div style={{fontWeight:900, fontSize:18, color:"#fff"}}>المهام والمكافآت 🎯</div>
        <div style={{fontSize:11, color:"#888"}}>استكشف، اكمل، اجمع ANKH</div>
      </div>
    </div>

    {/* احصائيات فوق */}
    <div style={{display:"flex", gap:8, marginBottom:12}}>
      <div style={{flex:1, background:"#151528", padding:12, borderRadius:16, border:"1px solid #222", textAlign:"center"}}>
        <div style={{fontWeight:900, color:"#fff"}}>{(completedTasks||[]).length} / 6</div>
        <div style={{fontSize:10, color:"#888"}}>المكافآت المستلمة</div>
      </div>
      <div style={{flex:1, background:"#151528", padding:12, borderRadius:16, border:"1px solid #222", textAlign:"center"}}>
        <div style={{fontWeight:900, color:"#fff"}}>{canClaimDaily ? 1 : 0}</div>
        <div style={{fontSize:10, color:"#888"}}>جاهزة للاستلام</div>
      </div>
    </div>

    {/* السلسلة اليومية - زي Rifty */}
    <div style={{background:"linear-gradient(180deg,#1C103A,#10101E)", padding:16, borderRadius:20, border:"1px solid #3A2A6A", marginBottom:16, textAlign:"center"}}>
      <div style={{fontSize:11, color:"#aaa"}}>السلسلة اليومية</div>
      <div style={{fontWeight:900, fontSize:28, color:"#fff", marginTop:4}}>اليوم {dailyStreak || 1} / 30</div>
      <div style={{color:"#FACC15", fontWeight:900, marginTop:2}}>+1000 ANKH</div>
      <div style={{fontSize:10, color:"#777", marginTop:4}}>عد كل يوم وافتح المكافأة التالية</div>
      
      <button onClick={handleDailyClaim} disabled={!canClaimDaily} style={{marginTop:14, background: canClaimDaily ? "linear-gradient(90deg,#8B5CF6,#FACC15)" : "#2A2A3A", color: canClaimDaily ? "#000" : "#888", border:"none", padding:"12px 24px", borderRadius:14, fontWeight:900, width:"100%"}}>
        {canClaimDaily ? "⚡ استلام المكافأة" : `تم اليوم ✓ - تعال بعد 24 ساعة`}
      </button>

      {/* الـ 7 ايام زي الصورة */}
      <div style={{display:"flex", gap:6, marginTop:14, overflowX:"auto"}}>
        {[1000,1200,1500,2000,2500,3000,5000].map((r,i)=>(
          <div key={i} style={{flex:1, minWidth:42, background: (dailyStreak||0) > i ? "#FACC15" : "#1E1E32", padding:"8px 4px", borderRadius:10, border:"1px solid #333"}}>
            <div style={{fontSize:8, color: (dailyStreak||0) > i ? "#000" : "#aaa"}}>اليوم {i+1}</div>
            <div style={{fontSize:12, marginTop:2}}>💎</div>
            <div style={{fontSize:10, fontWeight:900, color: (dailyStreak||0) > i ? "#000" : "#fff"}}>{r}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{fontWeight:900, color:"#fff", marginBottom:10}}>اختر مهمتك</div>

    {/* المهام - كلها مرة واحدة ومش هتقع */}
    <div style={{display:"flex", flexDirection:"column", gap:10}}>

      {/* مهمة قناة الاخبار */}
      <div style={{background:"#151528", padding:14, borderRadius:16, border:"1px solid #222"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <div><div style={{fontSize:11, color:"#aaa"}}>مرة واحدة</div><div style={{fontWeight:800, color:"#fff", marginTop:2}}>انضم إلى قناة الأخبار</div><div style={{fontSize:11, color:"#777", marginTop:2}}>انضم إلى القناة الرسمية وسيتحقق البوت</div></div>
          <div style={{fontSize:22}}>📢</div>
        </div>
        <div style={{marginTop:10}}><div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:"#888"}}><span>{(completedTasks||[]).includes("news") ? "1/1" : "0/1"}</span><span>التقدم</span></div><div style={{height:4, background:"#222", borderRadius:10, marginTop:4}}><div style={{height:4, width: (completedTasks||[]).includes("news") ? "100%" : "0%", background:"#8B5CF6", borderRadius:10}}></div></div></div>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:10, alignItems:"center"}}><button onClick={()=>handleVerifyTask("news", "https://t.me/ANKH_News")} style={{background:"#1E1E32", color:"#fff", border:"1px solid #333", padding:"8px 16px", borderRadius:10, fontSize:12}}>{(completedTasks||[]).includes("news") ? "تم" : "تحقق"}</button><div style={{color:"#FACC15", fontWeight:900, fontSize:13}}>+500 ANKH 💎</div></div>
      </div>

      {/* قناة السحب */}
      <div style={{background:"#151528", padding:14, borderRadius:16, border:"1px solid #222"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <div><div style={{fontSize:11, color:"#aaa"}}>مرة واحدة</div><div style={{fontWeight:800, color:"#fff", marginTop:2}}>انضم إلى قناة السحب</div><div style={{fontSize:11, color:"#777", marginTop:2}}>شوف اثباتات السحب الحقيقية</div></div>
          <div style={{fontSize:22}}>💸</div>
        </div>
        <div style={{marginTop:10}}><div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:"#888"}}><span>{(completedTasks||[]).includes("withdraw") ? "1/1" : "0/1"}</span><span>التقدم</span></div><div style={{height:4, background:"#222", borderRadius:10, marginTop:4}}><div style={{height:4, width: (completedTasks||[]).includes("withdraw") ? "100%" : "0%", background:"#8B5CF6", borderRadius:10}}></div></div></div>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:10, alignItems:"center"}}><button onClick={()=>handleVerifyTask("withdraw", "https://t.me/ANKH_withdraws")} style={{background:"#1E1E32", color:"#fff", border:"1px solid #333", padding:"8px 16px", borderRadius:10, fontSize:12}}>{(completedTasks||[]).includes("withdraw") ? "تم" : "تحقق"}</button><div style={{color:"#FACC15", fontWeight:900, fontSize:13}}>+500 ANKH 💎</div></div>
      </div>

      {/* دعوة 3 اصدقاء */}
      <div style={{background:"#151528", padding:14, borderRadius:16, border:"1px solid #222"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <div><div style={{fontSize:11, color:"#aaa"}}>مرة واحدة</div><div style={{fontWeight:800, color:"#fff", marginTop:2}}>ادع 3 أصدقاء نشطين</div><div style={{fontSize:11, color:"#777", marginTop:2}}>ادع اصدقاء نشطين يحققوا شروط التعدين</div></div>
          <div style={{fontSize:22}}>👥</div>
        </div>
        <div style={{marginTop:10}}><div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:"#888"}}><span>{Math.min(friends.length,3)}/3</span><span>التقدم</span></div><div style={{height:4, background:"#222", borderRadius:10, marginTop:4}}><div style={{height:4, width: `${Math.min(friends.length/3*100,100)}%`, background:"#8B5CF6", borderRadius:10}}></div></div></div>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:10, alignItems:"center"}}><button onClick={()=>{ if(friends.length>=3) handleVerifyTask("invite3"); else {setView("main"); setTab("friends");} }} style={{background:"#1E1E32", color:"#fff", border:"1px solid #333", padding:"8px 16px", borderRadius:10, fontSize:12}}>انتقال</button><div style={{color:"#FACC15", fontWeight:900, fontSize:13}}>+50 ANKH 💎</div></div>
      </div>

      {/* بلوغ مستوى 2 */}
      <div style={{background:"#151528", padding:14, borderRadius:16, border:"1px solid #FACC15"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <div><div style={{fontSize:11, color:"#aaa"}}>مرة واحدة</div><div style={{fontWeight:800, color:"#fff", marginTop:2}}>بلوغ مستوى الاحتفاظ 2</div><div style={{fontSize:11, color:"#777", marginTop:2}}>احتفظ بما لا يقل عن 50k في محفظتك للوصول للمستوى 2</div></div>
          <div style={{fontSize:22}}>⭐</div>
        </div>
        <div style={{marginTop:10}}><div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:"#888"}}><span>{dailyStreak >=2 ? "2/2" : `${Math.min(dailyStreak,2)}/2`}</span><span>التقدم</span></div><div style={{height:4, background:"#222", borderRadius:10, marginTop:4}}><div style={{height:4, width: `${Math.min(dailyStreak/2*100,100)}%`, background:"#FACC15", borderRadius:10}}></div></div></div>
        <div style={{display:"flex", justifyContent:"space-between", marginTop:10, alignItems:"center"}}><button onClick={()=>{ if(dailyStreak>=2) handleVerifyTask("level2"); else {setView("main"); setTab("home");} }} style={{background:"#1E1E32", color:"#fff", border:"1px solid #333", padding:"8px 16px", borderRadius:10, fontSize:12}}>انتقال</button><div style={{color:"#FACC15", fontWeight:900, fontSize:13}}>+100 ANKH 💎</div></div>
      </div>

    </div>
  </div>
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
                <div style={{background:"#111", borderRadius:20, padding:"6px 12px", border:"1px solid #333", fontSize:11, alignSelf:"center"}}>🔷 {isConnected ? formatAddress(wallet?.account.address||"") : "غير متصلة"}</div>
              </div>
              {!isConnected ? (
                <button onClick={()=>tonConnectUI.openModal()} style={{marginTop:10, width:"100%", background:"linear-gradient(90deg,#a855f7,#38bdf8)", padding:12, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>ربط المحفظة</button>
              ):(
                <div style={{marginTop:10, fontSize:10, background: isAgeOk ? "rgba(34,197,94,0.15)" : "rgba(250,204,21,0.15)", border:`1px solid ${isAgeOk ? "#22c55e" : "#FACC15"}`, borderRadius:8, padding:6, textAlign:"center", color: isAgeOk ? "#22c55e" : "#FACC15"}}>✅ متصلة - عمر الربط {displayDays} من {REQUIRED_DAYS} يوم {isVerifiedHuman ? " - تم التحقق ✅" : ""}</div>
              )}
              <div style={{marginTop:8, display:"flex", gap:6}}>
                <input type="number" inputMode="numeric" placeholder="محاكاة رصيد البلوكتشين للتجربة" value={onChainAnkh} onChange={e=>{ setOnChainAnkh(Number(e.target.value)); localStorage.setItem("ankh_onchain", e.target.value); }} style={{flex:1, background:"#0a0a0a", border:"1px solid #333", borderRadius:8, padding:8, color:"#fff", fontSize:16}}/>
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
              <div style={{display:"flex", gap:6}}>
                {["الكل","المستلم","المرسل"].map(ti=> <span key={ti} style={{fontSize:10, padding:"4px 8px", borderRadius:12, background: ti==="الكل"?"#a855f7":"#1a1a1a", border:"1px solid #333"}}>{ti}</span>)}
              </div>
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
            <span style={{fontSize:11, color: isConnected ? "#22c55e" : "#ef4444", direction:"ltr"}}>{isConnected ? `✅ ${formatAddress(wallet?.account.address||"")} - ${displayDays} من ${REQUIRED_DAYS}` : "❌ غير متصلة - اربط محفظتك"}</span>
          </div>
          <div style={{margin:"8px 12px", background:"#12121a", borderRadius:14, padding:14, border:"1px solid #333"}}>
            <div style={{fontSize:11, color:"#888"}}>رصيدك في التطبيق المتاح للسحب</div>
            <div style={{fontSize:28, fontWeight:900, marginTop:4}}>{walletBalance.toFixed(2)} <span style={{fontSize:14, color:"#FACC15"}}>ANKH</span></div>
            <div style={{marginTop:12, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <span style={{fontSize:11, color:"#888"}}>المبلغ</span>
              <div style={{display:"flex", gap:6, alignItems:"center"}}>
                <input type="number" inputMode="decimal" value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} placeholder="10000" style={{background:"#0a0a0a", border:"1px solid #333", borderRadius:8, padding:10, width:130, color:"#fff", textAlign:"center", fontSize:16}}/>
                <button onClick={()=>setWithdrawAmount(String(Math.floor(walletBalance)))} style={{background:"#a855f7", border:"none", borderRadius:6, padding:"8px 12px", color:"#fff", fontSize:12, fontWeight:800}}>MAX</button>
              </div>
            </div>
            <div style={{fontSize:10, color:"#888", marginTop:6}}>الحد الادنى {MIN_WITHDRAW.toLocaleString()} ANKH</div>
          </div>
          <div style={{margin:"8px 12px", background:"linear-gradient(180deg,#1a1500,#12121a)", borderRadius:14, padding:12, border:"1px solid #FACC15"}}>
            <div style={{fontSize:11, color:"#888"}}>الرصيد المطلوب الاحتفاظ به في محفظتك المربوطة (على البلوكتشين)</div>
            <div style={{fontSize:18, fontWeight:900, color:"#a855f7", marginTop:4}}>{requiredReserve.toLocaleString()} ANKH</div>
            <div style={{fontSize:11, color:"#ccc", marginTop:6, direction:"ltr", background:"#0a0a0a", padding:8, borderRadius:8, border:"1px solid #222", wordBreak:"break-all"}}>
              {isConnected ? rawToFriendly(wallet?.account.address||"") : "اربط محفظتك لعرض عنوانك - UQ..."}
            </div>
            <div style={{fontSize:10, color: hasOnChainReserve ? "#22c55e" : "#ef4444", marginTop:8, background: hasOnChainReserve ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", padding:8, borderRadius:6, border:`1px solid ${hasOnChainReserve ? "#22c55e" : "#ef4444"}`}}>
              {hasOnChainReserve ? `✅ عندك ${onChainAnkh} ANKH على البلوكتشين - كافي للسحب` : `⚠️ رصيدك على البلوكتشين ${onChainAnkh} - محتاج ${requiredReserve.toLocaleString()} ANKH في نفس المحفظة المربوطة اعلاه`}
            </div>
          </div>
          <div style={{margin:"8px 12px", display:"grid", gap:8}}>
            <div style={{background:"#12121a", borderRadius:12, padding:12, border:`1px solid ${isVerifiedHuman ? "#22c55e" : "#a855f7"}`, display:"flex", gap:10, alignItems:"center"}}>
              <div style={{width:28, height:28, borderRadius:20, background:"#1a1a1a", border:"1px solid #333", display:"flex", alignItems:"center", justifyContent:"center"}}>ℹ️</div>
              <div style={{flex:1}}><div style={{fontSize:11, color:"#ccc"}}>التحقق من المحفظة أولاً - 0.05 TON</div><div style={{fontSize:9, color:"#888"}}>مرة واحدة فقط للتأمين</div></div>
              <button onClick={handlePayHumanCheck} style={{background: isVerifiedHuman ? "#22c55e" : "#a855f7", border:"none", borderRadius:8, padding:"8px 12px", color:"#fff", fontSize:11, fontWeight:800}}>{isVerifiedHuman ? "تم التحقق" : "ادفع 0.05"}</button>
            </div>
            <div style={{background:"#12121a", borderRadius:12, padding:12, border:`1px solid ${isAgeOk ? "#22c55e" : "#FACC15"}`, display:"flex", gap:10, alignItems:"center"}}>
              <div style={{width:28, height:28, borderRadius:20, background:"#1a1a1a", border:"1px solid #333", display:"flex", alignItems:"center", justifyContent:"center"}}>⏱️</div>
              <div style={{flex:1}}>
                <div style={{fontSize:11, color: isAgeOk ? "#22c55e" : "#FACC15"}}>عمر المحفظة {displayDays} من {REQUIRED_DAYS} يوم {isAgeOk ? "✅ مؤهل للسحب" : "⏳"}</div>
                <div style={{height:6, background:"#222", borderRadius:10, marginTop:6}}><div style={{width:`${(displayDays/REQUIRED_DAYS)*100}%`, height:"100%", background: isAgeOk ? "#22c55e" : "#FACC15", borderRadius:10}}></div></div>
              </div>
            </div>
          </div>
          <div style={{margin:"8px 12px", background:"#12121a", borderRadius:14, padding:12, border:"1px solid #333"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span style={{color:"#888"}}>المبلغ المطلوب</span><span>{withdrawAmount || 0} ANKH</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginTop:8}}><span style={{color:"#888"}}>رسوم الخدمة - 5%</span><span style={{color:"#ef4444"}}>-{withdrawFee.toFixed(0)} ANKH</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:14, fontWeight:900, marginTop:10, paddingTop:10, borderTop:"1px solid #333"}}><span>ستستلم</span><span style={{color:"#a855f7"}}>{willReceive.toFixed(0)} ANKH</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11, marginTop:12, color:"#888"}}><span>وقت المعالجة</span><span>1-24 ساعة ⏱️</span></div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:10, marginTop:6, color:"#666"}}><span>رسوم الشبكة</span><span>0.05 TON</span></div>
          </div>
          <div style={{margin:"12px"}}>
            <button onClick={handleWithdraw} style={{width:"100%", background: "linear-gradient(90deg,#a855f7,#38bdf8)", padding:14, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>⚡ تأكيد السحب</button>
            <div style={{fontSize:10, color:"#888", textAlign:"center", marginTop:8}}>راجع جميع التفاصيل قبل التأكيد - عنوانك المربوط هو اللي هيستلم</div>
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
        </>
      )}

      {view==="market" && (
        <div style={{padding:"12px 16px"}}>
          <div style={{borderRadius:16, background:"linear-gradient(180deg, #1A0A2E, #0F0F1A)", border:"1px solid #333", padding:12}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{fontSize:22, fontWeight:900}}>السوق</div>
              <div style={{fontSize:11, color:"#FACC15", border:"1px solid #FACC15", padding:"4px 10px", borderRadius:20}}>ANKH / TON ⇄</div>
            </div>
            <div style={{marginTop:12, background:"rgba(0,0,0,0.5)", borderRadius:12, padding:12, border:"1px solid #222"}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}>
                <a href={STONFI_LINK} target="_blank" style={{color:"#FACC15", fontWeight:800, textDecoration:"none"}}>↗ STON.fi - مبادلة فورية</a>
                <span style={{color:"#888"}}>{isConnected ? formatAddress(wallet?.account.address||"") : "TON Price"}</span>
              </div>
              <div style={{fontSize:26, fontWeight:900, marginTop:8}}>TON {ankhPrice.toFixed(6)}</div>
            </div>
          </div>
          <div style={{display:"flex", gap:8, marginTop:12}}>
            <button onClick={()=>setMarketTab("history")} style={{flex:1, background: marketTab==="history" ? "linear-gradient(90deg,#A855F7,#38BDF8)" : "#12121A", border:"1px solid #222", borderRadius:12, padding:12, color:"#fff", fontWeight:900}}>السجل</button>
            <button onClick={()=>setMarketTab("buy")} style={{flex:1, background: marketTab==="buy" ? "linear-gradient(90deg,#A855F7,#38BDF8)" : "#12121A", border:"1px solid #222", borderRadius:12, padding:12, color:"#fff", fontWeight:900}}>شراء</button>
          </div>
          {marketTab==="buy" && (
            <div style={{marginTop:10, background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222"}}>
              <div style={{background:"#0A0A0A", borderRadius:12, padding:12, border:"1px solid #333", display:"flex", justifyContent:"space-between"}}>
                <input type="number" value={tonAmount} onChange={(e)=>{if(Number(e.target.value)>=1 || e.target.value==="") setTonAmount(e.target.value)}} style={{background:"none", border:"none", color:"#fff", fontSize:16, fontWeight:900, width:120, outline:"none"}} />
                <span style={{color:"#FACC15", fontWeight:800}}>TON</span>
              </div>
              <div style={{background:"#0A0A0A", borderRadius:12, padding:12, border:"1px solid #333", marginTop:12, display:"flex", justifyContent:"space-between"}}>
                <div style={{fontSize:20, fontWeight:900, color:"#5EE9FF"}}>{tonAmount==="" ? "0" : ankhAmount.toFixed(2)}</div>
                <div style={{color:"#A855F7", fontWeight:900}}>ANKH</div>
              </div>
              {isConnected ? (
                <>
                  <button onClick={handleMarketBuy} style={{marginTop:14, width:"100%", background:"linear-gradient(90deg,#A855F7,#38BDF8)", padding:14, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>💰 شراء {ankhAmount.toFixed(0)} ANKH</button>
                  <a href={STONFI_LINK} target="_blank" style={{marginTop:8, display:"block", textAlign:"center", background:"#1a1a1a", border:"1px solid #333", padding:12, borderRadius:12, color:"#FACC15", fontWeight:800, textDecoration:"none"}}>↗ فتح STON.fi</a>
                </>
              ) : (
                <button onClick={()=>tonConnectUI.openModal()} style={{marginTop:14, width:"100%", background:"linear-gradient(90deg,#A855F7,#38BDF8)", padding:14, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>📋 ربط المحفظة للشراء</button>
              )}
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
        <div style={{paddingBottom:20}}>
          <div style={{padding:16, display:"flex", gap:10, alignItems:"center"}}>
            <button onClick={()=>setView("tiers")} style={{background:"#1A1A1A", width:36, height:36, borderRadius:20, border:"1px solid #333", color:"#fff"}}>‹</button>
            <div style={{fontWeight:900}}>{selectedTier.n} - {selectedTier.r}</div>
          </div>
          <div style={{margin:"0 12px", background:"#12121A", borderRadius:12, overflow:"hidden", border:"1px solid #222"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#888", padding:10, borderBottom:"1px solid #222", background:"#0A0A0A"}}><span>{t.small}</span><span>{t.reqWallet}</span><span>{t.perDay}</span></div>
            {Array.from({length: selectedTier.end - selectedTier.start + 1}, (_,i)=>{
              const lvl = selectedTier.start + i; const data = getLevelData(lvl);
              return (
                <div key={lvl} style={{display:"flex", justifyContent:"space-between", padding:"10px", borderBottom:"1px solid #222", fontSize:12}}>
                  <span>Lv.{lvl}</span><span>{data.req.toLocaleString()} ANKH</span><span style={{color:selectedTier.color}}>{data.daily.toLocaleString()}</span>
                </div>
              )
            })}
          </div>
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
          <button key={d.id} onClick={()=>{ setTab(d.id); setView(d.view as any); if(d.id!=="wallet") setWalletView("main"); }} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: (tab===d.id && view!=="tasks") ? "#FACC15" : "#666"}}>
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
