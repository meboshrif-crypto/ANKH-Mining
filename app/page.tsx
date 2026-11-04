"use client";
import { useState, useEffect, useRef } from "react";
export const dynamic = "force-dynamic";

const TRANSLATIONS: any = {
  ar: {
    mining: "التعدين", store: "المتجر", list: "المهام", friends: "الأصدقاء", wallet: "المحفظة",
    ankhCoin: "عملة عنخ", botBalance: "رصيد البوت - قابل للاستلام", miningSpeed: "سرعة التعدين:",
    level: "مستوى", startMining: "ابدأ التعدين", miningBtn: "يعدن...", next: "التالي", claim: "استلام CLAIM",
    walletCoins: "عملات المحفظة (تحسب لليفل):", nextLevel: "التالي:", remaining: "باقي", forLevel: "لليفل",
    note: "⚠️ ملاحظة: العملات الموجودة في البوت لا تؤثر على المستوى\nفقط العملات الموجودة في المحفظة بعد الضغط على استلام هي التي يتم احتسابها لرفع المستوى",
    showLevels: "عرض المستويات 1-500 + سرعة التعدين ▼", hideLevels: "اخفاء المستويات ▲",
    levelHeader: "المستوى", required: "المطلوب", speed: "السرعة",
    storeTitle: "🛒 المتجر - شراء بـ GRAM", chooseGram: "اختر كمية GRAM (اقل شراء 1 جرام)",
    live: "LIVE", fallback: "FALLBACK", priceFromLiquidity: "السعر يحسب من السيولة", youGet: "هتستلم",
    paymentAddress: "عنوان الدفع (StonFi / TonKeeper)", confirmBuy: "تأكيد شراء", customAmount: "او اكتب كمية مخصصة",
    notConnectedStore: "لازم تربط المحفظة الاول من خانة المحفظة علشان تشتري", connectedWith: "مربوط بـ",
    dailyLogin: "📅 تسجيل دخول يومي - 30 يوم", ifMiss: "لو فوت يوم ترجع من الاول!", registerToday: "تسجيل اليوم",
    day: "يوم", tasks: "📋 المهام", newsChannel: "قناة الاخبار", withdrawChannel: "قناة السحب",
    subscribe: "اشتراك", verify: "تحقق", go: "اذهب", claimTask: "استلام", storyTask: "نزل ستوري كل 24 ساعة", storyReward: "50 ANKH كل 24 ساعة",
    invite: "ادع", persons: "اشخاص ليفل 2",
    forever: "5% للأبد ♾️", foreverDesc: "تاخد 5% من معدل تعدين كل صديق مؤهل مدى الحياة",
    refCode: "رمز الإحالة الخاص بك", shareLink: "📤 مشاركة الرابط", copy: "📋 نسخ", copied: "تم النسخ",
    invited: "الأصدقاء المدعوين", qualified: "مؤهل:", noFriends: "لسه مدعتش حد - شارك رابطك",
    qualifiedYes: "مؤهل ✓", notQualified: "غير مؤهل (اقل من 2)", fromMining: "من", banTitle: "تم حظر حسابك تلقائياً",
    banReasonLabel: "السبب:", banRules: "• محفظة واحدة فقط لكل جهاز\n• حساب واحد فقط لكل جهاز\n• ممنوع تعدد الحسابات",
    walletTitle: "💼 المحفظة", connectWallet: "🔗 ربط المحفظة", oneWalletOnly: "محفظة واحدة فقط",
    banMultiWallet: "🚫 ممنوع ربط أكثر من محفظة - حظر تلقائي", banMultiAccount: "🚫 ممنوع فتح حسابين على نفس الجهاز - حظر تلقائي",
    walletConnected: "✓ تم الربط - محفظة واحدة مربوطة بالجهاز ولا يمكن تغييرها",
    antiBot: "⚠️ الزامي - تحويل 0.05 GRAM للتأكيد انك مش روبوت", antiBotDone: "✅ تم التأكيد - مش روبوت",
    transfer: "تحويل 0.05 GRAM", withdraw: "💸 السحب - الحد الادنى 10000 ANKH",
    withdrawRules: "• لازم يكون معاك 25% في المحفظة\n• العملات اللي في المحفظة هي اللي بتزود الليفل مش عملات البوت",
    needInWallet: "تحتاج في المحفظة (25%):", needVerifyFirst: "اكد انك مش روبوت اولا", min10000: "الحد الادنى 10000",
    need25: "محتاج 25% في المحفظة", withdrawBtn: "سحب", openWalletAuto: "يفتح المحفظة اوتوماتيك",
    nextStory: "متبقي", storyDone: "تم اليوم - ارجع بعد 24 ساعة"
  },
  en: {
    mining: "Mining", store: "Store", list: "Tasks", friends: "Friends", wallet: "Wallet",
    ankhCoin: "ANKH COIN", botBalance: "Bot balance - claimable", miningSpeed: "Mining speed:",
    level: "Level", startMining: "Start Mining", miningBtn: "Mining...", next: "Next", claim: "CLAIM",
    walletCoins: "Wallet coins (counts for level):", nextLevel: "Next:", remaining: "Need", forLevel: "for level",
    note: "⚠️ Note: Coins in bot don't affect level\nOnly coins in wallet after CLAIM count for level up",
    showLevels: "Show Levels 1-500 + mining speed ▼", hideLevels: "Hide Levels ▲",
    levelHeader: "LEVEL", required: "Required", speed: "Speed",
    storeTitle: "🛒 Store - Buy with GRAM", chooseGram: "Choose GRAM amount (min 1 gram)",
    live: "LIVE", fallback: "FALLBACK", priceFromLiquidity: "Price from liquidity", youGet: "You get",
    paymentAddress: "Payment address (StonFi / TonKeeper)", confirmBuy: "Confirm buy", customAmount: "Or write custom amount",
    notConnectedStore: "You must connect wallet first in Wallet tab to buy", connectedWith: "Connected with",
    dailyLogin: "📅 Daily Login - 30 days", ifMiss: "If you miss a day you start over!", registerToday: "Check-in Today",
    day: "Day", tasks: "📋 Tasks", newsChannel: "News Channel", withdrawChannel: "Withdraw Channel",
    subscribe: "Join", verify: "Verify", go: "Go", claimTask: "Claim", storyTask: "Post story every 24h", storyReward: "50 ANKH every 24h",
    invite: "Invite", persons: "persons level 2",
    forever: "5% Forever ♾️", foreverDesc: "You get 5% of mining rate from each qualified friend forever",
    refCode: "Your referral code", shareLink: "📤 Share Link", copy: "📋 Copy", copied: "Copied",
    invited: "Invited Friends", qualified: "Qualified:", noFriends: "No friends yet - share your link",
    qualifiedYes: "Qualified ✓", notQualified: "Not qualified (<2)", fromMining: "from",
    banTitle: "Your account is automatically banned", banReasonLabel: "Reason:", banRules: "• One wallet per device\n• One account per device\n• Multi-accounts forbidden",
    walletTitle: "💼 Wallet", connectWallet: "🔗 Connect Wallet", oneWalletOnly: "One wallet only",
    banMultiWallet: "🚫 One wallet only - auto ban", banMultiAccount: "🚫 One account per device - auto ban",
    walletConnected: "✓ Connected - one wallet per device, can't change",
    antiBot: "⚠️ Required - transfer 0.05 GRAM to prove not bot", antiBotDone: "✅ Verified - not a bot",
    transfer: "Transfer 0.05 GRAM", withdraw: "💸 Withdraw - Min 10000 ANKH",
    withdrawRules: "• You need 25% in wallet\n• Wallet coins increase your level, not bot coins",
    needInWallet: "Need in wallet (25%):", needVerifyFirst: "Verify anti-bot first", min10000: "Min 10000",
    need25: "Need 25% in wallet", withdrawBtn: "Withdraw", openWalletAuto: "Opens wallet automatically",
    nextStory: "Left", storyDone: "Done today - come after 24h"
  },
  ru: {
    mining: "Майнинг", store: "Магазин", list: "Задания", friends: "Друзья", wallet: "Кошелек",
    ankhCoin: "МОНЕТА ANKH", botBalance: "Баланс бота - к получению", miningSpeed: "Скорость майнинга:",
    level: "Уровень", startMining: "Начать майнинг", miningBtn: "Майнинг...", next: "Далее", claim: "ПОЛУЧИТЬ",
    walletCoins: "Монеты кошелька (для уровня):", nextLevel: "Далее:", remaining: "Нужно", forLevel: "для уровня",
    note: "⚠️ Монеты в боте не влияют на уровень\nТолько монеты в кошельке после получения влияют на уровень",
    showLevels: "Показать уровни 1-500 + скорость ▼", hideLevels: "Скрыть уровни ▲",
    levelHeader: "УРОВЕНЬ", required: "Нужно", speed: "Скорость",
    storeTitle: "🛒 Магазин - Купить за GRAM", chooseGram: "Выберите GRAM (мин 1 грамм)",
    live: "LIVE", fallback: "FALLBACK", priceFromLiquidity: "Цена из ликвидности", youGet: "Вы получите",
    paymentAddress: "Адрес оплаты (StonFi / TonKeeper)", confirmBuy: "Подтвердить покупку", customAmount: "Или введите свое количество",
    notConnectedStore: "Сначала подключите кошелек во вкладке Кошелек", connectedWith: "Подключен с",
    dailyLogin: "📅 Ежедневный вход - 30 дней", ifMiss: "Если пропустишь день - начнешь заново!", registerToday: "Отметиться сегодня",
    day: "День", tasks: "📋 Задания", newsChannel: "Канал новостей", withdrawChannel: "Канал выводов",
    subscribe: "Подписаться", verify: "Проверить", go: "Перейти", claimTask: "Получить", storyTask: "Выложи стори каждые 24ч", storyReward: "50 ANKH каждые 24ч",
    invite: "Пригласи", persons: "человек уровень 2",
    forever: "5% Навсегда ♾️", foreverDesc: "Вы получаете 5% от майнинга каждого квалифицированного друга навсегда",
    refCode: "Ваш реферальный код", shareLink: "📤 Поделиться", copy: "📋 Копировать", copied: "Скопировано",
    invited: "Приглашенные друзья", qualified: "Квалифицировано:", noFriends: "Пока нет друзей - поделись ссылкой",
    qualifiedYes: "Квалифицирован ✓", notQualified: "Не квалифицирован (<2)", fromMining: "от",
    banTitle: "Ваш аккаунт автоматически заблокирован", banReasonLabel: "Причина:", banRules: "• Один кошелек на устройство\n• Один аккаунт на устройство\n• Мультиаккаунты запрещены",
    walletTitle: "💼 Кошелек", connectWallet: "🔗 Подключить кошелек", oneWalletOnly: "Только один кошелек",
    banMultiWallet: "🚫 Только один кошелек - автобан", banMultiAccount: "🚫 Один аккаунт на устройство - автобан",
    walletConnected: "✓ Подключен - один кошелек на устройство, нельзя изменить",
    antiBot: "⚠️ Обязательно - перевод 0.05 GRAM чтобы доказать не бот", antiBotDone: "✅ Проверено - не бот",
    transfer: "Перевести 0.05 GRAM", withdraw: "💸 Вывод - Мин 10000 ANKH",
    withdrawRules: "• Нужно 25% в кошельке\n• Монеты кошелька повышают уровень, а не монеты бота",
    needInWallet: "Нужно в кошельке (25%):", needVerifyFirst: "Сначала подтверди антибот", min10000: "Мин 10000",
    need25: "Нужно 25% в кошельке", withdrawBtn: "Вывести", openWalletAuto: "Открывает кошелек автоматически",
    nextStory: "Осталось", storyDone: "Готово сегодня - вернись через 24ч"
  }
};

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("ar");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [mining, setMining] = useState(false);
  const [miningProgress, setMiningProgress] = useState(0);
  const [miningEarned, setMiningEarned] = useState(0);
  const [refCode, setRefCode] = useState("ANKH-000000");
  const [lastMine, setLastMine] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [connected, setConnected] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showWallets, setShowWallets] = useState(false);
  const [antiBotDone, setAntiBotDone] = useState(false);
  const [banned, setBanned] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [selectedGram, setSelectedGram] = useState(1);
  const [gramPrice, setGramPrice] = useState<number | null>(null);
  const [ankhPriceGram] = useState(0.006666);
  const FALLBACK_RATE = 150;
  const [showLevels, setShowLevels] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState<any[]>([]);
  const [taskStatus, setTaskStatus] = useState<any>({});
  const [lastStory, setLastStory] = useState(0);
  const [storyCountdown, setStoryCountdown] = useState("");
  const [lastDaily, setLastDaily] = useState(0);
  const [dailyDay, setDailyDay] = useState(0);
  const miningRef = useRef<any>(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  const getRequiredForLevel = (targetLevel: number) => targetLevel <= 1 ? 0 : 70 * targetLevel * targetLevel - 40 * targetLevel - 40;
  const getMiningRate = (lvl: number) => 0.25 + lvl * 0.05;

  useEffect(() => {
    fetch("https://api.dexscreener.com/latest/dex/search/?q=GRAM").then(r=>r.json()).then(d=>{
      const pair = d?.pairs?.find((p:any)=> p.chainId==="ton" && p.baseToken?.symbol==="GRAM") || d?.pairs?.[0];
      if(pair?.priceUsd) setGramPrice(Number(pair.priceUsd));
    }).catch(()=>{});
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if(window.localStorage.getItem("ankh_banned")==="1"){ setBanned(true); setBanReason(window.localStorage.getItem("ankh_ban_reason")||""); return; }
    let deviceId = window.localStorage.getItem("ankh_device_id");
    if(!deviceId){ deviceId = "DEV-" + Math.random().toString(36).slice(2,12) + Date.now().toString(36); window.localStorage.setItem("ankh_device_id", deviceId); }
    let currentCode = window.localStorage.getItem("ankh_current_code");
    if(!currentCode){ currentCode = "ANKH-" + Math.floor(100000 + Math.random() * 900000); window.localStorage.setItem("ankh_current_code", currentCode); }
    setRefCode(currentCode);
    const b = window.localStorage.getItem("ankh_bal"); if(b) setBalance(Number(b));
    const wb = window.localStorage.getItem("ankh_wallet"); if(wb) setWalletBalance(Number(wb));
    const l = window.localStorage.getItem("ankh_level"); if(l) setLevel(Number(l));
    const last = window.localStorage.getItem("ankh_last"); if(last) setLastMine(Number(last));
    const invites = window.localStorage.getItem("ankh_invites"); 
    if(invites) setInvitedFriends(JSON.parse(invites)); 
    else setInvitedFriends([]); // شلت الوهمي - يبدأ فاضي
    const wa = window.localStorage.getItem("ankh_wallet_addr"); if(wa) setWalletAddress(wa);
    if(window.localStorage.getItem("ankh_connected")==="1") setConnected(true);
    if(window.localStorage.getItem("ankh_antibot")==="1") setAntiBotDone(true);
    const savedLang = window.localStorage.getItem("ankh_lang"); if(savedLang) setLang(savedLang);
    const tasks = window.localStorage.getItem("ankh_tasks"); if(tasks) setTaskStatus(JSON.parse(tasks));
    const story = window.localStorage.getItem("ankh_last_story"); if(story) setLastStory(Number(story));
    const daily = window.localStorage.getItem("ankh_last_daily"); if(daily) setLastDaily(Number(daily));
    const dDay = window.localStorage.getItem("ankh_daily_day"); if(dDay) setDailyDay(Number(dDay));
  }, []);

  useEffect(() => { localStorage.setItem("ankh_bal", String(balance)); }, [balance]);
  useEffect(() => { localStorage.setItem("ankh_wallet", String(walletBalance)); }, [walletBalance]);
  useEffect(() => { localStorage.setItem("ankh_level", String(level)); }, [level]);
  useEffect(() => { localStorage.setItem("ankh_lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("ankh_tasks", JSON.stringify(taskStatus)); }, [taskStatus]);

  useEffect(() => {
    const int = setInterval(() => {
      if(lastMine){ const diff = lastMine + 86400000 - Date.now(); if(diff<=0) setCountdown(""); else setCountdown(`${Math.floor(diff/3600000)}h ${Math.floor((diff%3600000)/60000)}m ${Math.floor((diff%60000)/1000)}s`); }
      if(lastStory){ const diff = lastStory + 86400000 - Date.now(); if(diff<=0) setStoryCountdown(""); else setStoryCountdown(`${Math.floor(diff/3600000)}h ${Math.floor((diff%3600000)/60000)}m`); }
    }, 1000); return () => clearInterval(int);
  }, [lastMine, lastStory]);

  const canMine = Date.now() - lastMine >= 86400000 || lastMine === 0;
  const canStory = Date.now() - lastStory >= 86400000 || lastStory === 0;
  const canDaily = Date.now() - lastDaily >= 86400000 || lastDaily === 0;

  // 1- التعدين الحقيقي ساعة كاملة يعد قدامك
  const startMining = () => {
    if(banned || !canMine || mining) return;
    setMining(true); setMiningProgress(0); setMiningEarned(0);
    const rate = getMiningRate(level);
    const start = Date.now();
    const duration = 3600000; // ساعة
    miningRef.current = setInterval(()=>{
      const elapsed = Date.now() - start;
      const progress = Math.min(100, (elapsed/duration)*100);
      const earned = rate * (elapsed/duration);
      setMiningProgress(progress);
      setMiningEarned(earned);
      if(elapsed >= duration){
        clearInterval(miningRef.current);
        setBalance(prev => prev + rate);
        const now = Date.now(); setLastMine(now); localStorage.setItem("ankh_last", String(now));
        setMining(false); setMiningProgress(0); setMiningEarned(0);
      }
    }, 1000);
  };

  const handleClaim = () => {
    if(banned || balance<=0) return;
    const newWallet = walletBalance + balance; setWalletBalance(newWallet); setBalance(0);
    let newLvl = level; while(newLvl < 500 && newWallet >= getRequiredForLevel(newLvl+1)) newLvl++; if(newLvl!==level) setLevel(newLvl);
  };

  const needForNext = Math.max(0, getRequiredForLevel(level+1) - walletBalance);
  const currentRate = getMiningRate(level);
  const calculatedAnkh = selectedGram / ankhPriceGram;
  const displayRate = gramPrice ? (1/ankhPriceGram).toFixed(0) : FALLBACK_RATE.toString();
  const inviteLink = `https://t.me/ANKH_Mining_bot?start=${refCode}`;

  // 6- المهام - متتأكدش تلقائي
  const handleTaskGo = (id:string, link:string) => {
    if(link!=="#") window.open(link, "_blank");
    setTaskStatus({...taskStatus, [id]: "gone"});
  };
  const handleTaskVerify = (id:string, reward:number) => {
    // للدعوات - لازم يتحقق من العدد الحقيقي
    if(id.startsWith("invite_")){
      const need = Number(id.split("_")[1]);
      if(invitedFriends.length < need){
        alert(`❌ ${t.noFriends} - معاك ${invitedFriends.length}/${need} - لم يكتمل`);
        return;
      }
    }
    setTaskStatus({...taskStatus, [id]: "claimed"});
    setBalance(b=>b+reward); // يروح في رصيد البوت الداخلي تحت
  };
  const handleStoryClaim = () => { if(!canStory) return; setBalance(b=>b+50); const now=Date.now(); setLastStory(now); localStorage.setItem("ankh_last_story", String(now)); };

  // 2- ربط المحفظة يفتح تلقائي
  const connectWallet = (type:string) => {
    if(banned) return;
    const deviceWallet = localStorage.getItem("ankh_device_wallet");
    if(deviceWallet && walletAddress && deviceWallet!==walletAddress){ localStorage.setItem("ankh_banned","1"); localStorage.setItem("ankh_ban_reason", t.banMultiWallet); setBanned(true); setBanReason(t.banMultiWallet); return; }
    if(walletAddress && deviceWallet){ alert("🚫 "+t.oneWalletOnly); return; }
    const newAddr = "UQ" + Math.random().toString(36).slice(2,10) + "..." + refCode.slice(-4);
    setWalletAddress(newAddr); setConnected(true); setShowWallets(false);
    localStorage.setItem("ankh_wallet_addr", newAddr); localStorage.setItem("ankh_device_wallet", newAddr); localStorage.setItem("ankh_connected","1");
    if(type==="tonkeeper"){
      window.location.href = "ton://";
      setTimeout(()=> window.open("https://app.tonkeeper.com/ton-connect","_blank"), 800);
    } else if(type==="myton"){
      window.open("https://mytonwallet.io","_blank");
    } else {
      window.open("ton://","_blank");
    }
  };
  const verifyAntiBot = () => {
    window.open(`ton://transfer/UQAnkhVerify?amount=50000000&text=${refCode}`, "_blank");
    setTimeout(()=>{ setAntiBotDone(true); localStorage.setItem("ankh_antibot","1"); }, 1200);
  };

  if(banned) return <div style={{minHeight:"100vh", background:"#050505", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, textAlign:"center"}}><div style={{fontSize:64}}>🚫</div><div style={{fontSize:20, fontWeight:900, color:"#ef4444", marginTop:12}}>{t.banTitle}</div><div style={{marginTop:8, color:"#888", fontSize:13}}>{t.banReasonLabel} {banReason}</div></div>;

  return (
    <div style={{minHeight:"100vh", background:"#050505", color:"#fff", paddingBottom:90, fontFamily:"sans-serif", direction: lang==="ar" ? "rtl" : "ltr"}}>
      <div style={{display:"flex", gap:8, padding:16}}>
        {["ar","en","ru"].map(l=><button key={l} onClick={()=>setLang(l)} style={{padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:900, border:"1px solid #222", background: lang===l ? "#FACC15" : "#1A1A1A", color: lang===l ? "#000" : "#888"}}>{l.toUpperCase()}</button>)}
      </div>
      <div style={{padding:20, display:"flex", flexDirection:"column", alignItems:"center"}}>
        {tab==="mining" && (
          <>
            <div style={{width:190, height:190, borderRadius:"50%", background:"linear-gradient(180deg, #FACC15, #854D0E)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:80}}>☥</div>
            <div style={{marginTop:20, color:"#FACC15", letterSpacing:5, fontSize:11, fontWeight:800}}>{t.ankhCoin}</div>
            <div style={{fontSize:42, fontWeight:900, marginTop:6}}>{balance.toFixed(2)} ANKH</div>
            <div style={{fontSize:11, color:"#666"}}>{t.botBalance}</div>
            
            {mining && (
              <div style={{marginTop:12, width:"100%", maxWidth:360, background:"#111", border:"1px solid #FACC15", borderRadius:12, padding:12}}>
                <div style={{fontSize:22, color:"#FACC15", fontWeight:900, textAlign:"center"}}>+{miningEarned.toFixed(6)} ANKH</div>
                <div style={{marginTop:8, width:"100%", height:8, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}><div style={{width:`${miningProgress}%`, height:"100%", background:"#FACC15", transition:"width 1s linear"}}></div></div>
                <div style={{fontSize:11, color:"#888", textAlign:"center", marginTop:6}}>{miningProgress.toFixed(1)}% - {currentRate}/h يعدن قدامك</div>
              </div>
            )}

            <div style={{marginTop:10, background:"#111", border:"1px solid rgba(250,204,21,0.3)", borderRadius:20, padding:"8px 14px", display:"flex", gap:8, fontSize:12}}>
              <span style={{color:"#888"}}>{t.miningSpeed}</span><span style={{color:"#FACC15", fontWeight:900}}>{currentRate.toFixed(2)}/h</span><span style={{background:"#222", padding:"2px 8px", borderRadius:10, fontSize:10}}>{t.level} {level}</span>
            </div>
            <div style={{display:"flex", gap:10, width:"100%", maxWidth:360, marginTop:20}}>
              <button onClick={startMining} disabled={!canMine || mining} style={{flex:1, background: !canMine ? "#222" : mining ? "#333" : "#FACC15", color: !canMine ? "#666" : mining ? "#888" : "#000", fontWeight:900, padding:16, borderRadius:14, border:"none"}}>
                {!canMine ? `${t.next} ${countdown}` : mining ? `${t.miningBtn} ${miningEarned.toFixed(4)}` : t.startMining}
              </button>
              <button onClick={handleClaim} disabled={balance===0} style={{flex:1, background: balance>0 ? "#fff" : "#111", color: balance>0 ? "#000" : "#444", fontWeight:900, padding:16, borderRadius:14, border:"1px solid #222"}}>{t.claim}</button>
            </div>

            <div style={{marginTop:20, width:"100%", maxWidth:360, background:"#111", border:"1px solid rgba(250,204,21,0.25)", borderRadius:16, padding:14}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span style={{color:"#888"}}>{t.walletCoins}</span><span style={{color:"#FACC15", fontWeight:900}}>{walletBalance.toFixed(2)} ANKH</span></div>
              <div style={{marginTop:8, width:"100%", height:6, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}><div style={{width:`${Math.min(100, (walletBalance / (getRequiredForLevel(level+1)||160))*100)}%`, height:"100%", background:"#FACC15"}}></div></div>
              <div style={{marginTop:8, fontSize:12, color:"#FACC15", textAlign:"center"}}>{t.remaining} {needForNext.toFixed(2)} {t.forLevel} {level+1}</div>
            </div>
            <div style={{marginTop:12, width:"100%", maxWidth:360, background:"rgba(250,204,21,0.08)", border:"1px dashed rgba(250,204,21,0.3)", borderRadius:10, padding:10, fontSize:10, color:"#aaa", textAlign:"center", whiteSpace:"pre-line"}}>{t.note}</div>
            <button onClick={()=>setShowLevels(!showLevels)} style={{marginTop:18, width:"100%", maxWidth:360, background:"#111", border:"1px solid #222", color:"#FACC15", padding:12, borderRadius:12, fontSize:13}}>{showLevels ? t.hideLevels : t.showLevels}</button>
            {showLevels && <div style={{marginTop:12, width:"100%", maxWidth:390, background:"#111", border:"1px solid #222", borderRadius:16, padding:12, maxHeight:400, overflowY:"auto"}}>{Array.from({length:500}, (_,i)=><div key={i} style={{display:"flex", justifyContent:"space-between", fontSize:11, padding:"6px 8px"}}><span>Level {i+1}</span><span>{getRequiredForLevel(i+1).toLocaleString()}</span><span>{getMiningRate(i).toFixed(2)}/h</span></div>)}</div>}
          </>
        )}

        {tab==="store" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:14}}>
            <h2 style={{fontWeight:900, color:"#FACC15"}}>{t.storeTitle}</h2>
            {!connected ? <div style={{background:"#111", border:"1px solid #ef4444", borderRadius:20, padding:20, textAlign:"center"}}><div style={{color:"#ef4444"}}>{t.notConnectedStore}</div><button onClick={()=>setTab("wallet")} style={{marginTop:12, background:"#FACC15", padding:"10px 16px", borderRadius:10, border:"none", fontWeight:800}}>{t.connectWallet}</button></div> :
              <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.35)", borderRadius:20, padding:16}}>
                <div style={{fontSize:13, fontWeight:800}}>{t.chooseGram}</div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, marginTop:12}}>{[1,3,5,10].map(g=><button key={g} onClick={()=>setSelectedGram(g)} style={{padding:14, borderRadius:12, background: selectedGram===g ? "#FACC15" : "#1A1A1A", color: selectedGram===g ? "#000" : "#888", border:"1px solid #222", fontWeight:900}}>{g} GRAM</button>)}</div>
                <input type="number" min={1} value={selectedGram} onChange={e=>setSelectedGram(Number(e.target.value)||1)} style={{marginTop:12, width:"100%", background:"#0A0A0A", border:"1px solid #222", borderRadius:10, padding:12, color:"#fff"}}/>
                <div style={{marginTop:12, background:"#000", padding:12, borderRadius:12, textAlign:"center", color:"#FACC15", fontWeight:900, fontSize:22}}>{Math.floor(calculatedAnkh).toLocaleString()} ANKH</div>
                <button onClick={()=>{ window.open(`ton://transfer/UQAnkhStore?amount=${(selectedGram*1e9).toString()}&text=buy_${refCode}`, "_blank"); setTimeout(()=>setWalletBalance(wb=>wb+Math.floor(calculatedAnkh)),1200); }} style={{marginTop:12, width:"100%", background:"#FACC15", color:"#000", padding:14, borderRadius:12, border:"none", fontWeight:900}}>{t.confirmBuy} {selectedGram} GRAM</button>
              </div>
            }
          </div>
        )}

        {tab==="list" && (
          <div style={{width:"100%", maxWidth:410, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.5)", borderRadius:20, padding:16}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><div><div style={{fontWeight:900, color:"#FACC15"}}>📸 {t.storyTask}</div><div style={{fontSize:11, color:"#888"}}>{t.storyReward}</div></div><div style={{fontSize:10, background: canStory ? "#22c55e" : "#222", color: canStory ? "#000" : "#888", padding:"4px 8px", borderRadius:10}}>{canStory ? "جاهز" : `${t.nextStory} ${storyCountdown}`}</div></div>
              <button onClick={handleStoryClaim} disabled={!canStory} style={{marginTop:12, width:"100%", background: canStory ? "#FACC15" : "#222", color: canStory ? "#000" : "#555", padding:12, borderRadius:12, border:"none", fontWeight:900}}>{canStory ? `${t.claimTask} 50 ANKH` : t.storyDone}</button>
            </div>

            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.5)", borderRadius:20, padding:16}}>
              <h2 style={{fontWeight:900, color:"#FACC15"}}>{t.dailyLogin}</h2>
              <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:6, marginTop:12}}>{[9,14,23,31,42,55,68,77,89,102,115,130,145,162,180,199,219,240,262,285,309,334,360,387,415,444,474,505,537,600].map((reward, i)=><div key={i} style={{background: i===dailyDay ? "#FACC15" : "#000", border:"1px solid #222", borderRadius:10, padding:"8px 0", textAlign:"center"}}><div style={{fontSize:9, color: i===dailyDay ? "#000" : "#666"}}>{t.day} {i+1}</div><div style={{fontSize:12, fontWeight:900, color: i===dailyDay ? "#000" : "#fff"}}>{reward}</div></div>)}</div>
              <button onClick={()=>{
                if(!canDaily){ alert("تقدر تسجل تاني بعد 24 ساعة"); return; }
                const rewards = [9,14,23,31,42,55,68,77,89,102,115,130,145,162,180,199,219,240,262,285,309,334,360,387,415,444,474,505,537,600];
                const reward = rewards[dailyDay] || 9;
                setBalance(b=>b+reward);
                const now=Date.now(); setLastDaily(now); localStorage.setItem("ankh_last_daily", String(now));
                const next = (dailyDay+1)%30; setDailyDay(next); localStorage.setItem("ankh_daily_day", String(next));
              }} style={{marginTop:12, width:"100%", background: canDaily ? "#FACC15" : "#222", color: canDaily ? "#000" : "#555", padding:12, borderRadius:12, border:"none", fontWeight:900}}>{canDaily ? `${t.registerToday} - ${[9,14,23,31,42,55,68,77,89,102,115,130,145,162,180,199,219,240,262,285,309,334,360,387,415,444,474,505,537,600][dailyDay]} ANKH` : t.storyDone}</button>
            </div>

            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between"}}>
              <div><div style={{fontSize:13, fontWeight:800}}>{t.newsChannel}</div><div style={{fontSize:11, color:"#FACC15"}}>77 ANKH</div></div>
              <div>
                {!taskStatus["news"] && <button onClick={()=>handleTaskGo("news","https://t.me/ANKH_News")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:"8px 14px", borderRadius:8}}>{t.go} ↗</button>}
                {taskStatus["news"]==="gone" && <button onClick={()=>handleTaskVerify("news",77)} style={{background:"#FACC15", color:"#000", padding:"8px 14px", borderRadius:8, fontWeight:800, border:"none"}}>{t.verify}</button>}
                {taskStatus["news"]==="claimed" && <span style={{background:"#22c55e", color:"#000", padding:"6px 12px", borderRadius:8}}>✓</span>}
              </div>
            </div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between"}}>
              <div><div style={{fontSize:13, fontWeight:800}}>{t.withdrawChannel}</div><div style={{fontSize:11, color:"#FACC15"}}>77 ANKH</div></div>
              <div>
                {!taskStatus["withdraw_ch"] && <button onClick={()=>handleTaskGo("withdraw_ch","https://t.me/ANKH_withdraws")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:"8px 14px", borderRadius:8}}>{t.go} ↗</button>}
                {taskStatus["withdraw_ch"]==="gone" && <button onClick={()=>handleTaskVerify("withdraw_ch",77)} style={{background:"#FACC15", color:"#000", padding:"8px 14px", borderRadius:8, border:"none"}}>{t.verify}</button>}
                {taskStatus["withdraw_ch"]==="claimed" && <span style={{background:"#22c55e", color:"#000", padding:"6px 12px", borderRadius:8}}>✓</span>}
              </div>
            </div>

            {[3,15,30,50,100,250].map(n=>{
              const id=`invite_${n}`; const reward=n===3?150:n===15?1250:n===30?2750:n===50?4650:n===100?7490:9850;
              return <div key={n} style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between"}}>
                <div><div style={{fontSize:13, fontWeight:800}}>{t.invite} {n} {t.persons}</div><div style={{fontSize:11, color:"#FACC15"}}>{reward} ANKH - {invitedFriends.length}/{n}</div></div>
                <div>
                  {!taskStatus[id] && <button onClick={()=>handleTaskGo(id,"#")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:"8px 12px", borderRadius:8}}>{t.go}</button>}
                  {taskStatus[id]==="gone" && <button onClick={()=>handleTaskVerify(id,reward)} style={{background:"#FACC15", color:"#000", padding:"8px 12px", borderRadius:8, border:"none", fontWeight:800}}>{t.verify}</button>}
                  {taskStatus[id]==="claimed" && <span style={{background:"#22c55e", color:"#000", padding:"6px 12px", borderRadius:8}}>✓</span>}
                </div>
              </div>
            })}
          </div>
        )}

        {tab==="friends" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{background:"#111", borderRadius:16, padding:14, textAlign:"center"}}><div style={{color:"#FACC15", fontWeight:900}}>{t.forever}</div><div style={{fontSize:11, color:"#888"}}>{t.foreverDesc}</div></div>
            <div style={{background:"#111", borderRadius:16, padding:14}}><div style={{fontSize:12, color:"#888"}}>{t.refCode}</div><div style={{marginTop:8, background:"#000", padding:10, borderRadius:10, color:"#FACC15", fontWeight:900}}>{refCode}</div><div style={{display:"flex", gap:8, marginTop:10}}><button onClick={()=>navigator.clipboard.writeText(inviteLink)} style={{flex:1, background:"#FACC15", padding:10, borderRadius:10, border:"none", fontWeight:800}}>{t.shareLink}</button><button onClick={()=>navigator.clipboard.writeText(inviteLink)} style={{flex:1, background:"#fff", padding:10, borderRadius:10, border:"none", fontWeight:800}}>{t.copy}</button></div></div>
            <div style={{background:"#111", borderRadius:16, padding:14}}><div style={{fontWeight:900}}>👥 {t.invited} ({invitedFriends.length})</div>
              {invitedFriends.length===0 ? <div style={{marginTop:10, color:"#666", fontSize:12, textAlign:"center", padding:20}}>{t.noFriends}</div> :
                <div style={{marginTop:12, display:"flex", flexDirection:"column", gap:8}}>{invitedFriends.map((f:any)=><div key={f.id} style={{background:"#0A0A0A", border:"1px solid #222", borderRadius:10, padding:10, display:"flex", justifyContent:"space-between"}}><span>{f.name || f.username}</span><span style={{fontSize:11, color: f.level>=2 ? "#22c55e" : "#888"}}>{f.level>=2 ? t.qualifiedYes : t.notQualified}</span></div>)}</div>
              }
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:12}}>
            <h2 style={{fontWeight:900, color:"#FACC15"}}>{t.walletTitle}</h2>
            {!connected ? (
              <div style={{background:"#111", borderRadius:20, padding:20, textAlign:"center"}}>
                <div style={{fontWeight:800}}>{t.connectWallet}</div>
                {!showWallets ? <button onClick={()=>setShowWallets(true)} style={{marginTop:14, width:"100%", background:"#FACC15", color:"#000", padding:14, borderRadius:12, border:"none", fontWeight:900}}>{t.connectWallet}</button> :
                  <div style={{marginTop:12, display:"flex", flexDirection:"column", gap:8}}>
                    <button onClick={()=>connectWallet("tonkeeper")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:12, borderRadius:10}}>👛 TonKeeper → يفتح تلقائي</button>
                    <button onClick={()=>connectWallet("myton")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:12, borderRadius:10}}>💎 MyTonWallet</button>
                  </div>
                }
              </div>
            ) : (
              <>
                <div style={{background:"#111", border:"1px solid #22c55e", borderRadius:16, padding:14}}><div style={{color:"#22c55e", fontSize:11}}>{t.walletConnected}</div><div style={{marginTop:6, background:"#000", padding:8, borderRadius:8, fontSize:11, color:"#FACC15"}}>{walletAddress}</div></div>
                <div style={{background: antiBotDone ? "rgba(34,197,94,0.1)" : "#111", border:"1px solid #FACC15", borderRadius:16, padding:14}}><div style={{fontSize:12, fontWeight:800}}>{antiBotDone ? t.antiBotDone : t.antiBot}</div>{!antiBotDone && <button onClick={verifyAntiBot} style={{marginTop:10, width:"100%", background:"#FACC15", color:"#000", padding:12, borderRadius:10, border:"none", fontWeight:900}}>{t.transfer}</button>}</div>
                <div style={{background:"#111", borderRadius:16, padding:14}}><div style={{fontWeight:800}}>{t.withdraw}</div><div style={{fontSize:10, color:"#888", marginTop:6, whiteSpace:"pre-line"}}>{t.withdrawRules}</div><input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} type="number" placeholder="10000" style={{marginTop:10, width:"100%", background:"#000", border:"1px solid #333", borderRadius:10, padding:12, color:"#fff"}}/><button disabled={!antiBotDone || Number(withdrawAmount)<10000 || walletBalance < Number(withdrawAmount)*0.25} onClick={()=>alert(`${t.withdrawBtn} ${withdrawAmount}`)} style={{marginTop:10, width:"100%", background: (!antiBotDone || Number(withdrawAmount)<10000 || walletBalance < Number(withdrawAmount)*0.25) ? "#222" : "#FACC15", color: "#000", padding:14, borderRadius:12, border:"none", fontWeight:900}}>{t.withdrawBtn}</button></div>
              </>
            )}
          </div>
        )}
      </div>
      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0A0A0A", borderTop:"1px solid rgba(250,204,21,0.2)", display:"flex", justifyContent:"space-around", padding:"10px 0 22px"}}>
        {[{id:"mining",t:t.mining,ic:"⛏️"},{id:"store",t:t.store,ic:"🛒"},{id:"list",t:t.list,ic:"📋"},{id:"friends",t:t.friends,ic:"👥"},{id:"wallet",t:t.wallet,ic:"💼"}].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: tab===m.id ? "#FACC15" : "#666"}}><span style={{fontSize:18}}>{m.ic}</span><span style={{fontSize:10, fontWeight:800}}>{m.t}</span></button>
        ))}
      </div>
    </div>
  );
}
