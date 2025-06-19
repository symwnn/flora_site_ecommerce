<template>
  <div class="mentions-page">
    <section class="content-section">
      <div class="container">
        <div class="mentions-content">
          <div class="section-block">
            <h2>1. Informations légales</h2>
            <p><strong>Dénomination sociale :</strong> Flora SARL</p>
            <p><strong>Siège social :</strong> 8 Avenue de la Grande Plage, 17200 Royan, France</p>
            <p><strong>SIRET :</strong> 789 123 456 00012</p>
            <p><strong>TVA intracommunautaire :</strong> FR 12 789 123 456</p>
            <p><strong>Code APE :</strong> 4776Z (Commerce de détail de fleurs)</p>
          </div>

          <div class="section-block">
            <h2>2. Contact</h2>
            <p><strong>Téléphone :</strong> 07.83.40.37.35</p>
            <p><strong>Email :</strong> leane.barbier@epitech.digital</p>
            <p><strong>Directeur de publication :</strong> Barbier Léane</p>
          </div>

          <div class="section-block">
            <h2>3. Propriété intellectuelle</h2>
            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          </div>

          <div class="section-block">
            <h2>4. Protection des données personnelles</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données personnelles.</p>
            <p>Pour exercer ces droits, contactez-nous à : <strong>rgpd@flora-fleurs.fr</strong></p>
          </div>

          <div class="section-block">
            <h2>5. Cookies</h2>
            <p>Ce site utilise des cookies pour améliorer votre expérience de navigation. En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies.</p>
          </div>

          <div class="section-block">
            <h2>6. Responsabilité</h2>
            <p>Les informations contenues sur ce site sont aussi précises que possible. Toutefois, Flora ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour.</p>
          </div>

          <div class="section-block">
            <h2>7. Droit applicable</h2>
            <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.mentions-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f8f3 0%, #e8eacc 100%);
}

.content-section {
  padding: 120px 0 4rem;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}

.mentions-content {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.section-block {
  margin-bottom: 0;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fafafa;
}

.section-block:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-block h2 {
  color: #4B5943;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.section-block p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.section-block p:last-child {
  margin-bottom: 0;
}

.section-block strong {
  color: #4B5943;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .mentions-content {
    padding: 2rem;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .section-block {
    padding: 1rem;
  }
  
  .section-block h2 {
    font-size: 1.2rem;
  }
}
</style>
