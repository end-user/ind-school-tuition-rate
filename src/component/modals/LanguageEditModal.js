import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Button, Col } from 'react-bootstrap'
import Select, { createFilter } from 'react-select'

function LanguageEditModal({  show, optionsOne, optionsTwo, saveFunction, cancelFunction, setterOne, setterTwo, tempValueOne, tempValueTwo }) {

    useEffect(() => {

    }, [])
    return (
        <Modal
            show={show}
            keyboard={false}
            centered
        >
            <Container className="flex-column justify-content-center" >
                <Modal.Header>
                    Make changes to language recommendations below
                </Modal.Header>
                <Row>
                    <Col>
                        <div><strong>Specific Language</strong></div>
                    </Col>
                    <Col>
                        <div><strong>Suggested Language</strong></div>
                    </Col>
                </Row>
                <Row>
                    <Select  filterOption={createFilter({ matchFrom: 'start' })} options={optionsOne} className="p-3 col" isMulti={false} value={tempValueOne} onChange={setterOne} />
                    <Select
                        filterOption={createFilter({ matchFrom: 'start' })}
                        options={optionsTwo}
                        className="p-3 col"
                        isMulti={false}
                        value={tempValueTwo}
                        onChange={setterTwo} />

                </Row>
                <Row className="justify-content-end">
                    <Button onClick={saveFunction}>Save</Button>
                    <div className=" p-2 pointer-hover" onClick={cancelFunction}>Cancel</div>
                </Row>
            </Container>
        </Modal>
    );
}


export default LanguageEditModal;