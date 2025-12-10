-- Schéma de base pour le site du club
-- Base : MySQL
-- IMPORTANT :
--  - Le nom de la base doit correspondre à la variable d'environnement DB_NAME (actuellement "club-website").
--  - À exécuter manuellement dans votre client MySQL (phpMyAdmin, CLI, etc.)

-- Exemple (à adapter si besoin) :
-- CREATE DATABASE IF NOT EXISTS \`club-website\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- USE \`club-website\`;

-- ==========================
-- Table users
-- ==========================
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'EDITOR', 'USER') NOT NULL DEFAULT 'USER',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================
-- Table containers
-- Représente les sections / blocs principaux de la page
-- ==========================
CREATE TABLE IF NOT EXISTS containers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  created_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_containers_users
    FOREIGN KEY (created_by)
    REFERENCES users(id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================
-- Table cards
-- Cartes affichées à l'intérieur d'un container
-- ==========================
CREATE TABLE IF NOT EXISTS cards (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  container_id INT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NULL,
  image_url VARCHAR(500) NULL,
  link_url VARCHAR(500) NULL,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_cards_containers
    FOREIGN KEY (container_id)
    REFERENCES containers(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
