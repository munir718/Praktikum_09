const VALID_USERNAME = "ahmad2017";
const VALID_PASSWORD = "integrity";

function showAlert(message, isSuccess = false) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${isSuccess ? 'success' : 'error'}`;
    alertDiv.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${isSuccess ? '✓' : '✗'}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${isSuccess ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(alertDiv);
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

function openSuccessPage() {
    const successPage = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login Berhasil</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                body {
                    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 20px;
                }
                
                .success-container {
                    background-color: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    padding: 60px 40px;
                    max-width: 600px;
                    width: 100%;
                    animation: fadeIn 0.8s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                h1 {
                    color: #27ae60;
                    margin-bottom: 20px;
                    font-size: 36px;
                }
                
                p {
                    color: #34495e;
                    margin-bottom: 30px;
                    font-size: 18px;
                    line-height: 1.6;
                }
                
                .user-info {
                    background-color: #f8f9fa;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 25px 0;
                    border-left: 4px solid #27ae60;
                }
                
                .user-info h3 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                }
                
                .back-btn {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 14px 30px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .back-btn:hover {
                    background-color: #2980b9;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }
                
                .back-btn:active {
                    transform: translateY(0);
                }
            </style>
        </head>
        <body>
            <div class="success-container">
                <h1>Login Sukses!</h1>
                <p>Anda telah berhasil mengautentikasi ke dalam sistem.</p>
                
                <div class="user-info">
                    <h3>Informasi Login</h3>
                    <p>Username: <strong>${VALID_USERNAME}</strong></p>
                    <p>Password: <strong>${VALID_PASSWORD}</strong></p>
                    <p>Waktu Login: <strong>${new Date().toLocaleString('id-ID')}</strong></p>
                </div>
                
                <p>Selamat datang di aplikasi. Anda dapat melanjutkan ke halaman utama atau kembali ke halaman login.</p>
                
                <button class="back-btn" onclick="window.location.href='login.html'">Kembali ke Login</button>
            </div>
        </body>
        </html>
    `;

    const newWindow = window.open();
    newWindow.document.write(successPage);
    newWindow.document.close();
}


function validateLogin(username, password) {
    if (!username || !password) {
        return {
            success: false,
            message: "Username dan password harus diisi!"
        };
    }


    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        return {
            success: true,
            message: "Login berhasil! Mengalihkan ke halaman selanjutnya..."
        };
    } else {
        return {
            success: false,
            message: "Username atau password salah! Coba lagi."
        };
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();


            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const validationResult = validateLogin(username, password);

            showAlert(validationResult.message, validationResult.success);

            if (validationResult.success) {
                setTimeout(() => {
                    openSuccessPage();
                }, 1500);
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .alert-icon {
            font-weight: bold;
            font-size: 18px;
            margin-right: 10px;
        }
        
        .alert-message {
            flex-grow: 1;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 15px;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
});