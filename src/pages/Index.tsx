import { useState } from "react";
import Icon from "@/components/ui/icon";

const TEACHER_PHOTO = "https://cdn.poehali.dev/projects/f14221c8-8d91-4120-a58f-3071713058e2/files/717f820e-930e-4d5a-b474-7ed816c78046.jpg";

const NAV_LINKS = [
  { label: "Обо мне", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Тест", href: "#test" },
  { label: "Контакты", href: "#contact" },
];

const SERVICES = [
  {
    icon: "User",
    title: "Индивидуальные занятия",
    desc: "Персональная программа под ваши цели и темп. Полное внимание преподавателя.",
    price: "от 2 500 ₽/час",
  },
  {
    icon: "Users",
    title: "Корпоративное обучение",
    desc: "Деловой английский для сотрудников компании. Переговоры, переписка, презентации.",
    price: "от 4 000 ₽/час",
  },
  {
    icon: "GraduationCap",
    title: "Подготовка к экзаменам",
    desc: "IELTS, TOEFL, ЕГЭ. Проверенная методика с гарантированным результатом.",
    price: "от 3 000 ₽/час",
  },
  {
    icon: "BookOpen",
    title: "Разговорный клуб",
    desc: "Живая практика в малых группах до 4 человек. Актуальные темы и дискуссии.",
    price: "от 1 200 ₽/занятие",
  },
];

const REVIEWS = [
  {
    name: "Мария Козлова",
    role: "Менеджер по экспортным продажам",
    text: "За 6 месяцев занятий с Еленой я перешла с уровня B1 на C1. Теперь веду переговоры с зарубежными партнёрами без переводчика.",
    rating: 5,
  },
  {
    name: "Дмитрий Орлов",
    role: "Студент, поступил в University of Edinburgh",
    text: "Подготовка к IELTS с нуля до 7.5 за 4 месяца. Методика Елены действительно работает — структурированно, без воды.",
    rating: 5,
  },
  {
    name: "Анна Петрова",
    role: "HR-директор, IT-компания",
    text: "Организовала корпоративное обучение для команды из 12 человек. Все отметили профессионализм и живую подачу материала.",
    rating: 5,
  },
];

const TEST_QUESTIONS = [
  {
    question: "She ___ to London three times this year.",
    options: ["went", "has gone", "goes", "had gone"],
    correct: 1,
  },
  {
    question: "If I ___ you, I would apologize immediately.",
    options: ["am", "was", "were", "be"],
    correct: 2,
  },
  {
    question: "The report must ___ before Friday.",
    options: ["submit", "be submitted", "submitted", "submitting"],
    correct: 1,
  },
  {
    question: "He's been working here ___ 2015.",
    options: ["for", "since", "during", "from"],
    correct: 1,
  },
  {
    question: "Despite ___ hard, he failed the exam.",
    options: ["study", "to study", "studying", "studied"],
    correct: 2,
  },
  {
    question: "By the time we arrived, they ___ dinner.",
    options: ["finished", "have finished", "had finished", "were finishing"],
    correct: 2,
  },
];

const getLevelInfo = (score: number) => {
  if (score <= 1) return { level: "A1 — Beginner", desc: "Начальный уровень. Рекомендую курс с нуля.", color: "text-red-500" };
  if (score <= 2) return { level: "A2 — Elementary", desc: "Базовые знания. Хорошая основа для роста.", color: "text-orange-500" };
  if (score <= 3) return { level: "B1 — Intermediate", desc: "Средний уровень. Уверенное общение в быту.", color: "text-yellow-600" };
  if (score <= 4) return { level: "B2 — Upper-Intermediate", desc: "Хороший уровень. Готовы к деловому общению.", color: "text-blue-600" };
  if (score <= 5) return { level: "C1 — Advanced", desc: "Высокий уровень. Профессиональное владение.", color: "text-green-600" };
  return { level: "C2 — Proficiency", desc: "Свободное владение. Уровень носителя языка.", color: "text-emerald-700" };
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testDone, setTestDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setTimeout(() => {
      const newAnswers = [...answers, idx];
      setAnswers(newAnswers);
      setSelected(null);
      if (currentQ + 1 >= TEST_QUESTIONS.length) {
        setTestDone(true);
      } else {
        setCurrentQ(currentQ + 1);
      }
    }, 500);
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentQ(0);
    setAnswers([]);
    setTestDone(false);
    setSelected(null);
  };

  const score = answers.filter((a, i) => a === TEST_QUESTIONS[i].correct).length;
  const levelInfo = getLevelInfo(score);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-golos bg-white text-navy-900 min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-sm border-b border-gold-500/20">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-cormorant text-xl font-semibold text-white tracking-wide">
            Elina <span className="text-gold-400">Moore</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm text-navy-200 hover:text-gold-400 transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:block bg-gold-500 text-navy-950 text-sm font-semibold px-5 py-2 hover:bg-gold-400 transition-colors duration-200"
          >
            Записаться
          </button>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-navy-950 border-t border-gold-500/20 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-navy-200 hover:text-gold-400 transition-colors py-1"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-navy-950 overflow-hidden pt-16">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,149,42,0.3) 40px, rgba(201,149,42,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,149,42,0.3) 40px, rgba(201,149,42,0.3) 41px)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 border border-gold-500/40 text-gold-400 text-xs tracking-widest uppercase px-4 py-2 mb-8">
              <Icon name="Star" size={12} />
              Преподаватель с 12-летним опытом
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Английский язык<br />
              <span className="text-gold-400 italic">без компромиссов</span>
            </h1>
            <p className="text-navy-300 text-lg leading-relaxed mb-10 max-w-md">
              Индивидуальный подход, академическая строгость и живые результаты — от делового общения до IELTS 7.5+
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#contact")}
                className="bg-gold-500 text-navy-950 font-semibold px-8 py-4 hover:bg-gold-400 transition-all duration-200 text-sm tracking-wide"
              >
                Записаться на пробный урок
              </button>
              <button
                onClick={() => scrollTo("#test")}
                className="border border-gold-500/50 text-gold-400 font-semibold px-8 py-4 hover:border-gold-400 hover:text-gold-300 transition-all duration-200 text-sm tracking-wide"
              >
                Проверить уровень
              </button>
            </div>
          </div>
          <div className="relative animate-fade-in hidden md:block">
            <div className="absolute inset-0 border border-gold-500/20 translate-x-4 translate-y-4" />
            <img
              src={TEACHER_PHOTO}
              alt="Елена Смирнова"
              className="relative w-full h-[560px] object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950 to-transparent h-32" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Лет преподавательского опыта", value: "12+" },
            { label: "Студентов обучено", value: "340+" },
            { label: "Сдали IELTS на 7.0+", value: "94%" },
            { label: "Занятий проведено", value: "5 000+" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-cormorant text-4xl font-bold text-gold-400 mb-2">{item.value}</div>
              <div className="text-navy-300 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-full h-[480px] bg-navy-100 relative overflow-hidden">
              <img src={TEACHER_PHOTO} alt="О преподавателе" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-6 left-6 bg-navy-950 text-white px-6 py-4">
                <div className="font-cormorant text-2xl font-semibold">Элина Мур</div>
                <div className="text-gold-400 text-sm mt-1">M.A. Linguistics, CELTA Certified</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-gold-500 text-xs tracking-widest uppercase mb-4 font-semibold">— Обо мне</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-navy-950 mb-6 leading-tight">
              Академическая база.<br /><span className="italic text-navy-700">Живые результаты.</span>
            </h2>
            <p className="text-navy-600 leading-relaxed mb-5">
              Выпускница Московского государственного лингвистического университета по специальности «Теория и методика преподавания иностранных языков». Сертифицированный преподаватель CELTA (Cambridge).
            </p>
            <p className="text-navy-600 leading-relaxed mb-8">
              12 лет практики — от детей до топ-менеджеров международных компаний. Регулярно прохожу профессиональную переподготовку в British Council и участвую в международных конференциях по методике преподавания.
            </p>
            <div className="space-y-3">
              {[
                "CELTA (Cambridge University Press)",
                "IELTS Chief Examiner, British Council",
                "Преподаватель кафедры МГЛУ (2015–2020)",
                "Автор курса «Business English Pro»",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={12} className="text-gold-600" />
                  </div>
                  <span className="text-navy-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-navy-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-gold-500 text-xs tracking-widest uppercase mb-4 font-semibold">— Услуги</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-navy-950">Форматы обучения</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-navy-100 p-8 hover:border-gold-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-navy-950 flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                  <Icon name={s.icon as "User"} size={22} className="text-white" />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-navy-950 mb-3">{s.title}</h3>
                <p className="text-navy-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                  <span className="text-gold-600 font-semibold text-sm">{s.price}</span>
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="text-navy-950 text-sm font-medium flex items-center gap-1 hover:text-gold-600 transition-colors"
                  >
                    Записаться <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-navy-950 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-gold-400 text-xs tracking-widest uppercase mb-4 font-semibold">— Портфолио</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold">Результаты студентов</h2>
            <p className="text-navy-300 mt-4 max-w-xl mx-auto">Реальные истории реальных людей — от первого урока до достижения цели</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Алексей Н.", from: "A2", to: "B2", goal: "Переезд в Германию", time: "8 месяцев" },
              { name: "Ирина К.", from: "B1", to: "C1", goal: "IELTS 7.5 — магистратура в UK", time: "5 месяцев" },
              { name: "Сергей В.", from: "B2", to: "C1", goal: "Деловые переговоры", time: "4 месяца" },
              { name: "Наталья Р.", from: "A1", to: "B1", goal: "Работа в международной компании", time: "10 месяцев" },
              { name: "Команда TechStart", from: "A2-B1", to: "B2", goal: "Корпоративное обучение (15 чел.)", time: "6 месяцев" },
              { name: "Михаил Т.", from: "B1", to: "B2+", goal: "ЕГЭ 94 балла", time: "7 месяцев" },
            ].map((c) => (
              <div
                key={c.name}
                className="border border-white/10 p-6 hover:border-gold-400/50 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gold-500/20 flex items-center justify-center">
                    <Icon name="User" size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="text-navy-400 text-xs">{c.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-white/10 text-white text-xs px-3 py-1 font-mono">{c.from}</span>
                  <Icon name="ArrowRight" size={14} className="text-gold-400" />
                  <span className="bg-gold-500/20 text-gold-400 text-xs px-3 py-1 font-mono font-bold">{c.to}</span>
                </div>
                <p className="text-navy-300 text-sm">{c.goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-gold-500 text-xs tracking-widest uppercase mb-4 font-semibold">— Отзывы</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-navy-950">Что говорят студенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-navy-50 p-8 border border-navy-100 relative">
                <div className="font-cormorant text-6xl text-gold-400/30 font-bold absolute top-4 left-6 leading-none">"</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-navy-700 text-sm leading-relaxed mb-6 relative z-10">«{r.text}»</p>
                <div className="border-t border-navy-200 pt-4">
                  <div className="font-semibold text-navy-950 text-sm">{r.name}</div>
                  <div className="text-navy-400 text-xs mt-1">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE TEST */}
      <section id="test" className="py-24 bg-navy-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-gold-500 text-xs tracking-widest uppercase mb-4 font-semibold">— Онлайн-тест</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-navy-950 mb-4">
              Узнайте свой уровень английского
            </h2>
            <p className="text-navy-500">6 вопросов · 3 минуты · Мгновенный результат</p>
          </div>

          <div className="bg-white border border-navy-100 p-8 md:p-12">
            {!testStarted && !testDone && (
              <div className="text-center">
                <div className="w-20 h-20 bg-navy-950 flex items-center justify-center mx-auto mb-8">
                  <Icon name="BookOpen" size={36} className="text-gold-400" />
                </div>
                <h3 className="font-cormorant text-3xl font-bold text-navy-950 mb-4">Готовы проверить себя?</h3>
                <p className="text-navy-500 mb-8 max-w-md mx-auto">
                  Тест поможет определить ваш уровень от A1 до C2 и подобрать подходящую программу обучения.
                </p>
                <button
                  onClick={() => setTestStarted(true)}
                  className="bg-navy-950 text-white font-semibold px-10 py-4 hover:bg-navy-800 transition-colors duration-200 text-sm tracking-wide"
                >
                  Начать тест
                </button>
              </div>
            )}

            {testStarted && !testDone && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-navy-400 text-sm">Вопрос {currentQ + 1} из {TEST_QUESTIONS.length}</span>
                  <div className="flex gap-1">
                    {TEST_QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-8 transition-colors duration-300 ${
                          i < currentQ ? "bg-gold-500" : i === currentQ ? "bg-navy-950" : "bg-navy-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-navy-950 mb-8">
                  {TEST_QUESTIONS[currentQ].question}
                </h3>
                <div className="space-y-3">
                  {TEST_QUESTIONS[currentQ].options.map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => selected === null && handleAnswer(idx)}
                      className={`w-full text-left px-6 py-4 border text-sm transition-all duration-200 ${
                        selected === null
                          ? "border-navy-200 hover:border-navy-950 hover:bg-navy-50"
                          : selected === idx
                          ? idx === TEST_QUESTIONS[currentQ].correct
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-red-400 bg-red-50 text-red-700"
                          : idx === TEST_QUESTIONS[currentQ].correct && selected !== null
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-navy-200 text-navy-400"
                      }`}
                    >
                      <span className="font-mono text-xs mr-3 opacity-60">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {testDone && (
              <div className="text-center">
                <div className="w-20 h-20 bg-navy-950 flex items-center justify-center mx-auto mb-8">
                  <Icon name="Award" size={36} className="text-gold-400" />
                </div>
                <div className="text-navy-400 text-sm mb-2">Ваш результат: {score} из {TEST_QUESTIONS.length}</div>
                <h3 className={`font-cormorant text-4xl font-bold mb-3 ${levelInfo.color}`}>{levelInfo.level}</h3>
                <p className="text-navy-600 mb-8">{levelInfo.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="bg-navy-950 text-white font-semibold px-8 py-4 hover:bg-navy-800 transition-colors text-sm"
                  >
                    Записаться на занятие
                  </button>
                  <button
                    onClick={resetTest}
                    className="border border-navy-300 text-navy-600 font-semibold px-8 py-4 hover:border-navy-950 transition-colors text-sm"
                  >
                    Пройти снова
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-navy-950 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <div className="text-gold-400 text-xs tracking-widest uppercase mb-4 font-semibold">— Контакты</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Начнём ваш<br />
              <span className="text-gold-400 italic">первый урок?</span>
            </h2>
            <p className="text-navy-300 leading-relaxed mb-10">
              Первое занятие — бесплатно. Мы определим ваш уровень, обсудим цели и подберём оптимальный формат работы.
            </p>
            <div className="space-y-4">
              {[
                { icon: "Mail", text: "elina.moore@english-pro.ru" },
                { icon: "Phone", text: "+7 (495) 123-45-67" },
                { icon: "MessageCircle", text: "Telegram: @elena_english" },
                { icon: "Clock", text: "Пн–Пт: 9:00–21:00, Сб: 10:00–18:00" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon as "Mail"} size={16} className="text-gold-400" />
                  </div>
                  <span className="text-navy-200 text-sm">{c.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-navy-300 text-xs mb-2 tracking-wide uppercase">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-navy-500"
                />
              </div>
              <div>
                <label className="block text-navy-300 text-xs mb-2 tracking-wide uppercase">Телефон или Email</label>
                <input
                  type="text"
                  placeholder="+7 (000) 000-00-00"
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-navy-500"
                />
              </div>
              <div>
                <label className="block text-navy-300 text-xs mb-2 tracking-wide uppercase">Цель обучения</label>
                <select className="w-full bg-navy-900 border border-white/10 text-navy-300 px-5 py-4 text-sm focus:outline-none focus:border-gold-400 transition-colors">
                  <option value="">Выберите цель</option>
                  <option>Деловой английский</option>
                  <option>Подготовка к IELTS / TOEFL</option>
                  <option>Разговорная практика</option>
                  <option>Подготовка к ЕГЭ</option>
                  <option>Корпоративное обучение</option>
                </select>
              </div>
              <div>
                <label className="block text-navy-300 text-xs mb-2 tracking-wide uppercase">Сообщение (необязательно)</label>
                <textarea
                  rows={3}
                  placeholder="Ваш текущий уровень, пожелания по расписанию..."
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:outline-none focus:border-gold-400 transition-colors placeholder:text-navy-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold-500 text-navy-950 font-semibold py-4 hover:bg-gold-400 transition-colors duration-200 text-sm tracking-wide"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-950 border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-lg text-navy-400">
            Elina <span className="text-gold-500">Moore</span> · English Teacher
          </span>
          <span className="text-navy-600 text-xs">© 2024 Все права защищены</span>
        </div>
      </footer>
    </div>
  );
}