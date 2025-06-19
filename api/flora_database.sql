-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : flora-database
-- Généré le : jeu. 19 juin 2025 à 20:16
-- Version du serveur : 11.5.2-MariaDB-ubu2404
-- Version de PHP : 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `flora`
--

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_login` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`id`, `user_login`, `product_id`, `quantity`, `created_at`) VALUES
(21, 'test', 11, 1, '2025-06-19 13:53:07');

-- --------------------------------------------------------

--
-- Structure de la table `newsletter_emails`
--

CREATE TABLE `newsletter_emails` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_login` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','paid','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `user_login`, `total_amount`, `status`, `created_at`) VALUES
(1, 'Léane', 42.00, 'paid', '2025-06-18 21:25:20'),
(2, '444', 90.00, 'cancelled', '2025-06-18 21:57:10'),
(3, 'miaou', 16.00, 'cancelled', '2025-06-19 18:07:29'),
(4, 'miaou', 16.00, 'paid', '2025-06-19 18:07:30'),
(5, 'miaou', 16.00, 'cancelled', '2025-06-19 18:07:37');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 2, 1, 42.00),
(2, 2, 3, 1, 45.00),
(3, 2, 3, 1, 45.00),
(4, 3, 11, 1, 16.00),
(5, 4, 11, 1, 16.00),
(6, 5, 11, 1, 16.00);

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `photo`, `price`) VALUES
(1, 'Lilium philadelphicum', 'Cette fleur éclatante symbolise l\'amour ardent et la beauté majestueuse. Parfaite pour exprimer des sentiments profonds et intenses. Offrez-la pour un anniversaire de mariage, un événement romantique ou pour déclarer votre flamme.', 'images/1750279233448-Lilium philadelphicum.png', 13.99),
(2, 'Douce Évasion', 'Un assemblage délicat de fleurs des champs, évoquant la sérénité et la légèreté. Idéal pour apporter une touche de nature et de fraîcheur à votre intérieur, ou pour offrir à un ami qui apprécie la simplicité et le charme bucolique. Ce bouquet est parfait pour une pendaison de crémaillère ou pour égayer une journée.', 'images/bouquet1.png', 42.00),
(3, 'Éclat Printanier', 'Ce bouquet joyeux et coloré est une véritable explosion de gaieté. Il incarne la vitalité et le renouveau, parfait pour célébrer le printemps ou pour apporter un sourire. Offrez-le pour féliciter quelqu\'un, pour un rétablissement, ou simplement pour illuminer la journée de vos proches.', 'images/bouquet3.png', 45.00),
(4, 'Jardin Secret', 'Un bouquet généreux et foisonnant, rappelant la diversité et la beauté d\'un jardin sauvage. Chaque fleur est une découverte, offrant une harmonie de couleurs et de formes. C\'est le cadeau idéal pour les amoureux de la nature ou pour exprimer votre admiration et votre gratitude.', 'images/bouquet7.png', 55.00),
(5, 'Rayons de Joie', 'Ce bouquet lumineux et vibrant, dominé par le jaune solaire, est un concentré d\'optimisme et de bonne humeur. Il dissipe la grisaille et apporte une énergie positive. Parfait pour remonter le moral, célébrer une réussite ou pour un cadeau qui met du baume au cœur.', 'images/bouquet5.png', 58.00),
(6, 'Harmonie Rustique', 'Un mélange équilibré de fleurs aux teintes chaudes et naturelles, évoquant la richesse des récoltes et l\'authenticité de la campagne. Ce bouquet apporte une atmosphère chaleureuse et réconfortante. Idéal pour remercier, pour décorer une table de fête, ou pour un cadeau qui sent bon la convivialité.', 'images/bouquet4.png', 50.00),
(7, 'Festivité Pastel', 'Un bouquet volumineux et élégant, aux couleurs douces et romantiques, qui crée une ambiance de fête et de raffinement. Il est idéal pour les grandes occasions, les célébrations ou pour décorer un événement spécial avec une touche de sophistication.', 'images/bouquet6.png', 60.00),
(8, 'Cymbidium', 'Cette magnifique tige d\'orchidées roses est un symbole de luxe, de beauté exotique et de délicatesse. Elle exprime l\'admiration et le respect. C\'est un cadeau raffiné pour une personne chère, pour marquer un événement important ou pour apporter une touche d\'élégance à votre intérieur.', 'images/fleur1.png', 25.00),
(9, 'Lilium lancifolium', 'Ses couleurs chaudes et ses motifs distinctifs évoquent la chaleur et l\'éclat des couleurs automnales. C\'est une fleur qui symbolise la richesse et l\'énergie positive. Idéale pour égayer une pièce ou pour offrir à quelqu\'un qui aime les fleurs avec du caractère.', 'images/fleur3.png', 14.00),
(10, 'Zantedeschia aethiopica', 'Élégante et épurée, la Calla \"Rose Poudré\" symbolise la pureté, la beauté et la renaissance. Sa forme gracieuse en fait une fleur de choix pour les bouquets modernes et sophistiqués. Parfaite pour un mariage, une célébration intime ou pour exprimer une appréciation sincère.', 'images/fleur8.png', 12.00),
(11, 'Lys de Pâques', 'Symbole de pureté, d\'innocence et de majesté, le Lys Blanc est intemporel. Sa beauté élégante en fait un choix parfait pour les mariages, les condoléances ou pour exprimer un respect profond et sincère. Il apporte une touche de sérénité et de grâce à tout intérieur.', 'images/fleur2.png', 16.00),
(12, 'Tulipe perroquet ', 'Ces tulipes exubérantes, avec leurs multiples pétales et leurs teintes fuchsia et blanches, rappellent la générosité des pivoines. Elles symbolisent l\'amour parfait et l\'abondance. Un bouquet idéal pour célébrer la joie, un anniversaire ou pour apporter une note romantique et joyeuse.', 'images/fleur7.png', 22.00),
(13, 'Nelumbo nucifera', 'Le Lotus est une fleur d\'une grande signification, symbolisant la pureté, la beauté, le renouveau et l\'illumination. Il s\'épanouit majestueusement au-dessus de l\'eau, même dans la boue. Offrez-le pour inspirer la méditation, la paix intérieure ou pour honorer une personne chère qui apprécie la spiritualité.', 'images/fleur6.png', 25.00),
(14, 'Lilium Regale', 'Ces lys aux teintes chaleureuses de jaune et d\'orange irradient la positivité et la bonne fortune. Ils symbolisent la gratitude, l\'enthousiasme et la réussite. Parfaits pour célébrer un nouveau départ, une promotion ou simplement pour apporter un rayon de soleil dans la vie de quelqu\'un.', 'images/fleur5.png', 15.00),
(17, 'jonquille', 'Laissez-vous charmer par l\'éclat de nos narcisses, véritables ambassadrices du renouveau et de l\'espoir. Avec leurs pétales délicats et leur cœur vibrant, souvent jaune vif, blanc pur ou orange éclatant, les narcisses sont un hymne à la nature qui s\'éveille.', 'images/1750341120457-jonquille.png', 18.00);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `firstname`, `lastname`, `is_admin`) VALUES
(1, '444', '$2b$10$jil7/zsG5IcbEQYt.bugluC9Oq.DBkMf5m4tk71m7U8dOZpK60Wna', 'kjdbfjzidb@gmail.com', 'Leane', 'Barbier', 1),
(3, 'Léane', '$2b$10$AJf.E6e7n25QiBgGY8W9yO9myirPmAbph5ViiTZqzCnVdEIcvPze6', 'leane@gmail.com', 'Léane', 'Barbier', 0),
(4, 'test', '$2b$10$kXrBGS9L9pWLHor4c87h0OllEzhXpeRiXTovUjdEsnX6MZ763l9vS', 'test@test.fr', 'testy', 'testouille', 0),
(5, 'miaou', '$2b$10$BFk6FPGthBIESR1191pJ1OUlnhkK1.CH.HFdXmG/yIsHK.mcHFMr.', 'miaou3@miaoui', 'ez', 'ez1', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `newsletter_emails`
--
ALTER TABLE `newsletter_emails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_login` (`user_login`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `newsletter_emails`
--
ALTER TABLE `newsletter_emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_login`) REFERENCES `users` (`login`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_login`) REFERENCES `users` (`login`) ON DELETE CASCADE;

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
