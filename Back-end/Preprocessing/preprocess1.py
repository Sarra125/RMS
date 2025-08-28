import pandas as pd

# Charger le fichier Excel
fichier_entree = "C:\\Users\\DELL\\Desktop\\hotels\\liste_totale_hotels\\liste_totale_hotels.xlsx" # Remplace par le chemin réel
df = pd.read_excel(fichier_entree)

# Remplir la colonne "id" avec des valeurs de 1 à 355
df["ID"] = list(range(1, 356))

# Sauvegarder le fichier modifié
fichier_sortie = "fichier_modifie.xlsx"  # Nom du fichier de sortie
df.to_excel(fichier_sortie, index=False)

print("Fichier mis à jour avec succès.")
