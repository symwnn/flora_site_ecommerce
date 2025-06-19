<template>
  <div class="admin-dashboard">
    <h1>Panneau d'administration</h1>

    <!-- Utilisateurs -->
    <section>
      <h2>Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>Email</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.login }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.is_admin ? 'Oui' : 'Non' }}</td>
            <td><button @click="deleteUser(user.id)" class="delete-btn">Supprimer</button></td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Produits -->
    <section>
      <h2>Produits</h2>
      <button @click="showAddProductModal">Ajouter un produit</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img v-if="product.photo" 
                   :src="`http://localhost:3000/${product.photo}`" 
                   :alt="product.name"
                   style="width: 50px; height: 50px; object-fit: contain; border-radius: 4px;" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }} €</td>
            <td>
              <button @click="editProduct(product)">Modifier</button>
              <button @click="deleteProduct(product.id)" class="delete-btn">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Modal ajout produit -->
    <div v-if="showAddProduct" class="modal-overlay" @click="closeAddModal">
      <div class="modal-content" @click.stop>
        <h3>Ajouter un nouveau produit</h3>
        <form @submit.prevent="createProduct">
          <div class="form-group">
            <label>Nom:</label>
            <input v-model="newProduct.name" type="text" required />
          </div>
          
          <div class="form-group">
            <label>Description:</label>
            <textarea v-model="newProduct.description" rows="4"></textarea>
          </div>
          
          <div class="form-group">
            <label>Ajouter une image:</label>
            <input type="file" @change="handleAddFileSelect" accept="image/*" ref="fileAddInput" />
            <button type="button" @click="uploadAddImage" :disabled="!selectedAddFile || uploadingAdd" class="upload-btn">
              {{ uploadingAdd ? 'Upload en cours...' : 'Upload Image' }}
            </button>
            <p v-if="uploadAddMessage" :class="{ 'success': uploadAddSuccess, 'error': !uploadAddSuccess }">
              {{ uploadAddMessage }}
            </p>
            <div v-if="newProduct.photo" class="current-image">
              <img :src="`http://localhost:3000/${newProduct.photo}`" alt="Image sélectionnée" style="max-width: 100px; max-height: 100px; object-fit: cover; border-radius: 6px;" />
            </div>
          </div>
          
          <div class="form-group">
            <label>Prix:</label>
            <input v-model="newProduct.price" type="number" step="0.01" required />
          </div>
          
          <div class="modal-buttons">
            <button type="submit" class="save-btn">Créer le produit</button>
            <button type="button" @click="closeAddModal" class="cancel-btn">Annuler</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal modification -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Modifier le produit</h3>
        <form @submit.prevent="updateProduct">
          <div class="form-group">
            <label>Nom:</label>
            <input v-model="editingProduct.name" type="text" required />
          </div>
          
          <div class="form-group">
            <label>Description:</label>
            <textarea v-model="editingProduct.description" rows="4"></textarea>
          </div>
          
          <div class="form-group">
            <label>Photo actuelle:</label>
            <div v-if="editingProduct.photo" class="current-image">
              <img :src="`http://localhost:3000/${editingProduct.photo}`" alt="Image actuelle" style="max-width: 100px; max-height: 100px; object-fit: cover; border-radius: 6px;" />
              <p>{{ editingProduct.photo }}</p>
            </div>
          </div>
          
          <div class="form-group">
            <label>Changer l'image:</label>
            <input type="file" @change="handleFileSelect" accept="image/*" ref="fileInput" />
            <button type="button" @click="uploadImage" :disabled="!selectedFile || uploading" class="upload-btn">
              {{ uploading ? 'Upload en cours...' : 'Upload Image' }}
            </button>
            <p v-if="uploadMessage" :class="{ 'success': uploadSuccess, 'error': !uploadSuccess }">
              {{ uploadMessage }}
            </p>
          </div>
          
          <div class="form-group">
            <label>Prix:</label>
            <input v-model="editingProduct.price" type="number" step="0.01" required />
          </div>
          
          <div class="modal-buttons">
            <button type="submit" class="save-btn">Sauvegarder</button>
            <button type="button" @click="closeModal" class="cancel-btn">Annuler</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Commandes -->
    <section>
      <h2>Commandes des clients</h2>
      
      <div v-if="orders.length === 0" class="empty-message">
        Aucune commande n'a été passée pour le moment.
      </div>

      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <h3>Commande #{{ order.id }}</h3>
            <span class="status" :class="order.status">{{ getStatusText(order.status) }}</span>
          </div>
          
          <div class="order-info">
            <p><strong>Client:</strong> {{ getUserName(order.user_login) }}</p>
            <p><strong>Date:</strong> {{ formatDate(order.created_at) }}</p>
            <p><strong>Total:</strong> {{ order.total_amount }} €</p>
          </div>

          <div class="order-items" v-if="order.items && order.items.length > 0">
            <h4>Produits commandés:</h4>
            <div v-for="item in order.items" :key="item.product_id" class="order-item">
              <img :src="`http://localhost:3000/${item.product_photo}`" :alt="item.product_name" />
              <div class="item-details">
                <span class="name">{{ item.product_name }}</span>
                <span class="quantity">Quantité: {{ item.quantity }}</span>
                <span class="price">{{ item.price }} € / unité</span>
              </div>
            </div>
          </div>

          <div class="order-actions">
            <button @click="updateOrderStatus(order.id, 'paid')" 
                    v-if="order.status === 'pending'" 
                    class="btn-paid">
              Marquer comme payée
            </button>
            <button @click="updateOrderStatus(order.id, 'cancelled')" 
                    v-if="order.status === 'pending'" 
                    class="btn-cancel">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Paniers -->
    <section>
      <h2>Paniers des utilisateurs</h2>
      
      <div v-if="carts.length === 0" class="empty-message">
        Aucun panier actif pour le moment.
      </div>

      <div v-else class="carts-container">
        <div v-for="userCart in groupedCarts" :key="userCart.user_login" class="user-cart-card">
          <div class="cart-header">
            <h3>{{ getUserName(userCart.user_login) }}</h3>
            <span class="cart-count">{{ userCart.items.length }} produit{{ userCart.items.length > 1 ? 's' : '' }}</span>
          </div>
          
          <div class="cart-total">
            <p><strong>Total estimé:</strong> {{ calculateCartTotal(userCart.items) }} €</p>
          </div>

          <div class="cart-items">
            <div v-for="item in userCart.items" :key="item.id" class="cart-item">
              <img :src="`http://localhost:3000/${getProductPhoto(item.product_id)}`" 
                   :alt="item.product_name || getProductName(item.product_id)" />
              <div class="item-details">
                <span class="name">{{ item.product_name || getProductName(item.product_id) }}</span>
                <span class="quantity">Quantité: {{ item.quantity }}</span>
                <span class="price">{{ getProductPrice(item.product_id) }} € / unité</span>
                <span class="subtotal">Sous-total: {{ (getProductPrice(item.product_id) * item.quantity).toFixed(2) }} €</span>
              </div>
              <div class="item-actions">
                <button @click="removeFromUserCart(item.id)" class="remove-btn" title="Supprimer cet item">
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div class="cart-actions">
            <button @click="clearUserCart(userCart.user_login)" class="clear-cart-btn">
              Vider le panier
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Déconnexion -->
    <section class="logout-section">
      <button @click="showLogoutConfirm" class="logout-btn">Se déconnecter</button>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const users = ref([])
