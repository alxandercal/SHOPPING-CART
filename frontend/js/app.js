import { products } from "./products.js"
import { addToCart , readCart, updateQty, removeItem , ClearCart } from "./cart.js"
import { renderProducts, renderCart } from "./ui.js" // Corregido: importado renderProducts

const productGrid = document.querySelector('#productsGrid')
const emptyState = document.querySelector('#emptyState')
const cartItems = document.querySelector('#cartItems')
const cartEmpty = document.querySelector('#cartEmpty')
const cartTotal = document.querySelector('#cartTotal')
const cartCount = document.querySelector('#cartCount')

const searchInput = document.querySelector('#searchInput')
const sortSelect = document.querySelector('#sortSelect')
const clearCartBtn = document.querySelector('#clearCartBtn')

let cart = readCart()

function applyFilters(){
    const q = (searchInput.value || '').toLowerCase().trim()
    let list = [...products].filter(p => p.name.toLowerCase().includes(q)) 
    
    const sort = sortSelect.value
    if(sort === 'name_asc') list.sort( (a,b) => a.name.localeCompare(b.name))
    if(sort === 'price_asc') list.sort((a,b) => a.price - b.price)
    if(sort === 'price_desc') list.sort((a,b) => b.price - a.price)

    emptyState.classList.toggle("d-none" , list.length !== 0)

    renderProducts(productGrid, list, (id) => {
        const p = products.find(x => x.id === id)
        if (!p) return
        cart = addToCart(p)
        paintCart()
    })
}

function paintCart() {
  renderCart(cartItems, cartEmpty, cartTotal, cartCount, cart, {
    onQty: (id, qty) => { 
        cart = updateQty(id, qty)
        paintCart()
    },
    onRemove: (id) => { 
        cart = removeItem(id)
        paintCart() 
    }
  })
}

// Listeners
searchInput.addEventListener("input", applyFilters)
sortSelect.addEventListener("change", applyFilters) // Corregido: "change" en lugar de "charge"

clearCartBtn.addEventListener("click", () => {
    cart = ClearCart() // Corregido: Realmente vacía el carrito
    paintCart()
})

// Inicio
applyFilters()
paintCart()