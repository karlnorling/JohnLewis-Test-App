## Assumptions

To create an application that loads products from the JohnLewis API and displays them in a grid pattern. Once a user interacts with a product in the product grid, they get shown a page with more product information regarding that product.

## Notes

My approach was to create an application that can be run that communicates with the JohnLewis API. The server side of that application masks the API requests to the JohnLewis API. The client side of the application renders the result of the API in a products grid page or a product description page.

I've choosen a number of 3rd party libraries for this.
  - React
  - Express
  - Razzle
  - Styled Components

A complete list of 3rd party libraries can of course be found in the package.json file.

There are a number of 3rd party TypeScript linting issues I haven't got around to fixing.
I focused mainly to get the application running and presenting results to the user.

I've choosen to forgo of using Redux or React Context, this is primarly due to the simplicty of the app. But also there's a lot of different patterns out there: Saga, Ducks, and Immutable. There's also the React Context vs. Redux to take into considiration.

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