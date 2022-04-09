const data = JSON.parse(localStorage.getItem('fake')) || []

const box = document.querySelector('.box')
const messageInput = document.getElementById('message')
const roleInput = document.getElementById('role')
const timeInput = document.getElementById('time')
const form = document.getElementById('submit')
const modal = document.querySelector('.modal')
const menu = document.querySelector('.menu')
const menuBtn = document.getElementById('menu')
const makeBtn = document.getElementById('make')
const resetBtn = document.getElementById('reset')

menuBtn.addEventListener('click', function() {
    menu.style.display = 'block'
    menu.addEventListener('click', function() {
        menu.style.display = 'none'
    })
})

makeBtn.addEventListener('click', function() {
    menu.style.display = 'none'
    modal.style.display = 'block'
    document.getElementById('cancel').addEventListener('click', function() {
        modal.style.display = 'none'
    })
})

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let role = roleInput.value
    let time = timeInput.value
    let message = messageInput.value
    let status = ''

    if(role == 'aku') {
        status = 'asset/chek.svg'
    }

    formdata = {
        'role': role,
        'message': message,
        'time': time,
        'status': status
    }

    data.push(formdata)
    form.reset()
    localStorage.setItem('fake', JSON.stringify(data))
    modal.style.display = 'none'
    renderData()
})

resetBtn.addEventListener('click', function() {
    if(confirm('Anda Yakin ?')) {
        localStorage.removeItem('fake')
        window.location.reload()
    }

    menu.style.display = 'none'
})

function renderData() {
    let template = ''
    data.map(d => {
        d.role == 'aku' ? template += `
            <div class="chat_container me">
                <div class="chat">
                    <p>${d.message}</p>
                    <p>${d.time}</p>
                    <img src="${d.status}">
                </div>
            </div> 
        ` : template += `
        <div class="chat_container">
            <div class="chat">
                <p>${d.message}</p>
                <p>${d.time}</p>
                <img src="" >
            </div>
        </div> `
        box.innerHTML = template
    })
}

renderData()