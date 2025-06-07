const API_BASE = "http://localhost:3000/api";

export async function saveProject(projectData) {
  const res = await fetch(`${API_BASE}/project/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  });
  return await res.json();
}

export async function loadProject() {
  const res = await fetch(`${API_BASE}/project/load`);
  return await res.json();
}
