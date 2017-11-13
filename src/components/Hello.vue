<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>



<template>
  <v-app class="grey lighten-2">
    <v-container>
      <v-layout>
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
        <v-layout row>
          <div class="mb-5">
            <v-toolbar dark fixed>
              <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
              <v-toolbar-title class="white--text text-xs-right">SweN</v-toolbar-title>
            </v-toolbar>
          </div>
        </v-layout>
        <v-layout row wrap fluid>
          <v-flex xs12 sm12 md8 lg8 offset-md2 offset-lg2>
            <h4>{{articlesCollection.source}}</h4>
          </v-flex>
        </v-layout>
        <v-layout row v-for="article in articles" :key="article.publishedAt">
          <v-flex xs12 sm12 md8 lg8 offset-md2 offset-lg2>
            <v-card class="mb-3 grey lighten-3">
              <v-container fluid>
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
                          <div class="headline">{{article.articles.title}}</div>
                        </a>
                        <span class="grey--text">{{article.author}}</span>
                      </div>
                      <v-card-text>{{article.description}}</v-card-text>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        </v-flex>
      </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      show: false,
      items: [],
      articlesCollection: {},
      articles: []
    };
  },
  created() {
    this.$http
      .get("https://newsapi.org/v1/sources")
      .then(Response => (this.items = Response.data.sources));
    this.$http
      .get(
        "https://newsapi.org/v1/articles?source=google-news&apiKey=d59cfaf4b5944cbeab7fdade05c160a7"
      )
      .then(Response => {
        (this.articlesCollection = Response.data),
          (this.articles = articlesCollection.articles);
      });
  },
  methods: {
    getChannel(id) {
      this.$http
        .get(
          `https://newsapi.org/v1/articles?source=${id}&apiKey=d59cfaf4b5944cbeab7fdade05c160a7`
        )
        .then(Response => {
          (this.articlesCollection = Response.data),
            (this.articles = articlesCollection.articles);
        });
    }
  }
};
</script>





