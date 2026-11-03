"use client";
import { useState, useEffect } from "react";

const T:any = {
  en: {
    mining:"Mining", store:"Store", list:"List", friends:"Friends", wallet:"Wallet", lang:"EN",
    total:"Total Mined Balance", active:"Active Mining", working:"Working Now", perHour:"Per Hour", daily:"Daily", boost:"Boost",
    walletTitle:"TON Wallet", connectWallet:"Connect Wallet", chooseWallet:"Choose wallet", tonkeeper:"Tonkeeper", myton:"MyTon Wallet",
    connected:"Wallet Connected", change:"Change", disconnect:"Disconnect",
    verifyTitle:"Anti-bot Verification (0.05 GRAM)", verifyDesc:"Pay 0.05 TON once to prove you are not a bot", payVerify:"Pay 0.05 TON to Verify", verified:"Verified ✅",
    withdrawTitle:"Withdraw ANKH", rule1:"Fee: 5%", rule2:"Min: 10,000 ANKH", minAmount:"Minimum Amount", yourBalance:"Your Balance", amountToWithdraw:"Amount to Withdraw", minIs:"Min is 10,000", enterAmount:"Enter amount (Min 10,000)", withdrawBtn:"Withdraw",
    friendsTitle:"Referral Program", friendsDesc:"Invite friends and get 5% of their mining profits for life", friendsReward:"When your friends mine ANKH you get 5% permanent reward on each token directly to your balance.",
    copyLink:"Copy Link", shareTG:"Share on Telegram", yourCode:"Your Private Referral Code", fromTotal:"5% of total", invited:"Invited Friends", pending:"Pending Earnings", miningNow:"Mining Now", totalEarnings:"Total Earnings", invitedList:"Invited Friends List", all:"All >", noFriends:"You have no invited friends yet",
  },
  ar: {
    mining:"التعدين", store:"المتجر", list:"القائمة", friends:"الأصدقاء", wallet:"المحفظة", lang:"AR",
    total:"إجمالي الرصيد المعدن", active:"التعدين النشط", working:"يعمل الآن", perHour:"في الساعة", daily:"يوميا", boost:"تعزيز",
    walletTitle:"محفظة TON", connectWallet:"ربط المحفظة", chooseWallet:"اختار محفظتك", tonkeeper:"تون كيبر", myton:"ماي تون", connected:"المحفظة مربوطة", change:"تغيير", disconnect:"فصل المحفظة",
    verifyTitle:"التحقق لمرة واحدة (0.05 جرام)", verifyDesc:"ادفع 0.05 TON مرة واحدة للتأكد انك مش بوت", payVerify:"ادفع 0.05 TON للتأكيد", verified:"تم التأكيد ✅",
    withdrawTitle:"سحب ANKH", rule1:"الرسوم: 5%", rule2:"الحد الأدنى: 10,000 ANKH", minAmount:"الحد الأدنى", yourBalance:"رصيدك", amountToWithdraw:"المبلغ المراد سحبه", minIs:"الحد الأدنى 10,000", enterAmount:"اكتب المبلغ (الحد 10,000)", withdrawBtn:"سحب الأموال",
    friendsTitle:"برنامج الإحالة", friendsDesc:"ادع أصدقاءك واحصل على 5% من أرباح تعدينهم مدى الحياة", friendsReward:"يقوم أصدقاؤك بتعدين ANKH تحصل على 5% مكافأة دائمة على كل توكن يبتعدنه مباشرة في رصيدك.",
    copyLink:"نسخ الرابط", shareTG:"مشاركة على تليجرام", yourCode:"رمز الإحالة الخاص بك", fromTotal:"من الجمع 5%", invited:"الأصدقاء المدعوون", pending:"الأرباح المعلقة", miningNow:"يعدنون الآن", totalEarnings:"إجمالي الأرباح", invitedList:"قائمة الأصدقاء المدعوين", all:"الكل >", noFriends:"ليس لديك أصدقاء مدعوون بعد",
  },
  ru: {
    mining:"Майнинг", store:"Магазин", list:"Список", friends:"Друзья", wallet:"Кошелек", lang:"RU",
    total:"Общий добытый баланс", active:"Активный майнинг", working:"Работает сейчас", perHour:"В час", daily:"В день", boost:"Буст",
    walletTitle:"TON Кошелек", connectWallet:"Подключить кошелек", chooseWallet:"Выберите кошелек", tonkeeper:"Tonkeeper", myton:"MyTon Wallet", connected:"Кошелек подключен", change:"Изменить", disconnect:"Отключить",
    verifyTitle:"Проверка анти-бот (0.05 GRAM)", verifyDesc:"Заплатите 0.05 TON один раз", payVerify:"Оплатить 0.05 TON", verified:"Проверено ✅",
    withdrawTitle:"Вывод ANKH", rule1:"Комиссия: 5%", rule2:"Мин: 10,000 ANKH", minAmount:"Минимум", yourBalance:"Ваш баланс", amountToWithdraw:"Сумма вывода", minIs:"Мин 10,000", enterAmount:"Введите сумму (Мин 10,000)", withdrawBtn:"Вывести",
    friendsTitle:"Реферальная программа", friendsDesc:"Пригласите друзей и получите 5% от их майнинга навсегда", friendsReward:"Когда ваши друзья майнят ANKH вы получаете 5% постоянный бонус с каждого токена прямо на баланс.",
    copyLink:"Копировать ссылку", shareTG:"Поделиться в Telegram", yourCode:"Ваш реферальный код", fromTotal:"5% от всего", invited:"Приглашенные друзья", pending:"Ожидающие выплаты", miningNow:"Майнят сейчас", totalEarnings:"Всего заработано", invitedList:"Список приглашенных друзей", all:"Все >", noFriends:"У вас пока нет приглашенных друзей",
  }
};

