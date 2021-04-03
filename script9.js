const bckgrds = document.querySelectorAll("#header img");
const boxy = document.querySelectorAll('#boxes .kont div.block p');
const bckform = document.querySelector('#form img.mid');
const arraybform = new Array(3);
let matrixbf = window.getComputedStyle(bckform).getPropertyValue('transform');
let matrixbfValues = matrixbf.match(/matrix.*\((.+)\)/)[1].split(', ');
const button = document.querySelector("#header button");
const formularz = document.querySelector("#form .kont");
arraybform[0] = matrixbfValues[4];
arraybform[1] = matrixbfValues[5];
arraybform[2] = matrixbfValues[0];
let index = 0;
let lenght = bckgrds.length;
let array = new Array(lenght);
let arraybox = new Array(3);

//tworzenie tablic dwuwymiarowych dla bcgrds
for (var i = 0; i < array.length; i++) {
  array[i] = new Array(3);
}

//tworzenie tablic dwuwymiarowych dla boxów
for (var i = 0; i < 3; i++) {
  arraybox[i] = new Array(2);
}

//pobieranie wartosci z cssa
for (index; index < lenght; index++) {
  let matrix = window.getComputedStyle(bckgrds[index]).getPropertyValue('transform');
  if (matrix == "none") {
    array[index][0] = 0;
    array[index][1] = 0;
    array[index][2] = 0;
  } else {
    let matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
    array[index][0] = matrixValues[4];
    array[index][1] = matrixValues[5];
    array[index][2] = matrixValues[0];
  }
}
for (var i = 0; i < 3; i++) {
  let matrixb = window.getComputedStyle(boxy[i]).getPropertyValue('transform');
  let matrixbValues = matrixb.match(/matrix.*\((.+)\)/)[1].split(', ');
  arraybox[i][0] = matrixbValues[4];
  arraybox[i][1] = matrixbValues[5];
}

//zmiana wartości boxów i bcgrds  
function boxyitla() {
  index = 0;
  for (index; index < lenght; index++) {
    let posy = window.pageYOffset * bckgrds[index].dataset.sila;
    posy = +posy + +array[index][1];
    bckgrds[index].style.transform = "translate3d(" + array[index][0] + "px, " + posy + "px, 0px)";
    if (index == 4 || index == 3) {
      bckgrds[index].style.transform = "translate3d(" + array[index][0] + "px, " + posy + "px, 0px) scale(" + array[index][2] + ")";
    }

  }
  if (window.pageYOffset * 0.9 > boxy[1].offsetHeight + +boxy[1].getBoundingClientRect().top) {
    for (var i = 0; i < 3; i++) {
      let posby = ((boxy[1].offsetHeight + +boxy[1].getBoundingClientRect().top) - window.pageYOffset * 0.4) * (0.04);
      posby = +posby + +arraybox[i][1];
      boxy[i].style.transform = "translate3d(" + arraybox[i][0] + "px, " + posby + "px, 0px)";
    }
    let posbfy = ((bckform.offsetHeight + +bckform.getBoundingClientRect().top) - window.pageYOffset * (0.02)) * (0.1);
    posbfy = +posbfy + +arraybform[1];
    bckform.style.transform = "translate3d(" + arraybform[0] + "px, " + posbfy + "px, 0px) scaleX(" + arraybform[2] + ")";
  }
}

//event listener dla scrolla
window.addEventListener("scroll", boxyitla);
const aboutp = document.querySelector("#about p");
const aboutship = document.querySelector("#about img.shipa");


window.addEventListener("scroll", function (e) {
  //pojawianie sie guzika w #header 
  if (button.getBoundingClientRect().top < 150) {
    button.classList.add("hide");
  } else {
    button.classList.remove("hide");
  }
});

//pojawianie sie statku w #about
window.addEventListener("scroll", function (e) {

  if (aboutp.getBoundingClientRect().top - aboutp.offsetHeight < (screen.height / 3.5)) {
    aboutp.classList.remove("hide");
    aboutship.classList.remove("hide");

  } else {
    aboutp.classList.add("hide");
    aboutship.classList.add("hide");
  }
});

//przeniesienie do formularza 
button.addEventListener("click", function () {
  let toTop = (formularz.getBoundingClientRect().top + window.scrollY);
  window.scrollTo(0, toTop);
});
const form = document.querySelector("#form form");


//obiekt tworzony z formularza
class Dane {
  constructor(im, roz, ci, dod) {
    this.imie = im;
    this.rozmiar = roz;
    this.ciag = ci;
    this.dodatki = dod;
  }
};

//event listener dla formularza
form.addEventListener("submit", function (e) {

  //zapobieganie wysłania i przeładowania strony 
  e.preventDefault();
  
  const imie = document.getElementById("imie").value;
  const rozmiar = document.querySelector('form input[name="rozmiar"]:checked').value;
  const ciag = document.querySelector('form input[name="moc"]:checked').value;
  const dodatki = document.querySelectorAll('form input[name="dodatki"]:checked');
  dodval = [];
  for (i = 0; i < dodatki.length; i++) {
    dodval.push(dodatki[i].value);
  }



  //tworzenie nowego obiektu na podstawie formularza
  let user = new Dane(imie, rozmiar, ciag, dodval);
  console.log(user.imie + " " + user.rozmiar, +" " + user.ciag + " " + user.dodatki);

  //dodanie obiektu do local storage
  localStorage.setItem(user.imie, JSON.stringify(user));
  let komunikat = `Dziękujemy za wykonanie zamówienia!\nImie: ${user.imie}\nWielkość: ${document.querySelector('form input[name="rozmiar"]:checked').parentNode.innerText}\nCiąg pocz.: ${document.querySelector('form input[name="moc"]:checked').parentNode.innerText}\nDodatki: ${user.dodatki}`;
  form.reset();
  alert(komunikat);
});

