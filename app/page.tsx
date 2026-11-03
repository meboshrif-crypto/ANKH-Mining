"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining"); 
  const [totalBalance, setTotalBalance] = useState(0); // الرصيد الأساسي الكلي بعد الجمع
  const [minedAmount, setMinedAmount] = useState(0); // العداد الحي للعملات التي تتعدن حالياً
  const [walletBalance, setWalletBalance] = useState(0); 
  const [refCode, setRefCode] = useState("000000");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  
  // حالة التحكم في ظهور قائمة المستويات (علامة الاستفهام)
  const [showLevelsGuide, setShowLevelsGuide] = useState(false);

  // حساب المستوى وسرعة التعدين بالساعة بناءً على رصيد المحفظة
  const currentLevel = Math.min(500, Math.floor(walletBalance / 10)); // مستوى 0 إذا كانت المحفظة فارغة
  const miningRatePerHour = 0.25 + currentLevel * 0.05; 

  // عداد التعدين الحي لتحديث العملات المعدنة حالياً
  useEffect(() => {
    const interval = setInterval(() => {
      setMinedAmount((prev) => prev + (miningRatePerHour / 36000));
    }, 100);
    return () => clearInterval(interval);
  }, [miningRatePerHour]);

  useEffect(() => {
    setRefCode("123456");
  }, []);

  // دالة جمع التعدين تصفير العداد ونقل العملات للرصيد الكلي
  const handleClaimMining = () => {
    if (minedAmount <= 0) return;
    setTotalBalance(prev => prev + minedAmount);
    setMinedAmount(0);
    alert("تم جمع العملات المعدنة ونقلها بنجاح إلى رصيدك الكلي!");
  };

  const inviteLink = `https://t.me{refCode}`;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0d0a", color: "#ffffff", display: "flex", justifyContent: "center", fontFamily: "sans-serif", direction: "rtl" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#111411", minHeight: "100vh", paddingBottom: "90px", position: "relative", boxSizing: "border-box" }}>
        
        {/* شريط علوي مبسط يظهر الرصيد الإجمالي والمستوى الحالي */}
        <div style={{ padding: "16px", background: "#161b16", borderBottom: "2px solid #d4af37", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <b style={{ color: "#d4af37", fontSize: "16px" }}>ANKH MINING</b>
            <p style={{ margin: 0, fontSize: "11px", color: "#8a9a8a" }}>المستوى الحالي: {currentLevel}</p>
          </div>
          <div style={{ background: "#222a22", padding: "6px 12px", borderRadius: "12px", border: "1px solid #d4af37" }}>
            <span style={{ color: "#d4af37", fontWeight: "bold" }}>{totalBalance.toFixed(4)} ☥</span>
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          {/* === 1. تعديلات خانة التعدين المحدثة === */}
          {tab === "mining" && (
            <div style={{ marginTop: "10px", position: "relative" }}>
              
              {/* زر علامة الاستفهام لعرض دليل المستويات */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                <button 
                  onClick={() => setShowLevelsGuide(true)} 
                  style={{ background: "#161b16", color: "#d4af37", border: "1px solid #d4af37", width: "32px", height: "32px", borderRadius: "50%", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
                >
                  ؟
                </button>
              </div>

              {/* واجهة إحصائيات التعدين والعداد الحي */}
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <p style={{ color: "#8a9a8a", fontSize: "14px", margin: "0" }}>العملات التي تتعدن حالياً</p>
                <h1 style={{ fontSize: "44px", color: "#d4af37", margin: "10px 0", letterSpacing: "1px" }}>{minedAmount.toFixed(5)}</h1>
                <p style={{ color: "#8a9a8a", fontSize: "13px", margin: "0" }}>سرعة التعدين: <span style={{ color: "#d4af37", fontWeight: "bold" }}>{miningRatePerHour.toFixed(2)} عملة / ساعة</span></p>
              </div>

              {/* زر جمع التعدين الأساسي */}
              <button 
                onClick={handleClaimMining}
                style={{ width: "100%", background: "#d4af37", color: "#000000", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "bold", fontSize: "16px", cursor: "pointer", margin: "20px 0", boxShadow: "0 4px 10px rgba(212,175,55,0.2)" }}
              >
                📥 جمع التعدين (Claim)
              </button>

              {/* رسالة التنبيه الإلزامية للـ 24 ساعة */}
              <div style={{ background: "#221111", border: "1px solid #ff4444", borderRadius: "12px", padding: "12px", margin: "15px 0", textAlign: "right" }}>
                <p style={{ color: "#ff4444", fontWeight: "bold", margin: "0 0 6px 0", fontSize: "13px" }}>⚠️ تنبيه هام لجميع المعدنين:</p>
                <p style={{ color: "#ff8888", fontSize: "12px", margin: 0, lineHeight: "1.5" }}>
                  يجب عليك ضغط زر "جمع التعدين" مرة واحدة على الأقل كل 24 ساعة. في حال تخطي المدة دون جمع، ستبدأ العملات غير المجموعة بالنقصان تدريجياً بنفس سرعة التعدين الحالية!
                </p>
              </div>

              {/* تحكم تجريبي لشحن المحفظة (On-chain) وتحديث الليفل والسرعة */}
              <div style={{ marginTop: "30px", padding: "12px", background: "#161b16", borderRadius: "8px", border: "1px solid #333", fontSize: "12px", textAlign: "center" }}>
                <p style={{ margin: "0 0 8px 0", color: "#8a9a8a" }}>⚙️ لوحة المطور لتجربة ترقية المستويات:</p>
                <button onClick={() => setWalletBalance(b => b + 20)} style={{ background: "#d4af37", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", color: "#000" }}>شحن المحفظة بـ +20 عملة On-chain</button>
              </div>

              {/* النافذة المنبثقة (Popup Modal) لدليل المستويات من 0 إلى 500 */}
              {showLevelsGuide && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000, padding: "20px" }}>
                  <div style={{ background: "#161b16", border: "2px solid #d4af37", borderRadius: "16px", padding: "20px", maxWidth: "360px", width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
                    <h3 style={{ color: "#d4af37", marginTop: 0, textAlign: "center" }}>📋 دليل مستويات التعدين (0 - 500)</h3>
                    <p style={{ fontSize: "12px", color: "#8a9a8a", lineHeight: "1.4" }}>تعتمد مستويات التعدين وسرعته حصرياً على كمية العملات الموجودة داخل محفظتك المرتبطة على الشبكة (On-chain).</p>
                    
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontSize: "13px", textAlign: "center" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #d4af37", color: "#d4af37" }}>
                          <th style={{ padding: "8px" }}>المستوى</th>
                          <th style={{ padding: "8px" }}>الشرط (On-chain)</th>
                          <th style={{ padding: "8px" }}>السرعة / ساعة</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #222" }}>
                          <td style={{ padding: "8px" }}>مستوى 0</td>
                          <td style={{ padding: "8px", color: "#22c55e" }}>مجاني بالكامل</td>
                          <td style={{ padding: "8px" }}>0.25 عملة</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #222" }}>
                          <td style={{ padding: "8px" }}>مستوى 1</td>
                          <td style={{ padding: "8px" }}>امتلاك 10 عملات</td>
                          <td style={{ padding: "8px" }}>0.30 عملة</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #222" }}>
                          <td style={{ padding: "8px" }}>مستوى 2</td>
                          <td style={{ padding: "8px" }}>امتلاك 20 عملة</td>
                          <td style={{ padding: "8px" }}>0.35 عملة</td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #222" }}>
                          <td style={{ padding: "8px" }}>مستوى 50</td>
                          <td style={{ padding: "8px" }}>امتلاك 500 عملة</td>
                          <td style={{ padding: "8px" }}>2.75 عملة</td>
                        </tr>
                        <tr>
                          <td style={{ padding: "8px" }}>مستوى 500</td>
                          <td style={{ padding: "8px" }}>امتلاك 5000 عملة</td>
                          <td style={{ padding: "8px" }}>25.25 عملة</td>
                        </tr>
                      </tbody>
                    </table>

                    <button 
                      onClick={() => setShowLevelsGuide(false)} 
                      style={{ width: "100%", background: "#d4af37", color: "#000", border: "none", padding: "10px", borderRadius: "8px", marginTop: "20px", fontWeight: "bold", cursor: "pointer" }}
                    >
                      إغلاق الدليل
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* 2. الأصدقاء */}
          {tab === "friends" && (
            <div>
              <h3>الاحالة والأصدقاء</h3>
              <p style={{ fontSize: "12px" }}>{inviteLink}</p>
              <button onClick={() => { navigator.clipboard.writeText(inviteLink); alert("تم النسخ"); }} style={{ background: "#d4af37", border: "none", padding: "6px 12px" }}>نسخ الرابط</button>
            </div>
          )}

          {/* 3. الستيكنج */}
          {tab === "staking" && (
            <div>
              <h3>الستيكنج والاستثمار</h3>
<input type="number" placeholder="المبلغ" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} style={{ background: "#000", color: "#fff", padding: "8px", border: "1px solid #333" }} />
<button onClick={() => { setTotalBalance(b => b - Number(stakeAmount)); alert("تم بنجاح"); }} style={{ background: "#d4af37", border: "none", padding: "8px", marginLeft: "10px" }}>بدء الاستثمار

)}
{/* 4. المحفظة */}
{tab === "wallet" && (

المحفظة والسحب
{!connected ? (
<button onClick={() => setConnected(true)} style={{ background: "#0098ea", color: "#fff", border: "none", padding: "10px", width: "100%" }}>ربط المحفظة
) : (
<p style={{ color: "#00ffcc" }}>تم الربط بنجاح
)}
{connected && !verified && (
<button onClick={() => setVerified(true)} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "10px", width: "100%", marginTop: "10px" }}>توثيق (0.05 GRAM)
)}
<div style={{ marginTop: "20px", padding: "2px", background: (withdrawAmount !== "" && Number(withdrawAmount) < 10000) ? "#ff4444" : "transparent" }}>
<input type="number" placeholder="مبلغ السحب" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} style={{ width: "100%", padding: "10px", background: "#000", color: "#fff", border: "1px solid #333", boxSizing: "border-box" }} />


)}
{/* 5. المهمات */}
{tab === "tasks" && (

المهمات اليومية
سجل دخولك اليومي لتحصل على العملات المكافئة مباشرة.

)}
{/* شريط التنقل السفلي الثابت بخمس أزرار متناسقة باللغة العربية */}
<div style={{ position: "fixed", bottom: 0, maxWidth: "420px", width: "100%", height: "70px", background: "#161b16", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "2px solid #d4af37", zIndex: 1000 }}>
<button onClick={() => setTab("mining")} style={{ background: "none", border: "none", color: tab === "mining" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>التعدين
<button onClick={() => setTab("friends")} style={{ background: "none", border: "none", color: tab === "friends" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>الأصدقاء
<button onClick={() => setTab("staking")} style={{ background: "none", border: "none", color: tab === "staking" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>الستيكنج
<button onClick={() => setTab("wallet")} style={{ background: "none", border: "none", color: tab === "wallet" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>المحفظة
<button onClick={() => setTab("tasks")} style={{ background: "none", border: "none", color: tab === "tasks" ? "#d4af37" : "#8a9a8a", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>المهمات
);
}
