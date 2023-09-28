import { useLayoutEffect, useRef, useState } from "react";
import { Hobbies } from "../types";
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';

const InterestCloud = (props: { hobbies: Hobbies, color: string }) => {

    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (ref && ref.current) {
            setWidth(ref.current.offsetWidth);
        }
    }, []);

    const freqs = Object.keys(props.hobbies.interests).map((word) =>
        ({ text: word, value: props.hobbies.interests[word] }));

    const fontScale = scaleLog({
        domain: [Math.min(...freqs.map((w) => w.value)), Math.max(...freqs.map((w) => w.value))],
        range: [30, 65],
    });

    const fontSizeSetter = (data) => fontScale(data.value);

    return (
        <div ref={ref} style={{}}>
            <Wordcloud
                words={freqs}
                width={width > 0 ? width : 800}
                height={window.visualViewport.height / 2}
                fontSize={fontSizeSetter}
                font={'Impact'}
                padding={0}
                spiral={'archimedean'}
                rotate={0}
                random={() => 0.5}
            >
                {(cloudWords) =>
                    cloudWords.map((w) => (
                        <Text
                            key={w.text}
                            fill={props.color}
                            textAnchor={'middle'}
                            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                            fontSize={w.size}
                            fontFamily={w.font}
                        >
                            {w.text}
                        </Text>
                    ))
                }
            </Wordcloud>
        </div>
    )
}

export default InterestCloud;