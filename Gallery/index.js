let slideIndex = 1
showSlides(slideIndex)

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currThumbnail(n) {
    showSlides(slideIndex = n)
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides")
    let thumbnails = document.getElementsByClassName("images")
    let dots = document.getElementsByClassName("dot")
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
        thumbnails[i].className = thumbnails[i].className.replace(" active", "")
    }
    slides[slideIndex - 1].style.display = "block"
    thumbnails[slideIndex - 1].className += " active"
}