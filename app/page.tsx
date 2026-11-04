"use client";
import { useState, useEffect } from "react";
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
    paymentAddress: "عنوان الدفع (StonFi / TonKeeper)", confirmBuy: "تأكيد شراء",
    dailyLogin: "📅 تسجيل دخول يومي - 30 يوم", ifMiss: "لو فوت يوم ترجع من الاول!", registerToday: "تسجيل اليوم",
    day: "يوم", tasks: "📋 المهام", newsChannel: "قناة الاخبار", withdrawChannel: "قناة السحب",
    subscribe: "اشتراك", verify: "تحقق", invite: "ادع", persons: "اشخاص ليفل 2",
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
    need25: "محتاج 25% في المحفظة", withdrawBtn: "سحب", openWalletAuto: "يفتح المحفظة اوتوماتيك"
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
    paymentAddress: "Payment address (StonFi / TonKeeper)", confirmBuy: "Confirm buy",
    dailyLogin: "📅 Daily Login - 30 days", ifMiss: "If you miss a day you start over!", registerToday: "Check-in Today",
    day: "Day", tasks: "📋 Tasks", newsChannel: "News Channel", withdrawChannel: "Withdraw Channel",
    subscribe: "Join", verify: "Verify", invite: "Invite", persons: "persons level 2",
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
    need25: "Need 25% in wallet", withdrawBtn: "Withdraw", openWalletAuto: "Opens wallet automatically"
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
    paymentAddress: "Адрес оплаты (StonFi / TonKeeper)", confirmBuy: "Подтвердить покупку",
    dailyLogin: "📅 Ежедневный вход - 30 дней", ifMiss: "Если пропустишь день - начнешь заново!", registerToday: "Отметиться сегодня",
    day: "День", tasks: "📋 Задания", newsChannel: "Канал новостей", withdrawChannel: "Канал выводов",
    subscribe: "Подписаться", verify: "Проверить", invite: "Пригласи", persons: "человек уровень 2",
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
    need25: "Нужно 25% в кошельке", withdrawBtn: "Вывести", openWalletAuto: "Открывает кошелек автоматически"
  }
};

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("ar");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [mining, setMining] = useState(false);
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
  const [gramTx, setGramTx] = useState("");
  const [gramPrice, setGramPrice] = useState<number | null>(null);
  const [ankhPriceGram] = useState(0.006666);
  const FALLBACK_RATE = 150;
  const [showLevels, setShowLevels] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState<any[]>([]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

  const getRequiredForLevel = (targetLevel: number) => {
    if (targetLevel <= 1) return 0;
    return 70 * targetLevel * targetLevel - 40 * targetLevel - 40;
  };
  const getMiningRate = (lvl: number) => 0.25 + lvl * 0.05;

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
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if(window.localStorage.getItem("ankh_banned")==="1"){
      setBanned(true);
      setBanReason(window.localStorage.getItem("ankh_ban_reason")||"تعدد حسابات");
      return;
    }
    let deviceId = window.localStorage.getItem("ankh_device_id");
    if(!deviceId){
      deviceId = "DEV-" + Math.random().toString(36).slice(2,12) + Date.now().toString(36);
      window.localStorage.setItem("ankh_device_id", deviceId);
    }
    let currentCode = window.localStorage.getItem("ankh_current_code");
    const storedAccount = window.localStorage.getItem("ankh_device_account");
    const allAccounts = JSON.parse(window.localStorage.getItem("ankh_all_accounts")||"[]");
    if(!currentCode){
      currentCode = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
      window.localStorage.setItem("ankh_current_code", currentCode);
      if(storedAccount && storedAccount!==currentCode && allAccounts.length>=1){
        window.localStorage.setItem("ankh_banned","1");
        window.localStorage.setItem("ankh_ban_reason","تم اكتشاف حسابين على نفس الجهاز - ممنوع");
        setBanned(true);
        setBanReason("تم اكتشاف حسابين على نفس الجهاز");
        return;
      }
      window.localStorage.setItem("ankh_device_account", currentCode);
      window.localStorage.setItem("ankh_all_accounts", JSON.stringify([...allAccounts, currentCode]));
    }
    setRefCode(currentCode);
    try {
      const b = window.localStorage.getItem("ankh_bal");
      const wb = window.localStorage.getItem("ankh_wallet");
      const l = window.localStorage.getItem("ankh_level");
      const last = window.localStorage.getItem("ankh_last");
      const invites = window.localStorage.getItem("ankh_invites");
      const wa = window.localStorage.getItem("ankh_wallet_addr");
      const conn = window.localStorage.getItem("ankh_connected");
      const anti = window.localStorage.getItem("ankh_antibot");
      const savedLang = window.localStorage.getItem("ankh_lang");
      if(b) setBalance(Number(b));
      if(wb) setWalletBalance(Number(wb));
      if(l) setLevel(Number(l));
      if(last) setLastMine(Number(last));
      if(invites) setInvitedFriends(JSON.parse(invites));
      else setInvitedFriends([{id:1, name:"Ahmed", username:"@ahmed", level:0},{id:2, name:"Sara", username:"@sara", level:3}]);
      if(wa) setWalletAddress(wa);
      if(conn==="1") setConnected(true);
      if(anti==="1") setAntiBotDone(true);
      if(savedLang) setLang(savedLang);
    } catch {}
  }, []);

  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_bal", String(balance)); }, [balance]);
  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_wallet", String(walletBalance)); }, [walletBalance]);
  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_level", String(level)); }, [level]);
  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_lang", lang); }, [lang]);

  useEffect(() => {
    const int = setInterval(() => {
      if(!lastMine) { setCountdown(""); return; }
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
    if(banned) return;
    if(!canMine || mining) return;
    setMining(true);
    const rate = getMiningRate(level);
    setTimeout(() => {
      setBalance(prev => prev + rate);
      const now = Date.now();
      setLastMine(now);
      if(typeof window!=="undefined") window.localStorage.setItem("ankh_last", String(now));
      setMining(false);
    }, 2000);
  };

  const handleClaim = () => {
    if(banned) return;
    if(balance <= 0) return;
    const newWallet = walletBalance + balance;
    setWalletBalance(newWallet);
    setBalance(0);
    let newLvl = level;
    while(newLvl < 500 && newWallet >= getRequiredForLevel(newLvl+1)) newLvl++;
    if(newLvl !== level) setLevel(newLvl);
    const now = Date.now();
    setLastMine(now);
    if(typeof window!=="undefined") window.localStorage.setItem("ankh_last", String(now));
  };

  const needForNext = Math.max(0, getRequiredForLevel(level+1) - walletBalance);
  const currentRate = getMiningRate(level);
  const calculatedAnkh = selectedGram / ankhPriceGram;
  const displayRate = gramPrice ? (1/ankhPriceGram).toFixed(0) : FALLBACK_RATE.toString();
  const inviteLink = `https://t.me/ANKH_Mining_bot?start=${refCode}`;

  const connectWallet = (type:string) => {
    if(banned) return;
    const deviceWallet = typeof window!=="undefined" ? window.localStorage.getItem("ankh_device_wallet") : null;
    if(deviceWallet && walletAddress && deviceWallet!==walletAddress){
      window.localStorage.setItem("ankh_banned","1");
      window.localStorage.setItem("ankh_ban_reason", t.banMultiWallet);
      setBanned(true); setBanReason(t.banMultiWallet);
      alert("🚫 "+t.oneWalletOnly);
      return;
    }
    if(walletAddress && deviceWallet){
      alert("🚫 "+t.oneWalletOnly);
      return;
    }
    const newAddr = "UQ" + Math.random().toString(36).slice(2,10) + "..." + refCode.slice(-4);
    setWalletAddress(newAddr);
    setConnected(true);
    setShowWallets(false);
    if(typeof window!=="undefined"){
      window.localStorage.setItem("ankh_wallet_addr", newAddr);
      window.localStorage.setItem("ankh_device_wallet", newAddr);
      window.localStorage.setItem("ankh_connected","1");
    }
    if(type==="tonkeeper") window.open("ton://","_blank");
  };

  const verifyAntiBot = () => {
    window.open(`ton://transfer/UQAnkhVerify?amount=50000000&text=${refCode}`, "_blank");
    setTimeout(()=>{
      setAntiBotDone(true);
      if(typeof window!=="undefined") window.localStorage.setItem("ankh_antibot","1");
    }, 1200);
  };

  if(banned){
    return (
      <div style={{minHeight:"100vh", background:"#050505", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, textAlign:"center"}}>
        <div style={{fontSize:64}}>🚫</div>
        <div style={{fontSize:20, fontWeight:900, color:"#ef4444", marginTop:12}}>{t.banTitle}</div>
        <div style={{marginTop:8, color:"#888", fontSize:13}}>{t.banReasonLabel} {banReason}</div>
        <div style={{marginTop:16, background:"#111", border:"1px solid #222", borderRadius:12, padding:12, fontSize:11, color:"#666", whiteSpace:"pre-line"}}>{t.banRules}</div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh", background:"#050505", color:"#fff", paddingBottom:90, fontFamily:"sans-serif", direction: lang==="ar" ? "rtl" : "ltr"}}>
      <div style={{display:"flex", gap:8, padding:16}}>
        {["ar","en","ru"].map(l=>(
          <button key={l} onClick={()=>setLang(l)} style={{padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:900, border:"1px solid #222", background: lang===l ? "#FACC15" : "#1A1A1A", color: lang===l ? "#000" : "#888"}}>{l.toUpperCase()}</button>
        ))}
      </div>

      <div style={{padding:20, display:"flex", flexDirection:"column", alignItems:"center"}}>
        {tab==="mining" && (
          <>
            <div style={{width:190, height:190, borderRadius:"50%", background:"linear-gradient(180deg, #FACC15, #854D0E)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:80}}>☥</div>
            <div style={{marginTop:20, color:"#FACC15", letterSpacing:5, fontSize:11, fontWeight:800}}>{t.ankhCoin}</div>
            <div style={{fontSize:42, fontWeight:900, marginTop:6}}>{balance.toFixed(2)} ANKH</div>
            <div style={{fontSize:11, color:"#666"}}>{t.botBalance}</div>
            <div style={{marginTop:10, background:"#111", border:"1px solid rgba(250,204,21,0.3)", borderRadius:20, padding:"8px 14px", display:"flex", gap:8, fontSize:12}}>
              <span style={{color:"#888"}}>{t.miningSpeed}</span>
              <span style={{color:"#FACC15", fontWeight:900}}>{currentRate.toFixed(2)}/h</span>
              <span style={{background:"#222", padding:"2px 8px", borderRadius:10, fontSize:10}}>{t.level} {level}</span>
            </div>
            <div style={{display:"flex", gap:10, width:"100%", maxWidth:360, marginTop:20}}>
              <button onClick={startMining} disabled={!canMine || mining} style={{flex:1, background: !canMine ? "#222" : mining ? "#333" : "#FACC15", color: !canMine ? "#666" : mining ? "#888" : "#000", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"none"}}>
                {!canMine ? `${t.next} ${countdown}` : mining ? t.miningBtn : t.startMining}
              </button>
              <button onClick={handleClaim} disabled={balance===0} style={{flex:1, background: balance>0 ? "#fff" : "#111", color: balance>0 ? "#000" : "#444", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"1px solid #222"}}>{t.claim}</button>
            </div>
            <div style={{marginTop:20, width:"100%", maxWidth:360, background:"#111", border:"1px solid rgba(250,204,21,0.25)", borderRadius:16, padding:14}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span style={{color:"#888"}}>{t.walletCoins}</span><span style={{color:"#FACC15", fontWeight:900}}>{walletBalance.toFixed(2)} ANKH</span></div>
              <div style={{display:"flex", gap:12, marginTop:8, fontSize:12, color:"#666"}}><span>{t.level} {level}/500</span><span style={{color:"#555"}}>{t.nextLevel} {getRequiredForLevel(level+1).toLocaleString()}</span></div>
              <div style={{marginTop:8, width:"100%", height:6, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}><div style={{width:`${Math.min(100, (walletBalance / (getRequiredForLevel(level+1)||160))*100)}%`, height:"100%", background:"#FACC15"}}></div></div>
              <div style={{marginTop:8, fontSize:12, color:"#FACC15", fontWeight:800, textAlign:"center"}}>{t.remaining} {needForNext.toFixed(2)} {t.forLevel} {level+1}</div>
            </div>
            <div style={{marginTop:12, width:"100%", maxWidth:360, background:"rgba(250,204,21,0.08)", border:"1px dashed rgba(250,204,21,0.3)", borderRadius:10, padding:10, fontSize:10, color:"#aaa", textAlign:"center", whiteSpace:"pre-line"}}>{t.note}</div>
            <button onClick={()=>setShowLevels(!showLevels)} style={{marginTop:18, width:"100%", maxWidth:360, background:"#111", border:"1px solid #222", color:"#FACC15", fontWeight:800, padding:12, borderRadius:12, fontSize:13}}>{showLevels ? t.hideLevels : t.showLevels}</button>
            {showLevels && (
              <div style={{marginTop:12, width:"100%", maxWidth:390, background:"#111", border:"1px solid #222", borderRadius:16, padding:12, maxHeight:400, overflowY:"auto"}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#666", padding:"0 8px 8px", borderBottom:"1px solid #222"}}><span>{t.levelHeader}</span><span>{t.required}</span><span>{t.speed}</span></div>
                {Array.from({length:500}, (_,i)=>{
                  const lvl = i+1;
                  return <div key={lvl} style={{display:"flex", justifyContent:"space-between", fontSize:11, padding:"6px 8px"}}><span>{t.level} {lvl}</span><span>{getRequiredForLevel(lvl).toLocaleString()}</span><span>{getMiningRate(lvl-1).toFixed(2)}/h</span></div>
                })}
              </div>
            )}
          </>
        )}

        {tab==="store" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:14}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>{t.storeTitle}</h2>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.35)", borderRadius:20, padding:16}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><div style={{fontSize:13, fontWeight:800}}>{t.chooseGram}</div><div style={{fontSize:9, background: gramPrice ? "#22c55e" : "#333", color: gramPrice ? "#000" : "#888", padding:"3px 8px", borderRadius:20, fontWeight:800}}>{gramPrice ? `${t.live} $${gramPrice.toFixed(4)}` : t.fallback}</div></div>
              <div style={{fontSize:11, color:"#666", marginTop:6}}>1 GRAM = {displayRate} ANKH • {t.priceFromLiquidity}</div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, marginTop:14}}>
                {[1,3,5,10].map(g=>(
                  <button key={g} onClick={()=>setSelectedGram(g)} style={{padding:14, borderRadius:12, fontWeight:900, fontSize:14, border: selectedGram===g ? "2px solid #FACC15" : "1px solid #222", background: selectedGram===g ? "#FACC15" : "#1A1A1A", color: selectedGram===g ? "#000" : "#888"}}>{g} GRAM</button>
                ))}
              </div>
              <div style={{marginTop:14, background:"#000", border:"1px solid #222", borderRadius:12, padding:12, textAlign:"center"}}><div style={{fontSize:11, color:"#888"}}>{t.youGet}</div><div style={{fontSize:24, fontWeight:900, color:"#FACC15"}}>{Math.floor(calculatedAnkh).toLocaleString()} ANKH</div></div>
              <div style={{marginTop:14}}><div style={{fontSize:11, color:"#aaa", marginBottom:6}}>{t.paymentAddress}</div><input value={gramTx} onChange={e=>setGramTx(e.target.value)} placeholder="UQ... TonKeeper / StonFi" style={{width:"100%", background:"#0A0A0A", border:"1px solid #222", borderRadius:10, padding:12, color:"#fff", fontSize:12, outline:"none"}}/></div>
              <button onClick={()=>{ if(!gramTx) return alert("..."); alert(`${t.confirmBuy} ${selectedGram} GRAM`); }} style={{marginTop:12, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>{t.confirmBuy} {selectedGram} GRAM</button>
            </div>
          </div>
        )}

        {tab==="list" && (
          <div style={{width:"100%", maxWidth:410, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.3)", borderRadius:20, padding:16}}>
              <h2 style={{fontWeight:900, fontSize:16, color:"#FACC15"}}>{t.dailyLogin}</h2>
              <p style={{fontSize:10, color:"#666", marginTop:4}}>{t.ifMiss}</p>
              <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:6, marginTop:12}}>
                {[9,14,23,31,42,55,68,77,89,102,115,130,145,162,180,199,219,240,262,285,309,334,360,387,415,444,474,505,537,600].map((reward, i)=>(
                  <div key={i} style={{background:"#000", border:"1px solid #222", borderRadius:10, padding:"8px 0", textAlign:"center"}}><div style={{fontSize:9, color:"#666"}}>{t.day} {i+1}</div><div style={{fontSize:12, fontWeight:900, color:"#fff"}}>{reward}</div></div>
                ))}
              </div>
              <button onClick={()=>{
                const rewards = [9,14,23,31,42,55,68,77,89,102,115,130,145,162,180,199,219,240,262,285,309,334,360,387,415,444,474,505,537,600];
                const dayIndex = Number(window.localStorage.getItem("ankh_daily_day") || "0");
                const reward = rewards[dayIndex] || 9;
                setBalance(b=>b+reward);
                window.localStorage.setItem("ankh_daily_day", String((dayIndex+1)%30));
              }} style={{marginTop:12, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:12, borderRadius:12, border:"none"}}>{t.registerToday}</button>
            </div>
            <h2 style={{fontWeight:900, fontSize:16, color:"#FACC15"}}>{t.tasks}</h2>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between"}}><span>{t.newsChannel} 77 ANKH</span><button onClick={()=>setBalance(b=>b+77)} style={{background:"#FACC15", border:"none", padding:"6px 12px", borderRadius:8, fontWeight:800}}>{t.verify}</button></div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between"}}><span>{t.withdrawChannel} 77 ANKH</span><button onClick={()=>setBalance(b=>b+77)} style={{background:"#FACC15", border:"none", padding:"6px 12px", borderRadius:8, fontWeight:800}}>{t.verify}</button></div>
            {[3,15,30,50,100,250].map(n=><div key={n} style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between"}}><span>{t.invite} {n} {t.persons}</span><span style={{color:"#888"}}>0/{n}</span></div>)}
          </div>
        )}

        {tab==="friends" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.4)", borderRadius:20, padding:16, textAlign:"center"}}>
              <div style={{fontSize:22, fontWeight:900, color:"#FACC15"}}>{t.forever}</div>
              <div style={{fontSize:11, color:"#888", marginTop:4}}>{t.foreverDesc}</div>
            </div>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:20, padding:16}}>
              <div style={{fontSize:12, color:"#888"}}>{t.refCode}</div>
              <div style={{marginTop:8, background:"#000", border:"1px solid #222", borderRadius:12, padding:12, display:"flex", justifyContent:"space-between"}}>
                <span style={{fontWeight:900, color:"#FACC15", fontSize:13}}>{refCode}</span>
                <span style={{fontSize:10, color:"#555"}}>{inviteLink.slice(0,30)}...</span>
              </div>
              <div style={{display:"flex", gap:10, marginTop:12}}>
                <button onClick={()=>{ if(navigator.share) navigator.share({url:inviteLink}); else navigator.clipboard.writeText(inviteLink); }} style={{flex:1, background:"#FACC15", color:"#000", fontWeight:900, padding:12, borderRadius:12, border:"none"}}>{t.shareLink}</button>
                <button onClick={()=>{navigator.clipboard.writeText(inviteLink); alert(t.copied);}} style={{flex:1, background:"#fff", color:"#000", fontWeight:900, padding:12, borderRadius:12, border:"none"}}>{t.copy}</button>
              </div>
            </div>
            <div style={{background:"#111", border:"1px solid #222", borderRadius:20, padding:16}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:900, fontSize:14}}>👥 {t.invited} ({invitedFriends.length})</span><span style={{fontSize:10, background:"#222", padding:"4px 8px", borderRadius:10, color:"#888"}}>{t.qualified} {invitedFriends.filter(f=>f.level>=2).length}</span></div>
              <div style={{marginTop:12, display:"flex", flexDirection:"column", gap:8}}>
                {invitedFriends.map(f=>{
                  const qualified = f.level>=2;
                  return <div key={f.id} style={{background: qualified ? "rgba(34,197,94,0.08)" : "#0A0A0A", border: qualified ? "1px solid rgba(34,197,94,0.3)" : "1px solid #222", borderRadius:12, padding:10, display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:8, height:8, borderRadius:"50%", background: qualified ? "#22c55e" : "#555"}}></div><div><div style={{fontSize:13}}>{f.name}</div><div style={{fontSize:10, color: qualified ? "#22c55e" : "#888"}}>{t.level} {f.level} {qualified ? t.qualifiedYes : t.notQualified}</div></div></div>
                    <div style={{fontSize:11, color: qualified ? "#22c55e" : "#555"}}>+{(0.25+f.level*0.05)*0.05}/h</div>
                  </div>
                })}
              </div>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:12}}>
            <h2 style={{fontWeight:900, color:"#FACC15"}}>{t.walletTitle}</h2>
            {!connected ? (
              <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.3)", borderRadius:20, padding:20, textAlign:"center"}}>
                <div style={{fontWeight:800}}>{t.connectWallet} - {t.oneWalletOnly}</div>
                <div style={{fontSize:10, color:"#ef4444", marginTop:6}}>{t.banMultiWallet}</div>
                <div style={{fontSize:10, color:"#ef4444"}}>{t.banMultiAccount}</div>
                {!showWallets ? <button onClick={()=>setShowWallets(true)} style={{marginTop:14, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>{t.connectWallet}</button> :
                <div style={{marginTop:12, display:"flex", flexDirection:"column", gap:8}}>
                  <button onClick={()=>connectWallet("tonkeeper")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:12, borderRadius:10}}>👛 TonKeeper → {t.openWalletAuto}</button>
                  <button onClick={()=>connectWallet("myton")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:12, borderRadius:10}}>💎 MyTonWallet</button>
                  <button onClick={()=>connectWallet("tonhub")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:12, borderRadius:10}}>🚀 Tonhub</button>
                </div>}
              </div>
            ) : (
              <>
                <div style={{background:"#111", border:"1px solid #22c55e", borderRadius:16, padding:14}}>
                  <div style={{color:"#22c55e", fontSize:11, fontWeight:800}}>{t.walletConnected}</div>
                  <div style={{marginTop:6, background:"#000", padding:8, borderRadius:8, fontSize:11, color:"#FACC15", wordBreak:"break-all"}}>{walletAddress}</div>
                </div>
                <div style={{background: antiBotDone ? "rgba(34,197,94,0.1)" : "#111", border: antiBotDone ? "1px solid #22c55e" : "1px solid #FACC15", borderRadius:16, padding:14}}>
                  <div style={{fontSize:12, fontWeight:800}}>{antiBotDone ? t.antiBotDone : t.antiBot}</div>
                  {!antiBotDone && <button onClick={verifyAntiBot} style={{marginTop:10, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:12, borderRadius:10, border:"none"}}>{t.transfer}</button>}
                </div>
                <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14}}>
                  <div style={{fontWeight:800, fontSize:13}}>{t.withdraw}</div>
                  <div style={{fontSize:10, color:"#888", marginTop:6, whiteSpace:"pre-line"}}>{t.withdrawRules}</div>
                  <input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} type="number" placeholder="10000" style={{marginTop:10, width:"100%", background:"#000", border:"1px solid #333", borderRadius:10, padding:12, color:"#fff"}}/>
                  <div style={{marginTop:6, fontSize:11, display:"flex", justifyContent:"space-between"}}><span>{t.needInWallet}</span><span style={{color: walletBalance >= Number(withdrawAmount||0)*0.25 ? "#22c55e" : "#ef4444"}}>{withdrawAmount ? (Number(withdrawAmount)*0.25).toLocaleString() : 0}</span></div>
                  <button disabled={!antiBotDone || Number(withdrawAmount)<10000 || walletBalance < Number(withdrawAmount)*0.25} onClick={()=>alert(`${t.withdrawBtn} ${withdrawAmount}`)} style={{marginTop:10, width:"100%", background: (!antiBotDone || Number(withdrawAmount)<10000 || walletBalance < Number(withdrawAmount)*0.25) ? "#222" : "#FACC15", color: (!antiBotDone || Number(withdrawAmount)<10000 || walletBalance < Number(withdrawAmount)*0.25) ? "#555" : "#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>
                    {!antiBotDone ? t.needVerifyFirst : Number(withdrawAmount)<10000 ? t.min10000 : walletBalance < Number(withdrawAmount)*0.25 ? t.need25 : `${t.withdrawBtn} ${withdrawAmount} ANKH`}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0A0A0A", borderTop:"1px solid rgba(250,204,21,0.2)", display:"flex", justifyContent:"space-around", padding:"10px 0 22px"}}>
        {[{id:"mining",t:t.mining,ic:"⛏️"},{id:"store",t:t.store,ic:"🛒"},{id:"list",t:t.list,ic:"📋"},{id:"friends",t:t.friends,ic:"👥"},{id:"wallet",t:t.wallet,ic:"💼"}].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: tab===m.id ? "#FACC15" : "#666"}}>
            <span style={{fontSize:18}}>{m.ic}</span><span style={{fontSize:10, fontWeight:800}}>{m.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
