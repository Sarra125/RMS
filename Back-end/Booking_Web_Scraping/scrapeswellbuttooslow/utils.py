from selenium.webdriver.chrome.options import Options
from selenium import webdriver





def Browser_Config():
     # Configure Chrome options
        chrome_options = Options()
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

        # Initialize the WebDriver
        driver = webdriver.Chrome(options=chrome_options)
        return driver





