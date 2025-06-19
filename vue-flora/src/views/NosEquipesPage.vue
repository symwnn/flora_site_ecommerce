<template>
  <div class="nos-equipes-page">
    <section class="section first-section">
      <div class="container">
        <h2>Pourquoi nous rejoindre ?</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <h3>Passion du métier</h3>
            <p>Travaillez avec des matières nobles et exprimez votre créativité au quotidien dans un environnement inspirant.</p>
          </div>
          <div class="benefit-card">
            <h3>Formation continue</h3>
            <p>Développez vos compétences grâce à nos formations régulières sur les dernières tendances florales.</p>
          </div>
          <div class="benefit-card">
            <h3>Esprit d'équipe</h3>
            <p>Rejoignez une équipe bienveillante et passionnée dans un cadre de travail convivial.</p>
          </div>
          <div class="benefit-card">
            <h3>Évolution professionnelle</h3>
            <p>Évoluez au sein de notre réseau en expansion avec de nombreuses opportunités de carrière.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section positions-section">
      <div class="container">
        <h2>Nos postes à pourvoir</h2>
        <div class="positions-grid">
          <div class="position-card">
            <h3>Fleuriste confirmé(e)</h3>
            <p><strong>Lieu :</strong> Bordeaux, Paris, Toulouse</p>
            <p><strong>Type :</strong> CDI</p>
            <p>Création de compositions florales, conseil clientèle, entretien des fleurs. Expérience requise : 2 ans minimum.</p>
          </div>
          <div class="position-card">
            <h3>Apprenti(e) fleuriste</h3>
            <p><strong>Lieu :</strong> Tous nos magasins</p>
            <p><strong>Type :</strong> Alternance</p>
            <p>Formation en alternance pour apprendre le métier de fleuriste au sein de nos équipes expérimentées.</p>
          </div>
          <div class="position-card">
            <h3>Responsable de magasin</h3>
            <p><strong>Lieu :</strong> Royan</p>
            <p><strong>Type :</strong> CDI</p>
            <p>Management d'équipe, gestion commerciale, relation clientèle. Expérience en management souhaitée.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulaire -->
    <section class="section form-section">
      <div class="container">
        <h2>Postulez maintenant !</h2>
        <form @submit.prevent="submitApplication" class="application-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prénom *</label>
              <input
                id="firstName"
                type="text"
                v-model="application.firstName"
                required
              />
            </div>
            <div class="form-group">
              <label for="lastName">Nom *</label>
              <input
                id="lastName"
                type="text"
                v-model="application.lastName"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email *</label>
              <input
                id="email"
                type="email"
                v-model="application.email"
                @input="validateEmail"
                :class="{ invalid: emailError }"
                required
              />
              <p v-if="emailError" class="error-msg">{{ emailError }}</p>
            </div>
            <div class="form-group">
              <label for="phone">Téléphone *</label>
              <input
                id="phone"
                type="tel"
                v-model="application.phone"
                @input="validatePhone"
                :class="{ invalid: phoneError }"
                required
              />
              <p v-if="phoneError" class="error-msg">{{ phoneError }}</p>
            </div>
          </div>

          <div class="form-group">
            <label for="position">Poste souhaité *</label>
            <select id="position" v-model="application.position" required>
              <option value="">Sélectionnez un poste</option>
              <option value="fleuriste-confirme">Fleuriste confirmé(e)</option>
              <option value="apprenti-fleuriste">Apprenti(e) fleuriste</option>
              <option value="responsable-magasin">Responsable de magasin</option>
              <option value="autre">Autre (précisez dans le message)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="location">Magasin de préférence</label>
            <select id="location" v-model="application.location">
              <option value="">Indifférent</option>
              <option value="bordeaux">Bordeaux</option>
              <option value="paris">Paris</option>
              <option value="royan">Royan</option>
              <option value="toulouse">Toulouse</option>
            </select>
          </div>

          <div class="form-group">
            <label for="experience">Années d'expérience</label>
            <select id="experience" v-model="application.experience">
              <option value="">Sélectionnez</option>
              <option value="0">Débutant(e)</option>
              <option value="1-2">1-2 ans</option>
              <option value="3-5">3-5 ans</option>
              <option value="5+">Plus de 5 ans</option>
            </select>
          </div>

          <div class="form-group">
            <label for="cv">CV (PDF, DOC, DOCX) *</label>
            <input
              id="cv"
              type="file"
              @change="handleFileUpload"
              accept=".pdf,.doc,.docx"
              required
              class="file-input"
            />
            <p v-if="fileError" class="error-msg">{{ fileError }}</p>
          </div>

          <div class="form-group">
            <label for="coverLetter">Lettre de motivation</label>
            <textarea
              id="coverLetter"
              v-model="application.coverLetter"
              rows="6"
              placeholder="Parlez-nous de votre motivation à rejoindre nos équipes..."
            ></textarea>
          </div>

          <div class="form-group">
            <label for="message">Message complémentaire</label>
            <textarea
              id="message"
              v-model="application.message"
              rows="4"
              placeholder="Informations supplémentaires, disponibilités..."
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" :disabled="!isFormValid" class="submit-btn">
              Envoyer ma candidature
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const application = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  location: '',
  experience: '',
  cv: null,
  coverLetter: '',
  message: ''
})

