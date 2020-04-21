Vue.component('product', {
    props:{
        premium:{
            type: Boolean, 
            required: true,
        }
    },
    template:
    `<div class="product"> 

    <div class="product-image">
        <img :src="image">
    </div>

    <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else-if="!inStock">Out of Stock</p>
        <p> Shipping :  {{shipping}} </p>
             
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    <div v-for="(variant, index ) in variants" 
         :key="variant.variantId"
         class="color-box"
         :style="{ backgroundColor: variant.variantColor }" 
         @mouseover="updateProduct(index)"
         >
    </div>

    <button v-on:Click="addToCart" 
            :disabled="!inStock"
            :class="{disabledButton: !inStock}"
            >
            Add to Cart</button>

    <button v-on:Click="removeFromCart" 
            :disabled="!inStock"
            :class="{disabledButton: !inStock}"
            >
            Remove</button>            
    </div>

</div>`, 
data(){
    return  {
    brand : 'Vue Mastery',
    product: 'Socks',
    url: "https://www.google.com/",
    selectedvariant : 0, 
    description: 'Wooly and Warm',
    details: ["80% Cotton", "20% Polyester", "Unisex"],
    variants:[
        {
            variantId: 2234,
            variantColor: "green",
            variantImage: "./skySea.jpg", 
            varinatQunatity: 10
        },
        {
            variantId: 2235,
            variantColor: "blue",
            variantImage: "blueImage.jpg", 
            varinatQunatity: 0
        }
    ],
    }
},
methods:{
    addToCart() {
        this.$emit('add-to-cart')
    },
    removeFromCart(){
        if(this.cart >=1){
            this.cart -=1
        }
        else this.disabledButton;
    },
    updateProduct(index) {
        this.selectedvariant = index;
    }
}, 
computed: {
    title(){
        return this.brand + " " + this.product;
    },
    image(){
        return this.variants[this.selectedvariant].variantImage;
    },
    inStock(){
        return this.variants[this.selectedvariant].varinatQunatity;
    }, 
    shipping(){
        if (this.premium){
            return "Free"
        }
        else 2.99
    }
}
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: 0
    }, 
    methods:{
        updateCart(){
            this.cart +=1
        }
    }    
});