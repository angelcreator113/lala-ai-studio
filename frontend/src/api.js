// src/api.js

// Save project
export const saveProject = async (projectData) => {
  try {
    const response = await fetch("http://localhost:3000/api/project/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectData }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving project:", error);
    throw error;
  }
};

// Load latest project
export const loadProject = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/project/load");
    if (!response.ok) throw new Error("Failed to load project.");
    return await response.json();
  } catch (error) {
    console.error("Error loading project:", error);
    throw error;
  }
};

// List available versions
export const listProjectVersions = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/project/versions");
    if (!response.ok) throw new Error("Failed to list versions.");
    return await response.json();
  } catch (error) {
    console.error("Error listing versions:", error);
    throw error;
  }
};

// Load specific version
export const loadProjectVersion = async (fileName) => {
  try {
    const response = await fetch(`http://localhost:3000/api/project/version/${fileName}`);
    if (!response.ok) throw new Error("Failed to load version.");
    return await response.json();
  } catch (error) {
    console.error("Error loading version:", error);
    throw error;
  }
};
