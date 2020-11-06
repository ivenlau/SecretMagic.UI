# SecretMagic.UI

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Demo
Https://www.secretmagic.tech


Docker deploy:
1. npm install
2. npm run build
3. docker build . -t secretmagic.ui:latest
 docker run -itd --name secretmagic.ui -p 4000:80 secretmagic.ui