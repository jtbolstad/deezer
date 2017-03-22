# Deezer-app

This is a React app fetching music data from Deezer's api, and presenting artist lists, albums and tracks as in a music player.


## Table of contents
* [Notes](#notes)
* [Todo](#todo)
* [Issues](#issues)
* [Setup](#user-content-setup)
* [Running in dev mode](#user-content-running-in-dev-mode)
* [Linting](#user-content-linting)


## Notes

A responsive solution for the album grid using the new CSS-grid option is in a branch called css-grid. This works in the latest versions of Chrome and Firefox. I have not yet added a polyfill to make this work in other browsers.

Personally I prefer file lengths <300 lines, with 500 lines as an absolute maximum.

Offline support for web apps are on the rise, with Progressive Web Apps. But because of very limited local storage for web browsers, this is less interesting for a music streaming app.

The css/scss for this project is in a separate folder, with one scss file for each component. But I like the idea of having all files/code for a component (jsx, js with actions/reducers, tests etc) in the same folder. Styled components with more styling in the components is also growing.

The local dev server acts as an API proxy, forwarding requests to www.deezer.com/api.

See also comments in the source files below.

## Todo

- [ ] Responsive images with src-set
- [ ] Universal app/serverside rendering
- [ ] Add microdata (schema.org)
- [ ] Accessibility (web-aria, wcag)
- [ ] UI-improvements: transitions/animations.
- [ ] Hide search result on blur.
- [ ] Add testes (Karma or Jest, Nightwatch)
- [ ] Multi-language support.


## Issues

Release date from album, not tracks. So listing this date per track isn’t necessarily correct.

The search function automatically fetches data after 300ms debounce (so we don't fetch data on every keystroke). So the submit button is really not necessary - it's just a dumb button. In an SSR-app this would have a purpose. But again: In a React music streaming app it's superfluous.


## App code


The app code is in these files:

- [source/actions/artistSearch.js](//www.github.com/jtbolstad/deezer/tree/master/source/actions/artistSearch.js),
- [source/reducers/artistSearch.js](//www.github.com/jtbolstad/deezer/tree/master/source/recucers/artistSearch.js),
- [source/containers/ArtistSearch.jsx](//www.github.com/jtbolstad/deezer/tree/master/source/containers/ArtistSearch.jsx),
- [source/routes.js](//www.github.com/jtbolstad/deezer/tree/master/source/routes.js),
- [source/scss\*](//www.github.com/jtbolstad/deezer/tree/master/source/scss/),

Scaffolding is from this [boilerplate](https://github.com/Stanko/react-redux-webpack2-boilerplate) project.


## Setup

```
$ npm install
```

## Running in dev mode

```
$ npm start
```

Windows has some problems with Webpack Dashboard. Run webpack-dev-server direktly instead:

```
$ npm run Lstart-win
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
