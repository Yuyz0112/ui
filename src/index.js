import VueIcons from './icons'
import VTooltip from 'v-tooltip'
import VueResize from 'vue-resize'
import 'focus-visible'

// Exported mixins
export { default as CoupledChild } from './mixins/CoupledChild'
export { default as CoupledParent } from './mixins/CoupledParent'
export { default as DisabledChild } from './mixins/DisabledChild'
export { default as DisableScroll } from './mixins/DisableScroll'

// Require all the components that start with 'BaseXXX.vue'
const components = require.context('./components', true, /[a-z0-9]+\.vue$/)

export function install (Vue, options = {}) {
  Vue.use(VueIcons)

  Vue.use(VTooltip, Object.assign({
    defaultDelay: { show: 1000, hide: 0 },
    defaultBoundariesElement: document.body,
  }, options.vtooltip))

  Vue.use(VueResize)

  // To extract the component name
  const nameReg = /([a-z0-9]+)\./i
  // Registration
  components.keys().forEach(key => {
    const name = key.match(nameReg)[1]
    Vue.component(name, components(key))
  })
}

const plugin = {
  // eslint-disable-next-line no-undef
  version: VERSION,
  install,
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
