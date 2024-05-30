// Definición de una clase.
class Persona {
    // Definición de constructor
    constructor(rut, nombre, apellido, edad, estatura, peso, especialista) {
        this._rut = rut;
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
        this._estatura = estatura;
        this._peso = peso;
        this._imc = 0;
        this._estado = "";
        this._especialista = especialista;
    }

    // Métodos especificos (GET).
    get rut() {
        return this._rut;
    }
    get nombre() {
        return this._nombre;
    }
    get apellido() {
        return this._apellido;
    }
    get edad() {
        return this._edad;
    }
    get estatura() {
        return this._estatura;
    }
    get peso() {
        return this._peso;
    }
    get imc() {
        return this._imc;
    }
    get estado() {
        return this._estado;
    }

    get especialista(){
        return this._especialista
    }

    setEspecialista(especialista){
        this._especialista = especialista;
    }

    // Otras funciones (Métodos agregados)
    calcIMC() {
        this._imc = (this._peso / Math.pow(this._estatura, 2)).toFixed(3);
        this._estado = this.evaluarEstado();
    }

    evaluarEstado() {
        const imc = parseFloat(this._imc);
        if (imc < 18.5) {
            return "Bajo peso";
        } else if (imc >= 18.5 && imc < 24.9) {
            return "Saludable";
        } else if (imc >= 24.9 && imc < 29.9) {
            return "Sobrepeso";
        } else {
            return "Obeso";
        }
    }

}


class Especialista{
    constructor(rut, nombre, apellido, especialidad){
        this._rut = rut;
        this._nombre = nombre;
        this._apellido = apellido;
        this._especialidad = especialidad;
    }

    get getNombre(){
        return this._nombre;
    }
    get getApellido(){
        return this._apellido;
    }
    get getRut(){
        return this._rut;
    }
    get getEspecialidad(){
        return this._especialidad;
    }

    setNombre(name){
        this._nombre = name;
    }

    setSurname(surname){
        this._apellido = surname;
    }

    setRut(rut){
        this._rut = rut;
    }

    setNombre(espe){
        this._especialidad = espe;
    }
}

let personas = [];
let especialistas = [];

especialistas.push(new Especialista("2-1","Aquiles","Castro","General"));
especialistas.push(new Especialista("2-2", "Juana","De Arco","Kine"));
especialistas.push(new Especialista("2-3","Gregory","House","General"));

let addPersona = function() {
    let rt = document.getElementById("p-rut").value;
    let nom = document.getElementById("p-nom").value;
    let ape = document.getElementById("p-ape").value;
    let edad = parseInt(document.getElementById("p-edad").value);
    let estatura = parseFloat(document.getElementById("p-est").value);
    let peso = parseFloat(document.getElementById("p-peso").value);
    let rutEsp = document.getElementById("p-esp").value;
    let p = new Persona(rt, nom, ape, edad, estatura, peso);
    p.calcIMC();
    let esp = especialistas.find(es => es.getRut === rutEsp);
    p.setEspecialista(esp);
    personas.push(p);
    updateTable();
    alert("Agregado.");
}

function getColorByEstado(estado) {
    switch (estado) {
        case "Bajo peso":
            return "blue";
        case "Saludable":
            return "green";
        case "Sobrepeso":
            return "orange";
        case "Obesidad":
            return "red";
        default:
            return "white";
    }
}

let findPersona = function() {
    let r = document.getElementById("b-rut").value;
    let p = personas.find(per => per.rut === r);
    let color = getColorByEstado(p.estado);
    if (p !== undefined) {
        alert("Persona encontrada");
        document.getElementById("r-rut").innerHTML = "<b>Rut: </b>" + p.rut  + "<br>";
        document.getElementById("r-nombre").innerHTML = "<b>Nombre: </b>" + p.nombre + " " + p.apellido +"<br>";
        document.getElementById("r-edad").innerHTML = "<b>Edad: </b>" + p.edad + " Años." +"<br>";
        document.getElementById("r-estatura").innerHTML = "<b>Estatura: </b>" + p.estatura + " Mt." + "<br>";
        document.getElementById("r-peso").innerHTML = "<b>Peso: </b>" + p.peso + " Kg.";
        document.getElementById("r-imc").innerHTML = "<b>IMC: </b>" + p.imc + ".";
        document.getElementById("r-estado").innerHTML = "<b>Estado: </b>" + "<span style='color:" + color + "'>" + p.estado + "</span>" +"<br>";
        document.getElementById("r-esp").innerHTML = "<span><b>Especialista: </b>"+p.especialista.getNombre+" " + p.especialista.getApellido + "" +"<br>";
    } else {
        alert("Persona no encontrada.");
    }
}

function updateTable() {
    let tbody = document.getElementById('tbody-personas');
    tbody.innerHTML = '';

    personas.forEach(persona => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${persona.rut}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.edad}</td>
            <td>${persona.estatura}</td>
            <td>${persona.peso}</td>
            <td>${persona.imc}</td>
            <td>${persona.estado}</td>
            <td>${persona.especialista.getNombre}</td>
            
        `;
        tbody.appendChild(row);
    });
}
