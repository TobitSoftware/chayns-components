import React, { PureComponent } from 'react';

import { ImageAccordionGroup, ImageAccordion } from '../../src/index';

export default class ImageAccordionExample extends PureComponent {
    render() {
        const persons = [
            {
                id: '0',
                name: 'Tobias Grotenxxx',
                chaynsPersonId: '702-70831',
                task: 'CEOsadsasadasdsads',
                description: 'text',
                position: 0
            }, {
                id: '1',
                // name: 'Klaus',
                chaynsPersonId: '702-80148',
                task: 'CFO',
                description: 'test',
                position: 1
            },
            {
                id: '2',
                name: 'Tobias',
                chaynsPersonId: '702-70831',
                task: 'CEO',
                description: 'textas d as sad dsfsd fds f dsa fa dsf ds af ads f d sfdsf  ds f ads f dsf ds fdsf sdf sd f sd f dsf sd fsdf ds fsd f dsf ds f sd fd sf sd f ds f dsf ds f ds fds f ds fds fsd f dsf ds f dsf sdf dsaf',
                position: 2
            }, {
                id: '3',
                // name: 'Klaus',
                image: `https://sub60.tobit.com/u/702-80148?size=112`,
                task: 'CFO',
                // description: 'test',
                position: 3
            }
        ];

        return (
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <ImageAccordionGroup>
                        {persons.map((person) => (
                                <ImageAccordion
                                    key={person.id}
                                    headLine={person.name}
                                    image={person.image}
                                    disabled={person.isHidden}
                                    circle
                                    subHeadLine={person.task}
                                    itemIcon={<p>x</p>}
                                    iconPosition={person.position}
                                >
                                   {person.description}
                                </ImageAccordion>
                        ))}
                    </ImageAccordionGroup>
                </div>
            </div>
        );
    }
}
