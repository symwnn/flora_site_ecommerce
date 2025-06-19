require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');
const multer = require('multer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ajout de Stripe

const app = express();
app.use(cors());
app.use(express.json());

// Servir les images statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

// Configuration de Multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/'); // Dossier de destination
  },
  filename: (req, file, cb) => {
    // Génère un nom unique : timestamp + nom original
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Filtre pour accepter seulement les images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées !'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite à 5MB
  }
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL DB');
});

// --- AUTHENTIFICATION --

// Register sécurisé
app.post('/api/register', async (req, res) => {
  const { login, password, email, firstname, lastname } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (login, password, email, firstname, lastname) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [login, hashedPassword, email, firstname, lastname], (err) => {
      if (err) return res.status(500).json({ error: 'Register failed' });
      res.status(201).json({ message: 'User registered' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Encryption error' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { login, password } = req.body;
  const sql = 'SELECT * FROM users WHERE login = ?';
  db.query(sql, [login], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Login failed' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Ajoute le rôle dans le token (admin ou client)
    const role = user.is_admin === 1 ? 'admin' : 'client';
    const token = Buffer.from(`${login}:${password}:${role}`).toString('base64');
    res.json({ token, role });
  });
});

// Middleware Auth
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  const [login, password, role] = Buffer.from(token, 'base64').toString().split(':');
  req.user = { login, password, role };
  next();
}

// Middleware admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
};

// --- USERS ---

app.get('/api/users', authMiddleware, (req, res) => {
  const { login, password } = req.user;
  db.query('SELECT * FROM users WHERE login = ?', [login], async (err, results) => {
    if (err) return res.status(500).json({ error: 'User lookup failed' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Unauthorized' });

    const { password: _, ...userData } = user;
    res.json(userData);
  });
});

// NOUVELLE ROUTE ADMIN pour récupérer tous les utilisateurs
app.get('/api/admin/users', authMiddleware, adminMiddleware, (req, res) => {
  db.query('SELECT id, login, email, firstname, lastname, is_admin FROM users', (err, results) => {
    if (err) {
      console.error('Erreur récupération utilisateurs admin:', err);
      return res.status(500).json({ error: 'Failed to get users' });
    }
    res.json(results);
  });
});

app.put('/api/users', authMiddleware, (req, res) => {
  const { login, password } = req.user;
  const { email, firstname, lastname } = req.body;

  const checkUserSql = 'SELECT * FROM users WHERE login = ?';
  db.query(checkUserSql, [login], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Unauthorized' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Unauthorized' });

    const updateSql = 'UPDATE users SET email = ?, firstname = ?, lastname = ? WHERE login = ?';
    db.query(updateSql, [email, firstname, lastname, login], (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ message: 'User updated' });
    });
  });
});

// --- PRODUCTS ---

app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve products' });
    res.json(results);
  });
});

app.get('/api/products/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get product' });
    res.json(results[0]);
  });
});

app.post('/api/products', authMiddleware, (req, res) => {
  const { name, description, photo, price } = req.body;
  db.query('INSERT INTO products (name, description, photo, price) VALUES (?, ?, ?, ?)', [name, description, photo, price], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add product' });
    res.status(201).json({ message: 'Product added' });
  });
});

app.put('/api/products/:id', authMiddleware, (req, res) => {
  const { name, description, photo, price } = req.body;
  db.query('UPDATE products SET name=?, description=?, photo=?, price=? WHERE id=?', [name, description, photo, price, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update product' });
    res.json({ message: 'Product updated' });
  });
});

app.delete('/api/products/:id', authMiddleware, adminMiddleware, (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete product' });
    res.json({ message: 'Product deleted' });
  });
});

// SEARCH BAR ROUTE 

app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm || searchTerm.trim() === '') {
    return res.status(400).json({ error: 'La recherche est vide' });
  }

  const sql = 'SELECT * FROM products WHERE name LIKE ?';
  const searchValue = `%${searchTerm}%`;

  db.query(sql, [searchValue], (err, results) => {
    if (err) {
      console.error('Erreur recherche:', err);
      return res.status(500).json({ error: 'Erreur serveur lors de la recherche' });
    }
    res.json(results);
  });
});

// CART

