// ======================================================
// LETTER.JS
// ======================================================


// ======================================================
// LẤY CÁC ELEMENT
// ======================================================

const titleInput =
    document.getElementById("title");

const receiverInput =
    document.getElementById("receiver");

const senderInput =
    document.getElementById("sender");

const contentInput =
    document.getElementById("content");

const imageInput =
    document.getElementById("imageInput");


const letterPreview =
    document.getElementById("letterPreview");

const previewTitle =
    document.getElementById("previewTitle");

const previewTo =
    document.getElementById("previewTo");

const previewImage =
    document.getElementById("previewImage");

const previewContent =
    document.getElementById("previewContent");

const previewSignature =
    document.getElementById("previewSignature");


// ======================================================
// DỮ LIỆU ẢNH
// ======================================================

let selectedImage = "";


// ======================================================
// CẬP NHẬT XEM TRƯỚC
// ======================================================

function updatePreview() {

    // ------------------------------------------
    // HIỆN KHUNG XEM TRƯỚC
    // ------------------------------------------

    if (letterPreview) {

        letterPreview.style.display = "block";

    }


    // ------------------------------------------
    // TIÊU ĐỀ
    // ------------------------------------------

    const title =
        titleInput
            ? titleInput.value.trim()
            : "";


    if (title !== "") {

        previewTitle.textContent =
            title;

    } else {

        previewTitle.textContent =
            "Một lá thư dành cho bạn";

    }


    // ------------------------------------------
    // NGƯỜI NHẬN
    // ------------------------------------------

    const receiver =
        receiverInput
            ? receiverInput.value.trim()
            : "";


    if (receiver !== "") {

        previewTo.innerHTML =
            "Gửi đến: <strong>" +
            escapeHtml(receiver) +
            "</strong>";

        previewTo.style.display =
            "block";

    } else {

        previewTo.innerHTML =
            "";

        previewTo.style.display =
            "none";

    }


    // ------------------------------------------
    // NỘI DUNG
    // ------------------------------------------

    const content =
        contentInput
            ? contentInput.value
            : "";


    if (content.trim() !== "") {

        // Giữ xuống dòng

        previewContent.innerHTML =
            escapeHtml(content)
                .replace(/\n/g, "<br>");

    } else {

        previewContent.innerHTML =
            "";

    }


    // ------------------------------------------
    // NGƯỜI GỬI
    // ------------------------------------------

    const sender =
        senderInput
            ? senderInput.value.trim()
            : "";


    if (sender !== "") {

        previewSignature.style.display =
            "block";

        previewSignature.innerHTML =
            escapeHtml(sender);

    } else {

        previewSignature.style.display =
            "none";

        previewSignature.innerHTML =
            "";

    }


    // ------------------------------------------
    // ẢNH
    // ------------------------------------------

    if (selectedImage !== "") {

        previewImage.src =
            selectedImage;

        previewImage.style.display =
            "block";

    } else {

        previewImage.src =
            "";

        previewImage.style.display =
            "none";

    }

}


// ======================================================
// LẮNG NGHE THAY ĐỔI
// ======================================================

if (titleInput) {

    titleInput.addEventListener(
        "input",
        updatePreview
    );

}


if (receiverInput) {

    receiverInput.addEventListener(
        "input",
        updatePreview
    );

}


if (senderInput) {

    senderInput.addEventListener(
        "input",
        updatePreview
    );

}


if (contentInput) {

    contentInput.addEventListener(
        "input",
        updatePreview
    );

}


// ======================================================
// CHỌN ẢNH
// ======================================================

if (imageInput) {

    imageInput.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];


            if (!file) {

                return;

            }


            // Kiểm tra có phải ảnh không

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Vui lòng chọn file ảnh!"
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (e) {

                    selectedImage =
                        e.target.result;

                    updatePreview();

                };


            reader.readAsDataURL(file);

        }
    );

}


// ======================================================
// XÓA ẢNH
// ======================================================

function removeImage() {

    selectedImage = "";


    if (imageInput) {

        imageInput.value = "";

    }


    if (previewImage) {

        previewImage.src = "";

        previewImage.style.display =
            "none";

    }

}


// ======================================================
// LƯU THƯ
// ======================================================

function saveLetter() {

    const title =
        titleInput
            ? titleInput.value.trim()
            : "";


    const receiver =
        receiverInput
            ? receiverInput.value.trim()
            : "";


    const sender =
        senderInput
            ? senderInput.value.trim()
            : "";


    const content =
        contentInput
            ? contentInput.value
            : "";


    // ------------------------------------------
    // KIỂM TRA
    // ------------------------------------------

    if (
        receiver === "" &&
        content.trim() === ""
    ) {

        alert(
            "Bạn hãy nhập người nhận hoặc nội dung thư ❤️"
        );

        return;

    }


    // ------------------------------------------
    // TẠO OBJECT
    // ------------------------------------------

    const letter = {

        title:
            title !== ""
                ? title
                : "Một lá thư dành cho bạn",

        receiver:
            receiver,

        sender:
            sender,

        content:
            content,

        image:
            selectedImage,

        createdAt:
            new Date().toISOString()

    };


    // ------------------------------------------
    // LẤY THƯ CŨ
    // ------------------------------------------

    let letters =
        JSON.parse(
            localStorage.getItem(
                "letters"
            )
        ) || [];


    // ------------------------------------------
    // THÊM THƯ MỚI
    // ------------------------------------------

    letters.push(letter);


    // ------------------------------------------
    // LƯU
    // ------------------------------------------

    localStorage.setItem(
        "letters",
        JSON.stringify(letters)
    );


    alert(
        "💌 Đã lưu bức thư!"
    );


    displaySavedLetters();

}


