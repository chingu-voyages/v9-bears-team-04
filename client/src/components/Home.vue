<template>
    <div class="home">
        <h2 v-if="isAuthenticated">Welcome {{ authUser.displayName }}</h2>
        <h2 v-else>Not Authenticated!</h2>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: mapGetters(['authUser', 'isAuthenticated'])
}
</script>
