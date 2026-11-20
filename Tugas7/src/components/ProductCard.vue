<script setup>
import { useCartStore } from '../stores/cart'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cart = useCartStore()
const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
</script>

<template>
  <article class="product-card">
    <div class="product-art" :class="`art-${product.color}`">
      <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
      <span class="product-emoji" role="img" :aria-label="product.name">{{ product.icon }}</span>
      <span class="art-caption">SODA SENJA · {{ product.category }}</span>
    </div>

    <div class="product-info">
      <p class="product-category">{{ product.category }}</p>
      <h3>{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-bottom">
        <strong class="product-price">{{ formatPrice(product.price) }}</strong>
        <button
          class="add-button"
          type="button"
          :aria-label="`Tambah ${product.name} ke keranjang`"
          @click="cart.addItem(product)"
        >
          <span aria-hidden="true">+</span>
          Beli
        </button>
      </div>
    </div>
  </article>
</template>
