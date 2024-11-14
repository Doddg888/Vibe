"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [kirbyPosX, setKirbyPosX] = useState(50); // Kirby's horizontal position on the screen
    const [kirbyPosY, setKirbyPosY] = useState(0); // Kirby's vertical offset for jumping
    const [isJumping, setIsJumping] = useState(false);
    const [facingRight, setFacingRight] = useState(true); // Tracks Kirby's direction

    // Kirby movement speed and jump properties
    const MOVE_STEP = 10;
    const JUMP_HEIGHT = 100;
    const JUMP_SPEED = 5;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            setKirbyPosX((prevPosX) => Math.min(prevPosX + MOVE_STEP, window.innerWidth - 50)); // Stay within screen bounds
            setFacingRight(true);
        }
        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'q') {
            setKirbyPosX((prevPosX) => Math.max(prevPosX - MOVE_STEP, 0)); // Stay within screen bounds
            setFacingRight(false);
        }
        if ((e.key === ' ' || e.key.toLowerCase() === 'z') && !isJumping) { // Space or Z for jump
            startJump();
        }
    };

    const startJump = () => {
        setIsJumping(true);
        let startPosY = 0;
        let direction = 1; // 1 for up, -1 for down

        const jump = () => {
            setKirbyPosY(startPosY);
            startPosY += JUMP_SPEED * direction;

            // Change direction at peak of jump
            if (startPosY >= JUMP_HEIGHT) {
                direction = -1; // Start descending
            }

            // End jump when back on the ground
            if (startPosY <= 0 && direction === -1) {
                setKirbyPosY(0);
                setIsJumping(false);
                return;
            }

            requestAnimationFrame(jump); // Continue animation
        };

        jump();
    };

    // Add event listeners for keyboard when component mounts
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div style={styles.container}>
            <div
                id="kirby"
                style={{
                    ...styles.kirby,
                    left: kirbyPosX,
                    bottom: 35 + kirbyPosY,
                    transform: `scaleX(${facingRight ? 1 : -1})`,
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
        width: '50px',
        height: '50px',
        backgroundImage: "url('/kirby.gif')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    } as React.CSSProperties,
};

export default KirbyPage;
