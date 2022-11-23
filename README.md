# Nuxt Module for SSR Lit Elements
This Module is based on https://github.com/prashantpalikhe/nuxt-ssr-lit, after talking with the owner we decided that I would be better off creating a separate repo for the time being. But I credit a lot of the initial findings to his repo.

## State of Module
At this current time the Nuxt3 integration seems to work as expected, I need to add unit tests and get it published into npm. Nuxt2 is currently a work in progress, the issue atm is `customElements` is not defined in Nuxt2 server side like Nuxt3 so I need to figure out a work around to this.

To use VM modules instead of global window in main context it will switch to VM module rendering if the `—experimental-vm-modules` flag is set under `NODE_OPTIONS` env.

## Future plans
- Fix Nuxt2 integration
- Publish to npm
- Write some unit tests
- Create a better playground for the Lit web components
- Automatic Versioning with [changesets](https://github.com/changesets/changesets)
- GitHub Actions CI pipeline

## How can I help?
We need it testing on multiple different scenarios, so test and leave any issues on the repo.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
