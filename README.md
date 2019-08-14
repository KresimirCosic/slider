# Simple responsive slider using jQuery

This is a simple slider using **jQuery**. To download the files type this or paste into terminal the following:

```sh
$ git clone https://github.com/KresimirCosic/slider
$ cd slider
```

Project is using some **npm** packages for *development* and *production* environments via *Webpack*; to install them use the following:

```sh
$ npm install
```

After installation has completed you can either run:

```sh
$ npm run start
```

This will open up a *development* environment (deafult port 8080 which can be changed in **package.json** file by adding a flag to the **start** command). This environment is utilizing:

- live reload
- it is read from memory not written onto disk
- styles are injected into DOM after JavaScript loads

You can, in turn, try building the project for *production* environment by using this command:

```sh
$ npm run build
```

This will create a **dist/** directory in the project root, with some features like:

- every re-build will empty the **dist/** directory beforehand
- minification of CSS, JS and HTML
- CSS is now injected via stylesheet file(s) instead injected directly into DOM (this makes the UX for end-users better)