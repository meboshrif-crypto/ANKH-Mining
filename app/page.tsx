"use client";
import { useState, useEffect } from "react";

const T = {
  ar: {
    mining:"التعدين", store:"المتجر", list:"القائمة", friends:"الأصدقاء", wallet:"المحفظة",
    total:"إجمالي الرصيد المعدن", inside:"داخل اللعبة • لا يؤثر على المستوى",
    activeMining:"التعدين النشط", working:"يعمل الآن", perHour:"في الساعة", daily:"يوميا", boost:"تعزيز", mult:"المضاعف",
    level5:"المستوى 5 برونزي", yourLoot:"LOOT الخاصة بك: ٢٠٥٢ TON في محفظة", speed:"يحدد مستواك وسرعة أرباحك",
    rules:"قواعد مستويات التعدين", how:"كيف ترتفع المستويات والسرعة؟", note:"تنبيه",
    walletTitle:"محفظة TON", connectDesc:"الربط بالبلوكشين والسحوبات", minedBal:"الرصيد المعدن", totalWithdraw:"إجمالي المسحوبات",
    balInWallet:"الرصيد في المحفظة", levelUp:"يرفع المستوى", linked:"المحفظة مربوطة", change:"تغيير", disconnect:"فصل المحفظة",
    verifyTitle:"(0.05 TON) التحقق لمرة واحدة من ربط المحفظة", antiBot:"مكافحة البوتات",
    reason:"سبب الحاجة: حماية مجمع التعدين من مزارع البوتات. تؤكد المعاملة الدقيقة بقيمة 0.05 TON أن المحفظة تعود لشخص حقيقي.",
    once:"تدفع لمرة واحدة فقط: حصريا عند ربط عنوان محفظة جديد لأول مرة.", freeRe:"إذا قمت بإلغاء ربط محفظتك المؤقتة وربطها (0 TON): إعادة الربط مجانا - مجردا أبدأ TON لاحقا، لن تدفع 0.05 مجددا!",
    withdrawRules:"شروط وقواعد سحب LOOT:", onePer24:"التكرار: سحب واحد كل 24 ساعة (وقت المعالجة: 1-24 ساعة)", min:"الحد الأدنى: 10,000 LOOT", fee:"رسوم الخدمة: 5% (تُخصم تلقائيا من مبلغ السحب)", reserve:"الاحتفاظ الإلزامي 25%: يجب أن تحتفظ المحفظة بما لا يقل عن 25% لسحب 10,000 LOOT بحد أدنى (2,500 من مبلغ السحب LOOT).", premium:"قاعدة الحماية (عمر المحفظة +30 يوما أو صفقة واحدة على STON.fi أو Telegram Premium).",
    reserve25:"%الاحتفاظ الإلزامي على السلسلة 25", ok:"كاف ✓", reserveRule:"قاعدة نسبة الاحتفاظ: حماية الرمز من البيع المكثف", yourReserve:"رصيدك المحتفظ", minForWithdraw:"الحد الأدنى للسحب", withdrawLimit:"حد السحب", canWithdraw:"يمكنك سحب حتى 1007 LOOT (2051.83 LOOT) مع رصيدك الحالي - إبقي الرموز في محفظتك وتواصل تعزيز سرعة التعدين.",
    walletOk:"المحفظة مؤكدة ومؤهلة للسحب", age:"عمر المحفظة: 5 (50+ tx)", ston:"صفقات STON.fi: 61 صفقة ✓", verified:"تمت الموافقة على السحب: تم التحقق من", stonAct:"النشاط على STON.fi DEX (61 صفقة) - القيد نهائيا", allDone:"تم التحقق لمرة واحدة: ستتم معالجة جميع طلبات السحب المستقبلية دون فحص إضافي.", openWithdraw:"تم فتح السحب نهائيا وبا رجعة", saveDex:"رفع قيد الـ 30 يوما للأبد - لست TON سجل العقد الذكي صفقاتك على بحاجة للشراء أو الانتظار مجددا!", tokenStatus:"حالة التوكنات الخاصة بك:", safe:"التوكنات المشتراة تظل بأمان في محفظتك الشخصية وتزيد من سرعة التعدين.", future:"جميع عمليات السحب المستقبلية ستتم الموافقة عليها فورا بدون إعادة فحص.",
    buyMore:"لتعزيز سرعة التعدين شراء المزيد من LOOT", amountToWithdraw:"المبلغ المراد سحبه", withdrawBtn:"سحب الأموال", directLog:"سجل المدفوعات المباشر", tonViewer:"التحقق من المدفوعات الحقيقية في Tonviewer", txLog:"سجل المعاملات", referral:"برنامج الإحالة", referralDesc:"ادع أصدقاءك واحصل على 5% من أرباح تعدينهم مدى الحياة", reward:"مكافأة 5% دائمة تحصل على 5% من كل ما يكون يقوم أصدقاؤك LOOT يتعينه مباشرة في رصيدك.", copyLink:"نسخ الرابط", shareTG:"مشاركة على تليجرام", yourCode:"رمز الإحالة الخاص بك", ofTotal:"من الجمع 5%", invited:"الأصدقاء المدعوون", pending:"الأرباح المعلقة", miningNow:"يعدنون الآن", invitedList:"قائمة الأصدقاء المدعوين", all:"الكل", staking:"تخزين LOOT (Staking)", stakingDesc:"قم بقفل التوكنات لتحقيق عوائد سنوية مرتفعة", available:"الرصيد المتاح", allBtn:"الكل", bronze5:"المستوى 5 برونزي", maxAcc:"الحد الأقصى حسب دورك", staked:"LOOT المخزن", available2:"المتاح LOOT", chooseDur:"اختر المدة", day30:"30 يوما", day90:"90 يوما", day120:"120 يوما", usual:"عائد", amountToLock:"المبلغ المراد قفله", min100:"الحد الأدنى: 100 LOOT",
  }
};

