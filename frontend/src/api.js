// src/api.js

export const saveProject = async (projectData) => {
  try {
    const response = await fetch("/api/project/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectData }),
    });

    if (!response.ok) throw new Error("Failed to save project");

    return await response.json();
  } catch (error) {
    console.error("Error saving project:", error);
    throw error;
  }
};

export const loadProject = async () => {
  try {
    const response = await fetch("/api/project/load");

    if (!response.ok) throw new Error("Failed to load project");

    return await response.json();
  } catch (error) {
    console.error("Error loading project:", error);
    throw error;
  }
};
