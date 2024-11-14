"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [kirbyPosX, setKirbyPosX] = useState(50); // Kirby's horizontal position
    const [kirbyPosY, setKirbyPosY] = useState(0); // Kirby's vertical position
    const [facingRight, setFacingRight] = useState(true);

    const MOVE_STEP = 10;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            setKirbyPosX((prevPosX) => Math.min(prevPosX + MOVE_STEP, window.innerWidth - 50));
            setFacingRight(true);
        }
        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'q') {
            setKirbyPosX((prevPosX) => Math.max(prevPosX - MOVE_STEP, 0));
            setFacingRight(false);
        }
    };

    // Add event listener for keyboard when component mounts
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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
                    <img src="/telegram_logo.png" alt="Telegram" style={styles.icon} />
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
