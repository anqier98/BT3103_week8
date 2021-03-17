<template>
    <div>
        <button type = "button" v-on:click = "decrement()">-</button>
        {{counter}} 
        <button type = "button" v-on:click = "increment()">+</button>
    </div>
</template>

<script>

export default {
    name: 'QuantityCounter',
    data () {
        return {
            counter: 0,
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        decrement: function() {
            if (this.counter > 0) {
                this.counter -= 1;
            } 
            this.$emit('counter', this.item, this.counter)
        },
        increment: function() {
            if (this.counter < 10) {
                this.counter += 1;
            } else {
                alert("You cannot buy more than 10 items")
            }
            this.$emit('counter', this.item, this.counter)
        }
    }
}
</script>

<style>
    button{
        font-family: 'Avenir',
        Helvetica, Arial, sans-serif;
        text-align: center;
        background-color: #34d8eb;
        border-radius: 50%;
        border: 2px solid #4263f5;

    }
</style>