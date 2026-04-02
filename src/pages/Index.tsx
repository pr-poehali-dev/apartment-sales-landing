import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/ff62651b-514e-4491-abec-2d8d18580b86.jpg";
const INTERIOR_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/e101fbce-007a-43df-abe6-eded46fdaf5f.jpg";
const AERIAL_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/55c3775b-6e92-4c76-87c5-cbf307f05d5b.jpg";

const plans = [
  { type: "Студия", area: "28–34 м²", price: "6,2 млн", monthly: "от 42 900 ₽/мес", tag: null, img: INTERIOR_IMAGE },
  { type: "1-комнатная", area: "38–48 м²", price: "7,8 млн", monthly: "от 54 100 ₽/мес", tag: "Хит", img: HERO_IMAGE },
  { type: "2-комнатная", area: "56–72 м²", price: "10,4 млн", monthly: "от 72 300 ₽/мес", tag: null, img: AERIAL_IMAGE },
  { type: "3-комнатная", area: "82–96 м²", price: "14,2 млн", monthly: "от 99 500 ₽/мес", tag: "Последние", img: HERO_IMAGE },
];

const advantages = [
  { icon: "Trees", title: "100 м до леса", desc: "Единственный ЖК в черте города с прямым выходом в лесопарк" },
  { icon: "Wind", title: "Чистый воздух", desc: "Минус PM2.5 в 3 раза ниже городской нормы — подтверждено замерами" },
  { icon: "Shield", title: "Закрытый двор", desc: "КПП, видеонаблюдение 24/7 — никаких чужих во дворе" },
  { icon: "Sun", title: "Сдача декабрь 2025", desc: "Готовность 85% — въедете через 6 месяцев, не через 3 года" },
  { icon: "Building2", title: "Панорамное остекление", desc: "Окна от пола до потолка — лес в каждой комнате как живая картина" },
  { icon: "BadgePercent", title: "Ипотека 0,1%", desc: "Платёж как аренда — от 42 900 ₽/мес при взносе всего 15%" },
];

