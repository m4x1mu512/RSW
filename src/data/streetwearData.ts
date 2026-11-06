export interface Product {
  id: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: 't-shirts' | 'hoodies' | 'pants' | 'accessories';
  categoryLabel: string;
  price: number;
  sizes: string[];
  description: string;
  composition: string;
  careInstructions: string;
  deliveryInfo: string;
  imageUrl: string;
  gallery: string[];
  externalShopUrl: string;
  isNew?: boolean;
  featured?: boolean;
  color: string;
  sku: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  city: string;
  foundedYear: number;
  description: string;
  logoText: string;
  logoUrl?: string;
  website: string;
  telegram: string;
  aesthetic: string;
  itemCount?: number;
}

export const BRANDS: Brand[] = [
  {
    id: 'hrdcr',
    name: 'HRDCR',
    slug: 'hrdcr',
    city: 'Санкт-Петербург',
    foundedYear: 2018,
    description: 'Культовый петербургский хардкор-бренд. Суровая нордическая эстетика, плотный тяжелый хлопок, сырые необработанные швы и аутентичный дух андеграундной сцены.',
    logoText: 'HRDCR',
    website: 'https://hrdcr.ru',
    telegram: 'https://t.me/hrdcr_spb',
    aesthetic: 'Хардкор / Нордик Гранж',
  },
  {
    id: 'acolyte',
    name: 'ACOLYTE',
    slug: 'acolyte',
    city: 'Москва',
    foundedYear: 2020,
    description: 'Постапокалиптический киберпанк и футуристичный теквир. Анатомический крой, технологичные мембранные ткани, магнитная фурнитура Fidlock и модульные карманы.',
    logoText: 'ACOLYTE',
    website: 'https://acolyte.tech',
    telegram: 'https://t.me/acolyte_lab',
    aesthetic: 'Киберпанк / Теквир',
  },
  {
    id: 'molotov',
    name: 'MOLOTOV',
    slug: 'molotov',
    city: 'Пермь',
    foundedYear: 2015,
    description: 'Уральский уличный бренд с крепким сибирским характером. Утилитарный крой, надежные ткани повышенной плотности и честное независимое производство.',
    logoText: 'MOLOTOV',
    website: 'https://molotov.ru',
    telegram: 'https://t.me/molotov_streetwear',
    aesthetic: 'Утилитарный / Херитейдж',
  },
  {
    id: 'yalta-94',
    name: 'YALTA 94',
    slug: 'yalta-94',
    city: 'Ялта',
    foundedYear: 2021,
    description: 'Ностальгический постсоветский прибрежный рейв. Тяжелый вываренный хлопок, кислотные варки, архивные шрифты и кастомная ручная шелкография.',
    logoText: 'YALTA 94',
    website: 'https://yalta94.com',
    telegram: 'https://t.me/yalta94_club',
    aesthetic: 'Рейв 90-х / Винтаж',
  },
  {
    id: 'die-young',
    name: 'die young',
    slug: 'die-young',
    city: 'Екатеринбург',
    foundedYear: 2019,
    description: 'Мрачный уральский романтизм, деконструкция и DIY-подход. Лимитированные тиражи, сложные графические коллажи и бескомпромиссный оверсайз.',
    logoText: 'die young',
    website: 'https://dieyoung.store',
    telegram: 'https://t.me/dieyoung_ekb',
    aesthetic: 'Мрачный романтизм / DIY',
  },
  {
    id: 'volchok',
    name: 'ВОЛЧОК',
    slug: 'volchok',
    city: 'Москва',
    foundedYear: 2014,
    description: 'Первопроходцы новой волны российского стритвира. Мрачные смыслы, фольклорные аллюзии, готическая графика и узнаваемый манифест поколения.',
    logoText: 'ВОЛЧОК',
    website: 'https://volchok.ru',
    telegram: 'https://t.me/volchokclothing',
    aesthetic: 'Русская готика / Новая Волна',
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'Все категории' },
  { id: 't-shirts', label: 'Футболки' },
  { id: 'hoodies', label: 'Худи и свитшоты' },
  { id: 'pants', label: 'Брюки и карго' },
  { id: 'accessories', label: 'Аксессуары' },
] as const;

