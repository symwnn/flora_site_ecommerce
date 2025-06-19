<template>
  <div class="questions-page">
    <div class="header-section">
      <h1>Questions fréquemment posées</h1>
      <p>Trouvez rapidement les réponses aux questions les plus courantes.</p>
    </div>

    <div class="faq-container">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <div 
          class="faq-question" 
          @click="toggleFaq(index)"
          :class="{ active: faq.isOpen }"
        >
          <h3>{{ faq.question }}</h3>
          <span class="toggle-icon">{{ faq.isOpen ? '−' : '+' }}</span>
        </div>
        <div class="faq-answer" :class="{ open: faq.isOpen }">
          <div class="answer-content">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-section">
      <h2>Vous ne trouvez pas votre réponse ?</h2>
      <p>Notre équipe est là pour vous aider !</p>
      <div class="contact-buttons">
        <RouterLink to="/request" class="contact-btn">
          Faire une demande
        </RouterLink>
        <a href="mailto:leane.barbier@epitech.digital" class="contact-btn secondary">
          Nous contacter
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const faqs = ref([
  {
    question: "En combien de temps ma commande sera-t-elle livrée ?",
    answer: "Nos livraisons sont effectuées sous 24 à 48 heures pour les commandes passées avant 14h. Pour les livraisons le weekend, comptez 2 à 3 jours ouvrés.",
    isOpen: false
  },
  {
    question: "Dans quelles zones livrez-vous ?",
    answer: "Nous livrons dans toute la France métropolitaine. Nous avons des magasins à Bordeaux, Paris, Royan et Toulouse pour un service optimal. Le service en magasin est aussi possible.",
    isOpen: false
  },
  {
    question: "Comment puis-je modifier ou annuler ma commande ?",
    answer: "Vous pouvez modifier votre commande dans les 2 heures suivant votre achat en nous contactant. Après ce délai, la préparation aura commencé et nous ne pourrons plus faire de modifications.",
    isOpen: false
  },
  {
    question: "Proposez-vous des arrangements personnalisés ?",
    answer: "Oui ! Nous proposons des créations sur mesure pour tous vos événements : mariages, anniversaires, deuil. Contactez-nous via notre formulaire de demande pour discuter de vos besoins.",
    isOpen: false
  },
  {
    question: "Comment entretenir mes fleurs pour qu'elles durent plus longtemps ?",
    answer: "Coupez les tiges en biais sous l'eau courante, changez l'eau tous les 2 jours, et retirez les fleurs fanées. Évitez l'exposition directe au soleil et aux sources de chaleur.",
    isOpen: false
  },
  {
    question: "Acceptez-vous les retours ?",
    answer: "En raison de la nature périssable de nos produits, nous n'acceptons pas les retours. Cependant, si vous n'êtes pas satisfait de votre commande, contactez-nous dans les 24h pour trouver une solution.",
    isOpen: false
  },
  {
    question: "Proposez-vous un service pour les entreprises ?",
    answer: "Oui, nous proposons des contrats d'entretien pour les espaces professionnels, des compositions pour événements d'entreprise et des livraisons régulières. Contactez-nous pour un devis personnalisé.",
    isOpen: false
  },
  {
    question: "Quels sont vos moyens de paiement acceptés ?",
    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal et les virements bancaires. Tous nos paiements sont sécurisés par cryptage SSL.",
    isOpen: false
  },
  {
    question: "Puis-je programmer une livraison à une date précise ?",
    answer: "Oui, vous pouvez choisir votre date de livraison lors de la commande. Nous vous recommandons de commander au moins 48h à l'avance pour garantir la disponibilité.",
    isOpen: false
  },
  {
    question: "Offrez-vous des abonnements pour des livraisons régulières ?",
    answer: "Nous proposons des abonnements mensuels ou hebdomadaires pour recevoir régulièrement de belles compositions. Contactez-nous pour plus d'informations sur nos formules d'abonnement.",
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.questions-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f8f3 0%, #e8eacc 100%);
  padding-top: 100px;
}

.header-section {
  text-align: center;
  padding: 2rem;
  margin-bottom: 2rem;
}

.header-section h1 {
  font-size: 2.5rem;
  color: #4B5943;
  margin-bottom: 1rem;
  font-weight: 700;
}

.header-section p {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.faq-item {
  background: white;
  margin-bottom: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-2px);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  cursor: pointer;
  background: white;
  transition: background-color 0.3s ease;
  border-left: 4px solid transparent;
}

.faq-question:hover {
  background-color: #f8f9fa;
}

.faq-question.active {
  background-color: #B7CE66;
  color: white;
  border-left-color: #4B5943;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  flex: 1;
}

.toggle-icon {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4B5943;
  transition: transform 0.3s ease;
}

.faq-question.active .toggle-icon {
  color: white;
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #f9f9f9;
}

.faq-answer.open {
  max-height: 200px;
}

.answer-content {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e9ecef;
}

.answer-content p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

.contact-section {
  text-align: center;
  padding: 4rem 2rem;
  margin-top: 3rem;
  background: white;
  border-radius: 20px 20px 0 0;
}

.contact-section h2 {
  font-size: 2rem;
  color: #4B5943;
  margin-bottom: 1rem;
}

.contact-section p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.contact-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #B7CE66;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid #B7CE66;
}

.contact-btn:hover {
  background-color: #A5BD5A;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(183, 206, 102, 0.4);
}

.contact-btn.secondary {
  background-color: transparent;
  color: #B7CE66;
  border: 2px solid #B7CE66;
}

.contact-btn.secondary:hover {
  background-color: #B7CE66;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .questions-page {
    padding-top: 80px;
  }
  
  .header-section h1 {
    font-size: 2rem;
  }
  
  .faq-container {
    padding: 0 1rem;
  }
  
  .faq-question {
    padding: 1rem 1.5rem;
  }
  
  .answer-content {
    padding: 1rem 1.5rem;
  }
  
  .contact-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-btn {
    width: 250px;
  }
}
</style>
