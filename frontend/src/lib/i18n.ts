export type Language = 'az' | 'ru' | 'en';

export const translations = {
  az: {
    nav: { home: 'Ana Səhifə', services: 'Xidmətlər', technology: 'Nümunələr', about: 'Haqqında', contact: 'Əlaqə' },
    hero: { title: 'Gələcəyin Gülüşü', subtitle: 'Rəqəmsal stomatologiyanın ən müasir texnologiyaları ilə ağrısız və estetik müalicə', cta: 'Randevu Al' },
    values: [
      { title: 'Ağrısız Müalicə', desc: 'Lazer texnologiyası ilə ağrısız prosedurlar' },
      { title: 'Rəqəmsal Texnologiya', desc: '3D skan və AI diaqnostika sistemi' },
      { title: 'Estetik Nəticə', desc: 'Rəqəmsal təbəssüm dizaynı' },
      { title: 'Fərdi Yanaşma', desc: 'Hər xəstəyə xüsusi müalicə planı' },
    ],
    services: {
      title: 'Xidmətlərimiz',
      subtitle: 'Müasir stomatologiyanın bütün sahələri',
      items: [
        { title: 'İmplantasiya', desc: 'Ağrısız və sürətli implant əməliyyatları ilə itirilmiş dişlərinizi bərpa edin.' },
        { title: 'Ortodontiya', desc: 'Görünməz breketlər və şəffaf plaklar ilə düzgün diş sırası.' },
        { title: 'Estetik Stomatologiya', desc: 'Veneer, ağartma və gülüş dizaynı ilə mükəmməl təbəssüm.' },
        { title: 'Endodontiya', desc: 'Kök kanalı müalicəsi ilə dişlərinizi qoruyun.' },
        { title: 'Protezləmə', desc: 'Rəqəmsal ölçü ilə mükəmməl uyğun protezlər.' },
        { title: 'Uşaq Stomatologiyası', desc: 'Kiçik xəstələrimiz üçün travmasız müalicə.' },
      ],
    },
    technology: {
      title: 'Müalicə Nümunələri',
      subtitle: 'Əvvəl və sonra nəticələrimiz',
      items: [
        { title: 'İmplant Müalicəsi', desc: 'İtirilmiş dişlərin implant ilə bərpası nümunələri.', stat: '1500+', statLabel: 'Uğurlu əməliyyat' },
        { title: 'Veneer & Gülüş Dizaynı', desc: 'Estetik veneer ilə mükəmməl təbəssüm nəticələri.', stat: '98%', statLabel: 'Məmnuniyyət' },
        { title: 'Ortodontiya', desc: 'Şəffaf plaklar və breketlərlə diş düzəldilməsi.', stat: '12 ay', statLabel: 'Orta müddət' },
        { title: 'Diş Ağartma', desc: 'Peşəkar ağartma ilə parlaq təbəssüm.', stat: '8 ton', statLabel: 'Ağartma' },
      ],
    },
    about: {
      title: 'Dr. İbrahim Abdulla',
      subtitle: 'Peşəkar Stomatoloq',
      bio: 'Dr. İbrahim Abdulla 15 ildən artıq təcrübəyə malik peşəkar stomatoloqdur. Müasir rəqəmsal stomatologiya sahəsində ixtisaslaşaraq, xəstələrinə ən yüksək keyfiyyətli müalicə xidməti göstərir.',
      education: [
        { year: '2008', title: 'Bakı Tibb Universiteti', desc: 'Stomatologiya fakültəsi' },
        { year: '2012', title: 'İstanbul Universiteti', desc: 'İmplantologiya üzrə ixtisaslaşma' },
        { year: '2016', title: 'Berlin Charité', desc: 'Rəqəmsal stomatologiya sertifikatı' },
      ],
      achievements: ['1500+ uğurlu implant', 'Beynəlxalq sertifikatlar', '15+ il təcrübə', '98% xəstə məmnuniyyəti'],
    },
    contact: {
      title: 'Əlaqə',
      subtitle: 'Randevu almaq üçün bizimlə əlaqə saxlayın',
      form: { name: 'Ad, Soyad', phone: 'Telefon', service: 'Xidmət seçin', date: 'Tarix', message: 'Mesaj', submit: 'Göndər' },
      info: { phone: '+994 50 123 45 67', email: 'info@dribrahim.az', address: 'Bakı, Nəsimi rayonu, Nizami küç. 42', hours: 'B.e - Ş: 09:00 - 18:00' },
    },
    footer: { rights: 'Bütün hüquqlar qorunur.', slogan: 'Gələcəyin stomatologiyası, bu gün.' },
  },
  ru: {
    nav: { home: 'Главная', services: 'Услуги', technology: 'Примеры', about: 'О враче', contact: 'Контакт' },
    hero: { title: 'Улыбка Будущего', subtitle: 'Безболезненное и эстетическое лечение с самыми современными технологиями цифровой стоматологии', cta: 'Записаться' },
    values: [
      { title: 'Безболезненное лечение', desc: 'Безболезненные процедуры с лазерной технологией' },
      { title: 'Цифровые технологии', desc: 'Система 3D сканирования и AI диагностики' },
      { title: 'Эстетический результат', desc: 'Цифровой дизайн улыбки' },
      { title: 'Индивидуальный подход', desc: 'Специальный план лечения для каждого пациента' },
    ],
    services: {
      title: 'Наши услуги',
      subtitle: 'Все области современной стоматологии',
      items: [
        { title: 'Имплантация', desc: 'Восстановите утраченные зубы с помощью безболезненных имплантов.' },
        { title: 'Ортодонтия', desc: 'Правильный зубной ряд с невидимыми брекетами.' },
        { title: 'Эстетическая стоматология', desc: 'Идеальная улыбка с винирами и отбеливанием.' },
        { title: 'Эндодонтия', desc: 'Сохраните зубы с лечением корневых каналов.' },
        { title: 'Протезирование', desc: 'Идеально подходящие протезы с цифровыми замерами.' },
        { title: 'Детская стоматология', desc: 'Безтравматическое лечение для маленьких пациентов.' },
      ],
    },
    technology: {
      title: 'Примеры Лечения',
      subtitle: 'Результаты до и после',
      items: [
        { title: 'Имплантация', desc: 'Примеры восстановления утраченных зубов с помощью имплантов.', stat: '1500+', statLabel: 'Успешных операций' },
        { title: 'Виниры и дизайн улыбки', desc: 'Результаты эстетических виниров для идеальной улыбки.', stat: '98%', statLabel: 'Удовлетворённость' },
        { title: 'Ортодонтия', desc: 'Выравнивание зубов с помощью элайнеров и брекетов.', stat: '12 мес', statLabel: 'Средний срок' },
        { title: 'Отбеливание зубов', desc: 'Профессиональное отбеливание для сияющей улыбки.', stat: '8 тонов', statLabel: 'Отбеливание' },
      ],
    },
    about: {
      title: 'Др. Ибрагим Абдулла',
      subtitle: 'Профессиональный стоматолог',
      bio: 'Др. Ибрагим Абдулла — профессиональный стоматолог с более чем 15-летним опытом. Специализируясь в цифровой стоматологии, предоставляет пациентам лечение высочайшего качества.',
      education: [
        { year: '2008', title: 'Бакинский Медицинский Университет', desc: 'Факультет стоматологии' },
        { year: '2012', title: 'Стамбульский Университет', desc: 'Специализация по имплантологии' },
        { year: '2016', title: 'Берлин Шарите', desc: 'Сертификат цифровой стоматологии' },
      ],
      achievements: ['1500+ успешных имплантов', 'Международные сертификаты', '15+ лет опыта', '98% удовлетворённость'],
    },
    contact: {
      title: 'Контакт',
      subtitle: 'Свяжитесь с нами для записи',
      form: { name: 'Имя, Фамилия', phone: 'Телефон', service: 'Выберите услугу', date: 'Дата', message: 'Сообщение', submit: 'Отправить' },
      info: { phone: '+994 50 123 45 67', email: 'info@dribrahim.az', address: 'Баку, Насиминский район, ул. Низами 42', hours: 'Пн - Сб: 09:00 - 18:00' },
    },
    footer: { rights: 'Все права защищены.', slogan: 'Стоматология будущего, сегодня.' },
  },
  en: {
    nav: { home: 'Home', services: 'Services', technology: 'Cases', about: 'About', contact: 'Contact' },
    hero: { title: 'Smile of the Future', subtitle: 'Painless and aesthetic treatment with the most advanced digital dentistry technologies', cta: 'Book Now' },
    values: [
      { title: 'Painless Treatment', desc: 'Painless procedures with laser technology' },
      { title: 'Digital Technology', desc: '3D scanning and AI diagnostics system' },
      { title: 'Aesthetic Results', desc: 'Digital smile design' },
      { title: 'Personal Approach', desc: 'Custom treatment plan for every patient' },
    ],
    services: {
      title: 'Our Services',
      subtitle: 'All areas of modern dentistry',
      items: [
        { title: 'Implantation', desc: 'Restore lost teeth with painless and fast implant procedures.' },
        { title: 'Orthodontics', desc: 'Perfect alignment with invisible braces and clear aligners.' },
        { title: 'Aesthetic Dentistry', desc: 'Perfect smile with veneers, whitening, and smile design.' },
        { title: 'Endodontics', desc: 'Preserve your teeth with root canal treatment.' },
        { title: 'Prosthetics', desc: 'Perfectly fitting prosthetics with digital measurements.' },
        { title: 'Pediatric Dentistry', desc: 'Trauma-free treatment for our youngest patients.' },
      ],
    },
    technology: {
      title: 'Treatment Cases',
      subtitle: 'Before and after results',
      items: [
        { title: 'Implant Treatment', desc: 'Examples of restoring lost teeth with dental implants.', stat: '1500+', statLabel: 'Successful cases' },
        { title: 'Veneers & Smile Design', desc: 'Aesthetic veneer results for a perfect smile.', stat: '98%', statLabel: 'Satisfaction' },
        { title: 'Orthodontics', desc: 'Teeth alignment with clear aligners and braces.', stat: '12 mo', statLabel: 'Avg. duration' },
        { title: 'Teeth Whitening', desc: 'Professional whitening for a brighter smile.', stat: '8 shades', statLabel: 'Whitening' },
      ],
    },
    about: {
      title: 'Dr. Ibrahim Abdulla',
      subtitle: 'Professional Dentist',
      bio: 'Dr. Ibrahim Abdulla is a professional dentist with over 15 years of experience. Specializing in modern digital dentistry, he provides patients with the highest quality treatment.',
      education: [
        { year: '2008', title: 'Baku Medical University', desc: 'Faculty of Dentistry' },
        { year: '2012', title: 'Istanbul University', desc: 'Implantology specialization' },
        { year: '2016', title: 'Berlin Charité', desc: 'Digital dentistry certification' },
      ],
      achievements: ['1500+ successful implants', 'International certifications', '15+ years experience', '98% patient satisfaction'],
    },
    contact: {
      title: 'Contact',
      subtitle: 'Contact us to book an appointment',
      form: { name: 'Full Name', phone: 'Phone', service: 'Select service', date: 'Date', message: 'Message', submit: 'Submit' },
      info: { phone: '+994 50 123 45 67', email: 'info@dribrahim.az', address: 'Baku, Nasimi district, Nizami str. 42', hours: 'Mon - Sat: 09:00 - 18:00' },
    },
    footer: { rights: 'All rights reserved.', slogan: 'The dentistry of the future, today.' },
  },
} as const;
