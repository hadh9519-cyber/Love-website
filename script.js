let pin = "";

// Mật khẩu hiện tại
const correctPin = "1234";


// =========================
// NHẬP SỐ
// =========================

function pressNumber(number) {

    // Không cho nhập quá 4 số
    if (pin.length >= 4) {
        return;
    }

    pin += number;

    updateDots();

    // Đủ 4 số
    if (pin.length === 4) {

        setTimeout(checkPin, 200);

    }

}


// =========================
// XÓA SỐ
// =========================

function deleteNumber() {

    if (pin.length === 0) {
        return;
    }

    pin = pin.slice(0, -1);

    updateDots();

}


// =========================
// CẬP NHẬT DẤU CHẤM
// =========================

function updateDots() {

    const dots =
        document.querySelectorAll(".pin-dots span");

    dots.forEach((dot, index) => {

        if (index < pin.length) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

    });

}


// =========================
// KIỂM TRA MẬT KHẨU
// =========================

function checkPin() {

    const card =
        document.querySelector(".login-card");

    if (pin === correctPin) {

    // Đúng mật khẩu
    card.style.transform = "scale(1.05)";
    card.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "home.html";

    }, 500);


    } else {

        // Sai mật khẩu

        card.classList.add("shake");

        setTimeout(() => {

            card.classList.remove("shake");

        }, 400);

        pin = "";

        updateDots();

    }

}


// =========================
// TẠO TIM BAY
// =========================

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.innerHTML = "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (10 + Math.random() * 15) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    document
        .querySelector(".hearts")
        .appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}


// Tạo tim liên tục
setInterval(createHeart, 700);