import pandas as pd
from fuzzywuzzy import process, fuzz
import numpy as np

# Charger les fichiers
hotels_df = pd.read_excel("C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\liste_tot_hotels.xlsx")
df_to_update = pd.read_excel("C:\\Users\\DELL\\Desktop\\data\\2025-05-11\\2025-05-13.xlsx")

# Nettoyer les noms pour comparaison
hotels_df["Hotel_Name_clean"] = hotels_df["Hotel Name"].str.lower().str.strip()
df_to_update["Hotel_Name_clean"] = df_to_update["Hotel Name"].str.lower().str.strip()

# Créer dictionnaire de correspondance directe
exact_name_to_id = dict(zip(hotels_df["Hotel_Name_clean"], hotels_df["Hotel_id"]))

# Initialiser
hotel_ids = []
found_count = 0

# Appliquer correspondance exacte puis fuzzy si besoin
for name in df_to_update["Hotel_Name_clean"]:
    hotel_id = exact_name_to_id.get(name)

    if hotel_id is None:
        match = process.extractOne(name, hotels_df["Hotel_Name_clean"], scorer=fuzz.token_sort_ratio)
        if match and match[1] >= 85:
            hotel_id = exact_name_to_id.get(match[0])

    if hotel_id is not None:
        found_count += 1

    hotel_ids.append(hotel_id if hotel_id is not None else np.nan)

# Ajouter la colonne Hotel_id
df_to_update["Hotel_id"] = hotel_ids

# Nettoyage
df_to_update.drop(columns=["Hotel_Name_clean"], inplace=True)

# Sauvegarder le fichier final
df_to_update.to_excel("fichier_avec_id_corrige.xlsx", index=False)

# Afficher le nombre trouvé
print(f"{found_count} hôtels ont trouvé un ID via correspondance exacte ou fuzzy.")
