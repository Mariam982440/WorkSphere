let utilisateur= [];

// fonction pour ouvrir la modal de l'ajout 
function openModalAjout(){

    // document.getElementById('nom').value='';
    // document.getElementById('role').value='';
    // document.getElementById('photo').value='';
    // document.getElementById('email').value='';
    // document.getElementById('experience').value='';

    // document.getElementById('add-or-edit').textContent='Nouveau employé'

    document.getElementById('add-or-edit').classList.remove('hidden');
    document.getElementById('add-or-edit').classList.add('flex');
}