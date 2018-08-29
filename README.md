# webpack-debug

Repo to reproduce memory leak and problems when using webpack, happypack and react-hot-loader

how to start

```
yarn debug
```

Open Chrome browser at:

```
chrome://inspect
```

- [ ] Take a Heap Snapshot

start editting A.js or B.js or App.js, so it will trigger hot reload,

- [ ] then take another Heap Snapshot

and try to compare them, to debug which new memory was allocated
