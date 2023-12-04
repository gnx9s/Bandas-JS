async function searchBand() {
    const input = document.getElementById('input').value;

    if (input.trim() === '') {
        alert('Por favor, insira o nome de uma banda');
        return;
    }

    try {
        const response = await fetch(`https://musicbrainz.org/ws/2/artist?fmt=json&query=${input}`);
        if (response.ok) {
            const data = await response.json();

            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = '';

            if (data.artists.length === 0) {
                resultadoDiv.innerHTML = 'Nenhuma banda encontrada';
            } else {
                const artist = data.artists[0];

                const bandInfo = document.createElement('div');
                bandInfo.id = 'banda'
                bandInfo.innerHTML = `
            <h2>${artist.name}</h2>
            <p>País de origem: ${artist.country ? artist.country : 'N/A'}</p>
            <p>Data de formação: ${artist['life-span'] && artist['life-span'].begin ? artist['life-span'].begin : 'N/A'}</p>
            <p>Membros: ${artist.members ? artist.members.length : 'N/A'}</p>
            <hr>
          `;
                resultadoDiv.appendChild(bandInfo);
            }
        } else {
            alert('Erro ao buscar a banda. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Ocorreu um erro ao buscar a banda:', error);
        alert('Ocorreu um erro ao buscar a banda. Tente novamente mais tarde.');
    }
}

document.getElementById("input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita o comportamento padrão de submissão do formulário
      searchBand(); // Chama a função de busca quando "Enter" é pressionado
    }
  });
