import { Variants } from "../../../types/types"
import { PawnCords } from "../../GameCreator";
import { TANKS_COLISION_EMPTY, TANKS_NO_COLISION_EMPTY } from "../mocks/detectColisionMock";
import { Tank } from "../tank"

interface TankDescriptor {
    variant: Variants, cords: PawnCords, isPlaced: boolean
}

const createNewTanks = (tankDescriptors: TankDescriptor[]) => {
    Tank.instances = [];
    tankDescriptors.forEach(({variant, cords}: TankDescriptor) => {
        const tank = new Tank(variant, cords);
    })
}

describe('Testing Tank tryPlacing', () => {
    it('Should place tank when other tanks do not colide', () => {
        createNewTanks(TANKS_NO_COLISION_EMPTY)
        const placedTank = Tank.instances[0];
        placedTank.tryPlacing();
        expect(placedTank.isPlacedOnBoard).toBeTruthy();
    })
    it('Should not place tank when some other tank colides', () => {
        createNewTanks(TANKS_COLISION_EMPTY)
        const placedTank = Tank.instances[1];
        placedTank.tryPlacing();
        expect(placedTank.isPlacedOnBoard).toBeFalsy();
    })
    it('Shoud not place tank that colides with a bullet', () => {

    })
})