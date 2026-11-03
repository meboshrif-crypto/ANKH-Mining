"use client";
import { useState, useEffect } from "react";

const T:any = {
  en: {
    mining:"Mining", list:"List", friends:"Friends", wallet:"Wallet", lang:"Language",
    total:"Total Mined Balance", perHour:"Per Hour", daily:"Daily", boost:"Boost",
    walletTitle:"TON Wallet - LVL", inWallet:"ANKH in wallet", level0:"Level 0 - Start", startFree:"Start Free 0.77/h",
    connectWallet:"Connect Wallet", chooseWallet:"Choose your wallet", tonkeeper:"Tonkeeper", myton:"MyTon Wallet", tonhub:"Tonhub",
    connected:"Connected", address:"Address", disconnect:"Disconnect", change:"Change",
    verifyTitle:"Anti-bot Verification", verifyDesc:"Pay 0.05 TON (GRAM) once to verify you are not a bot", payVerify:"Pay 0.05 TON to Verify", verified:"Verified ✅ - You are not a bot",
    withdrawTitle:"Withdraw ANKH", withdrawRules:"Withdraw Rules:", rule1:"• Fee: 5% (auto deducted)", rule2:"• Minimum: 10,000 ANKH", rule3:"• 1 withdraw per 24h", rule4:"• Keep 25% in wallet",
    minAmount:"Minimum Amount", yourBalance:"Your Balance", amountToWithdraw:"Amount to Withdraw", minIs:"Min is 10,000", enterAmount:"Enter amount (Min 10,000)", withdrawBtn:"Withdraw ANKH", notEnough:"Balance less than 10,000", lessThanMin:"Amount less than minimum (10,000)",
    referralCode:"Referral Code (Unique):", unique:"Unique for each user"
  },
  ar: {
    mining:"التعدين", list:"القائمة", friends:"الأصدقاء", wallet:"المحفظة", lang:"اللغة",
    total:"إجمالي الرصيد المعدن", perHour:"في الساعة", daily:"يومي", boost:"تعزيز",
    walletTitle:"محفظة TON - مستوي", inWallet:"ANKH في المحفظة", level0:"مستوى 0 - البداية", startFree:"ابدأ مجانا 0.77/س",
    connectWallet:"ربط المحفظة", chooseWallet:"اختار محفظتك", tonkeeper:"تون كيبر", myton:"ماي تون", tonhub:"تون هب",
    connected:"متصل", address:"العنوان", disconnect:"فصل المحفظة", change:"تغيير",
    verifyTitle:"تأكيد انك مش بوت", verifyDesc:"ادفع 0.05 من عملة الجرام (TON) مرة واحدة للتأكد", payVerify:"دفع 0.05 TON تأكيد", verified:"تم التأكيد ✅ - انت مش بوت",
    withdrawTitle:"سحب ANKH", withdrawRules:"شروط السحب:", rule1:"• الرسوم: 5% (تخصم تلقائي)", rule2:"• الحد الأدنى: 10,000 ANKH", rule3:"• سحب واحد كل 24 ساعة", rule4:"• يجب الاحتفاظ بـ 25% في المحفظة",
    minAmount:"الحد الأدنى", yourBalance:"رصيدك", amountToWithdraw:"المبلغ المراد سحبه", minIs:"الحد الأدنى 10,000", enterAmount:"اكتب المبلغ (الحد 10,000)", withdrawBtn:"سحب ANKH", notEnough:"رصيدك اقل من 10,000", lessThanMin:"المبلغ اقل من الحد الأدنى (10,000)",
    referralCode:"رمز الإحالة (فريد):", unique:"فريد لكل مستخدم"
  },
  ru: {
    mining:"Майнинг", list:"Список", friends:"Друзья", wallet:"Кошелек", lang:"Язык",
    total:"Баланс", perHour:"В час", daily:"В день", boost:"Буст",
    walletTitle:"TON Кошелек - Уровень", inWallet:"ANKH в кошельке", level0:"Уровень 0", startFree:"Старт бесплатно 0.77/ч",
    connectWallet:"Подключить кошелек", chooseWallet:"Выберите кошелек", tonkeeper:"Tonkeeper", myton:"MyTon", tonhub:"Tonhub",
    connected:"Подключен", address:"Адрес", disconnect:"Отключить", change:"Изменить",
    verifyTitle:"Анти-бот проверка", verifyDesc:"Оплатите 0.05 TON (GRAM) один раз", payVerify:"Оплатить 0.05 TON", verified:"Проверено ✅",
    withdrawTitle:"Вывод ANKH", withdrawRules:"Правила:", rule1:"• Комиссия: 5%", rule2:"• Минимум: 10,000 ANKH", rule3:"• 1 вывод в 24ч", rule4:"• Держать 25%",
    minAmount:"Минимум", yourBalance:"Ваш баланс", amountToWithdraw:"Сумма вывода", minIs:"Мин 10,000", enterAmount:"Введите сумму (Мин 10,000)", withdrawBtn:"Вывести ANKH", notEnough:"Баланс меньше 10,000", lessThanMin:"Меньше минимума (10,000)",
    referralCode:"Реф код (Уникальный):", unique:"Уникален"
  }
};

