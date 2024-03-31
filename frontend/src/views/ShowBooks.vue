<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

const props = defineProps({
  id: String,
});

const id = ref(props.id);
const book = ref({});
const loading = ref(false);
const createdTime = ref(null);

watchEffect(async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:5555/books/${id.value}`);
    book.value = { ...response.data };
    createdTime.value = new Date(book.value.createdAt).toString();
  } catch (error) {
    book.value = "Error! Could not reach the API. " + error;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl my-4"></h1>
    <div v-if="loading"><Spinner /></div>
    <div
      v-else
      class="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4"
    >
      <div class="my-4">
        <span class="text-xl mr-4 text-grey-500">ID</span>
        <span>{{ book._id }}</span>
      </div>
      <div class="my-4">
        <span class="text-xl mr-4 text-grey-500">Title</span>
        <span>{{ book.title }}</span>
      </div>
      <div class="my-4">
        <span class="text-xl mr-4 text-grey-500">Author</span>
        <span>{{ book.author }}</span>
      </div>
      <div class="my-4">
        <span class="text-xl mr-4 text-grey-500">Publish Year</span>
        <span>{{ book.publishYear }}</span>
      </div>
      <div class="my-4">
        <span class="text-xl mr-4 text-grey-500">Create Time</span>
        <span>{{ createdTime }}</span>
      </div>
    </div>
  </div>
</template>
