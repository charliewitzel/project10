/*==== menu icon navbar ====*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};



/*====Scroll sections active link ====*/
let sections =document.querySelectorAll('section');
let navLinks =document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

        };
    })

/*====Sticky navbar ====*/
let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY > 100);

/*==== remove menu icon navbar when clicked(scroll) ====*/
menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

};

/*====dark light mode ====*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};


/*====scroll animation for drag and store ====*/
const the_animation = document.querySelectorAll('.animation')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation')
        }
            else {
                entry.target.classList.remove('scroll-animation')
            }
        
    })
},
   { threshold: 0.5
   });
//
  for (let i = 0; i < the_animation.length; i++) {
   const elements = the_animation[i];

    observer.observe(elements);
  } 


  const items = document.querySelectorAll('.item')
const options = {
  threshold: 0.5
}
const observerb = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    }
  });
}, options)
items.forEach(item => {
  observerb.observe(item);
})



/*====form validation ====*/
var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var subjectError = document.getElementById('subject-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');

function validateName(){
    var name = document.getElementById('contact-name').value;

    if (name.length == 0) {
        nameError.innerHTML = 'Hmmm! Looks like your forgot your name!';
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = 'Need your full name, please!';
        return false;
    } 
    nameError.innerHTML = '<i class="bx bx-check-circle"></i>';
    return true; 
    
}

function validatePhone() {
    var phone = document.getElementById('contact-phone').value;

    if (phone.length == 0){
        phoneError.innerHTML = "Need those Digits";
        return false; 
    }
    if (phone.length !== 10){
        phoneError.innerHTML = "Hmmm! Phone number should be 10 digits";
        return false; 
    }
    if (!phone.match(/^[0-9]{10}$/)){
        phoneError.innerHTML = "Now that doesn't look like a valid phone number";
        return false; 
    }

    phoneError.innerHTML = '<i class="bx bx-check-circle"></i>';
    return true; 
}

function validateEmail() {
    var email = document.getElementById('contact-email').value;

    if(email.length == 0){
        emailError.innerHTML = "Email is required";
        return false;
    }

    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = "This isn't a valid email";
        return false;
    }

    emailError.innerHTML = '<i class="bx bx-check-circle"></i>';
    return true; 

}

function validateSubject() {
    var subject = document.getElementById('contact-subject').value;

    if (subject.length == 0){
        subjectError.innerHTML = "Let me know why you're contacting";
        return false;
    }

    subjectError.innerHTML = '<i class="bx bx-check-circle"></i>';
    return true;
}
function validateMessage() {
    var message = document.getElementById('contact-message').value;

    if (message.length == 0){
        messageError.innerHTML = "more info";
        return false;
    }

    return true;
}

function validateForm(){
    if (!validateName() || !validatePhone() || !validateEmail() || !validateSubject() || !validateMessage()){
        submitError.innerHTML =  "Fix Errors";
        return false;
    }
    return true;
}

