import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/ff62651b-514e-4491-abec-2d8d18580b86.jpg";
const INTERIOR_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/e101fbce-007a-43df-abe6-eded46fdaf5f.jpg";
const AERIAL_IMAGE = "https://cdn.poehali.dev/projects/390503b6-790b-41a7-931c-e08b69d937fc/files/55c3775b-6e92-4c76-87c5-cbf307f05d5b.jpg";

const advantages = [
  { icon: "Trees", title: "Парк прямо у дома", desc: "Живописный парк и зелёные зоны в шаговой доступности — природа становится частью вашей жизни каждый день." },
  { icon: "Wind", title: "Чистый воздух", desc: "Жилой комплекс окружён лесопарковой зоной. Никакого городского смога — только свежий воздух и тишина." },
  { icon: "Leaf", title: "Eco-инфраструктура", desc: "Зелёные дворы, велодорожки, зоны отдыха — всё создано для активной и здоровой жизни на природе." },
  { icon: "Shield", title: "Безопасная территория", desc: "Закрытый охраняемый двор, видеонаблюдение 24/7, консьерж — полный покой для вас и вашей семьи." },
  { icon: "Building2", title: "Комфорт-класс", desc: "Продуманные планировки, качественные отделочные материалы, панорамное остекление от пола до потолка." },
  { icon: "MapPin", title: "Развитая инфраструктура", desc: "Школы, детские сады, магазины и ТЦ — всё необходимое рядом. Удобный выезд на основные магистрали." },
];

const plans = [
  { type: "Студия", area: "28–34 м²", price: "от 6,2 млн ₽", floor: "2–14 этаж", features: ["Панорамные окна", "Чистовая отделка"], badge: null },
  { type: "1-комнатная", area: "38–48 м²", price: "от 7,8 млн ₽", floor: "2–20 этаж", features: ["Гардеробная комната", "Балкон с видом на парк"], badge: "Хит продаж" },
  { type: "2-комнатная", area: "56–72 м²", price: "от 10,4 млн ₽", floor: "3–20 этаж", features: ["Мастер-спальня", "Лоджия 8 м²"], badge: null },
  { type: "3-комнатная", area: "82–96 м²", price: "от 14,2 млн ₽", floor: "5–20 этаж", features: ["Две ванные комнаты", "Панорама леса"], badge: "Последние" },
];

const reviews = [
  { name: "Анна Соколова", date: "Март 2024", text: "Переехали полгода назад. Просыпаемся под пение птиц, дышим настоящим лесным воздухом. Дети обожают гулять в парке прямо у дома. Это совсем другой уровень жизни в городе!", stars: 5 },
  { name: "Дмитрий Иванов", date: "Январь 2024", text: "Купили двушку на 15 этаже. Вид на лес — бесценен. Застройщик не обманул: всё как на рендерах, даже лучше. Планировка очень удобная, потолки высокие.", stars: 5 },
  { name: "Елена Тимофеева", date: "Февраль 2024", text: "Долго выбирали, объездили все новостройки Ижевска. ЖК Дом Природы выиграл по всем параметрам. Менеджеры очень внимательные, помогли с ипотекой.", stars: 5 },
];

