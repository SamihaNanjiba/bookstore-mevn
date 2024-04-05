<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Spinner from "@/components/Spinner.vue";

const props = defineProps({
  id: String,
});

const id = ref(props.id);
const loading = ref(false);

const router = useRouter();

const handleDeleteBook = async () => {
  loading.value = true;
  try {
    const response = await axios.delete(
      `http://localhost:5555/books/${id.value}`
    );
    if (response.status === 200 || response.status === 204) {
      router.push({ path: "/" });
    }
  } catch (error) {
    loading.value = false;
    alert(
      "An error occured. Couldn't delete data. Please check console" + error
    );
    console.log(error.response.data);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl my-4">Delete Book</h1>
    <div v-if="loading"><Spinner /></div>
    <div
      v-else
      class="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto"
    >
      <h3 class="text-2xl">Are you sure you want to delete this book?</h3>
      <button
        class="p-4 bg-red-600 text-white m-8 w-full"
        @click="handleDeleteBook"
      >
        Yes, Delete
      </button>
    </div>
  </div>
</template>
