document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    const usuario = { nome, email };
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    exibirUsuarios();
    document.getElementById("cadastroForm").reset();
});

function exibirUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const lista = document.getElementById("usuariosLista");

    lista.innerHTML = "";

    usuarios.forEach((usuario, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td><button class="delete" onclick="removerUsuario(${index})">Excluir</button></td>
        `;

        lista.appendChild(row);
    });
}

function removerUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    exibirUsuarios();
}

document.addEventListener("DOMContentLoaded", exibirUsuarios);