// ======================================================
// HIỂN THỊ THƯ ĐÃ LƯU
// ======================================================

function displaySavedLetters() {

    const savedLetters =
        document.getElementById(
            "savedLetters"
        );


    if (!savedLetters) {

        return;

    }


    const letters =
        JSON.parse(
            localStorage.getItem(
                "letters"
            )
        ) || [];


    savedLetters.innerHTML =
        "";


    if (letters.length === 0) {

        savedLetters.innerHTML = `
            <p class="no-letter">
                Chưa có bức thư nào được lưu 💌
            </p>
        `;

        return;

    }


    letters.forEach(
        function (letter, index) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "saved-letter-item";


            item.innerHTML = `

                <div class="saved-letter-info">

                    <h3>
                        ${escapeHtml(letter.title)}
                    </h3>

                    ${
                        letter.receiver
                            ? `
                                <p>
                                    💌 Gửi đến:
                                    <strong>
                                        ${escapeHtml(letter.receiver)}
                                    </strong>
                                </p>
                              `
                            : ""
                    }

                    ${
                        letter.sender
                            ? `
                                <p>
                                    ✍️
                                    ${escapeHtml(letter.sender)}
                                </p>
                              `
                            : ""
                    }

                </div>


                <div class="saved-letter-actions">

                    <button
                        onclick="viewSavedLetter(${index})"
                    >
                        👀 Xem
                    </button>

                    <button
                        onclick="deleteLetter(${index})"
                    >
                        🗑️ Xóa
                    </button>

                </div>

            `;


            savedLetters.appendChild(
                item
            );

        }
    );

}


// ======================================================
// XEM LẠI THƯ ĐÃ LƯU
// ======================================================

function viewSavedLetter(index) {

    const letters =
        JSON.parse(
            localStorage.getItem(
                "letters"
            )
        ) || [];


    const letter =
        letters[index];


    if (!letter) {

        return;

    }


    // ------------------------------------------
    // ĐIỀN LẠI FORM
    // ------------------------------------------

    if (titleInput) {

        titleInput.value =
            letter.title || "";

    }


    if (receiverInput) {

        receiverInput.value =
            letter.receiver || "";

    }


    if (senderInput) {

        senderInput.value =
            letter.sender || "";

    }


    if (contentInput) {

        contentInput.value =
            letter.content || "";

    }


    selectedImage =
        letter.image || "";


    // ------------------------------------------
    // CẬP NHẬT
    // ------------------------------------------

    updatePreview();


    // ------------------------------------------
    // CUỘN ĐẾN XEM TRƯỚC
    // ------------------------------------------

    if (letterPreview) {

        letterPreview.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


// ======================================================
// XÓA THƯ
// ======================================================

function deleteLetter(index) {

    const confirmDelete =
        confirm(
            "Bạn có chắc muốn xóa bức thư này không?"
        );


    if (!confirmDelete) {

        return;

    }


    let letters =
        JSON.parse(
            localStorage.getItem(
                "letters"
            )
        ) || [];


    letters.splice(
        index,
        1
    );


    localStorage.setItem(
        "letters",
        JSON.stringify(letters)
    );


    displaySavedLetters();


    alert(
        "🗑️ Đã xóa bức thư!"
    );

}


// ======================================================
// XÓA TẤT CẢ THƯ
// ======================================================

function deleteAllLetters() {

    const confirmDelete =
        confirm(
            "Bạn có chắc muốn xóa tất cả thư đã lưu không?"
        );


    if (!confirmDelete) {

        return;

    }


    localStorage.removeItem(
        "letters"
    );


    displaySavedLetters();


    alert(
        "🗑️ Đã xóa tất cả thư!"
    );

}


// ======================================================
// XÓA NỘI DUNG FORM
// ======================================================

function clearLetter() {

    if (titleInput) {

        titleInput.value = "";

    }


    if (receiverInput) {

        receiverInput.value = "";

    }


    if (senderInput) {

        senderInput.value = "";

    }


    if (contentInput) {

        contentInput.value = "";

    }


    removeImage();


    updatePreview();

}


// ======================================================
// QUAY LẠI TRANG CHÍNH
// ======================================================

function goHome() {

    window.location.href =
        "index.html";

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// ======================================================
// LOAD THƯ KHI MỞ TRANG
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displaySavedLetters();

        updatePreview();

    }
);