const infra = [
  { icon: "GraduationCap", label: "Школы", count: "3 школы" },
  { icon: "Baby", label: "Детские сады", count: "4 д/сада" },
  { icon: "ShoppingCart", label: "Магазины", count: "8 минут" },
  { icon: "Dumbbell", label: "Фитнес", count: "500 м" },
  { icon: "TreePine", label: "Парк", count: "у дома" },
  { icon: "Car", label: "До центра", count: "20 минут" },
];

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-nature-200/50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-nature-600 rounded-full flex items-center justify-center">
              <Icon name="Trees" size={16} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-semibold text-nature-900 leading-none text-lg">Дом природы</p>
              <p className="text-[10px] text-nature-600 tracking-widest uppercase">жилой комплекс · ижевск</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-nature-700 font-body">
            <a href="#advantages" className="hover:text-nature-500 transition-colors">Преимущества</a>
            <a href="#plans" className="hover:text-nature-500 transition-colors">Планировки</a>
            <a href="#gallery" className="hover:text-nature-500 transition-colors">Галерея</a>
            <a href="#contacts" className="hover:text-nature-500 transition-colors">Контакты</a>
          </div>
          <a href="tel:+73412000000" className="btn-primary !py-2.5 !px-6 text-sm">
            Позвонить
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 nature-gradient opacity-75" />
        <div className="absolute inset-0 leaf-pattern" />

        <div className="absolute top-24 right-10 text-white/10 text-[180px] leading-none animate-leaf-sway pointer-events-none select-none">
          🌿
        </div>
        <div className="absolute bottom-20 left-6 text-white/8 text-[120px] leading-none animate-leaf-sway pointer-events-none select-none" style={{ animationDelay: "2s" }}>
          🍃
        </div>

        <div className="relative container mx-auto px-6 pt-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-fade-up" style={{ opacity: 0 }}>
              <Icon name="MapPin" size={14} />
              Ижевск · Сдача 2025
            </div>

            <h1 className="font-heading text-6xl md:text-8xl font-light text-white leading-[0.95] mb-6 text-shadow-nature animate-fade-up" style={{ opacity: 0, animationDelay: "0.1s" }}>
              Живи<br />
              <em className="italic font-medium">среди</em><br />
              природы
            </h1>

            <p className="text-white/85 text-xl md:text-2xl font-light leading-relaxed mb-4 animate-fade-up" style={{ opacity: 0, animationDelay: "0.25s" }}>
              ЖК «Дом Природы» — квартиры комфорт-класса<br className="hidden md:block" /> в окружении парков и зелёных зон Ижевска
            </p>

            <p className="text-white/70 text-base mb-10 animate-fade-up" style={{ opacity: 0, animationDelay: "0.35s" }}>
              Цены от <span className="text-white font-semibold text-2xl">6,2 млн ₽</span> · Ипотека от 0,1%
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ opacity: 0, animationDelay: "0.45s" }}>
              <a href="#contacts" className="btn-gold text-center">
                Получить каталог планировок
              </a>
              <a href="tel:+73412000000" className="btn-outline text-center flex items-center justify-center gap-2">
                <Icon name="Phone" size={18} />
                +7 (3412) 00-00-00
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-up" style={{ opacity: 0, animationDelay: "0.6s" }}>
              {[
                { num: "360", unit: "га", label: "Парковой зоны" },
                { num: "20", unit: "мин", label: "До центра города" },
                { num: "2025", unit: "г", label: "Сдача комплекса" },
              ].map((s) => (
                <div key={s.label} className="border-l border-white/25 pl-4">
                  <p className="font-heading text-4xl text-white font-light">
                    {s.num}<span className="text-nature-300 text-2xl">{s.unit}</span>
                  </p>
                  <p className="text-white/65 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="advantages" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nature-300 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="section-tag">
              <Icon name="Leaf" size={14} />
              Почему выбирают нас
            </span>
            <h2 className="font-heading text-5xl md:text-6xl text-nature-900 font-light leading-tight">
              Жизнь в гармонии<br />
              <em className="italic text-nature-600">с природой</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <div
                key={adv.title}
                className="animate-on-scroll group p-8 rounded-2xl border border-nature-100 hover:border-nature-300 hover:shadow-xl hover:shadow-nature-100 transition-all duration-300 hover:-translate-y-1 bg-white"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-nature-100 group-hover:bg-nature-600 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon name={adv.icon} size={22} className="text-nature-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-nature-900 mb-3">{adv.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-24 bg-nature-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="section-tag">
              <Icon name="LayoutGrid" size={14} />
              Варианты квартир
            </span>
            <h2 className="font-heading text-5xl md:text-6xl text-nature-900 font-light">
              Планировки<br />
              <em className="italic text-nature-600">и цены</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {plans.map((plan, i) => (
              <div
                key={plan.type}
                className="animate-on-scroll relative bg-white rounded-2xl overflow-hidden border border-nature-100 hover:border-nature-400 hover:shadow-2xl hover:shadow-nature-200/50 transition-all duration-300 hover:-translate-y-2 group"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {plan.badge && (
                  <div className="absolute top-4 right-4 bg-earth-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                    {plan.badge}
                  </div>
                )}
                <div className="h-40 bg-gradient-to-br from-nature-100 to-nature-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Icon name="Building2" size={80} className="text-nature-600" />
                  </div>
                  <div className="text-center relative z-10">
                    <p className="font-heading text-4xl font-light text-nature-800">{plan.area}</p>
                    <p className="text-nature-600 text-sm">{plan.floor}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-semibold text-nature-900 mb-1">{plan.type}</h3>
                  <p className="text-earth-600 font-semibold text-lg mb-4">{plan.price}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={14} className="text-nature-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contacts" className="btn-primary !py-3 !px-6 text-sm text-center block">
                    Узнать подробнее
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll text-center bg-nature-800 rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute -top-6 -right-6 text-white/5 text-[200px] leading-none pointer-events-none">🌿</div>
            <h3 className="font-heading text-3xl md:text-4xl font-light mb-4">
              Ипотека от <span className="text-nature-300 font-medium">0,1%</span> годовых
            </h3>
            <p className="text-white/70 mb-8 text-lg">Одобрение за 24 часа · Первоначальный взнос от 15%</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contacts" className="btn-gold text-center">Рассчитать ипотеку</a>
              <a href="tel:+73412000000" className="btn-outline text-center">Позвонить менеджеру</a>
            </div>
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="section-tag">
              <Icon name="Images" size={14} />
              Фотографии
            </span>
            <h2 className="font-heading text-5xl md:text-6xl text-nature-900 font-light">
              Галерея<br />
              <em className="italic text-nature-600">комплекса</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="animate-on-scroll md:col-span-7 rounded-2xl overflow-hidden h-96 md:h-[500px] relative group">
              <img src={HERO_IMAGE} alt="ЖК Дом Природы" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-nature-900/20 group-hover:bg-nature-900/10 transition-colors duration-300" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-heading text-xl">Фасад комплекса</p>
                <p className="text-white/70 text-sm">Вид с аллеи</p>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="animate-on-scroll rounded-2xl overflow-hidden h-60 relative group">
                <img src={INTERIOR_IMAGE} alt="Интерьер квартиры" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-nature-900/20 group-hover:bg-nature-900/10 transition-colors" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-heading text-lg">Интерьер квартиры</p>
                </div>
              </div>
              <div className="animate-on-scroll rounded-2xl overflow-hidden h-60 relative group">
                <img src={AERIAL_IMAGE} alt="Вид сверху" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-nature-900/20 group-hover:bg-nature-900/10 transition-colors" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-heading text-lg">Вид с высоты</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-24 bg-nature-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="section-tag">
              <Icon name="MapPin" size={14} />
              Расположение
            </span>
            <h2 className="font-heading text-5xl md:text-6xl text-nature-900 font-light">
              Удобная<br />
              <em className="italic text-nature-600">локация</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {infra.map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-5 text-center border border-nature-100 hover:border-nature-300 hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 bg-nature-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon name={item.icon} size={20} className="text-nature-600" />
                    </div>
                    <p className="font-heading text-xl font-semibold text-nature-800">{item.count}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-nature-800 text-white rounded-2xl p-6">
                <p className="font-heading text-lg mb-2">📍 Адрес: Ижевск, ул. Лесная, 14</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  ЖК расположен в экологически чистом районе города, в непосредственной близости от Ижевского пруда и центрального парка.
                </p>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="rounded-2xl overflow-hidden h-80 md:h-96 border border-nature-200 shadow-lg">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=53.230759%2C56.852678&z=14&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Карта ЖК Дом Природы"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <span className="section-tag">
              <Icon name="Star" size={14} />
              Отзывы жителей
            </span>
            <h2 className="font-heading text-5xl md:text-6xl text-nature-900 font-light">
              Говорят<br />
              <em className="italic text-nature-600">наши жители</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <div
                key={rev.name}
                className="animate-on-scroll bg-nature-50 rounded-2xl p-8 border border-nature-100 hover:border-nature-300 hover:shadow-xl transition-all duration-300"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rev.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={16} className="text-earth-400 fill-earth-400" />
                  ))}
                </div>
                <p className="text-nature-800 leading-relaxed mb-6 text-sm">"{rev.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-nature-200 rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} className="text-nature-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-nature-900 text-sm">{rev.name}</p>
                    <p className="text-muted-foreground text-xs">{rev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${AERIAL_IMAGE})` }}
        />
        <div className="absolute inset-0 nature-gradient opacity-90" />

        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Icon name="Phone" size={14} />
                Свяжитесь с нами
              </span>
              <h2 className="font-heading text-5xl md:text-6xl text-white font-light text-shadow-nature">
                Получите консультацию<br />
                <em className="italic text-nature-300">бесплатно</em>
              </h2>
              <p className="text-white/75 text-lg mt-4">
                Ответим на все вопросы, подберём квартиру и рассчитаем ипотеку
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-on-scroll glass-card rounded-3xl p-8">
                <h3 className="font-heading text-2xl text-nature-900 mb-6">Оставить заявку</h3>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={32} className="text-nature-600" />
                    </div>
                    <h4 className="font-heading text-xl text-nature-800 mb-2">Заявка принята!</h4>
                    <p className="text-muted-foreground text-sm">Менеджер свяжется с вами в течение 15 минут</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-nature-700 text-sm font-medium mb-1.5 block">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-nature-200 focus:border-nature-500 focus:outline-none focus:ring-2 focus:ring-nature-200 text-nature-900 placeholder-nature-400 bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-nature-700 text-sm font-medium mb-1.5 block">Телефон</label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-nature-200 focus:border-nature-500 focus:outline-none focus:ring-2 focus:ring-nature-200 text-nature-900 placeholder-nature-400 bg-white transition-all"
                      />
                    </div>
                    <select className="w-full px-4 py-3 rounded-xl border border-nature-200 text-nature-700 bg-white focus:border-nature-500 focus:outline-none focus:ring-2 focus:ring-nature-200 transition-all">
                      <option value="">Интересует квартира...</option>
                      <option>Студия от 6,2 млн ₽</option>
                      <option>1-комнатная от 7,8 млн ₽</option>
                      <option>2-комнатная от 10,4 млн ₽</option>
                      <option>3-комнатная от 14,2 млн ₽</option>
                    </select>
                    <button type="submit" className="btn-primary w-full text-center">
                      Получить консультацию →
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                )}
              </div>

              <div className="animate-on-scroll space-y-4">
                <a
                  href="tel:+73412000000"
                  className="glass-card rounded-2xl p-6 flex items-center gap-5 hover:bg-white transition-all duration-300 group cursor-pointer block"
                >
                  <div className="w-14 h-14 bg-nature-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-nature-700 transition-colors">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-nature-600 text-xs font-semibold tracking-wide uppercase mb-0.5">Телефон</p>
                    <p className="font-heading text-2xl text-nature-900">+7 (3412) 00-00-00</p>
                    <p className="text-muted-foreground text-sm">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </a>

                <div className="glass-card rounded-2xl p-6 flex items-center gap-5">
                  <div className="w-14 h-14 bg-earth-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-nature-600 text-xs font-semibold tracking-wide uppercase mb-0.5">Офис продаж</p>
                    <p className="font-heading text-xl text-nature-900">ул. Лесная, 14</p>
                    <p className="text-muted-foreground text-sm">Ижевск, Удмуртская Республика</p>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <p className="text-nature-600 text-xs font-semibold tracking-wide uppercase mb-3">Мессенджеры</p>
                  <div className="flex gap-3">
                    {["WhatsApp", "Telegram", "VK"].map((m) => (
                      <a
                        key={m}
                        href="#"
                        className="flex-1 py-3 bg-nature-100 hover:bg-nature-200 text-nature-700 text-sm font-semibold rounded-xl text-center transition-colors"
                      >
                        {m}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 text-center">
                  <p className="text-nature-800 font-semibold mb-1">🏆 Звонок = подарок</p>
                  <p className="text-muted-foreground text-sm">При звонке сегодня — <strong className="text-earth-600">скидка 50 000 ₽</strong> на любую квартиру</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-nature-950 text-white/60 py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-nature-600 rounded-full flex items-center justify-center">
              <Icon name="Trees" size={12} className="text-white" />
            </div>
            <span className="text-white/80 font-heading">ЖК «Дом Природы»</span>
          </div>
          <p>© 2025 ООО «СтройИнвест». Все права защищены.</p>
          <p>Проектная декларация на сайте наш-жк.рф</p>
        </div>
      </footer>
    </div>
  );
}
