document.getElementById('profile').addEventListener('click', function() {
    const dropdown = document.getElementById('opener');
    dropdown.classList.toggle('active');
});

function convertToJSON() {
    let checkboxes = document.querySelectorAll('input[name="etudiant_id[]"]:checked');
    let selectedIds = Array.from(checkboxes).map(cb => cb.value);
    let jsonIds = JSON.stringify(selectedIds);

    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'etudiant_id_json';
    input.value = jsonIds;

    document.querySelector('.fromClass').appendChild(input);

    checkboxes.forEach(cb => cb.remove());
}



    const hamburger = document.querySelector('.hamburger');
    const navLink = document.querySelector('.nav__link');

    hamburger.addEventListener('click', () => {
    navLink.classList.toggle('hide');
    });
  
