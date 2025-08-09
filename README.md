
# Project Title

    B2B site for seller and byer can user sigle website. seller can add thir procucts and buyer can view the products and cand add cart and place order

# Tech Stack:
Node Express with type script,
mogoes for mongodb connect 
express-openid-connect for auth0 
winston 
opossum for ciruit breaker 

    
## Models
User Model,
product_item
Cart
cart_item
order
Payment
Payment_confirmation

**Data Base:** 
  MongoDB: Mongo Atlas for auto sclable
  
## Back End Architecture
MVC archithcture 

## Design Principals:
SOLID for higly Maintainable, Scalable,

## Design Pattern:
Factory methods, for like multi type payment method and multitype user resgistration
circuite Breakers for communicate with third party api's
singleton patterns single instance db connection and login instance.




