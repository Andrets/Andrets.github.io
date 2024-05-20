<script setup>
  defineProps({
    user: Object
  })
</script>

<template>
  <ol>
    <li v-for="file in user.files">
      {{file.name}}
      <a :href="file.url">Download a file</a>
    </li>
    <li>Username: {{user.username}}</li>
    <li>Email: {{user.email}}</li>
    <li>First name: {{user.first_name}}</li>
    <li>Last name: {{user.last_name}}</li>
    <li>ID: {{user.id}}</li>
  </ol>
</template>

<style scoped>

</style>