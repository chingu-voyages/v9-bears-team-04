<template>
    <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="primary">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-actions class="justify-center dark subheading">
        &copy;{{ date }} — <strong>Bookstore</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>
<script>
let d = new Date()
export default {
  name: 'Footer',
  data: () => ({
    date: d.getFullYear(),
    icons: [
      'fa fa-facebook',
      'fa fa-twitter',
      'fa fa-google',
      'fa fa-linkedin',
      'fa fa-instagram'
    ]
  })
}
</script>