const products = ref([])
const orders = ref([])
const carts = ref([])
const showAddProduct = ref(false)
const showEditModal = ref(false)
const editingProduct = ref({})
const newProduct = ref({ name: '', description: '', photo: '', price: '' })

// Upload modification
const selectedFile = ref(null)
const uploading = ref(false)
const uploadMessage = ref('')
const uploadSuccess = ref(false)
const fileInput = ref(null)

// Upload ajout
const selectedAddFile = ref(null)
const uploadingAdd = ref(false)
const uploadAddMessage = ref('')
const uploadAddSuccess = ref(false)
const fileAddInput = ref(null)

const token = localStorage.getItem('token')

const checkAdminAccess = async () => {
  if (!token) {
    alert('Vous devez être connecté pour accéder à cette page.')
    router.push('/login')
    return false
  }

  try {
    const response = await fetch('http://localhost:3000/api/verify-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Token invalide')
    }

    const data = await response.json()
    
    if (!data.valid || data.is_admin !== 1) {
      alert('Accès refusé. Vous devez être administrateur pour accéder à cette page.')
      router.push('/')
      return false
    }

    return true
  } catch (error) {
    console.error('Erreur vérification admin:', error)
    alert('Erreur d\'authentification. Veuillez vous reconnecter.')
    localStorage.removeItem('token')
    router.push('/login')
    return false
  }
}

