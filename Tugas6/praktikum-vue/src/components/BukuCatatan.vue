<script setup>
import { computed, ref } from 'vue'

const judul = ref('')
const kategori = ref('Novel')
const sudahSelesai = ref(false)

const daftarBuku = ref([
  { judul: 'Laskar Pelangi', kategori: 'Novel', selesai: true },
  { judul: 'Filosofi Teras', kategori: 'Self Improvement', selesai: false },
  { judul: 'Atomic Habits', kategori: 'Self Improvement', selesai: false },
  { judul: 'Clean Code', kategori: 'Teknologi', selesai: true },
])

const jumlahSelesai = computed(
  () => daftarBuku.value.filter((buku) => buku.selesai).length,
)

function tambahBuku() {
  if (!judul.value.trim()) return

  daftarBuku.value.push({
    judul: judul.value.trim(),
    kategori: kategori.value,
    selesai: sudahSelesai.value,
  })

  judul.value = ''
  kategori.value = 'Novel'
  sudahSelesai.value = false
}
</script>

<template>
  <main class="buku-catatan">
    <h1>Catatan Buku</h1>

    <form class="form-buku" @submit.prevent="tambahBuku">
      <label>
        Judul buku
        <input v-model="judul" type="text" placeholder="Masukkan judul buku" />
      </label>

      <label>
        Kategori
        <select v-model="kategori">
          <option>Novel</option>
          <option>Teknologi</option>
          <option>Self Improvement</option>
          <option>Pendidikan</option>
        </select>
      </label>

      <label class="status-baca">
        <input v-model="sudahSelesai" type="checkbox" />
        Sudah selesai dibaca
      </label>

      <button type="submit">Tambah Buku</button>
    </form>

    <p class="ringkasan">
      Buku selesai dibaca: <strong>{{ jumlahSelesai }}</strong>
    </p>

    <ul class="daftar-buku">
      <li
        v-for="(buku, index) in daftarBuku"
        :key="`${buku.judul}-${index}`"
        :class="{ selesai: buku.selesai }"
      >
        <div>
          <strong>{{ buku.judul }}</strong>
          <span>{{ buku.kategori }}</span>
        </div>
        <label>
          <input v-model="buku.selesai" type="checkbox" />
          Selesai
        </label>
      </li>
    </ul>
  </main>
</template>
