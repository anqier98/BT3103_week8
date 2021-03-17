<template>
    <div>
        <ul>
            <li v-for="(value, key, index) in datapacket" v-bind:key="key">
                <br>
                {{ key }} : {{ value }} <br><br>
                <input type="number" v-bind:id="index" placeholder="0" min="0">
            </li>
            <br>
            <button v-on:click="updateOrder"> Update Order </button>
        </ul>
    </div>
</template>

<script>
import database from "./firebase.js"

export default {
    data() {
        return {
            datapacket:{}
        }
    },
    methods: {
        fetchItems: function() {
            var doc_id = this.$route.params.id;
            database.collection("orders").doc(doc_id)
            .get().then((doc)=> {
                this.datapacket = doc.data();
            });
        },
        updateOrder: function() {
            var doc_id = this.$route.params.id;
            let copy = this.datapacket;
            for(var j = 0; j < 6; j++) {
                if(document.getElementById(j).value.length != 0) {
                    var dish = Object.keys(this.datapacket)[j];
                    var new_amt = Number(document.getElementById(j).value);
                    copy[dish] = new_amt;
                }
            }
            database.collection('orders').doc(doc_id).update(copy).then(()=>{this.$router.push('orders')});
        }
    },
    created() {
      this.fetchItems()
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
</style>