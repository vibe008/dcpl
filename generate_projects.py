import os
import json

def generate_projects_js(base_path, output_file="AllProjects.js"):
    projects = []
    project_id = 1

    # Loop through each project folder inside base_path
    for folder in sorted(os.listdir(base_path)):
        folder_path = os.path.join(base_path, folder)
        if not os.path.isdir(folder_path):
            continue

        # Collect images
        images = []
        for file in sorted(os.listdir(folder_path)):
            if file.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                images.append(f"/assets/ProjectImages/{folder}/{file}")

        if not images:
            continue

        # Default values (you can customize later)
        project = {
            "id": project_id,
            "title": folder.replace("_", " ").replace("-", " ").upper(),
            "content": folder.replace("_", " ").replace("-", " ").title(),
            "image": images[0],  # first image as cover
            "year": "2022",
            "type": "Architecture",
            "status": "Completed",
            "city": "Unknown",
            "category": "General",
            "features": [
                "Sustainable Design",
                "Smart City Integration",
                "Green Technology"
            ],
            "cost": "",
            "images": images
        }

        projects.append(project)
        project_id += 1

    # Convert to JS export format
    js_content = "export default AllProjects = " + json.dumps(projects, indent=4)

    # Write to file
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"✅ AllProjects.js generated with {len(projects)} projects.")


# Example usage:
generate_projects_js(r"D:\bhatnagar sir\dcpl\public\assets\ProjectImages")
