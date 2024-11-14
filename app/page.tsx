"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [kirbyPosX, setKirbyPosX] = useState(50); // Kirby's horizontal position
    const [kirbyPosY, setKirbyPosY] = useState(0); // Kirby's vertical position for jumping
    const [isJumping, setIsJumping] = useState(false);
    const [facingRight, setFacingRight] = useState(true);
    const [isMuted, setIsMuted] = useState(true); // Control mute/unmute for YouTube video
    const [velocityY, setVelocityY] = useState(0); // Vertical velocity for gravity effect

    const MOVE_STEP = 10;
    const JUMP_STRENGTH = 20;
    const GRAVITY = 1;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            setKirbyPosX((prevPosX) => Math.min(prevPosX + MOVE_STEP, window.innerWidth - 75)); // Adjust for new Kirby size
            setFacingRight(true);
        }
        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'q') {
            setKirbyPosX((prevPosX) => Math.max(prevPosX - MOVE_STEP, 0));
            setFacingRight(false);
        }
        if ((e.key === ' ' || e.key.toLowerCase() === 'z' || e.key === 'ArrowUp') && !isJumping) {
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
        setKirbyPosY((prevPosY) => Math.max(prevPosY + velocityY, 0)); // Ensure Kirby doesn’t fall below ground level
        setVelocityY((prevVelocity) => prevVelocity + GRAVITY); // Gravity effect

        // Stop falling if Kirby reaches the ground level
        if (kirbyPosY <= 0 && velocityY >= 0) {
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

    // Apply gravity effect on every frame
    useEffect(() => {
        const gravityInterval = setInterval(() => {
            if (isJumping || velocityY !== 0) {
                applyGravity();
            }
        }, 30);

        return () => clearInterval(gravityInterval);
    }, [isJumping, velocityY, kirbyPosY]);

    return (
        <div style={styles.container}>
            {/* Logo at top-left */}
            <img src="/logo-vibe.png" alt="Vibe Logo" style={styles.logo} />

            {/* Social icons at top-right with links */}
            <div style={styles.socialIcons}>
                <a href="https://x.com/Vibe_On_Solana" target="_blank" rel="noopener noreferrer">
                    <img src="/twitter-logo.png" alt="Twitter" style={styles.icon} />
                </a>
                <a href="https://dexscreener.com/solana/4b6akdqcqpqaylbkmdex4k9nrszj86qdax8vapzp5ra6" target="_blank" rel="noopener noreferrer">
                    <img src="/dex-logo.png" alt="DEXScreener" style={styles.icon} />
                </a>
                <a href="https://t.me/+1HkDem0pFos4YjU0" target="_blank" rel="noopener noreferrer">
                    <img src="/telegram-logo.png" alt="Telegram" style={styles.icon} />
                </a>
            </div>

            {/* Kirby character */}
            <div
                id="kirby"
                style={{
                    ...styles.kirby,
                    left: kirbyPosX,
                    bottom: kirbyPosY + 35,
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
        width: '150px', // Increased size for the logo
    } as React.CSSProperties,
    socialIcons: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '15px', // Increased spacing between icons
    } as React.CSSProperties,
    icon: {
        width: '40px', // Increased size for social icons
        height: '40px',
        cursor: 'pointer',
    } as React.CSSProperties,
    kirby: {
        position: 'absolute',
        width: '75px', // Increased size for Kirby
        height: '75px',
        backgroundImage: "url('/kirby.gif')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    } as React.CSSProperties,
};

export default KirbyPage;
