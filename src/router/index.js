import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriaView from "../views/CategoriaView.vue";
import AcessorioView from "../views/AcessorioView.vue";
import CorView from "../views/CorView.vue";
import MarcaView from "../views/MarcaView.vue";
import ModeloView from "../views/ModeloView.vue";
import VeiculoView from "../views/VeiculoView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/categorias",
      name: "categorias",
      component: CategoriaView,
    },
    {
      path: "/acessorio",
      name: "acessorios",
      component: AcessorioView,
    },
    {
      path: "/cor",
      name: "cores",
      component: CorView,
    },
    {
      path: "/marca",
      name: "marcas",
      component: MarcaView,
    },
    {
      path: "/modelo",
      name: "modelos",
      component: ModeloView,
    },
    {
      path: "/veiculo",
      name: "veiculos",
      component: VeiculoView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    }
  ],
});

export default router;
