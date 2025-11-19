let employé= [];

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

function afficherStaff(){
    for(let i=0;i<employé.length;i++){
        let emp= employé[i];
        html=`
        <div class="flex justify-around items-center rounded-2xl bg-white gap-3 md:px-1 md:py-2">
                    <div class="">
                        <img class="rounded-2xl md:w-12 md:h-12" src="./imgs/profil.jpg" alt="staff photo">
                    </div>
                    <div class="flex flex-col ">
                        <div class="md:text-[15px]">${emp.nom}</div>
                        <div class="md:text-[15px] text-gray-500 font-bold">${emp.role}</div>
                    </div>
                    <button>
                        <i class="md:text-[18px] font-bold fa-solid fa-pen-to-square"></i>
                    </button>
                </div>`
    }
}
function ajouterEmployé(){
    preventDefault();
    
    const nom = document.getElementById('nom').value;
    const role = document.getElementById('role').value;
    const photo = document.getElementById('photo').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const experience = document.getElementById('experience').value;

    if(!nom || !role  ||!email||!experience){
        alert('veuillez remplir les champs vide');
    }
    const staff={
        name: nom,
        role: role,
        photo: photo,
        tel: tel,
        email: email,
        experience: experience,
        statu:'unassigned'
    }
    employé.push(staff);

    afficherStaff();
document.getElementById('form-ajout-edit').reset();
}