from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options
import speech_recognition as sr

SST = sr.Recognizer()
SST.pause_threshold = 0.5

def sst() -> str | None:
    with sr.Microphone() as source: 
        audio = SST.listen(source) 

    try: 
        return SST.recognize_google(audio, language='en-in').lower().strip()
    
    except:
        return None

def get_driver() -> WebDriver:
    options = Options()
    options.add_argument("--log-level=2")

    return webdriver.Chrome(options=options)

def main():
    driver = get_driver()

    driver.get("https://shellshock.io/")

    with open("script.js", "r") as f:
        script = f.read()

    while True:
        message = sst()

        if message:
            try:
                driver.execute_script(script.replace("MESSAGE", message))
            
            except Exception as e:
                print(f"Failed to send message: {e}")

if __name__ == "__main__":
    main()