# Star Wars Resource App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and created by [Federico Tejedor Llorente](https://federicotllorente.com/) with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [MaterialUI](https://mui.com/) and the [Star Wars API 'SWAPI'](https://swapi.dev/).

You can find information such as characters, starships, planets and so on in this encyclopedia app. Also you can search for a specific rsource using the search bar. It's important to note that you need to create an account and then log in to be able to use the application.

## More about the authentication

For practical purposes, the user authentication is 'simulated', in the mean that you can enter any email (with a valid format) and password in the Sign up form. That information will be stored in your browser local storage instead of a database.

For signing in, the credentials need to be correct when you fill the form. For storing the session credentials, the browser session storage is being used in this case.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
