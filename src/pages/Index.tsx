import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_FACADE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/bucket/98d3ee31-6971-46b7-bc4e-3526535dfeb9.jpg";
const IMG_FOREST_VIEW = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/bucket/3cfed7c1-9510-428c-b616-f6175a750a15.jpg";
const IMG_COURTYARD = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/bucket/ddea32c8-20c2-49f6-a100-2f371a7f3ed5.jpg";

// Расчёт: первый взнос 30%, ставка 5%, срок 15 лет
// PMT = P * i*(1+i)^n / ((1+i)^n - 1)
// 1-комн: остаток 4,34 млн → ~34 300 ₽/мес
// 2-комн: остаток 5,25 млн → ~41 500 ₽/мес
// 3-комн: остаток 6,79 млн → ~53 700 ₽/мес
const IMG_PLAN_1K = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/bucket/764b38ff-052b-4346-989a-41653218f529.png";
const IMG_PLAN_2K = "https://cdn.poehali.dev/files/9d56690f-1d48-426d-b67f-1720623eb635.png";
const IMG_PLAN_3K = "https://cdn.poehali.dev/files/cec1de0a-73e1-4465-96fa-6145dd892946.png";

const plans = [
  { type: "1-комнатная", area: "38–48 м²", price: "от 6,2 млн", tag: null, plan: IMG_PLAN_1K },
  { type: "2-комнатная", area: "56–72 м²", price: "от 7,5 млн", tag: null, plan: IMG_PLAN_2K },
  { type: "3-комнатная", area: "82–96 м²", price: "от 9,7 млн", tag: null, plan: IMG_PLAN_3K },
];

const advantages = [
  { icon: "Trees", title: "Дубовая роща во дворе", desc: "Мы бережно сохранили дубовую рощу — дети растут в тени вековых деревьев, а не асфальта" },
  { icon: "Thermometer", title: "Отопление", desc: "Индивидуальный тепловой пункт. Возможность регулировки температуры воды и отопления. Периметральная разводка труб. Подключение радиаторов — нижнее из стены." },
  { icon: "Volume2", title: "Шумоизоляция", desc: "В квартирах исключено прямое примыкание стяжки пола к монолиту. На полу выложен шумоизоляционный материал. В стыках пола и стены — демпферная лента." },
  { icon: "Gauge", title: "Умные счётчики", desc: "Дистанционный контроль расхода воды и электричества — через приложение, без передачи показаний" },
  { icon: "ArrowUpCircle", title: "Лифты 1,75 м/с", desc: "Два высокоскоростных лифта: грузовой и пассажирский — ни минуты ожидания" },
  { icon: "Shield", title: "Бесключевой доступ", desc: "Аудио- и видеодомофон, доступ к камерам видеонаблюдения, комплексная система безопасности" },
];

interface ModalFormProps {
  onClose: () => void;
  preselect?: string;
}

