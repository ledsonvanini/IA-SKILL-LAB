import type { Category, StoreUnit, Product, Promotion } from "../types";

/* ── Categorias ── */
export const CATEGORIES: Category[] = [
  { id: "cat-01", name: "Alimentos", slug: "alimentos", icon: "Wheat" },
  { id: "cat-02", name: "Carnes", slug: "carnes", icon: "Beef" },
  { id: "cat-03", name: "Hortifruti", slug: "hortifruti", icon: "Apple" },
  { id: "cat-04", name: "Bebidas", slug: "bebidas", icon: "Wine" },
  { id: "cat-05", name: "Laticínios", slug: "laticinios", icon: "Milk" },
  { id: "cat-06", name: "Limpeza", slug: "limpeza", icon: "SprayCan" },
  { id: "cat-07", name: "Higiene", slug: "higiene", icon: "Sparkles" },
  { id: "cat-08", name: "Padaria", slug: "padaria", icon: "Croissant" },
];

/* ── Imagens de banner vertical por categoria ── */
export const CATEGORY_BANNERS: Record<string, string> = {
  "cat-01":
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=600&fit=crop",
  "cat-02":
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=600&fit=crop",
  "cat-03":
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=600&fit=crop",
  "cat-04":
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=600&fit=crop",
  "cat-05":
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=600&fit=crop",
  "cat-06":
    "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&h=600&fit=crop",
  "cat-07":
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=600&fit=crop",
  "cat-08":
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=600&fit=crop",
};

/* ── Unidades de Loja (3 unidades) ── */
export const STORE_UNITS: StoreUnit[] = [
  {
    id: "unit-01",
    name: "META21 Centro",
    address:
      "Av. das Nações Unidas, 12901 - Brooklin Paulista, São Paulo - SP",
    phone: "(11) 3456-7890",
    whatsapp: "(11) 98765-4321",
    hours: { weekdays: "07h às 22h", weekends: "08h às 20h" },
    coordinates: { lat: -23.6015, lng: -46.6929 },
  },
  {
    id: "unit-02",
    name: "META21 Pinheiros",
    address: "R. dos Pinheiros, 900 - Pinheiros, São Paulo - SP",
    phone: "(11) 3456-7891",
    whatsapp: "(11) 98765-4322",
    hours: { weekdays: "07h às 22h", weekends: "08h às 20h" },
    coordinates: { lat: -23.5634, lng: -46.6917 },
  },
  {
    id: "unit-03",
    name: "META21 Mooca",
    address: "R. da Mooca, 2718 - Mooca, São Paulo - SP",
    phone: "(11) 3456-7892",
    whatsapp: "(11) 98765-4323",
    hours: { weekdays: "07h às 22h", weekends: "08h às 18h" },
    coordinates: { lat: -23.5595, lng: -46.5986 },
  },
];