export const SIZES = ['S', 'M', 'L', 'XL', 'One Size'] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'hrdcr-untamed-tee',
    name: 'Футболка Oversize «Untamed Heavyweight»',
    brand: 'HRDCR',
    brandSlug: 'hrdcr',
    category: 't-shirts',
    categoryLabel: 'Футболки',
    price: 4900,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Тяжелая оверсайз футболка из плотного хлопка пенье плотностью 280 г/м². Вываренная винтажная текстура Dark Graphite, заниженная линия плеча и шелкографический принт с авторской типографикой. Не садится и держит плотный монументальный силуэт.',
    composition: '100% гребенной хлопок пенье (280 г/м²)',
    careInstructions: 'Стирка при 30°C на деликатном режиме наизнанку. Не сушить в барабане. Гладить с изнаночной стороны.',
    deliveryInfo: 'Доставка СДЭК до двери или пункта выдачи по всей России (2-4 дня). Самовывоз в Санкт-Петербурге. Бесплатный возврат 14 дней.',
    imageUrl: '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg',
    gallery: [
      '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg',
      '/src/assets/images/hero_streetwear_editorial_1793989864740.jpg'
    ],
    externalShopUrl: 'https://hrdcr.ru/products/untamed-tee',
    isNew: true,
    featured: true,
    color: 'Washed Graphite',
    sku: 'HRD-24-TEE-01'
  },
  {
    id: 'acolyte-studio-hoodie',
    name: 'Худи Boxy Fit «Studio Silence»',
    brand: 'ACOLYTE',
    brandSlug: 'acolyte',
    category: 'hoodies',
    categoryLabel: 'Худи и свитшоты',
    price: 9800,
    sizes: ['M', 'L', 'XL'],
    description: 'Премиальное худи из сверхплотного 3-х ниточного футера с начесом плотностью 460 г/м². Глубокий двойной капюшон с анатомической посадкой, скрытый карман-кенгуру со скрытыми молниями YKK, матовая минималистичная микропечать на груди.',
    composition: '85% хлопок, 15% полиэстер для сохранения геометрии капюшона (460 г/м²)',
    careInstructions: 'Бережная машинная стирка при температуре до 30°C. Избегать отжима выше 600 об/мин.',
    deliveryInfo: 'Курьерская доставка по Москве в день заказа или СДЭК Экспресс по России и СНГ.',
    imageUrl: '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg',
    gallery: [
      '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg',
      '/src/assets/images/hero_streetwear_editorial_1793989864740.jpg'
    ],
    externalShopUrl: 'https://acolyte.tech/shop/studio-silence-hoodie',
    isNew: true,
    featured: true,
    color: 'Pitch Black',
    sku: 'ACL-24-HD-04'
  },
  {
    id: 'acolyte-tactical-cargo',
    name: 'Карго Брюки «Tactical Modular V2»',
    brand: 'ACOLYTE',
    brandSlug: 'acolyte',
    category: 'pants',
    categoryLabel: 'Брюки и карго',
    price: 13500,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Технические брюки-карго из армированного рипстопа с DWR-пропиткой. 8 функциональных карманов, стропы регулировки объема на липучках Velcro, усиленные колени с вытачками для свободы движения и фирменные D-кольца для карабинов.',
    composition: '65% хлопок, 35% износостойкий нейлон Cordura с влагоотталкивающим покрытием',
    careInstructions: 'Ручная или деликатная стирка при 30°C. Не использовать кондиционер, чтобы не повредить DWR мембрану.',
    deliveryInfo: 'Отправка в течение 24 часов. Доставка по РФ курьером с возможностью примерки.',
    imageUrl: '/src/assets/images/streetwear_cargo_pants_1793989866083.jpg',
    gallery: [
      '/src/assets/images/streetwear_cargo_pants_1793989866083.jpg',
      '/src/assets/images/hero_streetwear_editorial_1793989864740.jpg'
    ],
    externalShopUrl: 'https://acolyte.tech/shop/tactical-modular-v2',
    isNew: false,
    featured: true,
    color: 'Matte Black',
    sku: 'ACL-24-CRG-02'
  },
  {
    id: 'molotov-permafrost-zip',
    name: 'Зип-Худи Heavy «Permafrost Edition»',
    brand: 'MOLOTOV',
    brandSlug: 'molotov',
    category: 'hoodies',
    categoryLabel: 'Худи и свитшоты',
    price: 8900,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Флагманское уральское зип-худи. Тракторная металлическая молния с гравированным бегунком, плотный петлевой футер без начеса 430 г/м², широкий оверсайз крой с упругими манжетами в рубчик. Выдерживает жесткие сибирские ветра.',
    composition: '100% органический хлопок (430 г/м²)',
    careInstructions: 'Стирать застегнутым наизнанку при 30°C. Гладить паром.',
    deliveryInfo: 'Экспресс СДЭК из Перми (2-3 дня до Москвы и Петербурга).',
    imageUrl: '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg',
    gallery: [
      '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg'
    ],
    externalShopUrl: 'https://molotov.ru/products/permafrost-zip',
    isNew: true,
    featured: true,
    color: 'Deep Raven Black',
    sku: 'MLT-24-ZIP-09'
  },
  {
    id: 'yalta94-priboy-tee',
    name: 'Футболка Boxy «Прибой 94 Acid Wash»',
    brand: 'YALTA 94',
    brandSlug: 'yalta-94',
    category: 't-shirts',
    categoryLabel: 'Футболки',
    price: 4500,
    sizes: ['S', 'M', 'L'],
    description: 'Культовая модель бренда с ручной кислотной варкой Acid Mineral Wash. Каждый экземпляр имеет уникальный мраморный рисунок. Архивный графический принт в технике водной шелкографии, приятный к телу и неубиваемый.',
    composition: '100% плотный вываренный хлопок (260 г/м²)',
    careInstructions: 'Стирать при 30°C жидким средством для темных вещей.',
    deliveryInfo: 'Доставка по РФ от 3 до 5 дней. Фирменный упаковочный зип-пакет с постером в подарок.',
    imageUrl: '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg',
    gallery: [
      '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg'
    ],
    externalShopUrl: 'https://yalta94.com/catalog/priboy-acid-tee',
    isNew: false,
    featured: true,
    color: 'Acid Mineral Gray',
    sku: 'YLT-24-PRB-01'
  },
  {
    id: 'dieyoung-mgla-hoodie',
    name: 'Худи Oversize «Мгла / Деконструкция»',
    brand: 'die young',
    brandSlug: 'die-young',
    category: 'hoodies',
    categoryLabel: 'Худи и свитшоты',
    price: 10400,
    sizes: ['M', 'L', 'XL'],
    description: 'Деконструированное худи с открытыми срезами швов, двойными манжетами и вышитой монограммой бренда на капюшоне. Плотная турецкая хлопковая ткань 480 г/м², обеспечивающая массивный силуэт.',
    composition: '100% тяжелый хлопок без синтетических примесей',
    careInstructions: 'Сухая чистка или бережная ручная стирка в холодной воде.',
    deliveryInfo: 'Лимитированный тираж 150 единиц. Номерной сертификат в комплекте.',
    imageUrl: '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg',
    gallery: [
      '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg'
    ],
    externalShopUrl: 'https://dieyoung.store/item/mgla-deconstructed',
    isNew: true,
    featured: true,
    color: 'Faded Black',
    sku: 'DY-24-MGL-03'
  },
  {
    id: 'volchok-oskolki-long',
    name: 'Лонгслив Oversize «Осколки Новой Волны»',
    brand: 'ВОЛЧОК',
    brandSlug: 'volchok',
    category: 't-shirts',
    categoryLabel: 'Футболки',
    price: 5200,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Удлиненный лонгслив со спущенным рукавом и объемным кроем. Готическая кириллическая графика на рукавах и спине, плотная горловина из кашкорсе, сохраняющая форму после сотен стирок.',
    composition: '100% компакт-пенье хлопок (240 г/м²)',
    careInstructions: 'Стирка при 30°C вывернутым наизнанку.',
    deliveryInfo: 'Доставка по РФ и СНГ. Флагманский магазин в Москве на Хлебозаводе.',
    imageUrl: '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg',
    gallery: [
      '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg'
    ],
    externalShopUrl: 'https://volchok.ru/catalog/longsleeve-oskolki',
    isNew: false,
    featured: true,
    color: 'Carbon Black',
    sku: 'VLC-24-LNG-07'
  },
  {
    id: 'hrdcr-wide-pants',
    name: 'Широкие Брюки «Baggy Heavy Drill»',
    brand: 'HRDCR',
    brandSlug: 'hrdcr',
    category: 'pants',
    categoryLabel: 'Брюки и карго',
    price: 11200,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ультра-широкие брюки из жесткого хлопкового твила плотностью 380 г/м². Глубокие складки у пояса, внутренний утягивающий шнур, скрытые карманы с усилением хольнитенами и идеальная драпировка на кроссовки.',
    composition: '100% хлопковый саржевый твил',
    careInstructions: 'Машинная стирка при 40°C. Гладить при средней температуре.',
    deliveryInfo: 'Отправка СДЭК с трек-номером в день оформления.',
    imageUrl: '/src/assets/images/streetwear_cargo_pants_1793989866083.jpg',
    gallery: [
      '/src/assets/images/streetwear_cargo_pants_1793989866083.jpg'
    ],
    externalShopUrl: 'https://hrdcr.ru/products/baggy-drill-pants',
    isNew: true,
    featured: true,
    color: 'Washed Ash Black',
    sku: 'HRD-24-PNT-05'
  },
  {
    id: 'acolyte-chest-rig',
    name: 'Нагрудная Сумка «Tactical Rig 01»',
    brand: 'ACOLYTE',
    brandSlug: 'acolyte',
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    price: 6400,
    sizes: ['One Size'],
    description: 'Нагрудная модульная сумка-жилет из влагозащитной Cordura 1000D. Четырехточечная подвесная система с быстросбросами, лазерная резка MOLLE-панелей, прорезиненные молнии Aquaguard и внутренний карабин для ключей.',
    composition: '100% нейлон Cordura 1000D, полиамидные стропы, фурнитура YKK',
    careInstructions: 'Чистить влажной губкой. Не стирать в стиральной машине.',
    deliveryInfo: 'Доставка по всей РФ 2-4 дня в фирменном чехле.',
    imageUrl: '/src/assets/images/streetwear_cargo_pants_1793989866083.jpg',
    gallery: [
      '/src/assets/images/streetwear_cargo_pants_1793989866083.jpg'
    ],
    externalShopUrl: 'https://acolyte.tech/shop/tactical-rig-01',
    isNew: false,
    featured: false,
    color: 'Tactical Black',
    sku: 'ACL-24-ACC-01'
  },
  {
    id: 'molotov-balaclava-wool',
    name: 'Вязаная Балаклава «Nordic Shield»',
    brand: 'MOLOTOV',
    brandSlug: 'molotov',
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    price: 3200,
    sizes: ['One Size'],
    description: 'Теплая анатомическая балаклава из смесовой мериносовой шерсти крупного фактурного рубчика. Мягкая внутренняя флисовая подкладка для защиты дыхания от ветра, эластичный вырез для глаз, жаккардовый патч с логотипом.',
    composition: '50% шерсть мериноса, 50% акрил Soft-Touch',
    careInstructions: 'Ручная стирка в прохладной воде со специальным средством для шерсти.',
    deliveryInfo: 'В наличии на складе. Отправка на следующий рабочий день.',
    imageUrl: '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg',
    gallery: [
      '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg'
    ],
    externalShopUrl: 'https://molotov.ru/catalog/balaclava-nordic',
    isNew: true,
    featured: false,
    color: 'Charcoal Black',
    sku: 'MLT-24-ACC-03'
  },
  {
    id: 'dieyoung-raw-denim',
    name: 'Джинсы Wide Leg «Raw Concrete»',
    brand: 'die young',
    brandSlug: 'die-young',
    category: 'pants',
    categoryLabel: 'Брюки и карго',
    price: 12900,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Широкие джинсы из плотного необработанного японского денима плотностью 14.5 oz. Фактурный селвидж-край, фирменные болты из оксидированной стали, классическая высокая посадка и эффект естественного фейдинга со временем.',
    composition: '100% хлопок Selvedge Denim (14.5 oz)',
    careInstructions: 'Первые 6 месяцев не стирать для формирования естественных заломов (fade). Затем деликатная стирка в холодной воде.',
    deliveryInfo: 'Курьерская доставка по всей России с возможностью оплаты после примерки.',
    imageUrl: '/src/assets/images/streetwear_cargo_pants_1793989866083.jpg',
    gallery: [
      '/src/assets/images/streetwear_cargo_pants_1793989866083.jpg'
    ],
    externalShopUrl: 'https://dieyoung.store/item/raw-concrete-denim',
    isNew: false,
    featured: false,
    color: 'Raw Indigo / Dark Gray',
    sku: 'DY-24-DNM-08'
  },
  {
    id: 'yalta94-panama-utility',
    name: 'Панама с ремнем «Seaside Blackout»',
    brand: 'YALTA 94',
    brandSlug: 'yalta-94',
    category: 'accessories',
    categoryLabel: 'Аксессуары',
    price: 2900,
    sizes: ['One Size'],
    description: 'Утилитарная панама из влагоотталкивающей мембранной ткани с широкими простроченными полями, регулировочным ремешком с фастексом и вентиляционными люверсами.',
    composition: '100% нейлон с водоотталкивающим тефлоновым слоем',
    careInstructions: 'Протирать влажной тканью.',
    deliveryInfo: 'Отправка почтой или СДЭК из Крыма.',
    imageUrl: '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg',
    gallery: [
      '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg'
    ],
    externalShopUrl: 'https://yalta94.com/shop/panama-blackout',
    isNew: false,
    featured: false,
    color: 'Jet Black',
    sku: 'YLT-24-PNM-02'
  },
  {
    id: 'volchok-cyber-tee',
    name: 'Футболка Boxy «Черный Монолит»',
    brand: 'ВОЛЧОК',
    brandSlug: 'volchok',
    category: 't-shirts',
    categoryLabel: 'Футболки',
    price: 4800,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Классический квадратный бокси-силуэт с плотной горловиной. Трафаретная печать пластизолевыми чернилами с эффектом кракелюра, глубокий черный оттенок ткани и минималистичная эстетика.',
    composition: '100% вычесанный хлопок (250 г/м²)',
    careInstructions: 'Стирка 30°C, гладить через ткань.',
    deliveryInfo: 'Доставка 1-3 дня в любой город РФ.',
    imageUrl: '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg',
    gallery: [
      '/src/assets/images/streetwear_oversize_tee_1793989864945.jpg'
    ],
    externalShopUrl: 'https://volchok.ru/catalog/tee-monolith',
    isNew: true,
    featured: true,
    color: 'Deep Coal',
    sku: 'VLC-24-TEE-11'
  },
  {
    id: 'hrdcr-crewneck-heavy',
    name: 'Свитшот Heavyweight «Nordic Resistance»',
    brand: 'HRDCR',
    brandSlug: 'hrdcr',
    category: 'hoodies',
    categoryLabel: 'Худи и свитшоты',
    price: 7900,
    sizes: ['M', 'L', 'XL'],
    description: 'Массивный свитшот без капюшона с широкими трикотажными резинками на поясе и манжетах. Винтажный треугольник на вороте, плотная трехнитка 450 г/м², петербургский локальный пошив.',
    composition: '100% хлопковый футер диагональ',
    careInstructions: 'Деликатная машинная стирка 30°C.',
    deliveryInfo: 'СДЭК или самовывоз в Санкт-Петербурге.',
    imageUrl: '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg',
    gallery: [
      '/src/assets/images/streetwear_hoodie_black_1793989865029.jpg'
    ],
    externalShopUrl: 'https://hrdcr.ru/products/crewneck-resistance',
    isNew: false,
    featured: false,
    color: 'Asphalt Gray',
    sku: 'HRD-24-CRW-06'
  }
];

// Helper to count items per brand
BRANDS.forEach((brand) => {
  brand.itemCount = PRODUCTS.filter((p) => p.brandSlug === brand.slug).length;
});
