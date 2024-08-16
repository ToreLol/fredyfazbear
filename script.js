function showSection(sectionId) {
    // Oculta todas las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');

    // Muestra la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    // Función para formatear el tiempo
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        let timeString = "";
        if (hours > 0) {
            timeString += `${hours} hora${hours > 1 ? 's' : ''}, `;
        }
        if (minutes > 0) {
            timeString += `${minutes} minuto${minutes > 1 ? 's' : ''} y `;
        }
        timeString += `${remainingSeconds} segundo${remainingSeconds > 1 ? 's' : ''}`;

        return timeString;
    }

    // Inicializar el contador de tiempo en sessionStorage
    if (!sessionStorage.getItem("timeSpent")) {
        sessionStorage.setItem("timeSpent", 0);
    }

    // Actualizar el contador de tiempo cada segundo
    setInterval(() => {
        let timeSpent = parseInt(sessionStorage.getItem("timeSpent"));
        timeSpent += 1;
        sessionStorage.setItem("timeSpent", timeSpent);
        document.getElementById("time-counter").innerText = `Tiempo en la página: ${formatTime(timeSpent)}`;
    }, 1000);


    // Función para mostrar los posts guardados
    function displayPosts() {
        const postsContainer = document.getElementById("posts-container");
        postsContainer.innerHTML = "";
        const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
            postsContainer.appendChild(postElement);
        });
    }

    // Función para manejar el envío de posts
    window.submitPost = function() {
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;
        if (title && content) {
            savePost(title, content);
            document.getElementById("forum-form").reset();
        } else {
            alert("Por favor, completa ambos campos.");
        }
    }

    // Mostrar posts al cargar la página
    displayPosts();

    // Guardar la última sección visitada usando cookies
    function setLastVisitedSection(section) {
        document.cookie = "lastVisited=" + section + "; path=/";
    }

    // Recuperar la última sección visitada usando cookies
    function getLastVisitedSection() {
        const match = document.cookie.match(new RegExp('(^| )lastVisited=([^;]+)'));
        return match ? match[2] : "home";
    }

    // Mostrar la última sección visitada al cargar la página
    const lastVisited = getLastVisitedSection();
    document.getElementById(lastVisited).style.display = "block";

    // Almacenar la última sección cada vez que se cambia de sección
    window.showSection = function(sectionId) {
        document.querySelectorAll("section").forEach(section => section.style.display = "none");
        document.getElementById(sectionId).style.display = "block";
        setLastVisitedSection(sectionId);
    }

    // Session storage para contar tiempo en la página
    if (!sessionStorage.getItem("timeSpent")) {
        sessionStorage.setItem("timeSpent", 0);
    }

    setInterval(() => {
        let timeSpent = parseInt(sessionStorage.getItem("timeSpent"));
        timeSpent += 1;
        sessionStorage.setItem("timeSpent", timeSpent);
        document.getElementById("time-counter").innerText = `Tiempo en la página: ${timeSpent} segundos`;
    }, 1000);
});