// Ajouter un produit
app.post('/api/cart', authMiddleware, (req, res) => {
  const { product_id, quantity } = req.body;
  const user_login = req.user.login;
  const sql = 'INSERT INTO cart (user_login, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?';
  db.query(sql, [user_login, product_id, quantity || 1, quantity || 1], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add to cart' });
    res.status(201).json({ message: 'Product added to cart' });
  });
});

// Récupérer le panier de l'utilisateur connecté
app.get('/api/cart', authMiddleware, (req, res) => {
  const user_login = req.user.login;
  db.query('SELECT * FROM cart WHERE user_login = ?', [user_login], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get cart' });
    res.json(results);
  });
});

// Vider complètement le panier de l'utilisateur (AVANT la route :id)
app.delete('/api/cart/clear', authMiddleware, (req, res) => {
  const user_login = req.user.login;
  db.query('DELETE FROM cart WHERE user_login = ?', [user_login], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to clear cart' });
    res.json({ message: 'Cart cleared successfully' });
  });
});

// Supprimer un produit du panier (APRÈS la route clear)
app.delete('/api/cart/:id', authMiddleware, (req, res) => {
  const user_login = req.user.login;
  db.query('DELETE FROM cart WHERE id = ? AND user_login = ?', [req.params.id, user_login], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete from cart' });
    res.json({ message: 'Product removed from cart' });
  });
});

// --- STRIPE PAYMENT ---

// Crée une session de paiement Stripe
app.post('/api/create-checkout-session', authMiddleware, async (req, res) => {
  const { items } = req.body; // tableau [{ name, price, quantity }]
  
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Données invalides' });
  }

  try {
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // prix en centimes
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Erreur création session Stripe :', error);
    res.status(500).json({ error: 'Erreur serveur Stripe' });
  }
});

// --- TOKEN VERIFICATION ---

app.post('/api/verify-token', authMiddleware, (req, res) => {
  res.json({
    valid: true,
    login: req.user.login,
    is_admin: req.user.role === 'admin' ? 1 : 0
  });
});

// --- ROUTE UPLOAD IMAGE ---
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucune image fournie' });
    }

    // Retourne l'URL complète de l'image
    const imagePath = `images/${req.file.filename}`;
    
    res.json({ 
      message: 'Image uploadée avec succès',
      imagePath: imagePath,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload' });
  }
});

// Gestion des erreurs Multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Fichier trop volumineux (max 5MB)' });
    }
  }
  
  if (error.message === 'Seules les images sont autorisées !') {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "L'email est requis." });

  const mailOptions = {
    from: process.env.MAILTRAP_USER,
    to: email,
    subject: "Bienvenue à notre newsletter 💌",
    text: `Merci beaucoup pour ton inscription à notre newsletter ! Nous sommes ravis de te compter parmi nous 🌸.`,
    html: `<p>Merci beaucoup pour ton inscription à notre newsletter ! Nous sommes ravis de te compter parmi nous 🌸.</p>`
  };

  const mailtrapTransporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  mailtrapTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
    }
    res.status(200).json({ message: "Email envoyé avec succès !" });
  });
});

// --- ORDERS ---

