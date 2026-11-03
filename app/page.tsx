"use client";
import { useState, useEffect } from "react";

const T:any = {
  en: {
    mining:"Mining", store:"Store", list:"List", friends:"Friends", wallet:"Wallet",
    total:"Total Mined Balance", inside:"In-game • Not affect level",
    active:"Active Mining", working:"Working Now", perHour:"Per Hour", daily:"Daily", boost:"Boost", mult:"Multiplier",
    lvl:"Level", current:"Your Current Status", lootInWallet:"ANKH in wallet", determines:"Determines your level & earning speed",
    rules:"Mining Levels Rules", how:"How to increase level & speed?",
    walletTitle:"TON Wallet", connectDesc:"Blockchain link & Withdrawals", minedBal:"Mined Balance", totalWithdraw:"Total Withdrawn",
    inWallet:"Balance in Wallet", levelUp:"Level up", connected:"Wallet Connected", change:"Change", disconnect:"Disconnect",
    verifyTitle:"(0.05 TON) One-time wallet link verification", antiBot:"Anti-bot",
    reason:"Protects mining pool from bot farms. 0.05 TON confirms wallet belongs to real person.",
    once:"Paid once only: When linking new wallet address first time.",
    freeRe:"If you unlink and relink same wallet (0 TON): Free relink!",
    withdrawRules:"Withdraw Rules:", oncePer24:"Frequency: 1 withdraw per 24h (1-24h processing)", min:"Minimum: 10,000 ANKH", fee:"Fee: 5%", reserve:"Mandatory 25% Reserve: Keep at least 25% in wallet to withdraw",
    reserve25:"25% On-chain Reserve", ok:"Enough ✓", reserveRule:"Reserve rule: Protect token from dump",
    yourReserve:"Your Reserve", minForWithdraw:"Min for withdraw", withdrawLimit:"Withdraw Limit",
    walletOk:"Wallet Verified & Eligible", age:"Wallet Age", ston:"STON.fi Trades", verified:"Verified",
    openWithdraw:"Withdrawal Opened Forever", tokenStatus:"Your tokens status:", safe:"Tokens stay safe in your personal wallet and increase mining speed.",
    buyMore:"Buy more ANKH to boost speed", amountToWithdraw:"Amount to withdraw", withdrawBtn:"Withdraw", directLog:"Direct Payments Log", tonViewer:"Verify real payments on Tonviewer",
    referral:"Referral Program", referralDesc:"Invite friends and earn 5% of their mining forever", reward:"5% Permanent reward - Get 5% from what your friends mine directly to your balance.",
    copyLink:"Copy Link", shareTG:"Share on Telegram", yourCode:"Your Referral Code", ofTotal:"of total 5%", invited:"Invited Friends", pending:"Pending Earnings", miningNow:"Mining Now", invitedList:"Invited Friends List", all:"All",
    staking:"ANKH Staking", stakingDesc:"Lock tokens for high APY", available:"Available Balance", allBtn:"All", maxAcc:"Max by your rank", staked:"Staked", available2:"Available", chooseDur:"Choose Duration", day30:"30 Days", day90:"90 Days", day120:"120 Days", usual:"APY", amountToLock:"Amount to lock", min100:"Min: 100 ANKH",
    level0:"Level 0 - Start", startMining:"Start Mining Free - 0.77/h", lang:"Language"
  },
  ar: {
    mining:"التعدين", store:"المتجر", list:"القائمة", friends:"الأصدقاء", wallet:"المحفظة",
    total:"إجمالي الرصيد المعدن", inside:"داخل اللعبة • لا يؤثر على المستوى",
    active:"التعدين النشط", working:"يعمل الآن", perHour:"في الساعة", daily:"يوميا", boost:"تعزيز", mult:"المضاعف",
    lvl:"مستوى", current:"حالتك الحالية", lootInWallet:"ANKH في المحفظة", determines:"يحدد مستواك وسرعة أرباحك",
    rules:"قواعد مستويات التعدين", how:"كيف ترتفع المستويات؟",
    walletTitle:"محفظة TON", connectDesc:"الربط والسحوبات", minedBal:"الرصيد المعدن", totalWithdraw:"إجمالي المسحوبات",
    inWallet:"الرصيد في المحفظة", levelUp:"يرفع المستوى", connected:"المحفظة مربوطة", change:"تغيير", disconnect:"فصل المحفظة",
    verifyTitle:"(0.05 TON) التحقق لمرة واحدة", antiBot:"مكافحة البوتات",
    reason:"حماية المجمع من البوتات. 0.05 TON تؤكد ان المحفظة لشخص حقيقي.",
    once:"تدفع مرة واحدة فقط عند ربط عنوان جديد.",
    freeRe:"اذا فكيت ورجعت نفس المحفظة مجانا!",
    withdrawRules:"شروط السحب:", oncePer24:"سحب واحد كل 24 ساعة", min:"الحد الأدنى: 10,000 ANKH", fee:"رسوم: 5%", reserve:"يجب الاحتفاظ 25%",
    reserve25:"احتفاظ 25%", ok:"كاف ✓", reserveRule:"حماية من البيع", yourReserve:"رصيدك المحتفظ", minForWithdraw:"الحد للسحب", withdrawLimit:"حد السحب",
    walletOk:"المحفظة مؤكدة", age:"عمر المحفظة", ston:"صفقات STON.fi", verified:"تم التحقق",
    openWithdraw:"تم فتح السحب للأبد", tokenStatus:"حالة التوكنات:", safe:"التوكنات تظل بأمان في محفظتك وتزيد السرعة.",
    buyMore:"اشتري المزيد من ANKH", amountToWithdraw:"المبلغ المراد سحبه", withdrawBtn:"سحب الأموال", directLog:"سجل المدفوعات", tonViewer:"تحقق في Tonviewer",
    referral:"برنامج الإحالة", referralDesc:"ادع اصدقاءك واحصل على 5% مدى الحياة", reward:"مكافأة 5% دائمة من تعدين اصدقائك.",
    copyLink:"نسخ الرابط", shareTG:"مشاركة على تليجرام", yourCode:"رمز الإحالة", ofTotal:"من الاجمالي 5%", invited:"الأصدقاء المدعوون", pending:"الأرباح المعلقة", miningNow:"يعدنون الآن", invitedList:"قائمة الأصدقاء", all:"الكل",
    staking:"تخزين ANKH", stakingDesc:"اقفل التوكنات لعوائد عالية", available:"الرصيد المتاح", allBtn:"الكل", maxAcc:"الحد الأقصى حسب رتبتك", staked:"المخزن", available2:"المتاح", chooseDur:"اختر المدة", day30:"30 يوما", day90:"90 يوما", day120:"120 يوما", usual:"عائد", amountToLock:"المبلغ المراد قفله", min100:"الحد الأدنى: 100 ANKH",
    level0:"مستوى 0 - البداية", startMining:"ابدأ التعدين مجانا - 0.77/ساعة", lang:"اللغة"
  },
  ru: {
    mining:"Майнинг", store:"Магазин", list:"Список", friends:"Друзья", wallet:"Кошелек",
    total:"Добытый баланс", inside:"В игре • Не влияет на уровень",
    active:"Активный майнинг", working:"Работает", perHour:"В час", daily:"В день", boost:"Буст", mult:"Множитель",
    lvl:"Уровень", current:"Ваш статус", lootInWallet:"ANKH в кошельке", determines:"Определяет уровень и скорость",
    rules:"Правила уровней", how:"Как повысить уровень?",
    walletTitle:"TON Кошелек", connectDesc:"Привязка и вывод", minedBal:"Добытый баланс", totalWithdraw:"Всего выведено",
    inWallet:"Баланс в кошельке", levelUp:"Повышает уровень", connected:"Кошелек подключен", change:"Изменить", disconnect:"Отключить",
    verifyTitle:"(0.05 TON) Проверка кошелька", antiBot:"Анти-бот",
    reason:"Защита от бот-ферм. 0.05 TON подтверждает что кошелек реального человека.",
    once:"Платится один раз при привязке нового кошелька.",
    freeRe:"Если отвязать и привязать тот же кошелек - бесплатно!",
    withdrawRules:"Правила вывода:", oncePer24:"1 вывод в 24ч", min:"Минимум: 10,000 ANKH", fee:"Комиссия: 5%", reserve:"Резерв 25%",
    reserve25:"Резерв 25%", ok:"Достаточно ✓", reserveRule:"Защита от дампа", yourReserve:"Ваш резерв", minForWithdraw:"Мин для вывода", withdrawLimit:"Лимит вывода",
    walletOk:"Кошелек подтвержден", age:"Возраст кошелька", ston:"Сделки STON.fi", verified:"Проверено",
    openWithdraw:"Вывод открыт навсегда", tokenStatus:"Статус токенов:", safe:"Токены остаются в вашем кошельке и увеличивают скорость.",
    buyMore:"Купить больше ANKH", amountToWithdraw:"Сумма вывода", withdrawBtn:"Вывести", directLog:"Лог выплат", tonViewer:"Проверка в Tonviewer",
    referral:"Реферальная программа", referralDesc:"Пригласи друзей и получай 5% от их майнинга навсегда", reward:"5% навсегда от майнинга друзей.",
    copyLink:"Копировать ссылку", shareTG:"Поделиться в Telegram", yourCode:"Ваш реф код", ofTotal:"от всего 5%", invited:"Приглашенные друзья", pending:"Ожидающие", miningNow:"Майнят сейчас", invitedList:"Список друзей", all:"Все",
    staking:"Стейкинг ANKH", stakingDesc:"Заблокируй токены для высокого APY", available:"Доступный баланс", allBtn:"Все", maxAcc:"Макс по рангу", staked:"В стейке", available2:"Доступно", chooseDur:"Выбери срок", day30:"30 дней", day90:"90 дней", day120:"120 дней", usual:"APY", amountToLock:"Сумма блокировки", min100:"Мин: 100 ANKH",
    level0:"Уровень 0 - Старт", startMining:"Начни майнинг бесплатно - 0.77/ч", lang:"Язык"
  }
};

