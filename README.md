# 🪄 Magic Scrum

**Magic Scrum** is a modern, web-based Scrum management application designed to be fast, clean, and developer-friendly. Built with cutting-edge tools and thoughtful architecture, it delivers a smooth project planning experience — with just a hint of magic. ✨

---

## 🚀 Features

* 🧩 **Drag & Drop** board powered by `dnd-kit`
* ⚡ **Redux Toolkit + Redux Query** for efficient state and data management
* 🎨 **Tailwind CSS** for sleek, responsive UI
* 🧱 **Feature-Sliced Design (FSD)** for scalable, modular architecture
* 🧼 **Clean Code** principles throughout
* 🔁 **CRUD operations** with *nearly* **Optimistic UI** updates
* 🎭 **Framer Motion** animations for a delightful UX
* 🔧 **React + Next** for fast and flexible rendering
* 🛡️ **Husky + Commitlint** to enforce conventional commits and protect code quality

---

## 🏗️ Tech Stack

| Tool             | Purpose                          |
| ---------------- | -------------------------------- |
| `React`          | UI Framework                     |
| `Redux Toolkit`  | State management                 |
| `RTK Query`      | Data fetching & caching          |
| `dnd-kit`        | Drag & drop functionality        |
| `Tailwind CSS`   | Utility-first styling            |
| `Framer Motion`  | UI animations                    |
| `FSD`            | Scalable project structure       |
| `Husky`          | Git hooks for safe commits       |
| `Commitlint`     | Enforces conventional commits    |

---

## 🔧 Development

### 🛠️ Install Dependencies

```bash
npm install
````

### 🚀 Run Locally

```bash
npm run dev
```

### 🔐 Git Hooks Setup

We use **Husky** with **Commitlint** to ensure all commits follow the [Conventional Commits](https://www.conventionalcommits.org/) format.

To enable hooks after cloning the repo:

```bash
npm run prepare
```

This sets up Husky and activates `commit-msg` hooks.

---

## 🧪 Todo / Improvements

* [ ] Full optimistic updates for CRUD
* [ ] Role-based access control (RBAC)
* [ ] Unit + E2E tests
* [ ] Realtime sync with WebSocket

---

## 🤝 Contributing

PRs are welcome! Make your code readable, modular, and magical.

Please follow our commit format — it helps us keep the changelog clean and maintain automation pipelines.

Example:

```
feat: add avatar upload to user settings
fix: resolve drag preview offset issue on mobile
```

---

## 📜 License

MIT — Feel free to use, modify, and deploy.