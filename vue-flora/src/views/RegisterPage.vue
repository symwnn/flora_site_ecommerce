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
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        required
        autocomplete="new-password"
      />
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
      <button type="submit">S'inscrire</button>
    </form>

    <p class="login-link">
      Déjà un compte ? <RouterLink to="/login">Connectez-vous</RouterLink>
    </p>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const login = ref('')
const password = ref('')
const email = ref('')
const firstname = ref('')
const lastname = ref('')
const errorMessage = ref('')
const router = useRouter()

async function handleRegister() {
  errorMessage.value = ''

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
      throw new Error(errorData.message || 'Erreur lors de l’inscription')
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

.register-form input {
  padding: 12px 15px;
  border: 1.5px solid #4caf50;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.register-form input:focus {
  border-color: #2e7d32;
}

.register-form button {
  padding: 12px;
  background-color: #4caf50;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-form button:hover {
  background-color: #2e7d32;
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