/* ── Produtos ── */
export const PRODUCTS: Product[] = [
  /* ── Alimentos (cat-01) ── */
  {
    id: "prod-01",
    name: "Arroz Agulhinha Tipo 1 - 5kg",
    slug: "arroz-agulhinha-5kg",
    categoryId: "cat-01",
    description: "Arroz longo fino tipo 1, grão selecionado. Pacote de 5kg.",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 26.5,
    sku: "ARR-001",
    inStock: true,
  },
  {
    id: "prod-09",
    name: "Feijão Carioca Tipo 1 - 1kg",
    slug: "feijao-carioca-1kg",
    categoryId: "cat-01",
    description: "Feijão carioca tipo 1, grãos selecionados.",
    imageUrl:
      "https://images.unsplash.com/photo-1515543904323-de300c4b1a00?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 8.9,
    sku: "ARR-002",
    inStock: true,
  },
  {
    id: "prod-10",
    name: "Macarrão Espaguete 500g",
    slug: "macarrao-espaguete-500g",
    categoryId: "cat-01",
    description: "Macarrão tipo espaguete, massa de sêmola.",
    imageUrl:
      "https://images.unsplash.com/photo-1612966808667-b1b6a5db0e2b?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 5.5,
    sku: "ARR-003",
    inStock: true,
  },
  {
    id: "prod-11",
    name: "Azeite Extra Virgem 500ml",
    slug: "azeite-extra-virgem-500ml",
    categoryId: "cat-01",
    description: "Azeite de oliva extra virgem importado.",
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 32.9,
    sku: "ARR-004",
    inStock: true,
  },
  {
    id: "prod-12",
    name: "Açúcar Cristal 1kg",
    slug: "acucar-cristal-1kg",
    categoryId: "cat-01",
    description: "Açúcar cristal refinado, pacote 1kg.",
    imageUrl:
      "https://images.unsplash.com/photo-1592450896784-84b6e6a562df?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 5.2,
    sku: "ARR-005",
    inStock: true,
  },

  /* ── Carnes (cat-02) ── */
  {
    id: "prod-02",
    name: "Picanha Bovina Resfriada",
    slug: "picanha-bovina",
    categoryId: "cat-02",
    description: "Picanha bovina resfriada de primeira qualidade.",
    imageUrl:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 70.0,
    sku: "CAR-001",
    inStock: true,
  },
  {
    id: "prod-13",
    name: "Peito de Frango Congelado",
    slug: "peito-frango-congelado",
    categoryId: "cat-02",
    description: "Peito de frango sem osso congelado.",
    imageUrl:
      "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 18.9,
    sku: "CAR-002",
    inStock: true,
  },
  {
    id: "prod-14",
    name: "Costela Bovina",
    slug: "costela-bovina",
    categoryId: "cat-02",
    description: "Costela bovina resfriada para churrasco.",
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 35.9,
    sku: "CAR-003",
    inStock: true,
  },
  {
    id: "prod-15",
    name: "Linguiça Toscana 500g",
    slug: "linguica-toscana-500g",
    categoryId: "cat-02",
    description: "Linguiça toscana temperada, pacote 500g.",
    imageUrl:
      "https://images.unsplash.com/photo-1595706480143-2c9e7f28a33b?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 16.9,
    sku: "CAR-004",
    inStock: true,
  },

  /* ── Hortifruti (cat-03) ── */
  {
    id: "prod-03",
    name: "Maçã Gala Importada",
    slug: "maca-gala",
    categoryId: "cat-03",
    description: "Maçãs gala importadas, frescas e selecionadas.",
    imageUrl:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 9.9,
    sku: "HOR-001",
    inStock: true,
  },
  {
    id: "prod-07",
    name: "Banana Nanica",
    slug: "banana-nanica",
    categoryId: "cat-03",
    description: "Banana nanica fresca, preço por quilo.",
    imageUrl:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 6.5,
    sku: "HOR-002",
    inStock: true,
  },
  {
    id: "prod-16",
    name: "Tomate Italiano",
    slug: "tomate-italiano",
    categoryId: "cat-03",
    description: "Tomate italiano fresco, ideal para saladas.",
    imageUrl:
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 8.9,
    sku: "HOR-003",
    inStock: true,
  },
  {
    id: "prod-17",
    name: "Alface Crespa",
    slug: "alface-crespa",
    categoryId: "cat-03",
    description: "Alface crespa orgânica, unidade.",
    imageUrl:
      "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 3.5,
    sku: "HOR-004",
    inStock: true,
  },

  /* ── Bebidas (cat-04) ── */
  {
    id: "prod-04",
    name: "Cerveja Lager 350ml",
    slug: "cerveja-lager-350",
    categoryId: "cat-04",
    description: "Cerveja tipo Lager, lata 350ml.",
    imageUrl:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 5.6,
    sku: "BEB-001",
    inStock: true,
  },
  {
    id: "prod-08",
    name: "Suco de Laranja Integral 900ml",
    slug: "suco-laranja-900ml",
    categoryId: "cat-04",
    description: "Suco de laranja 100% integral, garrafa 900ml.",
    imageUrl:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 14.9,
    sku: "BEB-002",
    inStock: true,
  },
  {
    id: "prod-18",
    name: "Água Mineral 1.5L",
    slug: "agua-mineral-1-5l",
    categoryId: "cat-04",
    description: "Água mineral sem gás, garrafa 1.5 litros.",
    imageUrl:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 3.2,
    sku: "BEB-003",
    inStock: true,
  },
  {
    id: "prod-19",
    name: "Refrigerante Cola 2L",
    slug: "refrigerante-cola-2l",
    categoryId: "cat-04",
    description: "Refrigerante tipo cola, garrafa 2 litros.",
    imageUrl:
      "https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 9.9,
    sku: "BEB-004",
    inStock: true,
  },

  /* ── Laticínios (cat-05) ── */
  {
    id: "prod-06",
    name: "Leite Integral 1L",
    slug: "leite-integral-1l",
    categoryId: "cat-05",
    description: "Leite integral UHT, caixa 1 litro.",
    imageUrl:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 5.5,
    sku: "LAT-001",
    inStock: true,
  },
  {
    id: "prod-20",
    name: "Queijo Mussarela Fatiado",
    slug: "queijo-mussarela",
    categoryId: "cat-05",
    description: "Queijo mussarela fatiado, 200g.",
    imageUrl:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 12.9,
    sku: "LAT-002",
    inStock: true,
  },
  {
    id: "prod-21",
    name: "Iogurte Natural 170g",
    slug: "iogurte-natural-170g",
    categoryId: "cat-05",
    description: "Iogurte natural integral, pote 170g.",
    imageUrl:
      "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 4.5,
    sku: "LAT-003",
    inStock: true,
  },
  {
    id: "prod-22",
    name: "Manteiga com Sal 200g",
    slug: "manteiga-com-sal-200g",
    categoryId: "cat-05",
    description: "Manteiga com sal, tablete 200g.",
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 11.5,
    sku: "LAT-004",
    inStock: true,
  },

  /* ── Limpeza (cat-06) ── */
  {
    id: "prod-05",
    name: "Detergente Líquido 500ml",
    slug: "detergente-500ml",
    categoryId: "cat-06",
    description: "Detergente líquido concentrado, frasco 500ml.",
    imageUrl:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 2.5,
    sku: "LIM-001",
    inStock: true,
  },
  {
    id: "prod-23",
    name: "Desinfetante Lavanda 1L",
    slug: "desinfetante-lavanda-1l",
    categoryId: "cat-06",
    description: "Desinfetante perfumado lavanda, 1 litro.",
    imageUrl:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
    unit: "un",
    basePrice: 6.9,
    sku: "LIM-002",
    inStock: true,
  },
  {
    id: "prod-24",
    name: "Sabão em Pó 1kg",
    slug: "sabao-em-po-1kg",
    categoryId: "cat-06",
    description: "Sabão em pó multiação, caixa 1kg.",
    imageUrl:
      "https://images.unsplash.com/photo-1629197520635-16570fbd0bb3?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 12.9,
    sku: "LIM-003",
    inStock: true,
  },
  {
    id: "prod-25",
    name: "Amaciante de Roupas 2L",
    slug: "amaciante-roupas-2l",
    categoryId: "cat-06",
    description: "Amaciante concentrado, frasco 2 litros.",
    imageUrl:
      "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 15.9,
    sku: "LIM-004",
    inStock: true,
  },

  /* ── Padaria (cat-08) ── */
  {
    id: "prod-26",
    name: "Pão Francês (10un)",
    slug: "pao-frances-10un",
    categoryId: "cat-08",
    description: "Pão francês fresquinho, pacote com 10 unidades.",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 7.9,
    sku: "PAD-001",
    inStock: true,
  },
  {
    id: "prod-27",
    name: "Bolo de Chocolate 500g",
    slug: "bolo-chocolate-500g",
    categoryId: "cat-08",
    description: "Bolo de chocolate artesanal, fatia 500g.",
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 18.9,
    sku: "PAD-002",
    inStock: true,
  },
  {
    id: "prod-28",
    name: "Croissant Manteiga (4un)",
    slug: "croissant-manteiga-4un",
    categoryId: "cat-08",
    description: "Croissant folhado de manteiga, 4 unidades.",
    imageUrl:
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 14.9,
    sku: "PAD-003",
    inStock: true,
  },
  {
    id: "prod-29",
    name: "Biscoito Amanteigado 200g",
    slug: "biscoito-amanteigado-200g",
    categoryId: "cat-08",
    description: "Biscoito amanteigado artesanal, 200g.",
    imageUrl:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 9.9,
    sku: "PAD-004",
    inStock: true,
  },
  {
    id: "prod-30",
    name: "Sonho de Creme (3un)",
    slug: "sonho-creme-3un",
    categoryId: "cat-08",
    description: "Sonho recheado com creme, pacote 3 unidades.",
    imageUrl:
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 12.5,
    sku: "PAD-005",
    inStock: true,
  },
  {
    id: "prod-31",
    name: "Pão de Queijo 400g",
    slug: "pao-de-queijo-400g",
    categoryId: "cat-08",
    description: "Pão de queijo congelado, pacote 400g.",
    imageUrl:
      "https://images.unsplash.com/photo-1598733584568-dadc0817e897?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 15.9,
    sku: "PAD-006",
    inStock: true,
  },

  /* ── Higiene (cat-07) ── */
  {
    id: "prod-32",
    name: "Shampoo Anticaspa 400ml",
    slug: "shampoo-anticaspa-400ml",
    categoryId: "cat-07",
    description: "Shampoo anticaspa para uso diário.",
    imageUrl:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 22.9,
    sku: "HIG-001",
    inStock: true,
  },
  {
    id: "prod-33",
    name: "Sabonete Líquido 250ml",
    slug: "sabonete-liquido-250ml",
    categoryId: "cat-07",
    description: "Sabonete líquido hidratante para mãos.",
    imageUrl:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 8.9,
    sku: "HIG-002",
    inStock: true,
  },
  {
    id: "prod-34",
    name: "Creme Dental 90g",
    slug: "creme-dental-90g",
    categoryId: "cat-07",
    description: "Creme dental com flúor e proteção contra cáries.",
    imageUrl:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 6.5,
    sku: "HIG-003",
    inStock: true,
  },
  {
    id: "prod-35",
    name: "Papel Higiênico 12un",
    slug: "papel-higienico-12un",
    categoryId: "cat-07",
    description: "Papel higiênico folha dupla, pacote 12 rolos.",
    imageUrl:
      "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 19.9,
    sku: "HIG-004",
    inStock: true,
  },
  {
    id: "prod-36",
    name: "Desodorante Roll-On 50ml",
    slug: "desodorante-roll-on-50ml",
    categoryId: "cat-07",
    description: "Desodorante antitranspirante roll-on.",
    imageUrl:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 14.9,
    sku: "HIG-005",
    inStock: true,
  },

  /* ── Extras: Carnes ── */
  {
    id: "prod-37",
    name: "Alcatra Bovina",
    slug: "alcatra-bovina",
    categoryId: "cat-02",
    description: "Alcatra bovina resfriada, peça inteira.",
    imageUrl:
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 49.9,
    sku: "CAR-005",
    inStock: true,
  },
  {
    id: "prod-38",
    name: "Filé Mignon",
    slug: "file-mignon",
    categoryId: "cat-02",
    description: "Filé mignon bovino resfriado, peça.",
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 89.9,
    sku: "CAR-006",
    inStock: true,
  },

  /* ── Extras: Bebidas ── */
  {
    id: "prod-39",
    name: "Vinho Tinto Seco 750ml",
    slug: "vinho-tinto-seco-750ml",
    categoryId: "cat-04",
    description: "Vinho tinto seco importado, garrafa 750ml.",
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 39.9,
    sku: "BEB-005",
    inStock: true,
  },
  {
    id: "prod-40",
    name: "Energético 250ml",
    slug: "energetico-250ml",
    categoryId: "cat-04",
    description: "Bebida energética, lata 250ml.",
    imageUrl:
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 8.9,
    sku: "BEB-006",
    inStock: true,
  },

  /* ── Extras: Hortifruti ── */
  {
    id: "prod-41",
    name: "Morango Bandeja 300g",
    slug: "morango-bandeja-300g",
    categoryId: "cat-03",
    description: "Morangos frescos selecionados, bandeja 300g.",
    imageUrl:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 9.9,
    sku: "HOR-005",
    inStock: true,
  },
  {
    id: "prod-42",
    name: "Laranja Pêra",
    slug: "laranja-pera",
    categoryId: "cat-03",
    description: "Laranja pêra, preço por quilo.",
    imageUrl:
      "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop",
    unit: "kg",
    basePrice: 5.5,
    sku: "HOR-006",
    inStock: true,
  },

  /* ── Extras: Alimentos ── */
  {
    id: "prod-43",
    name: "Café Torrado 500g",
    slug: "cafe-torrado-500g",
    categoryId: "cat-01",
    description: "Café torrado e moído, pacote 500g.",
    imageUrl:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 16.9,
    sku: "ARR-006",
    inStock: true,
  },
  {
    id: "prod-44",
    name: "Óleo de Soja 900ml",
    slug: "oleo-de-soja-900ml",
    categoryId: "cat-01",
    description: "Óleo de soja refinado, garrafa 900ml.",
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 8.5,
    sku: "ARR-007",
    inStock: true,
  },

  /* ── Extras: Laticínios ── */
  {
    id: "prod-45",
    name: "Requeijão Cremoso 200g",
    slug: "requeijao-cremoso-200g",
    categoryId: "cat-05",
    description: "Requeijão cremoso, pote 200g.",
    imageUrl:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 7.9,
    sku: "LAT-005",
    inStock: true,
  },
  {
    id: "prod-46",
    name: "Cream Cheese 150g",
    slug: "cream-cheese-150g",
    categoryId: "cat-05",
    description: "Cream cheese light, pote 150g.",
    imageUrl:
      "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&h=400&fit=crop",
    unit: "un",
    basePrice: 9.9,
    sku: "LAT-006",
    inStock: true,
  },
];

