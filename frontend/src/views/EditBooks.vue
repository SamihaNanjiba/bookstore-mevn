<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

const props = defineProps({
  id: String,
});

const id = ref(props.id);
const title = ref("");
const author = ref("");
const publishYear = ref(null);
const loading = ref(false);

const router = useRouter();

watchEffect(async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:5555/books/${id.value}`);
    console.log(response);
    if (response.status === 200) {
      title.value = response.data.title;
      author.value = response.data.author;
      publishYear.value = response.data.publishYear;
    }
  } catch (error) {
    alert("An error occurred. Please check console");
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const handleEditBook = async () => {
  const data = {
    title: title.value,
    author: author.value,
    publishYear: publishYear.value,
  };
  loading.value = true;
  try {
    const response = await axios.put(
      `http://localhost:5555/books/${id.value}`,
      data
    );
    if (response.status === 200 || response.status === 204) {
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
    <h1 class="text-3xl my-4">Edit Book</h1>
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
      <button class="p-2 bg-sky-300 m-8" @click="handleEditBook">Save</button>
    </div>
  </div>
</template>
