<template>
  <div class="cadeaux-page">
    <section class="hero-section">
    </section>

    <section class="benefits-section first-section">
      <div class="container">
        <h2>Pourquoi choisir une carte cadeau ?</h2>
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-icon">
              <img src="/iconss/Cadeau.png" alt="Cadeau" />
            </div>
            <h3>Cadeau parfait</h3>
            <p>Laissez le destinataire choisir ses fleurs préférées.</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <img src="/iconss/Date.png" alt="Cadeau" />
            </div>
            <h3>Sans date limite</h3>
            <p>Valable un an à partir de la date d'achat.</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <img src="/iconss/Message.png" alt="Cadeau" />
            </div>
            <h3>Message personnalisé</h3>
            <p>Ajoutez votre message personnel sur la carte.</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <img src="/iconss/Format.png" alt="Cadeau" />
            </div>
            <h3>Format numérique</h3>
            <p>Envoi immédiat par email ou à une date choisie.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cards-section">
      <div class="container">
        <h2>Choisissez votre montant</h2>
        <div class="cards-grid">
          <div class="gift-card" :class="{ selected: selectedAmount === 25 }" @click="selectAmount(25)">
            <div class="card-design">
              <div class="card-amount">25€</div>
            </div>
            <p>Parfait pour une attention chaleureuse.</p>
          </div>

          <div class="gift-card popular" :class="{ selected: selectedAmount === 50 }" @click="selectAmount(50)">
            <div class="popular-badge">Plus populaire</div>
            <div class="card-design">
              <div class="card-amount">50€</div>
            </div>
            <p>Idéal pour une Composition complète.</p>
          </div>

          <div class="gift-card" :class="{ selected: selectedAmount === 75 }" @click="selectAmount(75)">
            <div class="card-design">
              <div class="card-amount">75€</div>
            </div>
            <p>Pour une création généreuse !</p>
          </div>

          <div class="gift-card" :class="{ selected: selectedAmount === 100 }" @click="selectAmount(100)">
            <div class="card-design">
              <div class="card-amount">100€</div>
            </div>
            <p>Cadeau de starslay!</p>
          </div>

          <div class="gift-card custom" :class="{ selected: selectedAmount === 'custom' }" @click="selectAmount('custom')">
            <div class="card-design">
              <div class="card-amount">?€</div>
            </div>
            <p>Montant personnalisé.</p>
          </div>
        </div>

        <div v-if="selectedAmount === 'custom'" class="custom-amount">
          <label for="customAmount">Montant personnalisé (minimum 15€) :</label>
          <input 
            id="customAmount"
            type="number" 
            v-model="customAmount" 
            min="15" 
            max="500"
            placeholder="Entrez le montant"
          />
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="container">
        <h2>Personnalisez votre carte cadeau</h2>
        <form @submit.prevent="purchaseGiftCard" class="gift-form">
          <div class="form-row">
            <div class="form-group">
              <label for="recipientName">Nom du destinataire *</label>
              <input
                id="recipientName"
                type="text"
                v-model="giftCard.recipientName"
                required
              />
            </div>
            <div class="form-group">
              <label for="recipientEmail">Email du destinataire *</label>
              <input
                id="recipientEmail"
                type="email"
                v-model="giftCard.recipientEmail"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="senderName">Votre nom *</label>
              <input
                id="senderName"
                type="text"
                v-model="giftCard.senderName"
                required
              />
            </div>
            <div class="form-group">
              <label for="sendDate">Date d'envoi</label>
              <input
                id="sendDate"
                type="date"
                v-model="giftCard.sendDate"
                :min="today"
              />
              <small>Laissez vide pour un envoi immédiat</small>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message personnel (optionnel)</label>
            <textarea
              id="message"
              v-model="giftCard.message"
              rows="4"
              maxlength="200"
              placeholder="Écrivez votre message personnel..."
            ></textarea>
            <small>{{ messageLength }}/200 caractères</small>
          </div>

          <div class="form-summary">
            <div class="summary-item">
              <strong>Montant : {{ finalAmount }}€</strong>
            </div>
            <div class="summary-item">
              <span>Destinataire : {{ giftCard.recipientName || 'Non renseigné' }}</span>
            </div>
            <div class="summary-item">
              <span>Envoi : {{ giftCard.sendDate ? formatDate(giftCard.sendDate) : 'Immédiat' }}</span>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" :disabled="!isFormValid" class="purchase-btn">
              Acheter la carte cadeau - {{ finalAmount }}€
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const selectedAmount = ref(50)
const customAmount = ref('')

