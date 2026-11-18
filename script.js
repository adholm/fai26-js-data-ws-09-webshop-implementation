// Det här är vår fil. Här kopplar vi ihop datan och hjälpfunktionerna till nya funktioner på sidan.

// Datan från JSON-filerna.
import products from "./products.json" with { type: "json" };
import discountCodes from "./discount-codes.json" with { type: "json" };

// Hjälpfunktioner som räknar på eller ändrar datan. Läs mer i data-helpers.js.
import {
  findProduct,
  searchProducts,
  filterByCategory,
  sortProducts,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  getItemCount,
  getCartTotal,
  getShipping,
  getAmountLeftForFreeShipping,
  findDiscountCode,
  getDiscountAmount,
  toggleFavorite,
  getFavoriteProducts,
} from "./data-helpers.js";

// Hjälpfunktioner som visar saker på sidan eller lyssnar på det kunden gör. Läs mer i page-helpers.js.
import {
  showProducts,
  showCart,
  showCartCount,
  showCartSummary,
  showFreeShippingMessage,
  showDiscountMessage,
  showFavorites,
  getSearchText,
  getSelectedCategory,
  getSelectedSort,
  onButtonClick,
  onSearchInput,
  onCategoryChange,
  onSortChange,
  onDiscountSubmit,
} from "./page-helpers.js";

// ---------- Data som ändras medan sidan är öppen ----------

// Varukorgen. En array med rader: { id, name, price, quantity }.
let cart = [];

// Önskelistan. En array med produkternas id:n, till exempel [3, 7].
let favorites = [];

// Rabattkoden som kunden har använt. null betyder att ingen kod är använd än.
let activeDiscountCode = null;

// ---------- Våra funktioner ----------

// Här bygger vi.
// getcarttotal räknar ut vad allt i varukorgen kostar
// showCart visar varukorgen på sidan.
// onSearchInput märker när kunden skriver i sökrutan

// beskriv:
// kunden väljer något i sorteringsmenyn: onSortChange
// produkterna sorteras: sortProducts
// de sorterade produkterna visas på sidan: getSelectedSort

// plan:
// 1. kunden väljer ngt i sortertingsmenyn
onSortChange((sortValue) => {
  // 2. sortera produkterna
  const sortedProducts = sortProducts(products, sortValue);
  // 3. visa sorterade produkter
  showProducts(sortedProducts, favorites);
});

// spara nya varukorgen
let count = 0;
count = count + 1;

// Funktion 1: Lägg i varukorgen
onButtonClick("add-to-cart", (productId) => {
  const product = findProduct(products, productId);
  cart = addToCart(cart, product);

  const total = getCartTotal(cart);
  const shipping = getShipping(total);

  showCart(cart);
  showCartCount(getItemCount(cart));
  showCartSummary(total, 0, shipping);
});

// Funktion 2: Ändra antal och ta bort i varukorgen
// 1. när kunden trycker på något (onButtonClick)

// 2. kund trycker på minus knappen (decreaseQuantity)
onButtonClick("decrease", (productId) => {
  cart = decreaseQuantity(cart, productId);
  const total = getCartTotal(cart);
  const shipping = getShipping(total);

  showCart(cart);
  showCartCount(getItemCount(cart));
  showCartSummary(total, 0, shipping);
});

// 2. kund trycker på plus knappen (addToCart)
onButtonClick("increase", (productId) => {
  const product = findProduct(products, productId);
  cart = addToCart(cart, product);

  const total = getCartTotal(cart);
  const shipping = getShipping(total);

  showCart(cart);
  showCartCount(getItemCount(cart));
  showCartSummary(total, 0, shipping);
});

// 2. kund trycker på ta bort-knappen (removeFromCart)
onButtonClick("remove", (productId) => {
  cart = removeFromCart(cart, product);

  const total = getCartTotal(cart);
  const shipping = getShipping(total);

  showCart(cart);
  showCartCount(getItemCount(cart));
  showCartSummary(total, 0, shipping);
});

// Funktion 3

// ---------- Det som händer när sidan laddas ----------

showProducts(products, favorites);
showCart(cart);
showCartSummary(0, 0, 0);
showFavorites([]);
