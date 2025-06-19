<template>
  <div class="form-account">
    <h2>Modifier mes informations</h2>
    
    <form @submit.prevent="updateAccount" class="account-form">
      <div class="form-sections-container">
        <!-- Informations perso -->
        <div class="form-section left-section">
          <h3>Informations personnelles</h3>
          
          <div class="form-group">
            <label for="email">Email :</label>
            <input
              id="email"
              type="email"
              v-model="formData.email"
              :class="{ invalid: emailError }"
              required
            />
            <p v-if="emailError" class="error-msg">{{ emailError }}</p>
          </div>

          <div class="form-group">
            <label for="firstname">Prénom :</label>
            <input
              id="firstname"
              type="text"
              v-model="formData.firstname"
              required
            />
          </div>

          <div class="form-group">
            <label for="lastname">Nom :</label>
            <input
              id="lastname"
              type="text"
              v-model="formData.lastname"
              required
            />
          </div>
        </div>

        <!-- Changer le mot de passe -->
        <div class="form-section right-section">
          <h3>Changer le mot de passe</h3>
          
          <div class="form-group">
            <label for="currentPassword">Mot de passe actuel :</label>
            <input
              id="currentPassword"
              type="password"
              v-model="formData.currentPassword"
              placeholder="Laissez vide si vous ne voulez pas changer"
            />
          </div>

          <div class="form-group">
            <label for="newPassword">Nouveau mot de passe :</label>
            <input
              id="newPassword"
              type="password"
              v-model="formData.newPassword"
              :class="{ invalid: passwordError }"
              placeholder="Laissez vide si vous ne voulez pas changer"
              @input="validatePassword"
            />
            
            <!-- Indicateurs de sécurité du mot de passe -->
            <div v-if="formData.newPassword" class="password-requirements">
              <div class="requirement" :class="{ valid: hasMinLength }">
                ✓ 8 caractères
              </div>
              <div class="requirement" :class="{ valid: hasSpecialChar }">
                ✓ 1 caractère spécial
              </div>
              <div class="requirement" :class="{ valid: hasNumber }">
                ✓ 1 chiffre
              </div>
              <div class="requirement" :class="{ valid: hasUppercase }">
                ✓ 1 majuscule
              </div>
              <div class="requirement" :class="{ valid: hasLowercase }">
                ✓ 1 minuscule
              </div>
            </div>
            
            <p v-if="passwordError" class="error-msg">{{ passwordError }}</p>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmer le nouveau mot de passe :</label>
            <input
              id="confirmPassword"
              type="password"
              v-model="formData.confirmPassword"
              :class="{ invalid: confirmPasswordError }"
              placeholder="Confirmez votre nouveau mot de passe"
            />
            <p v-if="confirmPasswordError" class="error-msg">{{ confirmPasswordError }}</p>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="form-actions">
        <button type="submit" class="save-btn" :disabled="!isFormValid">
          Sauvegarder les modifications
        </button>
      </div>
    </form>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  email: '',
  firstname: '',
  lastname: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const originalData = ref({})
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const successMessage = ref('')

const hasMinLength = ref(false)
const hasSpecialChar = ref(false)
const hasNumber = ref(false)
const hasUppercase = ref(false)
const hasLowercase = ref(false)

const isFormValid = computed(() => {
  const hasBasicInfo = formData.value.email && formData.value.firstname && formData.value.lastname
  const passwordsMatch = !formData.value.newPassword || 
    (formData.value.newPassword === formData.value.confirmPassword)
  const hasCurrentPassword = !formData.value.newPassword || formData.value.currentPassword
  
  return hasBasicInfo && passwordsMatch && hasCurrentPassword && 
         !emailError.value && !passwordError.value && !confirmPasswordError.value
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    emailError.value = 'Format d\'email invalide'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  const password = formData.value.newPassword
  
  if (!password) {
    hasMinLength.value = false
    hasSpecialChar.value = false
    hasNumber.value = false
    hasUppercase.value = false
    hasLowercase.value = false
    passwordError.value = ''
    return
  }

  hasMinLength.value = password.length >= 8
  hasSpecialChar.value = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  hasNumber.value = /\d/.test(password)
  hasUppercase.value = /[A-Z]/.test(password)
  hasLowercase.value = /[a-z]/.test(password)

  if (hasMinLength.value && hasSpecialChar.value && hasNumber.value && hasUppercase.value && hasLowercase.value) {
    passwordError.value = ''
  } else {
    passwordError.value = 'Le mot de passe ne respecte pas tous les critères'
  }
}

const validateConfirmPassword = () => {
  if (formData.value.newPassword && formData.value.newPassword !== formData.value.confirmPassword) {
    confirmPasswordError.value = 'Les mots de passe ne correspondent pas'
  } else {
    confirmPasswordError.value = ''
  }
}

const loadUserData = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (response.ok) {
      const userData = await response.json()
      formData.value.email = userData.email || ''
      formData.value.firstname = userData.firstname || ''
      formData.value.lastname = userData.lastname || ''
      
      originalData.value = { ...formData.value }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
}

const updateAccount = async () => {
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (!isFormValid.value) return

  const token = localStorage.getItem('token')
  const updateData = {
    email: formData.value.email,
    firstname: formData.value.firstname,
    lastname: formData.value.lastname
  }


  if (formData.value.newPassword) {
    updateData.currentPassword = formData.value.currentPassword
    updateData.newPassword = formData.value.newPassword
  }

  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    })

    if (response.ok) {
      if (formData.value.newPassword) {
        successMessage.value = 'Informations et mot de passe mis à jour avec succès!'
      } else {
        successMessage.value = 'Informations mises à jour avec succès!'
      }
      
      // Scroll 
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      originalData.value = { ...formData.value }
      
      // Réinitialiser les champs de mot de passe
      formData.value.currentPassword = ''
      formData.value.newPassword = ''
      formData.value.confirmPassword = ''
      
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    } else {
      const errorData = await response.json()
      if (errorData.error === 'Current password is incorrect') {
        alert('Le mot de passe actuel est incorrect')
      } else {
        alert('Erreur lors de la mise à jour: ' + (errorData.error || 'Erreur inconnue'))
      }
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la mise à jour')
  }
}

const resetForm = () => {
  formData.value = { ...originalData.value }
  formData.value.currentPassword = ''
  formData.value.newPassword = ''
  formData.value.confirmPassword = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  successMessage.value = ''
}

onMounted(loadUserData)
</script>

<style scoped>
.form-account {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-sections-container {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-section {
  flex: 1;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #6E833E;
}

.left-section {
  border-left-color: #6E833E;
}

.right-section {
  border-left-color: #B7CE66;
}

h2 {
  text-align: center;
  color: #6E833E;
  margin-bottom: 2rem;
}

.form-section h3 {
  color: #4b5943;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #6E833E;
}

.form-group input.invalid {
  border-color: #dc3545;
}

.error-msg {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.save-btn {
  background-color: #6E833E;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.save-btn:hover:not(:disabled) {
  background-color: #5a6d33;
}

.save-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  text-align: center;
  font-weight: bold;
}

.password-requirements {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.requirement {
  font-size: 0.9rem;
  margin: 0.25rem 0;
  color: #dc3545;
  transition: color 0.3s ease;
}

.requirement.valid {
  color: #28a745;
  font-weight: bold;
}

@media (max-width: 768px) {
  .form-account {
    padding: 1rem;
  }
  
  .form-sections-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>
