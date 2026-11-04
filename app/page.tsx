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
    withdrawRules: "• لازم يكون معاك 25% في المحفظة\n• سحب واحد كل 24 ساعة\n• العملات اللي في المحفظة هي اللي بتزود الليفل",
    needInWallet: "تحتاج في المحفظة (25%):", needVerifyFirst: "اكد انك مش روبوت اولا", min10000: "الحد الادنى 10000",
    need25: "محتاج 25% في المحفظة", withdrawBtn: "سحب", withdrawAll: "سحب الكل", disconnect: "🔌 فصل المحفظة", openWalletAuto: "يفتح المحفظة اوتوماتيك",
    nextStory: "متبقي", storyDone: "تم اليوم - ارجع بعد 24 ساعة", notCompleted: "لم يكتمل",
    withdrawHistory: "📜 سحوباتي", pending: "معلق ⏳", sent: "مرسلة ✅", oneWithdrawPerDay: "سحب واحد كل 24 ساعة", withdrawCountdown: "متبقي للسحب التالي:",
    totalMined: "إجمالي الرصيد المعدن", inGameNoLevel: "داخل اللعبة لا يؤثر على المستوى", activeMining: "التعدين النشط", workingNow: "يعمل الآن", rounds: "الدوريات", perHour: "في الساعة", daily: "يوميا", boost: "تعزيز", lvlUp: "في المحفظة إلى المستوى", levelRules: "قواعد مستويات التعدين", howLevelUp: "كيف ترتفع المستويات والسرعة؟", alert: "تنبيه", levelRises: "المستوى يرتفع حصرياً برصيد التوكن في محفظتك الشخصية:", botNotCount: "العملات داخل التطبيق لا تُحتسب للمستوى:", collect: "جمع ANKH", checkBlockchain: "تدقيق الرصيد على البلوكشين", verified: "تم التحقق من السجل على شبكة TON", confirmedAmount: "الكمية المؤكدة", currentMult: "المضاعف الفعلي", periods: "الفترات المحسوبة", swipeToCollect: "اسحب للجمع", cancel: "إلغاء"
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
    withdrawRules: "• You need 25% in wallet\n• One withdraw per 24h\n• Wallet coins increase your level",
    needInWallet: "Need in wallet (25%):", needVerifyFirst: "Verify anti-bot first", min10000: "Min 10000",
    need25: "Need 25% in wallet", withdrawBtn: "Withdraw", withdrawAll: "Withdraw All", disconnect: "Disconnect", openWalletAuto: "Opens wallet automatically",
    nextStory: "Left", storyDone: "Done today", notCompleted: "Not completed",
    withdrawHistory: "📜 My Withdraws", pending: "Pending ⏳", sent: "Sent ✅", oneWithdrawPerDay: "One withdraw per 24h", withdrawCountdown: "Next withdraw in:",
    activeMining: "Active Mining", workingNow: "Working now", rounds: "Rounds", perHour: "Per Hour", daily: "Daily", boost: "Boost", lvlUp: "in Wallet to Level", levelRules: "Mining Level Rules",
    totalMined: "Total Mined", inGameNoLevel: "in-game no level", checkBlockchain: "Blockchain Check", verified: "Verified on TON", confirmedAmount: "Confirmed Amount", currentMult: "Current Mult", periods: "Periods", swipeToCollect: "Swipe to Collect", cancel: "Cancel", collect: "Collect ANKH"
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
    withdrawRules: "• Нужно 25% в кошельке\n• Один вывод в 24ч\n• Монеты кошелька повышают уровень",
    needInWallet: "Нужно в кошельке (25%):", needVerifyFirst: "Сначала подтверди антибот", min10000: "Мин 10000",
    need25: "Нужно 25% в кошельке", withdrawBtn: "Вывести", withdrawAll: "Вывести все", disconnect: "Отключить", openWalletAuto: "Открывает кошелек автоматически",
    nextStory: "Осталось", storyDone: "Готово сегодня", notCompleted: "Не выполнено",
    withdrawHistory: "📜 Мои выводы", pending: "В ожидании ⏳", sent: "Отправлено ✅", oneWithdrawPerDay: "Один вывод в 24ч", withdrawCountdown: "До следующего:",
    activeMining: "Активный майнинг", workingNow: "Работает сейчас", rounds: "Раунды", perHour: "В час", daily: "В день", boost: "Буст", lvlUp: "в кошельке до уровня", levelRules: "Правила уровней майнинга",
    totalMined: "Всего добыто", inGameNoLevel: "в игре", checkBlockchain: "Проверка блокчейна", verified: "Проверено в TON", confirmedAmount: "Подтверждено", currentMult: "Множитель", periods: "Периоды", swipeToCollect: "Смахните для сбора", cancel: "Отмена", collect: "Собрать ANKH"
  }
};

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("ar");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(1);
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
  const [gramPrice, setGramPrice] = useState<number | null>(null);
  const [ankhPriceGram] = useState(0.006666);
  const FALLBACK_RATE = 150;
  const [showLevels, setShowLevels] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState<any[]>([]);
  const [taskStatus, setTaskStatus] = useState<any>({});
  const [lastStory, setLastStory] = useState(0);
  const [storyCountdown, setStoryCountdown] = useState("");
  const [lastWithdraw, setLastWithdraw] = useState(0);
  const [withdrawCountdown, setWithdrawCountdown] = useState("");
  const [withdraws, setWithdraws] = useState<any[]>([]);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [swipeDone, setSwipeDone] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

  const getRequiredForLevel = (targetLevel: number) => {
    if (targetLevel <= 1) return 0;
    if (targetLevel === 2) return 320;
    if (targetLevel === 3) return 640;
    if (targetLevel === 4) return 1230;
    let req = 1230;
    for (let i = 5; i <= targetLevel; i++) {
      req = Math.floor(req * 2.05);
    }
    return req;
  };
  const getMiningRateDaily = (lvl: number) => {
    if (lvl <= 1) return 360;
    if (lvl === 2) return 450;
    if (lvl === 3) return 614;
    if (lvl === 4) return 826;
    let rate = 826;
    for (let i = 5; i <= lvl; i++) {
      rate = rate * 1.32;
    }
    return Math.floor(rate);
  };
  const getMiningRate = (lvl: number) => getMiningRateDaily(lvl) / 24;

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
    let currentCode = window.localStorage.getItem("ankh_current_code");
    if(!currentCode){
      currentCode = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
      window.localStorage.setItem("ankh_current_code", currentCode);
    }
    setRefCode(currentCode);
    const b = window.localStorage.getItem("ankh_bal"); if(b) setBalance(Number(b));
    const wb = window.localStorage.getItem("ankh_wallet"); if(wb) setWalletBalance(Number(wb));
    const l = window.localStorage.getItem("ankh_level"); if(l) setLevel(Number(l)); else setLevel(1);
    const last = window.localStorage.getItem("ankh_last"); if(last) setLastMine(Number(last));
    const invites = window.localStorage.getItem("ankh_invites"); if(invites) setInvitedFriends(JSON.parse(invites)); else setInvitedFriends([]);
    const wa = window.localStorage.getItem("ankh_wallet_addr"); if(wa) setWalletAddress(wa);
    if(window.localStorage.getItem("ankh_connected")==="1") setConnected(true);
    if(window.localStorage.getItem("ankh_antibot")==="1") setAntiBotDone(true);
    const savedLang = window.localStorage.getItem("ankh_lang"); if(savedLang) setLang(savedLang);
    const tasks = window.localStorage.getItem("ankh_tasks"); if(tasks) setTaskStatus(JSON.parse(tasks));
    const story = window.localStorage.getItem("ankh_last_story"); if(story) setLastStory(Number(story));
    const lw = window.localStorage.getItem("ankh_last_withdraw"); if(lw) setLastWithdraw(Number(lw));
    const wh = window.localStorage.getItem("ankh_withdraws"); if(wh) setWithdraws(JSON.parse(wh));
  }, []);

  useEffect(() => { localStorage.setItem("ankh_bal", String(balance)); }, [balance]);
  useEffect(() => { localStorage.setItem("ankh_wallet", String(walletBalance)); }, [walletBalance]);
  useEffect(() => { localStorage.setItem("ankh_level", String(level)); }, [level]);
  useEffect(() => { localStorage.setItem("ankh_lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("ankh_tasks", JSON.stringify(taskStatus)); }, [taskStatus]);
  useEffect(() => { localStorage.setItem("ankh_withdraws", JSON.stringify(withdraws)); }, [withdraws]);

  useEffect(() => {
    const int = setInterval(() => {
      if(!lastMine) { setCountdown(""); } else {
        const diff = lastMine + 86400000 - Date.now();
        if(diff <= 0) setCountdown(""); else setCountdown(`${Math.floor(diff/3600000)}h ${Math.floor((diff%3600000)/60000)}m ${Math.floor((diff%60000)/1000)}s`);
      }
      if(!lastStory) { setStoryCountdown(""); } else {
        const diff = lastStory + 86400000 - Date.now();
        if(diff <= 0) setStoryCountdown(""); else setStoryCountdown(`${Math.floor(diff/3600000)}h ${Math.floor((diff%3600000)/60000)}m`);
      }
      if(!lastWithdraw) { setWithdrawCountdown(""); } else {
        const diff = lastWithdraw + 86400000 - Date.now();
        if(diff <= 0) setWithdrawCountdown(""); else setWithdrawCountdown(`${Math.floor(diff/3600000)}h ${Math.floor((diff%3600000)/60000)}m ${Math.floor((diff%60000)/1000)}s`);
      }
    }, 1000);
    return () => clearInterval(int);
  }, [lastMine, lastStory, lastWithdraw]);

  const canMine = Date.now() - lastMine >= 86400000 || lastMine === 0;
  const canStory = Date.now() - lastStory >= 86400000 || lastStory === 0;
  const canWithdraw = Date.now() - lastWithdraw >= 86400000 || lastWithdraw === 0;

  const startMining = () => {
    if(banned) return;
    if(!canMine || mining) return;
    setMining(true);
    const rate = getMiningRate(level);
    setTimeout(() => {
      setBalance(prev => prev + rate);
      const now = Date.now();
      setLastMine(now);
      localStorage.setItem("ankh_last", String(now));
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
    setShowCollectModal(false);
    setSwipeDone(false);
  };

  const needForNext = Math.max(0, getRequiredForLevel(level+1) - walletBalance);
  const currentRate = getMiningRate(level);
  const dailyRate = getMiningRateDaily(level);
  const nextDailyRate = getMiningRateDaily(level+1);
  const calculatedAnkh = selectedGram / ankhPriceGram;
  const displayRate = gramPrice ? (1/ankhPriceGram).toFixed(0) : FALLBACK_RATE.toString();
  const inviteLink = `https://t.me/ANKH_Mining_bot?start=${refCode}`;
  const progress = Math.min(100, (walletBalance / (getRequiredForLevel(level+1) || 1)) * 100);

  const handleTaskGo = (id:string, link:string) => {
    if(link!=="#") window.open(link, "_blank");
    setTaskStatus({...taskStatus, [id]: "gone"});
  };
  const handleTaskVerify = (id:string, reward:number) => {
    setTaskStatus({...taskStatus, [id]: "claimed"});
    setBalance(b=>b+reward);
  };
  const handleStoryClaim = () => {
    if(!canStory) return;
    setBalance(b=>b+50);
    const now = Date.now();
    setLastStory(now);
    localStorage.setItem("ankh_last_story", String(now));
  };

  const connectWallet = (type:string) => {
    if(banned) return;
    const newAddr = "UQ" + Math.random().toString(36).slice(2,10) + "..." + refCode.slice(-4);
    setWalletAddress(newAddr);
    setConnected(true);
    setShowWallets(false);
    localStorage.setItem("ankh_wallet_addr", newAddr);
    localStorage.setItem("ankh_device_wallet", newAddr);
    localStorage.setItem("ankh_connected","1");
    if(type==="tonkeeper"){ 
      window.location.href = "ton://";
      setTimeout(()=> window.open("https://app.tonkeeper.com/ton-connect","_blank"), 800); 
    } else {
      window.location.href = "ton://";
    }
  };

  const disconnectWallet = () => {
    if(!confirm("هل انت متأكد من فصل المحفظة؟")) return;
    setConnected(false);
    setWalletAddress("");
    setShowWallets(false);
    localStorage.removeItem("ankh_wallet_addr");
    localStorage.removeItem("ankh_device_wallet");
    localStorage.removeItem("ankh_connected");
  };

  const verifyAntiBot = () => {
    window.open(`ton://transfer/UQAnkhVerify?amount=50000000&text=${refCode}`, "_blank");
    setTimeout(()=>{
      setAntiBotDone(true);
      localStorage.setItem("ankh_antibot","1");
    }, 1200);
  };
  const handleWithdraw = (amount:number) => {
    if(!antiBotDone){ alert(t.needVerifyFirst); return; }
    if(amount < 10000){ alert(t.min10000); return; }
    if(walletBalance < amount*0.25){ alert(t.need25); return; }
    if(!canWithdraw){ alert(`${t.oneWithdrawPerDay} - ${withdrawCountdown}`); return; }
    if(walletBalance < amount){ alert("رصيد غير كافي"); return; }
    const newW = { id: Date.now(), amount, status: "pending", time: Date.now() };
    setWithdraws([newW, ...withdraws]); 
    setWalletBalance(wb=>wb-amount);
    const now=Date.now(); setLastWithdraw(now); 
    localStorage.setItem("ankh_last_withdraw", String(now));
    setWithdrawAmount("");
    setTimeout(()=>{ setWithdraws(prev=> prev.map((w:any)=> w.id===newW.id ? {...w, status:"sent"} : w)); }, 5000);
  };

  if(banned){
    return (
      <div style={{minHeight:"100vh", background:"#050505", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, textAlign:"center"}}>
        <div style={{fontSize:64}}>🚫</div>
        <div style={{fontSize:20, fontWeight:900, color:"#ef4444", marginTop:12}}>{t.banTitle}</div>
        <div style={{marginTop:8, color:"#888", fontSize:13}}>{t.banReasonLabel} {banReason}</div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh", background:"#0F0F0F", color:"#fff", paddingBottom:90, fontFamily:"sans-serif", direction: lang==="ar" ? "rtl" : "ltr"}}>
      {tab==="mining" && (
        <div style={{padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#141414", borderBottom:"1px solid #222"}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <div style={{width:36, height:36, borderRadius:9, background:"#1E1E1E", border:"1px solid #333", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16}}>⬡</div>
            <div><div style={{fontWeight:900, fontSize:14}}>ANKH</div><div style={{fontSize:10, color:"#888"}}>شبكة TON</div></div>
          </div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <div style={{width:32, height:32, borderRadius:8, background:"#1E1E1E", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #222"}}>📖</div>
            <div style={{background:"#1E1E1E", padding:"5px 8px", borderRadius:8, fontSize:11, border:"1px solid #222"}}>AR</div>
            <div style={{background:"#1E1A0A", border:"1px solid #FACC15", padding:"5px 10px", borderRadius:20, fontSize:11, color:"#FACC15"}}>🏅 {t.level} {level}</div>
          </div>
        </div>
      )}

      <div style={{display:"flex", gap:8, padding:16}}>
        {["ar","en","ru"].map(l=>(
          <button key={l} onClick={()=>setLang(l)} style={{padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:900, border:"1px solid #222", background: lang===l ? "#FACC15" : "#1A1A1A", color: lang===l ? "#000" : "#888"}}>{l.toUpperCase()}</button>
        ))}
      </div>

      <div style={{padding:16, display:"flex", flexDirection:"column", alignItems:"center", gap:10}}>
        {tab==="mining" && (
          <>
            <div style={{width:"100%", maxWidth:400, background:"#1A1A1A", borderRadius:16, padding:14, border:"1px solid #222"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{display:"flex", gap:6, color:"#aaa", fontSize:12}}><span>◎</span> {t.totalMined}</div>
                <div style={{background:"#222", padding:"3px 8px", borderRadius:12, fontSize:9, color:"#888"}}>{t.inGameNoLevel}</div>
              </div>
              <div style={{fontSize:30, fontWeight:900, marginTop:8}}>{balance.toFixed(4)} <span style={{color:"#FACC15", fontSize:14}}>ANKH</span></div>
            </div>

            <div style={{width:"100%", maxWidth:400, background:"#1A1A1A", borderRadius:16, padding:14, border:"1px solid #222"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{display:"flex", gap:10, alignItems:"center"}}>
                  <div style={{width:36, height:36, borderRadius:10, background:"#222", display:"flex", alignItems:"center", justifyContent:"center"}}>⛏️</div>
                  <div><div style={{fontWeight:800, fontSize:13}}>{t.activeMining}</div><div style={{fontSize:11, color:"#22c55e"}}>● {t.workingNow}</div></div>
                </div>
                <div style={{background:"#222", border:"1px solid #333", padding:"6px 12px", borderRadius:20, fontSize:11, color:"#FACC15"}}>ⓘ {t.rounds}</div>
              </div>
              <div style={{marginTop:14}}>
                <div style={{fontSize:28, fontWeight:900, color:"#22c55e"}}>+{balance>0?balance.toFixed(4):dailyRate.toFixed(4)} <span style={{fontSize:12, color:"#888"}}>ANKH</span></div>
                <div style={{marginTop:10, width:"100%", height:5, background:"#222", borderRadius:10, overflow:"hidden"}}><div style={{width:`${progress}%`, height:"100%", background:"#FACC15"}}></div></div>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#888", marginTop:6}}><span>{t.lvlUp} {level+1} : {needForNext.toFixed(0)}+</span><span style={{color:"#FACC15"}}>{Math.floor(progress)}%</span></div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8, marginTop:14}}>
                <div style={{background:"#121212", borderRadius:12, padding:10, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:10, color:"#888"}}>⚡ {t.perHour}</div><div style={{fontWeight:900, marginTop:6}}>{currentRate.toFixed(1)}</div><div style={{fontSize:9, color:"#555"}}>ANKH</div></div>
                <div style={{background:"#121212", borderRadius:12, padding:10, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:10, color:"#888"}}>📅 {t.daily}</div><div style={{fontWeight:900, marginTop:6, color:"#22c55e"}}>~{dailyRate}</div><div style={{fontSize:9, color:"#555"}}>ANKH</div></div>
                <div style={{background:"#121212", borderRadius:12, padding:10, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:10, color:"#888"}}>↗ {t.boost}</div><div style={{fontWeight:900, marginTop:6, color:"#FACC15"}}>×{(1+level*0.15).toFixed(2)}</div><div style={{fontSize:9, color:"#555"}}>المضاعف</div></div>
              </div>
            </div>

            <div style={{width:"100%", maxWidth:400, background:"#1A1A1A", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{display:"flex", gap:10, alignItems:"center"}}>
                <div style={{width:40, height:40, borderRadius:10, background:"#2A2210", border:"1px solid #3A2E10", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}><span style={{fontSize:8, color:"#FACC15"}}>LVL</span><span style={{fontWeight:900}}>{level}</span></div>
                <div><div style={{display:"flex", gap:6, alignItems:"center"}}><span style={{background:"#FACC15", color:"#000", fontSize:8, padding:"2px 6px", borderRadius:10, fontWeight:900}}>LVL</span><span style={{fontWeight:800, fontSize:12}}>{level===1?"مجاني": level<4?"برونزي":"ذهبي"} {t.level} {level}</span></div><div style={{fontSize:11, color:"#aaa", marginTop:2}}>الخاصة بك: {walletBalance.toFixed(2)} ANKH في محفظة</div><div style={{fontSize:10, color:"#22c55e", marginTop:2}}>⚡ يحدد مستواك وسرعة أرباحك</div></div>
              </div>
              <div style={{color:"#666"}}>›</div>
            </div>

            <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:8}}>
              <div style={{background:"#1A1A1A", borderRadius:12, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
                <div style={{display:"flex", gap:8}}><div style={{width:30, height:30, borderRadius:8, background:"#222", display:"flex", alignItems:"center", justifyContent:"center"}}>🛡️</div><div><div style={{fontWeight:800, fontSize:12}}>{t.levelRules}</div><div style={{fontSize:10, color:"#FACC15"}}>{t.howLevelUp}</div></div></div>
                <div style={{background:"#222", padding:"4px 10px", borderRadius:12, fontSize:10, color:"#aaa"}}>{t.alert}</div>
              </div>
              <div style={{background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.15)", borderRadius:12, padding:10}}>
                <div style={{fontSize:11, fontWeight:800, color:"#22c55e"}}>✔ {t.levelRises}</div>
                <div style={{fontSize:10, color:"#aaa", marginTop:4}}>يتم احتساب الدوري والمستوى والمضاعف بدقة وفقاً لرصيد ANKH في المحفظة الخارجية المتصلة في TON.</div>
              </div>
              <div style={{background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.15)", borderRadius:12, padding:10}}>
                <div style={{fontSize:11, fontWeight:800, color:"#ef4444"}}>✕ {t.botNotCount}</div>
                <div style={{fontSize:10, color:"#aaa", marginTop:4}}>العملة المعدنة داخل التطبيق مخصصة للسحب. رموز ANKH إلى محفظتك لا ترفع مستواك.</div>
              </div>
            </div>

            <div style={{display:"flex", gap:10, width:"100%", maxWidth:400, marginTop:4}}>
              <button onClick={startMining} disabled={!canMine || mining} style={{flex:1, background: !canMine ? "#222" : mining ? "#333" : "#1A1A1A", color: !canMine ? "#666" : mining ? "#888" : "#fff", fontWeight:900, padding:16, borderRadius:14, fontSize:13, border:"1px solid #333"}}>
                {!canMine ? `${t.next} ${countdown}` : mining ? t.miningBtn : t.startMining} ({dailyRate}/يوم)
              </button>
              <button onClick={()=>balance>0 && setShowCollectModal(true)} style={{flex:1, background: balance>0 ? "linear-gradient(180deg, #FACC15, #EAB308)" : "#222", color: balance>0 ? "#000" : "#555", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"none"}}>
                {t.collect}
              </button>
            </div>

            <button onClick={()=>setShowLevels(!showLevels)} style={{width:"100%", maxWidth:400, background:"#111", border:"1px solid #222", color:"#FACC15", fontWeight:800, padding:12, borderRadius:12, fontSize:13, marginTop:6}}>{showLevels ? t.hideLevels : t.showLevels}</button>
            {showLevels && (
              <div style={{width:"100%", maxWidth:400, background:"#111", border:"1px solid #222", borderRadius:16, padding:12, maxHeight:400, overflowY:"auto"}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#666", padding:"0 8px 8px", borderBottom:"1px solid #222"}}><span>{t.levelHeader}</span><span>{t.required}</span><span>اليومي</span><span>{t.speed}</span></div>
                {Array.from({length:10}, (_,i)=>{
                  const lvl = i+1;
                  return <div key={lvl} style={{display:"flex", justifyContent:"space-between", fontSize:11, padding:"6px 8px", background: lvl===level ? "rgba(250,204,21,0.1)" : "transparent"}}><span>{t.level} {lvl}</span><span>{getRequiredForLevel(lvl).toLocaleString()}</span><span style={{color:"#22c55e"}}>{getMiningRateDaily(lvl)}</span><span>{getMiningRate(lvl).toFixed(1)}/h</span></div>
                })}
                <div style={{textAlign:"center", fontSize:10, color:"#666", padding:8}}>... لحد لفل 500 (360 مجاني / 450 / 614 / 826...)</div>
              </div>
            )}
          </>
        )}

        {tab==="store" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:14}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>{t.storeTitle}</h2>
            {!connected ? (
              <div style={{background:"#111", border:"1px solid #ef4444", borderRadius:20, padding:20, textAlign:"center"}}>
                <div style={{fontSize:13, color:"#ef4444", fontWeight:800}}>⚠️ {t.notConnectedStore}</div>
                <button onClick={()=>setTab("wallet")} style={{marginTop:12, background:"#FACC15", color:"#000", padding:"10px 16px", borderRadius:10, border:"none", fontWeight:800}}>{t.connectWallet}</button>
              </div>
            ) : (
              <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.35)", borderRadius:20, padding:16}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{fontSize:13, fontWeight:800}}>{t.chooseGram}</div>
                  <div style={{fontSize:9, background: gramPrice ? "#22c55e" : "#333", color: gramPrice ? "#000" : "#888", padding:"3px 8px", borderRadius:20, fontWeight:800}}>{gramPrice ? `${t.live} $${gramPrice.toFixed(4)}` : t.fallback}</div>
                </div>
                <div style={{fontSize:11, color:"#666", marginTop:6}}>1 GRAM = {displayRate} ANKH • {t.priceFromLiquidity}</div>
                <div style={{marginTop:8, fontSize:10, color:"#22c55e", background:"rgba(34,197,94,0.1)", padding:"6px 10px", borderRadius:8}}>{t.connectedWith}: {walletAddress}</div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, marginTop:14}}>
                  {[1,3,5,10].map(g=>(
                    <button key={g} onClick={()=>setSelectedGram(g)} style={{padding:14, borderRadius:12, fontWeight:900, fontSize:14, border: selectedGram===g ? "2px solid #FACC15" : "1px solid #222", background: selectedGram===g ? "#FACC15" : "#1A1A1A", color: selectedGram===g ? "#000" : "#888"}}>{g} GRAM</button>
                  ))}
                </div>
                <div style={{marginTop:14}}>
                  <div style={{fontSize:11, color:"#aaa", marginBottom:6}}>{t.customAmount}</div>
                  <input type="number" min={1} value={selectedGram} onChange={e=>setSelectedGram(Number(e.target.value)||1)} placeholder="مثال: 2.5" style={{width:"100%", background:"#0A0A0A", border:"1px solid #222", borderRadius:10, padding:12, color:"#fff", fontSize:16, outline:"none"}}/>
                </div>
                <div style={{marginTop:14, background:"#000", border:"1px solid #222", borderRadius:12, padding:12, textAlign:"center"}}>
                  <div style={{fontSize:11, color:"#888"}}>{t.youGet}</div>
                  <div style={{fontSize:26, fontWeight:900, color:"#FACC15", marginTop:2}}>{Math.floor(calculatedAnkh).toLocaleString()} ANKH</div>
                  <div style={{fontSize:10, color:"#555", marginTop:2}}>مقابل {selectedGram} GRAM</div>
                </div>
                <button onClick={()=>{
                  const amount = (selectedGram * 1e9).toString();
                  window.open(`ton://transfer/UQAnkhStoreAddress?amount=${amount}&text=buy_${selectedGram}_GRAM_${refCode}`, "_blank");
                  setTimeout(()=>{
                    setWalletBalance(wb=>wb + Math.floor(calculatedAnkh));
                    alert(`${t.youGet} ${Math.floor(calculatedAnkh).toLocaleString()} ANKH`);
                  }, 1500);
                }} style={{marginTop:14, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none", fontSize:14}}>
                  {t.confirmBuy} {selectedGram} GRAM - {Math.floor(calculatedAnkh).toLocaleString()} ANKH
                </button>
              </div>
            )}
          </div>
        )}

        {tab==="list" && (
          <div style={{width:"100%", maxWidth:410, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.5)", borderRadius:20, padding:16}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <div style={{fontSize:14, fontWeight:900, color:"#FACC15"}}>📸 {t.storyTask}</div>
                  <div style={{fontSize:11, color:"#888", marginTop:2}}>{t.storyReward}</div>
                </div>
                <div style={{fontSize:10, background: canStory ? "#22c55e" : "#222", color: canStory ? "#000" : "#888", padding:"4px 8px", borderRadius:10, fontWeight:800}}>
                  {canStory ? "جاهز" : `${t.nextStory} ${storyCountdown}`}
                </div>
              </div>
              <button onClick={handleStoryClaim} disabled={!canStory} style={{marginTop:12, width:"100%", background: canStory ? "#FACC15" : "#222", color: canStory ? "#000" : "#555", fontWeight:900, padding:12, borderRadius:12, border:"none"}}>
                {canStory ? `${t.claimTask} 50 ANKH` : t.storyDone}
              </button>
            </div>

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

            <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div><div style={{fontSize:13, fontWeight:800}}>{t.newsChannel}</div><div style={{fontSize:11, color:"#FACC15"}}>77 ANKH</div></div>
              <div>
                {!taskStatus["news"] && <button onClick={()=>handleTaskGo("news","https://t.me/ANKH_News")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:"8px 14px", borderRadius:8, fontWeight:800, fontSize:12}}>{t.go} ↗</button>}
                {taskStatus["news"]==="gone" && <span style={{background:"#333", color:"#888", padding:"8px 12px", borderRadius:8, fontSize:11}}>... {t.verify}</span>}
                {taskStatus["news"]==="verify" && <button onClick={()=>handleTaskVerify("news",77)} style={{background:"#FACC15", color:"#000", padding:"8px 14px", borderRadius:8, fontWeight:800, fontSize:12, border:"none"}}>{t.verify}</button>}
                {taskStatus["news"]==="claimed" && <span style={{background:"#22c55e", color:"#000", padding:"6px 12px", borderRadius:8, fontSize:11, fontWeight:800}}>✓</span>}
              </div>
            </div>

            {[3,15,30,50,100,250].map(n=>{
              const id = `invite_${n}`;
              const reward = n===3?150:n===15?1250:n===30?2750:n===50?4650:n===100?7490:9850;
              return (
                <div key={n} style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div><div style={{fontSize:13, fontWeight:800}}>{t.invite} {n} {t.persons}</div><div style={{fontSize:11, color:"#FACC15"}}>{reward} ANKH</div></div>
                  <div style={{display:"flex", alignItems:"center", gap:8}}>
                    {!taskStatus[id] && <><button onClick={()=>handleTaskGo(id,"#")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:"8px 12px", borderRadius:8, fontSize:11}}>{t.go}</button><span style={{fontSize:10, color:"#666"}}>0/{n}</span></>}
                    {taskStatus[id]==="gone" && <button onClick={()=>handleTaskVerify(id,reward)} style={{background:"#FACC15", color:"#000", padding:"8px 12px", borderRadius:8, fontWeight:800, fontSize:11}}>{t.verify}</button>}
                    {taskStatus[id]==="claimed" && <span style={{background:"#22c55e", color:"#000", padding:"6px 12px", borderRadius:8, fontSize:11}}>✓</span>}
                  </div>
                </div>
              )
            })}
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
                {invitedFriends.length===0 ? <div style={{color:"#666", fontSize:12, textAlign:"center", padding:20}}>{t.noFriends}</div> : invitedFriends.map((f:any)=>{
                  const qualified = f.level>=2;
                  return <div key={f.id} style={{background: qualified ? "rgba(34,197,94,0.08)" : "#0A0A0A", border: qualified ? "1px solid rgba(34,197,94,0.3)" : "1px solid #222", borderRadius:12, padding:10, display:"flex", justifyContent:"space-between"}}>
                    <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:8, height:8, borderRadius:"50%", background: qualified ? "#22c55e" : "#555"}}></div><div><div style={{fontSize:13}}>{f.name}</div><div style={{fontSize:10, color: qualified ? "#22c55e" : "#888"}}>{t.level} {f.level} {qualified ? t.qualifiedYes : t.notQualified}</div></div></div>
                    <div style={{fontSize:11, color: qualified ? "#22c55e" : "#555"}}>+{(getMiningRate(f.level)*0.05).toFixed(2)}/h</div>
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
                {!showWallets ? <button onClick={()=>setShowWallets(true)} style={{marginTop:14, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>{t.connectWallet}</button> :
                <div style={{marginTop:12, display:"flex", flexDirection:"column", gap:8}}>
                  <button onClick={()=>connectWallet("tonkeeper")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:12, borderRadius:10}}>👛 TonKeeper → {t.openWalletAuto}</button>
                  <button onClick={()=>connectWallet("myton")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:12, borderRadius:10}}>💎 MyTonWallet</button>
                </div>}
              </div>
            ) : (
              <>
                <div style={{background:"#111", border:"1px solid #22c55e", borderRadius:16, padding:14}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{color:"#22c55e", fontSize:11, fontWeight:800}}>{t.walletConnected}</div>
                    <button onClick={disconnectWallet} style={{background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", color:"#ef4444", fontSize:10, padding:"4px 10px", borderRadius:8, fontWeight:800}}>{t.disconnect}</button>
                  </div>
                  <div style={{marginTop:6, background:"#000", padding:8, borderRadius:8, fontSize:11, color:"#FACC15", wordBreak:"break-all"}}>{walletAddress}</div>
                </div>
                <div style={{background: antiBotDone ? "rgba(34,197,94,0.1)" : "#111", border: antiBotDone ? "1px solid #22c55e" : "1px solid #FACC15", borderRadius:16, padding:14}}>
                  <div style={{fontSize:12, fontWeight:800}}>{antiBotDone ? t.antiBotDone : t.antiBot}</div>
                  {!antiBotDone && <button onClick={verifyAntiBot} style={{marginTop:10, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:12, borderRadius:10, border:"none"}}>{t.transfer}</button>}
                </div>
                <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14}}>
                  <div style={{fontWeight:800, fontSize:13}}>{t.withdraw}</div>
                  <div style={{fontSize:10, color:"#888", marginTop:6, whiteSpace:"pre-line"}}>{t.withdrawRules}</div>
                  {!canWithdraw && <div style={{marginTop:8, background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, padding:8, fontSize:11, color:"#ef4444", textAlign:"center"}}>{t.withdrawCountdown} {withdrawCountdown}</div>}
                  <div style={{display:"flex", gap:8, marginTop:10}}>
                    <input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} type="number" inputMode="decimal" placeholder="10000" style={{flex:1, background:"#000", border:"1px solid #333", borderRadius:10, padding:12, color:"#fff", fontSize:16, outline:"none"}}/>
                    <button onClick={()=>setWithdrawAmount(String(Math.floor(walletBalance)))} style={{background:"#222", color:"#FACC15", padding:"0 14px", borderRadius:10, border:"1px solid #333", fontWeight:800, fontSize:12}}>{t.withdrawAll}</button>
                  </div>
                  <div style={{marginTop:6, fontSize:11, display:"flex", justifyContent:"space-between"}}><span>{t.needInWallet}</span><span style={{color: walletBalance >= Number(withdrawAmount||0)*0.25 ? "#22c55e" : "#ef4444"}}>{withdrawAmount ? (Number(withdrawAmount)*0.25).toLocaleString() : 0}</span></div>
                  <button disabled={!antiBotDone || Number(withdrawAmount)<10000 || walletBalance < Number(withdrawAmount)*0.25 || !canWithdraw} onClick={()=>handleWithdraw(Number(withdrawAmount))} style={{marginTop:10, width:"100%", background: (!antiBotDone || Number(withdrawAmount)<10000 || walletBalance < Number(withdrawAmount)*0.25 || !canWithdraw) ? "#222" : "#FACC15", color: (!antiBotDone || Number(withdrawAmount)<10000 || walletBalance < Number(withdrawAmount)*0.25 || !canWithdraw) ? "#555" : "#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>
                    {!antiBotDone ? t.needVerifyFirst : Number(withdrawAmount)<10000 ? t.min10000 : walletBalance < Number(withdrawAmount)*0.25 ? t.need25 : !canWithdraw ? `${t.oneWithdrawPerDay} ${withdrawCountdown}` : `${t.withdrawBtn} ${withdrawAmount} ANKH`}
                  </button>
                </div>
                <div style={{background:"#111", border:"1px solid #222", borderRadius:16, padding:14}}>
                  <div style={{fontWeight:800, fontSize:13}}>{t.withdrawHistory} ({withdraws.length})</div>
                  {withdraws.length===0 ? <div style={{marginTop:10, color:"#666", fontSize:12, textAlign:"center", padding:12}}>لا يوجد سحوبات</div> : <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:8, maxHeight:250, overflowY:"auto"}}>{withdraws.map((w:any)=><div key={w.id} style={{background:"#0A0A0A", border:"1px solid #222", borderRadius:10, padding:10, display:"flex", justifyContent:"space-between", fontSize:12}}><span>{w.amount.toLocaleString()} ANKH</span><span style={{background: w.status==="pending" ? "#FACC15" : "#22c55e", color: w.status==="pending" ? "#000" : "#fff", padding:"2px 8px", borderRadius:10, fontSize:10, fontWeight:800}}>{w.status==="pending" ? t.pending : t.sent}</span></div>)}</div>}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {showCollectModal && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:100, padding:10}}>
          <div style={{width:"100%", maxWidth:400, background:"#1A1A1A", borderRadius:20, padding:14, border:"1px solid #333"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
              <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:28, height:28, borderRadius:8, background:"rgba(34,197,94,0.15)", display:"flex", alignItems:"center", justifyContent:"center"}}>🛡️</div><div><div style={{fontWeight:800, fontSize:12}}>{t.checkBlockchain}</div><div style={{fontSize:10, color:"#22c55e"}}>{t.verified}</div></div></div>
              <button onClick={()=>setShowCollectModal(false)} style={{background:"none", border:"none", color:"#888", fontSize:18}}>✕</button>
            </div>
            <div style={{background:"#121212", borderRadius:14, padding:14, border:"1px solid #222", textAlign:"center"}}>
              <div style={{fontSize:11, color:"#888"}}>{t.confirmedAmount}</div>
              <div style={{fontSize:28, fontWeight:900, color:"#22c55e", marginTop:4}}>+{balance.toFixed(4)} <span style={{fontSize:12, color:"#888"}}>ANKH</span></div>
              <div style={{display:"flex", gap:6, justifyContent:"center", marginTop:8}}>
                <div style={{background:"#222", padding:"4px 8px", borderRadius:12, fontSize:10, color:"#aaa"}}>⏱️ {countdown || "24 52M"}</div>
                <div style={{background:"#2A2210", border:"1px solid #FACC15", padding:"4px 8px", borderRadius:12, fontSize:10, color:"#FACC15"}}>{t.currentMult} ×{(1+level*0.15).toFixed(2)}</div>
              </div>
            </div>
            <div style={{marginTop:12, background:"#222", borderRadius:12, padding:4, display:"flex", alignItems:"center", position:"relative", height:48}}>
              <div style={{position:"absolute", left:4, width:40, height:40, background:"linear-gradient(180deg, #FACC15, #EAB308)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#000", fontWeight:900, transform: swipeDone ? "translateX(300px)" : "translateX(0)", transition:"all 0.4s"}}>››</div>
              <button onClick={()=>{ setSwipeDone(true); setTimeout(handleClaim, 500); }} style={{width:"100%", background:"none", border:"none", color:"#888", fontSize:13, fontWeight:700}}>{swipeDone ? "تم..." : `→ ${t.swipeToCollect}`}</button>
            </div>
            <button onClick={()=>setShowCollectModal(false)} style={{width:"100%", marginTop:8, background:"#222", color:"#888", padding:12, borderRadius:12, border:"none", fontSize:13}}>{t.cancel}</button>
          </div>
        </div>
      )}

      <div style={{position:"fixed", bottom:10, left:10, right:10, background:"#1C1C1E", border:"1px solid #2A2A2A", borderRadius:18, display:"flex", justifyContent:"space-around", padding:"6px 0"}}>
        {[{id:"mining",t:t.mining,ic:"⛏️"},{id:"store",t:t.store,ic:"🛒"},{id:"list",t:t.list,ic:"🗂️"},{id:"friends",t:t.friends,ic:"👥"},{id:"wallet",t:t.wallet,ic:"💼"}].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} style={{background: tab===m.id ? "#2A2A2A" : "none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: tab===m.id ? "#FACC15" : "#666", padding:"6px 14px", borderRadius:12}}>
            <span style={{fontSize:18}}>{m.ic}</span><span style={{fontSize:10, fontWeight:800, marginTop:2}}>{m.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
