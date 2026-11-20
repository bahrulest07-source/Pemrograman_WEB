<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cart'

const cart = useCartStore()
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="Soda Senja, beranda">
        <span class="brand-mark">🥤</span>
        <span>soda<span class="brand-light">senja</span></span>
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
        <span class="brand-mark">🥤</span>
        <span>soda<span class="brand-light">senja</span></span>
      </span>
      <span>Segarnya warna, bahagianya setiap teguk.</span>
    </footer>
  </div>
</template>
