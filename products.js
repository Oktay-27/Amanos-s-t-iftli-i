// Ürünlerini buraya ekle. Gerçek projede bu veriler
// veritabanından (MySQL, MongoDB, vb.) çekilir.
// Şimdilik örnek olsun diye elle yazıyoruz.

// ⚠️ link ve image_link alanlarındaki "senin-siten.com" kısmını,
// site canlıya alındıktan sonra gerçek domain'inle değiştir.

module.exports = [
  {
    id: "SKU-001",
    title: "Süzme Yoğurt (1 kg)",
    description: "Tam yağlı inek sütünden, geleneksel bez süzme yöntemiyle hazırlanmıştır.",
    link: "https://senin-siten.com/urunler.html",
    image_link: "https://senin-siten.com/img/suzme-yogurt.jpg",
    availability: "in_stock",
    price: "180.00 TRY",
    brand: "Amanos Süt Evi",
    condition: "new",
    gtin: "",
    mpn: "ASE-YOGURT-1KG"
  },
  {
    id: "SKU-002",
    title: "Köy Tereyağı (500 g)",
    description: "El yayığında çırpılmış, tuzsuz geleneksel köy tereyağı.",
    link: "https://senin-siten.com/urunler.html",
    image_link: "https://senin-siten.com/img/koy-tereyagi.jpg",
    availability: "in_stock",
    price: "420.00 TRY",
    brand: "Amanos Süt Evi",
    condition: "new",
    gtin: "",
    mpn: "ASE-TEREYAGI-500G"
  },
  {
    id: "SKU-003",
    title: "Beyaz Peynir (1 kg, tam yağlı)",
    description: "Tam yağlı inek sütünden üretilip 60 gün olgunlaştırılmıştır.",
    link: "https://senin-siten.com/urunler.html",
    image_link: "https://senin-siten.com/img/beyaz-peynir.jpg",
    availability: "in_stock",
    price: "310.00 TRY",
    brand: "Amanos Süt Evi",
    condition: "new",
    gtin: "",
    mpn: "ASE-PEYNIR-1KG"
  }
];

