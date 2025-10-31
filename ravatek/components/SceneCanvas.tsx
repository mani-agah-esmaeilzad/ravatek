'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function SceneCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 12;

    const geometry = new THREE.IcosahedronGeometry(5, 1);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#6366f1'),
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const particleGeometry = new THREE.BufferGeometry();
    const particles = window.innerWidth < 768 ? 300 : 800;
    const positions = new Float32Array(particles * 3);
    for (let i = 0; i < particles; i++) {
      const radius = 12;
      positions[i * 3] = (Math.random() - 0.5) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: '#a855f7',
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });
    const pointCloud = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(pointCloud);

    const ambient = new THREE.AmbientLight('#ffffff', 0.6);
    const directional = new THREE.DirectionalLight('#c084fc', 1.2);
    directional.position.set(5, 5, 10);
    scene.add(ambient);
    scene.add(directional);

    let frameId: number;
    let isActive = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rotationFactor = prefersReducedMotion.matches ? 0.0002 : 0.0008;

    const animate = () => {
      if (!isActive) return;
      mesh.rotation.x += rotationFactor;
      mesh.rotation.y += rotationFactor * 1.5;
      pointCloud.rotation.y -= rotationFactor * 0.75;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      rotationFactor = event.matches ? 0.0002 : 0.0008;
    };

    const handleResize = () => {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    const handleVisibility = () => {
      isActive = document.visibilityState === 'visible';
      if (isActive) {
        animate();
      } else {
        cancelAnimationFrame(frameId);
      }
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
    prefersReducedMotion.addEventListener('change', handleReducedMotionChange);

    return () => {
      isActive = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      prefersReducedMotion.removeEventListener('change', handleReducedMotionChange);
      renderer.dispose();
      container.removeChild(renderer.domElement);
      geometry.dispose();
      particleGeometry.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10 h-full w-full" aria-hidden />;
}
