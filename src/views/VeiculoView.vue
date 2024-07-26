<script setup>
import { ref, reactive, onMounted } from "vue";
import VeiculosApi from "@/api/veiculo";
import ModelosApi from "@/api/modelo";
import CoresApi from "@/api/cor";
import AcessoriosApi from "@/api/acessorio";

const veiculosApi = new VeiculosApi();
const modelosApi = new ModelosApi();
const coresApi = new CoresApi();
const acessoriosApi = new AcessoriosApi();  

const defaultVeiculo = { id: null, modelo: null, cor: null, ano: null, preco: null, acessorios: [] };
const veiculos = ref([]);
const veiculo = reactive({ ...defaultVeiculo });

const modelos = ref([]);
const cores = ref([]);
const acessorios = ref([]);



onMounted(async () => {
  modelos.value = await modelosApi.buscarTodosOsModelos();
  cores.value = await coresApi.buscarTodasAsCores();
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
});

function limpar() {
  Object.assign(veiculo, { ...defaultVeiculo });
}

async function salvar() {
  if (veiculo.id) {
    await veiculosApi.atualizarVeiculo(veiculo);
  } else {
    await veiculosApi.adicionarVeiculo(veiculo);
  }
  veiculo.value = await veiculosApi.buscarTodosOsVeiculos();
  limpar();
}

function editar(veiculo_para_editar) {
  Object.assign(veiculo, veiculo_para_editar);
}

async function excluir(id) {
  await veiculosApi.excluirVeiculo(id);
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  limpar();
}
</script>

<template>
  <main>
    <h1>Veiculo</h1>
  <div class="form">
    <select v-model="veiculo.modelo">
    <option value="" selected disabled>Categorias</option>
    <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">{{ modelo.nome }}</option>
    </select>
    <select v-model="veiculo.cor">
    <option value="" selected disabled>Cores</option>
    <option v-for="cor in cores" :key="cor.id" :value="cor.id">{{ cor.descricao }}</option>
    </select> 
    <input type="number" v-model="veiculo.ano">
    <input type="number" v-model="veiculo.preco">
    <select v-model="veiculo.acessorios" multiple>
    <option value="" selected disabled>Acessorios</option>
    <option v-for="acessorio in acessorios" :key="acessorio.id" :value="acessorio.id">{{ acessorio.descricao }}</option>
    </select> 
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <ul>
    <li v-for="veiculo in veiculos" :key="veiculo.id">
      <span @click="editar(veiculo)">
        ({{ veiculo.id }}) - {{ veiculo.modelo }} - {{ veiculo.cor }} - {{ veiculo.ano }} - {{ veiculo.preco }} - {{ veiculo.acessorios }}  
      </span>
      <button @click="excluir(veiculo.id)">X</button>
    </li>
  </ul>
  </main>
</template>

<style scoped>
/* main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: auto;
}
.form{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: #333;
  width: 20vw;
  margin-top: 10vh;
  border-radius: 10px;
  box-shadow: #333 0px 0px 10px;
  color: white;
  padding: auto;
} */
input{
  width: 10vw;
  height: 1vh;
  border-radius: 5px;
  border: none;
  padding: 0.5rem;
}
select{
  width: 11vw;
  height: 2vh;
  border-radius: 5px;
  border: none;
  padding: 0.5rem;
}
</style>
