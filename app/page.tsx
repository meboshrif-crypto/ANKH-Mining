"use client";
import { useState, useEffect } from "react";
export const dynamic = "force-dynamic";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState("en");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [mining, setMining] = useState(false);
  const [refCode, setRefCode] = useState("ANKH-000000");
  const [lastMine, setLastMine] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showWallets, setShowWallets] = useState(false);
  const [antiBotDone, setAntiBotDone] = useState(false);

  const [selectedGram, setSelectedGram] = useState(1);
  const [gramTx, setGramTx] = useState("");
  const [gramPrice, setGramPrice] = useState<number | null>(null);
  const [ankhPriceGram] = useState(0.006666);
  const FALLBACK_RATE = 150;
  const [showLevels, setShowLevels] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState<any[]>([]);

  const getRequiredForLevel = (targetLevel: number) => {
    if (targetLevel <= 1) return 0;
    return 70 * targetLevel * targetLevel - 40 * targetLevel - 40;
  };
  const getMiningRate = (lvl: number) => 0.25 + lvl * 0.05;

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://api.dexscreener.com/latest/dex/search/?q=GRAM");
        const data = await res.json();
        const pair = data?.pairs?.find((p:any)=> p.chainId==="ton" && p.baseToken?.symbol==="GRAM") || data?.pairs?.[0];
        if(pair?.priceUsd) setGramPrice(Number(pair.priceUsd));
      } catch {}
    };
    fetchPrices();
    const i = setInterval(fetchPrices, 60000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const code = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
    setRefCode(code);
    try {
      const b = window.localStorage.getItem("ankh_bal");
      const wb = window.localStorage.getItem("ankh_wallet");
      const l = window.localStorage.getItem("ankh_level");
      const last = window.localStorage.getItem("ankh_last");
      const invites = window.localStorage.getItem("ankh_invites");
      const wa = window.localStorage.getItem("ankh_wallet_addr");
      const conn = window.localStorage.getItem("ankh_connected");
      const anti = window.localStorage.getItem("ankh_antibot");
      if(b) setBalance(Number(b));
      if(wb) setWalletBalance(Number(wb));
      if(l) setLevel(Number(l));
      if(last) setLastMine(Number(last));
      if(invites) setInvitedFriends(JSON.parse(invites));
      else setInvitedFriends([{id:1, name:"Ahmed", username:"@ahmed", level:0},{id:2, name:"Sara", username:"@sara", level:3}]);
      if(wa) setWalletAddress(wa);
      if(conn==="1") setConnected(true);
      if(anti==="1") setAntiBotDone(true);
    } catch {}
  }, []);

  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_bal", String(balance)); }, [balance]);
  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_wallet", String(walletBalance)); }, [walletBalance]);
  useEffect(() => { if(typeof window!=="undefined") window.localStorage.setItem("ankh_level", String(level)); }, [level]);

  useEffect(() => {
    const int = setInterval(() => {
      if(!lastMine) { setCountdown(""); return; }
      const diff = lastMine + 86400000 - Date.now();
      if(diff <= 0) setCountdown("");
      else {
        const h = Math.floor(diff/3600000);
        const m = Math.floor((diff%3600000)/60000);
        const s = Math.floor((diff%60000)/1000);
        setCountdown(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(int);
  }, [lastMine]);

  const canMine = Date.now() - lastMine >= 86400000 || lastMine === 0;

  const startMining = () => {
    if(!canMine || mining) return;
    setMining(true);
    const rate = getMiningRate(level);
    setTimeout(() => {
      setBalance(prev => prev + rate);
      const now = Date.now();
      setLastMine(now);
      if(typeof window!=="undefined") window.localStorage.setItem("ankh_last", String(now));
      setMining(false);
    }, 2000);
  };

  // مهم - الاستلام بيعيد العد من جديد
  const handleClaim = () => {
    if(balance <= 0) return;
    const newWallet = walletBalance + balance;
    setWalletBalance(newWallet);
    setBalance(0);
    let newLvl = level;
    while(newLvl < 500 && newWallet >= getRequiredForLevel(newLvl+1)) newLvl++;
    if(newLvl !== level) setLevel(newLvl);
    // اعادة العد 24 ساعة بعد الاستلام
    const now = Date.now();
    setLastMine(now);
    if(typeof window!=="undefined") window.localStorage.setItem("ankh_last", String(now));
  };

  const needForNext = Math.max(0, getRequiredForLevel(level+1) - walletBalance);
  const currentRate = getMiningRate(level);
  const calculatedAnkh = selectedGram / ankhPriceGram;
  const displayRate = gramPrice ? (1/ankhPriceGram).toFixed(0) : FALLBACK_RATE.toString();
  const inviteLink = `https://t.me/ANKH_Mining_bot?start=${refCode}`;

  const connectWallet = (type:string) => {
    const addr = "UQ" + Math.random().toString(36).substring(2,10) + "..." + refCode.slice(-4);
    setWalletAddress(addr);
    setConnected(true);
    setShowWallets(false);
    if(typeof window!=="undefined"){
      window.localStorage.setItem("ankh_wallet_addr", addr);
      window.localStorage.setItem("ankh_connected", "1");
    }
    // محاكاة فتح المحفظة
    if(type==="tonkeeper") window.open("ton://", "_blank");
    else window.open("https://app.ston.fi", "_blank");
  };

  const verifyAntiBot = () => {
    // تحويل 0.05 GRAM
    window.open(`ton://transfer/UQAnkhVerificationAddress?amount=50000000&text=antibot_${refCode}`, "_blank");
    setTimeout(()=>{
      setAntiBotDone(true);
      if(typeof window!=="undefined") window.localStorage.setItem("ankh_antibot", "1");
      alert("تم تأكيد انك مش روبوت ✅ 0.05 GRAM");
    }, 2000);
  };

  return (
    <div style={{minHeight:"100vh", background:"#050505", color:"#fff", paddingBottom:90, fontFamily:"sans-serif"}}>
      <div style={{display:"flex", gap:8, padding:16}}>
        {["en","ar","ru"].map(l=>(
          <button key={l} onClick={()=>setLang(l)} style={{padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:900, border:"1px solid #222", background: lang===l ? "#FACC15" : "#1A1A1A", color: lang===l ? "#000" : "#888"}}>{l.toUpperCase()}</button>
        ))}
      </div>

      <div style={{padding:20, display:"flex", flexDirection:"column", alignItems:"center"}}>
        {tab==="mining" && (
          <>
            <div style={{width:190, height:190, borderRadius:"50%", background:"linear-gradient(180deg, #FACC15, #854D0E)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:80, boxShadow:"0 0 70px rgba(250,204,21,0.35)"}}>☥</div>
            <div style={{marginTop:20, color:"#FACC15", letterSpacing:5, fontSize:11, fontWeight:800}}>ANKH COIN</div>
            <div style={{fontSize:42, fontWeight:900, marginTop:6}}>{balance.toFixed(2)} ANKH</div>
            <div style={{fontSize:11, color:"#666"}}>رصيد البوت - قابل للاستلام</div>
            <div style={{marginTop:10, background:"#111", border:"1px solid rgba(250,204,21,0.3)", borderRadius:20, padding:"8px 14px", display:"flex", gap:8, fontSize:12, alignItems:"center"}}>
              <span style={{color:"#888"}}>سرعة التعدين:</span>
              <span style={{color:"#FACC15", fontWeight:900}}>{currentRate.toFixed(2)}/h</span>
              <span style={{background:"#222", padding:"2px 8px", borderRadius:10, fontSize:10}}>Level {level}</span>
            </div>
            <div style={{display:"flex", gap:10, width:"100%", maxWidth:360, marginTop:20}}>
              <button onClick={startMining} disabled={!canMine || mining} style={{flex:1, background: !canMine ? "#222" : mining ? "#333" : "#FACC15", color: !canMine ? "#666" : mining ? "#888" : "#000", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"none"}}>
                {!canMine ? `Next ${countdown}` : mining ? `Mining...` : `ابدأ التعدين`}
              </button>
              <button onClick={handleClaim} disabled={balance===0} style={{flex:1, background: balance>0 ? "#fff" : "#111", color: balance>0 ? "#000" : "#444", fontWeight:900, padding:16, borderRadius:14, fontSize:14, border:"1px solid #222"}}>استلام CLAIM</button>
            </div>
            <div style={{marginTop:20, width:"100%", maxWidth:360, background:"#111", border:"1px solid rgba(250,204,21,0.25)", borderRadius:16, padding:14}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:12}}><span style={{color:"#888"}}>عملات المحفظة (تحسب لليفل):</span><span style={{color:"#FACC15", fontWeight:900}}>{walletBalance.toFixed(2)} ANKH</span></div>
              <div style={{display:"flex", gap:12, marginTop:8, fontSize:12, color:"#666"}}><span>Level {level}/500</span><span style={{color:"#555"}}>Next: {getRequiredForLevel(level+1).toLocaleString()}</span></div>
              <div style={{marginTop:8, width:"100%", height:6, background:"#1A1A1A", borderRadius:10, overflow:"hidden"}}><div style={{width:`${Math.min(100, (walletBalance / (getRequiredForLevel(level+1)||160))*100)}%`, height:"100%", background:"#FACC15"}}></div></div>
              <div style={{marginTop:8, fontSize:12, color:"#FACC15", fontWeight:800, textAlign:"center"}}>باقي {needForNext.toFixed(2)} ANKH لليفل {level+1}</div>
            </div>
            <button onClick={()=>setShowLevels(!showLevels)} style={{marginTop:18, width:"100%", maxWidth:360, background:"#111", border:"1px solid #222", color:"#FACC15", fontWeight:800, padding:12, borderRadius:12, fontSize:13}}>{showLevels ? "اخفاء المستويات ▲" : "عرض المستويات 1-500 + سرعة التعدين ▼"}</button>
            {showLevels && (
              <div style={{marginTop:12, width:"100%", maxWidth:390, background:"#111", border:"1px solid #222", borderRadius:16, padding:12, maxHeight:400, overflowY:"auto"}}>
                {Array.from({length:500}, (_,i)=>{
                  const lvl = i+1;
                  return <div key={lvl} style={{display:"flex", justifyContent:"space-between", fontSize:11, padding:"6px 8px"}}><span>Level {lvl}</span><span>{getRequiredForLevel(lvl).toLocaleString()}</span><span>{getMiningRate(lvl-1).toFixed(2)}/h</span></div>
                })}
              </div>
            )}
          </>
        )}

        {tab==="store" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:14}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>🛒 المتجر - شراء بـ GRAM</h2>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.35)", borderRadius:20, padding:16}}>
              <div style={{fontSize:13, fontWeight:800}}>اختر كمية GRAM (اقل شراء 1 جرام)</div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, marginTop:14}}>
                {[1,3,5,10].map(g=>(
                  <button key={g} onClick={()=>setSelectedGram(g)} style={{padding:14, borderRadius:12, fontWeight:900, fontSize:14, border: selectedGram===g ? "2px solid #FACC15" : "1px solid #222", background: selectedGram===g ? "#FACC15" : "#1A1A1A", color: selectedGram===g ? "#000" : "#888"}}>{g} GRAM</button>
                ))}
              </div>
              <div style={{marginTop:14, background:"#000", border:"1px solid #222", borderRadius:12, padding:12, textAlign:"center"}}>
                <div style={{fontSize:24, fontWeight:900, color:"#FACC15"}}>{Math.floor(calculatedAnkh).toLocaleString()} ANKH</div>
              </div>
            </div>
          </div>
        )}

        {tab==="list" && (
          <div style={{width:"100%", maxWidth:410, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.3)", borderRadius:20, padding:16}}>
              <h2 style={{fontWeight:900, fontSize:16, color:"#FACC15"}}>📅 تسجيل دخول يومي - 30 يوم</h2>
              <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:6, marginTop:12}}>
                {[9,14,23,31,42,55,68,77,89,102,115,130,145,162,180,199,219,240,262,285,309,334,360,387,415,444,474,505,537,600].map((reward, i)=>(
                  <div key={i} style={{background:"#000", border:"1px solid #222", borderRadius:10, padding:"8px 0", textAlign:"center"}}><div style={{fontSize:9, color:"#666"}}>يوم {i+1}</div><div style={{fontSize:12, fontWeight:900, color:"#fff"}}>{reward}</div></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab==="friends" && (
          <div style={{width:"100%", maxWidth:400}}>
            <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.4)", borderRadius:20, padding:16, textAlign:"center"}}>
              <div style={{fontSize:22, fontWeight:900, color:"#FACC15"}}>5% للأبد ♾️</div>
            </div>
            <div style={{marginTop:12, background:"#111", borderRadius:20, padding:16, display:"flex", gap:10}}>
              <button onClick={()=>{ if(navigator.share) navigator.share({url:inviteLink}); else navigator.clipboard.writeText(inviteLink); }} style={{flex:1, background:"#FACC15", color:"#000", fontWeight:900, padding:12, borderRadius:12, border:"none"}}>📤 مشاركة</button>
              <button onClick={()=>navigator.clipboard.writeText(inviteLink)} style={{flex:1, background:"#fff", color:"#000", fontWeight:900, padding:12, borderRadius:12, border:"none"}}>📋 نسخ</button>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div style={{width:"100%", maxWidth:400, display:"flex", flexDirection:"column", gap:14}}>
            <h2 style={{fontWeight:900, fontSize:20, color:"#FACC15"}}>💼 المحفظة</h2>

            {!connected ? (
              <div style={{background:"#111", border:"1px solid rgba(250,204,21,0.3)", borderRadius:20, padding:20, textAlign:"center"}}>
                <div style={{fontSize:14, fontWeight:800}}>ربط المحفظة</div>
                <div style={{fontSize:11, color:"#666", marginTop:6}}>اختار محفظتك وهيتم تحويلك اوتوماتيك للتأكيد</div>
                {!showWallets ? (
                  <button onClick={()=>setShowWallets(true)} style={{marginTop:16, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>🔗 ربط المحفظة</button>
                ) : (
                  <div style={{marginTop:14, display:"flex", flexDirection:"column", gap:8}}>
                    <button onClick={()=>connectWallet("tonkeeper")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:14, borderRadius:12, fontWeight:700, display:"flex", justifyContent:"space-between"}}><span>👛 TonKeeper</span><span>→</span></button>
                    <button onClick={()=>connectWallet("myton")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:14, borderRadius:12, fontWeight:700, display:"flex", justifyContent:"space-between"}}><span>💎 MyTonWallet</span><span>→</span></button>
                    <button onClick={()=>connectWallet("tonhub")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:14, borderRadius:12, fontWeight:700, display:"flex", justifyContent:"space-between"}}><span>🚀 Tonhub</span><span>→</span></button>
                    <button onClick={()=>connectWallet("stonfi")} style={{background:"#1A1A1A", border:"1px solid #333", color:"#fff", padding:14, borderRadius:12, fontWeight:700, display:"flex", justifyContent:"space-between"}}><span>💎 StonFi</span><span>→</span></button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div style={{background:"#111", border:"1px solid #22c55e", borderRadius:20, padding:16}}>
                  <div style={{color:"#22c55e", fontSize:12, fontWeight:800}}>✓ تم الربط</div>
                  <div style={{marginTop:6, background:"#000", borderRadius:10, padding:10, fontSize:11, color:"#FACC15", wordBreak:"break-all"}}>{walletAddress}</div>
                  <div style={{marginTop:8, fontSize:11, color:"#888"}}>رصيد الليفل (المحفظة): <span style={{color:"#FACC15", fontWeight:900}}>{walletBalance.toFixed(2)} ANKH</span></div>
                </div>

                {/* تأكيد انك مش روبوت */}
                <div style={{background: antiBotDone ? "rgba(34,197,94,0.1)" : "#111", border: antiBotDone ? "1px solid #22c55e" : "1px solid rgba(250,204,21,0.4)", borderRadius:20, padding:16}}>
                  <div style={{fontWeight:800, fontSize:13, color: antiBotDone ? "#22c55e" : "#FACC15"}}>{antiBotDone ? "✅ تم التأكيد - مش روبوت" : "⚠️ خطوة إلزامية - تأكيد انك مش روبوت"}</div>
                  <div style={{fontSize:11, color:"#888", marginTop:6}}>لازم تعمل تحويل 0.05 GRAM للتأكيد</div>
                  {!antiBotDone ? (
                    <button onClick={verifyAntiBot} style={{marginTop:12, width:"100%", background:"#FACC15", color:"#000", fontWeight:900, padding:12, borderRadius:12, border:"none"}}>تحويل 0.05 GRAM للتأكيد</button>
                  ) : (
                    <div style={{marginTop:10, fontSize:11, color:"#22c55e", textAlign:"center"}}>تم التحقق بنجاح - تقدر تسحب دلوقتي</div>
                  )}
                </div>

                {/* السحب */}
                <div style={{background:"#111", border:"1px solid #222", borderRadius:20, padding:16}}>
                  <div style={{fontWeight:900, fontSize:14}}>💸 سحب ANKH</div>
                  <div style={{marginTop:8, background:"rgba(250,204,21,0.08)", border:"1px dashed rgba(250,204,21,0.2)", borderRadius:10, padding:8, fontSize:10, color:"#aaa", lineHeight:1.5}}>
                    • الحد الادنى للسحب: 10,000 ANKH<br/>
                    • لازم يكون معاك 25% من العملات في المحفظة علشان تقدر تسحب<br/>
                    • العملات اللي في المحفظة هي اللي بتزود مستواك مش عملات البوت
                  </div>
                  <div style={{marginTop:12}}>
                    <input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} type="number" placeholder="10000" style={{width:"100%", background:"#000", border:"1px solid #333", borderRadius:10, padding:12, color:"#fff", fontSize:13, outline:"none"}}/>
                    <div style={{marginTop:8, fontSize:11, color:"#888", display:"flex", justifyContent:"space-between"}}>
                      <span>المطلوب في المحفظة (25%):</span>
                      <span style={{color: walletBalance >= Number(withdrawAmount||0)*0.25 ? "#22c55e" : "#ef4444", fontWeight:800}}>
                        {withdrawAmount ? (Number(withdrawAmount)*0.25).toLocaleString() : "0"} ANKH
                      </span>
                    </div>
                    <div style={{marginTop:4, fontSize:11, color:"#888", display:"flex", justifyContent:"space-between"}}>
                      <span>معاك حاليا:</span><span style={{color:"#FACC15"}}>{walletBalance.toFixed(2)} ANKH</span>
                    </div>
                    <button 
                      disabled={!antiBotDone || Number(withdrawAmount) < 10000 || walletBalance < Number(withdrawAmount)*0.25}
                      onClick={()=>{ alert(`تم طلب سحب ${withdrawAmount} ANKH الى ${walletAddress}`); setWithdrawAmount(""); }}
                      style={{marginTop:12, width:"100%", background: (!antiBotDone || Number(withdrawAmount) < 10000 || walletBalance < Number(withdrawAmount)*0.25) ? "#222" : "#FACC15", color: (!antiBotDone || Number(withdrawAmount) < 10000 || walletBalance < Number(withdrawAmount)*0.25) ? "#555" : "#000", fontWeight:900, padding:14, borderRadius:12, border:"none"}}>
                      {!antiBotDone ? "اعمل تأكيد الروبوت الاول" : Number(withdrawAmount) < 10000 ? "الحد الادنى 10000" : walletBalance < Number(withdrawAmount)*0.25 ? `محتاج ${(Number(withdrawAmount)*0.25).toFixed(0)} في المحفظة` : `سحب ${withdrawAmount} ANKH`}
                    </button>
                  </div>
                </div>

                <button onClick={()=>{ setConnected(false); setAntiBotDone(false); setWalletAddress(""); if(typeof window!=="undefined"){ localStorage.removeItem("ankh_connected"); localStorage.removeItem("ankh_antibot"); localStorage.removeItem("ankh_wallet_addr"); } }} style={{background:"#111", border:"1px solid #333", color:"#888", padding:10, borderRadius:10, fontSize:11, width:"100%"}}>فصل المحفظة</button>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{position:"fixed", bottom:0, left:0, right:0, background:"#0A0A0A", borderTop:"1px solid rgba(250,204,21,0.2)", display:"flex", justifyContent:"space-around", padding:"10px 0 22px"}}>
        {[{id:"mining",t:"Mining",ic:"⛏️"},{id:"store",t:"Store",ic:"🛒"},{id:"list",t:"List",ic:"📋"},{id:"friends",t:"Friends",ic:"👥"},{id:"wallet",t:"Wallet",ic:"💼"}].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} style={{background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", color: tab===m.id ? "#FACC15" : "#666"}}>
            <span style={{fontSize:18}}>{m.ic}</span><span style={{fontSize:10, fontWeight:800}}>{m.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
