<template>
    <div class="book__view text-md-left py-2">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 md3 style="padding: 0px;">
                    <img src="../assets/book1.jpg" alt="" style="width: 286px;">
                </v-flex>
                <v-flex xs12 md9>
                    <div class="content">
                        <div class="d-flex justify-space-between">
                            <h1 class="primary--text font-weight-bold">
                                Book Name
                            </h1>
                            <span class="text-md-right">
                                <v-btn flat icon color="white">
                                    <v-icon large>notifications</v-icon>
                                </v-btn>
                                <v-btn flat icon color="white">
                                    <v-icon large>fa fa-share</v-icon>
                                </v-btn>
                                <v-btn flat icon color="white">
                                    <v-icon large>more_horiz</v-icon>
                                </v-btn>
                            </span>
                        </div>
                        <div>
                            <v-chip color="white" text-color="black" class="font-weight-bold">Genre</v-chip>
                            <v-btn flat icon color="red">
                                <v-icon>favorite</v-icon>
                            </v-btn>
                        </div>
                        <div>
                            <v-rating v-model="rating" background-color="white" dark large color="red" readonly></v-rating>
                        </div>
                        <div class="grey--text">
                            <h2 class="primary--text font-weight-bold" style="margin-top: 1em">Bookkish</h2>
                            <p class="subheading white--text font-weight-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam excepturi dicta voluptates quaerat maxime optio unde et, pariatur aut quibusdam commodi est quam, libero incidunt dignissimos sed ipsum nostrum molestias.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repellat sunt ducimus. Minima fugiat in quo, et explicabo adipisci sint illo laboriosam soluta dolore. Consectetur itaque similique possimus quisquam obcaecati.</p>
                        </div>
                        <div class="">
                            <h2 class="red--text font-weight-bold justify-space-between"><v-icon large color="red darken-2">access_time</v-icon><span class="ml-5">Page per day</span><span class="ml-5"><v-btn outline fab small color="red" class="font-weight-bold">5</v-btn></span></h2>
                        </div>
                         <div class="d-flex mt-1">                            
                            <h2 class="white--text font-weight-bold justify-space-between">
                                <v-icon large color="white">list</v-icon>
                                <span class="ml-5">Before</span>
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
  data: () =>{
    return {
        rating: 4
    }
  }
}
</script>
<style scoped>
    div.book__view{
        background-color:  rgb(171, 217, 248) !important;
    }
    div.content{
        padding-left: 40px;
    }
</style>
