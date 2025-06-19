<template>
  <section class="newsletter-section">
    <div class="request-section">
      <h2>AVEZ-VOUS UNE DEMANDE À FAIRE?</h2>
      <div class="request-cards">
        <div class="card">
          <img src="/iconss/individual.png" alt="individual" />
          <p><strong>Particulier</strong></p>
          <router-link to="/request">
            <button>&gt;</button>
          </router-link>
        </div>
        <div class="card">
          <img src="/iconss/florist.png" alt="florist" />
          <p><strong>Fleuriste</strong></p>
          <router-link to="/request">
            <button>&gt;</button>
          </router-link>
        </div>
        <div class="card">
          <img src="/iconss/company.png" alt="company" />
          <p><strong>Autre ?</strong></p>
          <router-link to="/request">
            <button>&gt;</button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
.newsletter-section {
  background-color: #fff;
  text-align: center;
  padding: 2rem;
}

.request-section h2 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.request-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  max-width: 300px;
  margin: 1rem;
  text-align: center;
}

.card img {
  width: 100%;
  border-radius: 12px;
}

.card p {
  margin-top: 1rem;
  font-size: 1.1rem;
}

.card button {
  margin-top: 0.5rem;
  background-color: #cde5aa;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card button:hover {
  transform: scale(1.1);
}
</style>
