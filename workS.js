let utilisateur= [];

// fonction pour ouvrir la modal de l'ajout 
function openModalAjout(){

    document.getElementById('nom').value='';
    document.getElementById('role').value='';
    document.getElementById('photo').value='';
    document.getElementById('email').value='';
    document.getElementById('experience').value='';

    document.getElementById('titre-modal').textContent='Nouveau employé'

    document.getElementById('add-or-edit').classList.remove('hidden');
}
function closeModalAjout(){
    document.getElementById('add-or-edit').classList.add('hidden');
}