//song request
class Song {
    constructor(title, artist, concept) {
      this.title = title;
      this.artist = artist;
      this.concept = concept;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displaySongs() {
      const songs = Store.getSongs();
  
      songs.forEach((song) => UI.addSongToList(song));
    }
  
    static addSongToList(song) {
      const list = document.querySelector('#song-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${song.title}</td>
        <td>${song.artist}</td>
        <td>${song.concept}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteSong(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#song-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#artist').value = '';
      document.querySelector('#concept').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getSongs() {
      let songs;
      if(localStorage.getItem('songs') === null) {
        songs = [];
      } else {
        songs = JSON.parse(localStorage.getItem('songs'));
      }
  
      return songs;
    }
  
    static addSong(song) {
      const songs = Store.getSongs();
      songs.push(song);
      localStorage.setItem('songs', JSON.stringify(songs));
    }
  
    static removeSong(concept) {
      const songs = Store.getSongs();
  
      songs.forEach((song, index) => {
        if(song.concept === concept) {
          songs.splice(index, 1);
        }
      });
  
      localStorage.setItem('songs', JSON.stringify(songs));
    }
  }
  
  // Event: Display songs
  document.addEventListener('DOMContentLoaded', UI.displaySongs);
  
  // Event: Add a song
  document.querySelector('#song-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const artist = document.querySelector('#artist').value;
    const concept = document.querySelector('#concept').value;
  
    // Validate
    if(title === '' || artist === '' || concept === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate song
      const song = new Song(title, artist, concept);
  
      // Add song to UI
      UI.addSongToList(song);
  
      // Add song to store
      Store.addSong(song);
  
      // Show success message
      UI.showAlert('Song Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a song
  document.querySelector('#song-list').addEventListener('click', (e) => {
    // Remove song from UI
    UI.deleteSong(e.target);
  
    // Remove song from store
    Store.removeSong(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Song Removed', 'success');
  });

  //table sort

function sortTableByColumn(table, column, asc = true) {
	const dirModifier = asc ? 1 : -1;
	const tBody = table.tBodies[0];
	const rows = Array.from(tBody.querySelectorAll("tr"));

	// Sort each row
	const sortedRows = rows.sort((a, b) => {
		const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
		const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

		return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
	});

	// Remove all existing TRs from the table
	while (tBody.firstChild) {
		tBody.removeChild(tBody.firstChild);
	}

	// Re-add the newly sorted rows
	tBody.append(...sortedRows);

	// Remember how the column is currently sorted
	table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".song-table th").forEach(headerCell => {
	headerCell.addEventListener("click", () => {
		const tableElement = headerCell.parentElement.parentElement.parentElement;
		const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
		const currentIsAscending = headerCell.classList.contains("th-sort-asc");

		sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
	});
});


//google map
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    mapId: "800ec5ff7b36733c",
    center: { lat: 39, lng: -95 },
    zoom: 5,
  });

  setMarkers(map);

}
// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
const ghosts = [
  ["Conjuring House", 42.009168, -71.709233, 4],
  ["Mizpah Hotel", 38.068532035504525, -117.23072128773715, 6],
  ["The Sallie House", 39.566756012080944, -95.11503474813685, 5],
  ["Lizzie Borden House", 41.69916647020286, -71.15630127595888, 3],
  ["Crescent Hotel", 36.40824010039, -93.73749410313768, 2],
  ["Eastern State Penitentiary", 39.96852549048321, -75.17269698951766, 1],
  ["Myrtles Plantation", 30.803606326550273, -91.38801147447806, 1],
  ["Ohio State Reformatory", 40.784353072558744, -82.50251318948693, 1],
  ["Pine Barrens", 39.950739973751936, -74.5161783164273, 1],
  ["Queen Mary", 33.75284074284745, -118.19035568973194, 1],
  ["Stanely Hotel", 33.75284074284745, -118.19035568973194, 1],
  ["St. Augustine Lighthouse", 29.88558902225168, -81.28834557635385, 1],
  ["Robert the Doll", 24.552351229723037, -81.75520151881636, 1],
  ["Zak Bagans' Haunted Museum", 24.552351229723037, -81.75520151881636, 1],
  ["Trans-Allegheny Lunatic Asylum", 39.03846263863654, -80.47133310304494, 1],
  ["Whaley House", 32.75296360451483, -117.19462816092731, 1],
  ["Winchester Mystery House", 37.31847682317338, -121.95098473009219, 1],
  ["Waverly Hills Sanatorium", 38.130223344814276, -85.84166071657056, 1],
  ["Lovejoy Cemetary", 38.89030462644567, -90.16588703427985, 1],
  ["Villisca Axe Murder House", 40.93080645055906, -94.97330536064572, 1],
];

function setMarkers(map) {
  // Adds markers to the map.
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  const image = {
    url: "./media/ghost.png",
    scaledSize: { width: 40, height: 52 },
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };

  for (let i = 0; i < ghosts.length; i++) {
    const ghost = ghosts[i];

    new google.maps.Marker({
      position: { lat: ghost[1], lng: ghost[2] },
      map,
      icon: image,
      shape: shape,
      title: ghost[0],
      zIndex: ghost[3],
    });
  }
}


window.initMap = initMap;
