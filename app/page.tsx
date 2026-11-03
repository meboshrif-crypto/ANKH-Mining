"use client";
import { useState, useEffect } from "react";

const T = {
  ar: { mining:"التعدين", staking:"الاستيكينج", tasks:"المهام", friends:"الأصدقاء", wallet:"المحفظة", bal:"إجمالي الرصيد المُعدّن", active:"التعدين النشط", working:"يعمل مجانا", onWallet:"السرعة على المحفظة", perH:"في الساعة", daily:"يومي", rate:"معدل", fee:"رسوم السحب 2% - كل 24 ساعة", level:"المستوى", need:"محتاج", current:"نشط ✅", buy:"شراء", connect:"ربط (0.05 TON)", connected:"متصل", withdraw:"سحب", wait:"بعد 24 ساعة", dailyTitle:"السلسلة اليومية 30 يوم", checkin:"تسجيل اليوم", tasksTitle:"المهام", stakeTitle:"Staking", days:"يوم", share:"مشاركة" },
  en: { mining:"Mining", staking:"Staking", tasks:"Tasks", friends:"Friends", wallet:"Wallet", bal:"Total Mined", active:"Active Mining", working:"Free Mining", onWallet:"Speed by Wallet", perH:"/Hour", daily:"Daily", rate:"Rate", fee:"Fee 2% - 24h", level:"Level", need:"Need", current:"Active ✅", buy:"Buy", connect:"Connect (0.05 TON)", connected:"Connected", withdraw:"Withdraw", wait:"After 24h", dailyTitle:"30 Day Streak", checkin:"Check-in", tasksTitle:"Tasks", stakeTitle:"Staking", days:"days", share:"Share" },
  ru: { mining:"Майнинг", staking:"Стейкинг", tasks:"Задания", friends:"Друзья", wallet:"Кошелек", bal:"Баланс", active:"Майнинг", working:"Бесплатно", onWallet:"Скорость по кошельку", perH:"/час", daily:"В день", rate:"Ставка", fee:"Комиссия 2% - 24ч", level:"Уровень", need:"Нужно", current:"Активен ✅", buy:"Купить", connect:"Подкл (0.05 TON)", connected:"Подкл", withdraw:"Вывод", wait:"Через 24ч", dailyTitle:"30 дней", checkin:"Вход", tasksTitle:"Задания", stakeTitle:"Стейкинг", days:"дней", share:"Поделиться" },
};

