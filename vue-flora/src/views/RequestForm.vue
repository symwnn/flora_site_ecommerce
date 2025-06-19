<template>
  <div class="page-container">
    <button class="back-button" @click="goBack">
      ← Retour
    </button>
    
    <section class="request-form">
      <h2>Faire une demande</h2>
      
      <form @submit.prevent="submitForm">
        <div class="row name-row">
          <input type="text" placeholder="Prénom" v-model="firstName" required />
          <input type="text" placeholder="Nom" v-model="lastName" required />
        </div>

        <div class="row">
          <select v-model="location" required>
            <option value="">Pour quel établissement voulez-vous faire une demande ?</option>
            <option value="Bordeaux">Bordeaux</option>
            <option value="Paris">Paris</option>
            <option value="Royan">Royan</option>
            <option value="Toulouse">Toulouse</option>
          </select>
        </div>

        <!-- Gender -->
        <div class="row">
          <label>Quel est votre genre ?</label>
          <div class="gender-buttons">
            <button
              type="button"
              :class="{ selected: who === 'femme' }"
              @click="toggleGender('femme')"
            >
              Femme
            </button>
            <button
              type="button"
              :class="{ selected: who === 'homme' }"
              @click="toggleGender('homme')"
            >
              Homme
            </button>
            <button
              type="button"
              :class="{ selected: who === 'non binaire' }"
              @click="toggleGender('non binaire')"
            >
              Non binaire
            </button>
            <button
              type="button"
              :class="{ selected: who === 'autres' }"
              @click="toggleGender('autres')"
            >
              Autres
            </button>
          </div>
        </div>

        <!-- Case description -->
        <div class="row">
          <label>Décrivez votre demande.</label>
          <textarea
            v-model="description"
            placeholder="En quoi pouvons-nous vous aider ?"
            rows="6"
            required
          ></textarea>
        </div>

        <!-- Email -->
        <div class="row">
          <input
            type="email"
            placeholder="Votre email"
            v-model="email"
            @input="validateEmail"
            :class="{ invalid: emailError }"
            required
          />
          <p v-if="emailError" class="error-msg">{{ emailError }}</p>
        </div>

        <!-- Phone -->
        <div class="row">
          <label>Téléphone</label>
          <input
            type="tel"
            placeholder="Un numéro de téléphone pour vous rappeler ?"
            v-model="phone"
            @input="validatePhone"
            :class="{ invalid: phoneError }"
            required
            style="padding: 10px 16px; font-size: 1rem; border-radius: 8px; width: 100%;"
          />
          <p v-if="phoneError" class="error-msg">{{ phoneError }}</p>
        </div>

        <!-- Submit button -->
        <div class="row submit-row">
          <button 
            type="submit" 
            :disabled="!isFormValid"
          >
            Envoyer ➤
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const location = ref('')
const who = ref('')
const description = ref('')
const email = ref('')
const phone = ref('')

const emailError = ref('')
const phoneError = ref('')

// Computed property pour vérifier si le formulaire est valide
const isFormValid = computed(() => {
  return firstName.value.trim() !== '' &&
         lastName.value.trim() !== '' &&
         location.value !== '' &&
         who.value !== '' &&
         description.value.trim() !== '' &&
         email.value.trim() !== '' &&
         phone.value.trim() !== '' &&
         !emailError.value &&
         !phoneError.value
})

const toggleGender = (genre) => {
  if (who.value === genre) {
    who.value = ''  // déselectionne si on reclique
  } else {
    who.value = genre
  }
}

const validateEmail = () => {
  if (!email.value.includes('@') || (!email.value.endsWith('.fr') && !email.value.endsWith('.com'))) {
    emailError.value = "Email invalide."
  } else {
    emailError.value = ''
  }
}

const validatePhone = () => {
  const digitsOnly = phone.value.replace(/\D/g, '')
  if (digitsOnly.length !== 10) {
    phoneError.value = 'Numéro invalide.'
  } else {
    phoneError.value = ''
  }
}

const submitForm = () => {
  validateEmail()
  validatePhone()

  if (isFormValid.value) {
    console.log('Form submitted:', {
      firstName: firstName.value,
      lastName: lastName.value,
      location: location.value,
      who: who.value,
      description: description.value,
      email: email.value,
      phone: phone.value
    })
    alert('Formulaire envoyé avec succès !')
    
    // Redirection vers la page account
    router.push('/account')
  }
}

// Fonction pour retourner à la page précédente
const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.page-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-top: 120px;
}

.back-button {
  position: absolute;
  top: 140px;
  left: 2rem;
  background: none;
  border: 2px solid #8FB43A;
  color: #8FB43A;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  z-index: 10;
}

.back-button:hover {
  background-color: #8FB43A;
  color: white;
  transform: translateX(-3px);
}

.request-form {
  max-width: 700px;
  margin: 2rem auto;
  background: #fff;
  padding: 2.5rem 3rem;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 2rem 0;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.row.name-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.row.name-row input {
  flex: 1;
  min-width: 150px;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  outline: none;
}

input[type="text"],
input[type="tel"],
input[type="email"],
textarea {
  font-family: inherit;
  color: #333;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
}

input.invalid {
  border-color: #ff4d4d !important;
  box-shadow: 0 0 5px rgba(255, 77, 77, 0.6);
}

.error-msg {
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-top: 4px;
  font-style: italic;
}

.row {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

textarea {
  resize: vertical; /* Permet de redimensionner verticalement seulement */
  min-height: 120px;
}

textarea::placeholder {
  color: #aaa;
  font-style: italic;
}

@media (max-width: 480px) {
  .row.name-row {
    flex-direction: column;
  }
}

select {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #444;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

option[disabled][selected] {
  color: #aaa;
  font-style: italic;
}

.gender-buttons {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.gender-buttons button {
  flex: 1;
  min-width: 100px;
  padding: 10px 0;
  border: 2px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
  user-select: none;
}

.gender-buttons button:hover {
  border-color: #B7CE66;
  background-color: #E8EACC;
  color: #4B5943;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gender-buttons button.selected {
  border-color: #E8EACC;
  background-color: #B7CE66;
  color: #4B5943;
}

.gender-buttons button.selected:hover {
  background-color: #A5BD5A;
  transform: translateY(-2px);
}

.submit-row button {
  background-color: #8FB43A;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 12px 28px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  user-select: none;
}

.submit-row button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-row button:hover:not(:disabled) {
  background-color: #B7CE66;
  transform: translateY(-3px);
}

.submit-row button:active:not(:disabled) {
  transform: translateY(0);
}
</style>
