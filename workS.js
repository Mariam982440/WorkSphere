let employé =JSON.parse(localStorage.getItem('staffs')) || [];

// window.onload= function(){
//     afficherStaff();

// document.querySelector('#form-ajout-edit').onsubmit = ajouterEmployé;
// }
 afficherStaff();

// document.querySelector('#form-ajout-edit').onsubmit = ajouterEmployé;
let count=1;
let bouton_exp= document.getElementById('btn-ajout-exp');

bouton_exp.addEventListener(('click'),function(){
    
    let block= document.getElementById('inserer-exp');
    let html=``;

    html=`<div class="block-exp">
            <h1 class="lg:mb-4 ">Expérience ${count}</h1>
            <div class="flex gap-6 ">
                <div class="flex flex-col items-start justify-evenly">
                    <label class="text-xs" for="Poste">Poste</label>
                    <input 
                    class="poste text-center border-2 border-blue-100 rounded-xl  h-9 lg:w-[260px] md:w-[165px]"
                    type="text" name="Poste" placeholder="Expérience de l'employé">

                </div>
                <div class="flex flex-col items-start justify-evenly">
                    <label class="text-xs"  for="entreprise">Entreprise</label>
                    <input 
                    class="entreprise text-center border-2 border-blue-100 rounded-xl  h-9 lg:w-[260px] md:w-[165px]"
                    type="text" name="entreprise" placeholder="Entreprise de cet expérience">
                </div> 
            </div>
            <div class="flex gap-6">
                <div class="flex flex-col items-start justify-evenly">
                    <label class="text-xs"  for="date_debut">Date de debut</label>
                    <input 
                    class="date_debut text-center border-2 border-blue-100 rounded-xl  h-9 lg:w-[260px] md:w-[165px]"
                    type="date" name="date_debut" placeholder="Date de debut">

                </div>
                <div class="flex flex-col items-start justify-evenly">
                    <label class="text-xs"  for="date_fin">Date de la fin</label>
                    <input 
                    class="date_fin text-center border-2 border-blue-100 rounded-xl  h-9 lg:w-[260px] md:w-[165px]"
                    type="date" name="date_fin" placeholder="Date de la fin">
                </div> 
            </div>
        </div>`

    block.innerHTML+=html;
    count++;

})
// event pour ouvrir la modal de selection des employé
function openModalSelect(){
    document.getElementById('staff-select').classList.remove('hidden');

}

// event pour ouvrir la modal de selection des employé
function closeModalSelect(){
    document.getElementById('staff-select').classList.add('hidden');

}
// fonction pour ouvrir la modal de l'ajout 
function openModalAjout(){

    document.getElementById('nom').value='';
    document.getElementById('role').value='';
    document.getElementById('photo').value='';
    document.getElementById('tel').value='';
    document.getElementById('email').value='';

    document.getElementById('titre-modal').textContent='Nouveau employé'

    document.getElementById('add-or-edit').classList.remove('hidden');
}
function closeModalAjout(){
    document.getElementById('add-or-edit').classList.add('hidden');
}

function afficherStaff(){
    let html = '';
    
    if (employé.length === 0 ) {
        document.getElementById('cartes').innerHTML = `
        <div class="text-center m-3 p-20 w-full">
            <p class="text-[80%] text-gray-400">Aucun employé pour le moment</p>
        </div>`;
        return;
    }
    for(let i=0;i<employé.length;i++){
        let emp= employé[i];
        if(emp.deleted===true) continue;
        html +=`
        <div class="flex justify-around items-center rounded-2xl bg-white gap-3 md:px-1 md:py-2">
                    <div class="">
                        <img class="rounded-2xl md:w-12 md:h-12" src="./imgs/profil.jpg" alt="staff photo">
                    </div>
                    <div class="flex flex-col ">
                        <div class="md:text-[15px]">${emp.name}</div>
                        <div class="md:text-[15px] text-gray-500 font-bold">${emp.role}</div>
                    </div>
                    <button>
                        <i class="md:text-[18px] font-bold fa-solid fa-pen-to-square"></i>
                    </button>
                    <button type="button" onclick="supprimerEmployé(${i})">
                        <i class="md:text-[18px] font-bold fa-solid fa-trash"></i>
                    </button>
                </div>`
    }
    document.getElementById('cartes').innerHTML=html;
}
function supprimerEmployé(indice){
    const confirmer= confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")
    if(!confirmer) {
        return;
    }

    employé[indice].deleted= true;
    afficherStaff();
    localStorage.setItem(('staffs'),JSON.stringify(employé));
}

function ajouterEmployé(e){
    e.preventDefault();

    const blocs=document.querySelectorAll('.block-exp');

    const experiences=[];
    blocs.forEach(bloc => {
        let exp={
            poste: bloc.querySelector('.poste').value,
            entreprise: bloc.querySelector('.entreprise').value,
            date_debut: bloc.querySelector('.date_debut').value,
            date_fin: bloc.querySelector('.date_fin').value,
        }
        experiences.push(exp);
    });
    
    const nom = document.getElementById('nom').value;
    const role = document.getElementById('role').value;
    const photo = document.getElementById('photo').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const experience=experiences;

    

    


    if(!nom || !role  ||!email){
        alert('veuillez remplir les champs vide');
    }
    const staff={
        name: nom,
        role: role,
        photo: photo,
        tel: tel,
        email: email,
        experience: experience,
        statu:'unassigned',
        deleted: false
    }
    employé.push(staff);
    localStorage.setItem('staffs',JSON.stringify(employé))

    afficherStaff();
    closeModalAjout();
    
document.getElementById('form-ajout-edit').reset();
}