const fetchAll = async () => {
  const headers = { Authorization: `Bearer ${token}` }
  try {
    const usersRes = await fetch('http://localhost:3000/api/admin/users', { headers })
    const productsRes = await fetch('http://localhost:3000/api/products', { headers })
    const ordersRes = await fetch('http://localhost:3000/api/admin/orders', { headers })
    const cartsRes = await fetch('http://localhost:3000/api/admin/carts', { headers })

    if (usersRes.ok) users.value = await usersRes.json()
    if (productsRes.ok) products.value = await productsRes.json()
    if (ordersRes.ok) orders.value = await ordersRes.json()
    if (cartsRes.ok) carts.value = await cartsRes.json()

  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error)
  }
}

const getUserName = (userLogin) => {
  if (!Array.isArray(users.value) || users.value.length === 0) {
    return userLogin
  }
  
  const user = users.value.find(u => u.login === userLogin)
  return user ? `${user.firstname} ${user.lastname} (${user.login})` : userLogin
}

const getProductName = (productId) => {
  if (!Array.isArray(products.value) || products.value.length === 0) {
    return `Produit #${productId}`
  }
  
  const product = products.value.find(p => p.id === productId)
  return product ? product.name : `Produit #${productId}`
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'En attente',
    'paid': 'Payée',
    'cancelled': 'Annulée'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    })

    if (response.ok) {
      alert(`Commande ${newStatus === 'paid' ? 'marquée comme payée' : 'annulée'} avec succès!`)
      fetchAll()
    } else {
      alert('Erreur lors de la mise à jour du statut')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la mise à jour du statut')
  }
}

const showLogoutConfirm = () => {
  if (confirm('Êtes-vous sûr(e) de vouloir vous déconnecter ?')) {
    localStorage.removeItem('token')
    alert('À bientôt ! 👋')
    router.push('/')
  }
}

const showAddProductModal = () => {
  newProduct.value = { name: '', description: '', photo: '', price: '' }
  showAddProduct.value = true
  selectedAddFile.value = null
  uploadAddMessage.value = ''
  uploadAddSuccess.value = false
}

const handleAddFileSelect = (event) => {
  selectedAddFile.value = event.target.files[0]
  uploadAddMessage.value = ''
}

const uploadAddImage = async () => {
  if (!selectedAddFile.value) {
    uploadAddMessage.value = 'Veuillez sélectionner une image'
    uploadAddSuccess.value = false
    return
  }

  uploadingAdd.value = true
  uploadAddMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('image', selectedAddFile.value)

    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.imagePath) {
      newProduct.value.photo = result.imagePath
      uploadAddMessage.value = 'Image uploadée avec succès!'
      uploadAddSuccess.value = true
      selectedAddFile.value = null
      
      if (fileAddInput.value) {
        fileAddInput.value.value = ''
      }
    } else {
      uploadAddMessage.value = 'Erreur: Pas de chemin d\'image retourné'
      uploadAddSuccess.value = false
    }
  } catch (error) {
    console.error('Erreur upload:', error)
    uploadAddMessage.value = `Erreur lors de l'upload: ${error.message}`
    uploadAddSuccess.value = false
  } finally {
    uploadingAdd.value = false
  }
}

const createProduct = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: newProduct.value.name,
        description: newProduct.value.description,
        photo: newProduct.value.photo,
        price: newProduct.value.price
      })
    })

    if (response.ok) {
      alert('Produit créé avec succès!')
      closeAddModal()
      fetchAll()
    } else {
      const errorText = await response.text()
      console.error('Erreur réponse:', errorText)
      alert('Erreur lors de la création du produit')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la création du produit')
  }
}

