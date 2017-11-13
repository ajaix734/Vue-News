<template>
  <v-app class="grey lighten-2">

    <v-container fluid>
      <v-layout row wrap>

        <!-- <v-container fluid> -->
        <v-layout row wrap>
          <v-navigation-drawer light v-model="drawer" temporary>
            <v-toolbar flat>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="title">
                    Channels
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
              <v-list-tile v-for="item in items" :key="item.id" @click="getChannel(item.id)" @click.stop="drawer = !drawer">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-layout>
        <!-- </v-container> -->
        <v-container fluid>
          <!-- <v-layout row> -->
          <!-- <v-flex xs12> -->
          <!-- <div class="mb-5"> -->
          <v-toolbar dark fixed>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title @click.stop="getHomeNews()" style="cursor:pointer" class="text-xs-centre">
              SweN
            </v-toolbar-title>
          </v-toolbar>
          <!-- </div> -->
          <!-- </v-flex> -->
          <!-- </v-layout> -->
        </v-container>
        <v-container>
          <v-layout row>
            <v-flex xs12 sm12 md8 lg8 offset-md2 offset-lg2>
              <h4 class="text-xs-center">{{articlesCollection.source}}</h4>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- <v-container fluid> -->
        <v-layout row v-for="article in articles" :key="article.publishedAt">
          <v-flex xs12 sm12 md8 lg8 offset-md2 offset-lg2>
            <v-card class="mb-3 grey lighten-3">
              <!-- <v-container fluid> -->
              <v-layout row wrap>
                <v-flex xs12 sm3 md4>
                  <a :href="article.url" target="_blank" style="text-decoration: none">
                    <v-card-media :src="article.urlToImage" height="200px">
                    </v-card-media>
                  </a>
                </v-flex>
                <v-flex sm9 md8>
                  <v-card-title primary-title>
                    <div>
                      <a :href="article.url" target="_blank" style="text-decoration: none">
                        <div class="headline">{{article.title}}</div>
                      </a>
                      <!-- <v-container fluid> -->
                      <v-layout row wrap>
                        <v-flex xs12>
                          <span class="grey--text">author: {{article.author}}</span>
                        </v-flex>
                        <v-flex xs12>
                          <span class="grey--text">Published: {{new Date(article.publishedAt).toLocaleString()}}</span>
                        </v-flex>
                      </v-layout>
                      <!-- </v-container> -->
                    </div>
                    <v-card-text>{{article.description}}</v-card-text>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <!-- </v-container> -->
            </v-card>
          </v-flex>
        </v-layout>
        <!-- </v-container> -->
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [],
      articlesCollection: {},
      articles: []
    };
  },
  created() {
    this.$http
      .get("https://newsapi.org/v1/sources")
      .then(Response => (this.items = Response.data.sources));
    if (sessionStorage.length != 0) {
      this.articlesCollection = JSON.parse(
        sessionStorage.getItem("selectedArticlesCollection")
      );
      NProgress.start();
      this.$http
        .get(
          `https://newsapi.org/v1/articles?source=${JSON.parse(
            sessionStorage.getItem("selectedId")
          )}&apiKey=d59cfaf4b5944cbeab7fdade05c160a7`
        )
        .then(Response => {
          this.articles = Response.data.articles;
          NProgress.done(true);
          NProgress.remove();
        });
    } else {
      NProgress.start();
      this.$http
        .get(
          "https://newsapi.org/v1/articles?source=google-news&apiKey=d59cfaf4b5944cbeab7fdade05c160a7"
        )
        .then(Response => {
          (this.articlesCollection = Response.data),
            (this.articles = Response.data.articles);
          NProgress.done();
          NProgress.remove();
        });
    }
  },
  methods: {
    getChannel(id) {
      NProgress.start();
      this.$http
        .get(
          `https://newsapi.org/v1/articles?source=${id}&apiKey=d59cfaf4b5944cbeab7fdade05c160a7`
        )
        .then(Response => {
          (this.articlesCollection = Response.data),
            (this.articles = Response.data.articles);
          if (typeof Storage !== "undefined") {
            sessionStorage.setItem(
              "selectedArticlesCollection",
              JSON.stringify(Response.data)
            );
            sessionStorage.setItem("selectedId", JSON.stringify(id));
            NProgress.done();
            NProgress.remove();
          }
        });
    },
    getHomeNews() {
      NProgress.start();
      sessionStorage.clear();
      this.$http
        .get(
          "https://newsapi.org/v1/articles?source=google-news&apiKey=d59cfaf4b5944cbeab7fdade05c160a7"
        )
        .then(Response => {
          (this.articlesCollection = Response.data),
            (this.articles = Response.data.articles);
          NProgress.done();
          NProgress.remove();
        });
    }
  }
};
</script>





