import {ModuleApp, useDesktopApps} from "@owd-client/core/index";
import {OwdModuleAppSetupSseEventsContext, OwdModuleAppSetupCommandsContext, OwdModuleAppSetupStoreContext} from "@owd-client/types";

// window components
import WindowApod from "./windows/WindowApod.vue";

export default class ApodModule extends ModuleApp {
  setup() {
    return {
      name: "apod",
      singleton: true,
      windows: [
        {
          component: WindowApod,
          name: "WindowApod",
          category: "other",
          title: "Apod by NASA",
          titleMenu: "Apod",
          icon: {
            name: "mdi mdi-telescope",
            size: "25px",
            offset: {
              y: -1
            }
          },
          resizable: true,
          size: {
            width: 510,
            height: 400
          },
          position: {
            x: -1,
            y: 0,
            z: 0
          }
        }
      ]
    }
  }

  setupAssets() {
    // import additional assets
  }

  setupStore() {
    // define store structure for your module
    return {
      state: {},
      getters: {},
      mutations: {},
      actions: {}
    }
  }

  setupStoreInstance({store, terminal}: OwdModuleAppSetupStoreContext) {
    // define store structure for your window instance
    return {
      state: {},
      getters: {},
      mutations: {},
      actions: {}
    }
  }

  setupCommands({store, terminal}: OwdModuleAppSetupCommandsContext) {
    return {
      'apod': function () {
        const desktopApps = useDesktopApps()
        const projectsModuleApp = desktopApps.findApp('apod')

        if (projectsModuleApp) {
          projectsModuleApp
            .createWindow('WindowApod')
            .onMounted(windowInstance => windowInstance.open(true))

          terminal.writeln("Window opened");
        }
      }
    }
  }

  setupSseEvent({store}: OwdModuleAppSetupSseEventsContext) {
    return {
      'open-apod': function () {
        const desktopApps = useDesktopApps()
        const projectsModuleApp = desktopApps.findApp('apod')

        if (projectsModuleApp) {
          projectsModuleApp
            .createWindow('WindowApod')
            .onMounted(windowInstance => windowInstance.open(true))
        }
      }
    }
  }
}