export default function Page() {
  const [lang, setLang] = useState("ar");
  const [balance, setBalance] = useState(12450);
  const [walletBalance, setWalletBalance] = useState(0);
  const [tab, setTab] = useState("wallet");
  const [refCode, setRefCode] = useState("9378606261");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [walletAddress] = useState("UQAmvS...tpM3e");
  const [withdrawInput, setWithdrawInput] = useState("");
  const [lastWithdraw, setLastWithdraw] = useState(0);
  const L = T[lang];

  useEffect(()=>{
    let code = localStorage.getItem("ankh_ref");
    if(!code){ code = Math.floor(1000000000 + Math.random()*9000000000).toString(); localStorage.setItem("ankh_ref", code); }
    setRefCode(code);
  },[]);

  const rate = 0.77 + (walletBalance/15)*0.77;
  useEffect(()=>{ const i=setInterval(()=>setBalance(b=>b+rate/36000),100); return ()=>clearInterval(i); },[rate]);

  const currentLevel = Math.floor(walletBalance/15);

  const connectTonkeeper = () => {
    setShowWallets(false);
    window.open("https://app.tonkeeper.com/ton-connect", "_blank");
    setTimeout(()=>{ setConnected(true); setWalletBalance(25); },1200);
  };

  const payVerify = () => {
    window.open("https://app.tonkeeper.com/transfer/UQANkhFeeAddress123456789?amount=50000000&text=ANKH-verify-0.05-GRAM", "_blank");
    setTimeout(()=>{ setVerified(true); },1500);
  };

  const handleWithdraw = () => {
    const amount = Number(withdrawInput);
    if(amount < 10000){ alert(L.lessThanMin); return; }
    if(balance < 10000){ alert(L.notEnough); return; }
    if(Date.now()-lastWithdraw < 86400000){ alert("سحب واحد كل 24 ساعة"); return; }
    const fee = amount * 0.05;
    const receive = amount - fee;
    if(confirm(`هتسحب ${amount} ANKH\nرسوم 5% = ${fee}\nهتستلم = ${receive}\n\nموافق؟`)){
      setBalance(b=>b-amount);
      setLastWithdraw(Date.now());
      setWithdrawInput("");
      alert(`تم طلب سحب ${receive} ANKH (بعد خصم 5%)`);
    }
  };

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", display:"flex", justifyContent:"center", fontFamily:"sans-serif"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#0f0f0f", minHeight:"100vh", paddingBottom:"90px", direction: lang==="ar" ? "rtl" : "ltr"}}>
        
        <div style={{padding:"10px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#111", borderBottom:"1px solid #222"}}>
          <b style={{color:"#facc15"}}>ANKH</b>
          <div style={{display:"flex", gap:"6px", alignItems:"center"}}>
            <span style={{fontSize:"10px", color:"#888"}}>{L.lang}:</span>
            <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:"#222", color:"white", border:"1px solid #333", borderRadius:"6px", padding:"4px 6px", fontSize:"11px"}}>
              <option value="en">🇺🇸 EN</option><option value="ar">🇪🇬 عربي</option><option value="ru">🇷🇺 RU</option>
            </select>
          </div>
        </div>

        <div style={{margin:"8px", background:"#1a1a1a", borderRadius:"12px", padding:"10px", border:"1px solid #facc15", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{display:"flex", gap:"8px", alignItems:"center"}}><div style={{width:"32px", height:"32px", background:"#222", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"}}>☥</div><div><b>ANKH</b><p style={{fontSize:"10px", color:"#888"}}>TON Network • LVL {currentLevel}/500</p></div></div>
          <span style={{background:"#222", padding:"4px 8px", borderRadius:"12px", fontSize:"10px", color:"#facc15"}}>LVL {currentLevel}</span>
        </div>

        {/* خانة المحفظة الجديدة 100% زي طلبك */}
        <div style={{padding:"12px"}}>
          <h3 style={{fontSize:"14px", fontWeight:"bold", marginBottom:"10px"}}>💼 {L.walletTitle} {currentLevel} - {L.inWallet}: {walletBalance} ANKH</h3>
          
          <div style={{background:"#1e241e", borderRadius:"16px", padding:"14px", border:"1px solid #333"}}>
            {!connected ? (
              <>
                <p style={{fontSize:"12px", color:"#888", marginBottom:"10px"}}>{L.total}: {balance.toFixed(2)} ANKH</p>
                <button onClick={()=>setShowWallets(true)} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"14px", borderRadius:"12px", fontWeight:"bold", fontSize:"14px"}}>🔗 {L.connectWallet}</button>
                <p style={{fontSize:"10px", color:"#666", textAlign:"center", marginTop:"8px"}}>ادوس واختار Tonkeeper</p>
              </>
            ):(
              <>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"#122a12", border:"1px solid #0f0", borderRadius:"10px", padding:"10px"}}>
                  <div><p style={{fontSize:"11px", color:"#0f0"}}>● {L.connected}</p><p style={{fontSize:"10px", color:"#888"}}>{L.address}: {walletAddress}</p></div>
                  <div style={{display:"flex", gap:"4px"}}><button onClick={()=>setShowWallets(true)} style={{background:"#222", color:"#facc15", border:"1px solid #333", padding:"4px 8px", borderRadius:"8px", fontSize:"10px"}}>{L.change}</button><button onClick={()=>{setConnected(false); setVerified(false);}} style={{background:"#2a1a1a", color:"#ff6666", border:"1px solid #333", padding:"4px 8px", borderRadius:"8px", fontSize:"10px"}}>{L.disconnect}</button></div>
                </div>

                {/* مهمة 0.05 GRAM */}
                <div style={{marginTop:"12px", background:"#2a2210", border:"1px solid #facc15", borderRadius:"12px", padding:"12px"}}>
                  <p style={{fontSize:"12px", fontWeight:"bold"}}>🛡️ {L.verifyTitle}</p>
                  <p style={{fontSize:"10px", color:"#aaa", marginTop:"4px"}}>{L.verifyDesc}</p>
                  {!verified ? (
                    <button onClick={payVerify} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"12px", borderRadius:"10px", fontWeight:"bold", marginTop:"8px"}}>💎 {L.payVerify}</button>
                  ):(
                    <div style={{background:"#1a2a1a", border:"1px solid #0f0", borderRadius:"8px", padding:"10px", marginTop:"8px", textAlign:"center"}}><p style={{color:"#0f0", fontWeight:"bold"}}>{L.verified}</p></div>
                  )}
                </div>

                {/* شروط السحب + مربع الحد الأدنى */}
                <div style={{marginTop:"12px", background:"#1a1f1a", borderRadius:"12px", padding:"12px", border:"1px solid #222"}}>
                  <p style={{fontSize:"12px", fontWeight:"bold"}}>📤 {L.withdrawTitle}</p>
                  <div style={{fontSize:"11px", color:"#aaa", marginTop:"6px", lineHeight:"1.6", background:"#151515", padding:"8px", borderRadius:"8px"}}>
                    <p>{L.withdrawRules}</p>
                    <p style={{color:"#facc15"}}>{L.rule1}</p>
                    <p style={{color:"#ff6666"}}>{L.rule2}</p>
                    <p>{L.rule3}</p>
                    <p style={{color:"#888"}}>{L.rule4}</p>
                  </div>

                  <div style={{marginTop:"12px"}}>
                    <div style={{display:"flex", justifyContent:"space-between", fontSize:"11px", color:"#888"}}>
                      <span>{L.yourBalance}: {balance.toFixed(2)} ANKH</span>
                      <span style={{color:"#facc15"}}>{L.minAmount}: 10,000 ANKH</span>
                    </div>
                    
                    <div style={{marginTop:"8px", background:"#0f0f0f", border:"2px solid #facc15", borderRadius:"10px", padding:"4px 12px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                      <span style={{fontSize:"11px", color:"#888"}}>{L.minIs}</span>
                      <b style={{fontSize:"16px"}}>10,000</b>
                      <span style={{fontSize:"11px", color:"#facc15"}}>ANKH</span>
                    </div>

                    <div style={{marginTop:"8px"}}>
                      <p style={{fontSize:"11px", color:"#888", marginBottom:"4px"}}>{L.amountToWithdraw}</p>
                      <div style={{background:"#151515", border:"1px solid #333", borderRadius:"10px", padding:"12px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <input type="number" value={withdrawInput} onChange={e=>setWithdrawInput(e.target.value)} placeholder={L.enterAmount} style={{background:"transparent", border:"none", color:"white", fontSize:"16px", width:"100%", outline:"none"}} />
                        <span style={{color:"#facc15", fontWeight:"bold", fontSize:"12px"}}>ANKH</span>
                      </div>
                      {withdrawInput && Number(withdrawInput) < 10000 && (
                        <p style={{fontSize:"10px", color:"#ff6666", marginTop:"4px"}}>⚠️ {L.lessThanMin}</p>
                      )}
                      <div style={{display:"flex", gap:"6px", marginTop:"8px"}}>
                        {[
                          {label:"10k", val:10000},
                          {label:"25k", val:25000},
                          {label:"50k", val:50000},
                          {label:"All", val: Math.floor(balance)},
                        ].map(b=>(
                          <button key={b.label} onClick={()=>setWithdrawInput(b.val.toString())} style={{flex:1, background:"#222", border:"1px solid #333", color:"white", padding:"6px", borderRadius:"20px", fontSize:"11px"}}>{b.label}</button>
                        ))}
                      </div>
                    </div>

                    <button onClick={handleWithdraw} disabled={!verified || !withdrawInput || Number(withdrawInput)<10000} style={{width:"100%", background: verified && withdrawInput && Number(withdrawInput)>=10000 ? "#facc15" : "#333", color: verified && withdrawInput && Number(withdrawInput)>=10000 ? "black" : "#888", border:"none", padding:"14px", borderRadius:"12px", fontWeight:"bold", marginTop:"12px", fontSize:"14px"}}>
                      📤 {L.withdrawBtn} {withdrawInput ? `(${withdrawInput} ANKH)` : ""}
                    </button>
                    {!verified && <p style={{fontSize:"10px", color:"#ff6666", textAlign:"center", marginTop:"6px"}}>لازم تدفع 0.05 TON الأول عشان تسحب</p>}
                  </div>
                </div>

                <div style={{marginTop:"10px", background:"#1a1f1a", borderRadius:"8px", padding:"8px", fontSize:"10px", display:"flex", justifyContent:"space-between"}}>
                  <span>{L.referralCode}</span><b style={{color:"#facc15"}}>{refCode}</b>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal اختيار المحفظة */}
        {showWallets && (
          <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", background:"rgba(0,0,0,0.9)", zIndex:100, display:"flex", justifyContent:"center", alignItems:"flex-end"}}>
            <div style={{width:"100%", maxWidth:"400px", background:"#1a1a1a", borderRadius:"20px 20px 0 0", padding:"20px", borderTop:"1px solid #333"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px"}}>
                <h3 style={{fontSize:"16px", fontWeight:"bold"}}>🔗 {L.chooseWallet}</h3>
                <button onClick={()=>setShowWallets(false)} style={{background:"#222", color:"white", border:"none", width:"32px", height:"32px", borderRadius:"50%"}}>✕</button>
              </div>
              
              <button onClick={connectTonkeeper} style={{width:"100%", background:"#1e1e1e", border:"1px solid #333", borderRadius:"12px", padding:"14px", display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px"}}>
                <div style={{width:"40px", height:"40px", background:"#2a9eff", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px"}}>💎</div>
                <div style={{textAlign:"left"}}><b>Tonkeeper</b><p style={{fontSize:"11px", color:"#888"}}>Most popular TON wallet</p></div>
                <span style={{marginLeft:"auto"}}>›</span>
              </button>

              <button onClick={connectTonkeeper} style={{width:"100%", background:"#1e1e1e", border:"1px solid #333", borderRadius:"12px", padding:"14px", display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px"}}>
                <div style={{width:"40px", height:"40px", background:"#ff9500", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px"}}>🔶</div>
                <div style={{textAlign:"left"}}><b>MyTon Wallet</b><p style={{fontSize:"11px", color:"#888"}}>MyTon Wallet</p></div>
                <span style={{marginLeft:"auto"}}>›</span>
              </button>

              <button onClick={connectTonkeeper} style={{width:"100%", background:"#1e1e1e", border:"1px solid #333", borderRadius:"12px", padding:"14px", display:"flex", alignItems:"center", gap:"12px"}}>
                <div style={{width:"40px", height:"40px", background:"#000", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px"}}>◼️</div>
                <div style={{textAlign:"left"}}><b>Tonhub</b><p style={{fontSize:"11px", color:"#888"}}>Tonhub Wallet</p></div>
                <span style={{marginLeft:"auto"}}>›</span>
              </button>

              <p style={{fontSize:"10px", color:"#666", textAlign:"center", marginTop:"14px"}}>هيفتح تطبيق المحفظة بره ويرجع</p>
            </div>
          </div>
        )}

        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#111", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"10px 0"}}>
          <button onClick={()=>setTab("mining")} style={{background:"none", border:"none", color:tab==="mining"?"#facc15":"#666", fontSize:"11px"}}>⛏️<br/>{L.mining}</button>
          <button onClick={()=>setTab("list")} style={{background:"none", border:"none", color:"#666", fontSize:"11px"}}>📋<br/>{L.list}</button>
          <button onClick={()=>setTab("friends")} style={{background:"none", border:"none", color:"#666", fontSize:"11px"}}>👥<br/>{L.friends}</button>
          <button onClick={()=>setTab("wallet")} style={{background:"none", border:"none", color:"#facc15", fontSize:"11px"}}>💼<br/>{L.wallet}</button>
        </div>

      </div>
    </div>
  );
}
