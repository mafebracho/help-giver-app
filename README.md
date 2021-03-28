

# Land Me A Hand

<a href="https://land-me-a-hand.herokuapp.com/" target="_blank">Land Me A Hand app at work</a>

### About

'Land' me a Hand is a web app designed to foster meaningful social interactions in a community. It is a platform where everybody can ask for or give help in their community. 

It is built with **Node.js and Express.js** and uses **Handlebars** as templating language. **MongoDB** non-relational database has been used to store data and **Mongoose** to create schema models.

### Home

<img src="https://res.cloudinary.com/elsivia/image/upload/v1616942284/my-pictures/LandMeAhand_xaeirc.png" alt="homepage" />

### Authentication
User authentication is built using Express basic authentication middleware and bcrypt as hashing algorithm for password encryption. 

### Functionalities

Once logged in you can either ask or give help. If you ask for help, you are redirected to a restricted route where you can see only your requests. You can *create* a new request, *update* or *delete* it. 
If you give help, you are sent to a landing page with all the requests, you can have a look at them by hovering over each one and, if interested, you can click on the "contact" button. Clicking the button, you can send an email to the person who asked for help. 

Try it 💻
