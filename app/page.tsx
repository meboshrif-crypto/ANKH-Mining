"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [tab, setTab] = useState("mining");
  const [lang, setLang] = useState<"en" | "ar" | "ru">("en");
  const [balance, setBalance] = useState(0);
  const [walletBal, setWalletBal] = useState(0);
  const [level, setLevel] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [refCode, setRefCode] = useState("ANKH-000000");
  const [connected, setConnected] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [verified, setVerified] = useState(false);
  const [withdraw, setWithdraw] = useState("");

  useEffect(() => {
    const c = "ANKH-" + Math.floor(100000 + Math.random() * 900000);
    setRefCode(c);
  }, []);

  const t = {
    en: { mining:"Mining", store:"Store", list:"List", friends:"Friends", wallet:"Wallet", coin:"ANKH COIN", start:"START MINING", active:"Mining... 0.77/h", level:"Level", refTitle:"Referral Program", refDesc:"Invite friends and earn 5% from their mining forever! Your friends get a boost.", info:"Your friends keep 100% of their earnings. You receive 5% as a bonus from the system.", copy:"Copy Link", share:"Share on Telegram", code:"Your Private Referral Code", invited:"Invited Friends", pending:"Pending Earnings", connect:"Connect Wallet", verify:"Verify with 0.05 GRAM (TON)", withdrawTitle:"Withdraw ANKH", min:"Min 10,000 ANKH, Fee 5%" },
    ar: { mining:"التعدين", store:"المتجر", list:"القائمة", friends:"الأصدقاء", wallet:"المحفظة", coin:"عملة عنخ", start:"ابدأ التعدين", active:"جاري التعدين... 0.77/ساعة", level:"المستوى", refTitle:"برنامج الإحالة", refDesc:"ادعو أصدقائك واربح 5% من تعدينهم مدى الحياة!", info:"أصدقاؤك يحتفظون بـ 100% من أرباحهم. تحصل على 5% كمكافأة من النظام.", copy:"نسخ الرابط", share:"مشاركة على تيليجرام", code:"كود الإحالة الخاص بك", invited:"الأصدقاء المدعوون", pending:"الأرباح المعلقة", connect:"ربط المحفظة", verify:"التحقق بـ 0.05 GRAM", withdrawTitle:"سحب ANKH", min:"الحد الأدنى 10,000، عمولة 5%" },
    ru: { mining:"Майнинг", store:"Магазин", list:"Список", friends:"Друзья", wallet:"Кошелек", coin:"ANKH КОИН", start:"НАЧАТЬ МАЙНИНГ", active:"Майнинг... 0.77/ч", level:"Уровень", refTitle:"Реферальная программа", refDesc:"Приглашайте друзей и получайте 5% от их майнинга навсегда!", info:"Ваши друзья сохраняют 100% заработка. Вы получаете 5% бонусом от системы.", copy:"Копировать ссылку", share:"Поделиться в Telegram", code:"Ваш реферальный код", invited:"Приглашенные", pending:"Ожидающий доход", connect:"Подключить кошелек", verify:"Верификация 0.05 GRAM", withdrawTitle:"Вывести ANKH", min:"Мин 10,000, комиссия 5%" },
  }[lang];

  const handleMine = () => {
    setIsMining(true);
    setTimeout(() => {
      setBalance(b => b + 0.77);
      setWalletBal(w => {
        const nw = w + 0.77;
        if (Math.floor(nw / 15) > level) setLevel(Math.floor(nw / 15));
        return nw;
      });
      setIsMining(false);
    }, 1500);
  };

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-[#050505] text-white pb-28">
      <div className="flex gap-2 p-4">
        {["EN","AR","RU"].map(l => (
          <button key={l} onClick={()=>setLang(l.toLowerCase() as any)} className={`px-4 py-1.5 rounded-full text-xs font-black border ${lang===l.toLowerCase() ? "bg-[#FACC15] text-black border-[#FACC15]" : "bg-[#1A1A1A] text-white/50 border-white/10"}`}>{l}</button>
        ))}
      </div>

      <div className="p-4">
        {tab==="mining" && (
          <div className="flex flex-col items-center mt-6">
            <div className="w-52 h-52 rounded-full bg-gradient-to-b from-[#FACC15] to-[#854D0E] flex items-center justify-center text-8xl shadow-[0_0_80px_rgba(250,204,21,0.35)]">☥</div>
            <h2 className="mt-8 text-[#FACC15] font-bold tracking-[0.3em] text-xs">{t.coin}</h2>
            <h1 className="text-5xl font-black mt-2">{balance.toFixed(2)}</h1>
            <p className="text-white/40 mt-2 text-sm">{t.level} {level}/500 • 0.77/h • Wallet {walletBal.toFixed(2)}</p>
            <button onClick={handleMine} disabled={isMining} className="mt-8 w-full max-w-sm bg-[#FACC15] text-black font-black py-5 rounded-2xl text-lg active:scale-95 transition">{isMining ? t.active : t.start}</button>
          </div>
        )}

        {tab==="friends" && (
          <div className="bg-[#111] border border-[#FACC15]/20 rounded-[24px] p-5">
            <h2 className="text-xl font-black text-[#FACC15]">{t.refTitle}</h2>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">{t.refDesc}</p>
            <div className="mt-4 bg-[#FACC15]/10 border border-[#FACC15]/20 rounded-xl p-3 text-xs text-[#FACC15]">ℹ️ {t.info}</div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button onClick={()=>navigator.clipboard.writeText(`https://t.me/ANKH_Mining_bot?start=${refCode}`)} className="bg-[#FACC15] text-black font-bold py-3.5 rounded-xl">📋 {t.copy}</button>
              <button onClick={()=>window.open(`https://t.me/share/url?url=https://t.me/ANKH_Mining_bot?start=${refCode}`)} className="bg-[#1c1c1c] border border-[#FACC15]/30 text-[#FACC15] font-bold py-3.5 rounded-xl">✈️ {t.share}</button>
            </div>
            <div className="mt-5 bg-black rounded-xl p-4 border border-white/10">
              <p className="text-xs text-white/40">{t.code}</p>
              <p className="text-lg font-mono font-bold tracking-widest text-[#FACC15] mt-1">{refCode}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-black rounded-xl p-4 border border-white/10"><p className="text-xs text-white/40">{t.invited}</p><p className="text-2xl font-black mt-1">0</p></div>
              <div className="bg-black rounded-xl p-4 border border-white/10"><p className="text-xs text-white/40">{t.pending}</p><p className="text-2xl font-black mt-1 text-[#FACC15]">+0.00</p></div>
            </div>
          </div>
        )}

        {tab==="wallet" && (
          <div className="bg-[#111] border border-[#FACC15]/20 rounded-[24px] p-5">
            <h2 className="text-xl font-black">{t.wallet}</h2>
            {!connected ? (
              <button onClick={()=>setShowWallets(true)} className="mt-6 w-full bg-[#FACC15] text-black font-black py-4 rounded-xl">{t.connect}</button>
            ) : (
              <div className="mt-4">
                <p className="text-xs text-white/40">Connected</p>
                <p className="font-mono text-sm text-[#FACC15] mt-1">UQDl...{refCode.slice(-4)} ✓</p>
                <div className="flex gap-2 mt-3"><button onClick={()=>setConnected(false)} className="text-xs bg-white/10 px-3 py-2 rounded-lg">Disconnect</button><button onClick={()=>setShowWallets(true)} className="text-xs bg-white/10 px-3 py-2 rounded-lg">Change</button></div>
                {!verified ? <button onClick={()=>setVerified(true)} className="mt-6 w-full border border-[#FACC15] text-[#FACC15] font-bold py-3.5 rounded-xl">{t.verify}</button> : <p className="mt-4 text-green-400 font-bold text-sm">✓ Verified</p>}
              </div>
            )}
            <div className="mt-8">
              <p className="font-bold">{t.withdrawTitle}</p>
              <p className="text-xs text-white/40 mt-1">{t.min}</p>
              <input value={withdraw} onChange={e=>setWithdraw(e.target.value)} placeholder="0.00" className="mt-3 w-full bg-black border border-white/10 rounded-xl p-4 outline-none focus:border-[#FACC15]" />
              <div className="grid grid-cols-4 gap-2 mt-3">{["25%","50%","75%","100%"].map(p=><button key={p} onClick={()=>setWithdraw(String(walletBal * parseInt(p)/100))} className="bg-white/10 text-xs py-2 rounded-lg">{p}</button>)}</div>
              <button className="mt-4 w-full bg-[#FACC15]/20 text-[#FACC15] font-black py-4 rounded-xl border border-[#FACC15]/30">Withdraw</button>
            </div>
          </div>
        )}

        {tab==="store" && (
          <div className="bg-[#111] border border-[#FACC15]/20 rounded-[24px] p-5">
            <h2 className="text-xl font-black text-[#FACC15]">Store - Boosters</h2>
            <div className="mt-4 grid gap-3">{[{n:"1.5x Booster",p:"1000 ANKH"},{n:"2x Booster",p:"2500 ANKH"},{n:"3x Booster",p:"5000 ANKH"}].map(b=><div key={b.n} className="bg-black border border-white/10 rounded-xl p-4 flex justify-between items-center"><div><p className="font-bold">{b.n}</p><p className="text-xs text-white/40">{b.p}</p></div><button className="bg-[#FACC15] text-black font-bold px-5 py-2 rounded-lg text-sm">Buy</button></div>)}</div>
          </div>
        )}

        {tab==="list" && (
          <div className="bg-[#111] border border-[#FACC15]/20 rounded-[24px] p-5">
            <h2 className="text-xl font-black text-[#FACC15]">Staking List</h2>
            <div className="mt-4 grid gap-3">{[{d:"30 Days",apr:"12%"},{d:"90 Days",apr:"25%"},{d:"120 Days",apr:"40%"}].map(s=><div key={s.d} className="bg-black border border-white/10 rounded-xl p-4 flex justify-between"><p className="font-bold">{s.d}</p><p className="text-[#FACC15] font-bold">{s.apr} APR</p></div>)}</div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-[#FACC15]/20 flex justify-around py-3 pb-6">
        {[{id:"mining",l:t.mining,i:"⛏️"},{id:"store",l:t.store,i:"🛒"},{id:"list",l:t.list,i:"📋"},{id:"friends",l:t.friends,i:"👥"},{id:"wallet",l:t.wallet,i:"💼"}].map(m=>(
          <button key={m.id} onClick={()=>setTab(m.id)} className={`flex flex-col items-center ${tab===m.id?"text-[#FACC15]":"text-white/40"}`}><span className="text-xl">{m.i}</span><span className="text-[10px] font-bold mt-1">{m.l}</span></button>
        ))}
      </div>

      {showWallets && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end p-0">
          <div className="bg-[#111] w-full rounded-t-[28px] p-6 border-t border-[#FACC15]/20">
            <h3 className="font-black mb-4">Select Wallet</h3>
            <button onClick={()=>{setConnected(true); setShowWallets(false)}} className="w-full bg-[#0098EA] text-white font-bold py-4 rounded-xl">Tonkeeper</button>
            <button onClick={()=>{setConnected(true); setShowWallets(false)}} className="mt-3 w-full bg-white/10 font-bold py-4 rounded-xl">MyTon Wallet</button>
            <button onClick={()=>setShowWallets(false)} className="mt-3 w-full text-white/40 py-2 text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
