![Last modified][last-commit]
[![Issues][issues-shield]][issues-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![MIT License][license-shield]][license-url]

[![Discord][discord-shield]](https://discord.gg/SKCxwPtevJ)

<p align="center">
<picture>
  <img alt="logo" src="public/kai-logo.png" width="300">
</picture>
</p>

<p align="center">
  <a href="#demo">Demo</a> •
  <a href="#quick-deploy">Deploy</a> •
  <a href="#developing">Developing</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

This application let's you visualize your whole Kontent.ai content model with all of the relationships between your types. This is an unofficial open-source project. 

**Requirements:**
  - Kontent.ai Project Id
  - Kontent.ai Management API Key

## Demo

![Demo Animation][product-demo]

## Quick Deploy

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/strizr/kontent-model-visualizer)

## Developing
This app is created in [Vue.js (v2)](https://v2.vuejs.org/) with [vuetify](https://vuetifyjs.com/en/). 

```bash
# Initial project setup
$ npm install

# Compile and minify for production
$ npm run build

# Compile and run on local server
$ npm run serve
```

## Contributors
We have collected notes on how to contribute to this project in [CONTRIBUTING.md](CONTRIBUTING.md).

<a href="https://github.com/strizr/kontent-model-visualizer/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=strizr/kontent-model-visualizer" />
</a>

## License

[MIT](https://tldrlegal.com/license/mit-license)


[last-commit]: https://img.shields.io/github/last-commit/strizr/kontent-model-visualizer?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/strizr/kontent-model-visualizer.svg?style=for-the-badge
[contributors-url]: https://github.com/strizr/kontent-model-visualizer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/strizr/kontent-model-visualizer.svg?style=for-the-badge
[forks-url]: https://github.com/strizr/kontent-model-visualizer/network/members
[issues-shield]: https://img.shields.io/github/issues/strizr/kontent-model-visualizer.svg?style=for-the-badge
[issues-url]: https://github.com/strizr/kontent-model-visualizer/issues
[license-shield]: https://img.shields.io/github/license/strizr/kontent-model-visualizer.svg?style=for-the-badge
[license-url]: https://github.com/strizr/kontent-model-visualizer/blob/master/LICENSE
[core-shield]: https://img.shields.io/static/v1?label=&message=core%20integration&color=FF5733&style=for-the-badge
[stack-shield]: https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white&style=for-the-badge
[discord-shield]: https://img.shields.io/discord/821885171984891914?label=Discord&logo=Discord&logoColor=white&style=for-the-badge
[product-demo]: public/visualizer.gif?raw=true
