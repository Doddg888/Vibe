"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [kirbyPosX, setKirbyPosX] = useState(50); // Kirby's horizontal position
    const [facingRight, setFacingRight] = useState(true);
    const [isMuted, setIsMuted] = useState(true); // Control mute/unmute for YouTube video

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

            {/* YouTube Embed */}
            <div style={styles.youtubeContainer}>
                <iframe
                    src={`https://www.youtube.com/embed/lh0rbqDJ6pQ?autoplay=1&loop=1&mute=${isMuted ? 1 : 0}`}
                    title="Background Music"
                    width="0"
                    height="0"
                    allow="autoplay"
                    style={{ border: 'none' }}
                ></iframe>
                <button onClick={() => setIsMuted(!isMuted)} style={styles.unmuteButton}>
                    {isMuted ? "Unmute Sound" : "Mute Sound"}
                </button>
            </div>

            {/* Kirby character */}
            <div
                id="kirby"
                style={{
                    ...styles.kirby,
                    left: kirbyPosX,
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
    youtubeContainer: {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    } as React.CSSProperties,
    unmuteButton: {
        padding: '8px 12px',
        fontSize: '12px',
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
