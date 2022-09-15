# Merkle coding challenge

This is my approach to the coding challenge given by Merkle. Below I will explain how to install and run this repository. In addition to that I will leave some points that could further improve the project.

# Installation and execution

While I have used `pnpm` to install dependencies and run the project I have also tried doing the same with `npm` and `yarn` and they seem to work without problem, so it is up to whoever is going to install this project to use their preferred packager.

To install the project run:

```js
  pnpm install

  // or

  yarn install

  // or

  npm install
```

After installing the project try running it by executing the following:

```js
  pnpm dev

  // or

  yarn dev

  // or

  npm run dev
```

If you want to build and serve the project run the following:

```js
  pnpm build
  pnpm preview

  // or
  yarn build
  yarn preview

  // or
  npm run build
  npm run preview
```

# Potential project improvements

The following points I will mention are things that in my opinion could be improved if I had more time to work on this project:

- Add tooltips to card content so user can see in more detail what each element means well.
- Add placeholders for loading UI elements.
- Add jest to the project together with unit tests for components and helpers.
- Add some E2E tests.
- Abstract `useFetchRandomTopStories` hook logic into a `useFetch` hook so it can be reused in future endpoints calls. Or replace the hook with `React Query` to be able to use all the nice features it brings out of the box.

# Curiosities

The static images I use in this project were created using [stable diffusion ai](https://stability.ai/blog/stable-diffusion-public-release) on my computer so they are completely unique 😜
