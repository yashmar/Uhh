# Collab Project Demo — Repository


This single-file React demo contains a simplified collaborative project management app with:


- Email/password authentication (Firebase Auth)
- Dashboard with Head Developer / Favorites grouping
- Create Project modal with invite-by-email field
- Project workspace with file list, simple code editor, save/commit behavior, activity log
- Notes board with quick create/edit and draggable notes
- Light / Dark theme toggle (localStorage)
- Firestore structure: `projects`, `projects/{id}/files`, `projects/{id}/notes`, `projects/{id}/log`


---


## Files included (in this document)


This document contains everything you need for a minimal repo. Copy the sections into files as shown:


```
collab-demo/
├─ package.json
├─ .gitignore
├─ index.html
├─ src/
│ ├─ main.jsx
│ └─ App.jsx <-- the React demo (the large file below)
└─ README.md <-- this content
```


> Note: The full React component (`App.jsx`) is included at the bottom of this canvas document — open it in the canvas to copy it into `src/App.jsx` if you prefer manual steps.


---
