const featured = document.getElementById('featured')
const thumbnails = document.getElementsByClassName('thumbnail')

const pervious = document.querySelector('.previous')
const next = document.querySelector('.next')

const favorite = document.querySelector('.link')

featured.addEventListener('click', function(){
    alert('啊啊啊臭嘟嘟来了大家快跑啊！！！')
})

function removeActive(){
    const activeImg = document.getElementsByClassName('active')
    if(activeImg.length > 0){
        activeImg[0].classList.remove('active')
    }
}
 function switchImg(){
    for(let i = 0; i < thumbnails.length; i++){
        thumbnails[i].addEventListener('mouseover', function(){
            removeActive()
            this.classList.add('active')
            document.getElementById('featured').src = this.src
        })
    }
 }

 switchImg()


next.addEventListener('click', function(){
    document.querySelector('.slider').scrollLeft += 100
})

pervious.addEventListener('click', function(){
    document.querySelector('.slider').scrollLeft -= 100
})

/*------------form-------------*/

const userName = document.querySelector('#userName')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirm')

const form = document.querySelector('#form')

const isRequired = value => value === '' ? false:true

const lengthRequirement = (length, min, max) =>{
    if(length < min || length > max){
        return false
    } else{
        return true
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault()

    let isUsernameValid = checkName()
    let isEmailValid = checkEmail()
    let isPasswordValid = checkPassword()
    let isConfirmValid = checkConfirmPassword()

    let isFormValid = isUsernameValid &&
    isEmailValid && isPasswordValid && isConfirmValid

    if(isFormValid){
        console.log('yay!')
    }
    
})

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (input, message) =>{
    const formField = input.parentElement;
    formField.classList.remove('valid');
    formField.classList.add('error');

    const error = formField.querySelector('.error')
    error.textContent = message
}

const showValid = (input) =>{
    const formField = input.parentElement;
    formField.classList.remove('error')
    formField.classList.add('valid')

    const error = formField.querySelector('.error')
    error.textContent = ''
}

const checkName = () =>{
    let valid = false;
    const min = 3
    const max = 20
    const username = userName.value.trim()

    if(!isRequired(username)){
        showError(userName, 'Please fill out username')
    } else if(!lengthRequirement(username.length, min, max)){
        showError(userName, `Username must be between ${min} and ${max} letters`)
    } else{
        showValid(userName)
        valid = true
    }
    return valid
}

const checkEmail = () =>{
    let valid = false
    const emailValue = email.value.trim()
    
    if(!isRequired(emailValue)){
        showError(email, 'Email must be filled')
    }else if(!isEmailValid(emailValue)){
        showError(email, 'Plese enter correct email format')
    }else{
        showValid(email)
        valid = true
    }
    return valid
}

const checkPassword = () =>{
    let valid = false
    let min = 8
    let max = 16
    const passwordValue = password.value.trim()

    if(!isRequired(passwordValue)){
        showError(password, 'Please enter a password')
    }else if(!isPasswordSecure(passwordValue)){
        showError(password, 'Password must consist of 1 uppercase letter, 1 number, and 1 special character')
    }else if(!lengthRequirement(passwordValue, min, max)){
        showError(password, 'Password must be between 8 and 16 chracters')
    }else{
        showValid(password)
        valid = true
    }
    return valid
}

const checkConfirmPassword = () =>{
    let valid = false
    const confirmValue = confirmPassword.value.trim()
    const passwordValue = password.value.trim()
    if(!isRequired(confirmValue)){
        showError(confirmPassword, 'Please reenter password')
    }else if(confirmValue !== passwordValue){
        showError(confirmPassword, 'Passwords do not match')
    }else{
        showValid(confirmPassword)
        valid = true
    }
    return valid
}

form.addEventListener('input', function(e){
    switch(e.target.id){
        case 'userName':
            checkName()
            break
        case 'email':
            checkEmail()
            break
        case 'password':
            checkPassword()
            break
        case 'confirm':
            checkConfirmPassword()
        break
    }
})
