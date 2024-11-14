import { useState, useEffect } from 'react';

const KirbyPage = () => {
    // State for Kirby's position and jumping state
    const [posX, setPosX] = useState(0);
    const [isJumping, setIsJumping] = useState(false);

    // Event handler for keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            setPosX((prevX) => prevX + 10);
        }
        if (e.key === 'ArrowLeft') {
            setPosX((prevX) => prevX - 10);
        }
        if (e.key === ' ' && !isJumping) { // Space bar for jump
            setIsJumping(true);
            setTimeout(() => {
                setIsJumping(false);
            }, 500); // 0.5 seconds for jump duration
        }
    };

    // Add event listener for keydown when component mounts
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isJumping]);

    return (
        <div style={styles.container}>
            <div
                id="kirby"
                style={{
                    ...styles.kirby,
                    transform: `translateX(${posX}px) translateY(${isJumping ? '-100px' : '0'})`,
                }}
            ></div>
        </div>
    );
};

// Inline styles for simplicity
const styles = {
    container: {
        margin: 0,
        overflow: 'hidden',
        background: "url('/BG-VIBE.jpg') repeat",
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    } as React.CSSProperties,
    kirby: {
        position: 'absolute',
        bottom: '50px',
        width: '50px',
        height: '50px',
        backgroundImage: "url('/kirby.gif')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        transition: 'transform 0.5s',
    } as React.CSSProperties,
};

export default KirbyPage;
