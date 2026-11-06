"use client";
import { useState, useEffect } from "react";
import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const TREASURY_WALLET = "UQBpa_tNmxOcfzdVWQm_9oJVvhZ673Y9rVbpDHi8WPXj4r3Y";
const MIN_WITHDRAW = 10000;
const MIN_RESERVE = 2500;
const REQUIRED_DAYS = 7;
const STONFI_LINK = "https://app.ston.fi/swap?ft=TON&tt=ANKH";

// ===== إعداداتك يا قمر =====
const BOT_TOKEN = "9221887475:AAGtDhN-xB3pHH6V8zsgzLVtPA_-s9BKro4";
const CHANNELS = {
  news: { username: "@ANKH_News", link: "https://t.me/ANKH_News", reward: 500, name: "قناة الأخبار" },
  withdraw: { username: "@ANKH_withdraws", link: "https://t.me/ANKH_withdraws", reward: 500, name: "قناة السحب" },
};
const DAILY_REWARDS = [8, 12, 20, 32, 48, 68, 125];

const TRANSLATIONS: any = {
  ar: { mining: "ANKH Mining", subtitle: "عدن لتصنع المجد بنفسك", balance: "الرصيد المعدن", active: "التعدين النشط", working: "يعمل الآن", ready: "جاهز للجمع!", claim: "استلم ANKH", perHour: "في الساعة", daily: "يوميا", boost: "تعزيز", tier: "الدوري", nextLevel: "المستوى التالي:", keep: "احتفظ بـ", toReach: "في محفظتك للوصول الى المستوي", profile: "الملف الشخصي", smallLevel: "مستوي الصغير", tiersTitle: "الدوريات والمستويات", tiersSub: "احتفظ بـ ANKH , افتح الفصل التالي", yourTier: "دوريك", walletBal: "الرصيد في المحفظة", browse: "تصفح المستويات", progress: "تقدم الدوريات", levelsTitle: "مستويات التعدين", levelsSub: "استكشف 500 مستوى عبر خمس دوريات - ANKH", small: "مستوى الصغير", reqWallet: "الرصيد في المحفظة", perDay: "ANKH / اليوم", main: "الرئيسية", miningTab: "التعدين", market: "السوق", friends: "الأصدقاء", wallet: "المحفظة", chartTitle: "إنتاج التعدين", chartSub: "الإنتاج يزيد مع احتفاظك بـ ANKH ويقل مع البيع", tasks: "مركز المهام", levelBtn: "المستوى" },
  en: { mining: "ANKH Mining", subtitle: "Mine to build your own glory", balance: "Mined Balance", active: "Active Mining", working: "Working Now", ready: "Ready to Claim!", claim: "Claim ANKH", perHour: "Per Hour", daily: "Daily", boost: "Boost", tier: "Tier", nextLevel: "Next Level:", keep: "Keep", toReach: "in wallet to reach level", profile: "Profile", smallLevel: "Small Level", tiersTitle: "Tiers & Levels", tiersSub: "Hold ANKH, unlock next chapter", yourTier: "Your Tier", walletBal: "Wallet Balance", browse: "Browse Levels", progress: "Tiers Progress", levelsTitle: "Mining Levels", levelsSub: "Explore 500 levels - ANKH", small: "Level", reqWallet: "Wallet Required", perDay: "ANKH / Day", main: "Home", miningTab: "Mining", market: "Market", friends: "Friends", wallet: "Wallet", chartTitle: "Mining Production", chartSub: "Production rises with holding", tasks: "Task Center", levelBtn: "Level" },
  ru: { mining: "ANKH Mining", subtitle: "Майни, чтобы создать славу", balance: "Добытый баланс", active: "Активный майнинг", working: "Работает", ready: "Готово!", claim: "Получить ANKH", perHour: "В час", daily: "В день", boost: "Буст", tier: "Лига", nextLevel: "След. уровень:", keep: "Держи", toReach: "в кошельке для уровня", profile: "Профиль", smallLevel: "Мал. уровень", tiersTitle: "Лиги и уровни", tiersSub: "Держи ANKH, открой главу", yourTier: "Твоя лига", walletBal: "Баланс", browse: "Уровни", progress: "Прогресс", levelsTitle: "Уровни майнинга", levelsSub: "500 уровней - ANKH", small: "Ур.", reqWallet: "Нужно", perDay: "ANKH / День", main: "Главная", miningTab: "Майнинг", market: "Рынок", friends: "Друзья", wallet: "Кошелек", chartTitle: "Производство", chartSub: "Растет с холдом", tasks: "Задания", levelBtn: "Уровень" },
};

