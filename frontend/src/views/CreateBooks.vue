<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

const title = ref("");
const author = ref("");
const publishYear = ref(null);
const loading = ref(false);

const router = useRouter();

const handleSaveBook = async () => {
  const data = {
    title: title.value,
    author: author.value,
    publishYear: publishYear.value,
  };
  loading.value = true;
  try {
    const response = await axios.post("http://localhost:5555/books/", data);
    if (response.status === 201) {
      router.push({ path: "/" });
    }
  } catch (error) {
    loading.value = false;
    alert("An error occured. Couldn't save data. Please check console" + error);
    console.log(error.response.data);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl my-4">Create Book</h1>
    <div v-if="loading"><Spinner /></div>
    <div
      v-else
      class="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
    >
      <div class="my-4">
        <label class="text-xl mr-4 text-gray-500">Title</label>
        <input
          class="border-2 border-gray-500 px-4 py-2 w-full"
          v-model="title"
          type="text"
        />
      </div>
      <div class="my-4">
        <label class="text-xl mr-4 text-gray-500">Author</label>
        <input
          class="border-2 border-gray-500 px-4 py-2 w-full"
          v-model="author"
          type="text"
        />
      </div>
      <div class="my-4">
        <label class="text-xl mr-4 text-gray-500">Publish Year</label>
        <input
          class="border-2 border-gray-500 px-4 py-2 w-full"
          v-model="publishYear"
          type="number"
        />
      </div>
      <button class="p-2 bg-sky-300 m-8" @click="handleSaveBook">Save</button>
    </div>
  </div>
</template>
