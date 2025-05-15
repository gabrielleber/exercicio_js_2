document.addEventListener("DOMContentLoaded", exibirUsuarios); // Exibir lista ao carregar a página

document.getElementById("CadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email || senha.length < 8) {
        document.getElementById("mensagem").textContent = "Preencha todos os campos corretamente!";
        document.getElementById("mensagem").style.color = "red";
        return;
    }

    const usuario = { nome, email, senha };
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    exibirUsuarios();
    document.getElementById("CadastroForm").reset();
    document.getElementById("mensagem").textContent = "Cadastro realizado com sucesso!";
    document.getElementById("mensagem").style.color = "green";
});

function exibirUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const lista = document.getElementById("usuariosLista");

    if (!lista) {
        return; // Impede erro caso a tabela ainda não tenha sido adicionada ao HTML
    }

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