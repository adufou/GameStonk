import React from 'react';
import { Card, CardBody } from '@windmill/react-ui'
import { Button } from '@windmill/react-ui'
import { MdEdit } from 'react-icons/md'
import ConfigIcon from "../Icon/ConfigIcon";
import { GrSubtract } from 'react-icons/gr'

const GameCard = ({ game }) => {
    return (
        <Card>
            <CardBody className='flex place-content-between'>
                <span>
                    { game.name }
                </span>
                
                <div>
                    <Button size="small" layout="link">
                        <ConfigIcon>
                            <MdEdit/>
                        </ConfigIcon>
                    </Button>
                    <Button size="small" layout="link">
                        <ConfigIcon>
                            <GrSubtract/>
                        </ConfigIcon>
                    </Button>                    
                </div>
            </CardBody>
        </Card>
    );
};

export default GameCard;
