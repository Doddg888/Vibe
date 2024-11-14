"use client";

import { useState, useEffect } from 'react';

const KirbyPage = () => {
    const [kirbyPosX, setKirbyPosX] = useState(50); // Kirby's horizontal position
    const [kirbyPosY, setKirbyPosY] = useState(0); // Kirby's vertical position
    const [isJumping, setIsJumping] = useState(false);
    const [facingRight, setFacingRight] = useState(true);
    const [velocityY, setVelocityY] = useState(0); // Vertical velocity for gravity effect

    const MOVE_STEP = 10;
    const JUMP_HEIGHT = 15;
    const GRAVITY = 1;
    const PLATFORM_HEIGHT = 10;

    // Define platforms as an array of objects with x, y, width, and height
    const platforms = [
        { x: 100, y: 200, width: 100, height: PLATFORM_HEIGHT },
        { x: 300, y: 300, width: 150, height: PLATFORM_HEIGHT },
        { x: 500, y: 150, width: 100, height: PLATFORM_HEIGHT },
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            setKirbyPosX((prevPosX) => Math.min(prevPosX + MOVE_STEP, window.innerWidth - 50));
            setFacingRight(true);
        }
        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'q') {
            setKirbyPosX((prevPosX) => Math.max(prevPosX - MOVE_STEP, 0));
            setFacingRight(false);
        }
        if ((e.key === ' ' || e.key.toLowerCase() === 'z') && !isJumping) { // Space or Z for jump
            startJump();
        }
    };

    const startJump = () => {
        if (!isJumping) {
            setIsJumping(true);
            setVelocityY(-JUMP_HEIGHT); // Initial upward velocity for jump
        }
    };

    const applyGravity = () => {
        setKirbyPosY((prevPosY) => {
            const newY = prevPosY + velocityY;
            return Math.max(newY, 0); // Ensure Kirby doesn't fall below ground level
        });
        setVelocityY((prevVelocity) => prevVelocity + GRAVITY); // Gravity effect

        // Check for collision with platforms
        platforms.forEach((platform) => {
            if (
                kirbyPosX + 50 > platform.x && // Kirby’s right side > platform’s left side
                kirbyPosX < platform.x + platform.width && // Kirby’s left side < platform’s right side
                kirbyPosY <= platform.y && // Kirby is above the platform
                kirbyPosY + velocityY >= platform.y - PLATFORM_HEIGHT // Kirby is landing on platform
            ) {
                setVelocityY(0); // Stop falling
                setKirbyPosY(platform.y - PLATFORM_HEIGHT); // Set Kirby on top of the platform
                setIsJumping(false); // Allow jumping again
            }
        });

        // Stop falling if Kirby reaches the ground level
        if (kirbyPosY === 0) {
            setIsJumping(false);
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
            if (!isJumping || velocityY > 0) {
                applyGravity();
            }
        }, 30);

        return () => clearInterval(gravityInterval);
    }, [isJumping, velocityY, kirbyPosX, kirbyPosY]);

    return (
        <div style={styles.container}>
            <div
                id="kirby"
                style={{
                    ...styles.kirby,
                    left: kirbyPosX,
                    bottom: kirbyPosY + 35,
                    transform: `scaleX(${facingRight ? 1 : -1})`,
                }}
            ></div>
            {platforms.map((platform, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.platform,
                        left: platform.x,
                        bottom: platform.y,
                        width: platform.width,
                        height: platform.height,
                    }}
                ></div>
            ))}
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
    kirby: {
        position: 'absolute',
        width: '50px',
        height: '50px',
        backgroundImage: "url('/kirby.gif')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    } as React.CSSProperties,
    platform: {
        position: 'absolute',
        backgroundColor: '#654321', // Brown color for the platform
    } as React.CSSProperties,
};

export default KirbyPage;
