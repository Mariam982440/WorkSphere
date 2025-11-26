let employé =JSON.parse(localStorage.getItem('staffs')) || [];

const limitesParSalle = {
    'serveurs': 2,
    'conference': 4,
    'securite': 3,
    'reception': 4,
    'personnel': 4,
    'archive': 1
};

afficherStaff();
verifierSalle();
rechargerEmployesAssignes();


let bouton_exp= document.getElementById('btn-ajout-exp');

bouton_exp.addEventListener(('click'),function(){
    
    const block= document.getElementById('inserer-exp');
    const blockExp = document.createElement("div");
    blockExp.classList.add('block-exp');
    blockExp.dataset.id = Date.now();
    

    blockExp.innerHTML =`
            <h1 class="lg:mb-4 flex justify-end"><button type="button" class='close-experience'><i class="fa-solid fa-x"></i></button></h1>
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
        `;

    block.appendChild(blockExp);

})

document.addEventListener("click", (e) => {
    if(e.target.closest('.close-experience')) {
        const parent = e.target.closest('.block-exp');
        parent.remove();
    }
})


// event pour ouvrir la modal de selection des employé
function openModalSelect(){
    document.getElementById('liste-staff-select').classList.remove('hidden');

}

// event pour ouvrir la modal de selection des employé
function closeModalSelect(){
    document.getElementById('liste-staff-select').classList.add('hidden');

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

// fonction pour fermer la modal de l'ajout 
function closeModalAjout(){
    document.getElementById('add-or-edit').classList.add('hidden');
}

// fonction pour afficher les employé non assignés 

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
                    <div class="cursor-pointer" onclick="afficherInfoEmploye(${emp.id})">
                        <img class="rounded-2xl md:w-12 md:h-12" src="${emp.photo}" alt="staff photo">
                    </div>
                    <div class="flex flex-col cursor-pointer" onclick="afficherInfoEmploye(${emp.id})">
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


// fonction pour ajouter un employé 

function ajouterEmployé(e){
    e.preventDefault();

    const blocs= document.querySelectorAll('.block-exp');

    const experiences=[];
    blocs.forEach(bloc => {

        let poste= bloc.querySelector('.poste').value;
        let entr=bloc.querySelector('.entreprise').value;
        let date_d=bloc.querySelector('.date_debut').value;
        let date_f=bloc.querySelector('.date_fin').value;

        // validation
    if (poste.length <= 2) {
        alert("Le poste doit contenir au moins 3 caractères !");
        return;
    }

    if (entr.length <= 2) {
        alert("L'entreprise doit contenir au moins 3 caractères !");
        return;
    }

    if (!date_d || !date_f) {
        lert("Les dates doivent être remplies !");
        return;
    }

    if (new Date(date_d) >= new Date(date_f)) {
        alert("La date de début doit être plus ancienne que la date de fin !");
        return;
    }


        let exp={
            poste: poste,
            entreprise: entr,
            date_debut: date_d,
            date_fin: date_f,
        }
        experiences.push(exp);
    });
    
    const nom = document.getElementById('nom').value;
    const role = document.getElementById('role').value;
    const photo = document.getElementById('photo').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const experience=experiences;


    if(!nom || !role  ||!email ||!tel){
        alert('veuillez remplir les champs vide');
    }

    const regexNom =/^[a-zA-ZÀ-ÿ\s-]{2,30}$/;
    if(!regexNom.test(nom)){
        alert('Le nom doit contenir uniquement des lettres, espaces ou tirets (2-30 caractères)');
        document.getElementById('nom').focus();
        return;

    }

    const regexTel =/^(06|\+212)[0-9]{8}$/;
    if(!regexTel.test(tel)){
        alert('Le numéro de téléphone est de format invalide');
        document.getElementById('tel').focus();
        return;
    }

    
    const regexEmail =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regexEmail.test(email)){
          alert('Veuillez entrer une adresse email valide (exemple: nom@domaine.com)');
        document.getElementById('email').focus();
        return;

    }

    const staff={
        id: Date.now(),
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

        container.innerHTML+=`<button type="button" class="btn-select-emp" data-id="${emp.id}">
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

            let id= parseInt(this.getAttribute('data-id'));
            let employéSelected=employé.find(e=> e.id===id);


            closeModalSelect();
            ajouterEmployeSalle(employéSelected, salleCliquee);
 
            
        })
    })
}
// fonction pour afficher l'employé selectionner dans la salle cliqué

function ajouterEmployeSalle(employe, salle) {

    let bouton = document.querySelector(`[data-salle="${salle}"]`);

    
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



 
    let empHTML= document.createElement('div');
     empHTML.innerHTML = `
        <div class="cursor-pointer btn-info flex justify-around items-center gap-1 p-[3px] bg-white rounded-lg w-28">
            <div class="flex justify-around items-center gap-1"  onclick="afficherInfoEmploye(${employe.id})">
                <img src="${employe.photo}" class="w-5 h-5 rounded-xl">
                <div class="flex flex-col gap-[2px]">
                    <span class="text-[8px]">${employe.name}</span>
                    <span class="text-[8px] text-gray-500">${employe.role}</span>
                </div>
            </div>
            
            <button type="button" class="btn-retirer" data-id="${employe.id}">
                <i class="text-[9px] fa-solid fa-x"></i>
            </button>
        </div>
    `;
    containerSalle.appendChild(empHTML);
    
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
        let bouton = document.querySelector(`[data-salle="${salle}"]`);
        let divPrincipale = bouton.parentElement.parentElement;
        let listeAssignée = divPrincipale.querySelector('.liste-employes');
        
        if(listeAssignée && listeAssignée.children.length === 0){
            divPrincipale.classList.add('bg-red-500');
            divPrincipale.classList.add('border-2');
            divPrincipale.classList.add('border-red-300');
            divPrincipale.classList.remove('bg-[#CFAB8D]');
        }
        else {
            divPrincipale.classList.remove('bg-red-500');   
            divPrincipale.classList.remove('border-2');
            divPrincipale.classList.remove('border-red-300');
            divPrincipale.classList.add('bg-[#CFAB8D]');
        }
    });
}



function activerBoutonRetirer(){
    document.querySelectorAll('.btn-retirer').forEach(btn=>{
        btn.addEventListener('click',function(){
            
            let idEmploye = parseInt(this.getAttribute('data-id'));
            
            let emp = employé.find(e => e.id === idEmploye);
            
            if(emp){
                emp.statu = 'unassigned';
                emp.poste = '';
                localStorage.setItem('staffs',JSON.stringify(employé));
                
    
                const empContainer = this.closest('.cursor-pointer.btn-info').parentElement; 
                
                if(empContainer){
                    empContainer.remove();
                }
                
                afficherStaff();

                verifierSalle();

            }
        })
    })
}

// pour selectionner et filtrer les employé à assignés


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
        afficherListeModal(allowedEmp);
        openModalSelect();
        activerselection(salleCliquee,allowedEmp);
        
    });
    
});



function openModalInfo(){
    document.getElementById('modal-info-emp').classList.remove('hidden');
}

function closeModalInfo(){
    document.getElementById('modal-info-emp').classList.add('hidden');
}


function afficherInfoEmploye(id){
    let emp= employé.find(e=>e.id===id);
    if(!emp) return;

    let expHTML='';
    if(emp.experience && emp.experience.length > 0){
        emp.experience.forEach(exp=>{
            expHTML+=`<div class="bg-gray-100 p-2 rounded-lg mb-2">
                    <div class="text-sm"><strong>Poste:</strong> ${exp.poste}</div>
                    <div class="text-sm"><strong>Entreprise:</strong> ${exp.entreprise}</div>
                    <div class="text-sm"><strong>Période:</strong> ${exp.date_debut} - ${exp.date_fin}</div>
                </div>
        `
        })
        
    }else {
        expHTML = '<p class="text-gray-400 text-sm">Aucune expérience</p>';
    }
    
    let html = `
        <div class="flex flex-col gap-3">
            <img class="rounded-2xl w-20 h-20 mx-auto" src="${emp.photo}">
            <div class="text-sm"><strong>Nom:</strong> ${emp.name}</div>
            <div class="text-sm"><strong>Rôle:</strong> ${emp.role}</div>
            <div class="text-sm"><strong>Email:</strong> ${emp.email || 'Non renseigné'}</div>
            <div class="text-sm"><strong>Tel:</strong> ${emp.tel || 'Non renseigné'}</div>
            <div class="text-sm"><strong>Statut:</strong> ${emp.statu}</div>
            <div class="text-sm"><strong>Poste:</strong> ${emp.poste || 'Aucun'}</div>
            
            <div class="mt-2">
                <h3 class="font-bold mb-2 text-sm">Expériences:</h3>
                ${expHTML}
            </div>
        </div>
    `;
    
    document.getElementById('contenu-info').innerHTML = html;
    openModalInfo();
}


// Fonction pour recharger les employés assignés dans les salles au chargement
function rechargerEmployesAssignes(){
    employé.forEach(emp => {
        if(emp.statu === 'assigned' && emp.poste && !emp.deleted){
            let bouton = document.querySelector(`[data-salle="${emp.poste}"]`);
            
            if(bouton){
                let divPrincipal = bouton.parentElement.parentElement;
                let containerSalle = divPrincipal.querySelector('.liste-employes');
                
                if(containerSalle){
                    // insertion du même HTML que dans ajouterEmployeSalle
                    let empHTML = document.createElement('div');
                    empHTML.innerHTML = `
                    <div class="cursor-pointer btn-info flex justify-around items-center gap-1 lg:p-[3px] md:p-[1px] bg-white rounded-lg md:w-24 lg:w-28">
                        <div class="flex justify-around items-center gap-1"  onclick="afficherInfoEmploye(${emp.id})">
                            <img src="${emp.photo}" class="w-5 h-5 rounded-xl">
                            <div class="flex flex-col gap-[2px]">
                                <span class="text-[8px]">${emp.name}</span>
                                <span class="text-[8px] text-gray-500">${emp.role}</span>
                            </div>
                        </div>
            
                        <button type="button" class="btn-retirer" data-id="${emp.id}">
                            <i class="text-[9px] fa-solid fa-x"></i>
                        </button>
                    </div>
                    `;
                    containerSalle.appendChild(empHTML);
                }
            }
        }
    });
    
    activerBoutonRetirer();
    verifierSalle();
}




     










