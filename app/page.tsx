"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [kirbyPosX, setKirbyPosX] = useState(50); // Kirby's horizontal position
    const [kirbyPosY, setKirbyPosY] = useState(0); // Kirby's vertical position
    const [isJumping, setIsJumping] = useState(false);
    const [velocityY, setVelocityY] = useState(0); // Vertical velocity for jump and gravity effect

    // Default facing direction is set to left
    const [facingRight, setFacingRight] = useState(false);

    const MOVE_STEP = 10;
    const JUMP_STRENGTH = 20; // Jump strength
    const GRAVITY = 1; // Gravity effect

    // Handle keyboard controls for left, right, and jump
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            setKirbyPosX((prevPosX) => Math.min(prevPosX + MOVE_STEP, window.innerWidth - 50));
            if (!facingRight) setFacingRight(true); // Face right if moving right
        }
        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'q') {
            setKirbyPosX((prevPosX) => Math.max(prevPosX - MOVE_STEP, 0));
            if (facingRight) setFacingRight(false); // Face left if moving left
        }
        if (e.key === ' ' && !isJumping) { // Spacebar for jump
            startJump();
        }
    };

    // Start the jump by setting upward velocity
    const startJump = () => {
        setIsJumping(true);
        setVelocityY(-JUMP_STRENGTH); // Upward velocity for the jump
    };

    // Apply gravity and update position
    const applyGravity = () => {
        setKirbyPosY((prevPosY) => Math.max(prevPosY + velocityY, 0)); // Update position
        setVelocityY((prevVelocity) => prevVelocity + GRAVITY); // Apply gravity to velocity

        // If Kirby reaches the ground, stop the jump
        if (kirbyPosY === 0 && velocityY >= 0) {
            setIsJumping(false);
            setVelocityY(0); // Reset velocity when on the ground
        }
    };

    // Add event listeners for keyboard when component mounts
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Apply gravity effect on every frame using requestAnimationFrame for smooth animation
    useEffect(() => {
        const animate = () => {
            if (isJumping || velocityY !== 0) {
                applyGravity();
            }
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isJumping, velocityY, kirbyPosY]);

    return (
        <div style={styles.container}>
            {/* Logo at top-left */}
            <img src="/logo-vibe.png" alt="Vibe Logo" style={styles.logo} />

            {/* Social icons at top-right */}
            <div style={styles.socialIcons}>
                <img src="/twitter-logo.png" alt="Twitter" style={styles.icon} />
                <img src="/dex-logo.png" alt="DEXScreener" style={styles.icon} />
                <img src="/telegram-logo.png" alt="Telegram" style={styles.icon} /> {/* Updated filename */}
            </div>

            {/* Kirby character */}
            <div
                id="kirby"
                style={{
                    ...styles.kirby,
                    left: kirbyPosX,
                    bottom: kirbyPosY + 35,
                    transform: `scaleX(${facingRight ? 1 : -1})`, // Flip based on facing direction
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
        background: "url('/BG-VIBE.jpg') repeat-x",
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
    } as React.CSSProperties,
    logo: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '200px',
    } as React.CSSProperties,
    socialIcons: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '20px',
    } as React.CSSProperties,
    icon: {
        width: '50px',
        height: '50px',
        cursor: 'pointer',
    } as React.CSSProperties,
    kirby: {
        position: 'absolute',
        width: '75px',
        height: '75px',
        backgroundImage: "url('/kirby.gif')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    } as React.CSSProperties,
};

export default KirbyPage;
