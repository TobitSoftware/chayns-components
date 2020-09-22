import React, { useState, useCallback } from 'react';
import ColorScheme from '../../src/react-chayns-color_scheme/component/ColorScheme';
import Button from '../../src/react-chayns-button/component/Button';
import ColorPicker from '../../src/react-chayns-color_picker/component/ColorPicker';
import { hsvToHexString } from '../../src/utils/color';
import Bubble from '../../src/react-chayns-bubble/component/Bubble';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';
import Badge from '../../src/react-chayns-badge/component/Badge';
import RadioButton from '../../src/react-chayns-radiobutton/component/RadioButton';
import Slider from '../../src/react-chayns-slider/component/Slider';
import Icon from '../../src/react-chayns-icon/component/Icon';

const ColorSchemeExample = () => {
    const [color, setColor] = useState(chayns.env.site.color);
    const [secondaryColor, setSecondaryColor] = useState(chayns.env.site.color);
    const [colorMode, setColorMode] = useState(chayns.env.site.colorMode);
    const [fontSize, setFontSize] = useState(15);
    const [faOpacity, setFaOpacity] = useState(0.4);

    const onColorChangeEnd = useCallback((hsv) => {
        setColor(hsvToHexString(hsv));
    }, [setColor]);
    const onSecondaryColorChangeEnd = useCallback((hsv) => {
        setSecondaryColor(hsvToHexString(hsv));
    }, [setSecondaryColor]);

    return (
        <div>
            <ColorScheme
                color={color}
                secondaryColor={secondaryColor}
                colorMode={colorMode}
                style={{ fontSize: `${fontSize}px` }}
                cssVariables={{ '--fa-secondary-opacity': faOpacity }}
            >
                <div className="chayns__background-color--cw-body-background">
                    <ColorPicker color={color} onChangeEnd={onColorChangeEnd} bubblePosition={Bubble.position.BOTTOM_RIGHT}/>
                    <ColorPicker color={secondaryColor} onChangeEnd={onSecondaryColorChangeEnd} bubblePosition={Bubble.position.BOTTOM_RIGHT}/>
                    <RadioButton name="colormode" value={0} onChange={setColorMode} defaultChecked={chayns.env.site.colorMode === 0}>
                        Default ColorMode
                    </RadioButton>
                    <RadioButton name="colormode" value={1} onChange={setColorMode} defaultChecked={chayns.env.site.colorMode === 1}>
                        Dark Mode
                    </RadioButton>
                    <RadioButton name="colormode" value={2} onChange={setColorMode} defaultChecked={chayns.env.site.colorMode === 2}>
                        Bright Mode
                    </RadioButton>
                    <Slider
                        min={10}
                        max={25}
                        value={fontSize}
                        valueFormatter={(v) => `${Math.round(v, 10)}px`}
                        showValueInThumb
                        onChange={setFontSize}
                        step={1}
                    />
                    <Slider
                        min={0}
                        max={1}
                        value={faOpacity}
                        valueFormatter={(v) => `${Math.round(v * 100)}%`}
                        showValueInThumb
                        onChange={setFaOpacity}
                        step={0.01}
                    />
                    <h2>Headline</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam
                        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet
                        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                    <Button style={{ marginRight: '10px' }}>Button</Button>
                    <Button secondary>Button</Button>
                    <Accordion head="Accordion" right={<Badge>100</Badge>}>
                        <div className="accordion__content">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                            sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
                            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </div>
                    </Accordion>
                    <Icon
                        icon="fad fa-alien-monster"
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            fontSize: '5em',
                            margin: '10px',
                        }}
                    />
                </div>
            </ColorScheme>
        </div>
    );
};

export default ColorSchemeExample;
