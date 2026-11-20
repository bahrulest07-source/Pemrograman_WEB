<script setup>
import ProductCard from '../components/ProductCard.vue'
import { products } from '../data/products'
</script>

<template>
  <div class="page-content">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Segarkan suasana terbaikmu</p>
        <h1>Minuman soda,<br /><span>cerahnya hari.</span></h1>
        <p class="hero-description">
          Pilihan soda dingin berkilau untuk menemani obrolan, waktu santai,
          atau suasana bersenang-senang bersama teman.
        </p>
        <a class="hero-cta" href="#katalog">Pilih soda <span aria-hidden="true">↓</span></a>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-sun"></div>
        <div class="hero-display">
          <span class="hero-object hero-object-one">🍋</span>
          <span class="hero-object hero-object-two">🥤</span>
          <span class="hero-object hero-object-three">🫐</span>
        </div>
        <span class="hero-note">Disajikan dingin, penuh warna ♡</span>
      </div>
      <div class="hero-index"><span>01</span> / 04</div>
    </section>

    <section id="katalog" class="catalog-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Menu andalan kami</p>
          <h2>Pilih sodamu</h2>
        </div>
        <span class="product-count">{{ products.length }} pilihan soda</span>
      </div>

      <div class="product-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="promise-banner">
      <span class="promise-icon" aria-hidden="true">✦</span>
      <div>
        <strong>Soda dingin, suasana makin seru.</strong>
        <p>Disiapkan segar saat dipesan untuk melepas dahaga.</p>
      </div>
      <span class="promise-arrow" aria-hidden="true">↗</span>
    </section>
  </div>
</template>
