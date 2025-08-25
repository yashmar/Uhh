import React, { useEffect, useState, useRef } from "react";
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<b>Files</b>
<div><button onClick={addFile}>+ New</button></div>
</div>
<div className="file-list" style={{ marginTop: 8 }}>
{files.map((f) => (
<div key={f.id} style={{ padding: 8, cursor: "pointer", borderRadius: 6, background: selectedFile && selectedFile.id === f.id ? "rgba(0,0,0,0.05)" : "transparent" }} onClick={() => setSelectedFile(f)}>
<div style={{ fontWeight: 700 }}>{f.name}</div>
<div className="small">by {f.author || "unknown"} {(f.lastModifiedBy ? `(modified)` : "")}</div>
</div>
))}
</div>


<div style={{ marginTop: 12 }}>
<b>Activity log</b>
<RecentLog projectId={project.id} />
</div>
</div>


<div className="card">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<b>Editor</b>
<div className="small">{selectedFile ? selectedFile.name : "No file selected"}</div>
</div>
<div style={{ marginTop: 8 }}>
<textarea className="code-editor" ref={codeRef} value={codeContent} onChange={(e) => setCodeContent(e.target.value)} />
</div>
<div style={{ marginTop: 8, display: "flex", gap: 8 }}>
<button onClick={saveFile}>Save</button>
<button onClick={() => { if (selectedFile) prompt("View blame data (demo):", JSON.stringify({ author: selectedFile.author, lastModifiedBy: selectedFile.lastModifiedBy })); }}>Blame</button>
</div>
</div>


<div className="card">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<b>Notes</b>
<button onClick={addNote}>+ Note</button>
</div>
<div style={{ marginTop: 8 }} className="notes-board">
{notes.map((n) => (
<div key={n.id} className="note card" draggable onDragStart={(e) => { e.dataTransfer.setData("text/plain", n.id); }}>
<div style={{ fontWeight: 700 }}>{n.title}</div>
<div className="small">{n.body || <i>click to edit</i>}</div>
<div style={{ position: "absolute", right: 8, bottom: 8 }}>
<button onClick={async (ev) => { ev.stopPropagation(); const newBody = prompt("Note body", n.body || ""); if (newBody !== null) await updateDoc(doc(db, `projects/${project.id}/notes`, n.id), { body: newBody }); }}>Edit</button>
</div>
</div>
))}
</div>


<div style={{ marginTop: 12 }}>
<b>Collaborators</b>
<div className="small">{(project.members || []).map((m) => <div key={m}>{m}</div>)}</div>
</div>
</div>
</div>


</div>
);
}


function RecentLog({ projectId }) {
const [items, setItems] = useState([]);
useEffect(() => {
if (!projectId) return;
const q = collection(db, `projects/${projectId}/log`);
const unsub = onSnapshot(q, (snap) => {
const arr = [];
snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
arr.sort((a, b) => (a.ts?.seconds || 0) - (b.ts?.seconds || 0));
setItems(arr.reverse().slice(0, 8));
});
return () => unsub();
}, [projectId]);
return (
<div className="small">
{items.map((it) => <div key={it.id} style={{ paddingTop: 6 }}>{it.text}</div>)}
{items.length === 0 && <div className="small">No activity yet.</div>}
</div>
);
}
