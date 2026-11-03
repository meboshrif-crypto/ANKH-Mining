"use client";
import { useState, useEffect } from "react";

const T:any = {
  ar: {
    mining:"التعدين", store:"المتجر", list:"القائمة", friends:"الأصدقاء", wallet:"المحفظة",
    total:"إجمالي الرصيد المعدن", inside:"داخل اللعبة • لا يؤثر على المستوى",
    active:"التعدين النشط", working:"يعمل الآن", perHour:"في الساعة", daily:"يوميا", boost:"تعزيز",
    lvl:"مستوي", walletTitle:"محفظة TON", inWallet:"ANKH في المحفظة", level0:"مستوى 0 - البداية", startFree:"ابدأ مجانا 0.77/ساعة",
    connectWallet:"ربط المحفظة", chooseWallet:"اختار محفظتك", tonkeeper:"تون كيبر", myton:"ماي تون", connected:"متصل", change:"تغيير", disconnect:"فصل المحفظة",
    verifyTitle:"تأكيد انك مش بوت", verifyDesc:"ادفع 0.05 من عملة الجرام (TON) مرة واحدة للتأكد", payVerify:"دفع 0.05 TON تأكيد", verified:"تم التأكيد ✅",
    withdrawTitle:"سحب ANKH", rule1:"• الرسوم: 5% (تخصم تلقائي)", rule2:"• الحد الأدنى: 10,000 ANKH", minAmount:"الحد الأدنى", yourBalance:"رصيدك", amountToWithdraw:"المبلغ المراد سحبه", minIs:"الحد الأدنى 10,000", enterAmount:"اكتب المبلغ (الحد 10,000)", withdrawBtn:"سحب ANKH", lessThanMin:"اقل من الحد الأدنى (10,000)",
    referralCode:"رمز الإحالة:", referral:"برنامج الإحالة", referralDesc:"ادع اصدقاءك واحصل على 5% مدى الحياة", copyLink:"نسخ الرابط", shareTG:"مشاركة", yourCode:"رمزك", invited:"المدعوون", pending:"المعلقة",
    staking:"تخزين ANKH", stakingDesc:"اقفل التوكنات لعوائد عالية", available:"الرصيد المتاح", allBtn:"الكل", chooseDur:"اختر المدة", day30:"30 يوم", day90:"90 يوم", day120:"120 يوم", usual:"عائد", amountToLock:"المبلغ المراد قفله",
  },
  en: {
    mining:"Mining", store:"Store", list:"List", friends:"Friends", wallet:"Wallet",
    total:"Total Mined", inside:"In-game • Not affect level", active:"Active Mining", working:"Working", perHour:"Per Hour", daily:"Daily", boost:"Boost",
    lvl:"LVL", walletTitle:"TON Wallet", inWallet:"ANKH in wallet", level0:"Level 0 - Start", startFree:"Start Free 0.77/h",
    connectWallet:"Connect Wallet", chooseWallet:"Choose wallet", tonkeeper:"Tonkeeper", myton:"MyTon", connected:"Connected", change:"Change", disconnect:"Disconnect",
    verifyTitle:"Anti-bot Verify", verifyDesc:"Pay 0.05 GRAM (TON) once to verify", payVerify:"Pay 0.05 TON", verified:"Verified ✅",
    withdrawTitle:"Withdraw ANKH", rule1:"• Fee: 5%", rule2:"• Min: 10,000 ANKH", minAmount:"Min Amount", yourBalance:"Your Balance", amountToWithdraw:"Amount to Withdraw", minIs:"Min 10,000", enterAmount:"Enter amount (Min 10,000)", withdrawBtn:"Withdraw ANKH", lessThanMin:"Less than min (10,000)",
    referralCode:"Referral Code:", referral:"Referral Program", referralDesc:"Invite friends earn 5% forever", copyLink:"Copy Link", shareTG:"Share", yourCode:"Your Code", invited:"Invited", pending:"Pending",
    staking:"ANKH Staking", stakingDesc:"Lock tokens for high APY", available:"Available", allBtn:"All", chooseDur:"Choose Duration", day30:"30 Days", day90:"90 Days", day120:"120 Days", usual:"APY", amountToLock:"Amount to lock",
  }
};

