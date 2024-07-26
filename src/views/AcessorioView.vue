<script setup>
import { ref, reactive, onMounted } from "vue";
import AcessoriosApi from "@/api/acessorio";
const acessorioApi = new AcessoriosApi();

const defaultAcessorio = { id: null, descricao: "" };
const acessorios = ref([]);
const acessorio = reactive({ ...defaultAcessorio });

onMounted(async () => {
  acessorios.value = await acessorioApi.buscarTodosOsAcessorios();
});

function limpar() {
  Object.assign(acessorio, { ...defaultAcessorio });
}

async function salvar() {
  if (acessorio.id) {
    await acessorioApi.atualizarAcessorio(acessorio);
  } else {
    await acessorioApi.adicionarAcessorio(acessorio);
  }
  acessorios.value = await acessorioApi.buscarTodosOsAcessorios();
  limpar();
}

function editar(acessorio_para_editar) {
  Object.assign(acessorio, acessorio_para_editar);
}

async function excluir(id) {
  await acessorioApi.excluirAcessorio(id);
  acessorios.value = await acessorioApi.buscarTodosOsAcessorios();
  limpar();
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Acessorio</h1>
      <div class="form">
        <input type="text" v-model="acessorio.descricao" placeholder="Descrição" />
      </div>
      <div class="button">
        <button @click="salvar">Salvar</button>
        <button @click="limpar">Limpar</button>
      </div>
      <ul>
        <li v-for="acessorio in acessorios" :key="acessorio.id">
          <span @click="editar(acessorio)">
            ({{ acessorio.id }}) - {{ acessorio.descricao }} -
          </span>
          <button @click="excluir(acessorio.id)">X</button>
        </li>
      </ul>
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: auto;
}
.container{
  display: flex;
  flex-direction: column;
  gap: 1vh;
  justify-content: center;
  align-items: center;
  padding: auto;
  background-color: #333;
  color: white;
  border-radius: 1vh;
  padding: 1vh;
  margin-top: 5vh;
}
input {
  width: 10vw;
  height: 1vh;
  border-radius: 5px;
  border: none;
  padding: 0.5rem;
}

select {
  width: 11vw;
  height: 2vh;
  border-radius: 5px;
  border: none;
  padding: 0.5rem;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5vh;
}
</style>