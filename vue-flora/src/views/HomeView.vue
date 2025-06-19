<template>
  <div class="home">
    <div class="welcome-section">
      <div class="banner-container">
        <div class="banner-image">
          <img src="/iconss/JolieBanniere.png" alt="Jolie Banniere" />
        </div>
      </div>
    </div>
    <ProductGrid />
    <DoubleNewsLetter />
    <PopUp />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ProductGrid from '@/components/ProductGrid.vue'
import DoubleNewsLetter from '@/components/DoubleNewsLetter.vue'
import PopUp from '@/components/PopUp.vue'

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 70px;
  color: #4B5943;
  background-color: #E8EACC;
  min-height: calc(100vh - 100px);
}

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  padding: 0;
}

.banner-container {
  display: flex;
  align-items: center;
  gap: 0;
  width: 100%;
  justify-content: center;
}

.banner-image {
  width: 100%;
  text-align: center;
}

.banner-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}
</style>