//czyszczenie danych z obiektów
async function clear() {
  for (var j = 0; j < lenght; j++) {
    bckgrds[j].removeAttribute("style");
  }
  for (var k = 0; k < 3; k++) {
    boxy[k].removeAttribute("style");
  }
  bckform.removeAttribute("style");
  console.log("zrobione usuniecie");
}

//przesunięcie do góry 
async function scrollToTop() {
  clear();
  console.log("zrobione clear");
}
const body = document.querySelector("body");
//ponowne pobranie danych po zmianie rozmiarów okna
async function rezise() {
  await scrollToTop();

  //blokada scrolla na czas zmiany rozmiaru okna i pobrania danych
  body.style.overflow = "hidden";
  setTimeout(function () {
    for (var j = 0; j < lenght; j++) {
      matrix = window.getComputedStyle(bckgrds[j]).getPropertyValue('transform');
      if (matrix == "none") {
        array[j][0] = 0;
        array[j][1] = 0;
        array[j][2] = 0;
      } else {
        matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
        array[j][0] = matrixValues[4];
        array[j][1] = matrixValues[5];
        array[j][2] = matrixValues[0];
      }
    }
    for (var k = 0; k < 3; k++) {
      matrixb = window.getComputedStyle(boxy[k]).getPropertyValue('transform');
      matrixbValues = matrixb.match(/matrix.*\((.+)\)/)[1].split(', ');
      arraybox[k][0] = matrixbValues[4];
      arraybox[k][1] = matrixbValues[5];
    }
    matrixbf = window.getComputedStyle(bckform).getPropertyValue('transform');
    matrixbfValues = matrixbf.match(/matrix.*\((.+)\)/)[1].split(', ');
    arraybform[0] = matrixbfValues[4];
    arraybform[1] = matrixbfValues[5];
    arraybform[2] = matrixbfValues[0];
    console.log("zrobione style");
  }, 700);

  setTimeout(function () {
    body.style.overflow = "visible";
  }, 800);

}

//event listenera dla zmiany rozmiary okna
window.addEventListener('resize', function () {
  rezise();
});

//PANEL ADMINA
const buttonadm = document.querySelector("#form div.panel");
const paneladm = document.querySelector("#zamowienia");
const paneladmKont = document.querySelector("#zamowienia div.kont");
const buttonclose = document.querySelector("#zamowienia div.close");
const areazam = document.querySelector("#zamowienia textarea");
const numerZam = document.querySelector("#zamowienia div.numer input");
const numerButton = document.querySelector("#zamowienia div.numer button");
const zamImie = document.querySelector("#zamowienia input[name='imiez']");
const zamRozm = document.querySelector("#zamowienia input[name='rozmiarz']");
const zamSila = document.querySelector("#zamowienia input[name='silaz']");
const zamDodatki = document.querySelector("#zamowienia input[name='dodaz']");
const polaButtonOk = document.querySelector("#zamowienia div.pola button.ok");
const polaButtonUsun = document.querySelector("#zamowienia div.pola button.usun");
let klucze;
let daneStorage = [];

//aktualizacja danych w polu podgladu
function DaneZam() {
  daneStorage = [];
  areazam.textContent = "";
  paneladm.classList.add("on");
  klucze = Object.keys(localStorage);
  let klucz;
  var i = 0;
  for (; klucz = klucze[i]; i++) {
    daneStorage.push(i + ": " + localStorage.getItem(klucz));
  }
  areazam.textContent = daneStorage.join("\n");
}

//przycisk otwarcia panelu
buttonadm.addEventListener("click", function () {
  setTimeout(function () {
    window.scrollTo(0, paneladmKont.getBoundingClientRect().top + window.scrollY);
  },1);
  DaneZam();
  body.style.overflow = "hidden";
});

//przycisk zamkniecia panelu
buttonclose.addEventListener("click", function () {
  paneladm.classList.remove("on");
  body.style.overflow = "visible";
});
let daneEdit = new Dane();
let numer;

//przycisk pobrania elementu do edycji
numerButton.addEventListener("click", function () {
  numer = Number(numerZam.value);
  daneEdit = JSON.parse(localStorage.getItem(klucze[numer]));
  zamImie.value = daneEdit.imie;
  zamRozm.value = daneEdit.rozmiar;
  zamSila.value = daneEdit.ciag;
  zamDodatki.value = daneEdit.dodatki;
  alert("Pomyślnie wczytano zamówienie!");
});

//przycisk potwierdzenia aktualizacji
polaButtonOk.addEventListener("click", function () {
  daneEdit.imie = zamImie.value;
  daneEdit.rozmiar = zamRozm.value;
  daneEdit.ciag = zamSila.value;
 daneEdit.dodatki = zamDodatki.value.replace(/\s+/,"").split(",");
  localStorage.setItem(klucze[numer], JSON.stringify(daneEdit));
  DaneZam();
  alert("Pomyślnie zmieniono dane zamówienia!");
});

//przycisk potwierdzenia usuniecia
polaButtonUsun.addEventListener("click", function () {
  localStorage.removeItem(klucze[numer]);
  DaneZam();
  zamImie.value = "";
  zamRozm.value = "";
  zamSila.value = "";
  zamDodatki.value = "";
  alert("Pomyślnie usunięto zamówienie!");
});
