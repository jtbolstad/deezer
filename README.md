# React and Redux, Webpack 2 boilerplate

## Table of contents
* [Todos](#Todo)
* [Known bugs](#known-bugs)
* [Setup](#user-content-setup)
* [Running in dev mode](#user-content-running-in-dev-mode)
* [Linting](#user-content-linting)


## Notes

Personally I prefer file lengths <300 lines, with 500 lines as an absolute maximum.

Offline support for web apps are on the rise, with Progressive Web Apps. But because of very limited local storage for web browsers, this is less interesting for a music streaming app.

The css/scss for this project is in a separate folder, with one scss file for each component. But I like the idea of having all files/code for a component (jsx, js with actions/reducers, tests etc) in the same folder. Styled components with more styling in the components is also growing.

The local dev server acts as an API proxy, forwarding requests to www.deezer.com/api.

See also comments in the source files below.

## Todo

- [ ] Responsive images with src-set
- [ ] Universal app/serverside rendering
- [ ] Add microdata (schema.org)
- [ ] Add testes (Karma or Jest, Nightwatch)
- [ ] UI-improvements: loading spinner, transitions/animations. Hide search result on blur.
- [ ] Error message when no albums found.
- [ ] Other error handling (lost network, slow response eg)
- [ ] Multi-language support.
- [ ] Accessibility (web-aria, wcag)
- [ ] Add necessary code to run with https://zeit.co/now


## Known bugs

- [ ] Some artists have no records. Clicking on some of theses artists gives no response (Eg Tony Kekko: http://api.deezer.com/artist/264972/albums)
- [ ] Release date from album, not tracks. So listing this date per track isn’t necessarily correct.



## App code 


The app code is in these files:

- [source/js/actions/deezer.js](/jtbolstad/deezer/tree/master/source/js/actions/deezer.js),
- [source/js/reducers/deezer.js](/jtbolstad/deezer/tree/master/source/js/recucers/deezer.js),
- [source/js/views/Deezer/ArtistSearch.jsx](/jtbolstad/deezer/tree/master/source/js/views/Deezer/ArtistSearch.jsx),
- [source/js/views/routes.js](/jtbolstad/deezer/tree/master/source/js/views/routes.js),
- [source/scss\*](/jtbolstad/deezer/tree/master/source/scss/),

Scaffolding is from this [boilerplate](https://github.com/Stanko/react-redux-webpack2-boilerplate) project.


## Setup

```
$ npm install
```

## Running in dev mode

```
$ npm start
```

Visit `http://localhost:3000/` from your browser of choice.
Server is visible from the local network as well.


It is using [webpack dashboard](https://github.com/FormidableLabs/webpack-dashboard), so please note the following:

**OS X Terminal.app users:** Make sure that **View → Allow Mouse Reporting** is enabled, otherwise scrolling through logs and modules won't work. If your version of Terminal.app doesn't have this feature, you may want to check out an alternative such as [iTerm2](https://www.iterm2.com/).


## Linting

For linting I'm using [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb),
but some options are overridden to my personal preferences.

```
$ npm run lint
```
