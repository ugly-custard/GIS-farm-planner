import nltk
from nltk.stem import WordNetLemmatizer
import numpy as np
from keras.models import load_model
import random
import json
import pickle

class Chatbot:
    def __init__(self, intents_file, model_file, data_file):
        self.lemmatizer = WordNetLemmatizer()
        self.intents_file = intents_file
        self.model_file = model_file
        self.data_file = data_file
        self.load_data()

    def load_data(self):
        with open(self.intents_file) as file:
            self.intents = json.load(file)

        with open(self.data_file, "rb") as f:
            self.words, self.labels, _, _ = pickle.load(f)

        self.model = load_model(self.model_file)

    def predict_intent(self, query):
        bag = self.bag_of_words(query, self.words)
        results = self.model.predict(np.array([bag]))[0]
        results_index = np.argmax(results)
        tag = self.labels[results_index]
        return tag , results , results_index

    def bag_of_words(self, query, words):
        bag = [0 for _ in range(len(words))]
        s_words = nltk.word_tokenize(query)
        s_words = [self.lemmatizer.lemmatize(word.lower()) for word in s_words if word != '?']
        for i in s_words:
            if i in words:
                bag[words.index(i)] = 1
        return bag

    def get_response(self, query):
        tag, results, results_index = self.predict_intent(query)
    
        if results[results_index] > 0.7:
            for item in self.intents["intents"]:
                if item['tag'] == tag:
                    response = random.choice(item['responses'])
                    queries = item.get('queries', [])
                    if queries:
                        queries_str = ", ".join(queries)
                        return response, queries_str
            return response, []
        else:
            return "I apologize, but I can't quite get you. Could you please repeat your query?", []

    def chat(self):
        print("Start talking with the bot (type quit to stop)!")
        while True:
            inp = input("You: ")
            if inp.lower() == "quit":
                break
            response = self.get_response(inp)
            print("Bot:", response)


