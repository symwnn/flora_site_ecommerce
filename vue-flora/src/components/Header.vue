<template>
  <header class="header">
    <div class="logo">
      <RouterLink to="/">
        <img src="/iconss/center-banner.png" alt="Flora Banner" />
      </RouterLink>
    </div>

    <div class="header-title">
      <h1>flora.fr</h1>
    </div>

    <div class="icons">
      <!-- Panier -->
      <RouterLink to="/cart">
        <img src="/iconss/shop.png" alt="Panier" class="icon icon-panier" />
      </RouterLink>

      <!-- Compte -->
      <RouterLink to="/login">
        <img src="/iconss/account.png" alt="Login" class="icon icon-compte" />
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  background-color: #d8e0c3;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo img {
  height: 60px;
  cursor: pointer;
  flex-shrink: 0;
}

.header-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.header-title h1 {
  margin: 0;
  color: #4b5943;
  font-size: 1.2rem;
}

.icons {
  display: flex;
  gap: 60px;
  margin-right: 30px;
  flex-shrink: 0;
}

.icon {
  cursor: pointer;
  transition: transform 0.2s;
}

.icon-panier {
  height: 30px;
  width: auto;
  margin-top: 8px;
}

.icon-compte {
  height: 35px;
  width: auto;
  margin-top: 3px;
}

.icon:hover {
  transform: scale(1.2);
}
</style>
