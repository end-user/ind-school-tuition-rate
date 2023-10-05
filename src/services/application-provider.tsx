import {RateApplication, SchoolProfile} from "../shared/ts-model-data.ts";

type approvedCheck = {
    permitted: true,
    app: RateApplication
}
type deniedCheck = {
    permitted: false,
    school: SchoolProfile
}

export type ReapplyCheck = { cola: number } & (approvedCheck | deniedCheck)

class ApplicationProvider {
    private static instance: ApplicationProvider;

    //schools: School[] = [];

    constructor() {
        if (!ApplicationProvider.instance) {
            ApplicationProvider.instance = this
        }
        return ApplicationProvider.instance
    }

    async checkReapply(): Promise<ReapplyCheck> {
    //axios should include the auth data so the app knows
        return new Promise<ReapplyCheck>(resolve => {
            return resolve
        })
    }
}

export default new ApplicationProvider()