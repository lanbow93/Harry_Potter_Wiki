// Made to track down the modal cancel button via jQuery
const $closeModalButton = $(".closeModal");
const $confirmPopup = $(".confirmPopup")
const $confirmModal = $(".modalViewer");

$closeModalButton.on("click", () => {$confirmModal.css("display", "none")})
// Naturally set to inline-block
$confirmPopup.on("click", () => {$confirmModal.css("display", "unset")})






