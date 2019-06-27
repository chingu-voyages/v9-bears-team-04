<template>
    <div class="bookList">
        <v-container grid-list-md text-xs-center text-md-left fluid>
        <v-layout row wrap>
            <v-flex xs4>
                <v-card dark color="white" class="card-image">
                    <img src="@/assets/book1.jpg" class="image">
                </v-card>
            </v-flex>
            <v-flex xs8>
                <span class="d-flex justify-space-between ml-small">
                    <span class="display-1"><router-link :to="{ name:'BookView', params:{ bookID: 'fda8913qdF'} }">Book Name</router-link></span>
                    <span class="rating">
                        <v-rating v-model="rating" background-color="white" dark medium color="red" readonly></v-rating>
                    </span>
                </span>
                <p class="ml-small">
                    <v-chip color="white" text-color="black" class="font-weight-bold">Genre</v-chip>
                    <v-chip color="red" dark small class="black--text text-capitalize font-weight-bold" fab round></v-chip>
                </p>
                <p class="subheading white--text font-weight-bold ml-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, dolor! Quod perferendis deserunt sequi dolorem obcaecati temporibus, et deleniti, animi veniam quo a alias quisquam illum voluptas aperiam. Nam, praesentium?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, odio officiis nulla, ipsam aliquid tempora illum libero dolore incidunt soluta tenetur. Placeat culpa maxime sed! Error officia facere accusantium aliquid.</p>
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>
<script>
export default {
  name: 'Book',
  data: () => ({
    rating: 3
  })
}
</script>
<style scoped>
    div.card-image{
        height: 100%;
        width: 100%;
        padding-bottom: 0px;
    }
    div.card-image .image{
        width: 100%;
        max-height: 320px;
    }
    .ml-small{
        margin-left: 20px;
    }
    .mr-small{
        margin-right: 20px;
    }
    .display-1 a{
        text-decoration: none;
        color: #000;
    }
</style>

