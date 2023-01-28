# TRZ-The-Resident-Zombie---Backend
<p>Sistema de controle de novas infecções e compartilhar recursos entre membros.</p>

<h2>Comandos</h2>
<p>npm install</p>
<p>npm start</p>

<h2>Porta utilizada para o servidor</h2>
<p>8082</p>

<h2>Requisições aceitas pelo sistema</h2>

<h3>(PPOST)localhost:8082/sobrevivente/cadastrarsobrevivente</h3>
<p>Observação: As aspas(") dos dados de entrada devem ser utilazas de acordo com os informados e exemplos<p><br>
<p>Cadastra novo sobrevivente</p>
<p>Dados de entrada:<br>
{<br>
  "nome": "nome do sobrevivente",<br>
  "idade": idade do sobrevivente,<br>
  "genero": "genero do sobrevivente",<br>
  "latitude": latitude,<br>
  "longitude": longitude<br>
}<br>
Expecificações: <br>
Idade deve ser maior ou igual a 0
Genero do sobrevivente deve ser ["M", "F" ou "NB"]<br>
latitude deve estar entre os intervalos de [-90 a 90]<br>
Longitude deve estar entre os intervalos de [-180 a 180]<br>
</p>
<br>

<h3>localhost:8082/sobrevivente/listar</h3>
<p>Lista os sobrevivente(não infectados)</p>
<br>

<h3>(PUT)localhost:8082/sobrevivente/alterarlocal</h3>
<p>Altera latitude e longitude do sobrevivente informado</p>
<p>Dados de entrada:<br>
{<br>
  "id": "id do sobrevivente",
	"latitude": latitude,
  "longitude": longitude
}<br>
Expecificações: <br>
latitude deve estar entre os intervalos de [-90 a 90]<br>
Longitude deve estar entre os intervalos de [-180 a 180]<br>
</p>
<br>

<h3>(GET)localhost:8082/sobrevivente/percentualinfectados</h3>
<p>Retorna o percentual de infectados</p>
<br>

<h3>(GET)localhost:8082/sobrevivente/percentualinfectados</h3>
<p>Retorna o percentual de não infectados</p>
<br>

<h3>(POST)localhost:8082/item/cadastroitem</h3>
<p>Cadastra novo item relacionado a um sobrevivente</p>
<p>Dados de entrada:<br>
{<br>
  "nome": "nome do item",<br>
  "quantidade": quantidade de item,<br>
  "descricao": "descrição",<br>
  "idSobrevivente":  "id do sobrevivente"<br>
}<br>
<br>

<h3>(GET)localhost:8082/item/listaritem</h3>
<p>Retorna uma lista de itens dos sobreviventes</p>
<br>

<h3>(GET)localhost:8082/item/listatodositens</h3>
<p>Retorna uma lista de todos os itens atualmente cadastrados(de infectados ou não)</p>
<br>

<h3>(GET)localhost:8082/item/procuraritem</h3>
<p>Retorna uma lista de itens de um sobrevivente</p>
{<br>
  "id": "id do sobrevivente",<br>
}<br>
<br>

<h3>(PUT)localhost:8082/item/alteraritem</h3>
<p>Altera dados do item</p>
<p>Dados de entrada:<br>
{<br>
  "id": "id do item"<br>
  "nome": "nome do item",<br>
  "quantidade": quantidade de item,<br>
  "descricao": "descrição",<br>
}<br>
<br>

<h3>(DELETE)localhost:8082/item/deletaritem</h3>
<p>Deleta o item</p>
<p>Dados de entrada:<br>
{<br>
  "id": "id do item"<br>
}<br>
<br>

<h3>(GET)localhost:8082/item/listaritemperdidos</h3>
<p>Retorna uma lista de itens que foram perdidos por um sobrevivente infectado</p>
<br>

<h3>(GET)localhost:8082/item/totalitenssobrevivente</h3>
<p>Retorna o total de itens de um sobrevivente</p>
{<br>
  "id": "id do item",<br>
}<br>
<br>

<h3>(GET)localhost:8082/item/totalitens</h3>
<p>Retorna uma lista com itens com algumas informações</p>
<br>

<h3>(POST)localhost:8082/denuncia/denunciarsobrevivente</h3>
<p>Cadastra uma denuncia de um infectado (Apos a quinta denuncia o sobrevivente é considerado infectado)</p>
<p>Dados de entrada:<br>
{<br>
	"denunciante": "id do sobrevivente denunciante",<br>
	"denunciado": "id do sobrevivente possivelmente infetado"<br>
}<br>
<br>

<h3>(GET)localhost:8082/denuncia/listardenuncias</h3>
<p>Lista todas as denuncias feitas</p>
<br>

<h3>(GET)localhost:8082/denuncia/countdenunciado</h3>
<p>Retorna o total de denuncias que foral feitas a determinado sobrevivente</p>
{<br>
  "denunciado": "id do sobrevivente",<br>
}<br>
<br>
