-- Temporary catalog fixtures for verifying independent scrolling in Admin / Brands and Products.
-- All fixture records stay in draft status and are therefore hidden from the public catalog.
-- Idempotent: re-running this migration updates the same test slugs.

begin;

insert into public.brands
  (name, slug, city, founded_year, description, logo_text, website, telegram, aesthetic, status)
values
  ('ТЕСТ БРЕНД 01', 'scroll-test-brand-01', 'Москва', 2021, 'Тестовая карточка бренда № 1 для проверки прокрутки списка в панели администратора.', 'T01', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 02', 'scroll-test-brand-02', 'Санкт-Петербург', 2020, 'Тестовая карточка бренда № 2 для проверки прокрутки списка в панели администратора.', 'T02', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 03', 'scroll-test-brand-03', 'Казань', 2022, 'Тестовая карточка бренда № 3 для проверки прокрутки списка в панели администратора.', 'T03', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 04', 'scroll-test-brand-04', 'Екатеринбург', 2019, 'Тестовая карточка бренда № 4 для проверки прокрутки списка в панели администратора.', 'T04', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 05', 'scroll-test-brand-05', 'Новосибирск', 2023, 'Тестовая карточка бренда № 5 для проверки прокрутки списка в панели администратора.', 'T05', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 06', 'scroll-test-brand-06', 'Нижний Новгород', 2021, 'Тестовая карточка бренда № 6 для проверки прокрутки списка в панели администратора.', 'T06', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 07', 'scroll-test-brand-07', 'Пермь', 2018, 'Тестовая карточка бренда № 7 для проверки прокрутки списка в панели администратора.', 'T07', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 08', 'scroll-test-brand-08', 'Самара', 2022, 'Тестовая карточка бренда № 8 для проверки прокрутки списка в панели администратора.', 'T08', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 09', 'scroll-test-brand-09', 'Ростов-на-Дону', 2020, 'Тестовая карточка бренда № 9 для проверки прокрутки списка в панели администратора.', 'T09', '', '', 'Тестовый каталог', 'draft'),
  ('ТЕСТ БРЕНД 10', 'scroll-test-brand-10', 'Калининград', 2024, 'Тестовая карточка бренда № 10 для проверки прокрутки списка в панели администратора.', 'T10', '', '', 'Тестовый каталог', 'draft')
on conflict (slug) do update set
  name=excluded.name,
  city=excluded.city,
  founded_year=excluded.founded_year,
  description=excluded.description,
  logo_text=excluded.logo_text,
  website=excluded.website,
  telegram=excluded.telegram,
  aesthetic=excluded.aesthetic,
  status='draft',
  updated_at=now();

insert into public.products
  (slug, name, brand_id, category, category_label, price, sizes, description,
   composition, care_instructions, delivery_info, image_url, gallery,
   external_shop_url, is_new, featured, color, sku, status)
select
  fixture.slug,
  fixture.name,
  brands.id,
  fixture.category,
  fixture.category_label,
  fixture.price,
  fixture.sizes,
  fixture.description,
  fixture.composition,
  fixture.care_instructions,
  fixture.delivery_info,
  '',
  '{}'::text[],
  '',
  false,
  false,
  fixture.color,
  fixture.sku,
  'draft'
