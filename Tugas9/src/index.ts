
import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

// Data inventaris laboratorium
let inventaris = [
  {
    id: 1,
    nama: 'Komputer',
    kategori: 'Elektronik',
    jumlah: 20,
    kondisi: 'Baik'
  },
  {
    id: 2,
    nama: 'Proyektor',
    kategori: 'Elektronik',
    jumlah: 5,
    kondisi: 'Baik'
  },
  {
    id: 3,
    nama: 'Switch',
    kategori: 'Jaringan',
    jumlah: 4,
    kondisi: 'Baik'
  },
  {
    id: 4,
    nama: 'Router',
    kategori: 'Jaringan',
    jumlah: 3,
    kondisi: 'Baik'
  }
]

// 1. GET: Menampilkan semua inventaris
app.get('/api/inventaris', (c) => {
  return c.json(inventaris)
})

// 2. GET: Menampilkan detail berdasarkan ID
app.get('/api/inventaris/:id', (c) => {
  const id = Number(c.req.param('id'))

  const barang = inventaris.find((item) => item.id === id)

  if (!barang) {
    return c.json({ pesan: 'Barang tidak ditemukan' }, 404)
  }

  return c.json(barang)
})

// 3. POST: Menambahkan barang baru
app.post('/api/inventaris', async (c) => {
  const body = await c.req.json()

  const barangBaru = {
    id: inventaris.length > 0
      ? Math.max(...inventaris.map((item) => item.id)) + 1
      : 1,
    nama: body.nama,
    kategori: body.kategori,
    jumlah: body.jumlah,
    kondisi: body.kondisi
  }

  inventaris.push(barangBaru)

  return c.json({
    pesan: 'Barang berhasil ditambahkan',
    data: barangBaru
  }, 201)
})

// Menjalankan server
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server berjalan di http://localhost:${info.port}`)
})
