let local = {
    get messeges() {
        return JSON.parse(localStorage.getItem("messeges")) || []
    },
    set messeges(val) {
        localStorage.setItem("messeges", JSON.stringify(val))
    },
    addMessege: function (mes) {
        const temp = JSON.parse(localStorage.getItem("messeges")) || []
        if (mes) temp.push(mes)
        localStorage.setItem("messeges", JSON.stringify(temp))
    }
}

function Messege(text, sinceEpoch, user) {
    this.text = text
    this.sinceEpoch = sinceEpoch
    this.user = user
}
const messegeContainer = document.getElementsByClassName("messeges-container")[0]

///////////////////templates
const messegeTemplate = document.getElementsByClassName("for-clone")[0]

///////////////////radios
const radio1 = document.getElementById("radio1")
const radio2 = document.getElementById("radio2")
let user = radio1.checked; //true - me, false - friend
radio1.onchange = radioHandler
radio2.onchange = radioHandler
function radioHandler(event) { user = radio1.checked }



//////////////messege form
const messegeForm = document.forms.messegeForm
Array.from(document.forms).forEach((elem) => elem.onsubmit = (e) => e.preventDefault())
messegeForm.messege.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.value) {
        const newMessege = new Messege(e.target.value, Date.now(), user)
        local.addMessege(newMessege)
        const newMessegeDiv = messegeTemplate.cloneNode(true)
        newMessegeDiv.classList.remove("hide")
        newMessegeDiv.classList.remove("for-clone")
        newMessegeDiv.classList.add(user ? "messege-me" : "messege-friend")
        const hours = (new Date()).getHours() > 9 ? (new Date()).getHours() : "0" + (new Date()).getHours();
        const minutes = (new Date()).getMinutes() > 9 ? (new Date()).getMinutes() : "0" + (new Date()).getMinutes();
        newMessegeDiv.children[0].innerHTML = e.target.value + " <span>" + hours + ":" + minutes + "</span>"
        messegeContainer.append(newMessegeDiv)
        e.target.value = ""
    }
})





function renderMesseges() {
    local.messeges.forEach(item => {
        const currentDate = new Date(item.sinceEpoch)
        const newMessegeDiv = messegeTemplate.cloneNode(true)
        newMessegeDiv.classList.remove("hide")
        newMessegeDiv.classList.remove("for-clone")
        newMessegeDiv.classList.add(item.user ? "messege-me" : "messege-friend")
        const hours = currentDate.getHours() > 9 ? currentDate.getHours() : "0" + currentDate.getHours();
        const minutes = currentDate.getMinutes() > 9 ? currentDate.getMinutes() : "0" + currentDate.getMinutes();
        newMessegeDiv.children[0].innerHTML = item.text + " <span>" + hours + ":" + minutes + "</span>"
        messegeContainer.append(newMessegeDiv);
    })
}


renderMesseges()