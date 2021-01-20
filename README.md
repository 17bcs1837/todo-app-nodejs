# todo-app-nodejs

## Steps to run the application
#### npm install
#### node todoApp.js

# This app is live at
### https://app-todo-nodejs.herokuapp.com/

## Assumptions
#### 1. There is only one todo list per user.

## Approach
#### The user has to register and then login to use the app, so that it can be made available to many users.
#### The user is authenticated with JSON Web Token. Once authenticated, a authentication token is generated, this authentication token is stored as **cookie**. This cookie contains the email address of the user. Whenever the user makes a request to the server, the authentication token is verified with JWT.
#### Upon successful verification, the user is authorized to:
* 1. **CREATE** todo items.
* 2. **READ** todo items.
* 3. **DELETE** todo items.

## Database
#### The database used in this app is Postgresql. This database is hosted at https://www.elephantsql.com/
#### This app makes use of two tables:
* 1. **users** table : For storing users information.
* 2. **todos** table : For storing todos of all sers.
#### DB Schema
![Image of Yaktocat](https://i.ibb.co/jJgmByZ/users.png)
![Image of Yaktocat](https://i.ibb.co/km1xxZ9/todo.png)

#### In todos table, the **author** field stores the **email address** of the user who created the todo.

## Saving Todos
#### Whenever a user makes a request to save a todo in the database, the todo is saved in the database along with the the email of the user who created it. The email is extracted from the authentication token. The todo is also assigned a unique ID in the database.

## Displaying Todos
#### The database is queried to return all the todos where the author is the (email) authenticated user. The ID of the todos is aslo fetched and stored in a hidden field in the HTML document.

## Deleting Todos
#### The database is queried to delete the todo with the ID extracted from the HTML document and the email of the authenticated user. This makes sure that other users' todo with same data does not get deleted.
