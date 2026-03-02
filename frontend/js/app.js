import { products } from "./products.js";
import { addTOcart,readCart,updateQty,removeItem,ClearCart,cartTotals } from "./cart.js";
import { renderProducts,renderCart } from "./ui.js";


const productGrid = document.querySelector('#productsGrid')
const emptyState = document.querySelector('#emptyState')
const cartItems = document.querySelector('#cartItems')
const cartempty = document.querySelector('#cartEmpty')
const cartTotal = document.querySelector('#cartTotal')
const cartCount = document.querySelector('#cartCount')

const searchInput = document.querySelector('#searchInput')
const sortSelect = document.querySelector('#sortSelect')
const clearCartBtn = document.querySelector('#clearCartBtn')
const checkouttn = document.querySelector('#checkouttn')

let cart =readCart()
let stateProducts = [...products]

function applyFilters(){
    const q = (searchInput.value || '').toLowerCase().trim()
    let list = [...products].filter ((p => p.name.toLowerCase().includes(q)) )
    const sort = sortSelect.value
    if(sort === 'name_asc') list.sort((a,b)=> a.name.localeCompare(b.name))
    if(sort === 'price_asc') list.sort((a,b)=> a.price - b.price)
    if(sort === 'price_desc') list.sort((a,b)=> b.price - a.price)

    stateProducts = list
    emptyState.classList.toggle("d-none" ,stateProducts.length !=0)

    renderProducts( productGrid, stateProducts, (id) => {
        const p= products.find(x => x.id === id)
        if (!p) return
        cart = addToCart(p)
        paintCart()
    })
}

function paintCar(){
    renderCart(cartItems, cartEmpty,cartTotal,cartCount,cart,{
        onQty:(id,qty)=>{cart = upddateQty(id,qty);
            paintcart()},
        onRemove: (id) => {cart = remove(id); paintCart()}
    })
}

searchInput.addEventListener("input",applyFilters)
sortSelect.addEventListener("charge",applyFilters)

clearCartBtn.addEventListener("click",()=>{
    paintCar()
})

applyFilters()
paintCar()

