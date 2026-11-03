"use client";
import { useState, useEffect } from "react";

// 1. قاموس الترجمة للغات الثلاث (العربية، الإنجليزية، الروسية)
const T: any = {
  en: {
    mining: "Mining", store: "Store", list: "List", friends: "Friends", wallet: "Wallet", lang: "EN",
    total: "Total Mined Balance", active: "Active Mining", working: "Working Now", perHour: "Per Hour", daily: "Daily", boost: "Boost",
    walletTitle: "TON Wallet", connectWallet: "Connect Wallet", chooseWallet: "Choose wallet", tonkeeper: "Tonkeeper", myton: "MyTon Wallet",
    connected: "Wallet Connected", change: "Change", disconnect: "Disconnect",
    verifyTitle: "Anti-bot Verification (0.05 GRAM)", verifyDesc: "Pay 0.05 TON once to prove you are not a bot", payVerify: "Pay 0.05 TON to Verify", verified: "Verified ✅",
    withdrawTitle: "Withdraw ANKH", rule1: "Fee: 5%", rule2: "Min: 10,000 ANKH", minAmount: "Minimum Amount", yourBalance: "Your Balance", amountToWithdraw: "Amount to Withdraw", minIs: "Min is 10,000", enterAmount: "Enter amount (Min 10,000)", withdrawBtn: "Withdraw",
    friendsTitle: "Referral Program", friendsDesc: "Invite friends and get 5% of their mining profits for life", friendsReward: "When your friends mine ANKH you get 5% permanent reward on each token directly to your balance.",
    copyLink: "Copy Link", shareTG: "Share on Telegram", yourCode: "Your Private Referral Code", fromTotal: "5% of total", invited: "Invited Friends", pending: "Pending Earnings", miningNow: "Mining Now", totalEarnings: "Total Earnings", invitedList: "Invited Friends List", all: "All >", noFriends: "You have no invited friends yet",
  },
  ar: {
    mining: "التعدين", store: "المتجر", list: "القائمة", friends: "الأصدقاء", wallet: "المحفظة", lang: "AR",
    total: "إجمالي الرصيد المعدن", active: "التعدين النشط", working: "يعمل الآن", perHour: "في الساعة", daily: "يوميا", boost: "تعزيز",
    walletTitle: "محفظة TON", connectWallet: "ربط المحفظة", chooseWallet: "اختار محفظتك", tonkeeper: "تون كيبر", myton: "ماي تون", connected: "المحفظة مربوطة", change: "تغيير", disconnect: "فصل المحفظة",
    verifyTitle: "التحقق لمرة واحدة (0.05 جرام)", verifyDesc: "ادفع 0.05 TON مرة واحدة للتأكد انك مش بوت", payVerify: "ادفع 0.05 TON للتأكيد", verified: "تم التأكيد ✅",
    withdrawTitle: "سحب ANKH", rule1: "الرسوم: 5%", rule2: "الحد الأدنى: 10,000 ANKH", minAmount: "الحد الأدنى", yourBalance: "رصيدك", amountToWithdraw: "المبلغ المراد سحبه", minIs: "الحد الأدنى 10,000", enterAmount: "اكتب المبلغ (الحد 10,000)", withdrawBtn: "سحب الأموال",
    friendsTitle: "برنامج الإحالة", friendsDesc: "ادع أصدقاءك واحصل على 5% من أرباح تعدينهم مدى الحياة", friendsReward: "يقوم أصدقاؤك بتعدين ANKH تحصل على 5% مكافأة دائمة على كل توكن يبتعدنه مباشرة في رصيدك.",
    copyLink: "نسخ الرابط", shareTG: "مشاركة على تليجرام", yourCode: "رمز الإحالة الخاص بك", fromTotal: "من الجمع 5%", invited: "الأصدقاء المدعوون", pending: "الأرباح المعلقة", miningNow: "يعدنون الآن", totalEarnings: "إجمالي الأرباح", invitedList: "قائمة الأصدقاء المدعوين", all: "الكل >", noFriends: "ليس لديك أصدقاء مدعوون بعد",
  },
  ru: {
    mining: "Майнинг", store: "Магазин", list: "Список", friends: "Друзья", wallet: "Кошелек", lang: "RU",
    total: "Общий добытый баланс", active: "Активный майнинг", working: "Работает сейчас", perHour: "В час", daily: "В день", boost: "Буст",
    walletTitle: "TON Кошелек", connectWallet: "Подключить кошелек", chooseWallet: "Выберите кошелек", tonkeeper: "Tonkeeper", myton: "MyTon Wallet", connected: "Кошелек подключен", change: "Изменить", disconnect: "Отключить",
    verifyTitle: "Проверка анти-бот (0.05 GRAM)", verifyDesc: "Заплатите 0.05 TON один раз", payVerify: "Оплатить 0.05 TON", verified: "Проверено ✅",
    withdrawTitle: "Вывод ANKH", rule1: "Комиссия: 5%", rule2: "Мин: 10,000 ANKH", minAmount: "Минимум", yourBalance: "Ваш баланс", amountToWithdraw: "Сумма вывода", minIs: "Мин 10,000", enterAmount: "Введите сумму (Мин 10,000)", withdrawBtn: "Вывести",
    friendsTitle: "Реферальная программа", friendsDesc: "Пригласите друзей и получите 5% от их майнинга навсегда", friendsReward: "Когда ваши друзья майнят ANKH вы получаете 5% постоянный бонус с каждого токена прямо на баланс.",
    copyLink: "Копировать ссылку", shareTG: "Поделиться в Telegram", yourCode: "Ваш реферальный код", fromTotal: "5% от всего", invited: "Приглашенные друзья", pending: "Ожидающие выплаты", miningNow: "Майнят сейчас", totalEarnings: "Всего заработано", invitedList: "Список приглашенных друзей", all: "Все >", noFriends: "У вас пока нет приглашенных друзей",
  }
};

