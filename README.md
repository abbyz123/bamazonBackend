# bamazonBackend
a fictional online store "bamazon" backend in nodejs. There are two script handling bamazon database:

## bamazonCustomer.js
bamazonCustomer.js handles customer request to purchase items. A demo gif is shown as follow:
![bamazon customer](https://github.com/savannahz123/bamazonBackend/blob/master/customerDemoGif.gif)

If the product inventory quantity is less than customer's request, the program will show insufficient inventory message:
![bamazon customer insufficient inventory](https://github.com/savannahz123/bamazonBackend/blob/master/customerDemoInsufficientGif.gif)

## bamazonManager.js
bamazonManager.js handles manager operations on the product inventory.
1. Show all inventory

![manager option 1](https://github.com/savannahz123/bamazonBackend/blob/master/manager1Gif.gif)

2. Show low inventory

![manager option 2](https://github.com/savannahz123/bamazonBackend/blob/master/manager2Gif.gif)

3. Add inventory

![manager option 3](https://github.com/savannahz123/bamazonBackend/blob/master/manager3.gif)

4. Add new product

![manager option 4](https://github.com/savannahz123/bamazonBackend/blob/master/manager4Gif.gif)