const giftCard = ref({
  recipientName: '',
  recipientEmail: '',
  senderName: '',
  sendDate: '',
  message: ''
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const finalAmount = computed(() => {
  if (selectedAmount.value === 'custom') {
    return customAmount.value || 0
  }
  return selectedAmount.value
})

const messageLength = computed(() => {
  return giftCard.value.message.length
})

const isFormValid = computed(() => {
  const hasValidAmount = selectedAmount.value !== 'custom' || 
                        (customAmount.value >= 15 && customAmount.value <= 500)
  
  return giftCard.value.recipientName &&
         giftCard.value.recipientEmail &&
         giftCard.value.senderName &&
         hasValidAmount &&
         finalAmount.value >= 15
})

const selectAmount = (amount) => {
  if (selectedAmount.value === amount) {
    selectedAmount.value = null
    customAmount.value = ''
  } else {
    selectedAmount.value = amount
    if (amount !== 'custom') {
      customAmount.value = ''
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const purchaseGiftCard = () => {
  if (isFormValid.value) {
    console.log('Carte cadeau commandée:', {
      amount: finalAmount.value,
      ...giftCard.value
    })
    alert(`Carte cadeau de ${finalAmount.value}€ commandée avec succès ! Un email de confirmation va être envoyé.`)
    
    // Reset form
    selectedAmount.value = 50
    customAmount.value = ''
    giftCard.value = {
      recipientName: '',
      recipientEmail: '',
      senderName: '',
      sendDate: '',
      message: ''
    }
  }
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.cadeaux-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f8f3 0%, #e8eacc 100%);
}

.hero-section {
  padding: 120px 0 0;
}

.first-section {
  padding-top: 2rem;
}

.benefits-section {
  padding: 4rem 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

h2 {
  font-size: 2.5rem;
  color: #4B5943;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.benefit-item {
  text-align: center;
  padding: 1.5rem;
}

.benefit-icon {
  margin-bottom: 1rem;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.benefit-icon img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.benefit-item h3 {
  color: #4B5943;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.benefit-item p {
  color: #666;
  line-height: 1.5;
}

.cards-section {
  padding: 4rem 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.gift-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  position: relative;
}

.gift-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.gift-card.selected {
  border-color: #FFD700;
  background: #fffef7;
}

.gift-card.popular {
  border-color: transparent;
}

.gift-card.popular.selected {
  border-color: #FFD700;
}

.popular-badge {
  position: absolute;
  top: -8px;
  right: 1rem;
  background: #FFD700;
  color: #4B5943;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.card-design {
  background: #B7CE66;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  position: relative;
}

.card-amount {
  font-size: 2rem;
  font-weight: bold;
}

.card-decoration {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 30px;
  height: 30px;
}

.card-decoration img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.gift-card.custom .card-design {
  background: #6E833E;
}

.gift-card p {
  color: #666;
  font-size: 0.9rem;
}

.custom-amount {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 1rem;
}

.custom-amount label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4B5943;
}

.custom-amount input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-section {
  padding: 4rem 0;
  background: white;
}

.gift-form {
  max-width: 800px;
  margin: 0 auto;
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4B5943;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #B7CE66;
}

.form-group small {
  color: #666;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

.form-summary {
  background: #e8f5e8;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.summary-item {
  margin-bottom: 0.5rem;
  color: #4B5943;
}

.form-actions {
  text-align: center;
}

.purchase-btn {
  background: linear-gradient(135deg, #B7CE66 0%, #8FB43A 100%);
  color: white;
  padding: 1rem 3rem;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.purchase-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(183, 206, 102, 0.4);
}

.purchase-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .gift-form {
    padding: 2rem;
  }
  
  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
