Vue.component('create', {
  data: function() {
    axios({
      method: "post",
      url: "/api/v1/posts/",
      headers: {
        "X-CSRFToken": this.csrfToken,
      },
      data: {
        title: this.newPost.title,
        author: this.currentUser.id,
        body: this.newPost.body,
      },
    })
      .then((response) => {
        this.loadPosts();
        this.create = false;
        this.newPost = {
          title: "",
          author: null,
          body: "",
        };
        this.postErrors = {};
      })
      .catch((error) => (this.postErrors = error.response.data));
  }
})


const vm = new Vue({
  el: "#app",
  delimiters: ["[[", "]]"],
  data: {
    csrfToken: "",
    posts: [],
    users: [],
    detail: [],
    currentUser: {},
    create: false,
    edit: false,
    newPost: {
      title: "",
      author: null,
      body: "",
    },
    postErrors: {},
  },
  filters: {
    formatTime: function (value) {
      let time = value.split(/[T]/)[0].split("-");
      return `${time[0]}/${time[1]}/${time[2]}`;
    },
  },

  methods: {
    loadPosts: function () {
      axios({
        method: "get",
        url: "api/v1/posts",
      })
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadUsers: function () {
      axios({
        method: "get",
        url: "api/v1/users/",
      }).then((response) => (this.users = response.data));
    },
    loadCurrentUser: function () {
      axios({
        method: "get",
        url: "/api/v1/current-user/",
      }).then((response) => (this.currentUser = response.data));
    },
    // createPost: function () {
    //   axios({
    //     method: "post",
    //     url: "/api/v1/posts/",
    //     headers: {
    //       "X-CSRFToken": this.csrfToken,
    //     },
    //     data: {
    //       title: this.newPost.title,
    //       author: this.currentUser.id,
    //       body: this.newPost.body,
    //     },
    //   })
    //     .then((response) => {
    //       this.loadPosts();
    //       this.create = false;
    //       this.newPost = {
    //         title: "",
    //         author: null,
    //         body: "",
    //       };
    //       this.postErrors = {};
    //     })
    //     .catch((error) => (this.postErrors = error.response.data));
    // },
    editPost: function (post) {
      axios({
        method: "patch",
        url: "/api/v1/posts/",
        headers: {
          "X-CSRFToken": this.csrfToken,
        },
        data: {
          title: this.newPost.title,
          author: this.currentUser.id,
          body: this.newPost.body,
        },
      })
        .then((response) => {
          this.loadPosts();
          this.create = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function () {
    this.loadPosts();
    this.loadUsers();
    this.loadCurrentUser();
  },
  mounted: function () {
    this.csrfToken = document.querySelector(
      "input[name=csrfmiddlewaretoken]"
    ).value;
  },
});