export default function Page() {
  // 2. تعريف المتغيرات وحالات الصفحة (React States)
  const [lang, setLang] = useState("ar"); // جعلنا اللغة العربية هي الافتراضية للتجربة
  const [balance, setBalance] = useState(1245.5);
  const [walletBalance, setWalletBalance] = useState(0);
  const [tab, setTab] = useState("mining"); // جعل صفحة التعدين هي الواجهة الأساسية عند الفتح
  const [refCode, setRefCode] = useState("0000000000");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawInput, setWithdrawInput] = useState("");
  const L = T[lang] || T["en"];

  // 3. كود جلب الـ Telegram User ID لإنشاء رابط الإحالة (Referral) الخاص بالمستخدم
  useEffect(() => {
    let code = localStorage.getItem("ankh_ref_code");
    if (!code) {
      const tgId = (window as any)?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      code = tgId ? tgId.toString() : Math.floor(1000000000 + Math.random() * 8999999999).toString();
      localStorage.setItem("ankh_ref_code", code);
    }
    setRefCode(code);
  }, []);

  // 4. كود عداد التعدين التلقائي لزيادة الرصيد حياً كل جزء من الثانية
  const rate = 0.77 + Math.floor(walletBalance / 15) * 0.77;
  useEffect(() => {
    const i = setInterval(() => setBalance(b => b + rate / 36000), 100);
    return () => clearInterval(i);
  }, [rate]);

  // 5. وظائف نسخ الروابط والمشاركة عبر التليجرام
  const inviteLink = `https://t.me{refCode}`;
  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert(lang === "ar" ? "تم نسخ رابطك الخاص!" : "Your private link copied!");
  };
  const shareTG = () => {
    window.open(`https://t.me{encodeURIComponent(inviteLink)}&text=${encodeURIComponent("Join ANKH mining!")}`, "_blank");
  };

  // 6. واجهة العرض (HTML/JSX) المتكاملة والمغلقة برمجياً بالكامل
  return (
    <div style={{ minHeight: "100vh", background: "#0f1410", color: "white", display: "flex", justifyContent: "center", fontFamily: "Tajawal, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "#121612", minHeight: "100vh", paddingBottom: "90px", direction: lang === "ar" ? "rtl" : "ltr", position: "relative" }}>

        {/* الشريط العلوي المشترك */}
        <div style={{ padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1f1a", borderBottom: "1px solid #222" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "36px", height: "36px", background: "#2a2a1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</div>
            <div><b>ANKH</b><p style={{ fontSize: "10px", color: "#888" }}>mini app</p></div>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <select value={lang} onChange={e => setLang(e.target.value)} style={{ background: "#1a2a1a", color: "#facc15", border: "1px solid #333", borderRadius: "8px", padding: "4px 8px", fontSize: "11px" }}>
              <option value="en">🇺🇸 EN</option>
              <option value="ar">🇪🇬 AR</option>
              <option value="ru">🇷🇺 RU</option>
            </select>
          </div>
        </div>

        {/* كارت مستوى الشبكة المشترك */}
        <div style={{ padding: "12px", display: "flex", gap: "8px", alignItems: "center", background: "#1a1f1a", margin: "8px", borderRadius: "12px", border: "1px solid #facc15" }}>
          <div style={{ width: "40px", height: "40px", background: "#222", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #facc15" }}>☥</div>
          <div><b>ANKH</b><p style={{ fontSize: "11px", color: "#888" }}>TON Network</p></div>
          <div style={{ marginRight: lang === "ar" ? "auto" : "transparent", marginLeft: lang !== "ar" ? "auto" : "transparent" }}>
            <span style={{ background: "#1a2a1a", color: "#facc15", padding: "4px 8px", borderRadius: "6px", fontSize: "11px" }}>LVL 1/500</span>
          </div>
        </div>

        {/* [الصفحة الأولي] واجهة التعدين وحساب الرصيد */}
        {tab === "mining" && (
          <div style={{ padding: "16px", textAlign: "center" }}>
            <p style={{ color: "#888", fontSize: "14px" }}>{L.total}</p>
            <h1 style={{ color: "#facc15", fontSize: "36px", margin: "10px 0" }}>{balance.toFixed(4)} ANKH</h1>
            <div style={{ background: "#1a1f1a", padding: "12px", borderRadius: "12px", marginTop: "20px" }}>
              <p style={{ color: "#22c55e" }}>● {L.working}</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>{L.perHour}: +{rate.toFixed(2)} ANKH</p>
            </div>
          </div>
        )}

        {/* [الصفحة الثانية] واجهة الإحالات ونظام الأصدقاء */}
        {tab === "friends" && (
          <div style={{ padding: "16px" }}>
            <h3>{L.friendsTitle}</h3>
            <p style={{ fontSize: "13px", color: "#aaa", margin: "8px 0" }}>{L.friendsDesc}</p>
            <div style={{ background: "#1a1f1a", padding: "12px", borderRadius: "12px", margin: "16px 0", textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: "#888" }}>{L.yourCode}</p>
              <code style={{ color: "#facc15", fontSize: "18px", display: "block", margin: "8px 0" }}>{refCode}</code>
<div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
<button onClick={copyLink} style={{ background: "#facc15", color: "black", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>{L.copyLink}
<button onClick={shareTG} style={{ background: "#0088cc", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>{L.shareTG}



)}
{/* [الصفحة الثالثة] واجهة المحفظة والتحقق من الـ Bot وسحب التوكنز */}
{tab === "wallet" && (
<div style={{ padding: "16px" }}>
{L.walletTitle}
{/* زر ربط المحفظة */}
{!connected ? (
<button onClick={() => setConnected(true)} style={{ width: "100%", background: "#0098ea", color: "white", border: "none", padding: "12px", borderRadius: "10px", margin: "12px 0", fontWeight: "bold", cursor: "pointer" }}>{L.connectWallet}
) : (
<div style={{ background: "#1a1f1a", padding: "12px", borderRadius: "12px", margin: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
{L.connected}
<button onClick={() => setConnected(false)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>{L.disconnect}

)}
{/* نظام التحقق Anti-bot */}
<div style={{ background: "#1e241e", padding: "12px", borderRadius: "12px", marginTop: "16px", border: "1px solid #333" }}>
{L.verifyTitle}
<p style={{ fontSize: "12px", color: "#aaa", margin: "6px 0" }}>{L.verifyDesc}
{!verified ? (
<button onClick={() => setVerified(true)} style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", width: "100%", fontWeight: "bold", cursor: "pointer" }}>{L.payVerify}
) : (
<p style={{ color: "#22c55e", fontWeight: "bold" }}>{L.verified}
)}
{/* نظام سحب العملات Withdraw */}
<div style={{ background: "#1a1f1a", padding: "12px", borderRadius: "12px", marginTop: "16px" }}>
{L.withdrawTitle}
<p style={{ fontSize: "11px", color: "#ef4444" }}>{L.rule1} | {L.rule2}
<input type="number" placeholder={L.enterAmount} value={withdrawInput} onChange={e => setWithdrawInput(e.target.value)} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", borderRadius: "8px", color: "white", marginTop: "10px", boxSizing: "border-box" }} />
<button onClick={() => { if (Number(withdrawInput) >= 10000) { alert("Success!"); } else { alert(L.minIs); } }} style={{ width: "100%", background: "#facc15", color: "black", border: "none", padding: "10px", borderRadius: "8px", marginTop: "10px", fontWeight: "bold", cursor: "pointer" }}>{L.withdrawBtn}


)}
{/* شريط التنقل السفلي الثابت (Navbar) للتبديل بين الصفحات بلمسة واحدة */}
<div style={{ position: "fixed", bottom: 0, maxWidth: "400px", width: "100%", height: "70px", background: "#1a1f1a", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #222", zIndex: 100 }}>
<button onClick={() => setTab("mining")} style={{ background: "none", border: "none", color: tab === "mining" ? "#facc15" : "#888", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}>
⛏️<span style={{ fontSize: "11px" }}>{L.mining}

<button onClick={() => setTab("friends")} style={{ background: "none", border: "none", color: tab === "friends" ? "#facc15" : "#888", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}>
👥<span style={{ fontSize: "11px" }}>{L.friends}

<button onClick={() => setTab("wallet")} style={{ background: "none", border: "none", color: tab === "wallet" ? "#facc15" : "#888", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}>
💼<span style={{ fontSize: "11px" }}>{L.wallet}

);
}
