<script setup>
import { computed, ref } from 'vue'

const categories = ['Fiksi', 'Nonfiksi', 'Teknologi', 'Pendidikan']
const title = ref('')
const category = ref(categories[0])
const isRead = ref(false)
const books = ref([])
let nextId = 1

const completedCount = computed(
  () => books.value.filter((book) => book.isRead).length,
)

function addBook() {
  const bookTitle = title.value.trim()
  if (!bookTitle) return

  books.value.push({
    id: nextId++,
    title: bookTitle,
    category: category.value,
    isRead: isRead.value,
  })

  title.value = ''
  isRead.value = false
}
</script>

<template>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">RUANG BACA PRIBADI</p>
      <h1>Catatan Buku</h1>
      <p class="intro">Simpan buku yang ingin kamu baca dan lacak progresnya.</p>
    </header>

    <section class="book-card" aria-labelledby="form-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">KOLEKSI</p>
          <h2 id="form-title">Tambah buku</h2>
        </div>
        <div class="reading-count" aria-live="polite">
          <span class="count-number">{{ completedCount }}</span>
          <span>selesai dibaca</span>
        </div>
      </div>

      <form class="book-form" @submit.prevent="addBook">
        <label class="field title-field">
          <span>Judul buku</span>
          <input
            v-model="title"
            type="text"
            placeholder="Contoh: Laskar Pelangi"
            required
          />
        </label>

        <label class="field">
          <span>Kategori</span>
          <select v-model="category">
            <option v-for="item in categories" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </label>

        <label class="read-toggle">
          <input v-model="isRead" type="checkbox" />
          <span>Sudah dibaca</span>
        </label>

        <button class="add-button" type="submit">Tambah buku <span aria-hidden="true">+</span></button>
      </form>
    </section>

    <section class="book-list-section" aria-labelledby="list-title">
      <div class="list-heading">
        <div>
          <p class="eyebrow">DAFTAR BACAAN</p>
          <h2 id="list-title">Buku saya <span class="total-count">{{ books.length }}</span></h2>
        </div>
        <p class="list-hint">Centang buku setelah selesai dibaca.</p>
      </div>

      <ul v-if="books.length" class="book-list">
        <li v-for="book in books" :key="book.id" class="book-item">
          <label class="book-status">
            <input v-model="book.isRead" type="checkbox" />
            <span class="custom-check" aria-hidden="true"></span>
            <span class="visually-hidden">Tandai {{ book.title }} sudah dibaca</span>
          </label>
          <div class="book-details">
            <p class="book-title" :class="{ completed: book.isRead }">{{ book.title }}</p>
            <span class="category-tag">{{ book.category }}</span>
          </div>
          <span class="status-label" :class="{ done: book.isRead }">
            {{ book.isRead ? 'Selesai' : 'Belum dibaca' }}
          </span>
        </li>
      </ul>

      <div v-else class="empty-state">
        <span class="empty-icon" aria-hidden="true">✦</span>
        <p class="empty-title">Belum ada buku di daftar</p>
        <p>Tambahkan buku pertama yang ingin kamu baca.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  width: min(100% - 40px, 820px);
  margin: 0 auto;
  padding: 72px 0 96px;
}

.page-header {
  margin-bottom: 36px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #987b56;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 10px;
  color: #28251f;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.055em;
  line-height: 1;
}

.intro,
.list-hint {
  margin-bottom: 0;
  color: #77736c;
  font-size: 0.95rem;
}

.book-card {
  padding: 28px;
  border: 1px solid #e8e3d9;
  border-radius: 16px;
  background: #fffefa;
  box-shadow: 0 16px 40px rgb(60 48 28 / 5%);
}

.section-heading,
.list-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

h2 {
  margin-bottom: 0;
  color: #302d27;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.65rem;
  font-weight: 500;
  letter-spacing: -0.035em;
}

.reading-count {
  display: grid;
  min-width: 108px;
  gap: 2px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #f3f0e9;
  color: #77736c;
  font-size: 0.72rem;
  text-align: center;
}

.count-number {
  color: #526c50;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.5rem;
  line-height: 1.1;
}

.book-form {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(150px, 1fr);
  align-items: end;
  gap: 18px 14px;
  margin-top: 26px;
}

.field {
  display: grid;
  gap: 8px;
  color: #514d45;
  font-size: 0.82rem;
  font-weight: 600;
}

