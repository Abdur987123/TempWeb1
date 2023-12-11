// Global variables
const baseUrl = "http://localhost:3000"; // Replace with actual server URL
const sections = document.querySelectorAll(".section");

// Show and Hide sections
function showSection(id) {
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Add event listeners for section navigation buttons
document.querySelectorAll(".nav-link").forEach(button => {
  button.addEventListener("click", function () {
    showSection(this.dataset.section);
  });
});

// Functionality for "Back" button
document.getElementById("back-button").addEventListener("click", function () {
  if (document.getElementById("addProductSection").classList.contains("active")) {
    showSection("main-section");
  }
});

// Functionality for "Add Product" form validation
const addProductForm = document.getElementById("addProductForm");
const productNameInput = document.getElementById("productName");
const productDescriptionInput = document.getElementById("productDescription");
const costPriceInput = document.getElementById("costPrice");
const sellingPriceInput = document.getElementById("sellingPrice");
const quantityInStockInput = document.getElementById("quantityInStock");

addProductForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Validate form inputs
  if (!productNameInput.value) {
    alert("Please enter a product name.");
    productNameInput.focus();
    return;
  }

  if (!productDescriptionInput.value) {
    alert("Please enter a product description.");
    productDescriptionInput.focus();
    return;
  }

  if (!costPriceInput.value) {
    alert("Please enter a cost price.");
    costPriceInput.focus();
    return;
  }

  if (!sellingPriceInput.value) {
    alert("Please enter a selling price.");
    sellingPriceInput.focus();
    return;
  }

  if (!quantityInStockInput.value) {
    alert("Please enter a quantity in stock.");
    quantityInStockInput.focus();
    return;
  }

  // Submit form data to server
  addProductForm.submit();
});
