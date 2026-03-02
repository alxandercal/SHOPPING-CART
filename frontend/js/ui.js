import { cartTotals } from "./cart.js";

const money =new Intl.NumberFormat("es-Mx",{
    style:"currency",
    currency:"MXN",
    maximumFractionDigits:0
})


export function renderProducts(gridEl,products,onAdd){
    gridEl.innerHTML =products.map(p => 
        `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card h-100 shadow-sm">
                <img class="card-img-top card-product-img" src="${p.imageUrl}" alt="${pname}">
                    <div class= "card-body d-flex flex-column">
                        <div class="d-flex justify-content-between aling-items-start gap-2">
                            <h5 class="card-title mb-1">${p.name}</h5>
                            <span class="badge text-bg-dark price">
                                ${money.format(p.price)}
                            </span>
                        </div>
                        <p class="text-muted small mb-3">
                            Stock: ${p.stock}
                        </p>
                        <button clas="btn btn-primary mt-auto">
                            data-add="${p.id}">
                            agregar carrito
                        </button>
                    </div>
                </img>
// checar la img donde cierra
            </div>

        </div>
        `
    ).join("")

    gridEl.queerySelectorAll("[data-add]").forEach(btn => {
      btn.addEventListener("click", ()=> {
        onAdd(btn.getAttribute("data-add"))
      })  
    })
}



export function renderCart(cartItemsEl, cartEmptyEl, cartTotalEl, cartCountEl, cart, handlers) {
 const { count, total } = cartTotals(cart)
 cartCountEl.textContent = String(count)
 cartTotalEl.textContent = money.format(total)
 cartEmptyEl.classList.toggle("d-none", cart.length !== 0)
 cartItemsEl.innerHTML = cart.map(i => `
<div class="border rounded-3 p-2 bg-white d-flex gap-2 align-items-center">
    <img src="${i.imageUrl}" alt="${i.name}" width="56" height="56" style="object-fit:cover" class="rounded-2">
    <div class="flex-grow-1">
    <div class="fw-semibold">${i.name}</div>
    <div class="text-muted small">${money.format(i.price)} c/u</div>
</div>
<div class="d-flex align-items-center gap-2">
    <input class="form-control form-control-sm" style="width:72px"
              type="number" min="1" value="${i.qty}" data-qty="${i.id}">
    <button class="btn btn-outline-danger btn-sm" data-remove="${i.id}">✕</button>
    </div>
</div>
 `).join("")
 cartItemsEl.querySelectorAll("[data-qty]").forEach(inp => {
   inp.addEventListener("change", () => handlers.onQty(inp.getAttribute("data-qty"), inp.value))
 })
 cartItemsEl.querySelectorAll("[data-remove]").forEach(btn => {
   btn.addEventListener("click", () => handlers.onRemove(btn.getAttribute("data-remove")))
 })
}
