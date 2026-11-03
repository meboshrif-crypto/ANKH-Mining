"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [balance, setBalance] = useState(7309.7884);
  const [mined, setMined] = useState(0.7532);
  const [level, setLevel] = useState(5);
  const [tab, setTab] = useState("mining");

  // تعدين لحظي زي الفيديو
  useEffect(()=>{
    const i = setInterval(()=>{
      setMined(m=>m+0.0007);
      setBalance(b=>b+0.0007);
    }, 100);
    return ()=>clearInterval(i);
  },[]);

  const levels = [
    {id:1, price:15, rate:"0.77"},
    {id:2, price:30, rate:"1.54"},
    {id:3, price:45, rate:"2.31"},
    {id:4, price:60, rate:"3.08"},
    {id:5, price:90, rate:"4.62"},
    {id:6, price:120, rate:"6.16"},
    {id:7, price:150, rate:"7.70"},
  ];

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", fontFamily:"sans-serif", display:"flex", justifyContent:"center"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#0f0f0f", minHeight:"100vh", position:"relative", paddingBottom:"80px"}}>
        
        {/* Header */}
        <div style={{padding:"15px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #222"}}>
          <span style={{fontWeight:"bold", color:"#facc15"}}>☥ ANKH Vault</span>
          <span style={{fontSize:"12px", background:"#1a1a1a", padding:"4px 8px", borderRadius:"8px"}}>TON</span>
        </div>

        {tab==="mining" && (
          <>
            <div style={{margin:"15px", background:"#1a1a1a", borderRadius:"16px", padding:"16px", border:"1px solid #222"}}>
              <p style={{fontSize:"11px", color:"#888"}}>إجمالي الرصيد المُعدّن</p>
              <h1 style={{fontSize:"26px", fontWeight:"800"}}>{balance.toFixed(4)} <span style={{fontSize:"14px", color:"#facc15"}}>ANKH</span></h1>
              
              <div style={{marginTop:"14px", background:"#222", borderRadius:"12px", padding:"12px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <p style={{fontSize:"12px", color:"#aaa"}}>التعدين النشط</p>
                  <p style={{fontSize:"11px", color:"#666"}}>يعمل الآن</p>
                </div>
                <div style={{textAlign:"left"}}>
                  <p style={{color:"#facc15", fontWeight:"bold"}}>+{mined.toFixed(4)} ANKH</p>
                  <p style={{fontSize:"10px", color:"#666"}}>4%</p>
                </div>
              </div>

              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px", marginTop:"12px"}}>
                <div style={{background:"#151515", padding:"10px", borderRadius:"10px", textAlign:"center"}}><p style={{fontSize:"11px", color:"#888"}}>في الساعة</p><b style={{fontSize:"13px"}}>44.9</b></div>
                <div style={{background:"#151515", padding:"10px", borderRadius:"10px", textAlign:"center"}}><p style={{fontSize:"11px", color:"#888"}}>يومي</p><b style={{fontSize:"13px"}}>~1.07k</b></div>
                <div style={{background:"#151515", padding:"10px", borderRadius:"10px", textAlign:"center"}}><p style={{fontSize:"11px", color:"#888"}}>معدل</p><b style={{color:"#0f0"}}>+2.99</b></div>
              </div>
            </div>

            <div style={{margin:"15px", background:"linear-gradient(90deg,#2a2210,#1a1a1a)", border:"1px solid #facc15", borderRadius:"12px", padding:"12px", display:"flex", justifyContent:"space-between"}}>
              <span style={{fontSize:"13px"}}>⭐ المستوى {level}</span>
              <span style={{fontSize:"11px", color:"#aaa"}}>100 ANKH لـ 2025 TON</span>
            </div>

            <div style={{margin:"15px"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"8px"}}><h3 style={{fontSize:"14px"}}>نظام 500 مستوى</h3><button onClick={()=>setTab("store")} style={{fontSize:"11px", background:"#facc15", color:"black", border:"none", padding:"4px 10px", borderRadius:"12px", fontWeight:"bold"}}>المتجر</button></div>
              <div style={{background:"#1a1a1a", borderRadius:"12px", padding:"10px"}}>
                {levels.slice(0,4).map(l=>(
                  <div key={l.id} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #222", fontSize:"13px"}}>
                    <span>مستوى {l.id}</span><span style={{color:"#facc15"}}>{l.price} ANKH</span><span style={{fontSize:"11px", color:"#888"}}>{l.rate}/ساعة</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab==="store" && (
          <div style={{padding:"15px"}}>
            <h2 style={{fontWeight:"bold", marginBottom:"12px"}}>🏪 متجر المستويات</h2>
            {levels.map(l=>(
              <div key={l.id} style={{background:"#1a1a1a", border:"1px solid #222", borderRadius:"12px", padding:"12px", marginBottom:"8px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div><p style={{fontWeight:"bold"}}>مستوى {l.id}</p><p style={{fontSize:"11px", color:"#888"}}>سعر: {l.price} ANKH</p></div>
                <button style={{background:"#facc15", color:"black", border:"none", padding:"8px 14px", borderRadius:"10px", fontWeight:"bold", fontSize:"12px"}}>شراء</button>
              </div>
            ))}
          </div>
        )}

        {tab==="tasks" && (
          <div style={{padding:"15px"}}>
            <h2 style={{fontWeight:"bold"}}>📅 السلسلة اليومية</h2>
            <div style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"6px", margin:"12px 0"}}>
              {[8,12,20,32,48,68,80,95,132,180].map((v,i)=><div key={i} style={{background:i<3?"#facc15":"#1a1a1a", color:i<3?"black":"white", padding:"8px 2px", borderRadius:"8px", textAlign:"center", fontSize:"11px"}}>{v}<br/>{i+1}يوم</div>)}
            </div>
            <div style={{background:"#1a1a1a", borderRadius:"12px", padding:"12px", marginTop:"10px"}}>
              <p style={{fontSize:"13px"}}>دعوة 3 أصدقاء نشطين <span style={{float:"left", color:"#facc15"}}>+50</span></p>
            </div>
          </div>
        )}

        {tab==="friends" && (
          <div style={{padding:"15px", textAlign:"center"}}>
            <h2>برنامج الإحالة</h2>
            <p style={{fontSize:"12px", color:"#888", margin:"8px 0"}}>اربح 5% من تعدين أصدقائك</p>
            <div style={{background:"#1a1a1a", padding:"12px", borderRadius:"12px", marginTop:"10px"}}><p style={{fontSize:"12px"}}>رمز الإحالة الخاص بك</p><b style={{fontSize:"20px", letterSpacing:"2px"}}>7956189802</b></div>
            <button style={{width:"100%", background:"#facc15", color:"black", border:"none", padding:"14px", borderRadius:"12px", fontWeight:"bold", marginTop:"15px"}}>مشاركة على تليجرام</button>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{padding:"15px"}}>
            <h2>💰 محفظة TON</h2>
            <div style={{background:"#1a1a1a", padding:"14px", borderRadius:"12px", marginTop:"10px"}}>
              <p>الرصيد المعدن</p><h2>{balance.toFixed(2)} ANKH</h2>
            </div>
            <button style={{width:"100%", background:"#222", color:"white", border:"1px solid #333", padding:"12px", borderRadius:"12px", marginTop:"10px"}}>ربط محفظة TON</button>
          </div>
        )}

        {/* Bottom Nav */}
        <div style={{position:"fixed", bottom:0, width:"100%", maxWidth:"400px", background:"#111", borderTop:"1px solid #222", display:"flex", justifyContent:"space-around", padding:"8px 0"}}>
          {[
            {id:"mining", icon:"⛏️", name:"التعدين"},
            {id:"store", icon:"🛒", name:"المتجر"},
            {id:"tasks", icon:"📋", name:"المهام"},
            {id:"friends", icon:"👥", name:"الاصدقاء"},
            {id:"wallet", icon:"💼", name:"المحفظة"},
          ].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none", border:"none", color: tab===t.id ? "#facc15" : "#666", fontSize:"11px", display:"flex", flexDirection:"column", alignItems:"center"}}>
              <span style={{fontSize:"18px"}}>{t.icon}</span>{t.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
