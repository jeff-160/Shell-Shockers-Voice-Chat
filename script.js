let canRecord = false, hideStatus = null

function displayMessage(div, text) {
    div.innerHTML = `<p><b>${text}</b></p>`
}

const uiStyle = `
position: absolute;
margin: auto;
background-color: rgba(0,0,0, 0.8);
display: flex;
align-items: center;
justify-content: center;
color: white;
text-align: center;
user-select: none;
z-index: 9999;`

const helpMenu = function(){
    const div = document.createElement("div")
    
    div.id = btoa(Math.random().toString()).substring(0, 20)
    div.style=`${uiStyle} top: 0; left: 0; bottom: 0; right: 0;`
    div.style.width = div.style.height = `${window.innerHeight / 3}px`
    
    return div
}()

const statusBar = function(){
    const div = document.createElement("div")
    
    div.style = `${uiStyle} left: 0; bottom: 10px; transition: width .5s; white-space: nowrap; overflow: hidden`
    div.style.width = "0px"
    div.style.height = `${window.innerHeight / 15}px`
    
    return div
}()

const keyBindings = {
    "Toggle": [
        "v", 
        "toggle voicechat",
        () => {
            canRecord = !canRecord
            statusBar.style.width = `${parseInt(statusBar.style.height, 10) * 3}px`
            
            displayMessage(statusBar, `Voicechat: ${["Off", "On"][+canRecord]}`)
            
            clearTimeout(hideStatus)
            hideStatus = setTimeout(() => statusBar.style.width = "0px", 2000)
        }
    ],
    "Help": [
        "h", 
        "show/hide commands",
        () => {
            if (document.getElementById(helpMenu.id)) {
                helpMenu.remove()
            }
            else {
                document.body.appendChild(helpMenu)
            }

            let text = "== Voice Chat ==</br>"
            for (const item of Object.values(keyBindings))
                text += `</br>[${item[0]}] to ${item[1]}`

            displayMessage(helpMenu, text)
        }
    ]
}

window.sendMessage = message => {
    if (!canRecord) {
        return
    }

    const chat = document.querySelector(".chat-container")?.childNodes[2]

    if (chat) {
        chat.click()

        chat.value = message

        chat.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
        }))
    }
}

function init() {
    keyBindings["Help"][2]()
    Array(helpMenu, statusBar).forEach(i => document.body.appendChild(i))

    window.addEventListener("keyup", e => {
        keyBindings[Object.keys(keyBindings).filter(i => keyBindings[i][0] == e.key.toLowerCase())[0]]?.[2]()
    })
}

init()