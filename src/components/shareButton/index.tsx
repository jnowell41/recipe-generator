import styles from './shareButton.module.css';
import { useEffect, useState } from 'react';

const ShareButton = () => {

    const [ gotShare, setGotShare ] = useState<boolean>(false);

    const shareContent = {
        title: 'Recipe',
        text: '',
        url: window.location.href
    };

    useEffect(() => {
        if((navigator as Navigator).share && !gotShare) {
            setGotShare(true);
        }
    }, [])

    function sharePage() {
        (navigator as Navigator).share(shareContent)
        .then(() => {
            console.log('Shared successfully');
        })
        .catch((error) => {
            console.error('Sharing failed:', error);
        });
    }

    if(gotShare) {
        return (
            <svg className={styles.svg} onClick={sharePage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
              />
            </svg>
          );
    }
    else {
        return null
    }
    
};

export default ShareButton;