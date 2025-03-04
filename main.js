const form = document.querySelector('.form')

const uploadInput = document.getElementById("upload_avatar")
const uploadField = document.querySelector(".upload_field")
const interactBtns = document.querySelector('.interact-btns')
const uploadPromt = document.querySelector('.upload_promt')
const uploadBox = document.querySelector('.upload-input')

const testValue = (str, index) => index === 2? /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(str) : /^@[A-Za-z0-9._%=-]+$/.test(str)
const sendMessage = (elem, message, status) => {
    status == 'error' ? elem.classList.add('promt_error') : elem.classList.remove('promt_error')
    elem.textContent = message
}

const checkInputs = (inputs) =>{
    const messages = ['email address', 'github user']
    let isCorrect = true;
    let i = 2
    while (i < 4) {
        if(testValue(inputs[i].value, i) === false){
            isCorrect = false
            if(!inputs[i].nextElementSibling.classList.contains('promt_error')){
                const promt = document.createElement('p')
                sendMessage(promt, `Please enter a valid ${messages[i - 2]}`, 'error')
                inputs[i].classList.add('input_error')
                inputs[i].insertAdjacentElement('afterend', promt)
            }
        }else if(testValue(inputs[i].value, i) && inputs[i].nextElementSibling && inputs[i].nextElementSibling.tagName === "P"){
            inputs[i].classList.remove('input_error')
            inputs[i].nextElementSibling.remove()
        }
        i++
    }
    return isCorrect
}

const setImage = (img, file) => {
    img.src = URL.createObjectURL(file);
    img.onload = () => URL.revokeObjectURL(img.src);
}

const fillContent = (data) => {
    document.querySelector('.conf_title').innerHTML = `Congrats, <span class="user-name">${data.name}</span>! Your ticket is ready.`;
    document.querySelector('.conf_descr').innerHTML = `We've emailed your ticket to, <span style="color:hsl(7, 88%, 67%);">${data.email}</span> and will send updates in the run up to the event.`;
    document.querySelector('.holder_name').textContent = data.name;
    document.querySelector('.holder_github').textContent = data.github;
    document.querySelector('.ticket_num').textContent = `#${Math.floor(Math.random() * 100000).toString().padStart(5, "0")}`;
}

const onFieldChange = (file) =>{
    const promt = document.querySelector('.promt')
    const holderAvatar = document.querySelector('.holder_avatar')
    const img = document.querySelector('.upload_icon')
    const maxSize = 500 * 1024
    if(file && file.size > maxSize){
        promt.classList.remove('promt')
        sendMessage(promt,'File too large. Please upload a photo under 500KB.', 'error')
        uploadInput.value = ''
    }else if(file){
        sendMessage(promt,'Upload your photo (JPG or PNG, max size: 500KB).', 'normal')
        uploadPromt.classList.add('hidden')
        interactBtns.classList.remove('hidden')
        uploadField.classList.add('event_none')
        promt.classList.add('promt')
        img.classList.add('avatar-img')
        setImage(holderAvatar, file)
        setImage(img, file)
    }
}
document.getElementById('remove_img').addEventListener('click', (event) => {
    uploadPromt.classList.remove('hidden')
    interactBtns.classList.add('hidden')
    img.classList.remove('avatar-img')
    uploadField.classList.remove('event_none')
    img.src = './assets/images/icon-upload.svg';
    uploadInput.value = '';
})
uploadField.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
})
uploadField.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
});
uploadField.addEventListener('drop', (event) =>{
    event.preventDefault();
    if(event.dataTransfer.files.length){
        const file = event.dataTransfer.files[0];
        onFieldChange(file)
    }
})
uploadInput.addEventListener('change', (event) => {    
    const file = event.target.files[0]
    onFieldChange(file)
})

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const inputs = document.querySelectorAll('input')
    
    if(checkInputs(inputs)){
        document.getElementById('ticket').classList.add('ticket')
        form.classList.add('hidden')
        const data = {
            name: inputs[1].value,
            email: inputs[2].value,
            github: inputs[3].value
        }
        fillContent(data)
        
    }else{
        return
    }
    
})