/* ── Promoções ── */
const now = new Date();
const weekStart = new Date(now);
weekStart.setDate(now.getDate() - now.getDay());
const weekEnd = new Date(weekStart);
weekEnd.setDate(weekStart.getDate() + 6);
weekEnd.setHours(23, 59, 59);

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-01",
    title: "Arroz com desconto especial",
    productId: "prod-01",
    storeUnitId: "unit-01",
    originalPrice: 26.5,
    promoPrice: 19.9,
    discountPercent: 25,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 142,
    views: 1580,
    isWeeklyOffer: true,
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
  },
  {
    id: "promo-02",
    title: "Picanha bovina com preço especial",
    productId: "prod-02",
    storeUnitId: "unit-01",
    originalPrice: 70.0,
    promoPrice: 59.9,
    discountPercent: 15,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 287,
    views: 3200,
    isWeeklyOffer: true,
    imageUrl:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 3 * 86400000).toISOString(),
  },
  {
    id: "promo-03",
    title: "Maçã gala importada em promoção",
    productId: "prod-03",
    storeUnitId: "unit-01",
    originalPrice: 9.9,
    promoPrice: 8.9,
    discountPercent: 10,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 56,
    views: 890,
    isWeeklyOffer: false,
    imageUrl:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 1 * 86400000).toISOString(),
  },
  {
    id: "promo-04",
    title: "Cerveja lager por um preço incrível",
    productId: "prod-04",
    storeUnitId: "unit-01",
    originalPrice: 5.6,
    promoPrice: 4.5,
    discountPercent: 20,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 198,
    views: 2100,
    isWeeklyOffer: true,
    imageUrl:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 4 * 86400000).toISOString(),
  },
  {
    id: "promo-05",
    title: "Detergente com 30% de desconto",
    productId: "prod-05",
    storeUnitId: "unit-01",
    originalPrice: 2.5,
    promoPrice: 1.75,
    discountPercent: 30,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 73,
    views: 950,
    isWeeklyOffer: false,
    imageUrl:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 5 * 86400000).toISOString(),
  },
  {
    id: "promo-06",
    title: "Leite integral com preço reduzido",
    productId: "prod-06",
    storeUnitId: "unit-01",
    originalPrice: 5.5,
    promoPrice: 4.84,
    discountPercent: 12,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 91,
    views: 1200,
    isWeeklyOffer: false,
    imageUrl:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
  },
  {
    id: "promo-07",
    title: "Banana nanica pela metade do preço",
    productId: "prod-07",
    storeUnitId: "unit-01",
    originalPrice: 6.5,
    promoPrice: 3.9,
    discountPercent: 40,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 215,
    views: 2800,
    isWeeklyOffer: true,
    imageUrl:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 1 * 86400000).toISOString(),
  },
  {
    id: "promo-08",
    title: "Suco de laranja integral em oferta",
    productId: "prod-08",
    storeUnitId: "unit-01",
    originalPrice: 14.9,
    promoPrice: 11.62,
    discountPercent: 22,
    startDate: weekStart.toISOString(),
    endDate: weekEnd.toISOString(),
    status: "published",
    likes: 64,
    views: 780,
    isWeeklyOffer: false,
    imageUrl:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
    createdAt: new Date(now.getTime() - 3 * 86400000).toISOString(),
  },
];

/* ── Helpers ── */
export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getProductsByCategory(categoryId: string) {
  return PRODUCTS.filter((p) => p.categoryId === categoryId && p.inStock);
}

export function getPromotionsByProduct(productId: string) {
  return PROMOTIONS.filter(
    (p) => p.productId === productId && p.status === "published"
  );
}

export function getPromotionForProduct(productId: string) {
  return PROMOTIONS.find(
    (p) => p.productId === productId && p.status === "published"
  );
}

export function getWeeklyOffers() {
  return PROMOTIONS.filter(
    (p) => p.isWeeklyOffer && p.status === "published"
  );
}

export function getActivePromotions() {
  return PROMOTIONS.filter((p) => p.status === "published");
}
