# 🔥 Name Forge

> A server-rendered name generator for **bands**, **startups** and **fantasy taverns**, built with Express and EJS. Every result has a shareable link that always forges the same names.

[![test](https://github.com/himanshuuem/name-forge/actions/workflows/test.yml/badge.svg)](https://github.com/himanshuuem/name-forge/actions/workflows/test.yml)
![Express](https://img.shields.io/badge/Express-5-000?logo=express)
![EJS](https://img.shields.io/badge/EJS-templates-B4CA65?logo=ejs&logoColor=black)

## ✨ Features

- **Three forges:** each type has its own word banks and patterns, like `The {adj} {noun:plural}` or `{prefix}{suffix}`.
- **Reproducible results:** a seeded PRNG (mulberry32) means `/?type=tavern&seed=5` always gives the same six names. Share the link and your friends see exactly what you saw.
- **POST → Redirect → GET:** the form posts to `/forge`, which redirects (303) to the shareable URL, so refreshing never resubmits.
- **EJS partials** (`head`, `footer`), `res.locals` for shared view data, and automatic HTML escaping with `<%= %>`.
- **Input hardening:** unknown types fall back to `band`, junk seeds are replaced, and the body size is limited.
- **Works without JavaScript.** A small enhancement script adds copy buttons and instant type switching.
- A plural helper (Wolf → Wolves, Echo → Echoes) and a bounded loop for de-duplicating names.
- A 404 page, an error handler, `/health` and graceful shutdown.

## 🚀 Run Locally

```bash
git clone https://github.com/himanshuuem/name-forge.git
cd name-forge
npm install
npm run dev     # http://localhost:3000
npm test
```

## ☁️ Deploy (free)

There's a `render.yaml` included. On [Render](https://render.com), choose **New → Blueprint** and select this repo.

## 📁 Structure

```
name-forge/
├── src/
│   ├── server.js       # Boot + graceful shutdown
│   ├── app.js          # Routes, PRG flow, error handling
│   ├── generator.js    # Seeded PRNG, pattern filling, pluralize
│   └── words.js        # Word banks per forge
├── views/              # index.ejs, 404.ejs, partials/
├── public/             # styles.css, copy.js
└── test/app.test.js    # Unit + HTTP tests
```

## 📚 Origin

This is a reimagined **Band Name Generator** from the EJS section of [The Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/).

---

Made by [Himanshu](https://github.com/himanshuuem)
