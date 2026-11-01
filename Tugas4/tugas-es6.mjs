// Nama file: tugas-es6.mjs

// 1. Data transaksi penjualan berbagai jenis kopi
const daftarKopi = [
  { id: 1, barang: 'Kopi Arabika', harga: 45000, qty: 2, kategori: 'Biji Kopi' },
  { id: 2, barang: 'Kopi Robusta', harga: 35000, qty: 3, kategori: 'Biji Kopi' },
  { id: 3, barang: 'Kapal Api', harga: 15000, qty: 2, kategori: 'Kopi Instan' },
  { id: 4, barang: 'Good Day Cappuccino', harga: 12000, qty: 4, kategori: 'Kopi Instan' },
  { id: 5, barang: 'Kopi Toraja', harga: 55000, qty: 1, kategori: 'Biji Kopi' },
  { id: 6, barang: 'Nescafe Classic', harga: 18000, qty: 3, kategori: 'Kopi Instan' },
];

// 2. Menentukan kategori kopi yang ingin ditampilkan
const kategoriPilihan = 'Biji Kopi';

// 3. Menyaring data menggunakan filter()
const kopiTerpilih = daftarKopi.filter(
  ({ kategori }) => kategori === kategoriPilihan
);

// 4. Menghitung subtotal setiap produk menggunakan map()
const dataSubtotal = kopiTerpilih.map(
  ({ id, barang, harga, qty, kategori }) => ({
    id,
    barang,
    harga,
    qty,
    kategori,
    subtotal: harga * qty
  })
);

// 5. Menghitung total transaksi menggunakan reduce()
const totalPenjualan = dataSubtotal.reduce(
  (total, { subtotal }) => total + subtotal,
  0
);

// 6. Menampilkan hasil transaksi
console.log(`=== PENJUALAN KOPI KATEGORI: ${kategoriPilihan} ===`);
console.table(dataSubtotal);

console.log(
  `Total Penjualan: Rp ${totalPenjualan.toLocaleString('id-ID')}`
);