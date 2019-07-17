<template>
    <div class="book__view text-md-left py-2 primary">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 md3 style="padding: 0px;">
                    <img src="../assets/book1.jpg" alt="" style="width: 286px;">
                </v-flex>
                <v-flex xs12 md9>
                    <div class="content">
                        <div class="d-flex justify-space-between">
                            <h1 class="white--text font-weight-bold">
                              {{book.title}}
                            </h1>
                        </div>
                        <div>
                            <v-chip color="white" text-color="black" class="font-weight-bold">Genre</v-chip>
                        </div>
                        <div class="grey--text">
                            <h2 class="white--text font-weight-bold" style="margin-top: 1em">Status</h2>
                            <p class="subheading white--text font-weight-bold">Author: {{book.author}}. Year: {{book.year}}</p>
                        </div>
                        <div class="">
                            <h2 class="red--text font-weight-bold justify-space-between"><v-icon large color="red darken-2">access_time</v-icon><span class="ml-5">Pages per day</span><span class="ml-5"><v-btn outline fab small color="red" class="font-weight-bold">5</v-btn></span></h2>
                        </div>
                         <div class="d-flex mt-1">
                            <h2 class="white--text font-weight-bold justify-space-between">
                                <span class="ml-1">Will have finished before:</span>
                                <span class="ml-5">27/06/2019</span>
                            </h2>
                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
export default {
  name: 'BookView',
  data: () => ({
    book: []
  }),
  mounted: async function () {
    await this.getExactBook()
  },
  methods: {
    getExactBook () {
      this.book = this.$store.getters.getBook(this.$route.params.bookID)
    }
  }
}
</script>
<style scoped>
    div.content{
        padding-left: 40px;
    }
</style>
