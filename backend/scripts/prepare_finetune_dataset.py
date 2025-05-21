#!/usr/bin/env python3
import json
import argparse

# ----------------------------
# ARG PARSING
# ----------------------------
parser = argparse.ArgumentParser()
parser.add_argument('--input',  required=True, help='Path to memories JSONL')
parser.add_argument('--output', default='finetune_data.jsonl', help='Path to output fine-tune JSONL')
args = parser.parse_args()

# ----------------------------
# MAIN CONVERSION
# ----------------------------
with open(args.input, 'r', encoding='utf-8') as infile, \
     open(args.output, 'w', encoding='utf-8') as outfile:
    for line in infile:
        mem = json.loads(line)
        prompt    = mem['input']
        completion = mem['output']
        outfile.write(json.dumps({
            "prompt":     prompt,
            "completion": completion
        }, ensure_ascii=False) + "\n")

print(f"Fine-tuning dataset created at '{args.output}'")
