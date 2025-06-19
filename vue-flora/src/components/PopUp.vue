<template>
  <div v-if="showCookiePopup" class="cookie-popup">
    <div class="popup-content">
      <div class="popup-icon">
        🍪
      </div>
      <div class="popup-text">
        <h3>Cookies et confidentialité</h3>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
          En continuant à naviguer, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
        </p>
      </div>
      <div class="popup-actions">
        <button @click="acceptCookies" class="accept-btn">
          Accepter tous les cookies
        </button>
        <button @click="declineCookies" class="decline-btn">
          Refuser
        </button>
        <button @click="showSettings" class="settings-btn">
          Paramètres
        </button>
      </div>
    </div>
  </div>

  <!-- Settings Modal -->
  <div v-if="showSettingsModal" class="settings-modal">
    <div class="modal-overlay" @click="closeSettings"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>Paramètres des cookies</h3>
        <button @click="closeSettings" class="close-btn">×</button>
      </div>
      
      <div class="modal-body">
        <div class="cookie-category">
          <div class="category-header">
            <h4>Cookies essentiels</h4>
            <span class="required-badge">Requis</span>
          </div>
          <p>Ces cookies sont nécessaires au fonctionnement du site.</p>
        </div>

        <div class="cookie-category">
          <div class="category-header">
            <h4>Cookies de performance</h4>
            <label class="toggle-switch">
              <input type="checkbox" v-model="cookieSettings.performance">
              <span class="slider"></span>
            </label>
          </div>
          <p>Ces cookies nous aident à améliorer les performances du site.</p>
        </div>

        <div class="cookie-category">
          <div class="category-header">
            <h4>Cookies marketing</h4>
            <label class="toggle-switch">
              <input type="checkbox" v-model="cookieSettings.marketing">
              <span class="slider"></span>
            </label>
          </div>
          <p>Ces cookies sont utilisés pour vous proposer des publicités pertinentes.</p>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="saveSettings" class="save-btn">
          Enregistrer les préférences
        </button>
        <button @click="acceptAllFromSettings" class="accept-all-btn">
          Accepter tout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showCookiePopup = ref(false)
const showSettingsModal = ref(false)

const cookieSettings = ref({
  essential: true,
  performance: false,
  marketing: false
})

const checkCookieConsent = () => {
  showCookiePopup.value = true
}

const acceptCookies = () => {
  localStorage.setItem('cookieConsent', JSON.stringify({
    essential: true,
    performance: true,
    marketing: true,
    timestamp: new Date().toISOString()
  }))
  showCookiePopup.value = false
  console.log('Tous les cookies acceptés')
}

const declineCookies = () => {
  localStorage.setItem('cookieConsent', JSON.stringify({
    essential: true,
    performance: false,
    marketing: false,
    timestamp: new Date().toISOString()
  }))
  showCookiePopup.value = false
  console.log('Cookies non-essentiels refusés')
}

const showSettings = () => {
  showSettingsModal.value = true
}

const closeSettings = () => {
  showSettingsModal.value = false
}

const saveSettings = () => {
  localStorage.setItem('cookieConsent', JSON.stringify({
    ...cookieSettings.value,
    timestamp: new Date().toISOString()
  }))
  showCookiePopup.value = false
  showSettingsModal.value = false
  console.log('Préférences sauvegardées:', cookieSettings.value)
}

const acceptAllFromSettings = () => {
  cookieSettings.value = {
    essential: true,
    performance: true,
    marketing: true
  }
  saveSettings()
}

onMounted(() => {
  // Afficher immédiatement 
  checkCookieConsent()
})
</script>

<style scoped>
.cookie-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 3px solid #B7CE66;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.popup-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.popup-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.popup-text {
  flex: 1;
}

.popup-text h3 {
  color: #4B5943;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.popup-text p {
  color: #666;
  line-height: 1.5;
  margin: 0;
  font-size: 0.95rem;
}

.popup-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.accept-btn {
  background: #B7CE66;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.accept-btn:hover {
  background: #A5BD5A;
  transform: translateY(-1px);
}

.decline-btn, .settings-btn {
  background: transparent;
  color: #4B5943;
  border: 2px solid #ddd;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.decline-btn:hover, .settings-btn:hover {
  border-color: #B7CE66;
  color: #B7CE66;
}

.settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  color: #4B5943;
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 1.5rem;
  max-height: 50vh;
  overflow-y: auto;
}

.cookie-category {
  margin-bottom: 2rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.category-header h4 {
  color: #4B5943;
  margin: 0;
  font-size: 1.1rem;
}

.required-badge {
  background: #B7CE66;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.cookie-category p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #B7CE66;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.save-btn, .accept-all-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.save-btn {
  background: #4B5943;
  color: white;
}

.accept-all-btn {
  background: #B7CE66;
  color: white;
}

.save-btn:hover {
  background: #3a4735;
}

.accept-all-btn:hover {
  background: #A5BD5A;
}

/* Responsive */
@media (max-width: 768px) {
  .popup-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .popup-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .accept-btn, .decline-btn, .settings-btn {
    width: 100%;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .save-btn, .accept-all-btn {
    width: 100%;
  }
}
</style>
