# Telemetry-pwa

It is a Progressive Web App made for displaying the System data fethced by the [Chrome extension](https://github.com/hitgo00/simple-chrome-extension)

# Architectire
![telemetry-architecture](https://user-images.githubusercontent.com/41156157/114607695-77a3b680-9cba-11eb-9f28-bd7cf701e0ed.png)

![telemetry-chart](https://user-images.githubusercontent.com/41156157/114594941-728b3b00-9cab-11eb-91cb-aac27e652df5.png)

For stats calculations, two simple functions has been [exported](https://github.com/hitgo00/telemetry-pwa/blob/main/src/main.go) from Go file which is used in PWA using Web Assembly.

# Checking it Out!
Open [https://telemetry-pwa.vercel.app/](https://telemetry-pwa.vercel.app/) in the Chrome browser, install PWA by clicking on download button on address bar.

Then follow the instructions in popup:


<img width="700" alt="Screenshot 2021-04-01 at 1 37 18 AM" src="https://user-images.githubusercontent.com/41156157/113204343-d44eac80-928a-11eb-977a-798a8043a3d2.png">

Demo video: https://user-images.githubusercontent.com/41156157/114594331-c3e6fa80-9caa-11eb-8b3c-9a7eebabdcc7.mov


## Development

- You need Node & Yarn to start the development environment. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com).

- Run the development server using:

```bash
yarn install
yarn start
```


- For production build:

```bash
yarn install
yarn build
```
