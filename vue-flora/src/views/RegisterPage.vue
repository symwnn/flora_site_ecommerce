<template>
  <div class="register-page">
    <h1>Inscription</h1>
    <form @submit.prevent="handleRegister" class="register-form">
      <input
        v-model="login"
        type="text"
        placeholder="Nom d'utilisateur"
        required
        autocomplete="username"
      />
      
      <div class="password-container">
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          required
          autocomplete="new-password"
          @input="validatePassword"
          :class="{ invalid: passwordError }"
        />
        <p v-if="passwordError" class="error-msg">{{ passwordError }}</p>
        
        <!-- Critères de validation -->
        <div v-if="password" class="password-criteria">
          <div class="criteria-item" :class="{ valid: hasMinLength }">
            ✓ Minimum 8 caractères
          </div>
          <div class="criteria-item" :class="{ valid: hasUppercase }">
            ✓ 1 majuscule minimum
          </div>
          <div class="criteria-item" :class="{ valid: hasLowercase }">
            ✓ 1 minuscule minimum
          </div>
          <div class="criteria-item" :class="{ valid: hasNumber }">
            ✓ 1 chiffre minimum
          </div>
          <div class="criteria-item" :class="{ valid: hasSpecialChar }">
            ✓ 1 caractère spécial minimum
          </div>
        </div>
      </div>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        autocomplete="email"
      />
      <input
        v-model="firstname"
        type="text"
        placeholder="Prénom"
        required
      />
      <input
        v-model="lastname"
        type="text"
        placeholder="Nom"
        required
      />
      <button type="submit" :disabled="!isFormValid">S'inscrire</button>
    </form>

    <p class="login-link">
      Déjà un compte ? <RouterLink to="/login">Connectez-vous</RouterLink>
    </p>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const login = ref('')
const password = ref('')
const email = ref('')
const firstname = ref('')
const lastname = ref('')
const errorMessage = ref('')
const passwordError = ref('')
const router = useRouter()

// Critères de validation du mot de passe
const hasMinLength = ref(false)
const hasUppercase = ref(false)
const hasLowercase = ref(false)
const hasNumber = ref(false)
const hasSpecialChar = ref(false)

// Vérifier si le formulaire est valide
const isFormValid = computed(() => {
  return login.value && 
         password.value && 
         email.value && 
         firstname.value && 
         lastname.value && 
         hasMinLength.value && 
         hasUppercase.value && 
         hasLowercase.value && 
         hasNumber.value && 
         hasSpecialChar.value
})

const validatePassword = () => {
  const pwd = password.value
  
  hasMinLength.value = pwd.length >= 8
  hasUppercase.value = /[A-Z]/.test(pwd)
  hasLowercase.value = /[a-z]/.test(pwd)
  hasNumber.value = /\d/.test(pwd)
  hasSpecialChar.value = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)

  if (hasMinLength.value && hasUppercase.value && hasLowercase.value && hasNumber.value && hasSpecialChar.value) {
    passwordError.value = ''
  } else {
    passwordError.value = 'Le mot de passe ne respecte pas tous les critères'
  }
}

async function handleRegister() {
  errorMessage.value = ''

  // Validation finale
  if (!isFormValid.value) {
    errorMessage.value = 'Veuillez remplir tous les champs et respecter les critères du mot de passe'
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: login.value,
        password: password.value,
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de l\'inscription')
    }

    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.')
    router.push('/login')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px 20px;
  border: 2px solid #4caf50;
  border-radius: 10px;
  background-color: #f6fbf4;
  text-align: center;
  color: #2e7d32;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.password-container {
  position: relative;
  width: 100%;
}

.register-form input {
  width: 100%;
  padding: 12px 15px;
  border: 1.5px solid #4caf50;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.register-form input:focus {
  border-color: #2e7d32;
}

.register-form input.invalid {
  border-color: #d32f2f;
}

.register-form button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
}

.register-form button:hover:not(:disabled) {
  background-color: #2e7d32;
}

.register-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.password-criteria {
  margin-top: 10px;
  text-align: left;
  font-size: 12px;
  background-color: #f0f8f0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  width: 100%;
  box-sizing: border-box;
}

.criteria-item {
  color: #d32f2f;
  margin: 3px 0;
  transition: color 0.3s ease;
}

.criteria-item.valid {
  color: #4caf50;
  font-weight: 600;
}

.error-msg {
  color: #d32f2f;
  font-size: 12px;
  margin-top: 5px;
  text-align: left;
}

.login-link {
  margin-top: 20px;
  font-size: 14px;
  color: #2e7d32;
}

.login-link a {
  color: #4caf50;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #2e7d32;
  text-decoration: underline;
}

.error {
  margin-top: 15px;
  color: #d32f2f;
  font-weight: 600;
}
</style>
