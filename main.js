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

    <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{disabledButton: !inStock}"
            >
            Add to Cart</button>

    <button v-on:click="removeFromCart" 
            :disabled="!inStock"
            :class="{disabledButton: !inStock}"
            >
            Remove</button>            
    </div>

    <div>
        <h2>Reviews</h2>
        <p>there are no reviews yet </p>
    </div>

    <product-review @review-submitted="addReview"></product-review>  
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
    reviews: []
    }
},
methods:{
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedvariant].variantId)
    },
    removeFromCart(){   
        this.cart -=1
    },
    updateProduct(index) {
        this.selectedvariant = index;
    }, 
    addReview(productReview){
        this.reviews.push(productReview)
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

Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `, 
    data(){
        return{
            name: null,
            review: null,
            rating: null       
        }
    }, 
    methods:{
        onSubmit(){
        let productReview = {
            name: this.name,
            rating: this.rating, 
            review: this.review
        }
        this.$emit('review-submitted', productReview)
        this.name = null,
        this.rating = null, 
        this.review = null
    }}
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    }, 
    methods:{
        updateCart(id){
            this.cart.push(id);  
        }
    }    
});