function ModalForm({ onClose, preselect }: ModalFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", type: preselect || "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(7,15,8,0.85)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-[#111c12] border border-[#4a9c52]/30 rounded-3xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#4a9c52]/20 border border-[#4a9c52]/40 rounded-full flex items-center justify-center mx-auto mb-5">
              <Icon name="CheckCircle" size={28} className="text-[#6abf74]" />
            </div>
            <p className="font-heading text-2xl mb-2">Ждите звонка!</p>
            <p className="text-white/45 text-sm">Менеджер свяжется в течение 15 минут</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <h3 className="font-heading text-2xl mb-0.5">Подберём квартиру под вас</h3>
            <p className="text-white/55 text-sm !mt-1 !mb-1 leading-relaxed">
              Оставьте заявку — менеджер свяжется в течение 15 минут, расскажет об актуальных планировках, ценах и условиях ипотеки. Без навязчивых звонков.
            </p>
            <div className="flex flex-wrap gap-3 !mb-2">
              {["Скидка до 599 880 ₽", "Ипотека от 5%", "Взнос от 10%"].map((badge) => (
                <span key={badge} className="text-[10px] font-semibold text-[#6abf74] bg-[#4a9c52]/10 border border-[#4a9c52]/25 px-2.5 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
            <input type="text" placeholder="Ваше имя" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required
              className="w-full bg-white/5 border border-white/10 focus:border-[#4a9c52]/60 outline-none rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm transition-colors" />
            <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} required
              className="w-full bg-white/5 border border-white/10 focus:border-[#4a9c52]/60 outline-none rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm transition-colors" />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-[#0e1a0f] border border-white/10 rounded-xl px-4 py-3.5 text-white/70 text-sm focus:border-[#4a9c52]/60 outline-none"
            >
              <option value="">Тип квартиры...</option>
              {plans.map((p) => (
                <option key={p.type} className="bg-[#111c12]">{p.type} — {p.price} ₽</option>
              ))}
            </select>
            <button type="submit"
              className="w-full bg-[#4a9c52] hover:bg-[#3d8644] text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#4a9c52]/30">
              Подобрать квартиру →
            </button>
            <p className="text-white/20 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [sent, setSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 47, s: 0 });
  const [modal, setModal] = useState<{ open: boolean; preselect?: string }>({ open: false });
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
  const openModal = (preselect?: string) => setModal({ open: true, preselect });

  return (
    <div className="min-h-screen bg-[#0e1a0f] font-body text-white overflow-x-hidden">

      {modal.open && (
        <ModalForm preselect={modal.preselect} onClose={() => setModal({ open: false })} />
      )}

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
        <a href="tel:+73412970505"
          className="flex items-center gap-2 bg-[#4a9c52] hover:bg-[#3d8644] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
          <Icon name="Phone" size={13} />
          +7 3412 970 505
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_FOREST_VIEW} alt="ЖК Дом природы — вид на лес" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, rgba(14,26,15,0.96) 0%, rgba(14,26,15,0.80) 50%, rgba(14,26,15,0.45) 100%)"
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-28 pb-16">


          <div className="max-w-2xl">
            {/* Заголовок — правка 2 */}
            <h1 className="font-heading text-4xl md:text-[52px] font-light leading-[1.1] mb-5">
              Квартира для семьи у леса<br />
              <em className="italic text-[#6abf74]">в Ижевске от 6,2 млн ₽</em>
            </h1>

            {/* Буллиты — правка 3: без лейблов, просто текст */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {[
                { icon: "BadgePercent", text: "Рассрочка 0% на год. С первоначальным взносом 10%" },
                { icon: "Building2",   text: "Семейная и IT ипотека по ставке 6%" },
                { icon: "Trees",       text: "Единственный ЖК с дубовой рощей во дворе" },
                { icon: "MapPin",      text: "Лучшие туристические места Ижевска в шаговой доступности" },
              ].map((u) => (
                <div key={u.text} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <Icon name={u.icon} size={14} className="text-[#6abf74] mt-0.5 flex-shrink-0" />
                  <p className="text-white/80 text-sm leading-snug">{u.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openModal()}
                className="bg-[#4a9c52] hover:bg-[#3d8644] text-white font-semibold px-8 py-4 rounded-full text-center transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4a9c52]/40">
                Получить каталог с ценами →
              </button>
              <a href="tel:+73412970505"
                className="border border-white/25 text-white hover:bg-white/8 font-semibold px-8 py-4 rounded-full text-center transition-all flex items-center justify-center gap-2">
                <Icon name="Phone" size={16} />
                +7 3412 970 505
              </a>
            </div>
          </div>

          {/* Статистика — правка 4: выделенный блок */}
          <div className="mt-12">
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#4a9c52]/20 rounded-2xl overflow-hidden border border-[#4a9c52]/25">
              {[
                { n: "148", l: "Квартир" },
                { n: "17",  l: "Этажей" },
                { n: "35",  l: "Индивидуальных кладовых" },
                { n: "13",  l: "Уникальных планировок" },
              ].map((s) => (
                <div key={s.l} className="bg-[#111c12]/90 px-6 py-4 text-center">
                  <p className="font-heading text-3xl text-[#6abf74] leading-none">{s.n}</p>
                  <p className="text-white/40 text-xs mt-1 leading-tight">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ── ПРЕИМУЩЕСТВА — правки 5, 6 ── */}
      <section id="advantages" className="py-20 bg-[#111c12]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 aos" style={{ opacity: 0 }}>
            <div>
              <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-2">Почему здесь</p>
              {/* правка 5 */}
              <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight">
                Живите на природе,<br />
                <em className="italic text-[#6abf74]">не теряя связь с городом</em>
              </h2>
            </div>
            {/* правка 6: кнопка «Подобрать квартиру» */}
            <button onClick={() => openModal()} className="text-[#6abf74] text-sm hover:text-white transition-colors flex items-center gap-1 flex-shrink-0">
              Подобрать квартиру <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          {/* правка 6: убрана картинка, 6 карточек 3+3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {advantages.map((adv, i) => (
              <div
                key={adv.title}
                className="aos group p-5 rounded-2xl border border-[#4a9c52]/15 hover:border-[#4a9c52]/50 bg-[#0e1a0f] hover:bg-[#141f15] transition-all duration-300"
                style={{ opacity: 0, transitionDelay: `${i * 0.07}s` }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#4a9c52]/15 group-hover:bg-[#4a9c52]/30 flex items-center justify-center mb-3 transition-colors">
                  <Icon name={adv.icon} size={16} className="text-[#6abf74]" />
                </div>
                <h3 className="font-heading text-base text-white mb-1 leading-snug">{adv.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>

          <div className="aos rounded-2xl bg-[#1a2e1b] border border-[#4a9c52]/20 p-7 text-center" style={{ opacity: 0 }}>
            <p className="font-heading text-xl md:text-2xl font-light text-white/85 leading-relaxed max-w-2xl mx-auto">
              «Здесь не просто живут, а обретают гармонию. Здесь природа становится продолжением жизненного пространства. Здесь жизнь течет, словно ручей после дождя.»
            </p>
            <p className="text-[#6abf74] text-sm mt-3">— Концепция ЖК «Дом природы»</p>
          </div>
        </div>
      </section>

      {/* ── ПЛАНИРОВКИ — правки 7, 8 ── */}
      <section id="plans" className="py-20 bg-[#0e1a0f]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-2">Квартиры в наличии</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light">
              Планировки <em className="italic text-[#6abf74]">и цены</em>
            </h2>
            {/* правка 7: убрана подстрока с 13 планировок */}
          </div>

          {/* правка 7: 3 карточки в ряд, без студии */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                <div className={`h-44 overflow-hidden relative flex items-center justify-center ${p.plan ? "bg-white" : "bg-[#1a2e1b]"}`}>
                  {p.plan ? (
                    <img src={p.plan} alt={`Планировка ${p.type}`}
                      className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700" />
                  ) : (
                    <>
                      <img src={i % 2 === 0 ? IMG_FACADE : IMG_COURTYARD} alt={p.type}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111c12] to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-heading text-3xl text-white/80">{p.area}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl text-white mb-0.5">{p.type}</h3>
                  <p className="text-[#6abf74] font-semibold text-xl mb-4">{p.price} ₽</p>
                  {/* правка 7: «Выбрать квартиру» → открывает модал */}
                  <button
                    onClick={() => openModal(p.type)}
                    className="w-full text-center bg-[#4a9c52]/10 hover:bg-[#4a9c52] border border-[#4a9c52]/30 hover:border-[#4a9c52] text-[#6abf74] hover:text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300">
                    Выбрать квартиру
                  </button>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* правки 9, 10: галерея и отзывы удалены */}

      {/* ── ЛОКАЦИЯ ── */}
      <section id="location" className="py-20 bg-[#111c12]">
        <div className="container mx-auto px-6">
          <div className="mb-10 aos" style={{ opacity: 0 }}>
            <p className="text-[#6abf74] text-sm font-semibold tracking-widest uppercase mb-2">Инфраструктура</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light">Поедем <em className="italic text-[#6abf74]">на природу</em></h2>
            <p className="text-white/40 text-sm mt-2">Ваш комфорт не ограничен стенами — он живёт в гармонии с городом</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="aos" style={{ opacity: 0 }}>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {[
                  { icon: "Trees", n: "0 минут", l: "до живой природы" },
                  { icon: "Footprints", n: "15 минут пешком", l: "до Парка им. Кирова" },
                  { icon: "Waves", n: "15 минут пешком", l: "до Ижевского пруда" },
                ].map((item) => (
                  <div key={item.l} className="bg-[#0e1a0f] border border-[#4a9c52]/15 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#4a9c52]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={17} className="text-[#6abf74]" />
                    </div>
                    <div>
                      <p className="font-heading text-lg text-white leading-none">{item.n}</p>
                      <p className="text-white/35 text-xs">{item.l}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#0e1a0f] border border-[#4a9c52]/20 rounded-xl p-5">
                <p className="text-[#6abf74] text-xs font-semibold uppercase tracking-wide mb-1">Офис продаж</p>
                <p className="font-heading text-lg mb-0.5">Ижевск, Дом природы</p>
                <p className="text-white/40 text-sm">Пн–Пт: 9:00–19:00 · Сб: 10:00–16:00 · Вс: выходной</p>
                <p className="text-white/40 text-sm">+7 3412 970 505</p>
              </div>
            </div>
            <div className="aos rounded-2xl overflow-hidden border border-[#4a9c52]/20" style={{ opacity: 0, height: "320px" }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=53.1758%2C56.8800&z=16&l=map&pt=53.1758,56.8800,pm2rdl"
                width="100%" height="100%" frameBorder="0" title="Карта"
                className="w-full h-full grayscale opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070f08] pt-12 pb-8 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 rounded-full bg-[#4a9c52] flex items-center justify-center">
              <Icon name="Trees" size={10} className="text-white" />
            </div>
            <span className="text-white/50 text-sm">ЖК «Дом природы» · Ижевск</span>
          </div>

          <div className="mb-6 text-white/30 text-xs leading-relaxed space-y-2">
            <p>Застройщик ООО СЗ КВАРТАЛ, 426000 Удмуртская Республика, Город Ижевск, Улица Максима Горького дом 152 офис 2, ОГРН 1211800007847. Приведенные планировки не являются точной копией проектной документации. Проектная декларация размещена на сайте наш.дом.рф. Не оферта. Реклама.</p>
            <p>Данный сайт носит исключительно информационный характер. Визуализации объектов, планировочные решения, фасады, элементы благоустройства, а также цены и условия покупки не являются публичной офертой (ст. 437 ГК РФ). Застройщик ООО СЗ КВАРТАЛ оставляет за собой право вносить изменения в проектную документацию в соответствии с действующим законодательством.</p>
          </div>

          <details className="mb-4 group">
            <summary className="text-white/40 text-xs cursor-pointer hover:text-white/60 transition-colors select-none list-none flex items-center gap-2">
              <Icon name="ChevronDown" size={14} className="group-open:rotate-180 transition-transform" />
              Дисклеймеры
            </summary>
            <div className="mt-3 space-y-3 text-white/20 text-xs leading-relaxed">
              <p>ЖК «Дом Природы». Застройщик: ООО «СЗ КВАРТАЛ». ОГРН 1211800007847. Предложение действует на квартиры № 2-5 и 6-7. Квартиры доступны в рассрочку без увеличения стоимости (при соблюдении условий рассрочки). Рассрочка предоставляется застройщиком без участия банка. Первоначальный взнос — от 10% стоимости квартиры. Срок рассрочки — до 1 года. Условия рассрочки, график платежей и иные существенные условия определяются договором участия в долевом строительстве. Изображения и планировки носят информационный характер и не являются точной копией проектной документации. Проектная декларация размещена на сайте наш.дом.рф. Количество квартир ограничено. Не является публичной офертой. Реклама.</p>
              <p>ЖК «Дом Природы». Застройщик: ООО «СЗ КВАРТАЛ». ОГРН 1211800007847. Предложение действует на квартиры № 6-9 и 6-4. Квартиры доступны в рассрочку без увеличения стоимости (при соблюдении условий рассрочки). Рассрочка предоставляется застройщиком без участия банка. Первоначальный взнос — от 20% стоимости квартиры. Срок рассрочки — до 01.11.2027. Условия рассрочки, график платежей и иные существенные условия определяются договором участия в долевом строительстве. Изображения и планировки носят информационный характер и не являются точной копией проектной документации. Проектная декларация размещена на сайте наш.дом.рф. Количество квартир ограничено. Не является публичной офертой. Реклама.</p>
              <p>ЖК «Дом Природы». Застройщик: ООО «СЗ «Квартал». ОГРН 1211800007847. Предложение действует на квартиры планировки 3А на 6 и 7 этажах. Ставка от 5% годовых на весь срок кредитования по программам «Семейная ипотека» и «ИТ-ипотека» (при соблюдении условий программ). Банковские услуги оказывает ПАО «Сбербанк». Ставка может быть снижена за счет субсидирования застройщиком. Полная стоимость кредита (займа): от 2,631% до 13,364% годовых. Первоначальный взнос — от 30,1%. Сумма кредита — в соответствии с условиями программы. Срок кредита — до 30 лет. Подробности на сайте банка: https://www.sberbank.ru/ru/person/credits/home/family. Предложение действует при бронировании квартиры до 30.04.2026 и оформлении сделки в течение 7 дней с даты бронирования. Проектная декларация размещена на сайте наш.дом.рф. Количество квартир ограничено. Не является публичной офертой. Реклама.</p>
              <p>ЖК «Дом Природы». Застройщик: ООО «СЗ «Квартал». ОГРН 1211800007847. Все свободные квартиры с процентной ставкой 6% годовых на весь срок кредитования по программам «Семейная ипотека» и «ИТ-ипотека». Банковские услуги оказывает ПАО «Сбербанк». Ставка обеспечивается за счет субсидирования из средств застройщика. Диапазон процентных ставок: от 6,301% до 23,612% годовых. Первоначальный взнос — от 30,1%. Сумма кредита — до 6 000 000 рублей. Срок кредита — до 30 лет. ИЗУЧИТЕ ВСЕ УСЛОВИЯ КРЕДИТА (ЗАЙМА) на официальном сайте ПАО «Сбербанк» https://www.sberbank.ru/ru/person/credits/home/family. Проектная декларация размещена на сайте наш.дом.рф. Количество квартир ограничено. Не является публичной офертой. Реклама.</p>
            </div>
          </details>

          <div className="border-t border-white/5 pt-4 text-white/20 text-xs">
            <p>© 2025 ООО СЗ КВАРТАЛ. ОГРН 1211800007847</p>
          </div>
        </div>
      </footer>
    </div>
  );
}