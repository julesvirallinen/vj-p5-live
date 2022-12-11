Welcome!

To start development clone the repository and run

```
nvm use # requires nvm, node version manager, possibly optional. nvm use checks the .nvmrc file and uses that version of node
yarn # install dependencies, equivalent to npm install
yarn dev
```

I use vscode. To ensure proper linting and prettier, make sure you have eslint and prettier installed to vscode to ensure consistent styling and coding standards.

The project also uses (Better Comments)[https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments] syntax for comments.

General coding style rules:

- Use functional components
  - Always pass rest-params to component and pass to main component in DOM, this enables passing styling and other things to component.
  - Use styled components to name and style elements
