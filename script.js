document.addEventListener('DOMContentLoaded', () => {
    
    // --- КОРЗИНА ЛОГИКА ---
    let cart = [];
    const sidebar = document.getElementById('cart-sidebar');
    const openBtn = document.getElementById('cart-open-btn');
    const closeBtn = document.getElementById('cart-close-btn');

    function toggleCart() {
        sidebar.classList.toggle('active');
    }

    if(openBtn) openBtn.onclick = toggleCart;
    if(closeBtn) closeBtn.onclick = toggleCart;

    // Добавление товара
    window.addItem = function(name, price) {
        cart.push({ name, price });
        updateCartUI();
        if (navigator.vibrate) navigator.vibrate(50);
    };

    function updateCartUI() {
        const countLabel = document.getElementById('cart-count');
        const listContainer = document.getElementById('cart-items-list');
        const totalPriceLabel = document.getElementById('total-price');

        countLabel.innerText = cart.length;
        listContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            total += item.price;
            const row = document.createElement('div');
            row.style.cssText = "display:flex; justify-content:space-between; padding:15px; background:#F8F6FF; border-radius:12px; margin-bottom:10px; font-weight:600;";
            
            // УБРАЛИ РУБЛЬ ТУТ: Используем toLocaleString() для пробелов в числах
            row.innerHTML = `<span>${item.name}</span> <span>${item.price.toLocaleString()}</span>`;
            listContainer.appendChild(row);
        });

        // УБРАЛИ РУБЛЬ ТУТ: Общая сумма без значка
        totalPriceLabel.innerText = total.toLocaleString();
    }

    // --- НАВИГАЦИЯ ПО КАТЕГОРИЯМ ---
    const catButtons = document.querySelectorAll('.cat-item');
    catButtons.forEach(btn => {
        btn.onclick = (event) => {
            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            
            if(targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }

            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });

    // --- ОПЛАТА ---
    window.openPayment = function() {
        if(cart.length === 0) return alert("Корзина пуста");
        sidebar.classList.remove('active');
        document.getElementById('pay-modal').classList.add('active');
    };

    window.closePay = function() {
        document.getElementById('pay-modal').classList.remove('active');
    };

    window.finishOrder = function(method) {
        alert("Заказ оформлен через " + method);
        cart = [];
        updateCartUI();
        closePay();
    };

    // --- СЛАЙДЕР ---
    let sIdx = 0;
    const slides = document.querySelectorAll('.slide');
    function nextSlide() {
        if(slides.length === 0) return;
        slides.forEach(s => s.classList.remove('active'));
        sIdx = (sIdx + 1) % slides.length;
        slides[sIdx].classList.add('active');
    }
    setInterval(nextSlide, 4000);

    // --- ЛОКАЦИИ ---
    window.showLoc = function() {
        alert("Мы ждем тебя здесь:\n1. Ул. Биткоина, 21\n2. ТЦ 'Крипто', 1 этаж");
    };
});