// Créer une nouvelle commande
app.post('/api/orders', authMiddleware, async (req, res) => {
  const { items, total_amount } = req.body;
  const user_login = req.user.login;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items are required' });
  }

  try {
    // Créer la commande principale (version simplifiée)
    const orderSql = 'INSERT INTO orders (user_login, total_amount, status, created_at) VALUES (?, ?, ?, NOW())';
    
    db.query(orderSql, [user_login, total_amount, 'pending'], (err, result) => {
      if (err) {
        console.error('Erreur création commande:', err);
        return res.status(500).json({ error: 'Failed to create order' });
      }

      const orderId = result.insertId;

      // Insérer les items de la commande
      const itemPromises = items.map(item => {
        return new Promise((resolve, reject) => {
          const itemSql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
          db.query(itemSql, [orderId, item.product_id, item.quantity, item.price], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      });

      Promise.all(itemPromises)
        .then(() => {
          // Vider le panier après commande réussie
          db.query('DELETE FROM cart WHERE user_login = ?', [user_login], () => {
            res.status(201).json({ 
              message: 'Order created successfully', 
              order_id: orderId 
            });
          });
        })
        .catch(err => {
          console.error('Erreur insertion items:', err);
          res.status(500).json({ error: 'Failed to create order items' });
        });
    });
  } catch (error) {
    console.error('Erreur générale:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Récupérer les commandes de l'utilisateur
app.get('/api/orders', authMiddleware, (req, res) => {
  const user_login = req.user.login;
  
  const sql = `
    SELECT o.*, 
           oi.product_id, oi.quantity, oi.price as item_price,
           p.name as product_name, p.photo as product_photo
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.user_login = ?
    ORDER BY o.created_at DESC
  `;
  
  db.query(sql, [user_login], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to get orders' });
    }
    
    // Grouper les résultats par commande
    const ordersMap = {};
    results.forEach(row => {
      if (!ordersMap[row.id]) {
        ordersMap[row.id] = {
          id: row.id,
          user_login: row.user_login,
          total_amount: row.total_amount,
          status: row.status,
          created_at: row.created_at,
          items: []
        };
      }
      
      if (row.product_id) {
        ordersMap[row.id].items.push({
          product_id: row.product_id,
          product_name: row.product_name,
          product_photo: row.product_photo,
          quantity: row.quantity,
          price: row.item_price
        });
      }
    });
    
    res.json(Object.values(ordersMap));
  });
});

// NOUVELLES ROUTES ADMIN

// Récupérer TOUTES les commandes (pour les admins)
app.get('/api/admin/orders', authMiddleware, adminMiddleware, (req, res) => {
  const sql = `
    SELECT o.*, 
           oi.product_id, oi.quantity, oi.price as item_price,
           p.name as product_name, p.photo as product_photo
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    ORDER BY o.created_at DESC
  `;
  
  db.query(sql, [], (err, results) => {
    if (err) {
      console.error('Erreur récupération commandes admin:', err);
      return res.status(500).json({ error: 'Failed to get orders' });
    }
    
    // Grouper les résultats par commande
    const ordersMap = {};
    results.forEach(row => {
      if (!ordersMap[row.id]) {
        ordersMap[row.id] = {
          id: row.id,
          user_login: row.user_login,
          total_amount: row.total_amount,
          status: row.status,
          created_at: row.created_at,
          items: []
        };
      }
      
      if (row.product_id) {
        ordersMap[row.id].items.push({
          product_id: row.product_id,
          product_name: row.product_name,
          product_photo: row.product_photo,
          quantity: row.quantity,
          price: row.item_price
        });
      }
    });
    
    res.json(Object.values(ordersMap));
  });
});

// Récupérer TOUS les paniers (pour les admins)
app.get('/api/admin/carts', authMiddleware, adminMiddleware, (req, res) => {
  const sql = `
    SELECT c.*, p.name as product_name
    FROM cart c
    LEFT JOIN products p ON c.product_id = p.id
    ORDER BY c.user_login, c.id
  `;
  
  db.query(sql, [], (err, results) => {
    if (err) {
      console.error('Erreur récupération paniers admin:', err);
      return res.status(500).json({ error: 'Failed to get carts' });
    }
    
    res.json(results);
  });
});

// Mettre à jour le statut d'une commande (pour les admins)
app.put('/api/orders/:id/status', authMiddleware, adminMiddleware, (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;
  
  const validStatuses = ['pending', 'paid', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  const sql = 'UPDATE orders SET status = ? WHERE id = ?';
  db.query(sql, [status, orderId], (err) => {
    if (err) {
      console.error('Erreur mise à jour statut:', err);
      return res.status(500).json({ error: 'Failed to update order status' });
    }
    
    res.json({ message: 'Order status updated successfully' });
  });
});

// Supprimer un utilisateur (pour les admins)
app.delete('/api/admin/users/:id', authMiddleware, adminMiddleware, (req, res) => {
  const userId = req.params.id;
  
  // Empêcher la suppression de son propre compte
  db.query('SELECT login FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Erreur vérification utilisateur:', err);
      return res.status(500).json({ error: 'Failed to verify user' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userToDelete = results[0];
    if (userToDelete.login === req.user.login) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }
    
    // Supprimer l'utilisateur
    db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
      if (err) {
        console.error('Erreur suppression utilisateur:', err);
        return res.status(500).json({ error: 'Failed to delete user' });
      }
      res.json({ message: 'User deleted successfully' });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
