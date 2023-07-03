import React from 'react';
import { Card, CardBody } from '@windmill/react-ui'
import { Button } from '@windmill/react-ui'
import { MdEdit } from 'react-icons/md'
import ConfigIcon from "../Icon/ConfigIcon";

const GameCard = ({ game }) => {
    return (
        <Card>
            <CardBody>
                <span>
                    { game.name }
                </span>
                
                <Button size="small" layout="link">
                    <ConfigIcon>
                        <MdEdit/>
                    </ConfigIcon>
                </Button>
            </CardBody>
        </Card>
    );
};

export default GameCard;
