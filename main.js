const uploadInput = document.getElementById("upload_avatar")
const uploadField = document.querySelector(".upload_field")
const interactBtns = document.querySelector('.interact-btns')
const uploadPromt = document.querySelector('.upload_promt')

const img = document.querySelector('.upload_icon')

const sendMessage = (elem, message, status) => {
    status == 'error' ? elem.classList.add('promt_error') : elem.classList.remove('promt_error')
    elem.textContent = message
}

document.getElementById('remove_img').addEventListener('click', (event) => {
    uploadPromt.classList.remove('hidden')
    interactBtns.classList.add('hidden')
    img.classList.remove('avatar-img')
    uploadField.classList.remove('event_none')
    img.src = './assets/images/icon-upload.svg';
    uploadInput.value = '';
})

uploadInput.addEventListener('change', (event) => {
    const promt = document.querySelector('.promt')
    const file = event.target.files[0]
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
        img.src = URL.createObjectURL(file);
        img.onload = () => URL.revokeObjectURL(img.src);
    }
})