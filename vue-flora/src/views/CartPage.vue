<template>
  <div class="cart-page">
    <div v-if="cartItems.length === 0" class="empty-message">
      Ton panier est vide pour le moment, mais on peut y remédier ?
      <button @click="goToHome" class="btn btn-home">Notre sélection</button>
    </div>

    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="`http://localhost:3000/${item.product?.photo}`" :alt="item.product?.name" />
        <div class="details">
          <h2>{{ item.product?.name }}</h2>
          <p>Quantité : {{ item.quantity }}</p>
          <p class="price">{{ item.product?.price }} €</p>
        </div>
        <button @click="removeFromCart(item.id)">Supprimer</button>
      </div>
      
      <div class="payment-section">
        <button @click="payer" class="btn btn-primary">Payer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_51Rb17TEHj2I2uZfVCmeG6TZEyDlEGOiqdxb9PXNGQWS9wOmXDXadnqytF9jHwm82uGbDZA99AACHN0pFT7I2khv6009I6JYP18')

const cartItems = ref([])
const router = useRouter()

const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit ${productId}:`, error)
    return null
  }
}

const fetchCart = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const rawCart = await response.json()

  
    const cartWithProducts = await Promise.all(
      rawCart.map(async item => {
        const product = await fetchProductDetails(item.product_id)
        return {
          ...item,
          product
        }
      })
    )

    cartItems.value = cartWithProducts
  } catch (error) {
    console.error('Erreur lors du chargement du panier:', error)
  }
}

const removeFromCart = async (id) => {
  const token = localStorage.getItem('token')
  try {
    await fetch(`http://localhost:3000/api/cart/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    cartItems.value = cartItems.value.filter(item => item.id !== id)
  } catch (error) {
    console.error('Erreur lors de la suppression :', error)
  }
}

const clearCart = async () => {
  const token = localStorage.getItem('token')
  try {
    await fetch('http://localhost:3000/api/cart/clear', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    cartItems.value = []
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error)
  }
}

const payer = async () => {
  const stripe = await stripePromise

 
  const items = cartItems.value.map(item => ({
    name: item.product?.name || 'Produit',
    price: item.product?.price || 0,
    quantity: item.quantity,
    product_id: item.product_id 
  }))


  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0)

  try {
    const token = localStorage.getItem('token')
    
    // commande
    const orderData = {
      items: items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      })),
      total_amount: totalAmount
    }

    const orderResponse = await axios.post('http://localhost:3000/api/orders', 
      orderData,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    console.log('Commande créée:', orderResponse.data)

    // session Stripe
    const stripeResponse = await axios.post('http://localhost:3000/api/create-checkout-session', 
      { items },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    const sessionId = stripeResponse.data.id
    
    // rediriger vers Stripe
    await stripe.redirectToCheckout({ sessionId })

  } catch (error) {
    console.error('Erreur lors du paiement', error)
    alert("Une erreur est survenue lors de la création de la commande.")
  }
}

const goToHome = () => {
  router.push('/')
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchCart()
})
</script>

<style scoped>
.cart-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(104vh - 700px);
  margin-top: 150px;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #6E833E;
}

.empty-message {
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
  margin-right: 1rem;
}

.details {
  flex: 1;
}

.details h2 {
  margin: 0;
  font-size: 18px;
}

.price {
  color: #546331;
  font-weight: bold;
  margin-top: 0.5rem;
}

button {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c62828;
}

.payment-section {
  margin-top: 2rem;
  text-align: center;
}

.btn {
  background-color: #6E833E;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #546331;
}

.btn-primary {
  background-color: #6E833E;
}

.btn-primary:hover {
  background-color: #546331;
}

.btn-home {
  background-color: #B7CE66;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-home:hover {
  background-color: #A5B855;
}
</style>
