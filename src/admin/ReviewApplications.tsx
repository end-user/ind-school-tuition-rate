import {useState} from 'react'
import {Button, Card} from "react-bootstrap";
import RateApplicationTable from "../shared/RateApplicationTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {createColumnHelper} from "@tanstack/react-table";
import {RateApplication} from '../shared/ts-model-data.ts';
import { rateApplications } from '../shared/mock-data.ts';


const ReviewApplications = () => {
    const columnHelper = createColumnHelper<RateApplication>()
    const [data, setData] = useState<RateApplication[]>(rateApplications)
    const approveRow = async (id: number) => {
        //todo this will be a call to the server
        console.debug(`delete table row ${id}`)
        const tmpData = [...data]
        tmpData.splice(id, 1)
        setData(tmpData)
    }
    const cols =
        [
            columnHelper.accessor(row => row.schoolHead?.schoolProfile?.name, {
                header: 'School',
                cell:(props)=>(
                    <a href={`/apply/${props.row.original.id}`}>{props.getValue()}</a>
                )
            }),
            columnHelper.accessor(row => row.submittedDate, {
                header: 'Submitted Date',
                cell:props=>props.getValue()?.toLocaleDateString()
            }),
            columnHelper.display({
                id: 'approve',
                cell: (tableProps) => (
                    <Button variant={'link'} className={'text-success'}
                            onClick={() => approveRow(tableProps.row.index)}>
                        <FontAwesomeIcon icon={faCircleCheck}/>
                    </Button>
                ),
            })

        ]

    return (
        <Card>
            <RateApplicationTable columns={cols} data={data}/>
        </Card>
    );
}

export default ReviewApplications