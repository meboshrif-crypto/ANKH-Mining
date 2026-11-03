"use client";
import { useState, useEffect } from "react";

const T = {
  ar: { mining:"التعدين", staking:"الاستيكينج", tasks:"المهام", friends:"الأصدقاء", wallet:"المحفظة", bal:"إجمالي الرصيد المُعدّن", active:"التعدين النشط", working:"يعمل الآن", onWallet:"الدخل اليومي", perH:"في الساعة", daily:"يومي", rate:"معدل", fee:"رسوم السحب 2% - كل 24 ساعة", level:"مستوى", need:"الـ LOOT في المحفظة", current:"حالتك الحالية", boost:"التعزيز", hour:"ساعة", day:"يوم", disconnect:"فصل المحفظة", connect:"ربط المحفظة (0.05 TON)", connected:"متصل", withdraw:"سحب الرصيد", wait:"السحب بعد 24 ساعة", dailyTitle:"السلسلة اليومية", checkin:"تسجيل دخول", system500:"نظام الـ 500 مستوى", calcLevel:"حساب المستوى", allLevels:"جميع المستويات", cycles:"الدوريات (5 دوريات)", understood:"فهمت" },
  en: { mining:"Mining", staking:"Staking", tasks:"Tasks", friends:"Friends", wallet:"Wallet", bal:"Total Mined Balance", active:"Active Mining", working:"Working Now", onWallet:"Daily Income", perH:"Per Hour", daily:"Daily", rate:"Rate", fee:"Withdraw fee 2% - 24h", level:"Level", need:"LOOT in wallet", current:"Your Status", boost:"Boost", hour:"hour", day:"day", disconnect:"Disconnect", connect:"Connect (0.05 TON)", connected:"Connected", withdraw:"Withdraw", wait:"After 24h", dailyTitle:"Daily Streak", checkin:"Check-in", system500:"500 Level System", calcLevel:"Level Calc", allLevels:"All Levels", cycles:"Cycles (5)", understood:"Understood" },
  ru: { mining:"Майнинг", staking:"Стейкинг", tasks:"Задания", friends:"Друзья", wallet:"Кошелек", bal:"Баланс", active:"Майнинг", working:"Работает", onWallet:"Дневной доход", perH:"В час", daily:"В день", rate:"Ставка", fee:"Комиссия 2% - 24ч", level:"Уровень", need:"LOOT в кошельке", current:"Ваш статус", boost:"Буст", hour:"час", day:"день", disconnect:"Отключить", connect:"Подкл (0.05 TON)", connected:"Подкл", withdraw:"Вывод", wait:"Через 24ч", dailyTitle:"Ежедневно", checkin:"Вход", system500:"Система 500 уровней", calcLevel:"Расчет", allLevels:"Все уровни", cycles:"Циклы (5)", understood:"Понял" },
};

