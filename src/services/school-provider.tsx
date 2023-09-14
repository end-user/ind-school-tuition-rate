import axios from "axios";

export type School = {
    ServerId: number,
    Name: string,
    OrgID: string,
    OperatedBy: string,
    Grades: string    [],
    Latitude: string,
    Longitude: string,
    MailingAddress: string,
    MailingCity: string,
    MailingZip: string,
    MailingState: string,
    Website: string,
    Phone: string,
    OrgType: string
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
            } catch (error) {
                console.error(error);
            }
        }
        return this.schools;
    }
}

export default new SchoolProvider()