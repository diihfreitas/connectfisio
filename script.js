async function searchFunction() {
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

    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "<p>Carregando resultados...</p>";

    try {
        let resultsHTML = "";

        const scieloResponse = await fetch(`https://api.scielo.org/search?query=${input}&year=${year}&type=${type}&lang=${language}`);
        const scieloData = await scieloResponse.json();
        resultsHTML += "<h3>Resultados SciELO</h3><ul>";
        scieloData.results.forEach(article => {
            resultsHTML += `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`;
        });
        resultsHTML += "</ul>";

        const pubmedResponse = await fetch(`https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pubmed/?format=json&term=${input}&year=${year}`);
        const pubmedData = await pubmedResponse.json();
        resultsHTML += "<h3>Resultados PubMed</h3><ul>";
        pubmedData.results.forEach(article => {
            resultsHTML += `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`;
        });
        resultsHTML += "</ul>";

        const medlineResponse = await fetch(`https://api.medlineplus.gov/v1/search?query=${input}&year=${year}&lang=${language}`);
        const medlineData = await medlineResponse.json();
        resultsHTML += "<h3>Resultados MedLine</h3><ul>";
        medlineData.results.forEach(article => {
            resultsHTML += `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`;
        });
        resultsHTML += "</ul>";

        resultsContainer.innerHTML = resultsHTML;

    } catch (error) {
        console.error("Erro ao buscar dados das APIs:", error);
        resultsContainer.innerHTML = "<p>Erro ao carregar os resultados. Tente novamente mais tarde.</p>";
    }

    return false;
}
