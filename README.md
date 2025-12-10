cp .env.example .env
npm install express dotenv helmet express-rate-limit
node src/server.js
# ==========================
# 9) README.md
# ==========================
cat > README.md << 'EOF'
# Club Website - Architecture de base

## Installation

\`\`\`bash
cp .env.example .env
npm install express dotenv helmet express-rate-limit
node src/server.js
\`\`\`

## Endpoints

- GET /health → Vérification du serveur

## Sécurité
- Helmet
- Rate limiting
- Variables sensibles dans .env
