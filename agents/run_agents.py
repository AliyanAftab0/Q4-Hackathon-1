import yaml
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def run_agent(agent_file, inputs):
    with open(agent_file, 'r') as f:
        spec = yaml.safe_load(f)['agent']
    
    prompt = spec['prompt']
    for k, v in inputs.items():
        prompt = prompt.replace(f"{{{{{k}}}}}", str(v))
        
    model = genai.GenerativeModel(spec['model'])
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    # Example
    print(run_agent('agents/content.agent.yml', {"topic": "Inverse Kinematics", "level": "Beginner"}))
