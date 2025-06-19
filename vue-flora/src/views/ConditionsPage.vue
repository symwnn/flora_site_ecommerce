<template>
  <div class="conditions-page">
    <section class="hero-section">
      <h1>Conditions générales de vente</h1>
      <p class="last-update">Dernière mise à jour : 19 juin 2025</p>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="conditions-content">
          <div class="section-block">
            <h2>Article 1 - Objet</h2>
            <p>Les présentes conditions générales de vente s'appliquent à toutes les commandes passées sur le site flora-fleurs.fr exploité par Flora SARL. Elles régissent les relations contractuelles entre Flora et ses clients.</p>
          </div>

          <div class="section-block">
            <h2>Article 2 - Produits et services</h2>
            <p>Flora propose à la vente :</p>
            <ul>
              <li>Bouquets de fleurs fraîches</li>
              <li>Compositions florales</li>
              <li>Plantes d'intérieur et d'extérieur</li>
              <li>Cartes cadeaux</li>
            </ul>
            <p>Tous nos produits sont présentés avec leurs caractéristiques essentielles. Les photographies sont non contractuelles.</p>
          </div>

          <div class="section-block">
            <h2>Article 3 - Prix</h2>
            <p>Les prix sont indiqués en euros toutes taxes comprises (TTC). Flora se réserve le droit de modifier ses prix à tout moment, mais s'engage à appliquer les tarifs en vigueur au moment de la commande.</p>
            <p>Les frais de livraison sont en sus et varient selon la zone géographique et le mode de livraison choisi.</p>
          </div>

          <div class="section-block">
            <h2>Article 4 - Commande</h2>
            <p>La commande n'est définitive qu'après :</p>
            <ul>
              <li>Validation du panier par le client</li>
              <li>Acceptation des présentes conditions générales</li>
              <li>Confirmation du paiement</li>
            </ul>
            <p>Flora se réserve le droit d'annuler toute commande en cas d'indisponibilité des produits ou de problème de paiement.</p>
          </div>

          <div class="section-block">
            <h2>Article 5 - Paiement</h2>
            <p>Le paiement s'effectue au moment de la commande par :</p>
            <ul>
              <li>Carte bancaire (Visa, Mastercard)</li>
              <li>PayPal</li>
              <li>Virement bancaire (pour les commandes importantes)</li>
            </ul>
            <p>Toutes les transactions sont sécurisées via un protocole SSL.</p>
          </div>

          <div class="section-block">
            <h2>Article 6 - Livraison</h2>
            <p><strong>Zones de livraison :</strong> France métropolitaine</p>
            <p><strong>Délais de livraison :</strong></p>
            <ul>
              <li>Livraison express (même jour) : avant 14h pour une livraison le jour même</li>
              <li>Livraison standard : 24 à 48h ouvrées</li>
              <li>Livraison programmée : à la date de votre choix</li>
            </ul>
            <p>Les fleurs étant des produits périssables, aucun stockage n'est possible. En cas d'absence, merci de nous prévenir.</p>
          </div>

          <div class="section-block">
            <h2>Article 7 - Droit de rétractation</h2>
            <p>Conformément à l'article L121-20-2 du Code de la consommation, le droit de rétractation ne peut être exercé pour les biens périssables. Les fleurs fraîches étant des produits périssables, aucun retour n'est possible.</p>
            <p>Pour les plantes, un droit de rétractation de 14 jours est accordé à compter de la réception.</p>
          </div>

          <div class="section-block">
            <h2>Article 8 - Garanties</h2>
            <p>Flora s'engage à livrer des fleurs fraîches de qualité. En cas de problème de qualité constaté à la livraison, le client dispose de 24h pour nous signaler le défaut.</p>
            <p>Les plantes sont garanties 7 jours sous réserve d'un entretien approprié selon nos conseils.</p>
          </div>

          <div class="section-block">
            <h2>Article 9 - Responsabilité</h2>
            <p>Flora ne saurait être tenue responsable de dommages indirects ou imprévisibles. Sa responsabilité est limitée au montant de la commande concernée.</p>
            <p>En cas de force majeure, Flora ne pourra être tenue responsable de l'inexécution de ses obligations.</p>
          </div>

          <div class="section-block">
            <h2>Article 10 - Données personnelles</h2>
            <p>Les données collectées sont nécessaires au traitement de votre commande. Elles ne sont pas transmises à des tiers sans votre consentement. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
          </div>

          <div class="section-block">
            <h2>Article 11 - Réclamations</h2>
            <p>Pour toute réclamation, contactez notre service client :</p>
            <ul>
              <li>Email : leane.barbier@epitech.digital</li>
              <li>Téléphone : 07.83.40.37.35</li>
              <li>Courrier : Flora SARL, 8 Avenue de la Grande Plage, 17200 Royan</li>
            </ul>
          </div>

          <div class="section-block">
            <h2>Article 12 - Droit applicable</h2>
            <p>Les présentes conditions sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents après tentative de règlement amiable.</p>
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
.conditions-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f8f3 0%, #e8eacc 100%);
}

.hero-section {
  background: white;
  text-align: center;
  padding: 120px 2rem 40px;
  color: #4B5943;
}

.hero-section h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.last-update {
  color: #666;
  font-size: 1rem;
  font-style: italic;
}

.content-section {
  padding: 3rem 0 4rem;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}

.conditions-content {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.section-block {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.section-block:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-block h2 {
  color: #4B5943;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  border-left: 4px solid #B7CE66;
  padding-left: 1rem;
}

.section-block p {
  color: #555;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.section-block p:last-child {
  margin-bottom: 0;
}

.section-block ul {
  color: #555;
  line-height: 1.7;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.section-block li {
  margin-bottom: 0.5rem;
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
  
  .conditions-content {
    padding: 2rem;
  }
  
  .section-block h2 {
    font-size: 1.3rem;
  }
}
</style>
