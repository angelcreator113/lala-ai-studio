export async function generateCaptions(video) {
  const res = await fetch("http://localhost:3000/api/captions/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ video }),
  });
  return res.json();
}

export async function applyEffects(captions) {
  const res = await fetch("http://localhost:3000/api/captions/effects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ captions }),
  });
  return res.json();
}

export async function saveProject(projectData) {
  await fetch("http://localhost:3000/api/captions/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
}

export async function exportCaptions() {
  const res = await fetch("http://localhost:3000/api/captions/export");
  return res.blob();
}
