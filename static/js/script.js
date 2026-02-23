// MechAuth System - Интерактивные функции
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 MechAuth System initialized');
    
    initPasswordToggles();
    initFormAnimations();
    initMechanicalAnimations();
    initFormValidation();
    
    // Показываем что система готова
    console.log('✅ Все системы MechAuth готовы к работе');
});

// 1. Функция для переключения видимости пароля
function initPasswordToggles() {
    console.log('👁️ Инициализация переключателей пароля...');
    
    // Находим все переключатели пароля
    const passwordToggles = document.querySelectorAll('.password-toggle');
    console.log(`Найдено переключателей: ${passwordToggles.length}`);
    
    if (passwordToggles.length === 0) {
        console.error('❌ Не найдены элементы .password-toggle');
        console.log('Проверьте HTML структуру:');
        console.log('Должен быть: <span class="password-toggle"><i class="fas fa-eye"></i></span>');
        
        // Попробуем найти другими способами
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        console.log(`Найдено полей пароля: ${passwordInputs.length}`);
        
        // Создаем переключатели динамически если их нет
        passwordInputs.forEach(input => {
            if (!input.parentElement.querySelector('.password-toggle')) {
                console.log('Создаем переключатель для поля:', input.id);
                createPasswordToggle(input);
            }
        });
    } else {
        // Обработка существующих переключателей
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                console.log('👁️ Клик по переключателю пароля');
                togglePasswordVisibility(this);
            });
            
            // Добавляем подсказку при наведении
            toggle.title = 'Показать/скрыть пароль';
            
            console.log('✅ Переключатель инициализирован:', toggle.id || 'без id');
        });
    }
}

// 2. Создание переключателя если его нет
function createPasswordToggle(inputElement) {
    const toggle = document.createElement('span');
    toggle.className = 'password-toggle';
    toggle.innerHTML = '<i class="fas fa-eye"></i>';
    toggle.title = 'Показать/скрыть пароль';
    toggle.style.cursor = 'pointer';
    
    // Добавляем после поля ввода
    inputElement.parentElement.appendChild(toggle);
    
    // Назначаем обработчик
    toggle.addEventListener('click', function() {
        togglePasswordVisibility(this);
    });
    
    console.log('✅ Создан переключатель для поля:', inputElement.id);
}

// 3. Функция переключения видимости пароля
function togglePasswordVisibility(toggleElement) {
    const input = toggleElement.parentElement.querySelector('input');
    const icon = toggleElement.querySelector('i');
    
    if (!input) {
        console.error('❌ Не найден input для переключателя');
        return;
    }
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        console.log('👁️‍🗨️ Пароль показан');
        
        // Анимация для механизма
        toggleElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            toggleElement.style.transform = 'scale(1)';
        }, 200);
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        console.log('👁️ Пароль скрыт');
    }
}

// 4. Анимации для форм
function initFormAnimations() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Подсветка при фокусе
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    });
    
    // Анимация кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.97)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 5. Анимации механических элементов
function initMechanicalAnimations() {
    const gears = document.querySelectorAll('.gear');
    
    // Взаимодействие с шестерёнками
    gears.forEach(gear => {
        gear.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.3)';
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        gear.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
            this.style.transform = 'scale(1)';
        });
        
        gear.addEventListener('click', function() {
            this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
        });
    });
    
    // Ускорение механизмов при отправке формы
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Не прерываем отправку, просто добавляем анимацию
            gears.forEach(gear => {
                const currentSpeed = getComputedStyle(gear).animationDuration;
                const newSpeed = parseFloat(currentSpeed) * 0.3 + 's';
                gear.style.animationDuration = newSpeed;
                
                setTimeout(() => {
                    gear.style.animationDuration = currentSpeed;
                }, 1000);
            });
        });
    });
}

// 6. Валидация форм
function initFormValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailPattern.test(email)) {
                showInlineError(this, 'Введите корректный email адрес');
            } else if (email && emailPattern.test(email)) {
                clearInlineError(this);
            }
        });
        
        input.addEventListener('input', function() {
            clearInlineError(this);
        });
    });
}

// 7. Вспомогательные функции
function showInlineError(inputElement, message) {
    // Находим или создаем контейнер для ошибки
    let errorElement = inputElement.parentElement.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        inputElement.parentElement.appendChild(errorElement);
    }
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorElement.style.display = 'block';
    inputElement.classList.add('error');
    
    // Анимация ошибки
    inputElement.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        inputElement.style.animation = '';
    }, 500);
}

function clearInlineError(inputElement) {
    const errorElement = inputElement.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
    }
}

// 8. Анимация при загрузке
window.addEventListener('load', function() {
    // Плавное появление
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Анимация механизмов
    setTimeout(() => {
        document.querySelectorAll('.gear, .piston').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 200);
});

// 9. Добавляем CSS для анимации тряски если её нет
if (!document.querySelector('#shake-animation')) {
    const style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
        }
        
        .error-message {
            color: #ef4444;
            font-size: 0.85rem;
            margin-top: 5px;
            display: none;
            align-items: center;
            gap: 5px;
        }
        
        .password-toggle {
            transition: transform 0.2s ease, color 0.2s ease;
        }
        
        .password-toggle:hover {
            color: #60a5fa !important;
        }
    `;
    document.head.appendChild(style);
}