export default function Page() {
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(1245.5);
  const [walletBalance, setWalletBalance] = useState(0);
  const [tab, setTab] = useState("friends");
  const [refCode, setRefCode] = useState("0000000000");
  const [connected, setConnected] = useState(true);
  const [verified, setVerified] = useState(true);
  const [showWallets, setShowWallets] = useState(false);
  const [withdrawInput, setWithdrawInput] = useState("");
  const [friends, setFriends] = useState<any[]>([]);
  const L = T[lang];

  useEffect(()=>{
    let code = localStorage.getItem("ankh_ref_code");
    if(!code){
      const tgId = (window as any)?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      code = tgId ? tgId.toString() : Math.floor(1000000000 + Math.random()*8999999999).toString();
      localStorage.setItem("ankh_ref_code", code);
    }
    setRefCode(code);
  },[]);

  const rate = 0.77 + Math.floor(walletBalance/15)*0.77;
  useEffect(()=>{ const i=setInterval(()=>setBalance(b=>b+rate/36000),100); return ()=>clearInterval(i); },[rate]);

  const inviteLink = `https://t.me/AnkhBot?start=${refCode}`;
  const copyLink = () => { navigator.clipboard.writeText(inviteLink); alert(lang==="ar" ? "تم نسخ رابطك الخاص!" : lang==="ru" ? "Ссылка скопирована!" : "Your private link copied!"); };
  const shareTG = () => { window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent("Join ANKH mining!")}`,"_blank"); };

  return (
    <div style={{minHeight:"100vh", background:"#0f1410", color:"white", display:"flex", justifyContent:"center", fontFamily:"Tajawal, sans-serif"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#121612", minHeight:"100vh", paddingBottom:"80px", direction: lang==="ar" ? "rtl" : "ltr"}}>
        
        <div style={{padding:"12px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#1a1f1a", borderBottom:"1px solid #222"}}>
          <div style={{display:"flex", alignItems:"center", gap:"8px"}}><div style={{width:"36px", height:"36px", background:"#2a2a1a", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>✕</div><div><b>ANKH</b><p style={{fontSize:"10px", color:"#888"}}>mini app</p></div></div>
          <div style={{display:"flex", gap:"6px", alignItems:"center"}}>
            <span style={{background:"#222", padding:"4px 8px", borderRadius:"8px", fontSize:"11px"}}>📖</span>
            <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:"#1a2a1a", color:"#facc15", border:"1px solid #333", borderRadius:"8px", padding:"4px 8px", fontSize:"11px"}}>
              <option value="en">🇺🇸 EN</option><option value="ar">🇪🇬 AR</option><option value="ru">🇷🇺 RU</option>
            </select>
            <span style={{background:"#222", padding:"4px 8px", borderRadius:"50%"}}>•••</span>
          </div>
        </div>

        <div style={{padding:"12px", display:"flex", gap:"8px", alignItems:"center", background:"#1a1f1a", margin:"8px", borderRadius:"12px", border:"1px solid #facc15"}}>
          <div style={{width:"40px", height:"40px", background:"#222", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #facc15"}}>☥</div>
          <div><b>ANKH</b><p style={{fontSize:"11px", color:"#888"}}>TON Network</p></div>
          <div style={{marginLeft:"auto"}}><span style={{background:"#1a2a1a", color:"#facc15", padding:"4px 8px", borderRadius:"6px", fontSize:"11px"}}>LVL {Math.floor(walletBalance/15)}/500</span></div>
        </div>

        {/* التعدين */}
        {tab==="mining" && (
          <div style={{margin:"8px", background:"#1e241e", borderRadius:"16px", padding:"14px", border:"1px solid #222"}}>
            <p style={{fontSize:"10px", color:"#888"}}>{L.total}</p>
            <h1 style={{fontSize:"28px", fontWeight:"800"}}>{balance.toFixed(4)} <span style={{color:"#facc15", fontSize:"14px"}}>ANKH</span></h1>
            <p style={{fontSize:"10px", color:"#888", marginTop:"6px"}}>LVL {Math.floor(walletBalance/15)} • {rate.toFixed(2)}/h</p>
          </div>
        )}

        {/* الأصدقاء - نفس الصورة بالظبط بس باسم ANKH */}
        {tab==="friends" && (
          <div style={{padding:"8px"}}>
            <div style={{background:"#1e241e", borderRadius:"16px", padding:"12px", border:"1px solid #222"}}>
              <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                <span style={{background:"#2a2a1a", padding:"10px", borderRadius:"12px", fontSize:"18px"}}>👥</span>
                <div><b style={{fontSize:"15px"}}>{L.friendsTitle}</b><p style={{fontSize:"10px", color:"#888", marginTop:"2px"}}>{L.friendsDesc}</p></div>
              </div>

              <div style={{background:"#252d25", borderRadius:"10px", padding:"10px", marginTop:"12px", display:"flex", gap:"8px", fontSize:"10px", lineHeight:"1.6", border:"1px solid #2a3a2a"}}>
                <span style={{background:"#1a2a1a", minWidth:"20px", height:"20px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px"}}>ⓘ</span>
                <span style={{color:"#aaa"}}>{L.friendsReward.replace("5%","")} <b style={{color:"#facc15", background:"#2a2210", padding:"2px 6px", borderRadius:"6px"}}>5% {lang==="ar" ? "مكافأة دائمة" : lang==="ru" ? "постоянный бонус" : "permanent reward"}</b></span>
              </div>

              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginTop:"14px"}}>
                <button onClick={copyLink} style={{background:"#1a1f1a", border:"1px solid #333", color:"white", padding:"12px", borderRadius:"14px", fontSize:"12px", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px"}}>📋 {L.copyLink}</button>
                <button onClick={shareTG} style={{background:"#facc15", color:"black", border:"none", padding:"12px", borderRadius:"14px", fontWeight:"bold", fontSize:"12px", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px"}}>✈️ {L.shareTG}</button>
              </div>

              <div style={{marginTop:"12px", background:"#1a1f1a", borderRadius:"12px", padding:"12px", display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid #2a2a2a"}}>
                <div><p style={{fontSize:"10px", color:"#888"}}>{L.yourCode}</p><b style={{fontSize:"18px", letterSpacing:"1px"}}>{refCode}</b><p style={{fontSize:"8px", color:"#666", marginTop:"2px"}}>ID: {refCode} • {inviteLink.slice(0,22)}...</p></div>
                <span style={{background:"#2a2210", color:"#facc15", padding:"6px 12px", borderRadius:"20px", fontSize:"11px", border:"1px solid #facc15"}}>{L.fromTotal}</span>
              </div>

              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginTop:"12px"}}>
                <div style={{background:"#1a1f1a", padding:"14px", borderRadius:"12px", textAlign:"center", border:"1px solid #222"}}>
                  <p style={{fontSize:"10px", color:"#888", display:"flex", alignItems:"center", justifyContent:"center", gap:"4px"}}>👥 {L.invited}</p>
                  <b style={{fontSize:"24px"}}>{friends.length}</b>
                  <p style={{fontSize:"10px", color:"#0f8", marginTop:"4px"}}>● {friends.filter(f=>f.mining).length} {L.miningNow}</p>
                </div>
                <div style={{background:"#1a1f1a", padding:"14px", borderRadius:"12px", textAlign:"center", border:"1px solid #222"}}>
                  <p style={{fontSize:"10px", color:"#888", display:"flex", alignItems:"center", justifyContent:"center", gap:"4px"}}>🪙 {L.pending}</p>
                  <b style={{fontSize:"24px", color:"#facc15"}}>+0.00</b>
                  <p style={{fontSize:"10px", color:"#888", marginTop:"4px"}}>{L.totalEarnings}</p>
                </div>
              </div>

              <div style={{marginTop:"16px", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:"12px"}}>
                <span style={{display:"flex", alignItems:"center", gap:"6px"}}>👥 {L.invitedList} ({friends.length})</span>
                <span style={{background:"#222", padding:"4px 10px", borderRadius:"20px", fontSize:"11px"}}>{L.all}</span>
              </div>

              <div style={{marginTop:"30px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <div style={{width:"60px", height:"60px", background:"#2a2a2a", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px"}}>👤+</div>
                <p style={{fontSize:"12px", color:"#aaa", marginTop:"10px"}}>{L.noFriends}</p>
                <p style={{fontSize:"9px", color:"#666", marginTop:"4px", textAlign:"center"}}>Your link: t.me/AnkhBot?start={refCode}</p>
              </div>

            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{padding:"8px"}}>
            <div style={{background:"#1e241e", borderRadius:"16px", padding:"12px", border:"1px solid #333"}}>
              {!connected ? <button onClick={()=>setShowWallets(true)} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"14px", borderRadius:"12px", fontWeight:"bold"}}>{L.connectWallet}</button> :
              <><div style={{background:"#122a12", border:"1px solid #0f0", borderRadius:"10px", padding:"10px", display:"flex", justifyContent:"space-between"}}><div><p style={{fontSize:"11px", color:"#0f0"}}>● {L.connected}</p><p style={{fontSize:"10px"}}>UQAmvS...tpM3e</p></div><button onClick={()=>{setConnected(false); setVerified(false);}} style={{background:"#2a1a1a", color:"#ff6666", border:"1px solid #333", padding:"4px 8px", borderRadius:"8px", fontSize:"10px"}}>{L.disconnect}</button></div>
              <div style={{marginTop:"10px", background:"#2a2210", border:"1px solid #facc15", borderRadius:"12px", padding:"10px"}}><p style={{fontSize:"11px"}}>🛡️ {L.verifyTitle}</p><p style={{fontSize:"10px", color:"#aaa"}}>{L.verifyDesc}</p>{!verified ? <button onClick={()=>setVerified(true)} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"10px", borderRadius:"8px", marginTop:"6px", fontWeight:"bold"}}>{L.payVerify}</button> : <p style={{color:"#0f0", textAlign:"center", marginTop:"6px"}}>{L.verified}</p>}</div>
              <div style={{marginTop:"10px", background:"#1a1f1a", borderRadius:"10px", padding:"10px"}}><p style={{fontSize:"11px"}}>📤 {L.withdrawTitle} - {L.rule1} - {L.rule2}</p><div style={{marginTop:"8px", background:"#0f0f0f", border:"2px solid #facc15", borderRadius:"8px", padding:"8px", display:"flex", justifyContent:"space-between"}}><span style={{fontSize:"11px", color:"#888"}}>{L.minIs}</span><b>10,000 ANKH</b></div><div style={{background:"#151515", border:"1px solid #333", borderRadius:"8px", padding:"8px", display:"flex", marginTop:"6px"}}><input value={withdrawInput} onChange={e=>setWithdrawInput(e.target.value)} placeholder={L.enterAmount} style={{background:"transparent", border:"none", color:"white", width:"100%", outline:"none"}}/><span style={{color:"#facc15", fontSize:"12px"}}>ANKH</span></div></div></>}
            </div>
          </div>
        )}

        {showWallets && (
          <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", background:"rgba(0,0,0,0.85)", zIndex:100, display:"flex", justifyContent:"center", alignItems:"flex-end"}}>
            <div style={{width:"100%", maxWidth:"400px", background:"#1a1a1a", borderRadius:"20px 20px 0 0", padding:"20px"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"14px"}}><h3>{L.chooseWallet}</h3><button onClick={()=>setShowWallets(false)} style={{background:"#222", border:"none", color:"white", width:"30px", height:"30px", borderRadius:"50%"}}>✕</button></div>
              <button onClick={()=>{setShowWallets(false); setConnected(true);}} style={{width:"100%", background:"#1e1e1e", border:"1px solid #333", borderRadius:"12px", padding:"14px", display:"flex", gap:"12px", marginBottom:"8px"}}><div style={{width:"36px", height:"36px", background:"#2a9eff", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"}}>💎</div><b>{L.tonkeeper}</b></button>
              <button onClick={()=>{setShowWallets(false); setConnected(true);}} style={{width:"100%", background:"#1e1e1e", border:"1px solid #333", borderRadius:"12px", padding:"14px", display:"flex", gap:"12px"}}><div style={{width:"36px", height:"36px", background:"#ff9500", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"}}>🔶</div><b>{L.myton}</b></button>
            </div>
          </div>
        )}

        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#0f1410", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
          <button onClick={()=>setTab("mining")} style={{background:"none", border:"none", color:tab==="mining"?"#facc15":"#666", fontSize:"10px"}}>⛏️<br/>{T[lang].mining}</button>
          <button onClick={()=>setTab("store")} style={{background:"none", border:"none", color:"#666", fontSize:"10px"}}>🛒<br/>{T[lang].store}</button>
          <button onClick={()=>setTab("list")} style={{background:"none", border:"none", color:"#666", fontSize:"10px"}}>📋<br/>{T[lang].list}</button>
          <button onClick={()=>setTab("friends")} style={{background:"none", border:"none", color:tab==="friends"?"#facc15":"#666", fontSize:"10px"}}>👥<br/>{T[lang].friends}</button>
          <button onClick={()=>setTab("wallet")} style={{background:"none", border:"none", color:tab==="wallet"?"#facc15":"#666", fontSize:"10px"}}>💼<br/>{T[lang].wallet}</button>
        </div>

      </div>
    </div>
  );
}
