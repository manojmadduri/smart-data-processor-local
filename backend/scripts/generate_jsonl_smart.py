#!/usr/bin/env python3
import json
import re
import nltk
import dateparser
import numpy as np
import argparse
from sentence_transformers import SentenceTransformer
from transformers import pipeline
import sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# ----------------------------
# ARG PARSING
# ----------------------------
parser = argparse.ArgumentParser()
parser.add_argument('--input',  required=True, help='Path to input text file')
parser.add_argument('--output', default='memories.jsonl', help='Path to output JSONL')
args = parser.parse_args()

# ----------------------------
# SETUP
# ----------------------------
nltk.download('punkt', quiet=True)

# Load models
embed_model = SentenceTransformer('all-MiniLM-L6-v2')      # Fast, light
classifier   = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Define real-world diary topics
topic_labels = [
    "Work", "Travel", "Family", "Friends", "Health", "Emotions", "Finance",
    "Achievements", "Challenges", "Education", "Shopping", "Events",
    "Entertainment", "Food", "Weather", "Technology", "Random thoughts"
]
topic_embeddings = embed_model.encode(topic_labels)

# Map topic → smart question
category_to_question = {
    "Work":        "What work or career experiences did I have?",
    "Travel":      "What travel or trip experiences did I have?",
    "Family":      "What family-related events did I experience?",
    "Friends":     "What did I do with my friends?",
    "Health":      "What health or fitness events did I go through?",
    "Emotions":    "How was I feeling emotionally at that time?",
    "Finance":     "What financial decisions or actions did I take?",
    "Achievements":"What achievement or success did I celebrate?",
    "Challenges":  "What challenges or failures did I face?",
    "Education":   "What educational experiences did I have?",
    "Shopping":    "What shopping or buying activities did I do?",
    "Events":      "What event or celebration did I participate in?",
    "Entertainment":"What entertainment activities did I enjoy?",
    "Food":        "What food-related experiences did I have?",
    "Weather":     "What was the weather like or what nature did I observe?",
    "Technology":  "What technology-related activities did I do?",
    "Random thoughts": "What thoughts or dreams did I reflect on?"
}

# ----------------------------
# HELPERS
# ----------------------------
def extract_date(text):
    """Extract dates like 'Dec 25, 2023' and normalize to YYYY-MM-DD."""
    match = re.search(r'\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* '
                      r'\d{1,2},\s*\d{4}\b', text)
    if match:
        parsed = dateparser.parse(match.group(0))
        return parsed.strftime("%Y-%m-%d") if parsed else None
    return None

def detect_year_from_text(text):
    """Find a four-digit year (1900–2099) in the sentence."""
    match = re.search(r'\b(19|20)\d{2}\b', text)
    return match.group(0) if match else None

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def predict_best_topic(sent_emb):
    sims = [cosine_similarity(sent_emb, t_emb) for t_emb in topic_embeddings]
    return topic_labels[np.argmax(sims)]

def generate_super_smart_question_and_topic(sentence):
    emb = embed_model.encode(sentence)
    topic = predict_best_topic(emb)
    question = category_to_question.get(topic, "What happened during this time?")
    return question, topic

# ----------------------------
# MAIN CONVERSION
# ----------------------------
def diary_to_memories(input_file, output_file):
    # Read diary
    text = open(input_file, 'r', encoding='utf-8').read()
    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]

    sentences, dates = [], []
    for para in paragraphs:
        dt = extract_date(para) or "Unknown"
        for sent in nltk.sent_tokenize(para):
            if len(sent.strip()) < 10:
                continue
            sentences.append(sent.strip())
            dates.append(dt)

    if not sentences:
        print("No sentences found. Check your input file format.")
        return

    # Write JSONL
    with open(output_file, 'w', encoding='utf-8') as out:
        for idx, sent in enumerate(sentences):
            year = detect_year_from_text(sent)
            date_for_mem = f"{year}-01-01" if year else dates[idx]
            question, topic = generate_super_smart_question_and_topic(sent)
            mem = {
                "input": question,
                "output": sent,
                "date":   date_for_mem,
                "topic":  topic
            }
            out.write(json.dumps(mem, ensure_ascii=False) + "\n")

    print(f"{len(sentences)} memories generated and saved to '{output_file}'")

if __name__ == "__main__":
    diary_to_memories(args.input, args.output)
