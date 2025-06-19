<template>
  <footer class="footer">
    <div class="footer-columns">
      <div class="footer-column">
        <h3>Besoin d'aide</h3>
        <ul>
          <li>
            <RouterLink to="/questions">Questions fréquentes</RouterLink>
          </li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>À propos</h3>
        <ul>
          <li><RouterLink to="/propos">Qui sommes-nous ?</RouterLink></li>
          <li><RouterLink to="/nos-equipes">Rejoindre nos équipes</RouterLink></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>Notre écosystème</h3>
        <ul>
          <li><RouterLink to="/ce-moment">En ce moment</RouterLink></li>
          <li><RouterLink to="/cadeaux">Carte cadeaux</RouterLink></li>
        </ul>
      </div>

      <div class="footer-column">
        <h3>Mentions légales</h3>
        <ul>
          <li><RouterLink to="/mentions">Mentions légales</RouterLink></li>
          <li><RouterLink to="/conditions">Conditions générales de vente</RouterLink></li>
          <li><RouterLink to="/politique">Politique de protection des données</RouterLink></li>
        </ul>
      </div>
    </div>

    <hr class="footer-separator" />

    <p class="footer-secure">Achat 100% sécurisé.</p>
    <p class="footer-copy">© 2025 Vue Flora. Tous droits réservés.</p>
  </footer>
</template>

<script setup>
// Aucun import requis
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 20px 0;
  background-color: #d8e0c3;
  color: #6E833E;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
  width: 100%;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-bottom: 20px;
  text-align: left;
}

.footer-column {
  min-width: 150px;
}

.footer-column h3 {
  margin-bottom: 12px;
  font-weight: 700;
  color: #6E833E;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 8px;
}

.footer-column a,
.footer-column router-link {
  text-decoration: none;
  color: #90A06A;
  transition: color 0.3s ease;
}

.footer-column a:hover,
.footer-column router-link:hover {
  color: #4B5943;
}

.footer-separator {
  border: none;
  height: 1px;
  background-color: #4caf50;
  margin-bottom: 15px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.footer-secure {
  font-weight: 600;
  margin-bottom: 10px;
}

.footer-copy {
  font-size: 12px;
  color: #3a6b2a;
}
</style>
