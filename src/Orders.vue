<template>
    <div>
    <header>
      <ul>
        <li><router-link to="/" exact> Home </router-link></li>
        <li><router-link to="/orders" exact> Orders </router-link></li>
        <li><router-link to="/dashboard" exact> Dashboard </router-link></li>
      </ul>
    </header>
        <ul>
            <li v-for="(order, x) in orders" :key="x">
                {{order}}
                <p> Prawn omelette: {{order[1]["Prawn omelette"]}} </p>
                <p> Dry Beef Hor Fun: {{order[1]["Dry Beef Hor Fun"]}} </p>
                <p> Sambal KangKung: {{order[1]["Sambal KangKung"]}} </p>
                <p> Pork Fried Rice: {{order[1]["Pork Fried Rice"]}} </p>
                <p> Mapo Tofu: {{order[1]["Mapo Tofu"]}} </p>
                <p> Cereal Prawn: {{order[1]["Cereal Prawn"]}} </p>  
                <button v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
                <button v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
            </li>
        </ul>
    </div>
</template>

<script>
import database from "./firebase.js"

export default {
    data() {
        return {
            orders:[]
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((querySnapShot) => {
            let order=[]
            querySnapShot.forEach(doc => {
            order=[doc.id, doc.data()]
            this.orders.push(order)})
            })
        },
        deleteItem: function(event) {
          let doc_id = event.target.getAttribute("id");
          database.collection('orders').doc(doc_id).delete().then(()=>{
            var filteredItemList=this.orders.filter((itemf)=>itemf.id!==doc_id);
            this.orders=filteredItemList;
            location.reload()
          });
        },
        route: function(event) {
          let doc_id = event.target.getAttribute("id");
          this.$router.push({name:'modify',params:{id:doc_id}})
        }

    },
    created() {
      this.fetchItems()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>