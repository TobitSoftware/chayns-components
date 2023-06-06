import { ComponentMeta, ComponentStory } from '@storybook/react';
import ScrollView from '../src/components/scroll-view/ScrollView';

export default {
    title: 'Core/ScrollView',
    component: ScrollView,
    args: {},
} as ComponentMeta<typeof ScrollView>;

const Template: ComponentStory<typeof ScrollView> = ({ ...args }) => (
    <ScrollView {...args}>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium suscipit euismod.
            Sed commodo magna eu dolor tristique rhoncus. Nam et auctor sem. Aliquam eu rhoncus
            turpis, eget auctor enim. Morbi venenatis placerat sapien, vel porta mi placerat in.
            Donec sit amet mauris id neque scelerisque molestie vel a justo. Suspendisse mollis,
            urna vitae egestas mollis, turpis lorem vulputate purus, in scelerisque nunc nisi sit
            amet nisi. Donec eleifend posuere velit id tempor. In massa erat, hendrerit sit amet
            diam eget, dapibus mattis quam. Morbi consequat, diam in convallis scelerisque, est
            lorem posuere nulla, a fringilla ligula dui sit amet arcu. Praesent mollis posuere
            lacinia. Vestibulum elementum, lectus eget convallis molestie, sem tellus sollicitudin
            sem, in efficitur enim sem sit amet ante. Duis volutpat volutpat quam. Nullam pretium
            aliquam sapien. Ut lobortis ullamcorper magna non scelerisque. Aliquam tincidunt eu urna
            et feugiat. Aliquam euismod, odio at maximus auctor, leo lectus posuere lorem, non
            pretium nisl nibh non arcu. Suspendisse nisl arcu, aliquam id quam id, ornare pretium
            felis. Morbi vitae lacinia orci. Ut hendrerit, purus quis condimentum laoreet, velit
            urna congue nisl, faucibus pellentesque ipsum quam aliquam turpis. Quisque a odio id
            mauris vestibulum dignissim. Aenean iaculis, nisl ac aliquet pellentesque, mi lorem
            convallis est, non accumsan velit erat sed sem. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Vestibulum a sem venenatis, lobortis ante non, tempus risus.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Ut at suscipit sapien. Nunc ultricies quam in ligula interdum, vitae dictum leo
            consequat. Aliquam euismod bibendum nibh id rutrum. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Maecenas turpis nunc,
            lobortis id libero id, imperdiet hendrerit metus. Curabitur cursus hendrerit nisi at
            luctus. Vivamus et turpis quis nibh sagittis euismod mattis sit amet tellus. Ut finibus
            mattis fermentum. Pellentesque vulputate efficitur enim, sit amet maximus odio elementum
            ac.
        </p>
    </ScrollView>
);

export const General = Template.bind({});
