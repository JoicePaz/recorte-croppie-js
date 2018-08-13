const croppieInit = function () {
    var element = document.getElementById('my-image')
    const c = new Croppie(element, {
        viewport: { width: 200, height: 200 },
        boundary: { width: 300, height: 300 },
        enableOrientation: true,
        enableResize: true,
    });

    document.getElementById('save').addEventListener('click', function () {
        c.result('blob').then(function (blob) {
            const urlCreator = window.URL || window.webkitURL;
            const imageURL = urlCreator.createObjectURL(blob);

            const img = document.createElement('img');
            img.src = imageURL;
            
            const a = document.createElement('a');

            a.href = img.src;
            a.download = 'file';
            a.id = 'link';

            document.getElementById('img').appendChild(a);
            document.getElementById('link').appendChild(img);
        });

    });

    document.getElementById('rotateL').addEventListener('click', function () {
        c.rotate(parseInt(-90));
    });

    document.getElementById('rotateR').addEventListener('click', function () {
        c.rotate(parseInt(90));
    });     
   
}

const getReadFile = function (reader, element) {
    return function () {
        const img = document.createElement('img');
        img.src = reader.result;
        img.setAttribute('id', 'my-image');
        element.appendChild(img);
        img.addEventListener('load', function () {
            croppieInit();
        });
    }
}

const fileReader = function (e) {
    document.getElementById('btn').style.visibility = "visible" ;

    const files = e.target.files;
    const element = document.getElementById('image');

    const reader = new FileReader();
    reader.addEventListener('load', getReadFile(reader, element));
    reader.readAsDataURL(files[0]);
}

const init = function () {
    document.getElementById('arquivo').addEventListener('change', fileReader);
}

init();