"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(1240.77);
  const [mining, setMining] = useState(false);
  const [refCode] = useState("ANKH-" + Math.floor(100000+Math.random()*900000));
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);

  const startMine = () => {
    setMining(true);
    setTimeout(() => { setBalance(b=>b+0.77); setMining(false); }, 1500);
  }

  return (
    <div style={{minHeight:"100vh", background:"#050505", color:"white", fontFamily:"sans-serif", paddingBottom:80}}>
      {/* لغات */}
      <div style={{display:"flex", gap:8, padding:16}}>
        {["EN","AR","RU"].map(l=>(
          <button key={l} onClick={()=>setLang(l.toLowerCase())} style={{padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:900, border:"1px solid #333", background: lang===l.toLowerCase() ? "#FACC15" : "#1A1A1A", color: lang===l.toLowerCase() ? "black" : "#aaa"}}>{l}</button>
        ))}
      </div>

      <div style={{padding:20, display:"flex", flexDirection:"column", alignItems:"center"}}>
        {tab==="mining" && (
          <>
            <div style={{width:180, height:180, borderRadius:"50%", background:"linear-gradient(to bottom, #FACC15, #854D0E)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:70, boxShadow:"0 0 60px rgba(250,204,21,0.4)"}}>☥</div>
            <h2 style={{marginTop:24, color:"#FACC15", letterSpacing:4, fontSize:12, fontWeight:800}}>ANKH COIN</h2>
            <h1 style={{fontSize:48, fontWeight:900, marginTop:8}}>{balance.toFixed(2)}</h1>
            <p style={{color:"#666", fontSize:13, marginTop:4}}>Level 0/500 • 0.77/h • Wallet: {balance.toFixed(2)}</p>
            <button onClick={startMine} style={{marginTop:30, width:"100%", maxWidth:350, background:"#FACC15", color:"black", fontWeight:900, padding:"18px 0", borderRadius:16, fontSize:18, border:"none"}}>{mining ? "Mining... 0.77/h" : "START MINING"}</button>
          </>
        )}

        {tab==="friends" && (
          <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}>
            <h2 style={{fontSize:20, fontWeight:900, color:"#FACC15"}}>Referral Program</h2>
            <p style={{fontSize:13, color:"#999", marginTop:8}}>Invite friends and earn 5% from their mining forever!</p>
            <div style={{marginTop:12, background:"rgba(250,204,21,0.1)", border:"1px solid rgba(250,204,21,0.2)", borderRadius:12, padding:10, fontSize:11, color:"#FACC15"}}>ℹ️ Your friends keep 100% - You get 5% bonus from system</div>
            <button onClick={()=>navigator.clipboard.writeText(`https://t.me/ANKH_Mining_bot?start=${refCode}`)} style={{marginTop:16, width:"100%", background:"#FACC15", color:"black", fontWeight:800, padding:14, borderRadius:12, border:"none"}}>📋 Copy Link - {refCode}</button>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:14}}>
              <div style={{background:"black", borderRadius:12, padding:14, border:"1px solid #222"}}><div style={{fontSize:11, color:"#666"}}>Invited Friends</div><div style={{fontSize:22, fontWeight:900, marginTop:4}}>0</div></div>
              <div style={{background:"black", borderRadius:12, padding:14, border:"1px solid #222"}}><div style={{fontSize:11, color:"#666"}}>Pending Earnings</div><div style={{fontSize:22, fontWeight:900, marginTop:4, color:"#FACC15"}}>+0.00</div></div>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{width:"100%", maxWidth:380, background:"#111", border:"1px solid rgba(250,204,21,0.2)", borderRadius:24, padding:20}}>
            <h2 style={{fontWeight:900, fontSize:18}}>Wallet</h2>
            {!connected ? (
              <button onClick={()=>setConnected(true)} style={{marginTop:20, width:"100%", background:"#FACC15", color:"black", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>Connect Wallet (Tonkeeper)</button>
            ) : (
              <div style={{marginTop:16}}>
                <div style={{fontFamily:"monospace", color:"#FACC15", fontSize:13}}>UQDl...{refCode.slice(-4)} Connected ✓</div>
                {!verified ? <button onClick={()=>setVerified(true)} style={{marginTop:14, width:"100%", border:"1px solid #FACC15", color:"#FACC15", background:"transparent", padding:12, borderRadius:12, fontWeight:700}}>Verify 0.05 GRAM (TON)</button> : <div style={{marginTop:14, color:"#22c55e", fontWeight:800}}>✓ Verified</div>}
                <div style={{marginTop:20}}>
                  <input placeholder="0.00" style={{width:"100%", background:"black", border:"1px solid #222", borderRadius:12, padding:14, color:"white"}} />
                  <div style={{display:"flex", gap:6, marginTop:10}}>{["25%","50%","75%","100%"].map(p=><button key={p} style={{flex:1, background:"#222", border:"none", color:"#aaa", padding:8, borderRadius:8, fontSize:12}}>{p}</button>)}</div>
                  <button style={{marginTop:10, width:"100%", background:"rgba(250,204,21,0.15)", color:"#FACC15", border:"1px solid rgba(250,204,21,0.3)", padding:14, borderRadius:12, fontWeight:900}}>Withdraw (Min 10k, Fee 5%)</button>
                </div>
              </div>
            )}
          </div>
        )}

        {(tab==="store" || tab==="list") && <div style={{marginTop:100, color:"#444"}}>{tab} - Coming Soon</div>}
      </div>

      {/* Bottom Nav - ثابتة */}
      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0A0A0A", borderTop:"1px solid rgba(250,204,21,0.2)", display:"flex", justifyContent:"space-around", padding:"10px 0 20px"}}>
        {[
          {id:"mining", t:"Mining", ic:"⛏️"},
          {id:"store", t:"Store", ic:"🛒"},
          {id:"list", t:"List", ic:"📋"},
          {id:"friends", t:"Friends", ic:"👥"},
          {id:"wallet", t:"Wallet", ic:"💼"},
        ].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: tab===m.id ? "#FACC15" : "#666"}}>
            <span style={{fontSize:18}}>{m.ic}</span><span style={{fontSize:10, fontWeight:800, marginTop:2}}>{m.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
