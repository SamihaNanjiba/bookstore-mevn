<script setup>
import { ref, onMounted, watchEffect } from "vue";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import { PencilIcon } from "@heroicons/vue/24/outline";
import { TrashIcon } from "@heroicons/vue/24/outline";

const books = ref([]);
const loading = ref(false);

watchEffect(async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:5555/books");
    books.value.push(...response.data.data);
  } catch (error) {
    books.value = "Error! Could not reach the API. " + error;
  } finally {
    loading.value = false;
  }
});

onMounted(() => {
  console.log(`the component is now mounted.`);
});
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl my-8">Books List</h1>
      <router-link to="/books/create">
        <PlusCircleIcon class="h-5 w-5 text-sky-800" />
      </router-link>
    </div>
    <div v-if="loading"><Spinner /></div>
    <div v-else>
      <table class="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th class="border border-slate-600 rounded-md">No</th>
            <th class="border border-slate-600 rounded-md">Title</th>
            <th class="border border-slate-600 rounded-md max-md:hidden">
              Author
            </th>
            <th class="border border-slate-600 rounded-md max-md:hidden">
              Publish Year
            </th>
            <th class="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody v-for="(book, index) in books">
          <tr class="h-8">
            <td class="border border-slate-700 rounded-md text-center">
              {{ index + 1 }}
            </td>
            <td class="border border-slate-700 rounded-md text-center">
              {{ book.title }}
            </td>
            <td
              class="border border-slate-700 rounded-md text-center max-md:hidden"
            >
              {{ book.author }}
            </td>
            <td
              class="border border-slate-700 rounded-md text-center max-md:hidden"
            >
              {{ book.publishYear }}
            </td>
            <td class="border border-slate-700 rounded-md text-center">
              <div class="flex justify-center gap-x-4">
                {{ book.id }}
                <router-link
                  :to="{ name: 'ShowBooks', params: { id: book._id } }"
                >
                  <InformationCircleIcon class="h-5 w-5 text-green-800" />
                </router-link>
                <router-link
                  :to="{ name: 'EditBooks', params: { id: book._id } }"
                >
                  <PencilIcon class="h-5 w-5 text-yellow-600" />
                </router-link>
                <router-link
                  :to="{ name: 'DeleteBooks', params: { id: book._id } }"
                >
                  <TrashIcon class="h-5 w-5 text-red-600" />
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
