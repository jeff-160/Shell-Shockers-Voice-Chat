from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options
import speech_recognition as sr
import string

SST = sr.Recognizer()
SST.pause_threshold = 0.5

def obf_text(text: str) -> str:
    font = ['𝖺','𝖻','𝖼','𝖽','𝖾','𝖿','𝗀','𝗁','𝗂','𝗃','𝗄','𝗅','𝗆','𝗇','𝗈','𝗉','𝗊','𝗋','𝗌','𝗍','𝗎','𝗏','𝗐','𝗑','𝗒','𝗓']

    return "".join([font[string.ascii_lowercase.index(c)] if c.isalpha() else c for c in text])

def sst() -> str | None:
    with sr.Microphone() as source: 
        audio = SST.listen(source) 

    try: 
        transcript = SST.recognize_google(audio, language='en-in').lower().strip()
        return obf_text(transcript)

    except:
        return None

def get_driver() -> WebDriver:
    options = Options()
    options.add_argument("--log-level=2")

    return webdriver.Chrome(options=options)

def get_script(file: str) -> str:
    with open(file, "r") as f:
        return f.read()

def main():
    driver = get_driver()

    driver.implicitly_wait(5)
    driver.get("https://shellshock.io/")
    driver.execute_script(get_script("script.js"))

    while True:
        message = sst()

        if message:
            try:
                driver.execute_script(f'window.sendMessage("{message}")')
            
            except Exception as e:
                print(f"Failed to send message: {e}")

if __name__ == "__main__":
    main()