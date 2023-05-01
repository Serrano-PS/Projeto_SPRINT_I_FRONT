/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/valves';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.valves.forEach(item => insertList(item.nome, item.descricao, item.tipo, item.vazao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputDescription, inputType, inputFlowrate) => {
  const formData = new FormData();
  formData.append('nome', inputName);
  formData.append('descricao', inputDescription);
  formData.append('tipo', inputType);
  formData.append('vazao', inputFlowrate);

  let url = 'http://127.0.0.1:5000/valve';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão edit e delete para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let div = document.createElement("div");
  div.className = "buttons-container";

  let editButtonSpan = document.createElement("span");
  let editButtonTxt = document.createTextNode("\u270E");
  editButtonSpan.className = "edit";
  editButtonSpan.appendChild(editButtonTxt);
  div.appendChild(editButtonSpan);

  let deleteButtonSpan = document.createElement("span");
  let deleteButtonTxt = document.createTextNode("\u2716");
  deleteButtonSpan.className = "delete";
  deleteButtonSpan.appendChild(deleteButtonTxt);
  div.appendChild(deleteButtonSpan);

  parent.appendChild(div);

  editButtonSpan.addEventListener('click', function () {
    if (confirm("Você tem certeza que deseja editar?")) {
      const div = this.parentElement.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML;
      let inputName = document.getElementById("newName").value;
      let inputDescription = document.getElementById("newDescription").value;
      let inputType = document.getElementById("newType").value;
      let inputFlowrate = document.getElementById("newFlowrate").value;

      if (inputName === '' || inputDescription === '' || inputType === '') {
        alert("Nome, descrição ou tipo não podem estar vazios");
      } else if (isNaN(inputFlowrate)) {
        alert("Vazão precisa ser preenchido por número!");
      } else {
        div.remove();
        deleteItem(nomeItem);
        insertList(inputName, inputDescription, inputType, inputFlowrate)
        postItem(inputName, inputDescription, inputType, inputFlowrate)
        alert("Editado com sucesso!");
      }
    }
  });
  deleteButtonSpan.addEventListener('click', function () {
    if (confirm("Você tem certeza que deseja remover?")) {
      const div = this.parentElement.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML;
      div.remove();
      deleteItem(nomeItem);
      alert("Removido com sucesso!");
    }
  });
};




/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/valve?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, descrição, tipo e vazão 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputName = document.getElementById("newName").value;
  let inputDescription = document.getElementById("newDescription").value;
  let inputType = document.getElementById("newType").value;
  let inputFlowrate = document.getElementById("newFlowrate").value;

  if (inputName === '' || inputDescription === '' || inputType === '') {
    alert("Nome, descrição ou tipo não podem estar vazios");
  } else if (isNaN(inputFlowrate)) {
    alert("Vazão precisa ser preenchido por número!");
  } else {
    insertList(inputName, inputDescription, inputType, inputFlowrate)
    postItem(inputName, inputDescription, inputType, inputFlowrate)
    alert("Válvula adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir itens na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nome, descricao, tipo, vazao) => {
  var item = [nome, descricao, tipo, vazao]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newName").value = "";
  document.getElementById("newDescription").value = "";
  document.getElementById("newType").value = "";
  document.getElementById("newFlowrate").value = "";

}


(function ($) {
  "use strict";

  /*
    --------------------------------------------------------------------------------------
    Efeito de Loading
    --------------------------------------------------------------------------------------
  */
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();


})(jQuery);