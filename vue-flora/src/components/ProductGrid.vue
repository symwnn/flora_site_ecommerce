<template>
  <div class="product-grid-container">
    <div class="product-grid">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img :src="`http://localhost:3000/${product.photo}`" :alt="product.name" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="price">{{ product.price }} €</p>
        <button @click="openModal(product)">En savoir plus</button>
      </div>
    </div>

    <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <img :src="`http://localhost:3000/${selectedProduct.photo}`" :alt="selectedProduct.name" />
        <h2>{{ selectedProduct.name }}</h2>
        <p class="description">{{ selectedProduct.description }}</p>
        <p class="price">{{ selectedProduct.price }} €</p>
        <button class="add-btn" @click="addToCart(selectedProduct)">Ajouter au panier</button>
        <button class="close-btn" @click="closeModal">Fermer</button>
        <p v-if="message" :class="{'success-msg': success, 'error-msg': !success}">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const products = ref([])
const selectedProduct = ref(null)
const message = ref('')
const success = ref(false)
const router = useRouter()

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Erreur lors du chargement des produits :', error)
  }
}

const openModal = (product) => {
  selectedProduct.value = product
  message.value = ''
}

const closeModal = () => {
  selectedProduct.value = null
  message.value = ''
}

const addToCart = async (product) => {
  const token = localStorage.getItem('token')

  if (!token) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    })

    if (!response.ok) {
      const errData = await response.json()
      throw new Error(errData.message || 'Erreur lors de l’ajout au panier')
    }

    success.value = true
    message.value = 'Produit ajouté au panier avec succès !'
  } catch (error) {
    success.value = false
    message.value = error.message
  }
}

onMounted(fetchProducts)
</script>

<style scoped>
.product-grid-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  background-color: #E8EACC;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
}

.product-card {
  background-color: #f6f7e9;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #759136; 
}

.price {
  font-weight: bold;
  color: #546331;
  margin-bottom: 1rem;
}

.product-card button {
  background-color: #8FB43A;
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product-card button:hover {
  background-color: #B7CE66;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  position: relative;
}

.modal img {
  width: 100%;
  height: 250px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.modal h2 {
  margin-bottom: 1rem;
}

.modal .description {
  font-size: 14px;
  margin-bottom: 1rem;
  color: #594643;
}

.modal .price {
  font-size: 18px;
  font-weight: bold;
  color: #8FB43A;
  margin-bottom: 1.5rem;
}

.add-btn {
  background-color: #8FB43A;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-btn:hover {
  background-color: #B7CE66;
  transform: scale(1.05);
}

.close-btn {
  margin-top: 1rem;
  background-color: transparent;
  color: #666;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #ffffff;
  border-color: #C8D6A2;
}

.success-msg {
  color: #4B5943;
  margin-top: 1rem;
  font-weight: 600;
}

.error-msg {
  color: #d32f2f;
  margin-top: 1rem;
  font-weight: 600;
}
</style>