export default function Page() {
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [tab, setTab] = useState("mining");
  const [refCode, setRefCode] = useState("0000000000");
  const L = T[lang];

  // كود إحالة مختلف لكل شخص + يبدأ من لفل 0
  useEffect(()=>{
    let code = localStorage.getItem("ankh_ref");
    if(!code){
      code = Math.floor(1000000000 + Math.random()*9000000000).toString();
      localStorage.setItem("ankh_ref", code);
    }
    setRefCode(code);
  },[]);

  const allLevels = [
    {id:0, need:0, hourly:0.77, boost:1, daily:18},
    {id:1, need:15, hourly:1.54, boost:1.3, daily:36},
    {id:2, need:30, hourly:2.31, boost:1.7, daily:55},
    {id:3, need:60, hourly:3.08, boost:2.3, daily:73},
    {id:4, need:100, hourly:4.5, boost:2.99, daily:108},
    {id:5, need:200, hourly:12.3, boost:3.5, daily:295},
  ];
  for(let i=6;i<=500;i++){
    const prev = allLevels[i-1];
    allLevels.push({id:i, need:prev.need+Math.floor(i*15*1.2), hourly:+(prev.hourly*1.08).toFixed(2), boost:+(prev.boost*1.02).toFixed(2), daily:0});
  }
  allLevels.forEach(l=>l.daily=Math.floor(l.hourly*24));
  
  const currentLevelObj = [...allLevels].reverse().find(l=> walletBalance >= l.need) || allLevels[0];
  const currentLevel = currentLevelObj.id;
  const rate = currentLevelObj.hourly;

  useEffect(()=>{
    const i=setInterval(()=>setBalance(b=>b+rate/36000),100);
    return ()=>clearInterval(i);
  },[rate]);

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", display:"flex", justifyContent:"center", fontFamily:"sans-serif"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#0f0f0f", minHeight:"100vh", paddingBottom:"80px", direction: lang==="ar" ? "rtl" : "ltr"}}>
        
        <div style={{padding:"10px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#111", borderBottom:"1px solid #222"}}>
          <b style={{color:"#facc15"}}>ANKH</b>
          <div style={{display:"flex", gap:"6px", alignItems:"center"}}>
            <span style={{fontSize:"10px", color:"#888"}}>{L.lang}:</span>
            <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:"#222", color:"white", border:"1px solid #333", borderRadius:"6px", padding:"4px 8px", fontSize:"11px"}}>
              <option value="en">🇺🇸 English</option>
              <option value="ar">🇪🇬 عربي</option>
              <option value="ru">🇷🇺 Русский</option>
            </select>
          </div>
        </div>

        <div style={{margin:"8px", background:"#1a1a1a", borderRadius:"14px", padding:"12px", border:"1px solid #facc15"}}>
          <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <div style={{width:"36px", height:"36px", background:"#222", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #facc15"}}>☥</div>
            <div><b>ANKH</b><p style={{fontSize:"10px", color:"#888"}}>TON Network • LVL {currentLevel}/500</p></div>
            <div style={{marginLeft:"auto"}}><span style={{background:"#222", padding:"4px 8px", borderRadius:"6px", fontSize:"10px", color:"#facc15"}}>{currentLevel===0 ? L.level0 : `LVL ${currentLevel}`}</span></div>
          </div>
        </div>

        {tab==="mining" && (
          <div style={{margin:"8px", background:"#1e241e", borderRadius:"16px", padding:"14px", border:"1px solid #222"}}>
            <p style={{fontSize:"10px", color:"#888"}}>{L.total}</p>
            <h1 style={{fontSize:"28px", fontWeight:"800"}}>{balance.toFixed(4)} <span style={{color:"#facc15", fontSize:"14px"}}>ANKH</span></h1>
            <div style={{background:"#252d25", borderRadius:"12px", padding:"10px", marginTop:"10px"}}>
              <p style={{fontSize:"11px"}}>{L.active} - {L.working} {rate}/h - {L.lvl} {currentLevel}</p>
              <p style={{fontSize:"10px", color:"#888", marginTop:"4px"}}>{currentLevel===0 ? L.startMining : `${L.lootInWallet}: ${walletBalance} = ${L.determines}`}</p>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px", marginTop:"10px"}}>
              <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px"}}>{L.perHour}</p><b>{rate}</b></div>
              <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px"}}>{L.daily}</p><b>{currentLevelObj.daily}</b></div>
              <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px"}}>{L.boost}</p><b>x{currentLevelObj.boost}</b></div>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{padding:"8px"}}>
            <div style={{background:"#1e241e", borderRadius:"12px", padding:"12px", border:"1px solid #333"}}>
              <p style={{fontSize:"12px"}}>💼 {L.walletTitle} - LVL {currentLevel}</p>
              <p style={{fontSize:"10px", color:"#888"}}>{L.lootInWallet}: {walletBalance} ANKH - {rate}/h</p>
              <div style={{marginTop:"10px", display:"flex", gap:"6px"}}>
                <button onClick={()=>setWalletBalance(w=>w+15)} style={{background:"#facc15", color:"black", border:"none", padding:"8px 12px", borderRadius:"8px", fontSize:"11px", fontWeight:"bold"}}>TEST: +15 ANKH (Level up)</button>
                <button onClick={()=>setWalletBalance(0)} style={{background:"#222", color:"white", border:"1px solid #333", padding:"8px 12px", borderRadius:"8px", fontSize:"11px"}}>Reset to LVL 0</button>
              </div>
              <div style={{marginTop:"10px", background:"#1a1f1a", padding:"8px", borderRadius:"8px", fontSize:"10px"}}>
                <p>Referral Code (Unique): <b style={{color:"#facc15"}}>{refCode}</b> - {L.yourCode}</p>
              </div>
            </div>
          </div>
        )}

        {tab==="friends" && (
          <div style={{padding:"12px", textAlign:"center"}}>
            <h3>{L.referral}</h3><p style={{fontSize:"11px", color:"#888"}}>{L.referralDesc}</p>
            <div style={{background:"#1a1a1a", padding:"12px", borderRadius:"10px", marginTop:"10px"}}><p style={{fontSize:"11px"}}>{L.yourCode}</p><b style={{fontSize:"22px", color:"#facc15"}}>{refCode}</b><p style={{fontSize:"9px", color:"#888", marginTop:"4px"}}>Unique for each user</p></div>
            <button style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"12px", borderRadius:"10px", fontWeight:"bold", marginTop:"10px"}}>{L.shareTG}</button>
          </div>
        )}

        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#111", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
          <button onClick={()=>setTab("mining")} style={{background:"none", border:"none", color:tab==="mining"?"#facc15":"#666", fontSize:"10px"}}>⛏️<br/>{L.mining}</button>
          <button onClick={()=>setTab("list")} style={{background:"none", border:"none", color:tab==="list"?"#facc15":"#666", fontSize:"10px"}}>📋<br/>{L.list}</button>
          <button onClick={()=>setTab("friends")} style={{background:"none", border:"none", color:tab==="friends"?"#facc15":"#666", fontSize:"10px"}}>👥<br/>{L.friends}</button>
          <button onClick={()=>setTab("wallet")} style={{background:"none", border:"none", color:tab==="wallet"?"#facc15":"#666", fontSize:"10px"}}>💼<br/>{L.wallet}</button>
        </div>

      </div>
    </div>
  );
}
