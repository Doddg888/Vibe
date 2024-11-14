"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [kirbyPosX, setKirbyPosX] = useState(50); // Kirby's horizontal position
    const [kirbyPosY, setKirbyPosY] = useState(0); // Kirby's vertical position
    const [isJumping, setIsJumping] = useState(false);
    const [facingRight, setFacingRight] = useState(false); // Default facing direction is left
    const [velocityY, setVelocityY] = useState(0); // Vertical velocity for gravity effect

    const MOVE_STEP = 10;
    const JUMP_STRENGTH = 15;
    const GRAVITY = 0.5;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            setKirbyPosX((prevPosX) => Math.min(prevPosX + MOVE_STEP, window.innerWidth - 50));
            setFacingRight(true); // Set to face right
        }
        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'q') {
            setKirbyPosX((prevPosX) => Math.max(prevPosX - MOVE_STEP, 0));
            setFacingRight(false); // Set to face left
        }
        if ((e.key === ' ' || e.key.toLowerCase() === 'z') && !isJumping) { // Space or Z for jump
            startJump();
        }
    };

    const startJump = () => {
        if (!isJumping) {
            setIsJumping(true);
            setVelocityY(-JUMP_STRENGTH); // Initial upward velocity for jump
        }
    };

    const applyGravity = () => {
        setKirbyPosY((prevPosY) => Math.max(prevPosY + velocityY, 0)); // Ensure Kirby doesn't fall below ground level
        setVelocityY((prevVelocity) => prevVelocity + GRAVITY); // Gravity effect

        // Stop falling if Kirby reaches the ground level
        if (kirbyPosY === 0 && velocityY >= 0) {
            setIsJumping(false);
            setVelocityY(0); // Reset velocity when hitting the ground
        }
    };

    // Add event listeners for keyboard when component mounts
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Apply gravity effect with requestAnimationFrame for smoother animation
    useEffect(() => {
        const animationFrame = () => {
            if (isJumping || velocityY !== 0) {
                applyGravity();
            }
            requestAnimationFrame(animationFrame);
        };
        requestAnimationFrame(animationFrame);
    }, [isJumping, velocityY, kirbyPosY]);

    return (
        <div style={styles.container}>
            {/* Logo at top-left */}
            <img src="/logo-vibe.png" alt="Vibe Logo" style={styles.logo} />

            {/* Social icons at top-right */}
            <div style={styles.socialIcons}>
                <img src="/twitter-logo.png" alt="Twitter" style={styles.icon} />
                <img src="/dex-logo.png" alt="DEXScreener" style={styles.icon} />
                <img src="/telegram_logo.png" alt="Telegram" style={styles.icon} />
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
        top: '10px',
        left: '10px',
        width: '100px', // Adjust size as needed
    } as React.CSSProperties,
    socialIcons: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '10px', // Space between icons
    } as React.CSSProperties,
    icon: {
        width: '30px', // Adjust size as needed
        height: '30px',
        cursor: 'pointer',
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
