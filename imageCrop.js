const croppieInit = function () {
    const c = new Croppie(document.getElementById('my-image'), {
        viewport: { width: 100, height: 100 }, //viewport: { width: 100, height: 100, type: 'circle' }, deixa redondo
        boundary: { width: 300, height: 300},

        enableResize: true,
    });

    document.getElementById('save').addEventListener('click', function () {
        c.result('blob').then(function (blob) {
            const urlCreator = window.URL || window.webkitURL;
            const imageURL = urlCreator.createObjectURL(blob);

            const img = document.createElement('img');
            img.src = imageURL;
            document.getElementsByTagName('body')[0].appendChild(img);

        });
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
    const files = e.target.files;
    const element = document.getElementById('image');

    const reader = new FileReader();
    reader.addEventListener('load', getReadFile(reader, element));
    reader.readAsDataURL(files[0]);
}

const init = function () {
    document.getElementById('file').addEventListener('change', fileReader);
}

init();