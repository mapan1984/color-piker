var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var img = new Image();
img.crossOrigin = 'anonymous';

// 默认图片
img.src = 'assets/kabi.png';

// 上传文件
const imageInput = document.querySelector('#imageInput')
imageInput.addEventListener('change', e => {
    img.src = URL.createObjectURL(e.target.files[0])
});


img.onload = function() {
    console.log(`img width: ${img.width}, height: ${img.height}`)
    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
};

var hoveredColor = document.getElementById('hovered-color');
var selectedColor = document.getElementById('selected-color');

function pick(event, destination) {
    // var x = event.clientX;
    // var y = event.clientY;
    // console.log(`${x}, ${y}`)

    // var x = event.layerX;
    // var y = event.layerY;
    // console.log(`${x}, ${y}`)

    var x = event.offsetX;
    var y = event.offsetY;
    // console.log(`${x}, ${y}`)

    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.background = rgba;
    destination.textContent = rgba;

    return rgba;
}

canvas.addEventListener('mousemove', function(event) {
    pick(event, hoveredColor);
});

canvas.addEventListener('click', function(event) {
    pick(event, selectedColor);
});
