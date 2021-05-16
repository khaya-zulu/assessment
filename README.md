Project information can be found below

## Getting Started

```bash
cd assessment-app
```

```bash
yarn
```

## Executing the code

```bash
cd src
```

```bash
yarn start
```

## Deployments

The configuration for the analyze process can be found in `src/core/constants` works off the following logic:

1. Each field in the object is a rule.
2. If the value is a number, a length check will run.
3. If the value is a string, a lookup check will run.
4. If the value is a regex pattern, a regex test will run.
