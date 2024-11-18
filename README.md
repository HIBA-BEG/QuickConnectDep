# 🌐 Service de Communication en Temps Réel

## 📖 Description

Ce service permet aux utilisateurs de créer et gérer des canaux de communication (textuels, vocaux, vidéo, etc.) de manière fiable, sécurisée et évolutive. Il intègre des fonctionnalités modernes pour améliorer l'interaction et la collaboration en temps réel.

---

## ✨ Fonctionnalités Principales

- 💬 **Messagerie en Temps Réel** : Échange de messages en temps réel grâce à WebRTC et WebSockets.
- 🔒 **Discussions Privées** : Messages directs entre deux utilisateurs connectés.
- 👫 **Système d’Amis** : Gestion des demandes et listes d’amis.
- 🌍 **Canal Général** : Espace de discussion accessible à tous les utilisateurs.
- 🛠️ **Canaux de Groupe** : Création et administration de canaux privés et publics.
- ✉️ **Invitations et Demandes** : Notifications pour inviter ou rejoindre des canaux privés.
- 🔔 **Notifications en Temps Réel** : Alertes pour amis, messages et invitations.
- 🟢 **Statut en Ligne/Hors Ligne** : Mise à jour dynamique du statut des utilisateurs.
- ⏳ **Canaux Temporaires** : Organisation de sessions limitées dans le temps.
- 🗃️ **Sauvegarde des Données** : Archivage des discussions avec génération de métriques.
- 🚫 **Modération Avancée** : Bannissement temporaire ou définitif des utilisateurs.
- 🌟 **Système de Récompense** : Avantages pour les utilisateurs bien notés.
- 🛡️ **Mode Sécurisé** : Filtrage des contenus inappropriés dans les canaux.

---

## 🛠️ Technologies

### 🖥️ Frontend
- **Framework** : React.js
- **Langage** : TypeScript


### 🌐 Backend
- **Framework** : NestJS
- **Communication Temps Réel** : WebRTC, WebSocket
- **API** : REST API pour l'intégration avec d'autres microservices



---

## 📂 Structure du Projet

### 🖥️ Frontend
- **Composants Principaux** :
  - `RoomVoice` : Gère les données des salles.
  - `RoomClient` : Représente les utilisateurs dans une salle.
- **Bonne Pratique** : Maximiser la réutilisabilité des composants.

### 🔧 Backend
- **Services et Modules** :
  - Gestion des utilisateurs, des canaux, des messages et des notifications.
- **Tests** :
  - 🔗 **Intégration** : Tests des endpoints.
  - 🚀 **Fonctionnels** : Simulation des fonctionnalités clés.

---

## 🛠️ Installation et Configuration
###📋 Prérequis
- Node.js >= 18
- Git
### 💻 Installation
- Clonez le dépôt :
```bash
git clone https://github.com/HIBA-BEG/QuickConnect.git
cd QuickConnect
```
### Installez les dépendances :
```bash
npm install
```
## ▶️ Lancement en Développement
### Frontend :
```bash
cd frontend
npm start
```

### Backend :
```bash
cd backend
npm run start:dev
```

