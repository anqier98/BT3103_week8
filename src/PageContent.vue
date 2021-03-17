<template>
  <div>
    <header>
      <ul>
        <li><router-link to="/" exact> Home </router-link></li>
        <li><router-link to="/orders" exact> Orders </router-link></li>
        <li><router-link to="/dashboard" exact> Dashboard </router-link></li>
      </ul>
    </header>
      <ul id = "itemsList">
        <li v-for="(item, x) in itemsList" :key="x">
        <h3>{{item.name}}</h3>
        <img v-bind:src="item.imageURL">
        <p>${{item.price}}</p>
        <counter v-on:counter="onCounter" v-bind:item="item"></counter>
        </li>
      </ul>
    <Basket id="menu" v-bind:itemsSelected="itemsSelected"></Basket>
  </div>
</template>

<script>
import Basket from './Basket.vue'
import database from './firebase.js'

export default {
  name: 'Content',
  data() {
    return {
      itemsSelected: [],
      itemsList:[]
    }
  },
  components: {
    Basket
  },
  methods: {
    fetchItems: function() {
      database.collection('menu').get().then((querySnapShot) => {
        let item={}
        querySnapShot.forEach(doc => {
          item = doc.data()
          item.show = false
          this.itemsList.push(item)
        })
      })
    },
    onCounter: function (item, count) {
      var passed = "false"
      if (this.itemsSelected.length == 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {

        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item_name == item.name && count > 0) {
            this.$set(this.itemsSelected[i],1,count);
            passed = "true";

          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          } else if (item_name == item.name && count == 0) {
            this.itemsSelected.splice(i,1);
            passed = "true";
          }
        }
        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        if (passed == "false") {
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    }
  },
  created() {
      this.fetchItems()
  }
} 
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  padding-right: 20px;
  box-sizing: border-box;
  float:left;
}
#menu {
  padding-top: 30px;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
