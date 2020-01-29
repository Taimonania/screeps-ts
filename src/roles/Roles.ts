export enum RoleType {
    Harvest = 'harvest',
    Upgrade = 'upgrade',
    Build = 'build'
}

export class Roles {

    public rolesCount = new Map<RoleType, number>();

    /**
     * @param harvester the number of harvester that should be spawned
     * @param upgrader the number of upgrader that should be spawned
     * @param builder the number of builder that should be spawned
     */
    constructor(harvester: number, upgrader: number, builder: number) {
        this.rolesCount.set(RoleType.Harvest, harvester);
        this.rolesCount.set(RoleType.Upgrade, upgrader);
        this.rolesCount.set(RoleType.Build, builder);
    }

    public harvest(creep: Creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }

    public upgrade(creep: Creep) {
        if (creep.store.getFreeCapacity() == 0) {
            let controller = <StructureController>creep.room.controller;
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[3]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[3]);
            }
        }
    }
}


