function Productcard({ name = 'Iphone 17', description = 'Mobile phone', price = 80000 }) {
    return (
        <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product Image" />
            <h2>Product Name: {name}</h2>
            <p>Product Description: {description}</p>
            <p>Price: {price}</p>
            <button>Add to Cart</button>
        </div>
    )
}
export default Productcard;