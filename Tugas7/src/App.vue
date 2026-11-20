<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cart'

const cart = useCartStore()
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="Senja Kopi, beranda">
        <span class="brand-mark">☕</span>
        <span>senja<span class="brand-light">kopi</span></span>
      </RouterLink>

      <nav class="main-nav" aria-label="Navigasi utama">
        <RouterLink to="/" class="nav-link">Beranda</RouterLink>
        <RouterLink to="/cart" class="cart-link">
          Keranjang
          <span class="cart-count">{{ cart.totalItems }}</span>
        </RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="site-footer">
      <span class="brand brand-footer">
        <span class="brand-mark">☕</span>
        <span>senja<span class="brand-light">kopi</span></span>
      </span>
      <span>Aroma hangat, nyaman setiap tegukan.</span>
    </footer>
  </div>
</template>
