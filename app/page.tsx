"use client";
import { useState, useEffect } from "react";
import { TonConnectUIProvider, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const TREASURY_WALLET = "UQBpa_tNmxOcfzdVWQm_9oJVvhZ673Y9rVbpDHi8WPXj4r3Y";

const TRANSLATIONS: any = {
  ar: {
    mining: "ANKH Mining",
    subtitle: "عدن لتصنع المجد بنفسك",
    balance: "الرصيد المعدن",
    active: "التعدين النشط",
    working: "يعمل الآن",
    ready: "جاهز للجمع!",
    claim: "استلم ANKH",
    perHour: "في الساعة",
    daily: "يوميا",
    boost: "تعزيز",
    tier: "الدوري",
    nextLevel: "المستوى التالي:",
    profile: "الملف الشخصي",
    smallLevel: "مستوي الصغير",
    tiersTitle: "الدوريات والمستويات",
    yourTier: "دوريك",
    walletBal: "الرصيد في المحفظة",
    browse: "تصفح المستويات",
    levelsTitle: "مستويات التعدين",
    levelsSub: "استكشف 500 مستوى",
    small: "مستوى",
    reqWallet: "الرصيد في المحفظة",
    perDay: "ANKH / اليوم",
    main: "الرئيسية",
    miningTab: "التعدين",
    market: "السوق",
    friends: "الأصدقاء",
    wallet: "المحفظة",
    chartTitle: "إنتاج التعدين",
    chartSub: "الإنتاج يزيد مع احتفاظك",
    walletTitle: "المحفظة",
    allAssets: "جميع اصولك في مكان واحد",
    appBalance: "رصيد التطبيق",
    blockchainBal: "رصيد البلوكتشين",
    onChain: "على السلسلة",
    inApp: "في التطبيق",
    withdraw: "سحب",
    deposit: "ايداع",
    totalMined: "اجمالي المعدن",
    walletAge: "عمر المحفظة",
    days: "يوم",
    minWithdraw: "الحد الادنى 10,000 ANKH",
    amount: "الكمية",
    youWillGet: "سوف تحصل على",
    fee: "الرسوم 5%",
    reserve: "الاحتياطي 25%",
    submitWithdraw: "تقديم طلب السحب",
    history: "السجل",
    buy: "شراء",
    tonPrice: "سعر TON",
    friendsTitle: "ادعو الاصدقاء",
    inviteCode: "كود الدعوة",
    copy: "نسخ",
    share: "مشاركة",
    invited: "المدعوين",
    earnings: "الارباح",
  },
  en: {
    mining: "ANKH Mining",
    subtitle: "Mine to build glory",
    balance: "Mined Balance",
    active: "Active Mining",
    working: "Working Now",
    claim: "Claim ANKH",
    perHour: "Per Hour",
    daily: "Daily",
    boost: "Boost",
    tier: "Tier",
    nextLevel: "Next Level:",
    profile: "Profile",
    smallLevel: "Small Level",
    tiersTitle: "Tiers & Levels",
    yourTier: "Your Tier",
    walletBal: "Wallet Balance",
    browse: "Browse Levels",
    levelsTitle: "Mining Levels",
    levelsSub: "Explore 500 levels",
    small: "Level",
    reqWallet: "Wallet Required",
    perDay: "ANKH / Day",
    main: "Home",
    miningTab: "Mining",
    market: "Market",
    friends: "Friends",
    wallet: "Wallet",
    chartTitle: "Mining Production",
    chartSub: "Production rises with holding",
    walletTitle: "Wallet",
    allAssets: "All your assets",
    appBalance: "App Balance",
    blockchainBal: "Blockchain Balance",
    onChain: "On-Chain",
    inApp: "In App",
    withdraw: "Withdraw",
    deposit: "Deposit",
    totalMined: "Total Mined",
    walletAge: "Wallet Age",
    days: "days",
    minWithdraw: "Min 10,000 ANKH",
    amount: "Amount",
    youWillGet: "You will get",
    fee: "Fee 5%",
    reserve: "Reserve 25%",
    submitWithdraw: "Submit",
    history: "History",
    buy: "Buy",
    tonPrice: "TON Price",
    friendsTitle: "Invite Friends",
    inviteCode: "Invite Code",
    copy: "Copy",
    share: "Share",
    invited: "Invited",
    earnings: "Earnings",
  },
  ru: {
    mining: "ANKH Mining",
    subtitle: "Майни славу",
    balance: "Добытый баланс",
    active: "Активный майнинг",
    working: "Работает",
    claim: "Получить ANKH",
    perHour: "В час",
    daily: "В день",
    boost: "Буст",
    tier: "Лига",
    nextLevel: "След:",
    profile: "Профиль",
    smallLevel: "Мал. уровень",
    tiersTitle: "Лиги и уровни",
    yourTier: "Твоя лига",
    walletBal: "Баланс",
    browse: "Уровни",
    levelsTitle: "Уровни",
    small: "Ур.",
    reqWallet: "Нужно",
    perDay: "ANKH / День",
    main: "Главная",
    miningTab: "Майнинг",
    market: "Рынок",
    friends: "Друзья",
    wallet: "Кошелек",
    chartTitle: "Производство",
    chartSub: "Растет с холдом",
    walletTitle: "Кошелек",
    allAssets: "Все активы",
    appBalance: "Баланс",
    blockchainBal: "Блокчейн",
    onChain: "На цепи",
    inApp: "В приложении",
    withdraw: "Вывод",
    deposit: "Депозит",
    totalMined: "Добыто",
    walletAge: "Возраст",
    days: "дней",
    minWithdraw: "Мин 10,000",
    amount: "Сумма",
    youWillGet: "Вы получите",
    fee: "Комиссия 5%",
    reserve: "Резерв 25%",
    submitWithdraw: "Вывести",
    history: "История",
    buy: "Купить",
    tonPrice: "Цена TON",
    friendsTitle: "Пригласи друзей",
    inviteCode: "Ваш код",
    copy: "Копировать",
    share: "Поделиться",
    invited: "Приглашенные",
    earnings: "Заработок",
  },
};

const TIERS = [
  { id: "bronze", n: "البرونزي", r: "1-100", start: 1, startId: 1, color: "#FACC15", en: "Bronze" },
  { id: "silver", n: "الفضي", r: "101-200", start: 101, startId: 101, color: "#C0C0C0", en: "Silver" },
  { id: "gold", n: "الذهبي", r: "201-300", start: 201, startId: 201, color: "#F59E0B", en: "Gold" },
  { id: "platinum", n: "البلاتيني", r: "301-400", start: 301, startId: 301, color: "#38BDF8", en: "Platinum" },
  { id: "legendary", n: "أسطوري", r: "401-500", start: 401, startId: 401, color: "#A855F7", en: "Legendary" },
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
  const base = BASE_LEVELS.find((x) => x.lvl === lvl);
  if (base) return base;
  let lastReq = 10000;
  let lastDaily = 450;
  for (let i = 8; i <= lvl; i++) {
    lastReq = Math.floor(lastReq * 1.12);
    lastDaily = Math.floor(lastDaily * 1.03);
  }
  return { lvl, req: lastReq, daily: lastDaily, hourly: +(lastDaily / 24).toFixed(1) };
};

function AnkhInner() {
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(1);
  const [view, setView] = useState<"main" | "tiers" | "levels" | "market">("main");
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
  const [walletView, setWalletView] = useState<"main" | "withdraw">("main");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [walletCreatedAt, setWalletCreatedAt] = useState(Date.now());
  const [onChainAnkh, setOnChainAnkh] = useState(0);
  const [showLevels, setShowLevels] = useState(false);

  const t = TRANSLATIONS[lang];
  const getReq = (l: number) => getLevelData(l).req;
  const getHourly = (l: number) => getLevelData(l).hourly;
  const getDaily = (l: number) => getLevelData(l).daily;
  const ankhAmount = tonAmount ? Number(tonAmount) / ankhPrice : 0;

  useEffect(() => {
    const wb = localStorage.getItem("ankh_wallet");
    if (wb) setWalletBalance(Number(wb));
    const lv = localStorage.getItem("ankh_level");
    if (lv) setLevel(Number(lv));
    const lm = localStorage.getItem("ankh_last_mine");
    const lb = localStorage.getItem("ankh_bal");
    const now = Date.now();
    if (lm) {
      const last = Number(lm);
      setLastMine(last);
      const elapsedHours = (now - last) / 3600000;
      const currentHourly = getHourly(Number(lv) || 1);
      const offlineEarned = Math.min(currentHourly * 2, currentHourly * (elapsedHours < 24 ? elapsedHours : 2));
      setBalance(Number(lb || 0) + offlineEarned);
    } else {
      setLastMine(now);
      localStorage.setItem("ankh_last_mine", String(now));
    }
    const savedLang = localStorage.getItem("ankh_lang");
    if (savedLang) setLang(savedLang);
    const wc = localStorage.getItem("ankh_wallet_created");
    if (wc) setWalletCreatedAt(Number(wc));
    else {
      localStorage.setItem("ankh_wallet_created", String(now));
      setWalletCreatedAt(now);
    }
    const oc = localStorage.getItem("ankh_onchain");
    if (oc) setOnChainAnkh(Number(oc));
    const hist = localStorage.getItem("ankh_tx_hist");
    if (hist) { try { setTxHistory(JSON.parse(hist)); } catch {} }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMine < 86400000) {
        setBalance((b) => {
          const newB = b + getHourly(level) / 3600;
          localStorage.setItem("ankh_bal", String(newB));
          return newB;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastMine, level]);

  const daily = getDaily(level);
  const hourly = getHourly(level);
  const nextReq = getReq(level + 1);
  const progress = Math.min(100, (walletBalance / (nextReq || 1)) * 100);
  const needForNext = Math.max(0, nextReq - walletBalance);

  const handleClaim = () => {
    if (balance <= 0) return;
    const newW = walletBalance + balance;
    setWalletBalance(newW);
    localStorage.setItem("ankh_wallet", String(newW));
    setBalance(0);
    const now = Date.now();
    setLastMine(now);
    localStorage.setItem("ankh_last_mine", String(now));
    localStorage.setItem("ankh_bal", "0");
    let nl = level;
    while (newW >= getReq(nl + 1) && nl < 500) nl++;
    setLevel(nl);
    localStorage.setItem("ankh_level", String(nl));
  };

  const changeLang = (l: string) => {
    setLang(l);
    localStorage.setItem("ankh_lang", l);
    setShowLang(false);
  };

  const chartPoints = [0, 15, 30, 25, 45, 60, 55, 80, 95, 85, 100];
  const walletAgeDays = Math.floor((Date.now() - walletCreatedAt) / (1000 * 60 * 60 * 24));
  const requiredReserve = withdrawAmount ? Number(withdrawAmount) * 0.25 : 0;
  const withdrawFee = withdrawAmount ? Number(withdrawAmount) * 0.05 : 0;
  const willReceive = withdrawAmount ? Number(withdrawAmount) - withdrawFee : 0;
  const hasMinAmount = Number(withdrawAmount) >= 10000;
  const hasAppBalance = walletBalance >= Number(withdrawAmount);
    const handleBuy = async () => {
    if (!isConnected) { tonConnectUI.openModal(); return; }
    if (!tonAmount || Number(tonAmount) <= 0) return alert("ادخل كمية");
    try {
      const amountNano = (Number(tonAmount) * 1e9).toString();
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [{ address: TREASURY_WALLET, amount: amountNano }],
      });
      const newEntry = { id: Date.now(), ton: Number(tonAmount), ankh: ankhAmount, date: new Date().toLocaleString(), status: "تم" };
      const newHist = [newEntry, ...txHistory];
      setTxHistory(newHist);
      localStorage.setItem("ankh_tx_hist", JSON.stringify(newHist));
      const newW = walletBalance + ankhAmount;
      setWalletBalance(newW);
      localStorage.setItem("ankh_wallet", String(newW));
      const newOn = onChainAnkh + ankhAmount;
      setOnChainAnkh(newOn);
      localStorage.setItem("ankh_onchain", String(newOn));
      let nl = level;
      while (newW >= getReq(nl + 1) && nl < 500) nl++;
      setLevel(nl);
      localStorage.setItem("ankh_level", String(nl));
      alert(`تم الشراء! ${ankhAmount.toFixed(0)} ANKH`);
    } catch { alert("فشلت العملية"); }
  };

  const handleWithdraw = async () => {
    if (!isConnected) return alert("اربط المحفظة!");
    if (!hasMinAmount) return alert(t.minWithdraw);
    if (!hasAppBalance) return alert("رصيد غير كافي");
    if (onChainAnkh < requiredReserve) return alert(`لازم ${requiredReserve.toLocaleString()} ANKH بلوكتشين - رصيدك ${onChainAnkh}`);
    const newW = { id: Date.now(), amount: Number(withdrawAmount), fee: withdrawFee, receive: willReceive, date: new Date().toLocaleDateString("ar-EG"), status: "يعالج" };
    const updated = [newW, ...withdrawals];
    setWithdrawals(updated);
    localStorage.setItem("ankh_withdrawals", JSON.stringify(updated));
    const newBal = walletBalance - Number(withdrawAmount);
    setWalletBalance(newBal);
    localStorage.setItem("ankh_wallet", String(newBal));
    setWithdrawAmount("");
    alert(`تم الطلب! ${willReceive.toFixed(0)} ANKH`);
    setWalletView("main");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08080C", color: "#fff", paddingBottom: 90, direction: lang === "ar" ? "rtl" : "ltr" }}>
      {/* HEADER - STON.fi القديم رجع */}
      <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0F0F14" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(180deg,#FACC15,#854D0E)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #FACC15", color: "#000", fontWeight: 900 }}>☥</div>
          <span style={{ fontWeight: 900 }}>ANKH</span>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowLang(!showLang)} style={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 20, padding: "6px 12px", fontSize: 11, color: "#fff" }}>{lang.toUpperCase()} ▾</button>
            {showLang && (
              <div style={{ position: "absolute", top: 35, left: 0, background: "#1A1A1A", border: "1px solid #333", borderRadius: 10, zIndex: 50 }}>
                <div onClick={() => changeLang("ar")} style={{ padding: "8px 16px", fontSize: 12 }}>AR 🇪🇬</div>
                <div onClick={() => changeLang("en")} style={{ padding: "8px 16px", fontSize: 12 }}>EN 🇺🇸</div>
                <div onClick={() => changeLang("ru")} style={{ padding: "8px 16px", fontSize: 12 }}>RU 🇷🇺</div>
              </div>
            )}
          </div>
        </div>
        <div style={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 20, padding: "6px 12px", fontSize: 11 }}>{t.profile} - {t.smallLevel} {level}</div>
      </div>

      {view === "main" && tab === "home" && (
        <>
          <div style={{ margin: "0 12px", height: 90, borderRadius: 16, background: "linear-gradient(90deg, #1A1500, #1A1A2A)", border: "1px solid #2A2A1A", padding: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 900 }}>{t.mining}</div>
            <div style={{ fontSize: 11, color: "#FACC15", marginTop: 2 }}>{t.subtitle}</div>
          </div>

          <div style={{ margin: "10px 12px 0", background: "#14141A", borderRadius: 14, padding: 10, border: "1px solid #222", display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontSize: 11, color: "#888" }}>{t.balance}</div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>ANKH {walletBalance.toFixed(4)}</div>
          </div>

          <div style={{ margin: "10px 12px 0", background: "linear-gradient(180deg, #1E1A2E 0%, #0F0F1A 100%)", borderRadius: 18, padding: 12, border: "1px solid #2A2A4A" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ background: "rgba(250,204,21,0.15)", border: "1px solid #FACC15", padding: "4px 10px", borderRadius: 12, fontSize: 11, color: "#FACC15" }}>⚡ x1.00</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 12, fontWeight: 800 }}>{t.active}</div>
                <div style={{ fontSize: 10, color: "#22c55e" }}>{t.working} ●</div>
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#5EE9FF", marginTop: 14 }}>+{balance.toFixed(4)} ANKH</div>
            <button onClick={handleClaim} style={{ marginTop: 10, width: "100%", background: balance > 0 ? "linear-gradient(90deg, #A855F7, #38BDF8)" : "#222", padding: 12, borderRadius: 12, border: "none", color: "#fff", fontWeight: 900 }}>
              {t.claim} {balance > 0 ? `(${balance.toFixed(2)})` : ""}
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, margin: "10px 12px 0" }}>
            <div style={{ background: "#12121A", borderRadius: 12, padding: 8, textAlign: "center", border: "1px solid #222" }}><div style={{ fontSize: 9, color: "#888" }}>{t.perHour}</div><div style={{ fontWeight: 900, color: "#FACC15" }}>{hourly}</div></div>
            <div style={{ background: "#12121A", borderRadius: 12, padding: 8, textAlign: "center", border: "1px solid #222" }}><div style={{ fontSize: 9, color: "#888" }}>{t.daily}</div><div style={{ fontWeight: 900, color: "#22c55e" }}>{daily}~</div></div>
            <div style={{ background: "#12121A", borderRadius: 12, padding: 8, textAlign: "center", border: "1px solid #222" }}><div style={{ fontSize: 9, color: "#888" }}>{t.boost}</div><div style={{ fontWeight: 900, color: "#FACC15" }}>1.00x</div></div>
            <div style={{ background: "#1A1500", borderRadius: 12, padding: 8, textAlign: "center", border: "1px solid #FACC15" }}><div style={{ fontSize: 9, color: "#888" }}>{t.tier}</div><div style={{ fontWeight: 900, color: "#FACC15" }}>Lv.{level}</div></div>
          </div>

          <div onClick={() => setView("tiers")} style={{ margin: "10px 12px 0", background: "#12121A", borderRadius: 12, padding: 10, border: "1px solid #222" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}><span>ANKH {walletBalance.toFixed(0)} / {nextReq}</span><span>{t.nextLevel} {level + 1}</span></div>
            <div style={{ height: 4, background: "#222", borderRadius: 10, marginTop: 8 }}><div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#FACC15,#22c55e)" }}></div></div>
          </div>

          <div style={{ margin: "10px 12px 0", background: "#12121A", borderRadius: 14, padding: 12, border: "1px solid #222" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontWeight: 800, fontSize: 13 }}>{t.chartTitle} 📈</div><div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{t.chartSub}</div></div>
              <div style={{ fontSize: 10, color: "#FACC15", background: "rgba(250,204,21,0.1)", border: "1px solid #FACC15", padding: "4px 8px", borderRadius: 20 }}>Lv.{level} • {hourly}/h</div>
            </div>
            <div style={{ marginTop: 12, height: 80, display: "flex", alignItems: "flex-end", gap: 4 }}>
              {chartPoints.map((h, i) => {
                const isCurrent = i === Math.min(10, Math.floor(level / 50));
                return <div key={i} style={{ flex: 1, height: `${h}%`, background: isCurrent ? "linear-gradient(180deg,#FACC15,#EAB308)" : "linear-gradient(180deg,#333,#222)", borderRadius: "4px 4px 0 0", border: isCurrent ? "1px solid #FACC15" : "none" }}></div>;
              })}
            </div>
            <div style={{ marginTop: 10, background: "#0A0A0A", borderRadius: 10, padding: 10, border: "1px solid #222", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#888" }}>⚠️ الملاحظة: البوت لا يؤثر على المستوى - فقط المحفظة بعد الاستلام</div>
            </div>
            <button onClick={() => setShowLevels(!showLevels)} style={{ marginTop: 10, width: "100%", background: "#0A0A0A", border: "1px solid #FACC15", borderRadius: 10, padding: 12, color: "#FACC15", fontSize: 12, fontWeight: 800 }}>
              {showLevels ? "اخفاء المستويات ▲" : "عرض المستويات 1-500 ▼"}
            </button>
            {showLevels && (
              <div style={{ marginTop: 10, maxHeight: 400, overflowY: "auto", border: "1px solid #222", borderRadius: 10, background: "#08080C" }}>
                {Array.from({ length: 50 }, (_, i) => {
                  const lvl = i + 1;
                  const data = getLevelData(lvl);
                  const isCurrentLevel = lvl === level;
                  return (
                    <div key={lvl} style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #1a1a1a", fontSize: 11, background: isCurrentLevel ? "rgba(250,204,21,0.15)" : "transparent" }}>
                      <span style={{ color: isCurrentLevel ? "#FACC15" : "#fff" }}>Lv.{lvl} {isCurrentLevel ? "←" : ""}</span>
                      <span>{data.req.toLocaleString()}</span>
                      <span style={{ color: "#22c55e" }}>{data.daily.toLocaleString()}</span>
                      <span style={{ color: "#38BDF8" }}>{data.hourly}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
           {view === "main" && tab === "wallet" && (
        <>
          {walletView === "main" && (
            <>
              <div style={{ padding: 16 }}><div style={{ fontSize: 22, fontWeight: 900 }}>{t.walletTitle}</div><div style={{ fontSize: 11, color: "#888" }}>{t.allAssets}</div></div>
              <div style={{ margin: "0 12px", background: "linear-gradient(180deg,#1A1A00,#0F0F14)", borderRadius: 16, padding: 14, border: "1px solid #FACC15" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "#888" }}>{t.appBalance} + {t.blockchainBal}</span>
                  <span style={{ fontSize: 10, background: "#FACC15", color: "#000", padding: "2px 8px", borderRadius: 10, fontWeight: 900 }}>Lv.{level}</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8 }}>{(walletBalance + onChainAnkh).toFixed(2)} ANKH</div>
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <div style={{ flex: 1, background: "#000", borderRadius: 10, padding: 8, textAlign: "center" }}><div style={{ fontSize: 9, color: "#888" }}>{t.inApp}</div><div style={{ fontWeight: 900, color: "#FACC15" }}>{walletBalance.toFixed(0)}</div></div>
                  <div style={{ flex: 1, background: "#000", borderRadius: 10, padding: 8, textAlign: "center" }}><div style={{ fontSize: 9, color: "#888" }}>{t.onChain}</div><div style={{ fontWeight: 900, color: "#22c55e" }}>{onChainAnkh.toFixed(0)}</div></div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button onClick={() => setWalletView("withdraw")} style={{ flex: 1, background: "#FACC15", color: "#000", border: "none", padding: 10, borderRadius: 10, fontWeight: 900 }}>{t.withdraw}</button>
                  <button onClick={() => { setView("market"); setTab("market"); }} style={{ flex: 1, background: "#1A1A1A", color: "#fff", border: "1px solid #333", padding: 10, borderRadius: 10, fontWeight: 800 }}>{t.deposit}</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "10px 12px 0" }}>
                <div style={{ background: "#12121A", borderRadius: 12, padding: 10, border: "1px solid #222" }}><div style={{ fontSize: 10, color: "#888" }}>{t.totalMined}</div><div style={{ fontWeight: 900, marginTop: 4 }}>{(walletBalance + balance).toFixed(0)}</div></div>
                <div style={{ background: "#12121A", borderRadius: 12, padding: 10, border: "1px solid #222" }}><div style={{ fontSize: 10, color: "#888" }}>{t.walletAge}</div><div style={{ fontWeight: 900, marginTop: 4 }}>{walletAgeDays} {t.days}</div></div>
              </div>
            </>
          )}
          {walletView === "withdraw" && (
            <>
              <div style={{ padding: 16, display: "flex", gap: 10, alignItems: "center" }}><button onClick={() => setWalletView("main")} style={{ background: "#1A1A1A", width: 36, height: 36, borderRadius: 20, border: "1px solid #333", color: "#fff" }}>‹</button><div style={{ fontSize: 18, fontWeight: 900 }}>{t.withdraw} ANKH</div></div>
              <div style={{ margin: "0 12px", background: "#12121A", borderRadius: 14, padding: 14, border: "1px solid #222" }}>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{t.amount} ANKH</div>
                <input value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="10000" style={{ width: "100%", background: "#08080C", border: "1px solid #333", borderRadius: 10, padding: 12, color: "#fff" }} />
                <div style={{ marginTop: 12, background: "#08080C", borderRadius: 10, padding: 10, fontSize: 11 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#888" }}>{t.fee}</span><span>{withdrawFee.toFixed(0)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}><span style={{ color: "#888" }}>{t.reserve}</span><span>{requiredReserve.toFixed(0)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontWeight: 900 }}><span>{t.youWillGet}</span><span style={{ color: "#22c55e" }}>{willReceive.toFixed(0)} ANKH</span></div>
                </div>
                <button onClick={handleWithdraw} style={{ marginTop: 12, width: "100%", background: hasMinAmount && hasAppBalance ? "linear-gradient(90deg,#FACC15,#EAB308)" : "#222", color: hasMinAmount && hasAppBalance ? "#000" : "#666", border: "none", padding: 12, borderRadius: 10, fontWeight: 900 }}>{t.submitWithdraw}</button>
              </div>
            </>
          )}
        </>
      )}

      {view === "main" && tab === "friends" && (
        <>
          <div style={{ padding: 16 }}><div style={{ fontSize: 22, fontWeight: 900 }}>{t.friendsTitle} 👥</div><div style={{ fontSize: 11, color: "#888" }}>ادعو اصدقائك واكسب 10% من تعدينهم</div></div>
          <div style={{ margin: "0 12px", background: "#12121A", borderRadius: 14, padding: 14, border: "1px solid #222" }}>
            <div style={{ fontSize: 11, color: "#888" }}>{t.inviteCode}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1, background: "#08080C", border: "1px solid #333", borderRadius: 10, padding: 10, fontWeight: 900 }}>{inviteCode}</div>
              <button onClick={() => { navigator.clipboard.writeText(inviteCode); alert("تم النسخ"); }} style={{ background: "#FACC15", color: "#000", border: "none", padding: "0 16px", borderRadius: 10, fontWeight: 900 }}>{t.copy}</button>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(`https://t.me/AnkhMiningBot?start=${inviteCode}`); }} style={{ marginTop: 10, width: "100%", background: "#1A1A1A", border: "1px solid #333", padding: 10, borderRadius: 10, color: "#fff", fontWeight: 800 }}>{t.share} ↗</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "10px 12px 0" }}>
            <div style={{ background: "#12121A", borderRadius: 12, padding: 12, border: "1px solid #222", textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 900 }}>{friends.length}</div><div style={{ fontSize: 10, color: "#888" }}>{t.invited}</div></div>
            <div style={{ background: "#12121A", borderRadius: 12, padding: 12, border: "1px solid #222", textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 900, color: "#22c55e" }}>{referralEarnings.toFixed(0)}</div><div style={{ fontSize: 10, color: "#888" }}>{t.earnings} ANKH</div></div>
          </div>
        </>
      )}

      {view === "market" && (
        <>
          <div style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 20, fontWeight: 900 }}>{t.market} ⇄</div><div style={{ fontSize: 11, color: "#888", display: "flex", gap: 6 }}>↗ STON.fi • ANKH / TON</div></div>
            <div style={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 20, padding: "6px 12px", fontSize: 11 }}>{t.tonPrice}: ${ankhPrice}</div>
          </div>
          <div style={{ margin: "0 12px", background: "#12121A", borderRadius: 12, padding: 6, border: "1px solid #222", display: "flex", gap: 6 }}>
            <button onClick={() => setMarketTab("buy")} style={{ flex: 1, background: marketTab === "buy" ? "#FACC15" : "transparent", color: marketTab === "buy" ? "#000" : "#888", border: "none", padding: 8, borderRadius: 8, fontWeight: 900 }}>{t.buy}</button>
            <button onClick={() => setMarketTab("history")} style={{ flex: 1, background: marketTab === "history" ? "#1A1A1A" : "transparent", color: marketTab === "history" ? "#fff" : "#888", border: "none", padding: 8, borderRadius: 8, fontWeight: 800 }}>{t.history}</button>
          </div>
          {marketTab === "buy" && (
            <div style={{ margin: "10px 12px 0", background: "#12121A", borderRadius: 14, padding: 14, border: "1px solid #222" }}>
              <div style={{ fontSize: 12, fontWeight: 800, display: "flex", justifyContent: "space-between" }}><span>STON.fi {t.buy} ANKH</span><span style={{ color: "#FACC15", fontSize: 10 }}>1 TON = {(1 / ankhPrice).toFixed(0)} ANKH</span></div>
              <div style={{ marginTop: 10, background: "#08080C", borderRadius: 12, padding: 12, border: "1px solid #333" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888" }}><span>TON</span><span>Balance</span></div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <input value={tonAmount} onChange={(e) => setTonAmount(e.target.value)} placeholder="1" style={{ flex: 1, background: "transparent", border: "none", fontSize: 22, fontWeight: 900, color: "#fff", outline: "none" }} />
                  <div style={{ background: "#1A1A1A", borderRadius: 20, padding: "6px 12px", fontSize: 12, fontWeight: 800 }}>💎 TON</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}><div style={{ width: 32, height: 32, background: "#1A1A1A", border: "1px solid #333", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>↓</div></div>
              <div style={{ background: "#08080C", borderRadius: 12, padding: 12, border: "1px solid #FACC15" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888" }}><span>ANKH</span><span style={{ color: "#FACC15" }}>{t.youWillGet}</span></div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <div style={{ flex: 1, fontSize: 22, fontWeight: 900, color: "#FACC15" }}>{ankhAmount.toFixed(2)}</div>
                  <div style={{ background: "linear-gradient(180deg,#FACC15,#854D0E)", borderRadius: 20, padding: "6px 12px", fontSize: 12, fontWeight: 900, color: "#000" }}>☥ ANKH</div>
                </div>
              </div>
              <button onClick={handleBuy} style={{ marginTop: 14, width: "100%", background: isConnected ? "linear-gradient(90deg,#FACC15,#EAB308)" : "#222", color: isConnected ? "#000" : "#fff", border: "none", padding: 14, borderRadius: 12, fontWeight: 900, fontSize: 14 }}>{isConnected ? `${t.buy} ${ankhAmount.toFixed(0)} ANKH` : "ربط المحفظة للشراء"}</button>
              <div style={{ marginTop: 10, fontSize: 10, color: "#888", textAlign: "center" }}>via STON.fi • {t.tonPrice} ${ankhPrice} • Slippage 1%</div>
            </div>
          )}
          {marketTab === "history" && (
            <div style={{ margin: "10px 12px 0", background: "#12121A", borderRadius: 12, padding: 12, border: "1px solid #222" }}>
              {txHistory.length === 0 ? <div style={{ padding: 30, textAlign: "center", color: "#666", fontSize: 12 }}>لا يوجد مشتريات STON.fi</div> :
                txHistory.map((h) => <div key={h.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1a1a1a", fontSize: 12 }}><span>{h.ton} TON → {h.ankh.toFixed(0)} ANKH</span><span style={{ color: "#22c55e" }}>{h.status}</span><span style={{ color: "#888", fontSize: 10 }}>{h.date}</span></div>)}
            </div>
          )}
        </>
      )}

      {view === "tiers" && (
        <>
          <div style={{ padding: 16, display: "flex", gap: 10, alignItems: "center" }}><button onClick={() => setView("main")} style={{ background: "#1A1A1A", width: 36, height: 36, borderRadius: 20, border: "1px solid #333", color: "#fff" }}>‹</button><div style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: 20, fontWeight: 900 }}>{t.tiersTitle}</div></div><div style={{ width: 36 }}></div></div>
          <div style={{ margin: "0 12px", background: "linear-gradient(90deg,#1A1500,#1A1A2A)", borderRadius: 12, padding: 12, border: "1px solid #333", display: "flex", justifyContent: "space-between" }}>
            <div><div style={{ fontSize: 11, color: "#888" }}>{t.yourTier}</div><div style={{ fontWeight: 900 }}>Lv.{level}</div></div>
            <div style={{ textAlign: "left" }}><div style={{ fontSize: 11, color: "#888" }}>{t.walletBal}</div><div style={{ fontWeight: 900, color: "#FACC15" }}>{walletBalance.toFixed(0)} ANKH</div></div>
          </div>
          <div style={{ margin: "10px 12px 0", display: "flex", flexDirection: "column", gap: 8 }}>
            {TIERS.map((d) => (
              <div key={d.id} onClick={() => { setSelectedTier(d); setView("levels"); }} style={{ background: "#12121A", borderRadius: 14, padding: 12, border: "1px solid #222", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 10 }}><div style={{ width: 40, height: 40, background: `linear-gradient(180deg,${d.color},#000)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", border: `1px solid ${d.color}` }}>{d.startId}</div><div><div style={{ fontWeight: 800 }}>{lang === "ar" ? d.n : d.en}</div><div style={{ fontSize: 10, color: "#888" }}>{d.r}</div></div></div><span>›</span>
              </div>
            ))}
          </div>
        </>
      )}

      {view === "levels" && (
        <>
          <div style={{ padding: 16, display: "flex", gap: 10, alignItems: "center" }}><button onClick={() => setView("tiers")} style={{ background: "#1A1A1A", width: 36, height: 36, borderRadius: 20, border: "1px solid #333", color: "#fff" }}>‹</button><div style={{ flex: 1 }}><div style={{ fontSize: 18, fontWeight: 900 }}>{t.levelsTitle}</div></div></div>
          <div style={{ margin: "0 12px", background: "#12121A", borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#888", padding: 10, borderBottom: "1px solid #222", background: "#0A0A0A" }}><span>{t.small}</span><span>{t.reqWallet}</span><span>{t.perDay}</span></div>
            {Array.from({ length: 20 }, (_, i) => {
              const lvl = selectedTier.start + i;
              const data = getLevelData(lvl);
              return <div key={lvl} style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #222", fontSize: 12 }}><span>Lv.{lvl}</span><span>{data.req.toLocaleString()} ANKH</span><span style={{ color: selectedTier.color }}>{data.daily.toLocaleString()}</span></div>;
            })}
          </div>
        </>
      )}

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0F0F14", borderTop: "1px solid #222", display: "flex", justifyContent: "space-around", padding: "8px 0" }}>
        {[
          { id: "home", view: "main", n: t.main, ic: "🏠" },
          { id: "mining", view: "main", n: t.miningTab, ic: "⛏️" },
          { id: "market", view: "market", n: t.market, ic: "⇄" },
          { id: "friends", view: "main", n: t.friends, ic: "👥" },
          { id: "wallet", view: "main", n: t.wallet, ic: "🗄️" },
        ].map((d) => (
          <button key={d.id} onClick={() => { setTab(d.id); setView(d.view as any); if (d.id !== "wallet") setWalletView("main"); }} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", color: tab === d.id ? "#FACC15" : "#666" }}>
            <span style={{ fontSize: 18 }}>{d.ic}</span><span style={{ fontSize: 9, marginTop: 2 }}>{d.n}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <TonConnectUIProvider manifestUrl="https://ankh-mining.vercel.app/tonconnect-manifest.json">
      <AnkhInner />
    </TonConnectUIProvider>
  );
} 