from (values
  ('scroll-test-brand-01','scroll-test-product-01-01','Тестовая футболка 01-01','t-shirts','Футболки',3900::numeric,array['S','M','L']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Черный','TEST-01-01'),
  ('scroll-test-brand-01','scroll-test-product-01-02','Тестовое худи 01-02','hoodies','Худи и свитшоты',7900::numeric,array['M','L','XL']::text[],'Тестовый товар для проверки прокрутки списка товаров.','80% хлопок, 20% полиэстер','Стирка при 30°C.','Тестовая запись.','Графит','TEST-01-02'),
  ('scroll-test-brand-02','scroll-test-product-02-01','Тестовая футболка 02-01','t-shirts','Футболки',4100::numeric,array['S','M','L','XL']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Серый','TEST-02-01'),
  ('scroll-test-brand-02','scroll-test-product-02-02','Тестовые брюки 02-02','pants','Брюки и карго',8900::numeric,array['S','M','L']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Черный','TEST-02-02'),
  ('scroll-test-brand-03','scroll-test-product-03-01','Тестовая футболка 03-01','t-shirts','Футболки',4200::numeric,array['S','M','L']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Молочный','TEST-03-01'),
  ('scroll-test-brand-03','scroll-test-product-03-02','Тестовая сумка 03-02','accessories','Аксессуары',3500::numeric,array['One Size']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% полиэстер','Протирать влажной тканью.','Тестовая запись.','Черный','TEST-03-02'),
  ('scroll-test-brand-04','scroll-test-product-04-01','Тестовое худи 04-01','hoodies','Худи и свитшоты',8200::numeric,array['M','L','XL']::text[],'Тестовый товар для проверки прокрутки списка товаров.','80% хлопок, 20% полиэстер','Стирка при 30°C.','Тестовая запись.','Черный','TEST-04-01'),
  ('scroll-test-brand-04','scroll-test-product-04-02','Тестовые брюки 04-02','pants','Брюки и карго',9100::numeric,array['S','M','L']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Графит','TEST-04-02'),
  ('scroll-test-brand-05','scroll-test-product-05-01','Тестовая футболка 05-01','t-shirts','Футболки',4300::numeric,array['S','M','L','XL']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Белый','TEST-05-01'),
  ('scroll-test-brand-05','scroll-test-product-05-02','Тестовая панама 05-02','accessories','Аксессуары',2900::numeric,array['One Size']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Ручная чистка.','Тестовая запись.','Черный','TEST-05-02'),
  ('scroll-test-brand-06','scroll-test-product-06-01','Тестовое худи 06-01','hoodies','Худи и свитшоты',8400::numeric,array['M','L','XL']::text[],'Тестовый товар для проверки прокрутки списка товаров.','80% хлопок, 20% полиэстер','Стирка при 30°C.','Тестовая запись.','Серый','TEST-06-01'),
  ('scroll-test-brand-06','scroll-test-product-06-02','Тестовые брюки 06-02','pants','Брюки и карго',9300::numeric,array['S','M','L']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Черный','TEST-06-02'),
  ('scroll-test-brand-07','scroll-test-product-07-01','Тестовая футболка 07-01','t-shirts','Футболки',4400::numeric,array['S','M','L']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Графит','TEST-07-01'),
  ('scroll-test-brand-07','scroll-test-product-07-02','Тестовый аксессуар 07-02','accessories','Аксессуары',3100::numeric,array['One Size']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% полиэстер','Протирать влажной тканью.','Тестовая запись.','Черный','TEST-07-02'),
  ('scroll-test-brand-08','scroll-test-product-08-01','Тестовое худи 08-01','hoodies','Худи и свитшоты',8600::numeric,array['M','L','XL']::text[],'Тестовый товар для проверки прокрутки списка товаров.','80% хлопок, 20% полиэстер','Стирка при 30°C.','Тестовая запись.','Черный','TEST-08-01'),
  ('scroll-test-brand-08','scroll-test-product-08-02','Тестовая футболка 08-02','t-shirts','Футболки',4500::numeric,array['S','M','L']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Белый','TEST-08-02'),
  ('scroll-test-brand-09','scroll-test-product-09-01','Тестовые брюки 09-01','pants','Брюки и карго',9500::numeric,array['S','M','L','XL']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Серый','TEST-09-01'),
  ('scroll-test-brand-09','scroll-test-product-09-02','Тестовая футболка 09-02','t-shirts','Футболки',4600::numeric,array['S','M','L']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% хлопок','Стирка при 30°C.','Тестовая запись.','Черный','TEST-09-02'),
  ('scroll-test-brand-10','scroll-test-product-10-01','Тестовое худи 10-01','hoodies','Худи и свитшоты',8800::numeric,array['M','L','XL']::text[],'Тестовый товар для проверки прокрутки списка товаров.','80% хлопок, 20% полиэстер','Стирка при 30°C.','Тестовая запись.','Графит','TEST-10-01'),
  ('scroll-test-brand-10','scroll-test-product-10-02','Тестовая сумка 10-02','accessories','Аксессуары',3700::numeric,array['One Size']::text[],'Тестовый товар для проверки прокрутки списка товаров.','100% полиэстер','Протирать влажной тканью.','Тестовая запись.','Черный','TEST-10-02')
) as fixture(brand_slug,slug,name,category,category_label,price,sizes,description,composition,care_instructions,delivery_info,color,sku)
join public.brands brands on brands.slug=fixture.brand_slug
on conflict (slug) do update set
  name=excluded.name,
  brand_id=excluded.brand_id,
  category=excluded.category,
  category_label=excluded.category_label,
  price=excluded.price,
  sizes=excluded.sizes,
  description=excluded.description,
  composition=excluded.composition,
  care_instructions=excluded.care_instructions,
  delivery_info=excluded.delivery_info,
  image_url=excluded.image_url,
  gallery=excluded.gallery,
  external_shop_url=excluded.external_shop_url,
  is_new=excluded.is_new,
  featured=excluded.featured,
  color=excluded.color,
  sku=excluded.sku,
  status='draft',
  updated_at=now();

commit;
