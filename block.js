const images = ['dog.jpeg','koala.jpg', 'panda.jpg', 'panda2.jpg', 'sloth.jpg', 'sloth2.jpeg', 'sloth3.jpg'];

window.onload =  function () {
    let randNum = Math.floor(Math.random() * images.length);
    document.getElementById('randPic').src = "images/" + images[randNum];
}