function getCustomers() {
  return new Promise(res => setTimeout(() => res([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      city: "New York"
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      city: "Los Angeles"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      city: "Chicago"
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      city: "New York"
    },
    {
      id: 5,
      name: "Michael Johnson",
      email: "michael@example.com",
      city: "Los Angeles"
    }
  ]), 2000))
}

function getPurchases() {
  return new Promise(res => setTimeout(() => res([
    {
      customerId: 1,
      productId: 101,
      quantity: 2
    },
    {
      customerId: 2,
      productId: 102,
      quantity: 1
    },
    {
      customerId: 1,
      productId: 103,
      quantity: 3
    },
    {
      customerId: 3,
      productId: 101,
      quantity: 1
    },
    {
      customerId: 2,
      productId: 104,
      quantity: 2
    },
    {
      customerId: 4,
      productId: 103,
      quantity: 2
    },
    {
      customerId: 5,
      productId: 102,
      quantity: 1
    },
    {
      customerId: 3,
      productId: 105,
      quantity: 4
    }
  ]), 3000))
}

function getProducts() {
  return new Promise(res => setTimeout(() => res([
    {
      id: 101,
      name: "Product A",
      price: 10.99
    },
    {
      id: 102,
      name: "Product B",
      price: 5.99
    },
    {
      id: 103,
      name: "Product C",
      price: 7.5
    },
    {
      id: 104,
      name: "Product D",
      price: 15.49
    },
    {
      id: 105,
      name: "Product E",
      price: 12.99
    }
  ]), 1000))
}

async function run() {
  const customers = await getCustomers()
  
  const purchases = await getPurchases()
  //console.log('purchases', purchases)
  
  const products = await getProducts()
  //console.log('products', products)
  
  customers.map(customer => {
    customer.purchases = purchases.filter(purchase => purchase.customerId === customer.id)
      .map(purchase => {
        purchase.product = products.find(product => purchase.productId === product.id)
        return purchase
      })
      
    customer.totalSpent = customer.purchases.reduce((sum,purchase) => {
      return sum = sum + purchase.product.price
    }, 0)

    return customer
  })
  console.log('customers',JSON.stringify(customers,null,2))

}

run()
