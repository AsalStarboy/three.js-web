// Canvas-based 3D-like animation
let canvas, ctx;
let particles = [];
let cube = { rotation: 0 };

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    
    // Create particles
    createParticles();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas, false);
    
    // Start animation loop
    animate();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            alpha: Math.random() * 0.5 + 0.5
        });
    }
}

function drawCube() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 50;
    const size = 80;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Create 3D-like cube effect with rotation
    const cos = Math.cos(cube.rotation);
    const sin = Math.sin(cube.rotation);
    
    // Front face
    ctx.fillStyle = `rgba(0, 255, 136, 0.8)`;
    ctx.fillRect(-size/2, -size/2, size, size);
    
    // Right face (perspective effect)
    ctx.fillStyle = `rgba(0, 200, 100, 0.6)`;
    ctx.beginPath();
    ctx.moveTo(size/2, -size/2);
    ctx.lineTo(size/2 + size/3, -size/2 - size/3);
    ctx.lineTo(size/2 + size/3, size/2 - size/3);
    ctx.lineTo(size/2, size/2);
    ctx.closePath();
    ctx.fill();
    
    // Top face
    ctx.fillStyle = `rgba(0, 150, 80, 0.7)`;
    ctx.beginPath();
    ctx.moveTo(-size/2, -size/2);
    ctx.lineTo(-size/2 + size/3, -size/2 - size/3);
    ctx.lineTo(size/2 + size/3, -size/2 - size/3);
    ctx.lineTo(size/2, -size/2);
    ctx.closePath();
    ctx.fill();
    
    // Add wireframe effect
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/2, -size/2, size, size);
    
    ctx.restore();
    
    cube.rotation += 0.02;
}

function drawParticles() {
    particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
    });
}

function animate() {
    // Clear canvas with slight trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles
    drawParticles();
    
    // Draw cube
    drawCube();
    
    requestAnimationFrame(animate);
}

// Initialize when page loads
window.addEventListener('load', init);