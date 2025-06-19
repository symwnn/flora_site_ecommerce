<template>
  <div class="success-page">
    <div class="success-container">
      <div class="success-icon">✅</div>
      <h1>Paiement réussi !</h1>
      <p>Votre commande a été passée avec succès.</p>
      <p>Vous recevrez un email de confirmation sous peu.</p>
      
      <div class="actions">
        <button @click="goToOrders" class="btn btn-primary">Voir mes commandes</button>
        <button @click="goToHome" class="btn btn-secondary">Retour à l'accueil</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToOrders = () => {
  router.push('/orders')
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.success-container {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

h1 {
  color: #6E833E;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
  color: #666;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #6E833E;
  color: white;
}

.btn-primary:hover {
  background-color: #546331;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
</style>