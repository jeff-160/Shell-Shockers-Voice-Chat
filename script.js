const chat = document.querySelector(".chat-container")?.childNodes[2]

if (chat) {
    chat.click()

    chat.value = "MESSAGE"

    chat.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
    }))
}