const closeAddModal = () => {
  showAddProduct.value = false
  newProduct.value = { name: '', description: '', photo: '', price: '' }
  selectedAddFile.value = null
  uploadAddMessage.value = ''
  uploadAddSuccess.value = false
  if (fileAddInput.value) {
    fileAddInput.value.value = ''
  }
}

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
  uploadMessage.value = ''
}

const uploadImage = async () => {
  if (!selectedFile.value) {
    uploadMessage.value = 'Veuillez sélectionner une image'
    uploadSuccess.value = false
    return
  }

  uploading.value = true
  uploadMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('image', selectedFile.value)

    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.imagePath) {
      editingProduct.value.photo = result.imagePath
      uploadMessage.value = 'Image uploadée avec succès!'
      uploadSuccess.value = true
      selectedFile.value = null
      
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    } else {
      uploadMessage.value = 'Erreur: Pas de chemin d\'image retourné'
      uploadSuccess.value = false
    }
  } catch (error) {
    console.error('Erreur upload:', error)
    uploadMessage.value = `Erreur lors de l'upload: ${error.message}`
    uploadSuccess.value = false
  } finally {
    uploading.value = false
  }
}

const deleteUser = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.ok) {
        alert('Utilisateur supprimé avec succès!')
        fetchAll()
      } else {
        const errorData = await response.json()
        alert(`Erreur lors de la suppression: ${errorData.error || 'Erreur inconnue'}`)
      }
    } catch (error) {
      console.error('Erreur suppression utilisateur:', error)
      alert('Erreur lors de la suppression de l\'utilisateur')
    }
  }
}

const deleteProduct = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        alert('Produit supprimé avec succès!')
        fetchAll()
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur suppression produit:', error)
      alert('Erreur lors de la suppression')
    }
  }
}

const editProduct = (product) => {
  editingProduct.value = { ...product }
  showEditModal.value = true
  selectedFile.value = null
  uploadMessage.value = ''
  uploadSuccess.value = false
}

const updateProduct = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${editingProduct.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: editingProduct.value.name,
        description: editingProduct.value.description,
        photo: editingProduct.value.photo,
        price: editingProduct.value.price
      })
    })

    if (response.ok) {
      alert('Produit modifié avec succès!')
      closeModal()
      fetchAll()
    } else {
      const errorText = await response.text()
      console.error('Erreur réponse:', errorText)
      alert('Erreur lors de la modification du produit')
    }
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la modification du produit')
  }
}

const closeModal = () => {
  showEditModal.value = false
  editingProduct.value = {}
  selectedFile.value = null
  uploadMessage.value = ''
  uploadSuccess.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const groupedCarts = computed(() => {
  const grouped = {}
  
  carts.value.forEach(item => {
    if (!grouped[item.user_login]) {
      grouped[item.user_login] = {
        user_login: item.user_login,
        items: []
      }
    }
    grouped[item.user_login].items.push(item)
  })
  
  return Object.values(grouped)
})

const getProductPhoto = (productId) => {
  if (!Array.isArray(products.value) || products.value.length === 0) {
    return 'uploads/default-product.jpg' // Image par défaut
  }
  
  const product = products.value.find(p => p.id === productId)
  return product ? product.photo : 'uploads/default-product.jpg'
}

const getProductPrice = (productId) => {
  if (!Array.isArray(products.value) || products.value.length === 0) {
    return 0
  }
  
  const product = products.value.find(p => p.id === productId)
  return product ? parseFloat(product.price) : 0
}

const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    const price = getProductPrice(item.product_id)
    return total + (price * item.quantity)
  }, 0).toFixed(2)
}

const removeFromUserCart = async (cartItemId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet article du panier ?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.ok) {
        alert('Article supprimé du panier avec succès!')
        fetchAll() // Recharger les données
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur suppression article panier:', error)
      alert('Erreur lors de la suppression')
    }
  }
}

