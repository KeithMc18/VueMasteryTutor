var eventBus = new Vue()

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

    <product-tabs :reviews="reviews"></product-tabs>

</div>
`, 
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
    }, 
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
}
})

Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b> Please correct the following error(s)</b>
        <ul v-for="error in errors"> {{error}} </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review" ></textarea>
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
            rating: null, 
            errors: []
        }
    }, 
    methods:{
        onSubmit(){
        if (this.name && this.review && this.rating){
            let productReview = {
                name: this.name,
                rating: this.rating, 
                review: this.review
            }
            eventBus.$emit('review-submitted', productReview)
            this.name = null,
            this.rating = null, 
            this.review = null
        }
        else {
            if(!this.name) this.errors.push("Name required")
            if(!this.review) this.errors.push("Review required")
            if(!this.rating) this.errors.push("Rating required")
        }
    }}
})

Vue.component('product-tabs', {
    props:{
        reviews: {
            type: Array, 
            required: true
        }
    },
    template:  `
    <div>
        <span class="tab"
            :class="{ activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab">
            {{tab}}</span>

        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">there are no reviews yet </p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }} </p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <product-review v-show="selectedTab === 'Make a Review'"
        ></product-review>  
    </div>
    
    `, 
    data(){
        return {
            tabs: ['Reviews', 'Make a Review'], 
            selectedTab: 'Reviews',
        }
    }
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