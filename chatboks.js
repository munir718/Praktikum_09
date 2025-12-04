document.addEventListener('DOMContentLoaded', function () {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const chatboxContainer = document.querySelector('.chatbox-container');

    // Fungsi untuk menambahkan pesan ke chat
    function addMessage(content, isSent = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isSent ? 'message sent' : 'message received';

        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' +
            now.getMinutes().toString().padStart(2, '0');

        messageDiv.innerHTML = `
            <div class="msg-content">${content}</div>
            <div class="msg-time">${timeString}</div>
        `;

        chatMessages.appendChild(messageDiv);
        // Scroll ke bawah untuk melihat pesan terbaru
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Fungsi untuk mengirim pesan
    function sendMessage() {
        const message = messageInput.value.trim();

        if (message === '') return;

        // Tambahkan pesan pengguna
        addMessage(message, true);

        // Kosongkan input
        messageInput.value = '';

        // Beri jeda lalu balas otomatis (simulasi)
        setTimeout(() => {
            const replies = [
                "Baik, terima kasih!",
                "Apa kabar juga?",
                "Ya, saya baik-baik saja.",
                "Ada yang bisa saya bantu?",
                "Senang mendengarnya!"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            addMessage(randomReply, false);
        }, 1000);
    }

    // Event listener untuk tombol kirim
    sendBtn.addEventListener('click', sendMessage);

    // Event listener untuk tekan Enter di input
    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Event listener untuk minimize/maximize chatbox
    minimizeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        chatboxContainer.classList.toggle('minimized');

        // Ganti ikon
        const icon = minimizeBtn.querySelector('i');
        if (chatboxContainer.classList.contains('minimized')) {
            icon.className = 'fas fa-plus';
        } else {
            icon.className = 'fas fa-minus';
        }
    });

    // Event listener untuk klik header (maximize jika minimized)
    document.querySelector('.chat-header').addEventListener('click', function () {
        if (chatboxContainer.classList.contains('minimized')) {
            chatboxContainer.classList.remove('minimized');
            minimizeBtn.querySelector('i').className = 'fas fa-minus';
        }
    });

    // Tambahkan beberapa pesan awal untuk contoh
    setTimeout(() => {
        addMessage("Halo!", false);
    }, 500);

    setTimeout(() => {
        addMessage("Apa kabar?", true);
    }, 1500);

    setTimeout(() => {
        addMessage("Baik-baik saja, terima kasih!", false);
    }, 2500);
});