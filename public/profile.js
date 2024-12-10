document.addEventListener('DOMContentLoaded', ()=>{
    const token = localStorage.getItem('jwt');
    if (!token){
        windows.location.href = '/login.html';
    }

    fetch('')
})