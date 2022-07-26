
    let palabras = ["felino", "roedor", "alura", "serpiente", "elefante", "laguna", "resultado", "variante",];
    let imagenes = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];

    let imgPos = 0;
    
    let palabra = "";
    let respuesta = "";
    
    let fallos = 0;
    let iniciado = false;
    let hayNuevaPalabra = false;

    function mostrarPanel(panel) {
        document.getElementById("panel0").style.display = 'none';
        document.getElementById("panelA").style.display = 'none';
        document.getElementById("panelB").style.display = 'none';
        document.getElementById("panelC").style.display = 'none';
        document.getElementById("panelD").style.display = 'none';

        document.getElementById(panel).style.display = 'flex';
    }

    function inicializarValores() {
        imgPos = 0;
        palabra = "";
        respuesta = "";
        fallos = 0;
        iniciado = false; 

        document.getElementById("secGuiones").innerHTML = "";
        document.getElementById("btnAbandonar").style.display = 'none';
        document.getElementById("btnIniciar").style.display = 'block';
        document.getElementById("palabraCorrecta").textContent="";

        colocarImagen(0); 
    }

    function iniciarJuego() {
        inicializarValores();

        mostrarPanel("panelA");

        iniciado = true;
        let indice = Math.floor(Math.random() * palabras.length);

        if (hayNuevaPalabra) {
            indice = palabras.length - 1;
            hayNuevaPalabra = false;
        }

        palabra = palabras[indice];
        console.log("lista de palabras: ", palabras)
        console.log("indice: ", indice);
        console.log("palabra: ", palabra);

        dibujarGuiones(palabra);

        document.getElementById("btnAbandonar").style.display = 'block';
        document.getElementById("btnIniciar").style.display = 'none';        
    }

    function finalizarJuego() {
        if(confirm("¿Estás seguro que deseas Finalizar el Juego?")) {
            limpiarTeclado();
            inicializarValores();
            mostrarPanel("panel0");
        }
    }

    function dibujarTeclado() {
        for(let code=65; code <= 90; code++){
            let btn = document.createElement("button");
            let letra = String.fromCharCode(code);
            btn.innerHTML = letra;
            btn.classList.add("tecla");
            btn.classList.add("teclaActiva");
            btn.onclick = function() {
                console.log(letra);
                if (iniciado) {
                    validarLetra(letra);
                    btn.classList.remove('teclaActiva');
                    btn.classList.add("teclaInactiva");
                } else {
                    alert("Presione el botón Iniciar Juego.");
                }
            };
            document.getElementById("teclado").appendChild(btn);
        }
    }

    function limpiarTeclado() {
        console.log("Limpiando teclado");
        let elementos = document.getElementsByClassName("teclaInactiva");
        
        while(elementos.length > 0) {
            // console.log("elementos", elementos[0]);
            elementos[0].classList.add("teclaActiva");
            elementos[0].classList.remove('teclaInactiva');
        }       
    }

    function dibujarGuiones(palabra) {
        for(let i=0; i < palabra.length; i++) {
            respuesta += "-";
        }

        document.getElementById("secGuiones").innerHTML = respuesta;
    }

    function validarLetra(letra) {

        if (iniciado) {
            let texto = "";
            let acierto = false;
            for(let i=0; i < palabra.length; i++) {
                if (letra === palabra[i].toUpperCase()) {
                    texto += letra;
                    acierto = true;
                } else {
                    texto += respuesta[i];
                }
            }

            respuesta = texto;

            document.getElementById("secGuiones").innerHTML = respuesta;

            if (!acierto) {
                if (fallos < (imagenes.length - 1) ) {
                    colocarImagen(++fallos);
                } else {
                    // PERDISTE
                    iniciado = false;
                    document.getElementById("palabraCorrecta").textContent=palabra;
                    mostrarPanel("panelD");
                }
                
            } else {
                if (respuesta.indexOf("-") < 0) {
                    // GANASTE
                    iniciado = false;
                    mostrarPanel("panelC");
                }
            }

        } else {
            alert("Presione el botón Iniciar Juego");
        }
    }

    function colocarImagen(indice) {
        document.getElementById("ahorcado").src = indice + ".png"
    }

    function abrirAgregarPalabra() {
        mostrarPanel("panelB");
    }

    function cerrarAgregarPalabra() {
        document.getElementById("nuevaPalabra").value = "";
        mostrarPanel("panel0");
    }

    function agregarPalabra() {
        let errores = false;
        const pattern = new RegExp('^[A-Z]+$', 'i');
        let msg = "Se detectaron los siguientes errores: ";

        let palabraNueva = document.getElementById("nuevaPalabra").value;

        if (palabraNueva.length < 6) {
            errores = true;
            msg += "\n\t* La palabra debe ser mayor a 6 letras."
        }

        if (!pattern.test(palabraNueva)) {
            errores = true;
            
            msg += "\n\t* La palabra debe contener solo letras de la A a la Z."
        }

        if (errores) {
            alert(msg);
        } else {            
            palabras.push(palabraNueva);
            console.log(palabraNueva);
            cerrarAgregarPalabra();
            hayNuevaPalabra = true;
        }
    }

    function listarPalabras() {
        palabras.forEach(function(elemento){
            console.log(elemento);
        });
    }

    function volveraJugar() {
        limpiarTeclado();
        inicializarValores();
        mostrarPanel("panel0");
    }