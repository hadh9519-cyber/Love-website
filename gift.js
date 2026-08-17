// ==================================================
// QUAY LẠI TRANG CHÍNH
// ==================================================

function goHome() {

    window.location.href = "index.html";

}


// ==================================================
// CHỌN ẢNH CÓ SẴN
// ==================================================

function selectPhoto(imageSrc) {

    createBalloon(imageSrc);

}


// ==================================================
// TẠO ẢNH BAY
// ==================================================

function createBalloon(imageSrc) {

    const area =
        document.getElementById("balloonArea");


    // ==============================
    // ẢNH
    // ==============================

    const img =
        document.createElement("img");


    img.src =
        imageSrc;

    img.className =
        "photo-balloon";


    // ==============================
    // VỊ TRÍ NGẪU NHIÊN
    // ==============================

    img.style.left =
        (5 + Math.random() * 85) + "%";


    // ==============================
    // KÍCH THƯỚC NGẪU NHIÊN
    // ==============================

    const size =
        90 + Math.random() * 70;


    img.style.width =
        size + "px";


    img.style.height =
        (size * 1.25) + "px";


    // ==============================
    // TỐC ĐỘ NGẪU NHIÊN
    // ==============================

    const duration =
        8 + Math.random() * 5;


    img.style.animationDuration =
        duration + "s";


    // ==============================
    // DELAY NHỎ
    // ==============================

    img.style.animationDelay =
        "0s";


    // ==============================
    // CLICK ẢNH
    // ==============================

    img.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();


            // PHÁO HOA

            fireworks(
                event.clientX,
                event.clientY
            );


            // HIỆN ẢNH LỚN

            showImage(imageSrc);

        }
    );


    // ==============================
    // THÊM VÀO MÀN HÌNH
    // ==============================

    area.appendChild(img);


    // ==============================
    // XÓA KHI BAY KHỎI MÀN HÌNH
    // ==============================

    setTimeout(
        () => {

            img.remove();

        },
        (duration + 2) * 1000
    );

}


// ==================================================
// HIỆN ẢNH LỚN
// ==================================================

function showImage(src) {

    const modal =
        document.getElementById(
            "imageModal"
        );


    const image =
        document.getElementById(
            "modalImage"
        );


    image.src =
        src;


    modal.classList.add(
        "show"
    );

}


// ==================================================
// ĐÓNG ẢNH
// ==================================================

function closeImage() {

    const modal =
        document.getElementById(
            "imageModal"
        );


    modal.classList.remove(
        "show"
    );


    document.getElementById(
        "modalImage"
    ).src = "";

}


// ==================================================
// CLICK RA NGOÀI ẢNH
// ==================================================

document
    .getElementById("imageModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeImage();

            }

        }
    );


// ==================================================
// CHỌN ẢNH TỪ MÁY
// ==================================================

document
    .getElementById("imageInput")
    .addEventListener(
        "change",
        function(event) {


            const files =
                event.target.files;


            if (!files.length) {

                return;

            }


            // ==========================
            // ĐỌC TỪNG ẢNH
            // ==========================

            Array.from(files)
                .forEach(
                    file => {


                        const reader =
                            new FileReader();


                        reader.onload =
                            function(e) {


                                // Ảnh được chọn
                                // sẽ bay lên

                                createBalloon(
                                    e.target.result
                                );

                            };


                        reader.readAsDataURL(
                            file
                        );

                    }
                );


            // Cho phép chọn lại
            // cùng một file

            event.target.value = "";

        }
    );


// ==================================================
// PHÁO HOA
// ==================================================

function fireworks(x, y) {


    // Số tia

    const particles =
        45;


    for (
        let i = 0;
        i < particles;
        i++
    ) {


        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "firework-particle";


        // ==========================
        // VỊ TRÍ BAN ĐẦU
        // ==========================

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";


        // ==========================
        // GÓC
        // ==========================

        const angle =
            Math.random()
            * Math.PI
            * 2;


        // ==========================
        // KHOẢNG CÁCH
        // ==========================

        const distance =
            60 +
            Math.random() * 140;


        const moveX =
            Math.cos(angle)
            * distance;


        const moveY =
            Math.sin(angle)
            * distance;


        // ==========================
        // CSS VARIABLE
        // ==========================

        particle.style.setProperty(
            "--x",
            moveX + "px"
        );


        particle.style.setProperty(
            "--y",
            moveY + "px"
        );


        // ==========================
        // KÍCH THƯỚC
        // ==========================

        const size =
            4 +
            Math.random() * 5;


        particle.style.width =
            size + "px";


        particle.style.height =
            size + "px";


        // ==========================
        // THÊM
        // ==========================

        document.body.appendChild(
            particle
        );


        // ==========================
        // XÓA
        // ==========================

        setTimeout(
            () => {

                particle.remove();

            },
            1000
        );

    }

}


// ==================================================
// TIM BAY
// ==================================================

function createHeart() {


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "floating-heart";


    heart.innerHTML =
        "♥";


    // Vị trí

    heart.style.left =
        Math.random() * 100 + "%";


    // Kích thước

    heart.style.fontSize =
        (
            10 +
            Math.random() * 18
        ) + "px";


    // Tốc độ

    heart.style.animationDuration =
        (
            5 +
            Math.random() * 5
        ) + "s";


    document
        .querySelector(".hearts")
        .appendChild(
            heart
        );


    setTimeout(
        () => {

            heart.remove();

        },
        10000
    );

}


// Tạo tim

setInterval(
    createHeart,
    700
);