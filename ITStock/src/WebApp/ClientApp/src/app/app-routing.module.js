"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./home/home.component");
var machines_component_1 = require("./machines/machines.component");
var monitors_component_1 = require("./monitors/monitors.component");
exports.routes = [
    { path: "home", component: home_component_1.HomeComponent },
    { path: "machines", component: machines_component_1.MachinesComponent },
    { path: "monitors", component: monitors_component_1.MonitorsComponent },
];
//# sourceMappingURL=app-routing.module.js.map