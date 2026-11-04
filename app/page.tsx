"use client";
import { useState, useEffect } from "react";

export default function Page() {
  // --- حالات الأساسية ---
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState<"en" | "ar" | "ru">("en");
  const [balance, setBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [mining, setMining] = useState(false);

  // --- حالات الأصدقاء ---
  const [refCode, setRefCode] = useState("000000");
  const [invitedCount, setInvitedCount] = useState(0);
  const [pendingEarnings, setPendingEarnings] = useState(0);

  // --- حالات المحفظة ---
  const [connected, setConnected] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const t = {
    en: {
      mining: "Mining", store: "Store", list: "List", friends: "Friends", wallet: "Wallet",
      ankhCoin: "ANKH COIN", level: "Level", balance: "Balance",
      startMining: "START MINING", miningActive: "Mining... 0.77/h",
      referralTitle: "Referral Program",
      referralDesc: "Invite friends and earn 5% from their mining forever! Your friends get a boost.",
      info: "Your friends keep 100% of their earnings. You receive 5% as a bonus from the system, not from your friends. Win-win!",
      copyLink: "Copy Link", shareTG: "Share on Telegram",
      yourCode: "Your Private Referral Code", invited: "Invited Friends", pending: "Pending Earnings", id: "ID",
      connectWallet: "Connect Wallet", verify: "Verify with 0.05 GRAM (TON)", withdraw: "Withdraw ANKH",
      minWithdraw: "Min 10,000 ANKH, Fee 5%",
    },
    ar: {
      mining: "التعدين", store: "المتجر", list: "القائمة", friends: "الأصدقاء", wallet: "المحفظة",
      ankhCoin: "عملة عنخ", level: "المستوى", balance: "الرصيد",
      startMining: "ابدأ التعدين", miningActive: "يتم التعدين... 0.77/ساعة",
      referralTitle: "برنامج الإحالة",
      referralDesc: "ادعو أصدقائك واربح 5% من تعدينهم مدى الحياة! أصدقاؤك يحصلون على دفعة.",
      info: "أصدقاؤك يحتفظون بـ 100% من أرباحهم. تحصل على 5% كمكافأة من النظام، وليس من أصدقائك.",
      copyLink: "نسخ الرابط", shareTG: "مشاركة على تيليجرام",
      yourCode: "كود الإحالة الخاص بك", invited: "الأصدقاء المدعوون", pending: "الأرباح المعلقة", id: "المعرف",
      connectWallet: "ربط المحفظة", verify: "التحقق بـ 0.05 GRAM", withdraw: "سحب ANKH",
      minWithdraw: "الحد الأدنى 10,000، عمولة 5%",
    },
    ru: {
      mining: "Майнинг", store: "Магазин", list: "Список", friends: "Друзья", wallet: "Кошелек",
      ankhCoin: "ANKH КОИН", level: "Уровень", balance: "Баланс",
      startMining: "НАЧАТЬ МАЙНИНГ", miningActive: "Майнинг... 0.77/ч",
      referralTitle: "Реферальная программа",
      referralDesc: "Приглашайте друзей и получайте 5% от их майнинга навсегда!",
      info: "Ваши друзья сохраняют 100% своего заработка. Вы получаете 5% в качестве бонуса от системы.",
      copyLink: "Копировать ссылку", shareTG: "Поделиться в Telegram",
      yourCode: "Ваш реферальный код", invited: "Приглашенные друзья", pending: "Ожидающий доход", id: "ID",
      connectWallet: "Подключить кошелек", verify: "Верификация 0.05 GRAM", withdraw: "Вывести ANKH",
      minWithdraw: "Мин 10,000 ANKH, комиссия 5%",
    }
  }[lang];

  useEffect(() => {
    const code = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
    setRefCode(code);
    const savedBal = localStorage.getItem("ankh_balance");
    if(savedBal) setBalance(Number(savedBal));
  }, []);

  useEffect(() => { localStorage.setItem("ankh_balance", String(balance)); }, [balance]);

  const handleMining = () => {
    setMining(true);
    setTimeout(() => {
      setBalance(b => b + 0.77);
      setWalletBalance(w => w + 0.77);
      setMining(false);
      if(walletBalance > 0 && walletBalance % 15 === 0) setLevel(l => l + 1);
    }, 2000);
  }

  const copyRef = () => {
    navigator.clipboard.writeText(`https://t.me/ANKH_Mining_bot?start=${refCode}`);
    alert("Copied!");
  }

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-[#050505] text-white font-sans pb-24">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[#FACC15]/20">
        <h1 className="text-[#FACC15] font-black text-xl">ANKH</h1>
        <div className="flex gap-2">
          {["en","ar","ru"].map((l:any) => (
            <button key={l} onClick={()=>setLang(l)} className={`px-3 py-1 rounded-full text-xs font-bold border ${lang===l ? "bg-[#FACC15] text-black border-[#FACC15]" : "border-white/20 text-white/60"}`}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {tab === "mining" && (
          <div className="text-center mt-10">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-b from-[#FACC15] to-[#A16207] flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.3)]">
              <span className="text-6xl">☥</span>
            </div>
            <h2 className="mt-6 text-[#FACC15] font-bold tracking-widest">{t.ankhCoin}</h2>
            <p className="text-4xl font-black mt-2">{balance.toFixed(2)}</p>
            <p className="mt-4 text-white/50">{t.level}: {level}/500</p>
            <button onClick={handleMining} disabled={mining} className="mt-8 w-full bg-[#FACC15] text-black font-black py-4 rounded-2xl text-lg active:scale-95 transition">
              {mining ? t.miningActive : t.startMining}
            </button>
          </div>
        )}

        {tab === "friends" && (
          <div>
            <div className="bg-[#111] border border-[#FACC15]/20 rounded-2xl p-5">
              <h2 className="text-xl font-black text-[#FACC15]">{t.referralTitle}</h2>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">{t.referralDesc}</p>
              <div className="mt-4 bg-[#FACC15]/10 border border-[#FACC15]/20 rounded-xl p-3 text-xs text-[#FACC15]">ℹ️ {t.info}</div>
              
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button onClick={copyRef} className="bg-[#FACC15] text-black font-bold py-3 rounded-xl">📋 {t.copyLink}</button>
                <button onClick={copyRef} className="bg-[#1c1c1c] border border-[#FACC15]/30 text-[#FACC15] font-bold py-3 rounded-xl">✈️ {t.shareTG}</button>
              </div>

              <div className="mt-5 bg-black rounded-xl p-4 border border-white/10">
                <p className="text-xs text-white/50">{t.yourCode}</p>
                <p className="text-lg font-mono font-bold tracking-widest text-[#FACC15] mt-1">{refCode}</p>
                <p className="text-[10px] text-white/30 mt-2">https://t.me/ANKH_Mining_bot?start={refCode}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-black rounded-xl p-4 border border-white/10">
                  <p className="text-xs text-white/50">{t.invited}</p>
                  <p className="text-2xl font-black mt-1">{invitedCount}</p>
                </div>
                <div className="bg-black rounded-xl p-4 border border-white/10">
                  <p className="text-xs text-white/50">{t.pending}</p>
                  <p className="text-2xl font-black mt-1 text-[#FACC15]">+{pendingEarnings.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "wallet" && (
          <div>
            <div className="bg-[#111] border border-[#FACC15]/20 rounded-2xl p-5">
              <h2 className="text-xl font-black">{t.wallet}</h2>
              {!connected ? (
                <button onClick={()=>setShowWallets(true)} className="mt-6 w-full bg-[#FACC15] text-black font-black py-4 rounded-xl">{t.connectWallet}</button>
              ) : (
                <div className="mt-4">
                  <p className="text-xs text-white/50">Connected</p>
                  <p className="font-mono text-sm text-[#FACC15] break-all">{walletAddress || "UQ...ANkH"}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={()=>setConnected(false)} className="text-xs bg-white/10 px-3 py-2 rounded-lg">Disconnect</button>
                    <button onClick={()=>setConnected(false)} className="text-xs bg-white/10 px-3 py-2 rounded-lg">Change</button>
                  </div>
                  {!verified && <button onClick={()=>setVerified(true)} className="mt-6 w-full border border-[#FACC15] text-[#FACC15] font-bold py-3 rounded-xl">{t.verify}</button>}
                  {verified && <p className="mt-4 text-green-400 text-sm font-bold">✓ Verified</p>}
                </div>
              )}

              <div className="mt-8">
                <p className="font-bold">{t.withdraw}</p>
                <p className="text-xs text-white/40 mt-1">{t.minWithdraw}</p>
                <input value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} placeholder="0.00" className="mt-3 w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-[#FACC15]" />
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {["25%","50%","75%","100%"].map(p => <button key={p} onClick={()=>setWithdrawAmount(String(walletBalance * parseInt(p)/100))} className="bg-white/10 text-xs py-2 rounded-lg">{p}</button>)}
                </div>
                <button className="mt-4 w-full bg-[#FACC15]/20 text-[#FACC15] font-black py-4 rounded-xl border border-[#FACC15]/30">Withdraw</button>
              </div>
            </div>

            {showWallets && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center p-4 z-50">
                <div className="bg-[#111] w-full max-w-md rounded-t-[24px] p-5 border border-[#FACC15]/20">
                  <h3 className="font-black">Select Wallet</h3>
                  <button onClick={()=>{setConnected(true); setWalletAddress("UQDl..."+refCode); setShowWallets(false)}} className="mt-4 w-full bg-[#0098EA] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">Tonkeeper</button>
                  <button onClick={()=>{setConnected(true); setWalletAddress("UQMy..."+refCode); setShowWallets(false)}} className="mt-3 w-full bg-white/10 font-bold py-4 rounded-xl">MyTon Wallet</button>
                  <button onClick={()=>setShowWallets(false)} className="mt-3 w-full text-white/40 py-2">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "store" && <div className="text-center mt-20 text-white/30">Store Coming Soon - Boosters 1.5x / 2x</div>}
        {tab === "list" && <div className="text-center mt-20 text-white/30">Staking 30/90/120 Days - 15% APR</div>}
      </div>

      {/* Bottom Nav - Black & Gold */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-[#FACC15]/20 flex justify-around py-2">
        {[
          {id:"mining", icon:"⛏️", label:t.mining},
          {id:"store", icon:"🛒", label:t.store},
          {id:"list", icon:"📋", label:t.list},
          {id:"friends", icon:"👥", label:t.friends},
          {id:"wallet", icon:"💼", label:t.wallet},
        ].map(i => (
          <button key={i.id} onClick={()=>setTab(i.id)} className={`flex flex-col items-center p-2 ${tab===i.id ? "text-[#FACC15]" : "text-white/40"}`}>
            <span className="text-xl">{i.icon}</span>
            <span className="text-[10px] font-bold mt-1">{i.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
