import os
import glob

# Spécifie le chemin du dossier (à modifier selon ton cas)
folder_path = 'C:\\Users\\DELL\\Desktop\\2025-05-11'

# Recherche tous les fichiers .csv dans le dossier
csv_files = glob.glob(os.path.join(folder_path, '*.csv'))

# Supprime chaque fichier trouvé
for file in csv_files:
    try:
        os.remove(file)
        print(f"Supprimé : {file}")
    except Exception as e:
        print(f"Erreur en supprimant {file} : {e}")
