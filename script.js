function searchFunction() {
    const input = document.getElementById("searchInput").value;
    const year = document.getElementById("yearFilter").value;
    const type = document.getElementById("typeFilter").value;
    const language = document.getElementById("languageFilter").value;

    if (input.trim() === "") {
        alert("Por favor, insira um termo para pesquisar.");
        return false;
    }

    console.log("Pesquisando por: " + input);
    if (year) console.log("Filtrando por Ano: " + year);
    if (type) console.log("Filtrando por Tipo de Artigo: " + type);
    if (language) console.log("Filtrando por Idioma: " + language);

    return false;
}