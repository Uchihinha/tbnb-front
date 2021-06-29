<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://vuejs.org/images/logo.svg" width="200"></a></p>

# Stock Management System

This application aims to simulate a stock management system. It was used VueJS (3.0) + Cypress (7.6) + Element Plus + Docker + Node v12.13.

Follow the [link](https://github.com/Uchihinha/tbnb-api) to check out the backend of this application.

## Live Demo

You can get live demo in the following link: https://tbnb-front.herokuapp.com

## Installation
### Development
Clone this repo and install the dependencies
```
npm install
```
Copy the file ``.env.example`` into ``.env`` and ``.env.production`` files.

Finally, run the following command to start you development server
`PS: It will run in port 80 if you DON'T changed it in .env file`
```
npm run serve
```


### Production

You need to have Docker installed in your environment.

Copy the file ``.env.example`` into ``.env`` and ``.env.production`` files.

Then, clone this repo and build docker image.


```
docker build -t tbnb/front .
```

It will build our image, then, start the container:

```
docker run -it -p 80:80 --rm --name tbnb-front tbnb/front
```

Now the application is running in [http://localhost:80](http://localhost:8080) by default.

## Testing

The project uses [Cypress](https://www.cypress.io/) for tests.

Run `npx cypress open` if you want to show an interface to get the tests and `npx cypress run` if want to show that just in CLI.
## Linting

The project uses [ESLint](https://eslint.org/) for linting.

To lint all the project just run the following:
```
npm run lint
```