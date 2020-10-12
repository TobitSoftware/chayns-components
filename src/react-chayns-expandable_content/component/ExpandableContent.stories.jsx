import React from 'react';
import ExpandableContent from './ExpandableContent';

export default {
    title: 'chayns-components/ExpandableContent',
    component: ExpandableContent,
};

const Template = (args) => <ExpandableContent {...args} />;

export const BasicExample = Template.bind({});
BasicExample.args = {
    children: (
        <div style={{ maxWidth: '70ch' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            consequatur! Asperiores voluptates quaerat eaque similique totam
            repudiandae deleniti nam reiciendis reprehenderit nisi, inventore
            nostrum enim, debitis labore delectus neque blanditiis accusamus?
            Cumque quidem amet eveniet quia laudantium. Eum eius possimus
            aspernatur fugiat! Natus officiis commodi quibusdam eos sint
            deserunt accusamus?
        </div>
    ),
};
