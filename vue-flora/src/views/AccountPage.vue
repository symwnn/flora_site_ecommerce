<template>
  <div class="form-wrapper">
    <FormAccount />
  </div>
  <div class="account-page-container">
    <section class="account-section">
      <h1>Mon Compte</h1>
      
      <!-- Section Commandes -->
      <div class="orders-section">
        <h2>Mes Commandes</h2>
        
        <div v-if="orders.length === 0" class="empty-message">
          Vous n'avez pas encore passé de commande.
        </div>

        <div v-else class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <div class="order-header">
              <h3>Commande #{{ order.id }}</h3>
              <span class="status" :class="order.status">{{ getStatusText(order.status) }}</span>
            </div>
            
            <div class="order-info">
              <p><strong>Date:</strong> {{ formatDate(order.created_at) }}</p>
              <p><strong>Total:</strong> {{ order.total_amount }} €</p>
            </div>

            <div class="order-items" v-if="order.items && order.items.length > 0">
              <h4>Produits:</h4>
              <div v-for="item in order.items" :key="item.product_id" class="order-item">
                <img :src="`http://localhost:3000/${item.product_photo}`" :alt="item.product_name" />
                <div class="item-details">
                  <span class="name">{{ item.product_name }}</span>
                  <span class="quantity">Quantité: {{ item.quantity }}</span>
                  <span class="price">{{ item.price }} €</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Déconnexion -->
      <div class="logout-section">
        <button @click="showLogoutConfirm" class="logout-btn">Se déconnecter</button>
      </div>
    </section>

    <NewsLetter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FormAccount from '../components/FormAccount.vue'
import NewsLetter from '@/components/NewsLetter.vue'

const router = useRouter()
const orders = ref([])

const fetchOrders = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    orders.value = data
  } catch (error) {
    console.error('Erreur lors du chargement des commandes:', error)
  }
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'En attente',
    'paid': 'Payée',
    'cancelled': 'Annulée'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const showLogoutConfirm = () => {
  if (confirm('Êtes-vous sûr(e) de vouloir vous déconnecter ?')) {
    localStorage.removeItem('token')
    alert('À bientôt ! 👋')
    router.push('/login')
  }
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchOrders()
})
</script>

<style scoped>
.form-wrapper {
  margin-top: 80px;
}

.account-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: 50px auto;
  padding: 20px;
  color: #4b5943;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.account-section {
  background: #f5f7ee;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(75 89 67 / 0.2);
  padding: 40px;
  width: 100%;
  margin-bottom: 40px;
}

h1 {
  text-align: center;
  color: #6E833E;
  margin-bottom: 2rem;
}

/* Section Commandes */
.orders-section {
  margin-bottom: 3rem;
}

h2 {
  color: #6E833E;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #6E833E;
  padding-bottom: 0.5rem;
}

.empty-message {
  text-align: center;
  font-size: 18px;
  color: #888;
  padding: 2rem;
  background: white;
  border-radius: 8px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #6E833E;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.order-header h3 {
  margin: 0;
  color: #4b5943;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status.paid {
  background-color: #d4edda;
  color: #155724;
}

.status.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.order-info {
  margin-bottom: 1.5rem;
}

.order-info p {
  margin: 0.5rem 0;
  color: #666;
}

.order-items h4 {
  margin: 1rem 0 0.5rem 0;
  color: #4b5943;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.order-item img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 6px;
  background: white;
  padding: 4px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.name {
  font-weight: bold;
  color: #4b5943;
}

.quantity {
  color: #666;
  font-size: 14px;
}

.price {
  color: #6E833E;
  font-weight: bold;
}

.logout-section {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: 2px solid #bc1828;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  opacity: 1;
}

.logout-btn:hover {
  background-color: #ef616f;
  border-color: #bc1828;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .order-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .order-item img {
    align-self: center;
  }
}
</style>
