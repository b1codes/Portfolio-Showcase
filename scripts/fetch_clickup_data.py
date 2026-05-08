import os
import re
import json
import requests
from datetime import datetime

# Configuration
DATA_FILE = 'src/data.ts'
OUTPUT_FILE = 'src/generated/clickup_data.json'
CLICKUP_TOKEN = os.environ.get('CLICKUP_API_KEY')

def get_projects_with_clickup():
    with open(DATA_FILE, 'r') as f:
        content = f.read()
    
    # Find the PROJECTS array content
    projects_match = re.search(r'export const PROJECTS: Project\[\] = \[(.*?)\];\n\nexport const ABOUT_ME_TEXT', content, re.DOTALL)
    if not projects_match:
        # Fallback if the file structure changes slightly
        projects_match = re.search(r'export const PROJECTS: Project\[\] = \[(.*)\];', content, re.DOTALL)
    
    if not projects_match:
        return []
    
    projects_content = projects_match.group(1)
    
    # Each project starts with id: \d+
    # We find all project IDs and their positions to define blocks
    id_matches = list(re.finditer(r'id:\s*(\d+)', projects_content))
    projects = []
    
    for i in range(len(id_matches)):
        start = id_matches[i].start()
        # The block ends at the start of the next 'id: \d+' match, or the end of the content
        end = id_matches[i+1].start() if i + 1 < len(id_matches) else len(projects_content)
        block = projects_content[start:end]
        
        clickup_match = re.search(r'clickupListId:\s*[\'"](\d+)[\'"]', block)
        if clickup_match:
            projects.append({'id': id_matches[i].group(1), 'list_id': clickup_match.group(1)})
            
    return projects

def fetch_clickup_data(list_id):
    headers = {'Authorization': CLICKUP_TOKEN}
    url = f'https://api.clickup.com/api/v2/list/{list_id}/task?include_closed=true'
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Error fetching list {list_id}: {response.text}")
        return None
    
    tasks_data = response.json().get('tasks', [])
    total = len(tasks_data)
    closed = len([t for t in tasks_data if t['status']['type'] == 'closed'])
    progress = int((closed / total * 100)) if total > 0 else 0
    
    # Filter tasks: All active + top 5 closed
    active_tasks = [t for t in tasks_data if t['status']['type'] != 'closed']
    closed_tasks = sorted(
        [t for t in tasks_data if t['status']['type'] == 'closed'],
        key=lambda x: x.get('date_closed', '0'),
        reverse=True
    )[:5]
    
    combined_tasks = active_tasks + closed_tasks
    formatted_tasks = [{
        'name': t['name'],
        'status': t['status']['status'],
        'statusColor': t['status']['color'],
        'isClosed': t['status']['type'] == 'closed'
      } for t in combined_tasks]
    
    return {
        'progress': progress,
        'tasks': formatted_tasks
    }

def main():
    if not CLICKUP_TOKEN:
        print("CLICKUP_API_KEY not found in environment. Skipping.")
        return

    projects = get_projects_with_clickup()
    results = {
        'lastUpdated': datetime.utcnow().isoformat() + 'Z',
        'projects': {}
    }
    
    for p in projects:
        print(f"Fetching data for project {p['id']} (List: {p['list_id']})")
        data = fetch_clickup_data(p['list_id'])
        if data:
            results['projects'][p['id']] = data
            
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"Saved data to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
