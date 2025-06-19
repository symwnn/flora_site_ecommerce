<template>
  <div v-if="checkingToken" class="loading-message">
    Vérification du token en cours...
  </div>
  <div v-else class="login-page">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <input
        type="text"
        v-model="login"
        placeholder="Nom d'utilisateur"
        required
        autocomplete="username"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Mot de passe"
        required
        autocomplete="current-password"
      />
      <button type="submit">Se connecter</button>
    </form>

    <p class="register-link">
      Pas de compte ? <RouterLink to="/register">Créez-en un</RouterLink>
    </p>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const login = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const checkingToken = ref(true)

async function verifyToken(token) {
  try {
    const response = await fetch('http://localhost:3000/api/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    if (!response.ok) return null
    const data = await response.json()
    return data  // On attend un objet avec au moins is_admin dedans
  } catch (error) {
    console.error('Erreur vérification token :', error)
    return null
  }
}

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const token = localStorage.getItem('token')
  if (token) {
    const userData = await verifyToken(token)
    if (userData) {
      // Si admin = 1, sinon redirige vers account
      if (userData.is_admin === 1) {
        router.push('/admin')
      } else {
        router.push('/account')
      }
      return
    }
  }
  checkingToken.value = false
})

async function handleLogin() {
  errorMessage.value = ''

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: login.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Nom d’utilisateur ou mot de passe incorrect')
    }

    const data = await response.json()

    if (data.token) {
      localStorage.setItem('token', data.token)
      // Après login, on vérifie le rôle admin avant redirection
      const userData = await verifyToken(data.token)
      if (userData?.is_admin === 1) {
        router.push('/admin')
      } else {
        router.push('/account')
      }
    } else {
      throw new Error('Token non reçu')
    }
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<style scoped>
.loading-message {
  margin: 200px auto;
  text-align: center;
  font-size: 18px;
  color: #4caf50;
}

.login-page {
  max-width: 400px;
  margin: 200px auto;
  padding: 30px 20px;
  border: 2px solid #4caf50;
  border-radius: 10px;
  background-color: #f6fbf4;
  text-align: center;
  color: #2e7d32;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.login-form input {
  padding: 12px 15px;
  border: 1.5px solid #4caf50;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.login-form input:focus {
  border-color: #2e7d32;
}

.login-form button {
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

.login-form button:hover {
  background-color: #2e7d32;
}

.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #2e7d32;
}

.register-link a {
  color: #4caf50;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #2e7d32;
  text-decoration: underline;
}

.error {
  margin-top: 15px;
  color: #d32f2f;
  font-weight: 600;
}
</style>
