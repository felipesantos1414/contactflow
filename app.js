let contatos = [];

function aviso(msg) {
  const el = document.getElementById('msg');
  el.innerText = msg;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 2000);
}

function copiar(texto) {
  navigator.clipboard.writeText(texto);
  aviso("Copied!");
}

function render(lista) {
  const container = document.getElementById('lista');
  container.innerHTML = '';

  lista.forEach(c => {
    container.innerHTML += `
      <div class="card">
        <div class="tag">${c.tipo}</div>
        <h3>${c.nome}</h3>
        <p>${c.cargo}</p>
        <p><strong>Phone:</strong> ${c.telefone}</p>
        <div class="acoes">
          <button onclick="copiar('${c.telefone}')">Copy</button>
          <a href="https://wa.me/${c.whatsapp}" target="_blank">WhatsApp</a>
        </div>
      </div>
    `;
  });

  document.getElementById('status').innerText = lista.length + " contacts";
}

function filtrar() {
  let busca = document.getElementById('busca').value.toLowerCase();
  let tipo = document.getElementById('tipo').value;

  let filtrados = contatos.filter(c => {
    return (!tipo || c.tipo === tipo) &&
           (c.nome.toLowerCase().includes(busca));
  });

  render(filtrados);
}

document.getElementById('busca').addEventListener('input', filtrar);
document.getElementById('tipo').addEventListener('change', filtrar);

document.getElementById('copiarTodos').onclick = () => {
  let txt = contatos.map(c => c.nome + " - " + c.telefone).join("\n");
  copiar(txt);
};

document.getElementById('limpar').onclick = () => {
  document.getElementById('busca').value = '';
  filtrar();
};

fetch('contatos.json')
  .then(r => r.json())
  .then(data => {
    contatos = data.contatos;
    document.getElementById('ultimaAtualizacao').innerText = data.ultimaAtualizacao;

    document.getElementById('totalContatos').innerText = contatos.length;
    document.getElementById('totalVereadores').innerText = contatos.filter(c=>c.tipo=="vereador").length;
    document.getElementById('totalAssessores').innerText = contatos.filter(c=>c.tipo=="assessor").length;

    render(contatos);
  });