// src/components/DetailedActivityModal.tsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DayWiseActivity } from '../types';

interface Props {
    show: boolean;
    onHide: () => void;
    dayActivity: DayWiseActivity | null;
}

const DetailedActivityModal: React.FC<Props> = ({ show, onHide, dayActivity }) => {
    if (!dayActivity) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Detailed Activity for {dayActivity.date}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {dayActivity.items.children.map((item, index) => (
                        <li key={index}>
                            {item.label}: {item.count}
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailedActivityModal;
