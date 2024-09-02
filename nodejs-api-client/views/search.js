document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');

    async function fetchProducts(query) {
        try {
            const response = await fetch(`http://localhost:32002/api/product?search=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            console.log('Products fetched:', products); // Debugging line
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function displayProducts(products) {
        const tbody = document.getElementById('productsBody');
        tbody.innerHTML = '';

        if (products.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4">No products found</td>';
            tbody.appendChild(row);
            return;
        }

        products.forEach(product => {
            const row = document.createElement('tr');
            row.classList.add('product-row');

            row.innerHTML = `
                <td id="ide">${product.id}</td>
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td><img src="${product.imagenUrl}" alt="${product.nombre}"></td>
            `;

            tbody.appendChild(row);
        });
    }

    window.searchProducts = () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchProducts(query);
        } else {
            console.log('Search query is empty');
        }
    };

    // Optionally, you can fetch and display all products on page load
    // fetchProducts('');
});
