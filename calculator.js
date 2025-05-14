document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn-calculator");

  // Variabile contenente l'espressione corrente.
  let currentExpression = "";

  // Aggiorna il display; se l'espressione è vuota, mostra "0".
  function updateDisplay() {
    display.textContent = currentExpression || "0";
  }

  // Pre-elabora l'espressione sostituendo i simboli personalizzati con l'equivalente JavaScript,
  // quindi valuta l'espressione. Se si verifica un errore, restituisce "Error".
  function evaluateExpression(expr) {
    try {
      let processed = expr
        .replace(/÷/g, "/")            // √
        .replace(/×/g, "*")            // Moltiplicazione
        .replace(/−/g, "-")            // Sottrazione (simbolo personalizzato)
        .replace(/\^/g, "**")          // Esponenziazione
        .replace(/π/g, "Math.PI")      // Pi greco
        .replace(/sin\(/g, "Math.sin(") // Funzione seno
        .replace(/cos\(/g, "Math.cos(") // Funzione coseno
        .replace(/tan\(/g, "Math.tan(") // Funzione tangente
        .replace(/log\(/g, "Math.log10(")// Logaritmo in base 10
        .replace(/ln\(/g, "Math.log(")  // Logaritmo naturale
        .replace(/√\(/g, "Math.sqrt("); // Radice quadrata
      let result = eval(processed);
      return result;
    } catch (e) {
      return "Error";
    }
  }

  // Gestione dei click: per ogni pulsante si legge il data-value e si aggiorna l'espressione.
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let value = button.getAttribute("data-value");
      if (value === "AC") {
        currentExpression = "";
      } else if (value === "DEL") {
        currentExpression = currentExpression.slice(0, -1);
      } else if (value === "=") {
        let result = evaluateExpression(currentExpression);
        currentExpression = result.toString();
      } else {
        currentExpression += value;
      }
      updateDisplay();
    });
  });

  // Gestione degli eventi di tastiera
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Se l'utente preme "Enter" esegue l'operazione (come "=").
    if (key === "Enter") {
      let result = evaluateExpression(currentExpression);
      currentExpression = result.toString();
      updateDisplay();
      event.preventDefault();
    }
    // "Backspace" rimuove l'ultimo carattere (come "DEL").
    else if (key === "Backspace") {
      currentExpression = currentExpression.slice(0, -1);
      updateDisplay();
      event.preventDefault();
    }
    // "Escape" pulisce l'espressione (come "AC").
    else if (key === "Escape") {
      currentExpression = "";
      updateDisplay();
      event.preventDefault();
    }
    // Se viene premuto un tasto singolo che corrisponde a un numero, un operatore base o caratteri speciali.
    else if (key.length === 1) {
      // Accettiamo i caratteri: numeri, +, -, *, /, ., (, ), e ^.
      const allowedPattern = /[0-9+\-*/().^]/;
      if (allowedPattern.test(key)) {
        currentExpression += key;
        updateDisplay();
        event.preventDefault();
      }
    }
  });

  // Inizializza il display
  updateDisplay();
});
