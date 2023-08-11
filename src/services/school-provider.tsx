import axios from "axios";

class SchoolProvider {
    schools;

    constructor() {
        if (!SchoolProvider.instance) {
            SchoolProvider.instance = this
        }
        return SchoolProvider.instance
    }

    async getSchools() {
        if (this.schools == null) {
            try {
                const response = await axios.get('/api/organizations').then(
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