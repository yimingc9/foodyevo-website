import csv
import json
import pandas as pd
import numpy as np
import re
import string
from collections import Counter
import openai
from openai import OpenAI
import os
import time
import ast

"""
Before running this file run:

pip3 install --upgrade openai
pip3 install nest_asyncio
"""

# SET UP YOUR OPENAI CLIENT
def set_openai_env(api_key):
    os.environ['OPENAI_API_KEY'] = api_key  # SET YOUR OWN API KEY

    api_key = os.getenv("OPENAI_API_KEY")
    if api_key is None:
        raise ValueError("Please set the OPENAI_API_KEY environment variable.")

    # print(api_key) # test that this env var was set

    client = openai.OpenAI(api_key=api_key)
    return client


def api_call(image_url, model='gpt-4-vision-preview'):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    response = CLIENT.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are an expert at identifying food ingredients in salad images."},
            {"role": "user",
                "content": [
                    {"type": "text", "text": "Identify all food ingredients in this salad. Return a only a JSON object with the keys being the food ingredient name, and the value being an integer calorie count of this ingredient."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_url,
                        },
                    },
                ],
             }
        ],
        max_tokens=1024,
        temperature=0
    )
    response_content = response.choices[0].message.content
    return response_content


CLIENT = set_openai_env('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')
with open('images/image_list.txt', 'r') as f:
    for image_link in f:
        print(api_call(image_link))

