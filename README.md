<img width="640" alt="Screenshot 2024-10-11 at 12 33 43" src="https://github.com/user-attachments/assets/fdaec704-a849-4ba8-887c-c8148c654582">

### How to fix the error? 🤕
```
Error: Could not find the @angular-devkit/build-angular:dev-server builder’s node package
```

I think there is something wrong with then Angular-CLI version that you are using... Please run these 2 commands:

```
1)
npm uninstall @angular-devkit/build-angular

then:

2)
npm install @angular-devkit/build-angular@^17.0.0 --save-dev
```

If there is still an issue please remove current `node_modules` folder then install the project with this command:

```
npm install --legacy-peer-deps
```


## 1) Install
Clone this project on your machine then run this command in terminal:

```
cd posts
npm install
```

**Note:** Please make sure [Angular CLI](https://angular.dev/tools/cli) and a stable version of [Node JS](https://nodejs.org/en/download/package-manager/current) are already installed on your machine.

## 2) Start
In order to start the project run this command in terminal:

```
npm start
```

The project is available at this address: `http://localhost:4200/`

## 3) Unit Tests
Tests have been added, run this command in terminal to run them:

```
npm run test
```

## 4) E2E Tests
I've written e2e tests with Playwright that you can find them here: `./posts/e2e` In order to run e2e tests, first of all you need to start the project then, run this command in terminal:

```
npm run e2e:test
```

## 5) Are you a fan of Docker? 🐳
No worries... This project is dockerized. First of all, make sure Docker is installed on your machine then, run this command in terminal:

```
docker-compose up
```

**Note:** If you are running the project with Docker, you will need to install `node_modules` before running E2E and Unit tests.

Are you done? then run this command to stop containers and removes containers, networks, volumes, and images created by `up` command:

```
docker-compose down
```

## 6) Technical description about the project
In the following, I will explain a little about the work done and the reason for choosing some libraries.

### 6-1) Styles & TailWind CSS
I decided to use Tailwind CSS with SASS that alrady installed along side with Angular. I tried to make it Responsive as much as I can and use a nice color palette for the design.

### 6-2) NgRx as State Management
As you mentioned in requirements, I've used NgRx to store/share application states. There is a folder: `src/app/state` that you can find actions, effects, reducers and selectors there. I dedcided to move fetching posts logic to NgRx therefore, there is an effect that will be triggered after dispatching `fetchPosts` action. There are also other states like loading and error message with their selectors.

### 6-3) Playwright for E2E Testing
I also use Playwright for e2e testing, you can find test here: `./posts/e2e` that there is only one file: `home.spec.ts` to test Posts/Home page functionality. This test supports Development enviroment and I decided to mock API calls to make it more reliable. But in a real development enviroment, there should be 2 different test .env files `development` and `production` to make sure about functionality itself and data provided from server (If is needed).

### 6-4) App structure and folders
I decided to make it clear as much as I can... For example, you can find all shared components and pages here: `app/components` there is a specific folder for everything: services, models, and states.

### 6-5) I used Array for the solution
Since we need to switch between property keys, I decided to use Array as data structure to provide a solution. There is circular iteration on the Array including all the Post properties and the current-key changes after each click on the Square components. (based on the next Array index)

### 6-6) TODO comments
I usually add TODO comments to make review easier indeed, I mention to an improvement that can be done in the future!

## 7) Questions ⁉️

Last but not least, I write the answers to the questions here 👇

### 7-1) JWT - Why is it (or isn't it) safe to use this?

According to the Authentication/Authorization process based on the JSON Token and not the classic session-cookie method, user enters username + password then back-end code generates JSON token that we can find it in server-response header, but for this token that you shared in PDF file:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lb25lQGV4YW1wbGUubmV0IiwiYWRtaW4iOmZhbHNlLCJ2YWxpZF91bnRpbCI6IldlZCBEZWMgMzEgMjM6NTk6NTkgQ0VTVCAxOTY5In0.4bl2puoaRetNjO1GsweKOnnQsYgwNa9bQIC-WQZkuNo
```

I used JWT decoder and found it that, there are some weaknesses (security concerns) that should be fixed in token payload:

```
{
  "sub": "someone@example.net",
  "admin": false,
  "valid_until": "Wed Dec 31 23:59:59 CEST 1969"
}
```

First of all, some properties are missing there:

**1- iat:** We usually add it to determine when this token was generated from server

**2- iss:** This property mentiones to that service on the backend side that generated this token

I think it won't be a good idea to share email address in payload, I highly recommend to add `userId` or any other identifier for the value.

Besides that, Is really needed to mention to the user role in payload? as I said before, if we send UserId instead of email, we can simply find user role on the backend side.

In terms of best practices and naming convention `valid_until` won't be a good name and we need to rename it to `exp` and value should be timestamp.

Finally, I highly recommend not to store much data in token, since not sharing critical data about users is also a security goal.

### 7-2) Security concerns due to request including HTML codes:

**7-2-1) XSS:** The first and most important one is XSS attack... In the previous question, JWT token was mentioned, we usually store them in LocalStorage or Cookie! Attacker is able to inject JavaScript code and access to the victim's browser to hijack the tokan value.

**1-** Using CSP header is also an option but should be handled by server, CSP or Content-Security-Policy is a sort of response header from server that specifies which server or address is trusted for the client's browser.

**2-** Using HTTP-only cookie is also a good idea to prevent access to cookies from an injected JavaScript code by attacker.

**7-2-2) HTML injection or Defacing:** Attacker is able to injest malicious HTML codes, for example Iframe to open other webpages in backgorund.

**1-** If we only need to to render layout HTML tags like: `p, div, h1-2-3..., table etc.` we can simply create a white list of allowed tags and replace others like iframe or script with white space to prevent this issue.

**2-** Encoding special characters like: `< > " '` to their HTML name code version.

### 7-3) Explain the difference between mutable and immutable objects
JavaScript data types are divided in 2 different categories:

**1- Primitives:** String, Number and Boolean etc. are compared by value which are immutable, for example, consider the following code snippet:

```
let name = 'Mohammad';
name[1] = 'X';
console.log(name);
// output: Mohammad
```

As you see the output is still Mohammad and changing the index 1 to X doesn't change the value.

**2-Non-premitives:** Object, Array and FUnctions etc. are compared by reference which are mutable, for example, consider the following code snippet:

```
let obj = { name: 'Mohammad' }
let copy = obj;
obj.name = 'David';
console.log(copy);
// output: { name: 'David' }
```

As you see the output is `{ name: 'David' }` because `let copy = obj;` is compared by reference (`obj`) and any changes on the `obj` will be applied for `copy` as well.

**Pros:** I can mention to not overriding on the source variable and easy for debugging since there is a single source and you don't need to check a series of variables.

**Cons:** We need to copy source to define an immutable variable that uses more memory besides that, using spread syntax makes or nested data structure bring more complexity.

Finally, we can use JavaScript built-in `Object.freeze()`, `Object.assign()` and spread syntax `{ ...obj }` (I've used it for NgRx states) or libraries like [Immutable.js](https://immutable-js.com/) for immutability.

### 7-4) If you would have to speed up the loading of a web-application, how would you do that?

**1-** One of the most important issues is unnecessary DOM re-renders that we can fix them in Angular by `trackBy` in loops or using `changeDetection`

**2-** I thinkg using font-icon is a way to reduce server requests

**3-** Using SVG files instead of PNG etc. minify assets

**4-** Webpack supports code splitting and generates chunk files which is nice feature to use

**5-** Caching HTTP requests and API response

**6-** gzip compression is also helpful

**7-** SSR is somehow helpful since loads the minumum required JavaScript code on the users's browser

**8-** We can use some monitoring tools to find errors or check page load speed

**9-** NPM packages like webpack-bundle-analyzer are also helpful


Thank you for your attention, please let me know if there was an error while running the application so that we can solve the problem together. I hope the information in this file helps and the explanations are clear 😇
