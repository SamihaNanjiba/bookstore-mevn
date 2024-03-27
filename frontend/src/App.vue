<template>
  <header class="bg-red-400 text-white">
    <div class="wrapper">
      <router-link to="/">Home</router-link>

      <router-link to="/books/create">Create Books</router-link>

      <router-link to="/books/delete">Delete Books</router-link>

      <router-link to="/books/edit">Edit Books</router-link>

      <router-link to="/books/show">Show Books</router-link>
    </div>
  </header>

  <div class="md:container md:mx-auto">
    <router-view></router-view>
  </div>
</template>
