let employé =JSON.parse(localStorage.getItem('staffs')) || [];

// window.onload= function(){
//     afficherStaff();

// document.querySelector('#form-ajout-edit').onsubmit = ajouterEmployé;
// }
 afficherStaff();

// document.querySelector('#form-ajout-edit').onsubmit = ajouterEmployé;

let bouton_exp= document.getElementById('btn-ajout-exp');
bouton_exp.addEventListener(('click'),function(){
 let block= document.getElementById('inserer-exp');
 let html=``;
 html=`<div class="flex flex-col items-start justify-evenly">
            <label for="éxpérience">Expérience</label>
            <input id="experience"
                class="text-center border-2 border-blue-100 rounded-xl  h-9 lg:w-[590px] md:w-[400px]"
                type="éxpérience" name="éxpérience" placeholder="Expérience de l'employé">
        </div>`
block.innerHTML+=html;

})

// fonction pour ouvrir la modal de l'ajout 
function openModalAjout(){

    document.getElementById('nom').value='';
    document.getElementById('role').value='';
    document.getElementById('photo').value='';
    document.getElementById('tel').value='';
    document.getElementById('email').value='';
    document.getElementById('experience').value='';

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
        statu:'unassigned',
        deleted: false
    }
    employé.push(staff);
    localStorage.setItem('staffs',JSON.stringify(employé))

    afficherStaff();
    closeModalAjout();
    
document.getElementById('form-ajout-edit').reset();
}
