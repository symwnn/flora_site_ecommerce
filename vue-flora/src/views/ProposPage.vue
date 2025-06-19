<template>
  <div class="propos-page">
    <!-- Notre Histoire -->
    <section class="section first-section">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2>Notre Histoire</h2>
            <p>
              Depuis 2023, suite à la fin de la phase pandémique majeure du COVID-19, Flora s'est imposée comme une référence dans l'art floral français.
              Née de la passion de nos fondateurs pour la beauté naturelle, notre entreprise a
              grandi avec un seul objectif : apporter de la joie et de l'émotion à travers nos créations florales.
            </p>
            <p>
              Ce qui a commencé comme une petite boutique à Royan s'est développé en un réseau
              de magasins présents dans les plus belles villes de France. Chaque jour, nos fleuristes
              expérimentés créent des arrangements uniques qui racontent une histoire.
            </p>
          </div>
          <div class="story-image">
            <img src="/iconss/Madame.jpg" alt="Notre histoire" />
          </div>
        </div>
      </div>
    </section>

    <!-- Nos Valeurs -->
    <section class="section values-section">
      <div class="container">
        <h2>Nos Valeurs</h2>
        <div class="values-grid">
          <div class="value-card">
            <h3>Qualité</h3>
            <p>Nous sélectionnons minutieusement nos fleurs auprès de producteurs locaux et internationaux pour garantir la fraîcheur et la beauté de chaque bouquet.</p>
          </div>
          <div class="value-card">
            <h3>Créativité</h3>
            <p>Nos fleuristes sont de véritables artistes qui créent des compositions uniques, adaptées à chaque occasion et à chaque émotion.</p>
          </div>
          <div class="value-card">
            <h3>Durabilité</h3>
            <p>Nous nous engageons pour l'environnement en privilégiant les circuits courts et en adoptant des pratiques éco-responsables.</p>
          </div>
          <div class="value-card">
            <h3>Service</h3>
            <p>L'écoute et la satisfaction de nos clients sont au cœur de notre métier. Nous vous accompagnons dans tous vos projets floraux.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos Magasins -->
    <section class="section">
      <div class="container">
        <h2>Nos Magasins</h2>
        <div class="stores-grid">
          <div class="store-card">
            <h3>Bordeaux</h3>
            <p><strong>Adresse :</strong> 15 Rue Sainte-Catherine, 33000 Bordeaux</p>
            <p><strong>Téléphone :</strong> 05 55 55 55 55</p>
            <p><strong>Horaires :</strong> Lun-Sam 9h-19h, Dim 10h-18h</p>
            <p class="store-description">Un endroit charmant dans la grande ville de Bordeaux.</p>
          </div>
          
          <div class="store-card">
            <h3>Royan</h3>
            <p><strong>Adresse :</strong> 8 Avenue de la Grande Plage, 17200 Royan</p>
            <p><strong>Téléphone :</strong> 05 44 44 44 44</p>
            <p><strong>Horaires :</strong> Lun-Sam 9h-18h30, Dim 10h-17h</p>
            <p class="store-description">Face à l'océan, là où tout à commencé, pour des créations inspirées par la mer.</p>
          </div>
          
          <div class="store-card">
            <h3>Paris</h3>
            <p><strong>Adresse :</strong> 42 Boulevard Saint-Germain, 75005 Paris</p>
            <p><strong>Téléphone :</strong> 01 22 22 22 22</p>
            <p><strong>Horaires :</strong> Lun-Sam 8h30-20h, Dim 10h-18h</p>
            <p class="store-description">Notre flagship parisien dans le quartier Latin, un écrin de verdure.</p>
          </div>
          
          <div class="store-card">
            <h3>Toulouse</h3>
            <p><strong>Adresse :</strong> 25 Place du Capitole, 31000 Toulouse</p>
            <p><strong>Téléphone :</strong> 05 33 33 33 33</p>
            <p><strong>Horaires :</strong> Lun-Sam 9h-19h30, Dim 10h-18h</p>
            <p class="store-description">Au cœur de la ville rose, des créations colorées et chaleureuses.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre Équipe -->
    <section class="section team-section">
      <div class="container">
        <h2>Notre Équipe</h2>
        <p class="team-intro">
          Nos fleuristes passionnés mettent leur expertise et leur créativité au service de vos émotions.
          Formés aux dernières tendances florales, ils savent transformer chaque demande en œuvre d'art unique.
        </p>
        <div class="team-stats">
          <div class="stat">
            <span class="stat-number">15</span>
            <span class="stat-label">Fleuristes experts</span>
          </div>
          <div class="stat">
            <span class="stat-number">10000+</span>
            <span class="stat-label">Clients satisfaits</span>
          </div>
          <div class="stat">
            <span class="stat-number">3</span>
            <span class="stat-label">Années d'expérience</span>
            <span class="stat-sublabel">(Jeune entreprise pour certains, mais que des avis positifs dans tous les;) )</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="section cta-section">
      <div class="container">
        <h2>Une Question ? Un Projet ?</h2>
        <p>N'hésitez pas à nous contacter pour tous vos besoins floraux</p>
        <div class="cta-buttons">
          <RouterLink to="/request" class="cta-btn primary">
            Faire une demande
          </RouterLink>
          <RouterLink to="/questions" class="cta-btn secondary">
            FAQ
          </RouterLink>
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
.propos-page {
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

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.story-text {
  text-align: left;
}

.story-text h2 {
  margin-bottom: 0.5rem;
}

.story-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.5rem;
}

.story-image img {
  width: 80%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  display: block;
}

.values-section {
  background: white;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border-left: 4px solid #B7CE66;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-card h3 {
  font-size: 1.3rem;
  color: #4B5943;
  margin-bottom: 1rem;
}

.value-card p {
  color: #666;
  line-height: 1.6;
}

.stores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  justify-items: center;
}

.store-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.store-card:last-child {
  grid-column: 2;
}

.store-card:hover {
  transform: translateY(-5px);
}

.store-card h3 {
  color: #B7CE66;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.store-card p {
  margin-bottom: 0.5rem;
  color: #555;
}

.store-description {
  font-style: italic;
  color: #888 !important;
  margin-top: 1rem;
}

.team-section {
  background: white;
  text-align: center;
}

.team-intro {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.7;
}

.team-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: #B7CE66;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 1.1rem;
}

.stat-sublabel {
  display: block;
  color: #888;
  font-size: 0.9rem;
  font-style: italic;
  margin-top: 0.25rem;
}

.cta-section {
  background: linear-gradient(135deg, #4B5943 0%, #6E833E 100%);
  color: white;
  text-align: center;
}

.cta-section h2 {
  color: white;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-btn.primary {
  background: #B7CE66;
  color: white;
}

.cta-btn.primary:hover {
  background: #A5BD5A;
  transform: translateY(-2px);
}

.cta-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-btn.secondary:hover {
  background: white;
  color: #4B5943;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .story-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .team-stats {
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 250px;
  }
}
</style>