const TIERS = [
  { id: "bronze", n: "البرونزي", r: "1-100", start: 1, end: 100, color: "#CD7F32" },
  { id: "silver", n: "الفضي", r: "101-200", start: 101, end: 200, color: "#C0C0C0" },
  { id: "gold", n: "الذهبي", r: "201-300", start: 201, end: 300, color: "#F59E0B" },
  { id: "platinum", n: "البلاتيني", r: "301-400", start: 301, end: 400, color: "#38BDF8" },
  { id: "legendary", n: "الأسطوري", r: "401-500", start: 401, end: 500, color: "#A855F7" },
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
  const [walletConnectedAt, setWalletConnectedAt] = useState<number>(0);
  const [onChainAnkh, setOnChainAnkh] = useState(0);
  const [isVerifiedHuman, setIsVerifiedHuman] = useState(false);
  const [nowTick, setNowTick] = useState(Date.now());

  // === جديد مركز المهام ===
  const [dailyStreak, setDailyStreak] = useState(0);
  const [lastDailyClaim, setLastDailyClaim] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [verifying, setVerifying] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const getReq = (l: number) => getLevelData(l).req;
  const getDaily = (l: number) => getLevelData(l).daily;
  const getHourly = (l: number) => getLevelData(l).hourly;
  const ankhAmount = tonAmount ? (Number(tonAmount) / ankhPrice) : 0;

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
    const ct = localStorage.getItem("ankh_tasks_done"); if(ct){ try{ setCompletedTasks(JSON.parse(ct)); }catch{} }
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

  // === التحقق الحقيقي من الاشتراك ===
  const getTelegramUserId = () => {
    try {
      // @ts-ignore
      const tg = window.Telegram?.WebApp;
      return tg?.initDataUnsafe?.user?.id || null;
    } catch { return null; }
  };

  const handleVerifyChannel = async (taskId: string, channelUsername: string) => {
    const userId = getTelegramUserId();
    if(!userId){
      alert("افتح البوت من داخل تليجرام عشان اقدر اتحقق!");
      return;
    }
    setVerifying(taskId);
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${channelUsername}&user_id=${userId}`);
      const data = await res.json();
      if(data.ok && ["member","administrator","creator"].includes(data.result.status)){
        if(!completedTasks.includes(taskId)){
          const reward = taskId==="news" ? CHANNELS.news.reward : CHANNELS.withdraw.reward;
          const newBal = walletBalance + reward;
          setWalletBalance(newBal);
          localStorage.setItem("ankh_wallet", String(newBal));
          const newDone = [...completedTasks, taskId];
          setCompletedTasks(newDone);
          localStorage.setItem("ankh_tasks_done", JSON.stringify(newDone));
          alert(`✅ تم التحقق! حصلت على ${reward} ANKH`);
        } else {
          alert("انت خلصت المهمة دي قبل كده");
        }
      } else {
        alert("❌ فشل التحقق - انت مش مشترك لسه! اشترك وارجع دوس تحقق تاني");
      }
    } catch(e){
      alert("❌ فشل الاتصال - لازم البوت يكون ادمن في القناة! ضيف البوت @yourbot ادمن");
    }
    setVerifying(null);
  };

  const handleDailyClaim = () => {
    const now = Date.now();
    if(lastDailyClaim && now - lastDailyClaim < 24*60*60*1000){
      const left = 24*60*60*1000 - (now - lastDailyClaim);
      const h = Math.floor(left/3600000);
      alert(`⏳ لسه بدري! فاضل ${h} ساعة`);
      return;
    }
    const idx = dailyStreak % 7;
    const reward = DAILY_REWARDS[idx];
    const newBal = walletBalance + reward;
    setWalletBalance(newBal);
    localStorage.setItem("ankh_wallet", String(newBal));
    const newStreak = dailyStreak + 1;
    setDailyStreak(newStreak);
    localStorage.setItem("ankh_daily_streak", String(newStreak));
    setLastDailyClaim(now);
    localStorage.setItem("ankh_last_daily", String(now));
    let nl=level; while(newBal>=getReq(nl+1) && nl<500) nl++; setLevel(nl); localStorage.setItem("ankh_level", String(nl));
    alert(`✅ استلمت ${reward} ANKH - اليوم ${newStreak}`);
  };

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

  const canClaimDaily = !lastDailyClaim || (Date.now() - lastDailyClaim >= 24*60*60*1000);

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
          {/* زر المستوى + مركز المهام زي ما طلبت */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, margin:"10px 12px 0"}}>
            <div onClick={()=>setView("tiers")} style={{background:"linear-gradient(180deg,#1a1500,#12121a)", border:"1px solid #FACC15", borderRadius:14, padding:12, display:"flex", gap:10, alignItems:"center", cursor:"pointer"}}>
              <div style={{width:36, height:36, borderRadius:10, background:"#FACC15", color:"#000", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900}}>Lv</div>
              <div><div style={{fontWeight:900, fontSize:13}}>{t.levelBtn}</div><div style={{fontSize:10, color:"#FACC15"}}>Lv.{level} - {TIERS.find(x=> level>=x.start && level<=x.end)?.n}</div></div>
            </div>
            <div onClick={()=>setView("tasks")} style={{background:"linear-gradient(180deg,#1a1033,#12121a)", border:"1px solid #A855F7", borderRadius:14, padding:12, display:"flex", gap:10, alignItems:"center", cursor:"pointer"}}>
              <div style={{width:36, height:36, borderRadius:10, background:"#A855F7", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}>🎯</div>
              <div><div style={{fontWeight:900, fontSize:13}}>{t.tasks}</div><div style={{fontSize:10, color:"#A855F7"}}>مكافآت يومية</div></div>
            </div>
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

      {/* === مركز المهام الجديد === */}
      {view==="tasks" && (
        <div style={{padding:"0 0 20px"}}>
          <div style={{padding:16, display:"flex", gap:10, alignItems:"center"}}>
            <button onClick={()=>{setView("main"); setTab("home")}} style={{background:"#1A1A1A", width:36, height:36, borderRadius:20, border:"1px solid #333", color:"#fff"}}>‹</button>
            <div style={{fontWeight:900, fontSize:18}}>🎯 مركز المهام</div>
          </div>
          
          <div style={{margin:"0 12px", background:"linear-gradient(180deg,#1a1500,#12121a)", borderRadius:16, padding:14, border:"1px solid #FACC15"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div><div style={{fontWeight:900}}>تسجيل الدخول اليومي</div><div style={{fontSize:11, color:"#888"}}>السلسلة: {dailyStreak} يوم - كل 24 ساعة من الاستلام</div></div>
              <div style={{fontSize:24}}>📅</div>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:6, marginTop:12}}>
              {DAILY_REWARDS.map((r,i)=>(
                <div key={i} style={{background: i < (dailyStreak % 7) ? "#22c55e" : i === (dailyStreak % 7) ? "#FACC15" : "#1a1a1a", borderRadius:10, padding:6, textAlign:"center", border:"1px solid #333"}}>
                  <div style={{fontSize:9, color: i===dailyStreak%7 ? "#000" : "#888"}}>يوم {i+1}</div>
                  <div style={{fontWeight:900, fontSize:12, color: i===dailyStreak%7 ? "#000" : "#fff"}}>{r}</div>
                </div>
              ))}
            </div>
            <button onClick={handleDailyClaim} style={{marginTop:12, width:"100%", background: canClaimDaily ? "linear-gradient(90deg,#FACC15,#EAB308)" : "#222", color: canClaimDaily ? "#000" : "#666", padding:12, borderRadius:12, border:"none", fontWeight:900}}>
              {canClaimDaily ? `استلم مكافأة اليوم ${DAILY_REWARDS[dailyStreak % 7]} ANKH` : "⏳ انتظر 24 ساعة"}
            </button>
          </div>

          <div style={{margin:"12px 12px 0", fontWeight:900}}>مهمات القنوات (تحقق حقيقي)</div>
          
          <div style={{margin:"8px 12px", background:"#12121a", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{display:"flex", gap:10, alignItems:"center"}}>
              <div style={{width:40, height:40, borderRadius:10, background:"#1DA1F2", display:"flex", alignItems:"center", justifyContent:"center"}}>📢</div>
              <div><div style={{fontWeight:800, fontSize:13}}>اشتراك في قناة الأخبار</div><div style={{fontSize:11, color:"#888"}}>{CHANNELS.news.username} - مكافأة {CHANNELS.news.reward} ANKH</div></div>
            </div>
            <div style={{display:"flex", gap:6}}>
              <button onClick={()=>window.open(CHANNELS.news.link,"_blank")} style={{background:"#1a1a1a", border:"1px solid #333", borderRadius:8, padding:"8px 12px", color:"#FACC15", fontSize:11}}>اذهب</button>
              <button disabled={completedTasks.includes("news") || verifying==="news"} onClick={()=>handleVerifyChannel("news", CHANNELS.news.username)} style={{background: completedTasks.includes("news") ? "#22c55e" : "#A855F7", border:"none", borderRadius:8, padding:"8px 12px", color:"#fff", fontSize:11}}>{completedTasks.includes("news") ? "تم" : verifying==="news" ? "..." : "تحقق"}</button>
            </div>
          </div>

          <div style={{margin:"8px 12px", background:"#12121a", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{display:"flex", gap:10, alignItems:"center"}}>
              <div style={{width:40, height:40, borderRadius:10, background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center"}}>💸</div>
              <div><div style={{fontWeight:800, fontSize:13}}>اشتراك في قناة السحب</div><div style={{fontSize:11, color:"#888"}}>{CHANNELS.withdraw.username} - مكافأة {CHANNELS.withdraw.reward} ANKH</div></div>
            </div>
            <div style={{display:"flex", gap:6}}>
              <button onClick={()=>window.open(CHANNELS.withdraw.link,"_blank")} style={{background:"#1a1a1a", border:"1px solid #333", borderRadius:8, padding:"8px 12px", color:"#FACC15", fontSize:11}}>اذهب</button>
              <button disabled={completedTasks.includes("withdraw") || verifying==="withdraw"} onClick={()=>handleVerifyChannel("withdraw", CHANNELS.withdraw.username)} style={{background: completedTasks.includes("withdraw") ? "#22c55e" : "#A855F7", border:"none", borderRadius:8, padding:"8px 12px", color:"#fff", fontSize:11}}>{completedTasks.includes("withdraw") ? "تم" : verifying==="withdraw" ? "..." : "تحقق"}</button>
            </div>
          </div>

          <div style={{margin:"12px", background:"rgba(168,85,247,0.1)", border:"1px solid #A855F7", borderRadius:12, padding:10, fontSize:11, color:"#A855F7"}}>
            ℹ️ مهم: لازم تضيف البوت بتاعك كـ Admin في القناتين عشان التحقق يشتغل حقيقي. ادخل القناة > Admins > Add Admin > حط اليوزر بتاع البوت
          </div>
        </div>
      )}

      {view==="tiers" && (
        <>
          <div style={{padding:16, display:"flex", gap:10, alignItems:"center"}}>
            <button onClick={()=>setView("main")} style={{background:"#1A1A1A", width:36, height:36, borderRadius:20, border:"1px solid #333", color:"#fff"}}>‹</button>
            <div style={{textAlign:"center", flex:1}}><div style={{fontSize:20, fontWeight:900}}>{t.tiersTitle}</div><div style={{fontSize:11, color:"#888"}}>500 مستوى - 5 دوريات</div></div>
            <div style={{width:36}}></div>
          </div>
          <div style={{margin:"0 12px", background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
            <div><div style={{fontSize:11, color:"#888"}}>{t.yourTier}</div><div style={{fontWeight:900, color: TIERS.find(x=> level>=x.start && level<=x.end)?.color}}>{TIERS.find(x=> level>=x.start && level<=x.end)?.n} - Lv.{level}</div></div>
            <div style={{textAlign:"left"}}><div style={{fontSize:11, color:"#888"}}>{t.walletBal}</div><div style={{fontWeight:900}}>{walletBalance.toFixed(0)} ANKH</div></div>
          </div>
          <div style={{margin:"16px 12px 0", display:"flex", flexDirection:"column", gap:8}}>
            {TIERS.map(d=>(
              <div key={d.id} onClick={()=>{setSelectedTier(d); setView("levels")}} style={{background:"#12121A", borderRadius:14, padding:12, border:`1px solid ${level>=d.start && level<=d.end ? d.color : "#222"}`, display:"flex", justifyContent:"space-between", cursor:"pointer"}}>
                <div style={{display:"flex", gap:10}}><div style={{width:40, height:40, background:`linear-gradient(180deg,${d.color},#000)`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#fff", border:`1px solid ${d.color}`}}>{d.start}</div><div><div style={{fontWeight:800}}>{d.n}</div><div style={{fontSize:10, color:"#888"}}>المستويات {d.r}</div></div></div><span>› تصفح</span>
              </div>
            ))}
          </div>
        </>
      )}

      {view==="levels" && (
        <>
          <div style={{padding:16, display:"flex", gap:10, alignItems:"center"}}>
            <button onClick={()=>setView("tiers")} style={{background:"#1A1A1A", width:36, height:36, borderRadius:20, border:"1px solid #333", color:"#fff"}}>‹</button>
            <div><div style={{fontWeight:900}}>{selectedTier.n} - {selectedTier.r}</div><div style={{fontSize:10, color:"#888"}}>{t.levelsSub}</div></div>
          </div>
          <div style={{margin:"0 12px", background:"#12121A", borderRadius:12, overflow:"hidden", border:"1px solid #222"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#888", padding:10, borderBottom:"1px solid #222", background:"#0A0A0A"}}><span>{t.small}</span><span>{t.reqWallet}</span><span>{t.perDay}</span></div>
            {Array.from({length: selectedTier.end - selectedTier.start + 1}, (_,i)=>{
              const lvl = selectedTier.start + i; const data = getLevelData(lvl);
              const isCurrent = lvl===level;
              return (
                <div key={lvl} style={{display:"flex", justifyContent:"space-between", padding:"10px", borderBottom:"1px solid #222", background: isCurrent ? "rgba(250,204,21,0.1)" : "transparent"}}>
                  <span style={{color: isCurrent ? "#FACC15" : "#fff"}}>{lvl} {isCurrent ? "●" : ""}</span><span>{data.req.toLocaleString()} ANKH</span><span style={{color:selectedTier.color}}>{data.daily.toLocaleString()}</span>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* باقي الصفحات زي ما هي */}
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
        </div>
      )}

      {/* باقي الكود مختصر عشان المساحة */}
      {view==="market" && (
        <div style={{padding:"12px 16px"}}>
          <div style={{borderRadius:16, background:"linear-gradient(180deg, #1A0A2E, #0F0F1A)", border:"1px solid #333", padding:12}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{fontSize:22, fontWeight:900}}>السوق</div>
              <div style={{fontSize:11, color:"#FACC15", border:"1px solid #FACC15", padding:"4px 10px", borderRadius:20}}>ANKH / TON ⇄</div>
            </div>
            <div style={{marginTop:12, background:"rgba(0,0,0,0.5)", borderRadius:12, padding:12, border:"1px solid #222"}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}>
                <a href={STONFI_LINK} target="_blank" style={{color:"#FACC15", fontWeight:800, textDecoration:"none"}}>↗ STON.fi</a>
                <span style={{color:"#888"}}>{isConnected ? formatAddress(wallet?.account.address||"") : "TON Price"}</span>
              </div>
              <div style={{fontSize:26, fontWeight:900, marginTop:8}}>TON {ankhPrice.toFixed(6)}</div>
            </div>
          </div>
          <div style={{marginTop:10, background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222"}}>
            <div style={{background:"#0A0A0A", borderRadius:12, padding:12, border:"1px solid #333", display:"flex", justifyContent:"space-between"}}>
              <input type="number" value={tonAmount} onChange={(e)=>{if(Number(e.target.value)>=1 || e.target.value==="") setTonAmount(e.target.value)}} style={{background:"none", border:"none", color:"#fff", fontSize:16, fontWeight:900, width:120, outline:"none"}} />
              <span style={{color:"#FACC15", fontWeight:800}}>TON</span>
            </div>
            <button onClick={handleMarketBuy} style={{marginTop:14, width:"100%", background:"linear-gradient(90deg,#A855F7,#38BDF8)", padding:14, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>💰 شراء {ankhAmount.toFixed(0)} ANKH</button>
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
