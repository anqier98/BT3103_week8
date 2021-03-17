<template>
    <div>
        <p>Menu:</p>
        <ul>
            <li v-for="(item, x) in itemsSelected" :key="x[1]">
            <p> {{item[0]}} x {{item[1]}}</p>
            </li>
        </ul>
        <button type = "button" v-on:click="findTotal();sendOrder();">Calculate Total</button>
        <p v-show="!isHidden"> Subtotal is ${{subtotal}} </p>
        <p v-show="!isHidden"> Grand Total is ${{grandtotal}} </p>
    </div>
</template>

<script>
import database from './firebase.js'

export default {
    props: ['itemsSelected'], //name, count, price
    data() {
        return {
            subtotal: 0,
            isHidden:true,
            currItem: {
                "Prawn omelette": 0,
                "Dry Beef Hor Fun": 0,
                "Sambal KangKung": 0,
                "Pork Fried Rice": 0,
                "Mapo Tofu": 0,
                "Cereal Prawn": 0
            }
        };
    },
    methods: {
        sendOrder: function() {
            for (var j = 0; j < this.itemsSelected.length; j++) {
                if (this.itemsSelected[j][0] == "Prawn omelette") {
                    this.currItem["Prawn omelette"] = this.itemsSelected[j][1]
                } else if (this.itemsSelected[j][0] == "Dry Beef Hor Fun") {
                    this.currItem["Dry Beef Hor Fun"] = this.itemsSelected[j][1]
                } else if (this.itemsSelected[j][0] == "Sambal KangKung") {
                    this.currItem["Sambal KangKung"] = this.itemsSelected[j][1]
                } else if (this.itemsSelected[j][0] == "Pork Fried Rice") {
                    this.currItem["Pork Fried Rice"] = this.itemsSelected[j][1]
                } else if (this.itemsSelected[j][0] == "Mapo Tofu") {
                    this.currItem["Mapo Tofu"] = this.itemsSelected[j][1]
                } else {
                    this.currItem["Cereal Prawn"] = this.itemsSelected[j][1]
                }
            }
            database.collection('orders').add(this.currItem).then(() => {location.reload()})
        },
        findTotal: function() {
            this.subtotal = 0
            for (var i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i]
                const item_count = curr_item[1];
                const item_price = curr_item[2];
                this.subtotal += (item_count * item_price);
            }
            this.isHidden = false;
            return this.subtotal;
        }
    },
    computed: {
        grandtotal: function() {
            var total = this.subtotal * 1.07;
            return total.toFixed(2)
        }
    }
}
</script>

<style>
</style>