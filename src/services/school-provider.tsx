import axios from "axios";

export type School = {
    serverId: number,
    name: string,
    orgID: string,
    operatedBy: string,
    grades: string    [],
    latitude: string,
    longitude: string,
    mailingAddress: string,
    mailingCity: string,
    mailingZip: string,
    mailingState: string,
    website: string,
    phone: string,
    orgType: string
}

class SchoolProvider {
    private static instance: SchoolProvider;

    schools: School[] = [];

    constructor() {
        if (!SchoolProvider.instance) {
            SchoolProvider.instance = this
        }
        return SchoolProvider.instance
    }

    async getSchools() {
        if (this.schools === undefined || this.schools.length == 0) {
            try {
                await axios.get('/api/organizations').then(
                    (resp) => {
                        if (Array.isArray(resp.data)) {

                            this.schools = resp.data.filter(
                                ({OrgType}) => OrgType === 'Independent School (IS)'
                            ).sort((a, b) => a.Name.localeCompare(b.Name))
                        }
                    }
                )
                console.log(this.schools)
            } catch (error) {
                console.error(error);
            }
        }
        return this.schools;
    }
}

export default new SchoolProvider()