import { createRouter, createWebHashHistory } from "vue-router";

// 1. Define route components.
// These can be imported from other files
import Home from "@/views/Home.vue";
import CreateBooks from "@/views/CreateBooks.vue";
import DeleteBooks from "@/views/DeleteBooks.vue";
import EditBooks from "@/views/EditBooks.vue";
import ShowBooks from "@/views/ShowBooks.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/", name: "Home", component: Home },
  // { path: "/home", name: "Home", redirect: "/" }, // isn't working, look later
  { path: "/books/create", name: "CreateBooks", component: CreateBooks },
  { path: "/books/delete/:id", name: "DeleteBooks", component: DeleteBooks },
  { path: "/books/edit/:id", name: "EditBooks", component: EditBooks },
  { path: "/books/details/:id", name: "ShowBooks", component: ShowBooks },
  // { path: "/about", name: "About", component: About },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We
  // are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
