## File-based Routing

Routes will be auto-generated for Vue files in this dir with the same file structure.
Check out [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) for more details.

### Path Aliasing

`@/` is aliased to `./src/` folder.


`@/` is aliased to `./src/` folder.
`@myTypes/` is aliased to `./src/@types` folder.

`@atoms/` is aliased to `./src/atoms` folder.
`@molecules/` is aliased to `./src/molecules` folder.
`@organisms/` is aliased to `./src/organisms` folder.
`@templates/` is aliased to `./src/templates` folder.

`@services/` is aliased to `./src/services` folder.

For example, instead of having

```ts
import { isDark } from '../../../../logic'
```

now, you can use

```ts
import { isDark } from '@/logic'
```
