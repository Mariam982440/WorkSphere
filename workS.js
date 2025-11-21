let employé =JSON.parse(localStorage.getItem('staffs')) || [];

const limitesParSalle = {
    'serveurs': 1,
    'conference': 10,
    'securite': 3,
    'reception': 2,
    'personnel': 5,
    'archive': 1
};

afficherStaff();
verifierSalle()

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
    document.getElementById('liste-staff-select').classList.remove('hidden');

}

// event pour ouvrir la modal de selection des employé
function closeModalSelect(){
    document.getElementById('liste-staff-select').classList.add('hidden');

}

document.getElementById('')
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
        if(emp.statu==='assigned') continue;
        html +=`
        <div class="flex justify-around items-center rounded-2xl bg-white gap-3 md:px-1 md:py-2">
                    <div class="">
                        <img class="rounded-2xl md:w-12 md:h-12" src="${emp.photo}" alt="staff photo">
                    </div>
                    <div class="flex flex-col ">
                        <div class="md:text-[15px]">${emp.name}</div>
                        <div class="md:text-[15px] text-gray-500 font-bold">${emp.role}</div>
                    </div>
                    
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

    const blocs= document.querySelectorAll('.block-exp');

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
        photo: photo || './imgs/profil.jpg',
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




function afficherListeModal(allowedEmp){

    let container = document.getElementById('container-select');
    container.innerHTML="";
    allowedEmp.forEach((emp,index)=>{

        container.innerHTML+=`<button type="button" class="btn-select-emp" data-index="${index}">
                <div class="flex justify-around items-center rounded-2xl bg-white md:px-1 md:py-1">
                <div>
                    <img class="rounded-2xl md:w-8 md:h-8" src="${emp.photo}" alt="staff photo">
                </div>
                <div class="flex flex-col">
                    <div class="text-[12px]">${emp.name}</div>
                    <div class="text-[12px] text-gray-500 font-bold">${emp.role}</div>
                </div>
                </div>
            </button>`
    })
} 
// fonction pour permetre la selection par click dans la liste des autorisés
function activerselection(salleCliquee,allowedEmp){
    document.querySelectorAll('.btn-select-emp').forEach(element=>{

        element.addEventListener('click',function(){

            let indice= this.getAttribute('data-index');
            let employéSelected=allowedEmp[indice];


            console.log(employéSelected);

            closeModalSelect();
            ajouterEmployeSalle(employéSelected, salleCliquee);
            
            

        })
    })
}
// fonction pour afficher l'employé selectionner dans la salle cliqué

function ajouterEmployeSalle(employe, salle) {

    let bouton = document.querySelector(`[data-salle="${salle}"]`);
    console.log(bouton)
    // remonter 2 niveaux
    let divPrincipal = bouton.parentElement.parentElement;
    let containerSalle = divPrincipal.querySelector('.liste-employes');


    // Vérifier la limite
    let nombreActuel = containerSalle.children.length;
    let limite = limitesParSalle[salle];
    
    if(nombreActuel >= limite){
        alert(`Cette salle a atteint sa limite de ${limite} employé(s) !`);
        return;
    }



console.log(employe)

    containerSalle.innerHTML += `
        <div class="flex items-center gap-1 p-[3px] bg-white rounded-xl ">
            <img src="${employe.photo}" class="w-5 h-5 rounded-xl">
            <span class="text-[9px]">${employe.name}</span>
            <button type="button" class="btn-retirer" data-name="${employe.name}">
                <i class="text-[6px] fa-solid fa-x"></i>
            </button>
        </div>
    `;
    
    // marquer comme assigné
    employe.statu = 'assigned';
    employe.poste = salle;
    localStorage.setItem('staffs',JSON.stringify(employé));
    afficherStaff();
    
    // activer le bouton x pour retirer l'employé
    activerBoutonRetirer();
    verifierSalle();
}

// fonction pour verifier les zonnes vides et les affiche en rouge 
function verifierSalle(){
    const sallesObligatoires = ['serveurs', 'securite', 'reception', 'archive'];   

    sallesObligatoires.forEach(salle=>{
        let bouton =document.querySelector(`[data-salle="${salle}"]`)
        let divPrincipale =bouton.parentElement.parentElement;
        let listeAssignée = divPrincipale.querySelector('.liste-employes')

        if(listeAssignée && listeAssignée.children.length=== 0){
            divPrincipale.classList.add('bg-red-100');
            divPrincipale.classList.add('border-2');
            divPrincipale.classList.add('border-red-300');
        }
        else {
            divPrincipale.classList.remove('bg-red-100');
            divPrincipale.classList.remove('border-2');
            divPrincipale.classList.remore('border-red-300');
        }
        
    })
}


function activerBoutonRetirer(){
    document.querySelectorAll('.btn-retirer').forEach(btn=>{
        btn.addEventListener('click',function(){
            let nomEmploye = this.getAttribute('data-name');
            
            let emp = employé.find(e => e.name === nomEmploye);
            
            if(emp){
                // Marquer comme non assigné
                emp.statu = 'unassigned';
                emp.poste = '';
                localStorage.setItem('staffs',JSON.stringify(employé));
                
                // Supprimer visuellement de la salle
                this.parentElement.remove();
                
                // Rafraîchir la barre latérale
                afficherStaff();
                verifierSalle();

            }
        })
    })
}

// fonction pour selectionner et filtrer les employé à assignés

document.querySelectorAll('.btn-assign').forEach(btn => {

    btn.addEventListener('click', function() {

        let salleCliquee = btn.getAttribute('data-salle');  
        let allowedEmp=[];

        if(salleCliquee=='serveurs'){

            let rolesAutorises = ['Technicien IT', 'manager','agent de nettoyage'];
            employé.forEach(emp => {

            if (emp.deleted) return;
            if (emp.statu === 'assigned') return;
            // si le rôle n'est pas dans la liste autorisée  on skip
            if (!rolesAutorises.includes(emp.role)) return;
            else{
                allowedEmp.push(emp);
            } 
            });
            
        }

        if(salleCliquee=='conference'){

            let rolesAutorises = ['Technicien IT', 'manager','autre','réceptionniste','agent de securité','agent de nettoyage'];
            employé.forEach(emp => {

            if (emp.deleted) return;
            if (emp.statu === 'assigned') return;
            // si le rôle n'est pas dans la liste autorisée  on skip
            if (!rolesAutorises.includes(emp.role)) return;
            else{
                allowedEmp.push(emp);
            } 
            });
            
        }
        
        if(salleCliquee=='securite'){

            const rolesAutorises = ['agent de securité', 'manager','agent de nettoyage'];
            employé.forEach(emp => {

            if (emp.deleted) return;
            if (emp.statu === 'assigned') return;
            // si le rôle n'est pas dans la liste autorisée  on skip
            if (!rolesAutorises.includes(emp.role)) return;
            else{
                allowedEmp.push(emp);
            } 
            });
        }

        if(salleCliquee=='reception'){

            const rolesAutorises = ['réceptionniste', 'manager','agent de nettoyage'];
            employé.forEach(emp => {

            if (emp.deleted) return;
            if (emp.statu === 'assigned') return;
            // si le rôle n'est pas dans la liste autorisée  on skip
            if (!rolesAutorises.includes(emp.role)) return;
            else{
                allowedEmp.push(emp);
            } 
            });
            
        } 
        if(salleCliquee=='personnel'){

            const rolesAutorises = ['Technicien IT', 'manager','autre','réceptionniste','agent de securité','agent de nettoyage'];
            employé.forEach(emp => {

            if (emp.deleted) return;
            if (emp.statu === 'assigned') return;
            // si le rôle n'est pas dans la liste autorisée  on skip
            if (!rolesAutorises.includes(emp.role)) return;
            else{
                allowedEmp.push(emp);
            } 
            });
            
        } 
        if(salleCliquee=='archive'){

            const rolesAutorises = ['manager'];
            employé.forEach(emp => {

            if (emp.deleted) return;
            if (emp.statu === 'assigned') return;
            // si le rôle n'est pas dans la liste autorisée  on skip
            if (!rolesAutorises.includes(emp.role)) return;
            else{
                allowedEmp.push(emp);
            } 
            });
            
        }
        console.log(allowedEmp);
        afficherListeModal(allowedEmp);
        openModalSelect();
        activerselection(salleCliquee,allowedEmp);
        
    });
    
});

