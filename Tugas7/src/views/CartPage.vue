<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
</script>

<template>
  <div class="page-content cart-page">
    <section class="cart-heading">
      <p class="eyebrow">Belanjaanmu</p>
      <h1>Keranjang <span>belanja.</span></h1>
      <p class="cart-subtitle">Periksa kembali pilihan yang akan menemanimu.</p>
    </section>

    <div v-if="cart.items.length" class="cart-layout">
      <section class="cart-items" aria-label="Daftar produk di keranjang">
        <article v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="cart-item-art" :class="`art-${item.color}`" aria-hidden="true">
            {{ item.icon }}
          </div>
          <div class="cart-item-details">
            <p class="product-category">{{ item.category }}</p>
            <h2>{{ item.name }}</h2>
            <span class="cart-item-price">{{ formatPrice(item.price) }}</span>
          </div>
          <div class="cart-item-actions">
            <label class="quantity-control">
              <span class="sr-only">Jumlah {{ item.name }}</span>
              <button
                type="button"
                :aria-label="`Kurangi jumlah ${item.name}`"
                @click="cart.setQuantity(item.id, item.quantity - 1)"
              >
                −
              </button>
              <span>{{ item.quantity }}</span>
              <button
                type="button"
                :aria-label="`Tambah jumlah ${item.name}`"
                @click="cart.setQuantity(item.id, item.quantity + 1)"
              >
                +
              </button>
            </label>
            <button
              class="remove-button"
              type="button"
              :aria-label="`Hapus ${item.name} dari keranjang`"
              @click="cart.removeItem(item.id)"
            >
              Hapus
            </button>
          </div>
          <strong class="cart-line-total">{{ formatPrice(item.price * item.quantity) }}</strong>
        </article>

        <RouterLink class="continue-link" to="/">← Lanjut belanja</RouterLink>
      </section>

      <aside class="order-summary">
        <h2>Ringkasan pesanan</h2>
        <div class="summary-row">
          <span>Total item</span>
          <span>{{ cart.totalItems }} produk</span>
        </div>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>{{ formatPrice(cart.subtotal) }}</span>
        </div>
        <div class="summary-row shipping-row">
          <span>Pengiriman</span>
          <span>Dihitung saat checkout</span>
        </div>
        <div class="summary-total">
          <span>Total sementara</span>
          <strong>{{ formatPrice(cart.subtotal) }}</strong>
        </div>
        <button class="checkout-button" type="button" disabled>
          Checkout segera hadir <span aria-hidden="true">→</span>
        </button>
        <p class="secure-note"><span aria-hidden="true">✓</span> Pilihanmu tersimpan di sesi ini</p>
      </aside>
    </div>

    <section v-else class="empty-cart">
      <div class="empty-cart-icon" aria-hidden="true">🛍️</div>
      <p class="eyebrow">Masih ada banyak pilihan</p>
      <h2>Keranjangmu masih kosong.</h2>
      <p>Yuk, temukan sesuatu yang pas untuk hari-harimu.</p>
      <RouterLink class="hero-cta" to="/">Lihat katalog <span aria-hidden="true">→</span></RouterLink>
    </section>
  </div>
</template>
