
// Formulaire de contact : pour l'instant, il n'enregistre rien.
// (Lundi, on le reliera à une base de données Supabase.)
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault()
  alert("Ce formulaire n'enregistre rien pour l'instant.")
})

// --- Chatbot Hopper ---
const chatbotToggle = document.getElementById('chatbot-toggle')
const chatbotClose = document.getElementById('chatbot-close')
const chatbotWindow = document.getElementById('chatbot-window')
const chatbotForm = document.getElementById('chatbot-form')
const chatbotInput = document.getElementById('chatbot-input')
const chatbotMessages = document.getElementById('chatbot-messages')

function toggleChatbot() {
  const isHidden = chatbotWindow.classList.toggle('chatbot-hidden')
  chatbotWindow.setAttribute('aria-hidden', isHidden)
  if (!isHidden) {
    chatbotInput.focus()
  }
}

chatbotToggle.addEventListener('click', toggleChatbot)
chatbotClose.addEventListener('click', toggleChatbot)

function appendMessage(text, sender) {
  const msg = document.createElement('div')
  msg.className = `chatbot-msg ${sender}`
  msg.textContent = text
  chatbotMessages.appendChild(msg)
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  return msg
}

function showTypingIndicator() {
  const typing = document.createElement('div')
  typing.className = 'chatbot-msg bot typing'
  typing.innerHTML = '<span class="chatbot-typing-dot"></span><span class="chatbot-typing-dot"></span><span class="chatbot-typing-dot"></span>'
  chatbotMessages.appendChild(typing)
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  return typing
}

function getBotReply(query) {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  if (q.match(/\b(bonjour|salut|coucou|hello|hey|bonsoir|aide)\b/)) {
    return "Bonjour ! 👋 Comment puis-je vous aider ? Vous pouvez me demander nos tarifs, nos horaires ou des infos sur vos réparations."
  }
  if (q.match(/\b(crevaison|creve|pneu|chambre)\b/)) {
    return "Pour une crevaison, nous réparons votre roue en 30 minutes à l'atelier pour 15 € (chambre à air incluse). Passez directement sans rdv !"
  }
  if (q.match(/\b(revision|forfait|entretien|reglage|frein|freins|vitesse|vitesses)\b/)) {
    return "Notre révision complète est à 49 € : réglage complet des freins, vitesses, dévoilage des roues et contrôle de sécurité. Délai moyen : 48 h !"
  }
  if (q.match(/\b(tarif|prix|combien|cout|chere?|devis)\b/)) {
    return "Voici nos formules principales :\n• Révision complète : 49 €\n• Réparation crevaison : 15 €\n• Location vélo journée : 20 €\nPour toute autre intervention, devis gratuit à l'atelier !"
  }
  if (q.match(/\b(horaire|horaires|ouvert|ferme|ouverture|fermeture|quand)\b/)) {
    return "Nous sommes ouverts du mardi au samedi de 9 h à 19 h en continu. Fermé le dimanche et le lundi."
  }
  if (q.match(/\b(adresse|ou|situe|metro|localisation|rue|paris)\b/)) {
    return "L'atelier se trouve au 12 rue des Rayons, 75011 Paris (métro Voltaire / Parmentier)."
  }
  if (q.match(/\b(electrique|electriques|vae|batterie|moteur|bafang|bosch|shimano)\b/)) {
    return "Oui ! Nous entretenons la partie cycle et mécanique de tous les vélos électriques, et diagnostiquons les moteurs Bosch, Shimano et Bafang."
  }
  if (q.match(/\b(location|louer|loue)\b/)) {
    return "Nous proposons des vélos de ville en location à 20 € la journée. Antivol et panier inclus !"
  }
  if (q.match(/\b(rdv|rendez-vous|reserver|reservation|rendez vous)\b/)) {
    return "Pour prendre rendez-vous, vous pouvez remplir le formulaire de contact juste au-dessus. Pour les crevaisons, venez directement !"
  }
  if (q.match(/\b(pret|preter|courtoisie)\b/)) {
    return "Oui ! Nous pouvons vous prêter gratuitement un vélo de courtoisie pour la journée pendant la révision du vôtre (selon disponibilités)."
  }
  if (q.match(/\b(paiement|payer|cb|carte|espece|especes|apple pay|sans contact)\b/)) {
    return "Nous acceptons les cartes bancaires, espèces, ainsi que les paiements sans contact (Apple Pay, Google Pay)."
  }
  if (q.match(/\b(delai|delais|temps|combien de temps|duree|rapide)\b/)) {
    return "La majorité des réparations sont terminées sous 24 h à 48 h. Les crevaisons sont traitées sur place en 30 minutes !"
  }
  if (q.match(/\b(merci|super|top|parfait|genial|cool)\b/)) {
    return "Avec plaisir ! 🚲 N'hésitez pas si vous avez d'autres questions. À bientôt chez Hopper !"
  }

  return "Je ne suis pas certain d'avoir la réponse exacte, mais notre équipe est là pour vous ! Laissez-nous un message via le formulaire de contact ou passez au 12 rue des Rayons."
}

function handleSendMessage(text) {
  if (!text || !text.trim()) return
  appendMessage(text, 'user')
  chatbotInput.value = ''

  const typing = showTypingIndicator()
  setTimeout(() => {
    typing.remove()
    const reply = getBotReply(text)
    appendMessage(reply, 'bot')
  }, 450)
}

chatbotForm.addEventListener('submit', (e) => {
  e.preventDefault()
  handleSendMessage(chatbotInput.value)
})

chatbotMessages.addEventListener('click', (e) => {
  const chip = e.target.closest('.chatbot-chip')
  if (chip) {
    const query = chip.getAttribute('data-query')
    handleSendMessage(query)
  }
})
