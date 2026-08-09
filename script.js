const continent = document.querySelector("#continent");

// Calculamos automáticamente la longitud real del trazado
const length = continent.getTotalLength();

continent.style.strokeDasharray = length;
continent.style.strokeDashoffset = length;