<template>
    <v-app>
    <books-table/>
    </v-app>
</template>

<script>
import BooksTable from './elements/BooksTable'

export default {
  name: 'BooksList',
  components: {BooksTable}
}
</script>

<style scoped>

</style>
