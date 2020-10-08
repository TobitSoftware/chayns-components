/* eslint-disable react/prefer-stateless-function,max-len */
import React, { PureComponent } from 'react';

import {
    ImageAccordionGroup,
    ImageAccordion,
    Accordion,
} from '../../src/index';

export default class ImageAccordionExample extends PureComponent {
    render() {
        const persons = [
            {
                id: '0',
                name: 'Rosie Santiago',
                task: 'CEO',
                image:
                    'https://tsimg.space/v1/images/e9da66fe-8b5b-e911-80d7-0025905a8161.jpg',
                description: 'Ich bin CEO',
                disabled: true,
                position: 0,
            },
            {
                id: '1',
                name: 'Fatima Chalis',
                task: 'CFO',
                image:
                    'https://tsimg.space/v1/images/dbb54058-8c5b-e911-80d7-0025905a8161.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate',
                position: 1,
            },
            {
                id: '2',
                name: 'Mark Peters',
                task: 'Designer',
                image:
                    'https://tsimg.space/v1/images/b2efd7e4-8c5b-e911-80d7-0025905a8161.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et',
                position: 2,
            },
            {
                id: '3',
                name: 'Leo Benz',
                image:
                    'https://tsimg.space/v1/images/81fb0afc-8c5b-e911-80d7-0025905a8161.jpg',
                task: 'IT-Berater',
                position: 3,
            },
            {
                id: '4',
                name: 'Dragutin Leo',
                image:
                    'https://tsimg.space/v1/images/6bc09b40-925b-e911-80d7-0025905a8161.jpg',
                task: 'IT-Consulting',
                description:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,',
                position: 3,
            },
            {
                id: '5',
                name: 'Peter Meyer',
                task: 'IT-Consulting',
                description:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,',
                position: 3,
            },
        ];

        const fruits = [
            {
                id: '0',
                name: 'Apple',
                image:
                    'https://tsimg.space/v1/images/e275caf2-8e5b-e911-80d7-0025905a8161.jpg',
                description: 'Ich bin Apfel',
            },
            {
                id: '1',
                name: 'Strawberry',
                task: 'CFO',
                image:
                    'https://tsimg.space/v1/images/9e92be20-8f5b-e911-80d7-0025905a8161.jpg',
                description: 'Ich bin Erdbeere',
            },
            {
                id: '2',
                name: 'Pear',
                disabled: true,
                image:
                    'https://tsimg.space/v1/images/58c50735-8f5b-e911-80d7-0025905a8161.jpg',
                description:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,',
            },
            {
                id: '3',
                name: 'Mango',
                disabled: true,
                description:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,',
            },
        ];
        return (
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <Accordion head="Personen">
                        <div className="accordion__content">
                            {/* Persons */}
                            <ImageAccordionGroup dataGroup="1">
                                {persons.map((person) => (
                                    <ImageAccordion
                                        key={person.id}
                                        headline={person.name}
                                        image={person.image}
                                        disabled={person.disabled}
                                        circle
                                        icon={<p>x</p>}
                                        subheadline={person.task}
                                        iconPosition={person.position}
                                    >
                                        {person.description}
                                    </ImageAccordion>
                                ))}
                            </ImageAccordionGroup>
                        </div>
                    </Accordion>

                    {/* Fruits */}
                    <ImageAccordionGroup>
                        {fruits.map((fruit) => (
                            <ImageAccordion
                                key={fruit.id}
                                headline={fruit.name}
                                image={fruit.image}
                                disabled={fruit.disabled}
                            >
                                {fruit.description}
                            </ImageAccordion>
                        ))}
                    </ImageAccordionGroup>
                </div>
            </div>
        );
    }
}
