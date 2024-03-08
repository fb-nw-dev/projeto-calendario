function modx() {
  const menuToggle = document.getElementById('menu-toggle');
  menuToggle.classList.toggle('ativar');
}

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  document.addEventListener('click', (event) => {
    const isMenuToggleClicked = menuToggle.contains(event.target);
    const isSidebarClicked = sidebar.contains(event.target);
    
    if (!isSidebarClicked && !isMenuToggleClicked) {
      sidebar.classList.remove('show');
      menuToggle.classList.remove('active');
    }
  });

  const calendarContainer = document.querySelector('.calendar-container');
  const calendarTitle = calendarContainer.querySelector('h2');
  const monthsContainer = calendarContainer.querySelector('.months');
  const months = monthsContainer.querySelectorAll('.month');
  let currentMonth = 0;

  function updateCalendar() {
    months.forEach((month, index) => {
      if (index === currentMonth) {
        month.style.display = 'block'; // Exibe apenas o mês atual
        updateMonth(month); // Atualiza os dias para o mês atual
      } else {
        month.style.display = 'none'; // Oculta os outros meses
      }
    });
  }

  const sidebarLinks = document.querySelectorAll('#sidebar a');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.stopPropagation(); // Impede a propagação do evento de clique
    });
  });

  function updateMonth(month) {
    const daysContainer = month.querySelector('.days');
    const daysInMonth = new Date(2024, currentMonth + 1, 0).getDate();
    daysContainer.innerHTML = ''; // Limpa os dias antigos
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      dayElement.classList.add('day');
      dayElement.dataset.day = day; // Adiciona um atributo "data-day" para o dia

      // Adiciona evento de clique para adicionar anotação
      dayElement.addEventListener('click', () => {
        const month = dayElement.dataset.month;
        const dayNumber = dayElement.dataset.day;

        const annotation = prompt('Insira uma anotação para este dia:');
        if (annotation !== null && annotation.trim() !== '') {
          localStorage.setItem(`${month}-${dayNumber}`, annotation); // Armazena a anotação
          alert('Anotação salva com sucesso!');
        }
      });
      daysContainer.appendChild(dayElement);
    }
  }

  // Adicionar event listener para clicar apenas na área do título do calendário
  calendarTitle.addEventListener('click', (event) => {
    const screenWidth = window.innerWidth;
    const clickX = event.clientX;
    if (clickX < screenWidth / 2) {
      if (currentMonth > 0) {
        currentMonth--;
        updateCalendar();
      }
    } else {
      if (currentMonth < months.length - 1) {
        currentMonth++;
        updateCalendar();
      }
    }
  });

  // Adicionar event listener para o botão hamburguer
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active'); // Adiciona ou remove a classe 'active' ao botão hamburguer
    sidebar.classList.toggle('show'); // Exibe ou oculta a barra lateral
  });

  // Inicializa o calendário
  updateCalendar();
});

 







