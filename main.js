var app = new Vue({
    el: '#app',
    data:{
        product: 'Socks',
        url: "https://www.google.com/",
        image: "./skySea.jpg",
        description: 'Wooly and Warm',
        inStock: true,
        onSale: true,
        details: ["80% Cotton", "20% Polyester", "Unisex"],
        variants:[
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./skySea.jpg"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "blueImage.jpg"
            }
        ],
        cart: 0
    },
    methods:{
        addToCart() {
            this.cart +=1
        },
        removeFromCart(){
            this.cart -=1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
    
});