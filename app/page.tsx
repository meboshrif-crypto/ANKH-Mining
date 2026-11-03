<button onClick={() => setStakeDuration(9)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: stakeDuration === 9 ? "#d4af37" : "#0a0d0a", color: stakeDuration === 9 ? "#000" : "#fff", fontWeight: "bold", border: "1px solid #d4af37", cursor: "pointer" }}>9 أشهر (105%)

<button onClick={handleStake} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>تأكيد بدء الستيكنج


)}
{/* === 4. واجهة المحفظة === */}
{tab === "wallet" && (

إدارة المحفظة والسحوبات
{!connected ? (
<button onClick={() => setShowWallets(true)} style={{ width: "100%", background: "#0098ea", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>🔗 ربط المحفظة الرقمية
) : (
<div style={{ background: "#161b16", padding: "14px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", border: "1px solid #d4af37" }}>
<span style={{ color: "#00ffcc" }}>● تم ربط المحفظة
<button onClick={() => { setConnected(false); setVerified(false); }} style={{ background: "none", border: "none", color: "#ff4444", cursor: "pointer" }}>فصل

)}
{showWallets && (
<div style={{ background: "#222", padding: "16px", borderRadius: "12px", marginBottom: "16px", textAlign: "center" }}>
<div style={{ display: "flex", gap: "10px" }}>
<button onClick={() => { setConnected(true); setShowWallets(false); }} style={{ flex: 1, background: "#111", color: "#fff", padding: "10px", borderRadius: "8px", cursor: "pointer" }}>Tonkeeper
<button onClick={() => { setConnected(true); setShowWallets(false); }} style={{ flex: 1, background: "#111", color: "#fff", padding: "10px", borderRadius: "8px", cursor: "pointer" }}>MyTon Wallet


)}
{connected && (
<div style={{ background: "#1e241e", padding: "16px", borderRadius: "12px", border: "1px solid #d4af37", marginBottom: "16px" }}>
🔐 إجراء التوثيق الإلزامي
{!verified ? (
<button onClick={() => setVerified(true)} style={{ width: "100%", background: "#22c55e", color: "#fff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>إرسال معاملة التوثيق (0.05 GRAM)
) : (
<p style={{ color: "#22c55e", fontWeight: "bold", margin: 0 }}>تم التوثيق بنجاح ✅
)}

)}
<div style={{ background: "#161b16", padding: "16px", borderRadius: "12px", border: "1px solid #222a22" }}>
طلب سحب التوكنز
<p style={{ fontSize: "11px", color: "#8a9a8a" }}>رسوم السحب: 5% | الحد الأدنى: 10,000 عملة
<div style={{ padding: "2px", borderRadius: "8px", background: (withdrawAmount !== "" && Number(withdrawAmount) < 10000) ? "#ff4444" : "transparent" }}>
<input type="number" placeholder="أدخل الكمية هنا" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "7px", background: "#0a0d0a", border: "1px solid #333", color: "#fff", boxSizing: "border-box" }} />

<button onClick={() => { if (!verified) { alert("يجب التوثيق أولاً!"); return; } if (Number(withdrawAmount) >= 10000) { alert("تم تسجيل طلب السحب!"); } else { alert("المبلغ أقل من الحد الأدنى!"); } }} style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "12px", borderRadius: "8px", marginTop: "14px", fontWeight: "bold", cursor: "pointer" }}>تأكيد سحب الأموال


)}
{/* === 5. واجهة المهمات === */}
{tab === "tasks" && (

المهمات اليومية
<div style={{ background: "#161b16", padding: "16px", borderRadius: "12px", border: "1px solid #222a22", marginBottom: "20px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
تسجيل الدخول (يوم {dailyDay}/30)
<button onClick={simulateMissedDay} style={{ background: "none", border: "none", color: "#ff4444", fontSize: "11px", cursor: "pointer" }}>تفويت يوم ⚠️

<button onClick={handleDailyCheckIn} disabled={claimedToday} style={{ width: "100%", background: claimedToday ? "#222a22" : "#d4af37", color: claimedToday ? "#8a9a8a" : "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", marginTop: "10px" }}>
{claimedToday ? "تم الاستلام ✓" : استلام المكافأة (+${7 + (dailyDay - 1) * 2} عملة)}

{tasks.map(tk => (
<div key={tk.id} style={{ background: "#161b16", padding: "14px", borderRadius: "12px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

<p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{tk.text}
<span style={{ fontSize: "12px", color: "#d4af37" }}>+{tk.reward} عملة

<button onClick={() => completeTask(tk.id, tk.reward, tk.link)} disabled={tk.done} style={{ background: tk.done ? "#222a22" : "#d4af37", color: tk.done ? "#8a9a8a" : "#000", border: "none", padding: "8px 14px", borderRadius: "8px", fontWeight: "bold" }}>
{tk.done ? "مكتملة" : "ابدأ"}


))}

)}
{/* شريط التنقل السفلي */}
<div style={{ position: "fixed", bottom: 0, maxWidth: "420px", width: "100%", height: "76px", background: "#161b16", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "2px solid #d4af37", zIndex: 1000, boxSizing: "border-box" }}>
<button onClick={() => setTab("mining")} style={{ background: "none", border: "none", color: tab === "mining" ? "#d4af37" : "#8a9a8a", display: "flex", flexDirection: "column", alignItems: "center" }}>⛏️<span style={{ fontSize: "10px" }}>التعدين
<button onClick={() => setTab("friends")} style={{ background: "none", border: "none", color: tab === "friends" ? "#d4af37" : "#8a9a8a", display: "flex", flexDirection: "column", alignItems: "center" }}>👥<span style={{ fontSize: "10px" }}>الأfriends
<button onClick={() => setTab("staking")} style={{ background: "none", border: "none", color: tab === "staking" ? "#d4af37" : "#8a9a8a", display: "flex", flexDirection: "column", alignItems: "center" }}>📈<span style={{ fontSize: "10px" }}>الستيكنج
<button onClick={() => setTab("wallet")} style={{ background: "none", border: "none", color: tab === "wallet" ? "#d4af37" : "#8a9a8a", display: "flex", flexDirection: "column", alignItems: "center" }}>💼<span style={{ fontSize: "10px" }}>المحفظة
<button onClick={() => setTab("tasks")} style={{ background: "none", border: "none", color: tab === "tasks" ? "#d4af37" : "#8a9a8a", display: "flex", flexDirection: "column", alignItems: "center" }}>📋<span style={{ fontSize: "10px" }}>المهمات
);
}

قم بحفظ التغييرات الآن في مستودع GitHub الخاص بك لكي يقوم Vercel بإعادة بناء المشروع تلقائياً وتأكيد النجاح!

<FollowUp>
بعد حفظ هذا الكود، هل تخطى البوت مرحلة **الـ Build بنجاح وعمل الـ Deploy بدون مشاكل**؟
</FollowUp>"use client";
import { useState, useEffect } from "react";

export default function Page() {
  // --- حالات البوت الأساسية ---
  const [tab, setTab] = useState("mining"); 
  const [balance, setBalance] = useState(0); 
  const [walletBalance, setWalletBalance] = useState(0); 
  const [refCode, setRefCode] = useState("000000");
  const [invitedCount, setInvitedCount] = useState(0);
  
  // --- حالات المحفظة ---
  const [connected, setConnected] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // --- حالات الستيكنج ---
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeDuration, setStakeDuration] = useState(1); 
  const [activeStakes, setActiveStakes] = useState<any[]>([]);

  // --- حالات المهمات والمكافأة اليومية ---
  const [dailyDay, setDailyDay] = useState(1);
  const [claimedToday, setClaimedToday] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: "الاشتراك في قناة السحوبات", reward: 77, done: false, link: "https://t.me" },
    { id: 2, text: "الاشتراك في قناة الأخبار", reward: 77, done: false, link: "https://t.me" }
  ]);

  // --- 1. حساب مستوى التعدين ---
  const currentLevel = Math.min(500, Math.floor(walletBalance / 10) + 1);
  const miningRatePerHour = 0.25 + (currentLevel - 1) * 0.05; 

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => prev + (miningRatePerHour / 36000));
    }, 100);
    return () => clearInterval(interval);
  }, [miningRatePerHour]);

  // --- 2. توليد كود الإحالة ---
  useEffect(() => {
    let code = localStorage.getItem("ankh_uid");
    if (!code) {
      const tgId = (window as any)?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      code = tgId ? tgId.toString() : Math.floor(100000 + Math.random() * 899999).toString();
      localStorage.setItem("ankh_uid", code);
    }
    setRefCode(code);
  }, []);

  // --- 3. المكافأة اليومية ---
  const handleDailyCheckIn = () => {
    if (claimedToday) return;
    const reward = 7 + (dailyDay - 1) * 2;
    setBalance(b => b + reward);
    setClaimedToday(true);
    alert(`تم استلام مكافأة اليوم البالغة ${reward} عملة بنجاح!`);
  };

  const simulateMissedDay = () => {
    setDailyDay(1);
    setClaimedToday(false);
    alert("تم إعادة عداد الأيام إلى اليوم الأول!");
  };

  // --- 4. الستيكنج ---
  const handleStake = () => {
    const amt = Number(stakeAmount);
    if (amt < 100) {
      alert("الحد الأدنى للاستيكنج هو 100 عملة!");
      return;
    }
    if (balance < amt) {
      alert("رصيدك الحالي لا يكفي!");
      return;
    }

    let profitPercent = 25;
    if (stakeDuration === 3) profitPercent = 60;
    if (stakeDuration === 9) profitPercent = 105;

    const profit = amt * (profitPercent / 100);
    
    setBalance(b => b - amt);
    setActiveStakes([...activeStakes, { amount: amt, duration: stakeDuration, profit: profit }]);
    setStakeAmount("");
    alert("تم بدء الستيكنج بنجاح!");
  };

  // --- 5. تنفيذ المهمات ---
  const completeTask = (id: number, reward: number, link: string) => {
    window.open(link, "_blank");
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
    setBalance(b => b + reward);
  };

  const inviteLink = `https://t.me?start=${refCode}`;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0d0a", color: "#ffffff", display: "flex", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#111411", minHeight: "100vh", paddingBottom: "90px", position: "relative", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        
        {/* شريط معلومات المستخدم العلوي */}
        <div style={{ padding: "16px", background: "#161b16", borderBottom: "2px solid #d4af37", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#d4af37", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px" }}>☥</div>
            <div>
              <h3 style={{ margin: 0, color: "#d4af37" }}>ANKH MINING</h3>
              <p style={{ margin: 0, fontSize: "11px", color: "#8a9a8a" }}>مستوى التعدين: {currentLevel} / 500</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ background: "#222a22", color: "#d4af37", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", border: "1px solid #d4af37", fontWeight: "bold" }}>
              {balance.toFixed(4)} ☥
            </span>
          </div>
        </div>

        {/* محتوى الصفحات الديناميكي */}
        <div style={{ padding: "16px", flex: 1 }}>

          {/* === 1. واجهة التعدين الأساسية === */}
          {tab === "mining" && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p style={{ color: "#8a9a8a", fontSize: "14px" }}>إجمالي رصيدك الحالي داخل التطبيق</p>
              <h1 style={{ fontSize: "42px", color: "#d4af37", margin: "10px 0" }}>{balance.toFixed(5)}</h1>
              <p style={{ color: "#8a9a8a", fontSize: "12px" }}>ANKH TOKENS</p>

              <div style={{ margin: "40px auto", width: "160px", height: "160px", borderRadius: "50%", border: "4px dashed #d4af37", display: "flex", alignItems: "center", justifyContent: "center", background: "#161b16" }}>
                <span style={{ fontSize: "50px" }}>⛏️</span>
              </div>

              <div style={{ background: "#161b16", borderRadius: "12px", padding: "16px", border: "1px solid #222a22", textAlign: "right" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span>حالة التعدين الإجمالية:</span>
                  <span style={{ color: "#00ffcc", fontWeight: "bold" }}>يعمل الآن بموثوقية</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>سرعة التعدين بالساعة:</span>
                  <span style={{ color: "#d4af37", fontWeight: "bold" }}>+{miningRatePerHour.toFixed(2)} ANKH</span>
                </div>
              </div>

              <div style={{ marginTop: "30px", padding: "12px", background: "#222", borderRadius: "8px", fontSize: "12px" }}>
                <button onClick={() => setWalletBalance(b => b + 50)} style={{ background: "#d4af37", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>شحن المحفظة بـ +50 عملة On-chain</button>
              </div>
            </div>
          )}

          {/* === 2. واجهة الأصدقاء === */}
          {tab === "friends" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3>برنامج دعوة الأصدقاء والإحالة</h3>
                <span style={{ color: "#d4af37", fontWeight: "bold", fontSize: "18px" }}>ANKH</span>
              </div>
              <p style={{ fontSize: "14px", color: "#8a9a8a", lineHeight: "1.6" }}>
                تحصل فوراً وبشكل دائم على مكافأة تعادل <span style={{ color: "#d4af37", fontWeight: "bold" }}>5% من إجمالي أرباح التعدين</span> للمستخدمين من خلالك.
              </p>
              <div style={{ background: "#161b16", padding: "16px", borderRadius: "12px", border: "1px solid #222a22", margin: "20px 0" }}>
                <div style={{ display: "flex", background: "#0a0d0a", padding: "10px", borderRadius: "8px", alignItems: "center", justifyContent: "space-between" }}>
                  <code style={{ fontSize: "12px", color: "#d4af37" }}>{inviteLink}</code>
                  <button onClick={() => { navigator.clipboard.writeText(inviteLink); alert("تم نسخ الرابط!"); }} style={{ background: "#d4af37", border: "none", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>نسخ</button>
                </div>
              </div>
              <div style={{ background: "#161b16", padding: "16px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>عدد الأصدقاء المؤهلين المدعوين:</span>
                <span style={{ color: "#d4af37", fontSize: "20px", fontWeight: "bold" }}>{invitedCount} صديق</span>
              </div>
            </div>
          )}

          {/* === 3. واجهة الستيكنج === */}
          {tab === "staking" && (
            <div>
              <h3>نظام الاستثمار المقيد (Staking)</h3>
              <div style={{ background: "#161b16", padding: "16px", borderRadius: "12px", marginTop: "16px", border: "1px solid #222a22" }}>
                <input type="number" placeholder="أدخل الكمية (أقل شيء 100)" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#0a0d0a", border: "1px solid #333", color: "#fff", marginBottom: "16px", boxSizing: "border-box" }} />
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                  <button onClick={() => setStakeDuration(1)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: stakeDuration === 1 ? "#d4af37" : "#0a0d0a", color: stakeDuration === 1 ? "#000" : "#fff", fontWeight: "bold", border: "1px solid #d4af37", cursor: "pointer" }}>شهر (25%)</button>
                  <button onClick={() => setStakeDuration(3)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: stakeDuration === 3 ? "#d4af37" : "#0a0d0a", color: stakeDuration === 3 ? "#000" : "#fff", fontWeight: "bold", border: "1px solid #d4af37", cursor: "pointer" }}>3 أشهر (60%)</button>
