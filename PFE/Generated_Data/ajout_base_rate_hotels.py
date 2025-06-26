import pandas as pd
import random

# Charger le fichier
df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\liste_tot_hotels.xlsx")

# Fonction pour générer le base_rate selon les règles
def generate_base_rate(row):
    location = str(row['Location']).lower()
    hotel_type = str(row['Type']).lower()

    if hotel_type == "resort" and location == "city":
        return random.randint(100, 200)
    elif hotel_type == "business" and location == "city":
        return random.randint(150, 300)
    elif hotel_type == "resort" and location == "seaside":
        return random.randint(100, 200)
    elif hotel_type == "business" and location == "seaside":
        return random.randint(120, 200)
    else:
        return None  # valeur par défaut si combinaison inconnue

# Appliquer la fonction
df["base_rate"] = df.apply(generate_base_rate, axis=1)

# Sauvegarder le nouveau fichier
df.to_excel("liste_tot_hotels_with_base_rate1.xlsx", index=False)

print("Colonne 'base_rate' ajoutée avec succès.")
