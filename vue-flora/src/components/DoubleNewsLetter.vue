<template>
  <section class="newsletter-section">
    <div class="newsletter-container">
      <div class="left-pattern">
        <img src="/iconss/pattern.png" alt="flowers pattern" />
      </div>
      <div class="newsletter-content">
        <h2>abonnez-vous à notre newsletter!</h2>
        <p>Nous vous informerons lorsque des réductions seront disponibles ;)</p>
        <input type="email" placeholder="Une petite adresse mail s'il vous plaît ?" />
        <button>S'abonner</button>
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

.newsletter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f8f3;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
}

.left-pattern img {
  max-height: 250px;
  margin-right: 2rem;
}

.newsletter-content {
  text-align: left;
}

.newsletter-content h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.newsletter-content p {
  margin-bottom: 1rem;
  color: #666;
}

.newsletter-content input {
  padding: 0.6rem;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.newsletter-content button {
  background-color: #90b561;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>