const clearUserCart = async (userLogin) => {
  if (confirm(`Êtes-vous sûr de vouloir vider complètement le panier de ${getUserName(userLogin)} ?`)) {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/cart/clear/${userLogin}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.ok) {
        alert('Panier vidé avec succès!')
        fetchAll() // Recharger les données
      } else {
        alert('Erreur lors du vidage du panier')
      }
    } catch (error) {
      console.error('Erreur vidage panier:', error)
      alert('Erreur lors du vidage du panier')
    }
  }
}

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const isAdmin = await checkAdminAccess()
  if (isAdmin) {
    fetchAll()
  }
})
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  padding-top: 120px;
  max-width: 1400px;
  margin: auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #B7CE66;
  margin-bottom: 2rem;
}

section {
  margin-bottom: 3rem;
}

h2 {
  margin-bottom: 1rem;
  color: #4B5943;
  border-bottom: 2px solid #B7CE66;
  padding-bottom: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #4B5943;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

button {
  margin-right: 0.5rem;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #589236;
  color: white;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #74b64e;
}

.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #ee5c6a;
}

.empty-message {
  text-align: center;
  font-size: 16px;
  color: #888;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #B7CE66;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.order-header h3 {
  margin: 0;
  color: #333;
}

.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status.paid {
  background-color: #d4edda;
  color: #155724;
}

.status.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.order-info {
  margin-bottom: 1.5rem;
}

.order-info p {
  margin: 0.5rem 0;
  color: #666;
}

.order-items h4 {
  margin: 1rem 0 0.5rem 0;
  color: #333;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.order-item img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 6px;
  background: white;
  padding: 4px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.name {
  font-weight: bold;
  color: #333;
}

.quantity {
  color: #666;
  font-size: 14px;
}

.price {
  color: #B7CE66;
  font-weight: bold;
}

.order-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
}

.btn-paid {
  background-color: #28a745;
  color: white;
}

.btn-paid:hover {
  background-color: #218838;
}

.btn-cancel {
  background-color: #dc3545;
  color: white;
}

.btn-cancel:hover {
  background-color: #c82333;
}

.carts-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.user-cart-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #B7CE66;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.cart-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.cart-count {
  background-color: #B7CE66;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.cart-total {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #B7CE66;
}

.cart-total p {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.cart-items {
  margin-bottom: 1.5rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  position: relative;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 6px;
  background: white;
  padding: 4px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.item-details .name {
  font-weight: bold;
  color: #333;
  font-size: 1rem;
}

.item-details .quantity {
  color: #666;
  font-size: 14px;
}

.item-details .price {
  color: #B7CE66;
  font-weight: bold;
  font-size: 14px;
}

.item-details .subtotal {
  color: #333;
  font-weight: bold;
  font-size: 15px;
  border-top: 1px solid #ddd;
  padding-top: 0.25rem;
  margin-top: 0.25rem;
}

.item-actions {
  display: flex;
  align-items: center;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background-color: #c82333;
  transform: scale(1.1);
}

.cart-actions {
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
}

.clear-cart-btn {
  background-color: #ffc107;
  color: #000;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.clear-cart-btn:hover {
  background-color: #e0a800;
}

.logout-section {
  text-align: center;
  padding: 2rem;
  border-top: 2px solid #ddd;
  margin-top: 3rem;
}

.logout-btn {
  background-color: #d9534f;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #f86b79;
  transform: translateY(-2px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.current-image {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.upload-btn {
  background-color: #007bff;
  color: white;
  margin-top: 0.5rem;
}

.upload-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.upload-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.success {
  color: #28a745;
  font-weight: bold;
}

.error {
  color: #dc3545;
  font-weight: bold;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.save-btn {
  background-color: #28a745;
  color: white;
  flex: 1;
}

.save-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  flex: 1;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 1rem;
  }
  
  table {
    font-size: 14px;
  }
  
  th, td {
    padding: 0.5rem;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .order-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .order-item img {
    align-self: center;
  }

  .order-actions {
    flex-direction: column;
  }
  
  .modal-content {
    width: 95%;
    padding: 1rem;
  }
}
</style>