.field input,
.field select {
  width: 100%;
  min-height: 46px;
  padding: 0 13px;
  border: 1px solid #ded9ce;
  border-radius: 8px;
  outline: none;
  background: white;
  color: #302d27;
  font: inherit;
  font-weight: 400;
}

.field input:focus,
.field select:focus {
  border-color: #8d795c;
  box-shadow: 0 0 0 3px rgb(141 121 92 / 14%);
}

.field input::placeholder {
  color: #aaa59b;
}

.read-toggle {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 44px;
  color: #514d45;
  font-size: 0.84rem;
  cursor: pointer;
}

.read-toggle input,
.book-status input {
  width: 17px;
  height: 17px;
  accent-color: #657b5e;
  cursor: pointer;
}

.add-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 16px;
  border: 0;
  border-radius: 8px;
  background: #394b3b;
  color: white;
  font: inherit;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 160ms ease, transform 160ms ease;
}

.add-button:hover {
  transform: translateY(-1px);
  background: #2d3e2f;
}

.add-button span {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1;
}

.book-list-section {
  margin-top: 42px;
}

.list-heading {
  align-items: end;
  margin-bottom: 17px;
}

.total-count {
  display: inline-grid;
  width: 25px;
  height: 25px;
  place-items: center;
  border-radius: 50%;
  background: #eee9df;
  color: #6a604e;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
  font-size: 0.75rem;
  vertical-align: 4px;
}

.list-hint {
  font-size: 0.78rem;
}

.book-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.book-item {
  display: flex;
  align-items: center;
  gap: 15px;
  min-height: 72px;
  padding: 14px 18px;
  border: 1px solid #e8e3d9;
  border-radius: 12px;
  background: #fffefa;
}

.book-status {
  position: relative;
  display: grid;
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  place-items: center;
  cursor: pointer;
}

.book-status input {
  position: absolute;
  width: 22px;
  height: 22px;
  margin: 0;
  opacity: 0;
}

.custom-check {
  width: 18px;
  height: 18px;
  border: 1.5px solid #c9c2b4;
  border-radius: 6px;
  pointer-events: none;
}

.book-status input:checked + .custom-check {
  border-color: #657b5e;
  background: #657b5e;
}

.book-status input:checked + .custom-check::after {
  display: block;
  width: 5px;
  height: 9px;
  margin: 2px 0 0 5px;
  border: solid white;
  border-width: 0 2px 2px 0;
  content: '';
  transform: rotate(45deg);
}

.book-status input:focus-visible + .custom-check {
  outline: 3px solid rgb(101 123 94 / 25%);
  outline-offset: 2px;
}

.book-details {
  display: grid;
  flex: 1;
  gap: 5px;
  min-width: 0;
}

.book-title {
  overflow: hidden;
  margin: 0;
  color: #302d27;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.08rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.book-title.completed {
  color: #99948a;
  text-decoration: line-through;
}

.category-tag {
  width: fit-content;
  padding: 3px 8px;
  border-radius: 20px;
  background: #f1eee7;
  color: #716857;
  font-size: 0.67rem;
}

.status-label {
  color: #8a7960;
  font-size: 0.75rem;
  white-space: nowrap;
}

.status-label.done {
  color: #526c50;
}

.empty-state {
  display: grid;
  justify-items: center;
  padding: 40px 20px;
  border: 1px dashed #ded9ce;
  border-radius: 12px;
  color: #8a857a;
  text-align: center;
}

.empty-icon {
  display: grid;
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
  place-items: center;
  border-radius: 50%;
  background: #f1eee7;
  color: #8d795c;
  font-size: 1.1rem;
}

.empty-title {
  margin-bottom: 5px;
  color: #514d45;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.08rem;
}

.empty-state > p:last-child {
  margin-bottom: 0;
  font-size: 0.82rem;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (max-width: 620px) {
  .page {
    width: min(100% - 28px, 820px);
    padding: 48px 0 64px;
  }

  .book-card {
    padding: 21px 17px;
  }

  .book-form {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .read-toggle {
    min-height: 32px;
  }

  .list-heading {
    display: block;
  }

  .list-hint {
    margin-top: 10px;
  }

  .book-item {
    gap: 11px;
    padding: 12px;
  }

  .status-label {
    max-width: 77px;
    text-align: right;
    white-space: normal;
  }
}
</style>