export default function Page() {
  const [lang, setLang] = useState("ar");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(45);
  const [connected, setConnected] = useState(true);
  const [lastW, setLastW] = useState(0);
  const [tab, setTab] = useState("mining");
  const [show500, setShow500] = useState(true);
  const L:any = (T as any)[lang];

  // حساب المستوى من الصورة - نفس ارقام LootVault
  const getLevelData = () => {
    const levels = [
      {id:1, need:15, hourly:15, boost:1, daily:360},
      {id:2, need:112, hourly:18.8, boost:1.3, daily:451},
      {id:3, need:523, hourly:25.6, boost:1.7, daily:614},
      {id:4, need:1200, hourly:34.4, boost:2.3, daily:825},
      {id:5, need:2500, hourly:44.9, boost:2.99, daily:1077},
    ];
    // كمل لـ 500 بنفس المعادلة (exponential)
    for(let i=6; i<=500; i++){
      const prev = levels[i-2];
      const need = Math.floor(prev.need * 1.35 + i*120);
      const hourly = +(prev.hourly * 1.18).toFixed(1);
      const boost = +(prev.boost * 1.12).toFixed(2);
      const daily = Math.floor(hourly * 24);
      levels.push({id:i, need, hourly, boost, daily});
    }
    return levels;
  };
  const allLevels = getLevelData();
  const currentLevelObj = [...allLevels].reverse().find(l=> walletBalance >= l.need) || allLevels[0];
  const currentLevel = currentLevelObj.id;
  const rate = currentLevelObj.hourly;

  useEffect(()=>{
    const i=setInterval(()=>setBalance(b=>b+rate/36000),100);
    return ()=>clearInterval(i);
  },[rate]);

  const connect = () => {
    window.open("https://app.tonkeeper.com/transfer/UQANKH123456?amount=50000000&text=ANKH-verify", "_blank");
    setTimeout(()=>{setConnected(true); setWalletBalance(45);},1500);
  };
  const disconnect = () => { setConnected(false); setWalletBalance(0); };

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", display:"flex", justifyContent:"center", fontFamily:"sans-serif"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#0f0f0f", minHeight:"100vh", paddingBottom:"80px", direction: lang==="ar" ? "rtl" : "ltr", position:"relative"}}>
        
        <div style={{padding:"12px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #222"}}>
          <b style={{color:"#facc15"}}>☥ ANKH</b>
          <div style={{display:"flex", gap:"6px", alignItems:"center"}}>
            <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:"#222", color:"white", border:"1px solid #333", borderRadius:"6px", padding:"4px", fontSize:"11px"}}>
              <option value="ar">🇪🇬 عربي</option><option value="en">🇺🇸 EN</option><option value="ru">🇷🇺 RU</option>
            </select>
            {!connected ? (
              <button onClick={connect} style={{background:"#facc15", color:"black", border:"none", padding:"6px 10px", borderRadius:"20px", fontWeight:"bold", fontSize:"10px"}}>{L.connect}</button>
            ):(
              <div style={{display:"flex", gap:"4px"}}>
                <span style={{fontSize:"10px", background:"#122a12", color:"#0f0", padding:"5px 8px", borderRadius:"20px"}}>● LVL {currentLevel}/500</span>
                <button onClick={disconnect} style={{fontSize:"10px", background:"#222", color:"#ff5555", border:"1px solid #333", padding:"5px 8px", borderRadius:"20px"}}>{L.disconnect}</button>
              </div>
            )}
          </div>
        </div>

        {tab==="mining" && (
          <>
            <div style={{margin:"12px", background:"#1a1a1a", borderRadius:"16px", padding:"14px", border:"1px solid #222"}}>
              <p style={{fontSize:"10px", color:"#888"}}>{L.bal}</p>
              <h1 style={{fontSize:"28px", fontWeight:"800"}}>{balance.toFixed(4)} <span style={{fontSize:"12px", color:"#facc15"}}>ANKH</span></h1>
              <div style={{background:"#222", borderRadius:"10px", padding:"10px", marginTop:"10px", display:"flex", justifyContent:"space-between"}}>
                <div><p style={{fontSize:"11px"}}>{L.active}</p><p style={{fontSize:"10px", color:"#0f0"}}>{L.working} - {rate}/{L.hour}</p></div>
                <div style={{textAlign:"right"}}><p style={{color:"#facc15", fontWeight:"bold"}}>+{rate}/h</p><p style={{fontSize:"10px"}}>x{currentLevelObj.boost}</p></div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px", marginTop:"10px"}}>
                <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.perH}</p><b>{rate}</b></div>
                <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.daily}</p><b>{currentLevelObj.daily}</b></div>
                <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.rate}</p><b style={{color:"#0f0"}}>x{currentLevelObj.boost}</b></div>
              </div>
              <button onClick={()=>setShow500(true)} style={{width:"100%", marginTop:"10px", background:"#facc15", color:"black", border:"none", padding:"10px", borderRadius:"10px", fontWeight:"bold", fontSize:"12px"}}>🏆 {L.system500} - {L.allLevels}</button>
            </div>

            {show500 && (
              <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", background:"rgba(0,0,0,0.85)", zIndex:50, display:"flex", justifyContent:"center", alignItems:"center", padding:"10px"}}>
                <div style={{width:"100%", maxWidth:"380px", background:"#141414", borderRadius:"16px", border:"1px solid #333", maxHeight:"85vh", overflow:"hidden", display:"flex", flexDirection:"column"}}>
                  <div style={{padding:"14px", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #222"}}>
                    <h3 style={{color:"#facc15", fontSize:"14px"}}>🏆 {L.system500}</h3>
                    <button onClick={()=>setShow500(false)} style={{background:"#222", color:"white", border:"none", width:"28px", height:"28px", borderRadius:"50%"}}>X</button>
                  </div>
                  <div style={{padding:"10px", display:"flex", gap:"6px"}}>
                    <button style={{flex:1, background:"#222", color:"#888", border:"none", padding:"8px", borderRadius:"20px", fontSize:"11px"}}>🏆 {L.cycles}</button>
                    <button style={{flex:1, background:"#facc15", color:"black", border:"none", padding:"8px", borderRadius:"20px", fontWeight:"bold", fontSize:"11px"}}>📚 {L.allLevels}</button>
                  </div>
                  <div style={{margin:"0 10px", background:"#1e1e1e", borderRadius:"10px", padding:"10px", border:"1px solid #333"}}>
                    <div style={{display:"flex", justifyContent:"space-between", fontSize:"11px"}}><span>📊 {L.calcLevel}:</span><span style={{background:"#333", padding:"2px 10px", borderRadius:"12px"}}>{L.level} {currentLevel}</span></div>
                    <div style={{marginTop:"8px", fontSize:"10px", color:"#888"}}>
                      <p>{L.need}: {currentLevelObj.need} ANKH</p>
                      <p>{L.onWallet}: {currentLevelObj.daily} / {L.day} • {currentLevelObj.hourly} ANKH/{currentLevelObj.boost}x</p>
                      <p>{L.boost}: x{currentLevelObj.boost}</p>
                    </div>
                  </div>
                  <div style={{padding:"10px", overflowY:"auto", flex:1}}>
                    <div style={{display:"flex", gap:"6px", marginBottom:"8px", fontSize:"10px"}}>
                      <button style={{background:"#facc15", color:"black", border:"none", padding:"4px 10px", borderRadius:"12px", fontWeight:"bold"}}>الكل</button>
                      <button style={{background:"#222", color:"#888", border:"none", padding:"4px 10px", borderRadius:"12px"}}>1-100</button>
                      <button style={{background:"#222", color:"#888", border:"none", padding:"4px 10px", borderRadius:"12px"}}>101-200</button>
                      <button style={{background:"#222", color:"#888", border:"none", padding:"4px 10px", borderRadius:"12px"}}>201-300</button>
                    </div>
                    {allLevels.slice(0,100).map(l=>(
                      <div key={l.id} style={{display:"flex", justifyContent:"space-between", alignItems:"center", background: currentLevel===l.id ? "#2a2210" : "#1a1a1a", border: currentLevel===l.id ? "1px solid #facc15" : "1px solid #222", borderRadius:"10px", padding:"10px", marginBottom:"6px"}}>
                        <div><p style={{fontSize:"12px", fontWeight:"bold"}}>{L.level} {l.id}</p><p style={{fontSize:"10px", color:"#888"}}>{l.need} ANKH • {l.hourly} ANKH/{l.boost}x • {L.hour}</p></div>
                        <div style={{textAlign:"right"}}><p style={{fontSize:"12px", color:"#facc15", fontWeight:"bold"}}>{l.need} ANKH</p><p style={{fontSize:"10px", color:"#0f0"}}>+{l.daily} / {L.day}</p></div>
                      </div>
                    ))}
                    <div style={{background:"#1a1a1a", borderRadius:"10px", padding:"12px", marginTop:"10px", fontSize:"11px", display:"flex", justifyContent:"space-between"}}>
                      <span>{L.current}:</span><span>{currentLevel} / 500</span><span>{rate}/{L.hour}</span><span style={{color:"#0f0"}}>x{currentLevelObj.boost}</span>
                    </div>
                  </div>
                  <div style={{padding:"12px"}}><button onClick={()=>setShow500(false)} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"12px", borderRadius:"20px", fontWeight:"bold"}}>{L.understood}</button></div>
                </div>
              </div>
            )}
          </>
        )}

        {tab==="wallet" && (
          <div style={{padding:"12px"}}>
            <h3>{L.wallet}</h3>
            <div style={{background:"#1a1a1a", padding:"14px", borderRadius:"12px", marginTop:"10px"}}>
              <p style={{fontSize:"11px", color:"#888"}}>{L.bal}</p><h2>{balance.toFixed(4)} ANKH</h2>
              <p style={{fontSize:"10px", color:"#888", marginTop:"8px"}}>{L.need}: {walletBalance} ANKH = LVL {currentLevel} = {rate}/h</p>
              <p style={{fontSize:"10px", color:"#888"}}>{L.fee}</p>
              <div style={{display:"flex", gap:"6px", marginTop:"10px"}}>
                <button onClick={()=>{ if(Date.now()-lastW<86400000){alert(L.wait); return;} setBalance(0); setLastW(Date.now()); }} style={{flex:1, background:"#facc15", color:"black", border:"none", padding:"12px", borderRadius:"10px", fontWeight:"bold"}}>{L.withdraw}</button>
                {connected && <button onClick={disconnect} style={{flex:1, background:"#222", color:"#ff6666", border:"1px solid #333", padding:"12px", borderRadius:"10px"}}>{L.disconnect}</button>}
              </div>
            </div>
          </div>
        )}

        {tab==="staking" && <div style={{padding:"12px"}}><h3>{L.staking}</h3><p style={{fontSize:"11px", color:"#888"}}>Staking 30/90/120 {L.days} - قريبا</p></div>}
        {tab==="tasks" && <div style={{padding:"12px"}}><h3>{L.dailyTitle}</h3></div>}
        {tab==="friends" && <div style={{padding:"12px"}}><h3>Referral - 5%</h3></div>}

        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#111", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
          <button onClick={()=>setTab("mining")} style={{background:"none", border:"none", color:tab==="mining"?"#facc15":"#666", fontSize:"11px", display:"flex", flexDirection:"column", alignItems:"center"}}><span>⛏️</span>{L.mining}</button>
          <button onClick={()=>setTab("staking")} style={{background:"none", border:"none", color:tab==="staking"?"#facc15":"#666", fontSize:"11px", display:"flex", flexDirection:"column", alignItems:"center"}}><span>🔒</span>{L.staking}</button>
          <button onClick={()=>setTab("tasks")} style={{background:"none", border:"none", color:tab==="tasks"?"#facc15":"#666", fontSize:"11px", display:"flex", flexDirection:"column", alignItems:"center"}}><span>📋</span>{L.tasks}</button>
          <button onClick={()=>setTab("friends")} style={{background:"none", border:"none", color:tab==="friends"?"#facc15":"#666", fontSize:"11px", display:"flex", flexDirection:"column", alignItems:"center"}}><span>👥</span>{L.friends}</button>
          <button onClick={()=>setTab("wallet")} style={{background:"none", border:"none", color:tab==="wallet"?"#facc15":"#666", fontSize:"11px", display:"flex", flexDirection:"column", alignItems:"center"}}><span>💼</span>{L.wallet}</button>
        </div>

      </div>
    </div>
  );
}
