<template>
    <div class="home">
      <div v-if="isAuthenticated">
        <h2>Welcome {{ authUser.displayName }} </h2>
        <button class="btn btn-google" @click="logout">Logout</button>
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
