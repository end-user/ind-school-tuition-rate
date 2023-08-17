import {useState} from 'react'
import {Button, Card} from "react-bootstrap";
import RateApplicationTable from "../shared/RateApplicationTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {createColumnHelper} from "@tanstack/react-table";
import {RateApplication} from '../shared/ts-model-data.ts';


const ReviewApplications = () => {
    const columnHelper = createColumnHelper<RateApplication>()
    const [data, setData] = useState([
        {school: 'GREENWOOD SCHOOL', date: '5/28/2023'},
        {school: 'PRIORITY PLACEMENTS INC', date: '5/31/2023'},
        {school: 'DAVIS COMMUNITY SCHOOL', date: '6/4/2023'}
    ])
    const approveRow = async (id: number) => {
        //todo this will be a call to the server
        console.debug(`delete table row ${id}`)
        const tmpData = [...data]
        tmpData.splice(id, 1)
        setData(tmpData)
    }
    const cols =
        [
            columnHelper.accessor(row => row.school, {
                id: 'school',
                header: 'School',
            }),
            columnHelper.accessor(row => row.submittedDate, {
                id: 'submittedDate',
                header: 'Submitted Date',
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