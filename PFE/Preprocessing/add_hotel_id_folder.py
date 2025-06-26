import pandas as pd
from fuzzywuzzy import process, fuzz
import numpy as np
import os
import glob

# Chemins à modifier selon ton usage
input_folder = "C:\\Users\\DELL\\Desktop\\data\\2025-05-11"
hotel_list_path = "C:\\Users\\DELL\\Desktop\\PFE\\useful_tables\\liste_tot_hotels.xlsx"

# Créer le dossier de sortie avec le même nom que le dossier d'entrée + "_corrigé"
parent_folder = os.path.dirname(input_folder)
folder_name = os.path.basename(input_folder)
output_folder = os.path.join(parent_folder, folder_name + "_corrigé")

os.makedirs(output_folder, exist_ok=True)

# Charger la liste des hôtels
hotels_df = pd.read_excel(hotel_list_path)
hotels_df["Hotel_Name_clean"] = hotels_df["Hotel Name"].str.lower().str.strip()
exact_name_to_id = dict(zip(hotels_df["Hotel_Name_clean"], hotels_df["Hotel_id"]))

# Parcourir tous les fichiers Excel dans le dossier
excel_files = glob.glob(os.path.join(input_folder, "*.xlsx"))

for file_path in excel_files:
    df_to_update = pd.read_excel(file_path)

    if "Hotel Name" not in df_to_update.columns:
        print(f"❌ Le fichier {file_path} ne contient pas la colonne 'Hotel Name'. Ignoré.")
        continue

    df_to_update["Hotel_Name_clean"] = df_to_update["Hotel Name"].str.lower().str.strip()
    
    hotel_ids = []
    found_count = 0

    for name in df_to_update["Hotel_Name_clean"]:
        hotel_id = exact_name_to_id.get(name)

        if hotel_id is None:
            match = process.extractOne(name, hotels_df["Hotel_Name_clean"], scorer=fuzz.token_sort_ratio)
            if match and match[1] >= 85:
                hotel_id = exact_name_to_id.get(match[0])

        if hotel_id is not None:
            found_count += 1

        hotel_ids.append(hotel_id if hotel_id is not None else np.nan)

    df_to_update["Hotel_id"] = hotel_ids
    df_to_update.drop(columns=["Hotel_Name_clean"], inplace=True)

    output_path = os.path.join(output_folder, os.path.basename(file_path))
    df_to_update.to_excel(output_path, index=False)
    print(f"✅ {os.path.basename(file_path)} traité - {found_count} correspondances trouvées.")

print("🎉 Tous les fichiers ont été traités.")
