import { createWebHistory, createRouter } from "vue-router";
import TicTacToe from '@/components/Classic/TicTacToe.vue'
import TicTacToeSquared from '@/components/Squared/TicTacToeSquared.vue'
import NotFound from "@/components/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: TicTacToeSquared,
  },
  {
    path: "/TicTacToe",
    name: "Tic Tac Toe",
    component: TicTacToe,
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