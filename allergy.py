import requests
import json

API_KEY = "79000dff9dee41f78285d1a3dc418e1a"

URL = "https://api.wegmans.io/products/search?query={}&api-version=2018-10-18&subscription-key={}"

def query_term(term):
    r = requests.get(URL.format(term, API_KEY))
    json_data = json.loads(r.text)
    return json_data


def main():
    milk_data = query_term("Milk")
    milk_data_results = milk_data['results']
    for idx in range(len(milk_data_results)):
        print(milk_data_results[idx]['sku'])
main()

