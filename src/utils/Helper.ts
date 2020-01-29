import { RoleType } from "roles/Roles";

export class Helper {

    public static countRoles(creeps: any, roleType: string) {
        let count = 0;
        for (let name in creeps) {
            if (creeps[name].memory.role == roleType) count++;
        }
        return count;
    }

    public static getRoleBody(level: number, roleType: RoleType): BodyPartConstant[] {
        if (level == 1) {
            // return roleBodies[roleType];
        }
        return [MOVE];
    }

    public static rndName(vorne: string = "") {
        return vorne + Math.floor(Math.random() * 1000 + 1);
    }
}

let roleBodies = {
    [RoleType.Harvest]: [WORK, MOVE, CARRY],
    [RoleType.Upgrade]: "[WORK, MOVE, CARRY]",
    [RoleType.Build]: "[WORK, MOVE, CARRY]",
}
