<template>
    <div class="home">
      <div v-if="isAuthenticated">
        <h2>Welcome {{ authUser.displayName }} </h2>
        <button class="btn btn-google" @click="logout">Logout</button>
        <button class="btn btn-google">
          <router-link
            :to="{ name: 'BooksList', params: {} }"
            class="router-link-custom"
          >
            Book list
          </router-link>
        </button>
      </div>
        <h2 v-else>Not Authenticated!</h2>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  computed: mapGetters(['authUser', 'isAuthenticated']),
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style scoped>
  .router-link-custom {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-transform: none !important;
    text-decoration: none !important;
    color: white;
  }
</style>