export default function Page() {
  const [lang, setLang] = useState("ar");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [connected, setConnected] = useState(false);
  const [lastW, setLastW] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [tab, setTab] = useState("mining");
  const L:any = T[lang as keyof typeof T];

  const getRate = () => {
    const lvl = Math.floor(walletBalance / 15) + 1;
    return lvl * 0.77;
  };
  const rate = getRate();
  const currentLevel = Math.floor(walletBalance / 15) + 1;

  useEffect(()=>{
    const i=setInterval(()=>setBalance(b=>b+rate/36000),100);
    return ()=>clearInterval(i);
  },[rate]);

  const connect = () => {
    window.open("https://app.tonkeeper.com/transfer/UQANKH123456?amount=50000000&text=ANKH-verify", "_blank");
    setTimeout(()=>{setConnected(true); setWalletBalance(25);},1500);
  };

  // 500 مستوى زي الفيديو بالظبط
  const allLevels = Array.from({length:500}, (_,i)=>{
    const id=i+1;
    return {id, need:id*15, rate:(id*0.77).toFixed(2), price:id*15};
  });

  const displayLevels = showAll ? allLevels : allLevels.slice(0,20);

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", display:"flex", justifyContent:"center", fontFamily:"sans-serif"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#0f0f0f", minHeight:"100vh", paddingBottom:"80px", direction: lang==="ar" ? "rtl" : "ltr"}}>
        
        <div style={{padding:"12px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #222"}}>
          <b style={{color:"#facc15"}}>ANKH 500LVL</b>
          <div style={{display:"flex", gap:"6px"}}>
            <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:"#222", color:"white", border:"1px solid #333", borderRadius:"6px", padding:"4px", fontSize:"11px"}}>
              <option value="ar">🇪🇬 عربي</option><option value="en">🇺🇸 EN</option><option value="ru">🇷🇺 RU</option>
            </select>
            {!connected ? <button onClick={connect} style={{background:"#facc15", color:"black", border:"none", padding:"6px 10px", borderRadius:"20px", fontWeight:"bold", fontSize:"10px"}}>{L.connect}</button> : <span style={{fontSize:"10px", background:"#122a12", color:"#0f0", padding:"5px 8px", borderRadius:"20px"}}>● LVL {currentLevel}</span>}
          </div>
        </div>

        <div style={{margin:"12px", background:"#1a1a1a", borderRadius:"16px", padding:"14px", border:"1px solid #222"}}>
          <p style={{fontSize:"10px", color:"#888"}}>{L.bal}</p>
          <h1 style={{fontSize:"26px"}}>{balance.toFixed(4)} ANKH</h1>
          <p style={{fontSize:"11px", color:"#0f0"}}>{L.onWallet}: {rate.toFixed(2)}/h - LVL {currentLevel} / 500</p>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px", marginTop:"10px"}}>
            <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.perH}</p><b>{rate.toFixed(2)}</b></div>
            <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.daily}</p><b>{(rate*24).toFixed(0)}</b></div>
            <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.rate}</p><b style={{color:"#0f0"}}>+2.99</b></div>
          </div>
        </div>

        <div style={{margin:"12px"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px"}}>
            <h3 style={{fontSize:"13px"}}>نظام 500 مستوى - {L.level} {currentLevel}/500</h3>
            <button onClick={()=>setShowAll(!showAll)} style={{fontSize:"10px", background:"#222", color:"#facc15", border:"1px solid #333", padding:"4px 10px", borderRadius:"12px"}}>{showAll ? "عرض 20 فقط" : "عرض كل 500"}</button>
          </div>
          <div style={{background:"#1a1a1a", borderRadius:"12px", padding:"8px", maxHeight: showAll ? "600px" : "400px", overflowY:"auto"}}>
            {displayLevels.map(l=>(
              <div key={l.id} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px", borderBottom:"1px solid #1f1f1f", fontSize:"11px", background: currentLevel===l.id ? "#2a2210" : currentLevel>l.id ? "#1a221a" : "transparent", borderRadius:"6px"}}>
                <span style={{width:"50px"}}>{L.level} {l.id}</span>
                <span style={{color:"#facc15"}}>{l.price} ANKH</span>
                <span style={{fontSize:"10px", color:"#888"}}>{l.rate}/h</span>
                <span style={{color: currentLevel>=l.id ? "#0f0" : "#666", fontSize:"10px", fontWeight:"bold"}}>{currentLevel>l.id ? "✔️" : currentLevel===l.id ? L.current : L.buy}</span>
              </div>
            ))}
          </div>
          <p style={{fontSize:"10px", color:"#666", textAlign:"center", marginTop:"6px"}}>كل مستوى = 15 ANKH في المحفظة = +0.77/ساعة - زي الفيديو بالظبط</p>
        </div>

        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#111", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
          <button onClick={()=>setTab("mining")} style={{background:"none", border:"none", color:tab==="mining"?"#facc15":"#666", fontSize:"10px"}}>⛏️ {L.mining}</button>
          <button onClick={()=>setTab("staking")} style={{background:"none", border:"none", color:"#666", fontSize:"10px"}}>🔒 {L.staking}</button>
          <button onClick={()=>setTab("tasks")} style={{background:"none", border:"none", color:"#666", fontSize:"10px"}}>📋 {L.tasks}</button>
          <button onClick={()=>setTab("wallet")} style={{background:"none", border:"none", color:"#666", fontSize:"10px"}}>💼 {L.wallet}</button>
        </div>

      </div>
    </div>
  );
}
