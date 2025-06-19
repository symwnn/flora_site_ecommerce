<template>
  <div class="ce-moment-page">
    <section class="hero-section">
      <h1>En ce moment chez Flora</h1>
      <p class="hero-subtitle">Découvrez nos coups de cœur et recommandations du moment</p>
    </section>

    <section class="recommendations-section">
      <div class="container">
        <h2>Nos recommandations</h2>
        <div class="recommendations-grid">
          <div class="recommendation-card">
            <div class="card-header">
              <h3>Collection Printemps</h3>
              <span class="price">À partir de 25€</span>
            </div>
            <p>Tulipes, narcisses et jacinthes fraîchement cueillies pour célébrer l'arrivée du printemps.</p>
            <div class="card-footer">
              <span class="category">Bouquets saisonniers</span>
            </div>
          </div>

          <div class="recommendation-card featured">
            <div class="featured-badge">Coup de cœur</div>
            <div class="card-header">
              <h3>Bouquet Romance</h3>
              <span class="price">39€</span>
            </div>
            <p>Roses rouges et blanches avec gypsophile, parfait pour déclarer votre amour ou célébrer un anniversaire.</p>
            <div class="card-footer">
              <span class="category">Saint-Valentin</span>
            </div>
          </div>

          <div class="recommendation-card">
            <div class="card-header">
              <h3>Plantes d'intérieur</h3>
              <span class="price">15-45€</span>
            </div>
            <p>Purifiez votre air avec nos plantes vertes : pothos, sansevieria et ficus benjamin.</p>
            <div class="card-footer">
              <span class="category">Plantes</span>
            </div>
          </div>

          <div class="recommendation-card">
            <div class="card-header">
              <h3>ompositions créatives</h3>
              <span class="price">35-60€</span>
            </div>
            <p>Laissez libre cours à la créativité de nos fleuristes avec des arrangements uniques et modernes.</p>
            <div class="card-footer">
              <span class="category">Créations originales</span>
            </div>
          </div>

          <div class="recommendation-card">
            <div class="card-header">
              <h3>Coffret surprise</h3>
              <span class="price">29€</span>
            </div>
            <p>Un assortiment surprise de fleurs de saison accompagné d'une petite attention gourmande.</p>
            <div class="card-footer">
              <span class="category">Cadeaux</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Prêt à commander ?</h2>
        <p>Parcourez notre catalogue complet ou contactez-nous pour une création sur mesure</p>
        <div class="cta-buttons">
          <RouterLink to="/" class="cta-btn primary">
            Voir tous nos produits
          </RouterLink>
          <RouterLink to="/request" class="cta-btn secondary">
            Demande personnalisée
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
.ce-moment-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f8f3 0%, #e8eacc 100%);
}

.hero-section {
  text-align: center;
  padding: 120px 2rem 40px;
  color: #4B5943;
}

.hero-section h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
}

.recommendations-section {
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

h2 {
  font-size: 2.2rem;
  color: #4B5943;
  text-align: center;
  margin-bottom: 2.5rem;
  font-weight: 700;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.recommendation-card {
  background: white;
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #B7CE66;
  transition: transform 0.3s ease;
  position: relative;
}

.recommendation-card:hover {
  transform: translateY(-3px);
}

.recommendation-card.featured {
  border-left-color: #FFD700;
  background: linear-gradient(135deg, #fffef7 0%, #fff9e6 100%);
}

.featured-badge {
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 1.3rem;
  color: #4B5943;
  margin: 0;
}

.price {
  font-weight: 700;
  color: #B7CE66;
  font-size: 1.1rem;
}

.recommendation-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.2rem;
}

.card-footer {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.category {
  background: #f0f8e8;
  color: #4B5943;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.cta-section {
  background: white;
  padding: 3rem 0;
  text-align: center;
}

.cta-section h2 {
  color: #4B5943;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 25px;
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
  color: #B7CE66;
  border: 2px solid #B7CE66;
}

.cta-btn.secondary:hover {
  background: #B7CE66;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .recommendations-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
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
