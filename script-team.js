const profilGrid = document.getElementById("profil-grid");
const addButton = document.getElementById("profil-add-button");
const nameMessage = Array.from(document.querySelectorAll(".profil-name"));
const jobMessage = Array.from(document.querySelectorAll(".profil-title"));
const bioMessage = Array.from(document.querySelectorAll(".profil-text"));
const avatar = Array.from(document.querySelectorAll(".profil-img"));
const profil = document.querySelectorAll(".profil-frame");

const formNewProfile = document.getElementById("profil-form-frame")
const formUpdateProfil = document.getElementById("profil-form-frame-update")
const saveButton = document.getElementById("profil-save-button");
const saveUpdatesButton = document.getElementById("profil-save-button-update")

formNewProfile.style.display = "none";
formUpdateProfil.style.display = "none";
let newProfile = false;

let profiles = [
    {
        name: "House",
        jobtitle: "Research",
        bio: "Gets suff done.",
        avatar: "illustrations/house-profil.jpg"
    },
    {
        name: "Cuddy",
        jobtitle: "CEO",
        bio: "Holds the company together.",
        avatar: "illustrations/cuddy-profil.jpg"
    },
    {
        name: "Wilson",
        jobtitle: "Research",
        bio: "Prevents murder.",
        avatar: "illustrations/wilson-profil.jpg"
    },
]

function displayProfiles() {
    profilGrid.innerHTML = ""; // Clear existing profiles

    profiles.forEach((profile, index) => {
        const profileElement = createProfileElement(profile, index);
        profilGrid.appendChild(profileElement);
    });
}

function createProfileElement(profile, index) {
    const profileFrame = document.createElement('figure');
    profileFrame.className = 'profil-frame';

    const imgFrame = document.createElement('div');
    imgFrame.className = 'profil-img-frame';

    const img = document.createElement('img');
    img.src = profile.avatar;
    img.className = 'profil-img';
    img.alt = 'Photo de profil';

    imgFrame.appendChild(img);

    const figcaption = document.createElement('figcaption');
    figcaption.className = 'profil-details';

    const nameElement = document.createElement('h4');
    nameElement.className = 'profil-name';
    nameElement.innerText = profile.name;

    const jobElement = document.createElement('h5');
    jobElement.className = 'profil-title';
    jobElement.innerText = profile.jobtitle;

    const bioElement = document.createElement('p');
    bioElement.className = 'profil-text';
    bioElement.innerText = profile.bio;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'profil-buttons';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'secondary-button';
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteProfile(index));

    const updateButton = document.createElement('button');
    updateButton.className = 'secondary-button';
    updateButton.innerText = 'Update';
    updateButton.addEventListener('click', () => selectProfile(index));

    buttonsDiv.appendChild(deleteButton);
    buttonsDiv.appendChild(updateButton);

    figcaption.appendChild(nameElement);
    figcaption.appendChild(jobElement);
    figcaption.appendChild(bioElement);
    figcaption.appendChild(buttonsDiv);

    profileFrame.appendChild(imgFrame);
    profileFrame.appendChild(figcaption);

    return profileFrame;
}

function addProfile() {
    const name = document.getElementById('name-input').value;
    const job = document.getElementById('job-input').value;
    const bio = document.getElementById('bio-input').value;
    const photoInput = document.getElementById('avatar-input');
    const photoFile = photoInput.files[0];

    if (name && job && bio && photoFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const photo = e.target.result;
            profiles.push({ name, jobtitle: job, bio, avatar: photo });
            displayProfiles();
            clearInputs();
        };
        reader.readAsDataURL(photoFile);
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}


function deleteProfile(index) {
    profiles.splice(index, 1);
    displayProfiles();
}

function selectProfile(index) {
    const profile = profiles[index];
    document.getElementById('name-input-update').value = profile.name;
    document.getElementById('job-input-update').value = profile.jobtitle;
    document.getElementById('bio-input-update').value = profile.bio;
    document.getElementById('avatar-input-update').value = '';
    selectedProfileIndex = index;
    updateProfile();
}

function updateProfile() {
    console.log("caca");
    formUpdateProfil.style.display = ""
    if (selectedProfileIndex > -1) {
        const name = document.getElementById('name-input').value;
        const job = document.getElementById('job-input').value;
        const bio = document.getElementById('bio-input').value;
        const photoInput = document.getElementById('avatar-input');
        const photoFile = photoInput.files[0];

        if (name && job && bio) {
            if (photoFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const photo = e.target.result;
                    profiles[selectedProfileIndex] = { name, jobtitle: job, bio, avatar: photo };
                    displayProfiles();
                    clearInputs();
                    selectedProfileIndex = -1;
                };
                reader.readAsDataURL(photoFile);
            } else {
                profiles[selectedProfileIndex] = { ...profiles[selectedProfileIndex], name, jobtitle: job, bio };
                displayProfiles();
                clearInputs();
                selectedProfileIndex = -1;
            }
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    } else {
        alert('Veuillez sélectionner un profil à modifier.');
    }
}

function clearInputs() {
    document.getElementById('name-input').value = '';
    document.getElementById('job-input').value = '';
    document.getElementById('bio-input').value = '';
    document.getElementById('avatar-input').value = '';
}

addButton.addEventListener("click", () => {
    if (!newProfile) {
        formNewProfile.style.display = "";
    }
    newProfile = true;
});

saveButton.addEventListener("click", () => {
    addProfile();
    formNewProfile.style.display = "none";
    newProfile = false;
});

displayProfiles();