export default function Page() {
  const lang = "ar";
  const L:any = T.ar;
  const [balance, setBalance] = useState(7309.7884);
  const [mined, setMined] = useState(24.7361);
  const [tab, setTab] = useState("wallet");
  const [withdrawAmount, setWithdrawAmount] = useState(10000);
  const [stakeAmount, setStakeAmount] = useState(1000);
  const [connected] = useState(true);

  useEffect(()=>{
    const i=setInterval(()=>{ setBalance(b=>b+0.0007); setMined(m=>m+0.0001); },100);
    return ()=>clearInterval(i);
  },[]);

  return (
    <div style={{minHeight:"100vh", background:"#0f1410", color:"white", display:"flex", justifyContent:"center", fontFamily:"Tajawal, sans-serif"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#121612", minHeight:"100vh", paddingBottom:"80px", direction:"rtl", position:"relative"}}>
        
        {/* Header like screenshot */}
        <div style={{padding:"12px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#1a1f1a", borderBottom:"1px solid #222"}}>
          <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <div style={{width:"36px", height:"36px", background:"#2a2a1a", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>✕</div>
            <div style={{textAlign:"center", flex:1}}><b>LootVault</b><p style={{fontSize:"10px", color:"#888"}}>mini app</p></div>
          </div>
          <div style={{display:"flex", gap:"6px"}}>
            <span style={{background:"#222", padding:"4px 8px", borderRadius:"8px", fontSize:"11px"}}>📖</span>
            <span style={{background:"#222", padding:"4px 8px", borderRadius:"8px", fontSize:"11px"}}>🇦🇪 AR</span>
            <span style={{background:"#222", padding:"4px 8px", borderRadius:"50%"}}>•••</span>
          </div>
        </div>

        <div style={{padding:"12px", display:"flex", gap:"8px", alignItems:"center", background:"#1a1f1a", margin:"8px", borderRadius:"12px", border:"1px solid #facc15"}}>
          <div style={{width:"40px", height:"40px", background:"#222", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #facc15"}}>⬡</div>
          <div><b>LootVault</b><p style={{fontSize:"11px", color:"#888"}}>شبكة TON</p></div>
          <div style={{marginRight:"auto", display:"flex", gap:"6px"}}>
            <span style={{background:"#222", padding:"4px 8px", borderRadius:"6px"}}>📖</span>
            <span style={{background:"#1a2a1a", color:"#facc15", padding:"4px 8px", borderRadius:"6px", fontSize:"11px"}}>🇦🇪 AR</span>
          </div>
        </div>

        {tab==="mining" && (
          <>
            <div style={{margin:"8px", background:"#1e241e", borderRadius:"16px", padding:"14px", border:"1px solid #222"}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><p style={{fontSize:"10px", color:"#888"}}>{L.total}</p><span style={{fontSize:"9px", background:"#2a2a2a", padding:"3px 8px", borderRadius:"12px"}}>{L.inside}</span></div>
              <h1 style={{fontSize:"28px", fontWeight:"800", marginTop:"6px"}}>{balance.toFixed(4)} <span style={{fontSize:"14px", color:"#facc15"}}>ANKH</span></h1>
              <div style={{background:"#252d25", borderRadius:"12px", padding:"12px", marginTop:"12px"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{display:"flex", alignItems:"center", gap:"8px"}}><div style={{background:"#2a3a1a", padding:"8px", borderRadius:"10px"}}>⛏️</div><div><p style={{fontSize:"12px", fontWeight:"bold"}}>{L.activeMining}</p><p style={{fontSize:"10px", color:"#0f0"}}>● {L.working}</p></div></div>
                  <span style={{background:"#2a2a2a", padding:"4px 10px", borderRadius:"12px", fontSize:"11px"}}>ⓘ الدوريات</span>
                </div>
                <h2 style={{color:"#0f8", fontSize:"26px", marginTop:"10px"}}>+{mined.toFixed(4)} <span style={{fontSize:"12px"}}>ANKH</span></h2>
                <div style={{display:"flex", justifyContent:"space-between", marginTop:"8px", fontSize:"10px", color:"#888"}}><span>في المحفظة ANKH إلى المستوى 6: 1497+</span><span style={{color:"#facc15"}}>4%</span></div>
                <div style={{height:"4px", background:"#333", borderRadius:"4px", marginTop:"6px"}}><div style={{width:"4%", height:"100%", background:"#facc15", borderRadius:"4px"}}></div></div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px", marginTop:"10px"}}>
                <div style={{background:"#1a1f1a", padding:"10px", borderRadius:"10px", textAlign:"center", border:"1px solid #222"}}><p style={{fontSize:"10px", color:"#888"}}>⚡ {L.perHour}</p><b>44.9</b><p style={{fontSize:"10px", color:"#666"}}>ANKH</p></div>
                <div style={{background:"#1a1f1a", padding:"10px", borderRadius:"10px", textAlign:"center", border:"1px solid #222"}}><p style={{fontSize:"10px", color:"#888"}}>📅 {L.daily}</p><b>~1,077</b><p style={{fontSize:"10px", color:"#666"}}>ANKH</p></div>
                <div style={{background:"#1a1f1a", padding:"10px", borderRadius:"10px", textAlign:"center", border:"1px solid #222"}}><p style={{fontSize:"10px", color:"#888"}}>📈 {L.boost}</p><b style={{color:"#facc15"}}>×2.99</b><p style={{fontSize:"10px", color:"#666"}}>المضاعف</p></div>
              </div>
              <div style={{marginTop:"10px", background:"#1a1f1a", borderRadius:"10px", padding:"10px", display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid #333"}}>
                <div style={{display:"flex", alignItems:"center", gap:"8px"}}><span style={{background:"#3a2a10", color:"#facc15", padding:"6px 10px", borderRadius:"8px", fontWeight:"bold", fontSize:"11px"}}>LVL 5</span><div><p style={{fontSize:"11px", fontWeight:"bold"}}>{L.level5}</p><p style={{fontSize:"10px", color:"#888"}}>{L.yourLoot} - {L.speed}</p></div></div><span style={{fontSize:"18px"}}>›</span>
              </div>
              <div style={{marginTop:"10px", background:"#1e2a1e", borderRadius:"10px", padding:"10px", display:"flex", justifyContent:"space-between", border:"1px solid #2a3a2a"}}>
                <div style={{display:"flex", gap:"8px"}}><span>🛡️</span><div><p style={{fontSize:"11px", fontWeight:"bold"}}>{L.rules}</p><p style={{fontSize:"10px", color:"#888"}}>{L.how}</p></div></div><span style={{background:"#2a2a1a", padding:"4px 10px", borderRadius:"12px", fontSize:"10px"}}>{L.note}</span>
              </div>
            </div>
          </>
        )}

        {tab==="wallet" && (
          <div style={{padding:"8px"}}>
            <div style={{background:"#1e241e", borderRadius:"16px", padding:"12px", border:"1px solid #333"}}>
              <div style={{display:"flex", gap:"10px"}}><span style={{background:"#2a2a1a", padding:"8px", borderRadius:"10px"}}>💼</span><div><b>{L.walletTitle}</b><p style={{fontSize:"11px", color:"#888"}}>{L.connectDesc}</p></div></div>
              <div style={{marginTop:"12px", background:"#252d25", borderRadius:"12px", padding:"10px"}}>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:"10px", color:"#888"}}><span>{L.minedBal}</span><span style={{background:"#333", padding:"2px 8px", borderRadius:"10px"}}>{L.inside}</span></div>
                <h2 style={{marginTop:"6px"}}>{balance.toFixed(2)} <span style={{color:"#facc15", fontSize:"12px"}}>ANKH</span></h2>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginTop:"10px"}}>
                  <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px"}}><p style={{fontSize:"10px", color:"#888"}}>إجمالي المسحوبات</p><b style={{fontSize:"13px"}}>9,670.05 ANKH</b></div>
                  <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px"}}><p style={{fontSize:"10px", color:"#888"}}>{L.balInWallet} <span style={{background:"#1a3a1a", color:"#0f0", padding:"2px 6px", borderRadius:"6px", fontSize:"9px"}}>يرفع المستوى</span></p><b style={{fontSize:"13px", color:"#0f8"}}>2,051.83 ANKH</b></div>
                </div>
                <div style={{marginTop:"10px", background:"#1a1f1a", borderRadius:"10px", padding:"10px"}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><span style={{fontSize:"12px"}}>● المحفظة مربوطة</span><div style={{display:"flex", gap:"6px"}}><span style={{background:"#2a1a1a", color:"#ff6666", padding:"4px 8px", borderRadius:"12px", fontSize:"10px"}}>فصل المحفظة</span><span style={{background:"#2a2a1a", color:"#facc15", padding:"4px 8px", borderRadius:"12px", fontSize:"10px"}}>تغيير</span></div></div>
                  <p style={{fontSize:"11px", color:"#facc15", marginTop:"8px", wordBreak:"break-all"}}>UQAmvSP3x5JMZiw9-p4fTn1cPH_0XkfY9YgMa58enhLtpM3e</p>
                </div>
              </div>

              <div style={{marginTop:"10px", background:"#1a241a", borderRadius:"12px", padding:"12px", border:"1px solid #1a3a2a"}}>
                <div style={{display:"flex", gap:"8px"}}><span style={{background:"#0f2a2a", padding:"6px", borderRadius:"8px"}}>🛡️</span><div><p style={{fontSize:"11px", fontWeight:"bold", color:"#5af"}}>🛡️ {L.verifyTitle}</p><span style={{background:"#1a2a3a", color:"#5af", padding:"2px 8px", borderRadius:"10px", fontSize:"9px"}}>{L.antiBot}</span></div></div>
                <ul style={{fontSize:"10px", color:"#aaa", marginTop:"8px", paddingRight:"14px", lineHeight:"1.6"}}>
                  <li>{L.reason}</li>
                  <li>{L.once}</li>
                  <li style={{color:"#0f8"}}>{L.freeRe}</li>
                </ul>
              </div>

              <div style={{marginTop:"10px", background:"#252d25", borderRadius:"12px", padding:"10px"}}>
                <p style={{fontSize:"11px", fontWeight:"bold"}}>① {L.withdrawRules}</p>
                <div style={{fontSize:"10px", color:"#aaa", marginTop:"6px", lineHeight:"1.6"}}>
                  <p>⏱ {L.onePer24}</p>
                  <p style={{color:"#facc15"}}>min {L.min}</p>
                  <p style={{color:"#0f8"}}>% {L.fee}</p>
                  <p style={{color:"#f88"}}>25% {L.reserve}</p>
                  <p>🛡️ {L.premium}</p>
                </div>
              </div>

              <div style={{marginTop:"10px", background:"#1e2a1e", borderRadius:"12px", padding:"10px", border:"1px solid #2a3a2a"}}>
                <div style={{display:"flex", justifyContent:"space-between"}}><p style={{fontSize:"11px"}}>25 {L.reserve25}</p><span style={{background:"#1a3a1a", color:"#0f0", padding:"2px 10px", borderRadius:"12px", fontSize:"10px"}}>{L.ok}</span></div>
                <p style={{fontSize:"9px", color:"#888"}}>{L.reserveRule}</p>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px", marginTop:"8px"}}>
                  <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.yourReserve}</p><b style={{fontSize:"11px"}}>2,051.83 ANKH</b></div>
                  <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.minForWithdraw}</p><b style={{fontSize:"11px", color:"#facc15"}}>2 500 ANKH</b></div>
                  <div style={{background:"#1a1f1a", padding:"8px", borderRadius:"8px", textAlign:"center"}}><p style={{fontSize:"9px", color:"#888"}}>{L.withdrawLimit}</p><b style={{fontSize:"11px", color:"#0f8"}}>1,007 ANKH</b></div>
                </div>
                <div style={{background:"#1a2a1a", padding:"8px", borderRadius:"8px", marginTop:"8px", fontSize:"10px", color:"#0f8"}}>✓ {L.canWithdraw}</div>
              </div>

              <div style={{marginTop:"10px", background:"#1e2a1e", borderRadius:"12px", padding:"12px", border:"1px solid #0f0"}}>
                <div style={{display:"flex", justifyContent:"space-between"}}><p style={{fontSize:"11px", fontWeight:"bold"}}>✓ {L.walletOk}</p><span style={{background:"#222", padding:"4px 8px", borderRadius:"12px", fontSize:"10px"}}>🔄 تحقق</span></div>
                <div style={{display:"flex", gap:"6px", marginTop:"8px"}}>
                  <span style={{background:"#1a1f1a", padding:"4px 10px", borderRadius:"12px", fontSize:"10px"}}>{L.age}</span>
                  <span style={{background:"#1a1f1a", padding:"4px 10px", borderRadius:"12px", fontSize:"10px"}}>🔥 STON.fi: 61 صفقة</span>
                </div>
                <div style={{fontSize:"10px", color:"#aaa", marginTop:"8px", lineHeight:"1.6"}}>
                  <p>✓ {L.verified} {L.stonAct}</p>
                  <p>✓ {L.allDone}</p>
                </div>
              </div>

              <div style={{marginTop:"10px", background:"#1a2a1a", borderRadius:"12px", padding:"10px", border:"1px solid #facc15"}}>
                <p style={{fontSize:"11px"}}>🎉 {L.openWithdraw}</p>
                <p style={{fontSize:"10px", color:"#aaa", marginTop:"4px"}}>{L.saveDex}</p>
                <div style={{background:"#1a1f1a", borderRadius:"8px", padding:"8px", marginTop:"8px", fontSize:"10px"}}>
                  <p>💡 {L.tokenStatus}</p>
                  <p style={{marginTop:"4px"}}>• {L.safe}</p>
                  <p>• {L.future}</p>
                </div>
                <button style={{marginTop:"8px", background:"#2a2a1a", border:"1px solid #333", color:"#facc15", padding:"8px", borderRadius:"8px", width:"100%", fontSize:"11px"}}>{L.buyMore}</button>
              </div>

              <div style={{marginTop:"10px"}}>
                <p style={{fontSize:"11px", color:"#888"}}>{L.amountToWithdraw} - حد أدنى 10,000 LOOT</p>
                <div style={{background:"#1a1f1a", borderRadius:"10px", padding:"12px", marginTop:"6px", display:"flex", justifyContent:"space-between", border:"1px solid #333"}}>
                  <input value={withdrawAmount} onChange={e=>setWithdrawAmount(Number(e.target.value))} style={{background:"transparent", border:"none", color:"white", fontSize:"18px", width:"100px"}}/>
                  <span style={{color:"#facc15", fontWeight:"bold"}}>ANKH</span>
                </div>
                <div style={{display:"flex", gap:"6px", marginTop:"6px"}}>
                  {["10k","25k","50k","100k","الكل"].map(k=><span key={k} style={{background:"#1a1f1a", padding:"6px 12px", borderRadius:"20px", fontSize:"10px", border:"1px solid #222"}}>{k}</span>)}
                </div>
                <button style={{width:"100%", background:"#333", color:"#888", border:"none", padding:"14px", borderRadius:"12px", marginTop:"10px", fontWeight:"bold"}}>📤 {L.withdrawBtn}</button>
              </div>

              <div style={{marginTop:"10px", background:"#1a1f1a", borderRadius:"10px", padding:"10px", display:"flex", justifyContent:"space-between", border:"1px solid #222"}}>
                <div style={{display:"flex", gap:"8px"}}><span style={{background:"#1a2a1a", padding:"6px", borderRadius:"8px"}}>🛡️</span><div><p style={{fontSize:"11px"}}>{L.directLog} <span style={{background:"#1a3a1a", color:"#0f0", padding:"2px 6px", borderRadius:"8px", fontSize:"9px"}}>200+ TON</span></p><p style={{fontSize:"9px", color:"#888"}}>{L.tonViewer}</p></div></div><span>↗️</span>
              </div>

              <div style={{marginTop:"10px", display:"flex", justifyContent:"space-between", fontSize:"11px"}}>
                <span>🕒 {L.txLog}</span><span style={{background:"#222", padding:"2px 8px", borderRadius:"10px"}}>(1)</span>
              </div>
            </div>
          </div>
        )}

        {tab==="friends" && (
          <div style={{padding:"8px"}}>
            <div style={{background:"#1e241e", borderRadius:"16px", padding:"12px", border:"1px solid #333"}}>
              <div style={{display:"flex", gap:"8px"}}><span style={{background:"#2a2a1a", padding:"8px", borderRadius:"10px"}}>👥</span><div><b>{L.referral}</b><p style={{fontSize:"10px", color:"#888"}}>{L.referralDesc}</p></div></div>
              <div style={{background:"#252d25", borderRadius:"10px", padding:"10px", marginTop:"10px", display:"flex", gap:"8px", fontSize:"10px"}}><span>ⓘ</span><span>{L.reward}</span></div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginTop:"10px"}}>
                <button style={{background:"#1a1f1a", border:"1px solid #333", color:"white", padding:"10px", borderRadius:"20px", fontSize:"11px"}}>📋 {L.copyLink}</button>
                <button style={{background:"#facc15", color:"black", border:"none", padding:"10px", borderRadius:"20px", fontWeight:"bold", fontSize:"11px"}}>✈️ {L.shareTG}</button>
              </div>
              <div style={{marginTop:"10px", background:"#1a1f1a", borderRadius:"10px", padding:"10px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div><p style={{fontSize:"10px", color:"#888"}}>{L.yourCode}</p><b style={{fontSize:"18px"}}>7956189802</b></div><span style={{background:"#2a2a1a", color:"#facc15", padding:"6px 10px", borderRadius:"12px", fontSize:"10px", border:"1px solid #facc15"}}>{L.ofTotal}</span>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginTop:"10px"}}>
                <div style={{background:"#1a1f1a", padding:"12px", borderRadius:"12px", textAlign:"center", border:"1px solid #222"}}><p style={{fontSize:"10px", color:"#888"}}>👥 {L.invited}</p><b style={{fontSize:"20px"}}>0</b><p style={{fontSize:"10px", color:"#0f0"}}>● 0 {L.miningNow}</p></div>
                <div style={{background:"#1a1f1a", padding:"12px", borderRadius:"12px", textAlign:"center", border:"1px solid #222"}}><p style={{fontSize:"10px", color:"#888"}}>💰 {L.pending}</p><b style={{fontSize:"20px", color:"#facc15"}}>+0.00</b><p style={{fontSize:"10px", color:"#888"}}>إجمالي الأرباح</p></div>
              </div>
              <div style={{marginTop:"10px", display:"flex", justifyContent:"space-between", fontSize:"11px"}}><span>👥 {L.invitedList} (0)</span><span>الكل ›</span></div>
              <div style={{marginTop:"20px", display:"flex", justifyContent:"center"}}><div style={{width:"50px", height:"50px", background:"#222", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>👤+</div></div>
            </div>
          </div>
        )}

        {tab==="list" && (
          <div style={{padding:"8px"}}>
            <div style={{background:"#1e241e", borderRadius:"16px", padding:"12px", border:"1px solid #333"}}>
              <div style={{display:"flex", gap:"8px"}}><span style={{background:"#2a2a1a", padding:"8px", borderRadius:"10px"}}>📚</span><div><b>{L.staking}</b><p style={{fontSize:"10px", color:"#888"}}>{L.stakingDesc}</p></div></div>
              <div style={{marginTop:"12px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div><p style={{fontSize:"10px", color:"#888"}}>{L.available}</p><h2>7,309 <span style={{color:"#facc15", fontSize:"12px"}}>ANKH</span></h2></div>
                <span style={{background:"#1a1f1a", padding:"6px 16px", borderRadius:"20px", border:"1px solid #facc15", color:"#facc15", fontSize:"11px"}}>{L.allBtn}</span>
              </div>
              <div style={{marginTop:"10px", background:"#252d25", borderRadius:"10px", padding:"10px", display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid #2a3a1a"}}>
                <div style={{display:"flex", gap:"8px"}}><span style={{background:"#1a2a1a", padding:"6px", borderRadius:"8px"}}>🛡️</span><div><p style={{fontSize:"11px"}}><span style={{background:"#3a2a10", padding:"2px 6px", borderRadius:"6px", fontSize:"9px"}}>المستوى 5 برونزي</span></p><p style={{fontSize:"10px", color:"#888"}}>{L.maxAcc}</p></div></div><span style={{background:"#2a2a1a", padding:"4px 10px", borderRadius:"12px", fontSize:"10px"}}>عرض الحدود</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between", marginTop:"8px", fontSize:"10px", color:"#888"}}><span>LOOT {L.staked} 0.000 / 100</span><span>LOOT {L.available2} 49,900</span></div>
              <div style={{marginTop:"14px"}}><p style={{fontSize:"11px"}}>{L.chooseDur}</p>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px", marginTop:"8px"}}>
                  <div style={{background:"#2a2210", border:"1px solid #facc15", padding:"12px", borderRadius:"12px", textAlign:"center"}}><b style={{fontSize:"13px"}}>{L.day30}</b><p style={{color:"#facc15", fontWeight:"bold", marginTop:"4px"}}>+35%</p><p style={{fontSize:"10px", color:"#888"}}>{L.usual}</p></div>
                  <div style={{background:"#1a1f1a", border:"1px solid #222", padding:"12px", borderRadius:"12px", textAlign:"center"}}><b style={{fontSize:"13px"}}>{L.day90}</b><p style={{color:"#facc15", fontWeight:"bold", marginTop:"4px"}}>+110%</p><p style={{fontSize:"10px", color:"#888"}}>{L.usual}</p></div>
                  <div style={{background:"#1a1f1a", border:"1px solid #222", padding:"12px", borderRadius:"12px", textAlign:"center"}}><b style={{fontSize:"13px"}}>{L.day120}</b><p style={{color:"#facc15", fontWeight:"bold", marginTop:"4px"}}>+150%</p><p style={{fontSize:"10px", color:"#888"}}>{L.usual}</p></div>
                </div>
              </div>
              <div style={{marginTop:"14px"}}>
                <div style={{display:"flex", justifyContent:"space-between"}}><p style={{fontSize:"11px"}}>{L.amountToLock}</p><p style={{fontSize:"10px", color:"#888"}}>LOOT {L.min100} 49,900 •</p></div>
                <div style={{background:"#1a1f1a", borderRadius:"10px", padding:"12px", marginTop:"6px", display:"flex", justifyContent:"space-between", border:"1px solid #333"}}>
                  <input value={stakeAmount} onChange={e=>setStakeAmount(Number(e.target.value))} style={{background:"transparent", border:"none", color:"white", fontSize:"18px", width:"100px"}}/>
                  <span style={{color:"#facc15", fontWeight:"bold"}}>ANKH</span>
                </div>
                <div style={{display:"flex", gap:"6px", marginTop:"6px"}}>
                  {["+500","+1k","+5k","+10k"].map(k=><span key={k} style={{background:"#1a1f1a", padding:"6px 14px", borderRadius:"20px", fontSize:"11px", border:"1px solid #222"}}>{k}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#0f1410", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0", zIndex:20}}>
          {[
            {id:"mining", icon:"⛏️", name:L.mining},
            {id:"store", icon:"🛒", name:L.store},
            {id:"list", icon:"⊞", name:L.list},
            {id:"friends", icon:"👥", name:L.friends},
            {id:"wallet", icon:"💼", name:L.wallet},
          ].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id==="store" ? "mining" : t.id)} style={{background:"none", border:"none", color: tab===t.id || (t.id==="store" && tab==="mining") ? "#facc15" : "#666", fontSize:"10px", display:"flex", flexDirection:"column", alignItems:"center", gap:"2px"}}>
              <span style={{fontSize:"18px", background: tab===t.id ? "#2a2210" : "transparent", padding:"4px 12px", borderRadius:"12px"}}>{t.icon}</span>{t.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
