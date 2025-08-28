import pandas as pd
import random

# Charger le fichier Excel
fichier = "C:\\Users\\DELL\\Desktop\\Real_Time_Competitor_Data_Collection\\fichier_modifie.xlsx" # Remplace par le chemin de ton fichier Excel
df = pd.read_excel(fichier)

# Fonction pour générer le coût en fonction des étoiles
def generer_cout(nb_etoiles):
    if nb_etoiles == 3:
        return random.randint(50, 100)
    elif nb_etoiles == 4:
        return random.randint(80, 200)
    elif nb_etoiles == 5:
        return random.randint(160, 600)
    else:
        return None

# Nettoyage de la colonne Nombre_Etoiles
df["Nombre_Etoiles"] = df["Nombre_Etoiles"].astype(str).str.extract('(\d)').astype(int)

# Remplir la colonne Fixed_Cost_Single_Room(TND) si vide
df["Fixed_Cost_Single_Room(TND)"] = df.apply(
    lambda row: generer_cout(row["Nombre_Etoiles"]) if pd.isna(row["Fixed_Cost_Single_Room(TND)"]) else row["Fixed_Cost_Single_Room(TND)"],
    axis=1
)

# Remplir la colonne Nbre_Rooms avec des valeurs entre 100 et 1000 si vide
df["Nbre_Rooms"] = df["Nbre_Rooms"].apply(
    lambda x: random.randint(100, 1000) if pd.isna(x) else x
)

# Sauvegarder le fichier modifié
df.to_excel("fichier_modifie.xlsx", index=False)
print("Fichier modifié enregistré sous 'fichier_modifie.xlsx'")
