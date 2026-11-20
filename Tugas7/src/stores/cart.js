import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0),
  )
  const subtotal = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0),
  )

  function addItem(product) {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      return
    }

    items.value.push({ ...product, quantity: 1 })
  }

  function removeItem(productId) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function setQuantity(productId, quantity) {
    const item = items.value.find((entry) => entry.id === productId)

    if (!item) return
    item.quantity = Math.max(1, Math.floor(Number(quantity) || 1))
  }

  return { items, totalItems, subtotal, addItem, removeItem, setQuantity }
})
