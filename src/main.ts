import { ErrorMapper } from "utils/ErrorMapper";
import { Helper } from "utils/Helper"
import { Roles, RoleType } from "roles/Roles"

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    // console.log(`Current game tick is ${Game.time}`);

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }

    let roles = new Roles(2, 1, 0);

    // Spawn necessary creeps if possible
    if (Helper.countRoles(Game.creeps, RoleType.Harvest) < 1) {
        // Game.spawns.Spawn1.spawnCreep(Helper.getRoleBody(1, roleType), Helper.rndName(roleType))
        Game.spawns.Spawn1.spawnCreep([MOVE, CARRY, WORK], Helper.rndName('harvester'), { memory: { role: 'harvester' } });
    }
    for (const [roleType, roleCount] of roles.rolesCount) {
        if (Helper.countRoles(Game.creeps, roleType) < roleCount) {
            // Game.spawns.Spawn1.spawnCreep(Helper.getRoleBody(1, roleType), Helper.rndName(roleType))
            Game.spawns.Spawn1.spawnCreep([MOVE, CARRY, WORK], Helper.rndName(roleType), { memory: { role: roleType } });
        }
    }

    for (let name in Game.creeps) {
        let creep: Creep = Game.creeps[name];

        if (creep.memory.role == RoleType.Harvest) {
            roles.harvest(creep);
        }
        if (creep.memory.role == RoleType.Upgrade) {
            roles.upgrade(creep);
        }
        if (creep.memory.role == RoleType.Build) {
            roles.harvest(creep);
        }
    }

});