const reviews = [
  { name: "Анна С.", date: "Март 2024", text: "Просыпаемся под пение птиц. Это другой уровень жизни в городе — не ожидала такого от Ижевска.", stars: 5 },
  { name: "Дмитрий И.", date: "Январь 2024", text: "Вид на лес с 15 этажа бесценен. Всё как на рендерах, даже лучше. Ни о чём не жалею.", stars: 5 },
  { name: "Елена Т.", date: "Февраль 2024", text: "Объездили все новостройки Ижевска — выбрали здесь. Менеджеры помогли с ипотекой за один день.", stars: 5 },
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
      { threshold: 0.08 }
    );
    document.querySelectorAll(".aos").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#0e1a0f] font-body text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(14,26,15,0.97) 70%, transparent)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#4a9c52] flex items-center justify-center">
            <Icon name="Trees" size={13} className="text-white" />
          </div>
          <span className="font-heading text-white text-lg tracking-tight">Дом природы</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
          {["#advantages","#plans","#location","#form"].map((href, i) => (
            <a key={href} href={href} className="hover:text-white transition-colors">
              {["Преимущества","Планировки","Локация","Контакты"][i]}
            </a>
          ))}
        </div>
        <a href="tel:+73412000000"
          className="flex items-center gap-2 bg-[#4a9c52] hover:bg-[#3d8644] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
          <Icon name="Phone" size={13} />
          Позвонить
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, rgba(14,26,15,0.95) 0%, rgba(14,26,15,0.75) 55%, rgba(14,26,15,0.35) 100%)"
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-28 pb-16">
          <div className="inline-flex items-center gap-3 bg-red-950/60 border border-red-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-red-200 text-sm">Скидка 150 000 ₽ — осталось</span>
            <span className="text-white font-mono font-bold text-sm tracking-wider">
              {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
            </span>
          </div>

          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl md:text-[72px] font-light leading-[1.0] mb-5">
              Квартира<br />
              у <em className="italic text-[#6abf74]">леса</em><br />
              от 6,2 млн ₽
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {[
                { icon: "Target",      u: "Конкретно",  text: "28–96 м² в Ижевске. Сдача декабрь 2025" },
                { icon: "Zap",         u: "Срочно",     text: "Скидка 150 000 ₽ только до конца недели" },
                { icon: "Star",        u: "Уникально",  text: "Единственный ЖК в 100 м от городского леса" },
                { icon: "TrendingUp",  u: "Выгодно",    text: "Ипотека 0,1% — платёж от 42 900 ₽/мес" },
              ].map((u) => (
                <div key={u.u} className="flex items-start gap-2.5 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                  <Icon name={u.icon} size={14} className="text-[#6abf74] mt-0.5 flex-shrink-0" />
                  <p className="text-white/75 text-sm leading-snug">
                    <span className="text-[#6abf74] font-semibold">{u.u}:</span> {u.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#form"
                className="bg-[#4a9c52] hover:bg-[#3d8644] text-white font-semibold px-8 py-4 rounded-full text-center transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4a9c52]/40">
                Получить каталог с ценами →
              </a>
              <a href="tel:+73412000000"
                className="border border-white/25 text-white hover:bg-white/8 font-semibold px-8 py-4 rounded-full text-center transition-all flex items-center justify-center gap-2">
                <Icon name="Phone" size={16} />
                +7 (3412) 00-00-00
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { n: "127", l: "квартир продано" },
              { n: "4,9★", l: "рейтинг застройщика" },
              { n: "100 м", l: "до городского леса" },
              { n: "15", l: "банков-партнёров" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-heading text-2xl text-white">{s.n}</p>
                <p className="text-white/40 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ── ПРЕИМУЩЕСТВА ── */}
      <section id="advantages" className="py-20 bg-[#111c12]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 aos" style={{ opacity: 0 }}>
            <div>
              <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-2">Почему здесь</p>
              <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight">
                6 причин выбрать<br />
                <em className="italic text-[#6abf74]">Дом природы</em>
              </h2>
            </div>
            <a href="#form" className="text-[#6abf74] text-sm hover:text-white transition-colors flex items-center gap-1 flex-shrink-0">
              Получить консультацию <Icon name="ArrowRight" size={14} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((adv, i) => (
              <div
                key={adv.title}
                className="aos group p-6 rounded-2xl border border-[#4a9c52]/15 hover:border-[#4a9c52]/50 bg-[#0e1a0f] hover:bg-[#141f15] transition-all duration-300 hover:-translate-y-0.5"
                style={{ opacity: 0, transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#4a9c52]/15 group-hover:bg-[#4a9c52]/30 flex items-center justify-center mb-4 transition-colors">
                  <Icon name={adv.icon} size={18} className="text-[#6abf74]" />
                </div>
                <h3 className="font-heading text-lg text-white mb-1.5">{adv.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПЛАНИРОВКИ ── */}
      <section id="plans" className="py-20 bg-[#0e1a0f]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-2">Выберите своё</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light">
              Планировки <em className="italic text-[#6abf74]">и цены</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {plans.map((p, i) => (
              <div
                key={p.type}
                className="aos relative rounded-2xl overflow-hidden border border-[#4a9c52]/20 hover:border-[#4a9c52]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#4a9c52]/15 bg-[#111c12] group"
                style={{ opacity: 0, transitionDelay: `${i * 0.1}s` }}
              >
                {p.tag && (
                  <div className="absolute z-10 top-3 left-3 bg-[#4a9c52] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {p.tag}
                  </div>
                )}
                <div className="h-36 overflow-hidden relative">
                  <img src={p.img} alt={p.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111c12] to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-0.5">
                    <h3 className="font-heading text-xl text-white">{p.type}</h3>
                    <span className="text-white/35 text-xs">{p.area}</span>
                  </div>
                  <p className="text-[#6abf74] font-semibold text-xl mb-0.5">{p.price} ₽</p>
                  <p className="text-white/35 text-xs mb-4">{p.monthly}</p>
                  <a href="#form"
                    className="block text-center bg-[#4a9c52]/10 hover:bg-[#4a9c52] border border-[#4a9c52]/30 hover:border-[#4a9c52] text-[#6abf74] hover:text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300">
                    Узнать детали
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="aos rounded-2xl bg-[#1a2e1b] border border-[#4a9c52]/25 p-7 flex flex-col md:flex-row items-center justify-between gap-5" style={{ opacity: 0 }}>
            <div>
              <p className="font-heading text-xl mb-1">Ипотека одобрена за <span className="text-[#6abf74]">24 часа</span></p>
              <p className="text-white/45 text-sm">15 банков-партнёров · Взнос от 15% · Без справок о доходах</p>
            </div>
            <a href="#form" className="flex-shrink-0 bg-[#4a9c52] hover:bg-[#3d8644] text-white font-semibold px-7 py-3.5 rounded-full transition-colors whitespace-nowrap">
              Рассчитать ипотеку →
            </a>
          </div>
        </div>
      </section>

      {/* ── ГАЛЕРЕЯ ── */}
      <section className="py-20 bg-[#111c12]">
        <div className="container mx-auto px-6">
          <div className="mb-10 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-2">Фото</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light">Галерея <em className="italic text-[#6abf74]">комплекса</em></h2>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="aos col-span-12 md:col-span-7 rounded-2xl overflow-hidden h-72 md:h-96 relative group" style={{ opacity: 0 }}>
              <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-4 left-5 font-heading text-lg">Фасад комплекса</p>
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
              {[{ src: INTERIOR_IMAGE, label: "Интерьер квартиры" }, { src: AERIAL_IMAGE, label: "Вид с высоты" }].map((item, i) => (
                <div key={item.label} className="aos rounded-2xl overflow-hidden h-44 relative group" style={{ opacity: 0, transitionDelay: `${i * 0.1}s` }}>
                  <img src={item.src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-3 left-4 font-heading text-base">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ЛОКАЦИЯ ── */}
      <section id="location" className="py-20 bg-[#0e1a0f]">
        <div className="container mx-auto px-6">
          <div className="mb-10 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-2">Где находимся</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light">Удобная <em className="italic text-[#6abf74]">локация</em></h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="aos" style={{ opacity: 0 }}>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: "GraduationCap", n: "3", l: "школы" },
                  { icon: "Baby", n: "4", l: "д/сада" },
                  { icon: "ShoppingCart", n: "8 мин", l: "до магазинов" },
                  { icon: "TreePine", n: "100 м", l: "до парка" },
                  { icon: "Car", n: "20 мин", l: "до центра" },
                  { icon: "Dumbbell", n: "500 м", l: "фитнес" },
                ].map((item) => (
                  <div key={item.l} className="bg-[#111c12] border border-[#4a9c52]/15 rounded-xl p-4 text-center">
                    <Icon name={item.icon} size={18} className="text-[#6abf74] mx-auto mb-2" />
                    <p className="font-heading text-lg text-white">{item.n}</p>
                    <p className="text-white/35 text-xs">{item.l}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#111c12] border border-[#4a9c52]/20 rounded-xl p-5">
                <p className="text-[#6abf74] text-xs font-semibold uppercase tracking-wide mb-1">Адрес офиса продаж</p>
                <p className="font-heading text-lg mb-1">Ижевск, ул. Лесная, 14</p>
                <p className="text-white/40 text-sm">Ежедневно с 9:00 до 21:00</p>
              </div>
            </div>
            <div className="aos rounded-2xl overflow-hidden h-80 border border-[#4a9c52]/20" style={{ opacity: 0 }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=53.230759%2C56.852678&z=14&l=map"
                width="100%" height="100%" frameBorder="0" title="Карта"
                className="w-full h-full grayscale opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ── */}
      <section className="py-20 bg-[#111c12]">
        <div className="container mx-auto px-6">
          <div className="mb-10 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-2">Люди говорят</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light">Отзывы <em className="italic text-[#6abf74]">жителей</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div key={r.name} className="aos bg-[#0e1a0f] border border-[#4a9c52]/15 rounded-2xl p-6" style={{ opacity: 0, transitionDelay: `${i * 0.1}s` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/65 text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4a9c52]/20 flex items-center justify-center">
                    <Icon name="User" size={14} className="text-[#6abf74]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{r.name}</p>
                    <p className="text-white/30 text-xs">{r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ФОРМА ── */}
      <section id="form" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={AERIAL_IMAGE} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(14,26,15,0.94)" }} />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aos" style={{ opacity: 0 }}>
              <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-3">Бесплатно</p>
              <h2 className="font-heading text-4xl md:text-5xl font-light mb-5">
                Получите каталог<br />
                <em className="italic text-[#6abf74]">прямо сейчас</em>
              </h2>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                Пришлём актуальные планировки, цены и условия ипотеки — без навязчивых звонков, сразу в мессенджер
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (3412) 00-00-00" },
                  { icon: "MapPin", label: "Офис продаж", val: "ул. Лесная, 14, Ижевск" },
                  { icon: "Clock", label: "Режим работы", val: "Ежедневно 9:00–21:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#4a9c52]/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={15} className="text-[#6abf74]" />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs">{c.label}</p>
                      <p className="text-white text-sm font-medium">{c.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                {["WhatsApp", "Telegram", "ВКонтакте"].map((m) => (
                  <a key={m} href="#"
                    className="flex-1 text-center py-2.5 bg-white/5 hover:bg-[#4a9c52]/20 border border-white/10 hover:border-[#4a9c52]/40 text-white/60 hover:text-white text-xs font-medium rounded-xl transition-all">
                    {m}
                  </a>
                ))}
              </div>
            </div>

            <div className="aos" style={{ opacity: 0 }}>
              {sent ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#4a9c52]/20 border border-[#4a9c52]/40 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon name="CheckCircle" size={28} className="text-[#6abf74]" />
                  </div>
                  <p className="font-heading text-2xl mb-2">Ждите звонка!</p>
                  <p className="text-white/45 text-sm">Менеджер свяжется в течение 15 минут</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="bg-[#111c12]/80 backdrop-blur-md border border-[#4a9c52]/20 rounded-3xl p-8 space-y-4"
                >
                  <h3 className="font-heading text-2xl mb-1">Оставить заявку</h3>
                  <p className="text-white/40 text-sm !mt-1 !mb-4">Ответим за 15 минут</p>
                  <input type="text" placeholder="Ваше имя" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} required
                    className="w-full bg-white/5 border border-white/10 focus:border-[#4a9c52]/60 outline-none rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm transition-colors" />
                  <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} required
                    className="w-full bg-white/5 border border-white/10 focus:border-[#4a9c52]/60 outline-none rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm transition-colors" />
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white/50 text-sm focus:border-[#4a9c52]/60 outline-none">
                    <option value="">Тип квартиры...</option>
                    {plans.map((p) => (
                      <option key={p.type} className="bg-[#111c12]">{p.type} — {p.price} ₽</option>
                    ))}
                  </select>
                  <button type="submit"
                    className="w-full bg-[#4a9c52] hover:bg-[#3d8644] text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#4a9c52]/30">
                    Получить каталог и цены →
                  </button>
                  <p className="text-white/20 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070f08] py-8 border-t border-white/5">
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
