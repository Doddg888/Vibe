"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [kirbyPosX, setKirbyPosX] = useState(50); // Kirby's position on the screen
    const [backgroundPos, setBackgroundPos] = useState(0); // Background position for camera effect
    const [isJumping, setIsJumping] = useState(false);
    const [facingRight, setFacingRight] = useState(true); // Tracks Kirby's direction

    const moveRight = () => {
        if (kirbyPosX < window.innerWidth - 100) {
            // Move Kirby within screen bounds
            setKirbyPosX((prevPosX) => prevPosX + 10);
        } else {
            // Move background instead of Kirby when reaching the right edge
            setBackgroundPos((prevPos) => prevPos - 10);
        }
        setFacingRight(true);
    };

    const moveLeft = () => {
        if (kirbyPosX > 50) {
            // Move Kirby within screen bounds
            setKirbyPosX((prevPosX) => prevPosX - 10);
        } else {
            // Move background instead of Kirby when reaching the left edge
            setBackgroundPos((prevPos) => prevPos + 10);
        }
        setFacingRight(false);
    };

    // Event handler for keyboard and touch controls
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            moveRight();
        }
        if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'Q') {
            moveLeft();
        }
        if ((e.key === ' ' || e.key === 'z' || e.key === 'Z') && !isJumping) { // Space bar or Z for jump
            setIsJumping(true);
            setTimeout(() => {
                setIsJumping(false);
            }, 500); // 0.5 seconds for jump duration
        }
    };

    // Touch controls for mobile
    const handleTouchStart = (e: TouchEvent) => {
        const touchX = e.touches[0].clientX;
        const screenWidth = window.innerWidth;

        // Determine movement based on touch position on screen
        if (touchX > screenWidth / 2) {
            moveRight();
        } else {
            moveLeft();
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
        <div style={{ ...styles.container, backgroundPositionX: `${backgroundPos}px` }}>
            <div
                id="kirby"
                style={{
                    ...styles.kirby,
                    left: kirbyPosX,
                    transform: `translateY(${isJumping ? '-100px' : '0'}) scaleX(${facingRight ? 1 : -1})`,
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
        width: '100vw',
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
        transition: 'none', // Remove animation on transform
    } as React.CSSProperties,
};

export default KirbyPage;