const emailError = ref('')
const phoneError = ref('')
const fileError = ref('')

const isFormValid = computed(() => {
  return application.value.firstName &&
         application.value.lastName &&
         application.value.email &&
         application.value.phone &&
         application.value.position &&
         application.value.cv &&
         !emailError.value &&
         !phoneError.value &&
         !fileError.value
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(application.value.email)) {
    emailError.value = 'Format d\'email invalide'
  } else {
    emailError.value = ''
  }
}

const validatePhone = () => {
  const digitsOnly = application.value.phone.replace(/\D/g, '')
  if (digitsOnly.length !== 10) {
    phoneError.value = 'Numéro de téléphone invalide'
  } else {
    phoneError.value = ''
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    if (file.size > maxSize) {
      fileError.value = 'Le fichier ne doit pas dépasser 5MB'
      application.value.cv = null
    } else if (!allowedTypes.includes(file.type)) {
      fileError.value = 'Format non supporté. Utilisez PDF, DOC ou DOCX'
      application.value.cv = null
    } else {
      fileError.value = ''
      application.value.cv = file
    }
  }
}

const submitApplication = () => {
  validateEmail()
  validatePhone()

  if (isFormValid.value) {
    console.log('Candidature envoyée:', application.value)
    alert('Candidature envoyée avec succès ! Nous vous contacterons rapidement.')
    
    // Reset form
    application.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      location: '',
      experience: '',
      cv: null,
      coverLetter: '',
      message: ''
    }
    
    // Reset file input
    document.getElementById('cv').value = ''
  }
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.nos-equipes-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f8f3 0%, #e8eacc 100%);
}

.first-section {
  padding-top: 120px;
}

.section {
  padding: 4rem 0;
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

.benefit-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border-left: 4px solid #B7CE66;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.benefit-card h3 {
  font-size: 1.3rem;
  color: #4B5943;
  margin-bottom: 1rem;
}

.benefit-card p {
  color: #666;
  line-height: 1.6;
}

.positions-section {
  background: white;
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.position-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid #6E833E;
  transition: transform 0.3s ease;
}

.position-card:hover {
  transform: translateY(-3px);
}

.position-card h3 {
  color: #4B5943;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.position-card p {
  color: #555;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.form-section {
  background: white;
}

.application-form {
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

.form-row .form-group {
  margin-bottom: 1rem;
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
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #B7CE66;
}

.form-group input.invalid {
  border-color: #dc3545;
}

.file-input {
  padding: 0.5rem !important;
}

.error-msg {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  text-align: center;
  margin-top: 2rem;
}

.submit-btn {
  background: linear-gradient(135deg, #B7CE66 0%, #8FB43A 100%);
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(183, 206, 102, 0.4);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .application-form {
    padding: 2rem;
  }
  
  .benefits-grid,
  .positions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