export default function Page() {
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [tab, setTab] = useState("wallet");
  const [refCode, setRefCode] = useState("9378606261");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [withdrawInput, setWithdrawInput] = useState("");
  const L = T[lang] || T.en;

  useEffect(()=>{
    let code = localStorage.getItem("ankh_ref");
    if(!code){ code = Math.floor(1000000000 + Math.random()*9000000000).toString(); localStorage.setItem("ankh_ref", code); }
    setRefCode(code);
  },[]);

  const currentLevel = Math.floor(walletBalance/15);
  const rate = 0.77 + currentLevel*0.77;
  useEffect(()=>{ const i=setInterval(()=>setBalance(b=>b+rate/36000),100); return ()=>clearInterval(i); },[rate]);

  const connectTonkeeper = () => {
    setShowWallets(false);
    window.open("https://app.tonkeeper.com/ton-connect","_blank");
    setTimeout(()=>{ setConnected(true); if(walletBalance===0) setWalletBalance(0); },1000);
  };

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", display:"flex", justifyContent:"center"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#0f0f0f", minHeight:"100vh", paddingBottom:"80px", direction: lang==="ar" ? "rtl" : "ltr"}}>
        
        <div style={{padding:"10px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#111", borderBottom:"1px solid #222"}}>
          <b style={{color:"#facc15"}}>ANKH</b>
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:"#222", color:"white", border:"1px solid #333", borderRadius:"6px", padding:"4px", fontSize:"11px"}}>
            <option value="en">🇺🇸 EN</option><option value="ar">🇪🇬 عربي</option>
          </select>
        </div>

        <div style={{margin:"8px", background:"#1a1a1a", borderRadius:"12px", padding:"10px", border:"1px solid #facc15", display:"flex", justifyContent:"space-between"}}>
          <div style={{display:"flex", gap:"8px", alignItems:"center"}}><div style={{width:"32px", height:"32px", background:"#222", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"}}>☥</div><div><b>ANKH</b><p style={{fontSize:"10px", color:"#888"}}>TON Network • LVL {currentLevel}/500</p></div></div>
          <span style={{background:"#222", padding:"4px 8px", borderRadius:"12px", fontSize:"10px", color:"#facc15"}}>LVL {currentLevel}</span>
        </div>

        {tab==="mining" && (
          <div style={{margin:"8px", background:"#1e241e", borderRadius:"16px", padding:"14px", border:"1px solid #222"}}>
            <p style={{fontSize:"10px", color:"#888"}}>{L.total}</p>
            <h1 style={{fontSize:"26px", fontWeight:"800"}}>{balance.toFixed(4)} <span style={{color:"#facc15", fontSize:"14px"}}>ANKH</span></h1>
            <div style={{background:"#252d25", borderRadius:"10px", padding:"10px", marginTop:"10px"}}>
              <p style={{fontSize:"11px"}}>{L.active} - {rate.toFixed(2)}/h - LVL {currentLevel}</p>
              <p style={{fontSize:"10px", color:"#888", marginTop:"4px"}}>{currentLevel===0 ? L.startFree : `${L.inWallet}: ${walletBalance}`}</p>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px", marginTop:"10px"}}>
              <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px"}}>{L.perHour}</p><b>{rate.toFixed(2)}</b></div>
              <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px"}}>{L.daily}</p><b>{Math.floor(rate*24)}</b></div>
              <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px"}}>{L.boost}</p><b>x{(1+currentLevel*0.3).toFixed(2)}</b></div>
            </div>
            <button onClick={()=>setWalletBalance(w=>w+15)} style={{width:"100%", background:"#222", border:"1px solid #333", color:"#facc15", padding:"10px", borderRadius:"10px", marginTop:"10px", fontSize:"12px"}}>TEST: +15 ANKH Level Up (يجرب الليفل)</button>
          </div>
        )}

        {tab==="list" && (
          <div style={{padding:"8px"}}>
            <div style={{background:"#1e241e", borderRadius:"16px", padding:"12px", border:"1px solid #333"}}>
              <b>{L.staking}</b><p style={{fontSize:"10px", color:"#888"}}>{L.stakingDesc}</p>
              <p style={{marginTop:"10px", fontSize:"11px"}}>{L.available}: {balance.toFixed(0)} ANKH <span style={{background:"#1a1f1a", padding:"4px 10px", borderRadius:"12px", border:"1px solid #facc15", color:"#facc15"}}>{L.allBtn}</span></p>
              <p style={{marginTop:"10px", fontSize:"11px"}}>{L.chooseDur}</p>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px", marginTop:"6px"}}>
                <div style={{background:"#2a2210", border:"1px solid #facc15", padding:"10px", borderRadius:"10px", textAlign:"center"}}><b>{L.day30}</b><p style={{color:"#facc15"}}>+35%</p></div>
                <div style={{background:"#1a1f1a", border:"1px solid #222", padding:"10px", borderRadius:"10px", textAlign:"center"}}><b>{L.day90}</b><p style={{color:"#facc15"}}>+110%</p></div>
                <div style={{background:"#1a1f1a", border:"1px solid #222", padding:"10px", borderRadius:"10px", textAlign:"center"}}><b>{L.day120}</b><p style={{color:"#facc15"}}>+150%</p></div>
              </div>
            </div>
          </div>
        )}

        {tab==="friends" && (
          <div style={{padding:"12px", textAlign:"center"}}>
            <h3>{L.referral}</h3><p style={{fontSize:"11px", color:"#888"}}>{L.referralDesc}</p>
            <div style={{background:"#1a1a1a", padding:"12px", borderRadius:"10px", marginTop:"10px"}}><b style={{fontSize:"22px", color:"#facc15"}}>{refCode}</b><p style={{fontSize:"10px", color:"#888"}}>{L.referralCode}</p></div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginTop:"10px"}}>
              <div style={{background:"#1a1f1a", padding:"10px", borderRadius:"10px"}}><p style={{fontSize:"10px"}}>{L.invited}</p><b>0</b></div>
              <div style={{background:"#1a1f1a", padding:"10px", borderRadius:"10px"}}><p style={{fontSize:"10px"}}>{L.pending}</p><b style={{color:"#facc15"}}>0.00</b></div>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{padding:"8px"}}>
            <div style={{background:"#1e241e", borderRadius:"16px", padding:"12px", border:"1px solid #333"}}>
              {!connected ? (
                <>
                  <p style={{fontSize:"11px", color:"#888"}}>{L.total}: {balance.toFixed(2)} ANKH - {L.inWallet}: {walletBalance} ANKH</p>
                  <button onClick={()=>setShowWallets(true)} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"14px", borderRadius:"12px", fontWeight:"bold", marginTop:"10px"}}>🔗 {L.connectWallet}</button>
                </>
              ):(
                <>
                  <div style={{display:"flex", justifyContent:"space-between", background:"#122a12", border:"1px solid #0f0", borderRadius:"10px", padding:"10px"}}>
                    <div><p style={{fontSize:"11px", color:"#0f0"}}>● {L.connected}</p><p style={{fontSize:"10px"}}>UQAmvS...tpM3e</p></div>
                    <div style={{display:"flex", gap:"4px"}}><button onClick={()=>setShowWallets(true)} style={{background:"#222", color:"#facc15", border:"1px solid #333", padding:"4px 8px", borderRadius:"8px", fontSize:"10px"}}>{L.change}</button><button onClick={()=>{setConnected(false); setVerified(false);}} style={{background:"#2a1a1a", color:"#ff6666", border:"1px solid #333", padding:"4px 8px", borderRadius:"8px", fontSize:"10px"}}>{L.disconnect}</button></div>
                  </div>

                  <div style={{marginTop:"10px", background:"#2a2210", border:"1px solid #facc15", borderRadius:"12px", padding:"12px"}}>
                    <p style={{fontSize:"12px", fontWeight:"bold"}}>🛡️ {L.verifyTitle}</p>
                    <p style={{fontSize:"10px", color:"#aaa"}}>{L.verifyDesc}</p>
                    {!verified ? <button onClick={()=>{window.open("https://app.tonkeeper.com/transfer/UQANkhFee?amount=50000000","_blank"); setTimeout(()=>setVerified(true),1000);}} style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"12px", borderRadius:"10px", fontWeight:"bold", marginTop:"8px"}}>💎 {L.payVerify}</button> : <div style={{background:"#1a2a1a", border:"1px solid #0f0", borderRadius:"8px", padding:"8px", marginTop:"8px", textAlign:"center", color:"#0f0"}}>{L.verified}</div>}
                  </div>

                  <div style={{marginTop:"10px", background:"#1a1f1a", borderRadius:"12px", padding:"12px", border:"1px solid #222"}}>
                    <p style={{fontSize:"12px", fontWeight:"bold"}}>📤 {L.withdrawTitle}</p>
                    <div style={{fontSize:"11px", color:"#aaa", marginTop:"6px", background:"#151515", padding:"8px", borderRadius:"8px"}}>
                      <p style={{color:"#facc15"}}>{L.rule1}</p><p style={{color:"#ff6666"}}>{L.rule2}</p>
                    </div>
                    <div style={{marginTop:"10px"}}>
                      <div style={{display:"flex", justifyContent:"space-between", fontSize:"11px", color:"#888"}}><span>{L.yourBalance}: {balance.toFixed(0)} ANKH</span><span style={{color:"#facc15"}}>{L.minAmount}: 10,000 ANKH</span></div>
                      <div style={{marginTop:"6px", background:"#0f0f0f", border:"2px solid #facc15", borderRadius:"10px", padding:"8px 12px", display:"flex", justifyContent:"space-between"}}>
                        <span style={{fontSize:"11px", color:"#888"}}>{L.minIs}</span><b>10,000</b><span style={{fontSize:"11px", color:"#facc15"}}>ANKH</span>
                      </div>
                      <p style={{fontSize:"11px", color:"#888", marginTop:"8px"}}>{L.amountToWithdraw}</p>
                      <div style={{background:"#151515", border:"1px solid #333", borderRadius:"10px", padding:"10px", display:"flex", marginTop:"4px"}}>
                        <input type="number" value={withdrawInput} onChange={e=>setWithdrawInput(e.target.value)} placeholder={L.enterAmount} style={{background:"transparent", border:"none", color:"white", width:"100%", outline:"none"}}/>
                        <span style={{color:"#facc15", fontWeight:"bold", fontSize:"12px"}}>ANKH</span>
                      </div>
                      {withdrawInput && Number(withdrawInput)<10000 && <p style={{fontSize:"10px", color:"#ff6666"}}>⚠️ {L.lessThanMin}</p>}
                      <div style={{display:"flex", gap:"6px", marginTop:"8px"}}>
                        {[10000,25000,50000].map(v=><button key={v} onClick={()=>setWithdrawInput(v.toString())} style={{flex:1, background:"#222", border:"1px solid #333", color:"white", padding:"6px", borderRadius:"20px", fontSize:"11px"}}>{v/1000}k</button>)}
                        <button onClick={()=>setWithdrawInput(Math.floor(balance).toString())} style={{flex:1, background:"#222", border:"1px solid #333", color:"white", padding:"6px", borderRadius:"20px", fontSize:"11px"}}>All</button>
                      </div>
                      <button disabled={!verified || !withdrawInput || Number(withdrawInput)<10000} style={{width:"100%", background: verified && withdrawInput && Number(withdrawInput)>=10000 ? "#facc15" : "#333", color: verified && withdrawInput && Number(withdrawInput)>=10000 ? "black" : "#888", border:"none", padding:"14px", borderRadius:"12px", fontWeight:"bold", marginTop:"10px"}}>📤 {L.withdrawBtn}</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {showWallets && (
          <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", background:"rgba(0,0,0,0.9)", zIndex:100, display:"flex", justifyContent:"center", alignItems:"flex-end"}}>
            <div style={{width:"100%", maxWidth:"400px", background:"#1a1a1a", borderRadius:"20px 20px 0 0", padding:"20px"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"14px"}}><h3>🔗 {L.chooseWallet}</h3><button onClick={()=>setShowWallets(false)} style={{background:"#222", border:"none", color:"white", width:"30px", height:"30px", borderRadius:"50%"}}>✕</button></div>
              <button onClick={connectTonkeeper} style={{width:"100%", background:"#1e1e1e", border:"1px solid #333", borderRadius:"12px", padding:"14px", display:"flex", gap:"12px", marginBottom:"8px"}}><div style={{width:"36px", height:"36px", background:"#2a9eff", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"}}>💎</div><div style={{textAlign:"left"}}><b>Tonkeeper</b><p style={{fontSize:"10px", color:"#888"}}>الأكثر استخداما - هيطلع تأكيد حقيقي لما نركب TON Connect</p></div><span style={{marginLeft:"auto"}}>›</span></button>
              <button onClick={connectTonkeeper} style={{width:"100%", background:"#1e1e1e", border:"1px solid #333", borderRadius:"12px", padding:"14px", display:"flex", gap:"12px"}}><div style={{width:"36px", height:"36px", background:"#ff9500", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"}}>🔶</div><b>MyTon Wallet</b><span style={{marginLeft:"auto"}}>›</span></button>
            </div>
          </div>
        )}

        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#111", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
          <button onClick={()=>setTab("mining")} style={{background:"none", border:"none", color:tab==="mining"?"#facc15":"#666", fontSize:"10px"}}>⛏️<br/>{L.mining}</button>
          <button onClick={()=>setTab("list")} style={{background:"none", border:"none", color:tab==="list"?"#facc15":"#666", fontSize:"10px"}}>📋<br/>{T[lang].list}</button>
          <button onClick={()=>setTab("friends")} style={{background:"none", border:"none", color:tab==="friends"?"#facc15":"#666", fontSize:"10px"}}>👥<br/>{T[lang].friends}</button>
          <button onClick={()=>setTab("wallet")} style={{background:"none", border:"none", color:tab==="wallet"?"#facc15":"#666", fontSize:"10px"}}>💼<br/>{T[lang].wallet}</button>
        </div>

      </div>
    </div>
  );
}
