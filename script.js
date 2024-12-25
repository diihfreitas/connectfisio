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

try {

    const scieloResponse = await fetch(`https://api.scielo.org/search?query=${input}&year=${year}&type=${type}&lang=${language}`);
    const scieloData = await scieloResponse.json();
    console.log("Resultados SciELO:", scieloData);

    const pubmedResponse = await fetch(`https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pubmed/?format=json&term=${input}&year=${year}`);
    const pubmedData = await pubmedResponse.json();
    console.log("Resultados PubMed:", pubmedData);

    const medlineResponse = await fetch(`https://api.medlineplus.gov/v1/search?query=${input}&year=${year}&lang=${language}`);
    const medlineData = await medlineResponse.json();
    console.log("Resultados MedLine:", medlineData);

} catch (error) {
    console.error("Erro ao buscar dados das APIs:", error);
}

return false;