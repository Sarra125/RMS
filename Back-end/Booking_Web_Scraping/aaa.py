from selenium.webdriver.common.by import By
from utils import Browser_Config
from Booking_URL import Booking_Tunisie_URL
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os


def save_progress(i):
    with open("progress.txt", "w") as f:
        f.write(str(i))

def load_progress():
    if os.path.exists("progress.txt"):
        with open("progress.txt", "r") as f:
            return int(f.read())
    return 0


if __name__ == "__main__":
    i=5
    save_progress(0)
    i=load_progress()
    print(i)
    
