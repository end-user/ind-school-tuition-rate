import React ,{useState}from 'react';
import { Page, Text, View, Document, StyleSheet,  Image, PDFDownloadLink } from '@react-pdf/renderer';
import Logo from './VT_AOE.jpg'

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        marginLeft: 40,
        marginRight: 50,
        display: 'flex',
        fontSize: '10px'
    },
    section: {
        flexGrow: 1,
        fontSize: 15,
        borderBottom: '1px solid rgb(25,25,25)',
        width: "90%",
        marginBottom: 5,
        marginTop: 15,
        paddingRight: 50
    },
    text: {
        margin: 5
    },
    list: {
        display: "flex",
        flexDirection: "column",
        margin: 5
    },
    image: {
        marginTop: 40,
        width: 500,
        alignSelf: "flex-end"
    },
    data: {
        backgroundColor: "rgb(220,220,220)"
    }
});

// Create Document Component
const SurveyPDFTemplate = ({ data }) => {

	const [year, setYear] = useState(new Date())

    const formatDate = (date) => {
        if (date) {
            let formattedDate = new Date(date).toLocaleDateString()
            return formattedDate
        } else {
            return new Date(Date.now()).toLocaleDateString()
        }
    }


    return (
		<>

        <Document>
            <Page size="A4" style={styles.page}>
                <Image source={Logo} style={styles.image} />
                <Text>Home Language Survey {year.getFullYear()}</Text>
                <View style={styles.view}>
                    <Text style={styles.section}>General Information</Text>
                    <Text style={styles.text}>Submit Date:
                        <span style={styles.data}>{formatDate()}</span>
                    </Text>
                    <Text style={styles.section}>Student Information</Text>
                    <Text style={styles.text}>First Name:
                        <span style={styles.data}> {data.firstName}</span>
                    </Text>
                    <Text style={styles.text}>Last Name: <span style={styles.data}>{data.lastName}</span></Text>
                    <Text style={styles.text}>DOB: <span style={styles.data}>{formatDate(data.birthDate)}</span></Text>
                    <Text style={styles.text}>Gender: <span style={styles.data}>{data.sex}</span></Text>
                    <Text style={styles.text}>Country of Birth: <span style={styles.data}>{data.birthCountry.label}</span></Text>

                    <Text style={styles.text}>US Entry Date: <span style={styles.data}>{formatDate(data.usEntryDate)}</span></Text>
                    <Text style={styles.text}>Date Student first began in any US School:<span style={styles.data}> {formatDate(data.firstUSEnrollmentDate)}</span></Text>

                </View>

                <View>
                    <Text style={styles.section}>Family Information</Text>
                    <Text style={styles.text}>Specific language:
                        <View >
                            {data.specificLanguage ?
                                <Text><span style={styles.data}>{data.specificLanguage.label}</span></Text>
                                : "None"}
                        </View>
                    </Text>
                    <Text style={styles.text}>Languages spoken at home: </Text>

                    <View style={styles.list}>
                        {data.spokenInHome ?

data.spokenInHome.map((lang, i) => (
	<Text><span key={i} style={styles.data}>{lang.label}</span></Text>
	))
	
	: "None"}
                    </View>
                    <Text style={styles.text}>Languages most often spoken to child:</Text>
                    <View style={styles.list}>
                        {data.usedMostOftenWithChild ?

data.usedMostOftenWithChild.map((lang, i) => (
                                <Text><span key={i} style={styles.data}>{lang.label}</span></Text>
                            ))
                            : "None"}
                    </View>
                    <Text style={styles.text}>Languages currently most-used at home:</Text>

                    <View style={styles.list}>
                        {data.favored ?

data.favored.map((lang, i) => (
	<Text><span key={i} style={styles.data}>{lang.label}</span></Text>
	))
	
	: "None"}
                    </View>
                    <Text style={styles.text}>Languages native to parent:</Text>

                    <View style={styles.list}>
                        {data.parentLanguages ?

data.parentLanguages.map((lang, i) => (
	<Text><span key={i} style={styles.data}>{lang.label}</span></Text>
	))
	
	: "None"}
                    </View>
                    <Text style={styles.text}>Languages first learned by child:</Text>

                    <View style={styles.list}>
                        {data.firstLearned ?

data.firstLearned.map((lang, i) => (
	<Text><span key={i} style={styles.data}>{lang.label}</span></Text>
	))
	
	: "None"}
                    </View>

                </View>

                <View>
                    <Text style={styles.section}>School Information</Text>
                    <Text style={styles.text}>Enrolling at: <span style={styles.data}>{data.enrollingAt.label}</span></Text>
                    <Text style={styles.text}>Date of enrollment: <span style={styles.data}>{formatDate(data.enrollingAtDate)}</span></Text>
                    <Text style={styles.text}>Entering Grade: <span style={styles.data}>{data.enrollingGrade.label}</span></Text>
                    <Text style={styles.text}>Screened: <span style={styles.data}> {data.wasScreened === "Y" ? "Yes" : "No"}</span></Text>
                    {data.wasScreened === "Y" ?
                        <>
                            <Text style={styles.text}>Name of screener: <span style={styles.data}>{data.screenerName}</span></Text>
                            <Text style={styles.text}>Date of screening: <span style={styles.data}>{formatDate(data.screenedDate)}</span></Text>
                        </>
                        :
                        <Text style={styles.text}>Meets ESSA definition "Immigrant Children and Youth": <span style={styles.data}>{data.isImmigrant}</span></Text>
                    }
                </View>
            </Page>
        </Document>
					</>
    )
};
export default SurveyPDFTemplate

