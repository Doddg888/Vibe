"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [posX, setPosX] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [facingRight, setFacingRight] = useState(true); // Tracks Kirby's direction

    // Event handler for keyboard and touch controls
    const handleKeyDown = (e: KeyboardEvent | TouchEvent) => {
        if (e instanceof KeyboardEvent) {
            if (e.key === 'ArrowRight') {
                setPosX((prevX) => prevX + 10);
                setFacingRight(true);
            }
            if (e.key === 'ArrowLeft') {
                setPosX((prevX) => prevX - 10);
                setFacingRight(false);
            }
            if (e.key === ' ' && !isJumping) { // Space bar for jump
                setIsJumping(true);
                setTimeout(() => {
                    setIsJumping(false);
                }, 500); // 0.5 seconds for jump duration
            }
        }
    };

    // Touch controls for mobile
    const handleTouchStart = (e: TouchEvent) => {
        const touchX = e.touches[0].clientX;
        const screenWidth = window.innerWidth;

        // Determine movement based on touch position on screen
        if (touchX > screenWidth / 2) {
            setPosX((prevX) => prevX + 10);
            setFacingRight(true);
        } else {
            setPosX((prevX) => prevX - 10);
            setFacingRight(false);
        }
    };

    // Add event listeners for keyboard and touch controls when component mounts
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [isJumping]);

    return (
        <div style={{ ...styles.container, backgroundPositionX: `-${posX}px` }}>
            <div
                id="kirby"
                style={{
                    ...styles.kirby,
                    transform: `translateX(${posX}px) translateY(${isJumping ? '-100px' : '0'}) scaleX(${facingRight ? 1 : -1})`,
                }}
            ></div>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        margin: 0,
        overflow: 'hidden',
        background: "url('/BG-VIBE.jpg') repeat-x", // Repeat horizontally
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    } as React.CSSProperties,
    kirby: {
        position: 'absolute',
        bottom: '35px', // Lowered Kirby by 15px
        width: '50px',
        height: '50px',
        backgroundImage: "url('/kirby.gif')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        transition: 'transform 0.5s',
    } as React.CSSProperties,
};

export default KirbyPage;
