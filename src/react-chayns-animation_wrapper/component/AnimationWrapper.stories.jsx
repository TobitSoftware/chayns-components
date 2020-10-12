import React from 'react';
import AnimationWrapper from './AnimationWrapper';

export default {
    title: 'chayns-components/AnimationWrapper',
    component: AnimationWrapper,
};

const Template = (args) => <AnimationWrapper {...args} />;

export const BasicExample = Template.bind({});
BasicExample.args = {
    children: (
        <div className="content__card content__card--warning">
            This component just serves as a wrapper around its children. The
            children will enter the screen with a height of 0 and grow to their
            original size.
        </div>
    ),
};

export const WithLongDuration = Template.bind({});
WithLongDuration.args = {
    children: (
        <div className="content__card content__card--warning">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
            ipsa similique placeat optio harum, vitae expedita magnam est, fuga
            dolorum facere qui recusandae quidem corporis cupiditate totam quo.
            Odit velit accusantium odio at soluta, est eum ullam natus earum
            sint.
        </div>
    ),
    animationTime: 2,
};
