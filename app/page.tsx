"use client";
import { useState, useEffect } from "react";
export const dynamic = "force-dynamic";

const LEVELS_DATA = [
  { lvl: 1, req: 0, daily: 600, hourly: 25.0 },
  { lvl: 2, req: 116, daily: 690, hourly: 28.8 },
  { lvl: 3, req: 533, daily: 854, hourly: 35.6 },
  { lvl: 4, req: 1300, daily: 1066, hourly: 44.4 },
  { lvl: 5, req: 2447, daily: 1317, hourly: 54.9 },
  { lvl: 6, req: 3999, daily: 1602, hourly: 66.8 },
  { lvl: 7, req: 5972, daily: 1918, hourly: 79.9 },
];

export default function Page() {
  const [balance, setBalance] = useState(3.2620);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(1);
  const [view, setView] = useState<"main" | "tiers" | "levels">("main");
  const [mining, setMining] = useState(false);

  const getReq = (l: number) => LEVELS_DATA.find(x=>x.lvl===l)?.req ?? Math.floor(5972*Math.pow(1.5,l-7));
  const getDaily = (l: number) => LEVELS_DATA.find(x=>x.lvl===l)?.daily ?? Math.floor(1918*Math.pow(1.25,l-7));
  const getHourly = (l: number) => LEVELS_DATA.find(x=>x.lvl===l)?.hourly ?? +(getDaily(l)/24).toFixed(1);

  useEffect(()=>{
    const wb = localStorage.getItem("ankh_wallet"); if(wb) setWalletBalance(Number(wb));
    const lv = localStorage.getItem("ankh_level"); if(lv) setLevel(Number(lv));
  },[]);

  const daily = getDaily(level);
  const hourly = getHourly(level);
  const nextReq = getReq(level+1);
  const progress = Math.min(100, (walletBalance / (nextReq||1))*100);

  const claim = () => {
    if(balance<=0) return;
    const newW = walletBalance + balance;
    setWalletBalance(newW);
    localStorage.setItem("ankh_wallet", String(newW));
    setBalance(0);
    let nl=level; while(newW>=getReq(nl+1) && nl<500) nl++; setLevel(nl); localStorage.setItem("ankh_level", String(nl));
  };

  return (
    <div style={{minHeight:"100vh", background:"#08080C", color:"#fff", paddingBottom:90, direction:"rtl", fontFamily:"sans-serif"}}>
      
      {/* HEADER - زي Rifty */}
      <div style={{padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#0F0F14"}}>
        <div style={{width:38, height:38, borderRadius:20, background:"#1A1A1A", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #333"}}>✕</div>
        <div style={{textAlign:"center"}}><div style={{fontWeight:800, fontSize:16}}>ANKH Mining</div><div style={{fontSize:11, color:"#888"}}>mini app</div></div>
        <div style={{width:38, height:38, borderRadius:20, background:"#1A1A1A", border:"1px solid #333"}}>⋯</div>
      </div>

      {view==="main" && (
        <>
          {/* TOP BAR */}
          <div style={{padding:"10px 12px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{display:"flex", gap:8, alignItems:"center"}}>
              <div style={{background:"#1A1A1A", border:"1px solid #333", borderRadius:20, padding:"6px 12px", fontSize:11, display:"flex", gap:6}}><span>الملف الشخصي</span><span style={{color:"#FACC15"}}>مستوي الصغير {level}</span></div>
              <div style={{background:"#1A1A1A", border:"1px solid #333", borderRadius:20, padding:"6px 10px", fontSize:12}}>🔔</div>
              <div style={{background:"#1A1A1A", border:"1px solid #333", borderRadius:20, padding:"6px 10px", fontSize:11}}>AR ▾ 🇪🇬</div>
            </div>
            <div style={{display:"flex", gap:6, alignItems:"center", fontWeight:900}}><span>ANKH</span><span style={{width:24, height:24, background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", color:"#000"}}>☥</span></div>
          </div>

          <div style={{margin:"0 12px", height:90, borderRadius:16, background:"linear-gradient(90deg, #1A1500, #1A1A2A)", border:"1px solid #2A2A1A", position:"relative", overflow:"hidden", padding:12}}>
            <div style={{position:"absolute", right:0, top:0, width:"60%", height:"100%", background:"radial-gradient(ellipse, rgba(250,204,21,0.15), transparent)", pointerEvents:"none"}}></div>
            <div style={{fontSize:20, fontWeight:900}}>ANKH Mining</div><div style={{fontSize:11, color:"#888"}}>تطبيق Web3 الرسمي</div><div style={{fontSize:10, color:"#666", marginTop:6}}>من اين - قطر - استكشف</div>
          </div>

          {/* الرصيد المعدن */}
          <div style={{margin:"10px 12px 0", background:"#14141A", borderRadius:14, padding:10, border:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{fontSize:11, color:"#888"}}>الرصيد المعدن</div>
            <div style={{display:"flex", gap:8, alignItems:"center"}}><span style={{fontWeight:900, fontSize:18}}>{walletBalance.toFixed(4)} ANKH</span><span style={{fontSize:11, color:"#888"}}>{">"}</span><div style={{width:28, height:28, background:"#1A1A1A", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center"}}>🗄️</div></div>
          </div>

          {/* التعدين النشط - الكارت الكبير */}
          <div style={{margin:"10px 12px 0", background:"linear-gradient(180deg, #1E1A2E 0%, #0F0F1A 100%)", borderRadius:18, padding:12, border:"1px solid #2A2A4A", position:"relative", overflow:"hidden"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{background:"rgba(250,204,21,0.15)", border:"1px solid #FACC15", padding:"4px 10px", borderRadius:12, fontSize:11, color:"#FACC15"}}>⚡ x1.00</div>
              <div style={{textAlign:"left"}}><div style={{fontSize:12, fontWeight:800}}>التعدين النشط</div><div style={{fontSize:10, color:"#22c55e"}}>يعمل الآن ●</div></div>
            </div>
            <div style={{fontSize:32, fontWeight:900, color:"#5EE9FF", marginTop:14, textShadow:"0 0 20px rgba(94,233,255,0.4)"}}>+{balance.toFixed(4)} <span style={{fontSize:14}}>ANKH</span></div>
            <div style={{fontSize:10, color:"#888", textAlign:"left", marginTop:4}}>⏱ جاهز للجمع!</div>
            <button onClick={()=>setMining(true)} style={{marginTop:10, width:"100%", background:"linear-gradient(90deg, #A855F7, #38BDF8)", padding:12, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>استلم ANKH ⚡</button>
          </div>

          {/* 4 كروت الاحصائيات */}
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:6, margin:"10px 12px 0"}}>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>في الساعة ⚡</div><div style={{fontWeight:900, color:"#FACC15", marginTop:4}}>25.0</div><div style={{fontSize:9, color:"#666"}}>ANKH/h</div></div>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>يوميا 📅</div><div style={{fontWeight:900, color:"#22c55e", marginTop:4}}>{daily}~</div><div style={{fontSize:9, color:"#666"}}>ANKH/day</div></div>
            <div style={{background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #222"}}><div style={{fontSize:9, color:"#888"}}>تعزيز 🚀</div><div style={{fontWeight:900, color:"#FACC15", marginTop:4}}>1.00x</div><div style={{fontSize:9, color:"#666"}}>المضاعف</div></div>
            <div style={{background:"#1A1500", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #FACC15"}}><div style={{fontSize:9, color:"#888"}}>الدوري 🛡️</div><div style={{fontWeight:900, color:"#FACC15", marginTop:4}}>برونزي</div><div style={{fontSize:9, color:"#666"}}>Lv.{level}</div></div>
          </div>

          {/* الخط الاخضر - البروجريس */}
          <div onClick={()=>setView("tiers")} style={{margin:"10px 12px 0", background:"#12121A", borderRadius:12, padding:10, border:"1px solid #222", cursor:"pointer"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11}}><span style={{color:"#888"}}>ANKH {walletBalance.toFixed(0)} / {nextReq}</span><span style={{display:"flex", gap:6, alignItems:"center"}}><span>المستوى التالي: {level+1}</span><span style={{width:28, height:28, background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#000", border:"1px solid #FACC15"}}>{level}</span></span></div>
            <div style={{height:4, background:"#222", borderRadius:10, marginTop:8, overflow:"hidden"}}><div style={{width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#FACC15,#22c55e)"}}></div></div>
            <div style={{fontSize:10, color:"#888", marginTop:6}}>احتفظ بـ {nextReq} ANKH في محفظتك للوصول الى المستوي {level+1}</div>
          </div>

          {/* الكروت اللي تحت - مركز المهام etc */}
          <div style={{margin:"10px 12px 0", display:"flex", flexDirection:"column", gap:8}}>
            <div style={{background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div style={{display:"flex", gap:10, alignItems:"center"}}><div style={{width:36, height:36, background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center"}}>★</div><div><div style={{fontWeight:800, fontSize:13}}>مركز المهام</div><div style={{fontSize:10, color:"#888"}}>أكمل المهام وانضم الى المجتمع لكسب ANKH.</div></div></div><span style={{color:"#666"}}>›</span>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
              <div style={{background:"#12121A", borderRadius:14, padding:10, border:"1px solid #222"}}><div style={{fontSize:12, fontWeight:800}}>محطة ANKH</div><div style={{fontSize:9, color:"#888", marginTop:4}}>ابنِ وحرّر قوة التعدين لديك</div><div style={{fontSize:10, color:"#FACC15", marginTop:6}}>افتح المحطة ›</div></div>
              <div style={{background:"#12121A", borderRadius:14, padding:10, border:"1px solid #222"}}><div style={{fontSize:12, fontWeight:800}}>صناديق ANKH</div><div style={{fontSize:9, color:"#888", marginTop:4}}>احصل على وحدات وفك ألغاز وتبرعات فورية</div><div style={{fontSize:10, color:"#FACC15", marginTop:6}}>افتح الصناديق ›</div></div>
            </div>
            <div style={{background:"#12121A", borderRadius:14, padding:10, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
              <div><div style={{fontSize:12, fontWeight:800}}>ادع واكسب</div><div style={{fontSize:9, color:"#888"}}>وسّع مجتمع ANKH واكسب حتى %25 من معين اصدقائك.</div></div>
              <div style={{background:"rgba(250,204,21,0.15)", border:"1px solid #FACC15", padding:"6px 10px", borderRadius:20, fontSize:10, color:"#FACC15", height:"fit-content"}}>ادع الآن 👥</div>
            </div>
          </div>
        </>
      )}

      {view==="tiers" && (
        <>
          <div style={{padding:16, textAlign:"center"}}><div style={{fontSize:22, fontWeight:900}}>الدوريات والمستويات</div><div style={{fontSize:11, color:"#888"}}>احتفظ بـ ANKH , افتح الفصل التالي</div></div>
          <div style={{margin:"0 12px", background:"#12121A", borderRadius:16, padding:14, border:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{width:70, height:70, background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:32, border:"2px solid #FACC15", color:"#000"}}>1</div>
            <div style={{textAlign:"left"}}><div style={{fontSize:11, color:"#888"}}>دوريك</div><div style={{fontWeight:900, color:"#FACC15"}}>البرونزي</div><div style={{fontSize:11, color:"#888", marginTop:8}}>الرصيد في المحفظة</div><div style={{fontWeight:900}}>ANKH {walletBalance.toFixed(0)}</div></div>
          </div>
          <div style={{margin:"10px 12px", background:"#12121A", borderRadius:12, padding:10, border:"1px solid #222", display:"flex", justifyContent:"space-between", fontSize:11}}><span>ANKH {walletBalance.toFixed(0)} / {nextReq}</span><span>المستوى التالي: {level+1}</span></div>
          {/* الخط الازرق */}
          <button onClick={()=>setView("levels")} style={{margin:"0 12px", width:"calc(100% - 24px)", background:"linear-gradient(90deg,#A855F7,#38BDF8)", padding:12, borderRadius:12, border:"none", color:"#fff", fontWeight:900}}>🔍 تصفح المستويات</button>
          <div style={{margin:"16px 12px 0", display:"flex", flexDirection:"column", gap:8}}>
            <div style={{fontWeight:800, textAlign:"right"}}>تقدّم الدوريات</div>
            {[
              {n:"البرونزي", r:"100-1", id:1},
              {n:"الفضي", r:"200-101", id:101},
              {n:"الذهبي", r:"300-201", id:201},
              {n:"البلاتيني", r:"400-301", id:301},
              {n:"أسطوري", r:"500-401", id:401},
            ].map(d=>(
              <div key={d.id} style={{background:"#12121A", borderRadius:14, padding:12, border:"1px solid #222", display:"flex", justifyContent:"space-between"}}>
                <div style={{display:"flex", gap:10}}><div style={{width:40, height:40, background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#000"}}>{d.id}</div><div><div style={{fontWeight:800}}>{d.n}</div><div style={{fontSize:10, color:"#888"}}>المستويات {d.r}</div><div style={{fontSize:10, color:"#38BDF8"}}>عرض المستويات</div></div></div><span>›</span>
              </div>
            ))}
          </div>
        </>
      )}

      {view==="levels" && (
        <>
          <div style={{padding:16, display:"flex", gap:10, alignItems:"center"}}><button onClick={()=>setView("tiers")} style={{background:"#1A1A1A", width:32, height:32, borderRadius:20, border:"1px solid #333"}}>‹</button><div><div style={{fontWeight:900}}>مستويات التعدين</div><div style={{fontSize:11, color:"#888"}}>استكشف 500 مستوى عبر خمس دوريات - ANKH</div></div></div>
          <div style={{display:"flex", gap:8, overflowX:"auto", padding:"0 12px"}}>
            {[
              {n:"البرونزي", r:"100-1"}, {n:"الفضي", r:"200-101"}, {n:"الذهبي", r:"300-201"}, {n:"البلاتيني", r:"400-301"}, {n:"أسطوري", r:"500-401"}
            ].map((d,i)=>(
              <div key={i} style={{minWidth:80, background:"#12121A", borderRadius:12, padding:8, textAlign:"center", border:"1px solid #FACC15"}}><div style={{width:32, height:32, margin:"0 auto", background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:"#000"}}>{d.r.split("-")[0]}</div><div style={{fontSize:10, marginTop:4}}>{d.n}</div><div style={{fontSize:9, color:"#888"}}>{d.r}</div></div>
            ))}
          </div>
          <div style={{margin:12, background:"#12121A", borderRadius:12, overflow:"hidden", border:"1px solid #222"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:10, color:"#888", padding:10, borderBottom:"1px solid #222", background:"#0A0A0A"}}><span>مستوى الصغير</span><span>الرصيد في المحفظة</span><span>ANKH / اليوم</span></div>
            {Array.from({length:7}, (_,i)=>{
              const lvl = LEVELS_DATA[i];
              return (
                <div key={lvl.lvl} style={{display:"flex", justifyContent:"space-between", padding:"12px 10px", borderBottom:"1px solid #222", background: lvl.lvl===level?"rgba(250,204,21,0.1)":"transparent"}}>
                  <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:28, height:28, background:"linear-gradient(180deg,#FACC15,#854D0E)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:"#000"}}>{lvl.lvl}</div></div>
                  <div style={{fontSize:13, textAlign:"center"}}>{lvl.req} <span style={{fontSize:9, color:"#888"}}>ANKH</span></div>
                  <div style={{fontSize:13, color:"#FACC15", textAlign:"center"}}>{lvl.daily}<div style={{fontSize:10, color:"#888"}}>{lvl.hourly}/h</div></div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* 6 خانات تحت */}
      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0F0F14", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
        {[
          {n:"الرئيسية", ic:"🏠", a:true},
          {n:"التعدين", ic:"⛏️", a:view!=="main"},
          {n:"المحطة", ic:"🏛️", a:false},
          {n:"السوق", ic:"⇄", a:false},
          {n:"الأصدقاء", ic:"👥", a:false},
          {n:"المحفظة", ic:"🗄️", a:false},
        ].map(d=>(
          <div key={d.n} style={{display:"flex", flexDirection:"column", alignItems:"center", color: d.a || view!=="main" && d.n==="التعدين" ? "#FACC15" : "#666"}}>
            <span style={{fontSize:18}}>{d.ic}</span><span style={{fontSize:9, marginTop:2}}>{d.n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
