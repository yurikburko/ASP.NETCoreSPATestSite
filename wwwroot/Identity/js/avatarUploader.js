function handleFileInputChange() {
    document.getElementById('avatarImg').src = window.URL.createObjectURL(this.files[0]);
    document.getElementById('isAvatarRemoved').value = false;
    document.getElementsByClassName('avatar-uploader-wrapper')[0].classList.remove("empty");
}
document.getElementById("avatarInput").addEventListener("change", handleFileInputChange);

function handleDeleteAvatarClick() {
    document.getElementById('avatarInput').value = "";
    document.getElementById('avatarImg').src = "";
    document.getElementById('isAvatarRemoved').value = true;
    document.getElementsByClassName('avatar-uploader-wrapper')[0].classList.add("empty");
}
document.getElementById("deleteAvatar").addEventListener("click", handleDeleteAvatarClick);