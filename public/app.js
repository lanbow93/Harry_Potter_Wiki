// Made to track down the modal cancel button via jQuery
const $closeModalButton = $(".closeModal");
const $confirmPopup = $(".confirmPopup")
const $confirmModal = $(".modalViewer");

$closeModalButton.on("click", () => {$confirmModal.css("display", "none")})
$confirmPopup.on("click", () => {$confirmModal.css("display", "unset")})






