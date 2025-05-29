# 📚 MatheBoard – Projektarbeit

MatheBoard ist ein rollenbasiertes Dashboard-System zur Unterstützung der Arbeitszeiterfassung, Anwesenheitsdokumentation und Verwaltung von Tutoren in Bildungseinrichtungen. Es ermöglicht sowohl Tutoren als auch Administratoren eine übersichtliche und datengetriebene Darstellung relevanter Informationen.

---

## 🔧 Verwendete Technologien

- **Frontend**: React, FullCalendar, Axios, MUI (Material UI)
- **Backend**: Node.js, Express.js
- **Datenbank**: MySQL
- **Authentifizierung**: JWT-basierte Token-Authentifizierung

---

## 🚀 Funktionsübersicht

### 🎓 Tutor Dashboard

- Erfassung täglicher **Arbeitsstunden** und **Anwesenheiten**
- Einsicht in persönliche **Statistiken und Fortschritte**
- Anzeige von **Team-Kalender-Events**
- Verwaltung des eigenen **Profils**
- Anzeige der **durchschnittlich notwendigen Wochenstunden** zur Vertragserfüllung

### 🛠 Admin Dashboard

- Verwaltung aller **Nutzer und Verträge**
- Überblick über **Team-Statistiken pro Monat**
- Analyse von **Anwesenheitstrends** nach Thema und Datum
- Erstellung und Verwaltung von **Kalender-Events**
- Visualisierung von **Stoßzeiten** mithilfe von Diagrammen

---

## 🗃️ Datenbank-Setup

Führe das SQL-Skript `mathe_helpdesk_installationsskript.sql` in deiner MySQL-Datenbank aus, um:

- Alle erforderlichen Tabellen anzulegen (`users`, `contracts`, `work_hours`, `attendance`, `events`)
- Beispiel-Nutzer, Verträge und Arbeitsstunden einzufügen

Stelle sicher, dass die Datenbank `mathe_helpdesk` bereits existiert und der MySQL-Server läuft.

---

## ▶️ Projektstart & Einrichtung

### 🔹 Voraussetzungen

- Node.js & npm
- Lokale MySQL-Datenbank

---

### 🔹 Backend starten
```bash
cd backend
npm install
cp .env.template .env
```
##### Trage deine MySQL-Zugangsdaten und ein JWT_SECRET in die .env-Datei ein
node server.js

Der Backend-Server läuft unter:
📍 http://localhost:5000

---

### 🔹 Frontend starten
```bash
cd frontend
npm install
npm start
```
Die React-Anwendung ist erreichbar unter:
🌐 http://localhost:3000

Sie kommuniziert automatisch mit dem Backend (API unter Port 5000).
Stelle sicher, dass das Backend vor dem Start des Frontends ausgeführt wird.
