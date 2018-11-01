import Vue from "vue";
import HomeComponent from "./Home.vue";

new Vue({
    el: "#vue",
    template: `
    <div>
        <input v-model="name" />
        <HomeComponent ref="home" :name="name">Click The button!</HomeComponent>
        <button @click="alert">alert</button>
    </div>
    `,
    data: {
        name: "World"
    },
    components: {
        HomeComponent
    },
    methods: {
        alert() {
            this.$refs.home.alert();
        }
    }
});