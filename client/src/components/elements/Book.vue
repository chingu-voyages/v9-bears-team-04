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
                    <span class="display-1"><router-link :to="{ name:'BookView', params:{ bookID: book.id} }">{{book.title}}</router-link></span>
                </span>
                <p class="ml-small">
                    <v-chip color="white" text-color="black" class="font-weight-bold">{{ book.genre }}</v-chip>
                </p>
                <p class="subheading white--text font-weight-bold ml-small">{{book.author}} {{book.year}}</p>
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>
<script>
export default {
  name: 'Book',
  props: ['book'],
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
