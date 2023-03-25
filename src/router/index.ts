import { createWebHistory, createRouter } from "vue-router";
import TicTacToe from '@/components/Classic/TicTacToeGame.vue'
import TicTacToeSquared from '@/components/Squared/TicTacToe2Game.vue'
import SOS from '@/components/SOS/SosGame.vue'
import Notakto from '@/components/Notakto/NotaktoGame.vue'
import WildTicTacToe from '@/components/Wild/WildTicTacToeGame.vue'
import NotFound from "@/components/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: TicTacToe,
  },
  {
    path: "/TicTacToeSquared",
    name: "Tic Tac Toe Squared",
    component: TicTacToeSquared,
  },
  {
    path: "/TicTacToe",
    name: "Tic Tac Toe",
    component: TicTacToe,
  },
  {
    path: "/SOS",
    name: "SOS",
    component: SOS,
  },  
  {
    path: "/Notakto",
    name: "Notakto",
    component: Notakto,
  },
  {
    path: "/WildTicTacToe",
    name: "WildTicTacToe",
    component: WildTicTacToe,
  },
  {
    path: '/:pathMatch(.*)*',
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;