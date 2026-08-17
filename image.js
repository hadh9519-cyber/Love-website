// ======================================
// DỮ LIỆU
// ======================================

let photos =
    JSON.parse(
        localStorage.getItem("memories")
    ) || [];


// Ảnh đang được mở

let currentIndex = -1;


// ======================================
// CÁC ẢNH CÓ SẴN
// ======================================

const defaultPhotos = [

    {
        image: "images/4.jpg",
        text: "Together ❤️"
    }

];


// ======================================
// NẾU CHƯA CÓ DỮ LIỆU
// ======================================

if (
    photos.length === 0
) {

    photos =
        defaultPhotos;

    saveData();

}


// ======================================
// HIỂN THỊ ALBUM
// ======================================

function renderGallery() {

    const gallery =
        document.getElementById(
            "gallery"
        );


    gallery.innerHTML = "";


    if (
        photos.length === 0
    ) {

        gallery.innerHTML = `

            <div class="empty">

                <h2>
                    🖼 Chưa có ảnh
                </h2>

                <p>
                    Hãy thêm kỷ niệm đầu tiên ❤️
                </p>

            </div>

        `;

        return;

    }


    photos.forEach(
        (photo, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "photo-card";


            card.onclick = function() {

                openPhoto(index);

            };


            card.innerHTML = `

                <img
                    src="${photo.image}"
                    alt="Memory"
                >

                <div
                    class="photo-card-content"
                >

                    <h3>
                        ❤️ Kỷ niệm
                    </h3>

                    <p>
                        ${escapeHTML(
                            photo.text
                        )}
                    </p>

                </div>

            `;


            gallery.appendChild(card);

        }
    );

}


// ======================================
// MỞ CHI TIẾT ẢNH
// ======================================

function openPhoto(index) {

    currentIndex =
        index;


    const photo =
        photos[index];


    document.getElementById(
        "detailImage"
    ).src =
        photo.image;


    document.getElementById(
        "detailText"
    ).value =
        photo.text;


    document.getElementById(
        "albumPage"
    ).style.display =
        "none";


    document.getElementById(
        "detailPage"
    ).style.display =
        "block";


    window.scrollTo(
        0,
        0
    );

}


// ======================================
// QUAY LẠI ALBUM
// ======================================

function backToAlbum() {

    document.getElementById(
        "detailPage"
    ).style.display =
        "none";


    document.getElementById(
        "albumPage"
    ).style.display =
        "block";


    renderGallery();


    window.scrollTo(
        0,
        0
    );

}


// ======================================
// LƯU CHỈNH SỬA
// ======================================

function saveDetail() {

    if (
        currentIndex === -1
    ) {

        return;

    }


    const text =
        document.getElementById(
            "detailText"
        ).value;


    photos[
        currentIndex
    ].text =
        text;


    saveData();


    alert(
        "Đã lưu kỷ niệm ❤️"
    );

}


// ======================================
// THAY ẢNH
// ======================================

function changeImage() {

    const input =
        document.getElementById(
            "changePhotoInput"
        );


    input.click();


    input.onchange =
        function() {

            if (
                !input.files.length
            ) {

                return;

            }


            const file =
                input.files[0];


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    photos[
                        currentIndex
                    ].image =
                        event.target.result;


                    saveData();


                    document.getElementById(
                        "detailImage"
                    ).src =
                        event.target.result;


                    alert(
                        "Đã thay ảnh ❤️"
                    );

                };


            reader.readAsDataURL(
                file
            );

        };

}


// ======================================
// THÊM ẢNH MỚI
// ======================================

document.getElementById(
    "newPhoto"
).addEventListener(
    "change",
    function() {

        const file =
            this.files[0];


        if (!file) {

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                const newPhoto = {

                    image:
                        event.target.result,

                    text:
                        "Một kỷ niệm mới ❤️"

                };


                photos.push(
                    newPhoto
                );


                saveData();


                renderGallery();


                alert(
                    "Đã thêm ảnh ❤️"
                );

            };


        reader.readAsDataURL(
            file
        );

    }
);


// ======================================
// XÓA ẢNH
// ======================================

function deleteCurrentPhoto() {

    if (
        currentIndex === -1
    ) {

        return;

    }


    const result =
        confirm(
            "Bạn có chắc muốn xóa ảnh này?"
        );


    if (!result) {

        return;

    }


    photos.splice(
        currentIndex,
        1
    );


    saveData();


    currentIndex =
        -1;


    backToAlbum();

}


// ======================================
// LƯU LOCAL STORAGE
// ======================================

function saveData() {

    localStorage.setItem(
        "memories",
        JSON.stringify(photos)
    );

}


// ======================================
// QUAY VỀ TRANG CHÍNH
// ======================================

function goHome() {

    window.location.href =
        "home.html";

}


// ======================================
// CHỐNG HTML
// ======================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// ======================================
// CHẠY
// ======================================

renderGallery();