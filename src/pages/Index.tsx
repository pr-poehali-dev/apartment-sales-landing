import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/ff62651b-514e-4491-abec-2d8d18580b86.jpg";
const INTERIOR_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/e101fbce-007a-43df-abe6-eded46fdaf5f.jpg";
const AERIAL_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/55c3775b-6e92-4c76-87c5-cbf307f05d5b.jpg";

const plans = [
  {
    type: "Студия",
    area: "28–34 м²",
    price: "6,2 млн ₽",
    monthly: "42 900 ₽/мес",
    tag: null,
    img: INTERIOR_IMAGE,
  },
  {
    type: "1-комнатная",
    area: "38–48 м²",
    price: "7,8 млн ₽",
    monthly: "54 100 ₽/мес",
    tag: "Хит",
    img: HERO_IMAGE,
  },
  {
    type: "2-комнатная",
    area: "56–72 м²",
    price: "10,4 млн ₽",
    monthly: "72 300 ₽/мес",
    tag: null,
    img: AERIAL_IMAGE,
  },
];

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [sent, setSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 47, s: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 5; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".aos").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#0e1a0f] font-body text-white overflow-x-hidden">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(14,26,15,0.95), transparent)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#4a9c52] flex items-center justify-center">
            <Icon name="Trees" size={14} className="text-white" />
          </div>
          <span className="font-heading text-white text-lg tracking-tight">Дом природы</span>
        </div>
        <a href="tel:+73412000000"
          className="flex items-center gap-2 bg-[#4a9c52] hover:bg-[#3d8644] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
          <Icon name="Phone" size={14} />
          Позвонить
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, rgba(14,26,15,0.92) 0%, rgba(14,26,15,0.7) 60%, rgba(14,26,15,0.4) 100%)"
          }} />
        </div>

        {/* Таймер urgency */}
        <div className="relative z-10 container mx-auto px-6 pt-28 pb-16">
          <div className="inline-flex items-center gap-3 bg-red-900/40 border border-red-500/40 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-200 text-sm">Акция заканчивается через</span>
            <span className="text-white font-mono font-bold text-sm">
              {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
            </span>
          </div>

          {/* 4U ОФФЕР */}
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl md:text-7xl font-light leading-[1.0] mb-6">
              Квартира<br />
              у <em className="italic text-[#6abf74]">леса</em><br />
              от 6,2 млн
            </h1>

            {/* 4U блоки */}
            <div className="space-y-3 mb-10">
              {[
                { icon: "Target", label: "Конкретно:", text: "28–96 м² в Ижевске, сдача декабрь 2025" },
                { icon: "Zap", label: "Срочно:", text: "Скидка 150 000 ₽ — только до конца недели" },
                { icon: "Star", label: "Уникально:", text: "Единственный ЖК в 100 м от городского леса" },
                { icon: "TrendingUp", label: "Выгодно:", text: "Ипотека 0,1% — платёж от 42 900 ₽/мес" },
              ].map((u) => (
                <div key={u.label} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4a9c52]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={u.icon} size={11} className="text-[#6abf74]" />
                  </div>
                  <p className="text-white/80 text-sm leading-snug">
                    <span className="text-[#6abf74] font-semibold">{u.label}</span> {u.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#form"
                className="bg-[#4a9c52] hover:bg-[#3d8644] text-white font-semibold px-8 py-4 rounded-full text-center transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#4a9c52]/40">
                Получить каталог и цены →
              </a>
              <a href="tel:+73412000000"
                className="border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-center transition-all flex items-center justify-center gap-2">
                <Icon name="Phone" size={16} />
                +7 (3412) 00-00-00
              </a>
            </div>
          </div>

          {/* Соц. доказательства */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              { n: "127", l: "квартир продано" },
              { n: "4,9★", l: "рейтинг застройщика" },
              { n: "100 м", l: "до городского леса" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-heading text-2xl text-white">{s.n}</p>
                <p className="text-white/50 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ─── 3 ОФФЕРА ─── */}
      <section className="py-20 bg-[#111c12]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-3">Почему выбирают нас</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light">
              3 причины купить<br />
              <em className="italic text-[#6abf74]">сейчас, а не потом</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: "01",
                title: "Сэкономьте 150 000 ₽ прямо сейчас",
                body: "Только до конца этой недели — максимальная скидка на готовые квартиры. После — цена вырастет согласно графику застройщика.",
                icon: "BadgePercent",
                urgent: true,
              },
              {
                num: "02",
                title: "Единственный ЖК у леса в черте города",
                body: "Никаких промзон и трасс — 360 га Ижевского леса за окном. Такого больше нет. Аналогов в радиусе 5 км не существует.",
                icon: "Trees",
                urgent: false,
              },
              {
                num: "03",
                title: "Платёж как аренда — от 42 900 ₽/мес",
                body: "Ипотека 0,1% от застройщика. Первоначальный взнос от 15%. Одобрение за 24 часа — начните жить в своём, а не чужом.",
                icon: "TrendingDown",
                urgent: false,
              },
            ].map((card, i) => (
              <div
                key={card.num}
                className="aos relative rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  opacity: 0,
                  transitionDelay: `${i * 0.12}s`,
                  background: card.urgent ? "linear-gradient(135deg, #1a0a0a, #1f1010)" : "#161f17",
                  borderColor: card.urgent ? "rgba(220,80,80,0.3)" : "rgba(74,156,82,0.2)",
                }}
              >
                {card.urgent && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Горит
                  </div>
                )}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: card.urgent ? "rgba(220,80,80,0.15)" : "rgba(74,156,82,0.15)" }}>
                  <Icon name={card.icon} size={20} className={card.urgent ? "text-red-400" : "text-[#6abf74]"} />
                </div>
                <p className="text-white/20 font-heading text-5xl font-light absolute top-6 right-6">{card.num}</p>
                <h3 className="font-heading text-xl font-medium text-white mb-3 leading-snug">{card.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ПЛАНИРОВКИ ─── */}
      <section id="plans" className="py-20 bg-[#0e1a0f]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-3">Выберите своё</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light">
              Планировки<br />
              <em className="italic text-[#6abf74]">и ипотека</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {plans.map((p, i) => (
              <div
                key={p.type}
                className="aos rounded-2xl overflow-hidden border border-[#4a9c52]/20 hover:border-[#4a9c52]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#4a9c52]/10 bg-[#111c12] group"
                style={{ opacity: 0, transitionDelay: `${i * 0.1}s` }}
              >
                {p.tag && (
                  <div className="absolute z-10 top-3 left-3 bg-[#4a9c52] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {p.tag}
                  </div>
                )}
                <div className="relative h-44 overflow-hidden">
                  <img src={p.img} alt={p.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111c12] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-end justify-between mb-1">
                    <h3 className="font-heading text-2xl text-white">{p.type}</h3>
                    <span className="text-white/40 text-sm">{p.area}</span>
                  </div>
                  <p className="text-[#6abf74] font-semibold text-xl mb-1">{p.price}</p>
                  <p className="text-white/40 text-xs mb-5">Ипотека: {p.monthly}</p>
                  <a href="#form"
                    className="block text-center bg-[#4a9c52]/15 hover:bg-[#4a9c52] border border-[#4a9c52]/40 hover:border-[#4a9c52] text-[#6abf74] hover:text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300">
                    Узнать детали
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="aos text-center bg-[#1a2e1b] border border-[#4a9c52]/30 rounded-2xl p-8" style={{ opacity: 0 }}>
            <p className="font-heading text-2xl mb-2">Ипотека одобрена за <span className="text-[#6abf74]">24 часа</span></p>
            <p className="text-white/50 text-sm mb-6">Работаем с 15 банками. Первоначальный взнос от 15%.</p>
            <a href="#form" className="inline-flex items-center gap-2 bg-[#4a9c52] hover:bg-[#3d8644] text-white font-semibold px-8 py-3.5 rounded-full transition-colors">
              Рассчитать ипотеку бесплатно →
            </a>
          </div>
        </div>
      </section>

      {/* ─── ФОРМА ─── */}
      <section id="form" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={AERIAL_IMAGE} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(14,26,15,0.93)" }} />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center mb-10 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-3">Бесплатно</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light mb-4">
              Получите каталог<br />
              <em className="italic text-[#6abf74]">за 1 минуту</em>
            </h2>
            <p className="text-white/55 text-sm">
              Пришлём актуальные планировки, цены и условия ипотеки — без звонков, сразу в мессенджер
            </p>
          </div>

          <div className="max-w-md mx-auto aos" style={{ opacity: 0 }}>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#4a9c52]/20 border border-[#4a9c52]/40 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircle" size={28} className="text-[#6abf74]" />
                </div>
                <p className="font-heading text-2xl mb-2">Отлично! Ждите звонка</p>
                <p className="text-white/50 text-sm">Менеджер свяжется в течение 15 минут</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="bg-[#111c12]/80 backdrop-blur-md border border-[#4a9c52]/20 rounded-3xl p-8 space-y-4"
              >
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-[#4a9c52]/60 outline-none rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm transition-colors"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-[#4a9c52]/60 outline-none rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm transition-colors"
                />
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white/60 text-sm focus:border-[#4a9c52]/60 outline-none">
                  <option value="">Тип квартиры...</option>
                  <option className="bg-[#111c12]">Студия от 6,2 млн</option>
                  <option className="bg-[#111c12]">1-комнатная от 7,8 млн</option>
                  <option className="bg-[#111c12]">2-комнатная от 10,4 млн</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-[#4a9c52] hover:bg-[#3d8644] text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#4a9c52]/30"
                >
                  Получить каталог и цены →
                </button>
                <p className="text-white/25 text-xs text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}

            {/* Контакт */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <a href="tel:+73412000000" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                <Icon name="Phone" size={15} />
                +7 (3412) 00-00-00
              </a>
              <span className="text-white/20">·</span>
              <span className="text-white/50">Ежедневно 9:00–21:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#070f08] py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#4a9c52] flex items-center justify-center">
              <Icon name="Trees" size={10} className="text-white" />
            </div>
            <span className="text-white/50">ЖК «Дом Природы» · Ижевск</span>
          </div>
          <p>© 2025 ООО «СтройИнвест». Проектная декларация на сайте наш-жк.рф</p>
        </div>
      </footer>
    </div>
  );
}
