fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => response.json())
    .then(data => {
        const ufSelect = document.getElementById('ufSelect');
        data.sort((a, b) => a.nome.localeCompare(b.nome));
        data.forEach(uf => {
            const option = document.createElement('option');
            option.value = uf.sigla;
            option.textContent = uf.nome;
            ufSelect.appendChild(option);
        });
    });

document.getElementById('ufSelect').addEventListener('change', function () {
    const uf = this.value;
    if (uf) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
            .then(response => response.json())
            .then(data => {
                const municipiosContainer = document.getElementById('municipiosContainer');
                municipiosContainer.innerHTML = '';

                const columns = [[], [], []];
                data.forEach((municipio, index) => {
                    columns[index % 3].push(municipio.nome);
                });

                columns.forEach((columnData, columnIndex) => {
                    const columnDiv = document.createElement('div');
                    columnDiv.classList.add('column');
                    if (columnIndex !== 0) {
                        columnDiv.style.borderLeft = '1px solid #ff6600';
                    }
                    columnData.forEach(nome => {
                        const municipioDiv = document.createElement('div');
                        municipioDiv.classList.add('municipio');
                        municipioDiv.textContent = nome;
                        columnDiv.appendChild(municipioDiv);
                    });
                    municipiosContainer.appendChild(columnDiv);
                });
            });
    } else {
        document.getElementById('municipiosContainer').innerHTML = '';
    }
});