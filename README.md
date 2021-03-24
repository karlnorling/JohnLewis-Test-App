## Assumptions

To create an application that loads products from the JohnLewis API and displays them in a grid pattern. Once a user interacts with a product in the product grid, they get shown a page with more product information regarding that product.

## Notes

My approach was to create an application that can be run that communicates with the JohnLewis API. The server side of that application masks the API requests to the JohnLewis API. The client side of the application renders the result of the API in a products grid page or a product description page.

I've chosen a number of 3rd party libraries for this.
  - React
    - React-Query
  - Express
  - Razzle
  - Styled Components

A complete list of 3rd party libraries can of course be found in the package.json file.

## Instructions
Security first - please create your `.env.local` file with the JohnLewis API key in it.
Example:
```
API_KEY=$G#T%YHGDSTEA$gresg
```

To run application:

```bash
npm start
```

To run test:
```bash
npm test
```

Then open http://localhost:3000/ to see your app.